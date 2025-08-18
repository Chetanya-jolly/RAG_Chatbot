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

def getChats():

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

if __name__ == '__main__':
    getChats()