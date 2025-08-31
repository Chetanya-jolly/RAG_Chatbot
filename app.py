from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import rdbms

app = Flask(__name__)
CORS(app, supports_credentials=True)
socket = SocketIO(app, cors_allowed_origins='*')

CORS(app, resources = {
    r'/getChatNames': { 'origins': '*' },
    r'/getConversation' : { 'origins': '*' },
    r'/newChat' : {'origins': '*'}
})

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getChatNames', methods=['GET'])
def getChatNames():
    rows = rdbms.getChatNames()
    return jsonify(rows), 200

@app.route('/getConversation/<int:chatId>', methods=['GET'])
def getChatHistory(chatId):
    conversation = rdbms.getConversation(chatId)
    return jsonify({'status':"ok", 'conversation':conversation}), 200
    
@app.route('/newChat', methods=['PUT'])
def newChat():
    files = request.files.getlist("chatName")
    for file in files:
        print(file)
    chatName = request.form.get('chatName')
    chatId = rdbms.newChat(chatName)
    return jsonify({"status": "ok", 
                    'name': chatName,
                    'id': chatId}), 201

@socket.on("test")
def test(data):
    print("Sid", request.sid)
    print("Name space", request.namespace)
    print("Event", end='')
    print(request.event)
    socket.emit("test", data)

#################################################################
# This is automatically hit when the socket.io.min.js is loaded
# @socket.on("connect")
# def func():
#     print(request.sid)
#################################################################

if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=5000, debug=True)
    socket.run(app, host='0.0.0.0', port=5000, debug=True)