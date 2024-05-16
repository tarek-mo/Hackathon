from flask import Flask, request, jsonify, redirect, url_for, render_template
import pickle
from flask_cors import CORS
# import supabase from supabase_client.py
from supabase_client import supabase
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from datetime import datetime


app = Flask(__name__)

# Use cors to allow cross origin requests
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




#modify port 
if __name__ == '__main__':
    app.run(port=8000)
