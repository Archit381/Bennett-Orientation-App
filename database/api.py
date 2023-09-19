from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors_confg = {
    "origins": ["http://127.0.0.1/5000"],
    "methods": ["OPTIONS", "GET", "POST"],
    "allow_headers": ["Authorization", "Content-Type"]
}

cors = CORS(app, resources={
    r"/*": cors_confg
})

def load_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data

@app.route('/', methods=['GET']) 
@cross_origin()
def health():
    return "Hello"


@app.route('/get_data', methods=['GET']) 
@cross_origin()
def get_data():
    data = load_data()
    
    return data

if __name__ == '__main__':
    app.run()
