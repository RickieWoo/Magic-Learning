# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class DoubanMovieItem(scrapy.Item):
    # 排名
    ranking = scrapy.Field()
    # 电影名称
    movie_name = scrapy.Field()
    # 评分
    score = scrapy.Field()
    # 评论人数
    score_num = scrapy.Field()


class BaiduImageItem(scrapy.Item):
    # thumbUrl = scrapy.Field()
    # hoverUrl = scrapy.Field()

    image_urls = scrapy.Field()
    images = scrapy.Field()


TARGET_QUESTION = 'question'
TARGET_ZHUANLAN = 'zhuanlan'
TARGET_ANSWER = 'answer'
TARGET_COMMENT = 'comment'


def create_target(target_type, id):
    return {"target_type": target_type, "id": id}


# class Post(scrapy.Item):
#     title = scrapy.Field()
#     itemId = scrapy.Field()
#     author = scrapy.Field()
#     content = scrapy.Field()
#     time = scrapy.Field()


class Comment(scrapy.Item):
    id = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    time = scrapy.Field()
    target = scrapy.Field()
    like = scrapy.Field()


class ZhuanLan(scrapy.Item):
    id = scrapy.Field()
    url = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    time = scrapy.Field()
    like = scrapy.Field()


class ZhihuQuestion(scrapy.Item):
    id = scrapy.Field()
    title = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    time = scrapy.Field()


class ZhihuAnswer(scrapy.Item):
    id = scrapy.Field()
    author = scrapy.Field()
    content = scrapy.Field()
    time = scrapy.Field()
    upvote = scrapy.Field()
    target = scrapy.Field()
    url = scrapy.Field()


class ZhihuUser(scrapy.Item):
    id = scrapy.Field()  # 用户id
    url = scrapy.Field()  # 用户主页
    url_token = scrapy.Field()  # api 参数 /members/{url_token}
    name = scrapy.Field()
    gender = scrapy.Field()  # 性别 男:1 女:0 未知:-1
    educations = scrapy.Field()
    employments = scrapy.Field()
    headline = scrapy.Field()  # 个人简介
    locations = scrapy.Field()

    following_count = scrapy.Field()  # 关注的人数
    follower_count = scrapy.Field()  # 粉丝数
    voteup_count = scrapy.Field()  # 被点赞数
    thanked_count = scrapy.Field()  # 被感谢次数
    logs_count = scrapy.Field()  # 参与公共编辑次数
    question_count = scrapy.Field()  # 提问数
    answer_count = scrapy.Field()  # 回答数
    articles_count = scrapy.Field()  # 文章数
    favorite_count = scrapy.Field()  # 收藏数
    favorited_count = scrapy.Field()  # 被收藏数
    columns_count = scrapy.Field()  # 专栏数
