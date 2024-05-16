from flask import Flask, request, jsonify, redirect, url_for, render_template
import pickle
from flask_cors import CORS


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
    return jsonify({'prediction': prediction[0]})
#modify port 
if __name__ == '__main__':
    app.run(port=8000)
