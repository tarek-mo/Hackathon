from flask import Flask, request, jsonify, redirect, session
import pickle
from flask_cors import CORS
import joblib
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow
import googleapiclient.errors
import os
import base64

app = Flask(__name__)
CORS(app)
app.secret_key = "enset2024"

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
CLIENT_SECRETS_FILE = 'client_secret.json'
REDIRECT_URI = 'http://127.0.0.1:8000/oauth2callback'

@app.route('/')
def home():
    return jsonify({'message': 'Hello, World!'})

@app.route('/predict', methods=['POST'])
def predict():
    url = request.json['url']
    with open('phishing_model.pkl', 'rb') as f:
        pipeline = pickle.load(f)
    prediction = pipeline.predict([url])
    return jsonify({'prediction': prediction[0]})

@app.route('/predict_email', methods=['POST'])
def predict_email():
    email_text = request.json['email_text']
    model = joblib.load('output/phishing_model.joblib')
    feature = joblib.load('output/phishing_feature.joblib')
    email_text = feature.transform([email_text])
    prediction = model.predict(email_text)
    return jsonify({'prediction': 'Phishing' if prediction[0] == 0 else 'Not Phishing'})

@app.route('/authorize')
def authorize():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    auth_url, _ = flow.authorization_url(prompt='consent')
    return redirect(auth_url)

@app.route('/oauth2callback')
def oauth2callback():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)
    return redirect('/inbox')

@app.route('/inbox', methods=['GET'])
def inbox():
    if 'credentials' not in session:
        return redirect('/authorize')
    
    credentials = Credentials(**session['credentials'])
    gmail = build('gmail', 'v1', credentials=credentials)
    
    try:
        messages = gmail.users().messages().list(userId='me', q='is:unread').execute()
    except googleapiclient.errors.HttpError as error:
        return jsonify({'error': str(error)}), 500
    
    message_list = messages.get('messages', [])
    
    if not message_list:
        return jsonify({'message': 'No unread emails found.'}), 200
    
    latest_message_id = message_list[0]['id']
    
    try:
        latest_message = gmail.users().messages().get(userId='me', id=latest_message_id).execute()
    except googleapiclient.errors.HttpError as error:
        return jsonify({'error': str(error)}), 500
    
    email_body = extract_email_body(latest_message)
    
    return jsonify({'latest_unread_email': email_body})

def extract_email_body(message):
    if 'data' in message['payload']['body'] and message['payload']['body']['data']:
        return base64.urlsafe_b64decode(message['payload']['body']['data']).decode('utf-8')

    parts = message['payload'].get('parts', [])
    for part in parts:
        if part['mimeType'] == 'text/plain' and 'data' in part['body']:
            return base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
        elif part['mimeType'] == 'text/html' and 'data' in part['body']:
            return base64.urlsafe_b64decode(part['body']['data']).decode('utf-8')
    
    return "No readable body found."

def detect_phishing(emails):
    phishing_emails = []
    model = joblib.load('output/phishing_model.joblib')
    feature = joblib.load('output/phishing_feature.joblib')
    
    for email in emails:
        email_text = email['snippet']
        email_text = feature.transform([email_text])
        prediction = model.predict(email_text)
        if prediction[0] == 0:
            phishing_emails.append(email)
    
    return phishing_emails

def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }

if __name__ == '__main__':
    app.run(port=8000)
