from flask import Flask, request, jsonify, redirect, url_for, render_template
import pickle
from flask_cors import CORS
# import supabase from supabase_client.py
from supabase_client import supabase

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
    obj = supabase.table('history').insert({"user_id": request.json["userId"], "type": request.json["type"], "status": prediction[0]}).execute()
    print("hellooo")
    print(obj)
    return jsonify({'prediction': prediction[0]})
#modify port 
if __name__ == '__main__':
    app.run(port=8000)
