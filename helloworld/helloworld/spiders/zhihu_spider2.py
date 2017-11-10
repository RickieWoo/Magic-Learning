# -*- coding: utf-8 -*-

import json, re
from urllib import quote
from scrapy import Request, Selector
from scrapy.spiders import Spider
from helloworld.items import *
from time import mktime
from dateutil.parser import parse

cookiejar = {
    "d_c0": "AECCrAmHHwyPTrXMOs7n_sA1rOd7tsL214E=|1501054204",
    "_zap": "d04aa8da-7106-4bc0-82a4-11082ffab2c4",
    "q_c1": "6a15af74f75645a5b3e3f0a63876d596|1506416880000|1497871626000",
    "q_c1": "6a15af74f75645a5b3e3f0a63876d596|1507124464000|1497871626000",
    "aliyungf_tc": "AQAAAB0OHiRDFQwAFNucc8qIYTUpN+9/",
    "s-q": "%E4%B8%AD%E5%8D%B0",
    "s-i": 4,
    "sid": "7daqh6iu",
    "cap_id": "MTY4ZGJkYjFhZjVhNGY2YTlmYTYwMjYyNjdhOTg4N2Q=|1508053995|5925370f3f1c68a2c3297bb027cfa76aaacdc27c",
    "r_cap_id": "YmMyOWJjNjFmYWI1NGJiYmE2Mjc3NjQ5Mjg1Njk4MmQ=|1508053995|dfcf08f3bb55b8b7d8ab3f1a0cbf4b6299632e54",
    "cap_id": "ZGI1MTc3YWFmZTExNDhkYWE4N2NjYmI2OGYwN2U0Zjc=|1508002510|38379c75ad313219dd78ed791d49313f35225f8c",
    "__utma": "51854390.536988354.1507966069.1507994661.1508002389.6",
    "__utmb": "51854390.0.10.1508002389",
    "__utmc": "51854390",
    "__utmz": "51854390.1508002389.6.3.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/",
    "__utmv": "51854390.000--|2=registration_date=20160212=1^3=entry_date=20170619=1",
    "z_c0": "Mi4xR21FekJnQUFBQUFBUUlLc0NZY2ZEQmNBQUFCaEFsVk4tYUFLV2dBanZoR0VVZzhFMmpvQkdLRm9EQVJwR0wxUXFB|1508054009|88858a6a2f898f34747fdbc6a145e5aefbb78387",
    "_xsrf": "c6a5b661-85d9-409e-b130-6bdcd0546bf3"
}

