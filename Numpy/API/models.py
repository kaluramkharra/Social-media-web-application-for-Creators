from distutils.command.upload import upload
from enum import unique
from random import random
from tkinter.messagebox import NO
from unicodedata import category
from unittest.util import _MAX_LENGTH
from django.conf import ENVIRONMENT_VARIABLE
from django.db import models
from numpy import blackman
from traitlets import default
from random import *
# unique slug generator -------------------------
from django.utils.text import slugify
import string
from django.utils.crypto import get_random_string
import datetime
now = datetime.datetime.now()

def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + get_random_string(length=4)
    return unique_slug
# ------------------------------------------------

class User(models.Model):
    uid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=True)
    email = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=100,default="")
    bio=models.CharField(max_length=100,default="")
    profile_image = models.ImageField(default='propic.png')
    def __str__(self):
        return self.email

class Followers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_followers = models.ManyToManyField(User, related_name='user_followers')
    following=models.ManyToManyField(User, related_name='user_following')
    def __str__(self):
        return self.user.name

class Post(models.Model):
    pid = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    # title = models.CharField(max_length=200,blank=True)
    category = models.CharField(max_length=200,blank=True)
    slug = models.SlugField(unique=True,blank=True)
    content = models.CharField(max_length=2000,blank=True)
    image = models.ImageField(blank=True)
    views = models.IntegerField(default=0)
    likes = models.ManyToManyField(User,related_name="likes",blank=True)
    timestamp=models.DateTimeField(default=now,blank=True)
    

    def save(self, *args, **kwargs):
        self.slug= slugify(str(slugify(self.content[:20]))+"-by-"+str(self.user.name)+str(randint(10,1000)))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.category +" by " + self.user.name




class Comment(models.Model):
    sno = models.AutoField(primary_key=True)
    content = models.CharField(max_length=2000)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE,null=True)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True)
    timestamp=models.DateTimeField(default=now)

    def __str__(self):
        return self.content[0:13] + ".... by "+self.user.name

class Pitch(models.Model):
    sno = models.AutoField(primary_key=True)
    slug =  models.SlugField(blank=True,unique=True)
    workuser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='workpostkarnewalauser',null=True)
    content = models.CharField(max_length=2000)
    email = models.CharField(max_length=100)
    pitcheruser = models.ForeignKey(User,on_delete=models.CASCADE,related_name='pitchkarnewalauer',null=True)
    post = models.ForeignKey(Post,on_delete=models.CASCADE,null=True)
    timestamp=models.DateTimeField(default=now,blank=True)

    def save(self, *args, **kwargs):
        self.slug = str(str(self.sno)+(self.workuser.name[2:]))+str(randint(20,100)+str(self.pitcheruser.name)+str(randint(10,1000)))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class Notification(models.Model):
    no = models.AutoField(primary_key=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    url = models.CharField(max_length=200,blank=True)
    timestamp=models.DateTimeField(default=now,blank=True)

    def __str__(self):
        return self.user.name