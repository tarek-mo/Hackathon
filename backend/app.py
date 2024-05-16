from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import joblib
from preprocess import preprocessfrom dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from datetime import datetime


app = Flask(__name__)
CORS(app)

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
    return jsonify({'prediction': prediction[0]})

@app.route('/predict_email', methods=['POST'])
def predict_email():
    email_text = request.json['email_text']
    model = joblib.load('output/phishing_model.joblib')
    feature = joblib.load('output/phishing_feature.joblib')
    email_text = feature.transform([email_text])
    prediction = model.predict(email_text)
    print("voila");
    print(prediction[0])
    if prediction[0] == 0:
        return jsonify({'prediction': 'Phihsing'})
    else:
        return jsonify({'prediction': 'Not Phishing'})
    

if __name__ == '__main__':
    app.run(port=8000)