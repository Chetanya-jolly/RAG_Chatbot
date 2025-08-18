from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import rdbms

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getChatNames', methods=['GET'])
def getChats():
    rows = rdbms.getChats()
    return jsonify(rows), 200

@app.route('/getChatHistory', methods=['GET'])
def getChatHistory():
    chatId = request.args.id
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)