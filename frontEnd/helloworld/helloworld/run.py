# -*- coding: utf-8 -*-
from pymongo import MongoClient, collection


def db_init():
    client = MongoClient('mongodb://spider:spider@localhost:27017/spider')
    db = client.get_database()
    zhihu_user = collection.Collection(db, 'zhihu_user')
    zhihu_zhuanlan = collection.Collection(db, 'zhihu_zhuanlan')
    zhihu_question = collection.Collection(db, 'zhihu_question')
    zhihu_answer = collection.Collection(db, 'zhihu_answer')
    zhihu_comment = collection.Collection(db, 'zhihu_comment')

    zhihu_user.create_index('id', unique=True)
    zhihu_zhuanlan.create_index('id', unique=True)
    zhihu_question.create_index('id', unique=True)
    zhihu_answer.create_index('id', unique=True)
    zhihu_comment.create_index('id', unique=True)


