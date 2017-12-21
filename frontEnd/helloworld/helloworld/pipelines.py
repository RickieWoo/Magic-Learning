# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from items import *
from config import *


class HelloworldPipeline(object):
    def process_item(self, item, spider):
        return item


class MongoPipeline(object):
    def open_spider(self, spider):
        self.client = MongoClient(MONGO_URL)
        self.db = self.client.get_database()

        self.zhihu_user = self.db['zhihu_user']
        self.zhihu_zhuanlan = self.db['zhihu_zhuanlan']
        self.zhihu_question = self.db['zhihu_question']
        self.zhihu_answer = self.db['zhihu_answer']
        self.zhihu_comment = self.db['zhihu_comment']

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        try:
            if isinstance(item, ZhihuUser):
                self.zhihu_user.insert(dict(item))
            elif isinstance(item, ZhuanLan):
                self.zhihu_zhuanlan.insert(dict(item))
            elif isinstance(item, ZhihuQuestion):
                self.zhihu_question.insert(dict(item))
            elif isinstance(item, ZhihuAnswer):
                self.zhihu_answer.insert(dict(item))
            elif isinstance(item, Comment):
                self.zhihu_comment.insert(dict(item))
        except DuplicateKeyError, Argument:
            print '[Ignore] Duplicate Key Error', Argument

        return item
