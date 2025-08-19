from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import rdbms

app = Flask(__name__)
CORS(app)

CORS(app, resources = {
    r'/getChatNames': { 'origins': '*' },
    r'/getConversation' : { 'origins': '*' }
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getChatNames', methods=['GET'])
def getChatNames():
    rows = rdbms.getChatNames()
    print(rows)
    return jsonify(rows), 200

@app.route('/getConversation', methods=['GET'])
def getChatHistory():
    print("app getConversation triggered")
    chatId = request.args.get('chatId')
    conversation = rdbms.getConversation(chatId)
    if not conversation:
        return jsonify({'status': 'not ok'}), 200
    return jsonify({'status':"ok", 'conversation':conversation}), 200
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)