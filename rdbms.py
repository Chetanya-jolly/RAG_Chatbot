import mysql.connector
import numpy as np

config = {
    'user': 'root',
    'password': 'Jolly@1236',
    'database': 'rag_chatbot',
    'host': 'localhost'
}
def getDb():
    return mysql.connector.connect(**config)

def getChatNames():

    chats = []
    cnxn = getDb()
    cur = cnxn.cursor()

    query = "select id, name from chats"
    cur.execute(query)
    rows = cur.fetchall()
    for row in rows:
        temp = dict()
        temp['id'] = row[0]
        temp['name'] = row[1]
        chats.append(temp)

    cur.close()
    cnxn.close()

    return chats

def getConversation(chatId):
    cnxn = getDb()
    cur = cnxn.cursor()

    query = '''select id, question, answer
                from conversation
                where chat_id = %s'''
    cur.execute(query, (chatId,))
    rows = cur.fetchall()
    conversation = []
    for row in rows:
        temp = dict()
        temp['id'] = row[0]
        temp['question'] = row[1]
        temp['answer'] = row[2]
        conversation.append(temp)
    print("RDBMS getConversation triggered")
    cur.close()
    cnxn.close()

    return conversation

if __name__ == '__main__':
    getChatNames()