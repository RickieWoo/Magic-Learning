# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text

Base = declarative_base()

class ZhihuUser(Base):
    id = Column(String(20), primary_key=True)
    url = Column(Text())
    url_token = Column(String(50))
    name = Column(String(50))
    gender = Column(Integer())
