#!/usr/bin/python
# -*- coding: UTF-8 -*-
import flask,json
from flask import request
import tts

server = flask.Flask(__name__)
@server.route('/audio',methods=['get'])
def audio():
    text = request.values.get('text')
    url =  tts.createAudio(text)
    resu = {'code':200,'message':'ok', 'text': text, 'url': url}
    return json.dumps(resu,ensure_ascii=False)

if __name__== '__main__':
    server.run(debug=True,port = 8888,host='0.0.0.0')