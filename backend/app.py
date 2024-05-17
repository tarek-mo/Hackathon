from flask import Flask, request, jsonify, redirect, session
import pickle
from flask_cors import CORS
import joblib
from supabase_client import supabase
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import Flow
import googleapiclient.errors
import os
import base64

app = Flask(__name__)
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
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
    data, count = supabase.table('history').insert({"user_id": request.json.get('userId', None), "ressource": request.json['url'] ,"type": request.json["type"], "status": prediction[0]}).execute()
    print(data, count)
    return jsonify({'prediction': prediction[0]})

@app.route('/predict_email', methods=['POST'])
def predict_email():
    email_text = request.json['email_text']
    model = joblib.load('output/phishing_model.joblib')
    feature = joblib.load('output/phishing_feature.joblib')
    email_text = feature.transform([email_text])
    prediction = model.predict(email_text)
    obj = supabase.table('history').insert({"user_id": request.json.get('userId', None), "ressource": request.json['email_text'] ,"type": request.json["type"], "status": "bad" if prediction[0]==0 else "good"}).execute()
    print(obj)
    return jsonify({'prediction': 'Phishing' if prediction[0] == 0 else 'Not Phishing'})

@app.route('/authorize')
def authorize():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    auth_url, _ = flow.authorization_url(prompt='consent')
    return jsonify({'auth_url': auth_url})

@app.route('/oauth2callback')
def oauth2callback():
    print("inside oauth2callback")
    print(request.url)
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri=REDIRECT_URI
    )
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    print(credentials_to_dict(credentials))
    session['credentials'] = credentials_to_dict(credentials)
    return redirect(f'http://localhost:3000/dashboard')

@app.route('/inbox', methods=['GET'])
def inbox():
#get last email
    if 'credentials' not in session:
        return redirect('/authorize')
    credentials = Credentials(**session['credentials'])
    service = build('gmail', 'v1', credentials=credentials)
    results = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    messages = results.get('messages', [])
    if not messages:
        return jsonify({'emails': []})
    msg = service.users().messages().get(userId='me', id=messages[0]['id']).execute()
    #excute prediction
    email_text = msg['snippet']
    model = joblib.load('output/phishing_model.joblib')
    feature = joblib.load('output/phishing_feature.joblib')
    email_text = feature.transform([email_text])
    prediction = model.predict(email_text)
    email = {
        'id': msg['id'],
        'email': msg['snippet'],
        #email sender,
        'phishing': prediction[0]
    }
    data, count = supabase.table('emails').insert([{
        'email': msg['snippet'],
        'phishing': prediction[0]
    }]).execute();
    
    return jsonify({'email': email})

@app.route('/check-credentials', methods=['GET'])
def check_credentials():
    print("inside check-credentials")
    print(session)
    if 'credentials' in session:
        return jsonify({'status': 'authorized'})
    return jsonify({'status': 'unauthorized'})


@app.route('/store-credentials', methods=['POST'])
def store_credentials():
    credentials = request.get_json()
    print("credentials")
    print(credentials)
    if credentials:
        # Store the credentials in the session or database
        session['credentials'] = credentials
        return jsonify({'message': 'Credentials stored successfully'})
    else:
        return jsonify({'error': 'Invalid credentials'}), 400

@app.route('/inboxes', methods=['GET'])
def inboxes():
    if 'credentials' not in session:
        return redirect('/authorize')
    emails = []
    credentials = Credentials(**session['credentials'])
    service = build('gmail', 'v1', credentials=credentials)
    results = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    messages = results.get('messages', [])
    if not messages:
        return jsonify({'emails': emails})
    for message in messages[:10]:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        email = {
            'id': msg['id'],
            'snippet': msg['snippet']
        }
        emails.append(email)
    return jsonify({'emails': emails})


@app.route('/phishing_inbox', methods=['GET'])
def phishing_inbox():
    credentials = Credentials(**session['credentials'])
    service = build('gmail', 'v1', credentials=credentials)
    results = service.users().messages().list(userId='me', labelIds=['INBOX']).execute()
    messages = results.get('messages', [])
    emails = []
    if not messages:
        return jsonify({'emails': emails})
    for message in messages[:10]:
        msg = service.users().messages().get(userId='me', id=message['id']).execute()
        email = {
            'id': msg['id'],
            'snippet': msg['snippet'],
            'body': extract_email_body(msg),
        
        }
        emails.append(email)
    phishing_emails = detect_phishing(emails)
    return jsonify({'emails': phishing_emails})

def extract_email_body(message):
    #ignore les images
    email_body = ''
    if 'data' in message['payload']['body']:
        email_body = base64.urlsafe_b64decode(message['payload']['body']['data']).decode('utf-8')
    elif 'data' in message['payload']['parts'][0]['body']:
        email_body = base64.urlsafe_b64decode(message['payload']['parts'][0]['body']['data']).decode('utf-8')
    return email_body



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
    obj = supabase.table('history').insert({"user_id": request.json.get('userId', None), "ressource": request.json['email_text'] ,"type": request.json["type"], "status": "bad" if prediction[0]==0 else "good"}).execute()

    if prediction[0] == 0:
        return jsonify({'prediction': 'Phihsing'})
    else:
        return jsonify({'prediction': 'Not Phishing'})
    



    

if __name__ == '__main__':
    app.run(port=8000)
