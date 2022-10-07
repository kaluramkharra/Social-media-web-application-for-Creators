# from xml.etree.ElementTree import Comment
from django.contrib import admin
from .models import Followers, Notification, Pitch, Post, User,Comment
# Register your models here.

admin.site.register(User)
admin.site.register(Followers)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Pitch)
admin.site.register(Notification)