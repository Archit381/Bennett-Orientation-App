from flask import Flask, jsonify
import json

app = Flask(__name__)

def load_data():
    data = []
    with open("data.txt", "r") as file:
        for line in file:
            data.append(json.loads(line))
    return data

@app.route('/get_data', methods=['GET']) 
def get_data():
    data = load_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run()