zhuanlan_headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36',
    'Host': 'zhuanlan.zhihu.com',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': '*/*',
    'X-Requested-With': 'XMLHttpRequest',
    'DNT': 1,
    'Referer': 'https://zhuanlan.zhihu.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
}


def zhuanlan_url(zhuanlan_id):
    url = 'https://zhuanlan.zhihu.com/p/{}'.format(zhuanlan_id)
    return url


def zhuanlan_comments_url(zhuanlan_id):
    url = 'https://zhuanlan.zhihu.com/api/posts/{}/comments?limit=20&offset=0'.format(zhuanlan_id)
    return url


def question_url(question_id):
    url = 'https://www.zhihu.com/api/v4/questions/{}?include=detail%2Ctopics%2Canswer_count%2Cauthor'.format(
        question_id)
    return url


def question_answer_url(question_id):
    url = 'https://www.zhihu.com/api/v4/questions/{}/answers?include=data%5B*%5D.content%2Cvoteup_count&limit=20&offset=0'.format(
        question_id)
    return url


def author_url(url_token):
    url = 'https://www.zhihu.com/api/v4/members/{}?include=educations%2Cemployments%2Cheadline%2Clocations%2Cfollowing_count%2Cfollower_count%2Cvoteup_count%2Cthanked_count%2Clogs_count%2Cquestion_count%2Canswer_count%2Carticles_count%2Cfavorite_count%2Cfavorited_count%2Ccolumns_count'.format(
        url_token)
    return url


def question_answer_comment_url(answer_id):
    url = 'https://www.zhihu.com/api/v4/answers/{}/comments?include=data%5B*%5D.author%2Ccollapsed%2Creply_to_author%2Cdisliked%2Ccontent%2Cvoting%2Cvote_count%2Cis_parent_author%2Cis_author&order=normal&limit=20&offset=0&status=open'.format(
        answer_id)
    return url


def parse_time(date_str):
    if isinstance(date_str, str):
        d = parse(date_str)
        return int(mktime(d.timetuple()))
    return date_str


def offset_url(url, offset):
    _offset = int(re.search(r'&offset=(\d+)', url).group(1)) + offset
    next_url = re.sub(r'&offset=\d+', r'&offset=%s' % _offset, url)
    return next_url


class ZhihuSpider(Spider):
    name = 'zhihu_spider'
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36',
        'Host': 'www.zhihu.com',
        'Connection': 'keep-alive',
        'Origin': 'https://www.zhihu.com',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'DNT': 1,
        'Referer': 'https://www.zhihu.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
    }

    def start_requests(self):
        keywords = ['中印边界', '对峙', '中印边境', '洞朗']
        urls = ['https://www.zhihu.com/r/search?q={}&correction=1&type=content&range=5m&offset=0&limit=20' \
                    .format(quote(keyword)) for keyword in keywords]
        # url = 'https://www.zhihu.com/r/search?q={}&correction=1&type=content&range=5m&offset=0&limit=20'.format(
        #     quote('中印'))
        return [Request(url=url, headers=self.headers, callback=self.parse_query) for url in urls]

    def parse_query(self, response):
        datas = json.loads(response.body)
        if datas['htmls'] and len(datas['htmls']) > 0:
            for data in datas['htmls']:
                item = Selector(text=data)
                url = item.xpath('//li/div[@class="title"]/a[@class="js-title-link"]/@href').extract()[0]
                if url.find(r'/question') != -1:
                    question_id = re.search(r'/question/(\d+)', url).group(1)
                    yield Request(url=question_url(question_id), headers=self.headers, cookies=cookiejar,
                                  callback=self.parse_question)
                    yield Request(url=question_answer_url(question_id), headers=self.headers, cookies=cookiejar,
                                  callback=self.parse_question_answer)
                else:
                    zhuanlan_id = re.search(r'/p/(\d+)', url).group(1)
                    yield Request(url=zhuanlan_url(zhuanlan_id), headers=zhuanlan_headers, callback=self.parse_zhuanlan)
                    yield Request(url=zhuanlan_comments_url(zhuanlan_id), headers=zhuanlan_headers,
                                  callback=self.parse_zhuanlan_comments)

            next_url = offset_url(response.url, 20)
            yield Request(url=next_url, headers=self.headers, callback=self.parse_query)

    def parse_zhuanlan(self, response):
        json_text = response.xpath('string(//textarea[@id="preloadedState"])').extract()[0]
        json_obj = json.loads(json_text)

        item = ZhuanLan()

        item['url'] = response.url
        item['id'] = str(json_obj["database"]["Post"].keys()[0])
        item['title'] = json_obj["database"]["Post"].values()[0]['title']
        item['author'] = re.search(r'/people/([^/]+)', json_obj["database"]["User"].values()[0]['profileUrl']).group(1)
        item['content'] = json_obj["database"]["Post"].values()[0]['content']
        item['time'] = parse_time(json_obj["database"]["Post"].values()[0]['updated'])  # use timestamp as time
        item['like'] = json_obj["database"]["Post"].values()[0]['likeCount']
        yield item

        if item['author'] and len(item['author']) > 0:
            yield Request(url=author_url(item['author']), headers=self.headers, cookies=cookiejar,
                          callback=self.parse_user)

    def parse_question(self, response):
        question_data = json.loads(response.body)

        item = ZhihuQuestion()
        item['id'] = str(question_data['id'])
        item['title'] = question_data['title']
        item['author'] = question_data['author']['url_token']  # use url_token as author
        item['content'] = question_data['detail']
        item['time'] = question_data['created']  # use timestamp as time
        yield item

        if item['author'] and len(item['author']) > 0:
            yield Request(url=author_url(item['author']), headers=self.headers, cookies=cookiejar,
                          callback=self.parse_user)

    def parse_zhuanlan_comments(self, response):
        comment_objs = json.loads(response.body)
        if comment_objs and len(comment_objs) > 0:
            itemId = re.search("posts/([0-9]*)/comments", response.url).group(1)

            for commment_obj in comment_objs:
                commentItem = Comment()
                commentItem['id'] = str(commment_obj['id'])
                commentItem['author'] = re.search(r'/people/([^/]+)', commment_obj['author']['profileUrl']).group(1)
                commentItem['content'] = re.sub('</?[^<>]+>', '', commment_obj['content'])
                commentItem['time'] = parse_time(commment_obj['createdTime'])  # use timestamp as time
                commentItem['like'] = commment_obj['likesCount']

                commentItem['target'] = create_target(TARGET_ZHUANLAN, itemId) \
                    if commment_obj['inReplyToCommentId'] == 0 \
                    else create_target(TARGET_COMMENT, commment_obj['inReplyToCommentId'])
                yield commentItem

                if commentItem['author'] and len(commentItem['author']) > 0:
                    yield Request(url=author_url(commentItem['author']), headers=self.headers, cookies=cookiejar,
                                  callback=self.parse_user)

            commentUrl = offset_url(response.url, 20)
            yield Request(url=commentUrl, headers=zhuanlan_headers, callback=self.parse_zhuanlan_comments)

    def parse_question_answer(self, response):
        answer_data = json.loads(response.body)

        if answer_data['data'] and len(answer_data['data']) > 0:
            for data in answer_data['data']:
                item = ZhihuAnswer()
                item['id'] = str(data['id'])
                item['content'] = re.sub('</?[^<>]+>', '', data['content'])
                item['author'] = data['author']['url_token']  # use user url_token as author
                item['time'] = data['created_time']  # use timestamp as time
                item['upvote'] = data['voteup_count']
                item['url'] = 'https://www.zhihu.com/question/{0}/answer/{1}'.format(data['question']['id'], data['id'])
                item['target'] = create_target(TARGET_QUESTION, data['question']['id'])
                yield item

                yield Request(url=question_answer_comment_url(item['id']), headers=self.headers, cookies=cookiejar,
                              callback=self.parse_answer_comments)

                if item['author'] and len(item['author']) > 0:
                    yield Request(url=author_url(item['author']), headers=self.headers, cookies=cookiejar,
                                  callback=self.parse_user)

            next_url = offset_url(response.url, 20)
            yield Request(next_url, headers=self.headers, cookies=cookiejar, callback=self.parse_question_answer)

    def parse_answer_comments(self, response):
        comment_objs = json.loads(response.body)
        if comment_objs['data'] and len(comment_objs['data']) > 0:
            itemId = re.search("answers/([0-9]*)/comments", response.url).group(1)

            for comment_obj in comment_objs['data']:
                item = Comment()
                item['id'] = str(comment_obj['id'])
                item['author'] = comment_obj['author']['member']['url_token']
                item['content'] = re.sub('</?[^<>]+>', '', comment_obj['content'])
                item['time'] = parse_time(comment_obj['created_time'])  # use timestamp as time
                item['like'] = comment_obj['vote_count']
                item['target'] = create_target(TARGET_ANSWER, itemId)
                yield item

                if item['author'] and len(item['author']) > 0:
                    yield Request(url=author_url(item['author']), headers=self.headers, cookies=cookiejar,
                                  callback=self.parse_user)

            next_url = offset_url(response.url, 20)
            yield Request(url=next_url, headers=self.headers, cookies=cookiejar, callback=self.parse_answer_comments)

    def parse_user(self, response):
        data = json.loads(response.body)
        item = ZhihuUser()

        item['id'] = str(data['id'])
        item['url'] = 'https://www.zhihu.com/people/%s' % data['id']
        item['url_token'] = data['url_token']
        item['name'] = data['name']
        item['gender'] = data['gender']

        item['educations'] = data['educations']
        item['employments'] = data['employments']
        item['headline'] = data['headline']
        item['locations'] = data['locations']

        item['following_count'] = data['following_count']
        item['follower_count'] = data['follower_count']
        item['voteup_count'] = data['voteup_count']
        item['thanked_count'] = data['thanked_count']
        item['logs_count'] = data['logs_count']
        item['question_count'] = data['question_count']
        item['answer_count'] = data['answer_count']
        item['articles_count'] = data['articles_count']
        item['favorite_count'] = data['favorite_count']
        item['favorited_count'] = data['favorited_count']
        item['columns_count'] = data['columns_count']

        yield item
