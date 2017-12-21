# -*- coding: utf-8 -*-


from scrapy import cmdline

name = 'zhihu_question_answer_spider'
cmd = 'scrapy crawl %s -o %s.json' % (name, name)
cmdline.execute(cmd.split())