# -*- coding: utf-8 -*-
import scrapy
import json
import re

from scrapy import Request
from helloworld.items import BaiduImageItem


class BaiduImageSpider(scrapy.Spider):
    name = 'baidu_image'
    allowed_domains = ['image.baidu.com']
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36 OPR/47.0.2631.55',
    }

    def start_requests(self):
        url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E5%B0%8F%E9%BB%84%E4%BA%BA&cl=&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=0&word=%E5%B0%8F%E9%BB%84%E4%BA%BA&s=&se=&tab=&width=0&height=0&face=&istype=&qc=&nc=&fr=&pn=30&rn=30&gsm=1e&1507018069916='
        yield Request(url, headers=self.headers)

    def parse(self, response):
        datas = json.loads(response.body)
        item = BaiduImageItem()

        if datas:
            item['image_urls'] = [data['hoverURL'] for data in datas['data'] if 'hoverURL' in data]
            yield item
            # for data in datas['data']:
            #     if data.has_key('thumbURL') and data.has_key('hoverURL'):
            #         # item['thumbUrl'] = data['thumbURL']
            #         # item['hoverUrl'] = data['hoverURL']
            #
            #         yield item


            # 命令行调试代码
            # from scrapy.shell import inspect_response
            # inspect_response(response, self)

            # 翻页
            # page_num = re.search(u'&pn=(\d+)', response.url).group(1)
            # page_num = '&pn=%d' % (int(page_num) + 30)
            # next_url = re.sub(u'&pn=\d+', page_num, response.url)
            # yield Request(next_url, headers=self.headers)
