#from crypt import methods
from email import message
from functools import partial
import profile
from unicodedata import category
from urllib import response
from django.shortcuts import render
from psutil import users
from rest_framework import serializers
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .models import Notification, User
from .models import Followers,Pitch,Post
import base64 
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad,unpad
import jwt
from random import *
from django.forms.models import model_to_dict
from rest_framework import serializers
from .userser import UserSerializer
from .followser import FollowSerializer
from .postser import PostSerializer
from django.core.exceptions import ObjectDoesNotExist
from Numpy.settings import JWT_SECRET,CRYPTO_SECRET

#AES ECB mode without IV

# encoded_jwt = jwt.encode({"some": "payload"}, "secret", algorithm="HS256")
jwt_key = JWT_SECRET
crypto_key = CRYPTO_SECRET #Must Be 16 char for AES128

def encrypt(raw):
        raw = pad(raw.encode(),16)
        cipher = AES.new(crypto_key.encode('utf-8'), AES.MODE_ECB)
        return base64.b64encode(cipher.encrypt(raw))

def decrypt(enc):
        enc = base64.b64decode(enc)
        cipher = AES.new(crypto_key.encode('utf-8'), AES.MODE_ECB)
        return unpad(cipher.decrypt(enc),16)

@api_view(['POST'])
def sendcode(request):
    if request.method == 'POST':
        email = request.data.get('email')
        print('api called')
        if "@" in str(email) and str(email).endswith('.com'):
            try:
                user = User.objects.get(email=email)
            except ObjectDoesNotExist:
                user = None
            if user is None:
                code = randint(100000, 999999)
                return Response({'success':True,'code':code})
            else:
                return Response({'success':False,'message':"User already exist with this Email"})
        return Response({'success':False,"message":"Please Enter a valid Email"})

@api_view(['POST','GET','PUT','PATCH','DELETE'])
def signup(request):
    print("api called")
    if request.method == 'POST':
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        print(name,email,password)
        user = User(name=name,email=email,password=encrypt(password).decode("utf-8", "ignore"))
        print("user created")
        user.save()
        
        return Response({'success':True})
    else:
        return Response({'success':False})


@api_view(['POST','GET','PUT','PATCH','DELETE'])
def login(request):
    print("api called")
    if request.method == 'POST':
        password = request.data.get('password')
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            print(user)
            decrypted_pass = decrypt(user.password).decode("utf-8", "ignore")
            print(decrypted_pass)
            print("decrypyed is running")
            if password==decrypted_pass:
                token = jwt.encode({"email":user.email,"name":user.name}, jwt_key, algorithm="HS256")
                request.session["myuser"]={"email":user.email,"name":user.name}
                # decoded = jwt.decode(token, jwt_key, algorithms=["HS256"])
                # print(decoded)
                # print(decoded['email'])
                print("abhi to shi hai bhai")
                return Response({'success':True,'token':token,'email':user.email,'name':user.name,'profile_image':UserSerializer(user).data['profile_image']})
            else:
                return Response({'success':False,'message':"wrong password"})
        except ObjectDoesNotExist:
            return Response({'success':False,'message':"this email does not exist"}) 
    else:
        return Response({'success':False ,'message':"Error"})

# my user profile
@api_view(['GET','POST'])
def getuser(request):
    if request.method == 'POST':
        print("getuser called")
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.filter(email=decoded_token['email'])
        profilepic,bio = user[0].profile_image,user[0].bio
        name,email = user[0].name,user[0].email
        # followers and following -----------------------
        try:
            follower_db_query = Followers.objects.get(user=user[0])
            follower_db = FollowSerializer(follower_db_query).data
            followers,following = [],[]
            for id in follower_db['user_followers']:
                follower = User.objects.get(uid=id)
                followers.append(UserSerializer(follower).data)
            for id in follower_db['following']:
                following_user = User.objects.get(uid=id)
                following.append(UserSerializer(following_user).data)
        except ObjectDoesNotExist:
            followers,following = [],[]
        # ------------------------------------------------

        # -----all posts----------------------------------
        try:
            posts_query = Post.objects.filter(user=user[0]).order_by('-timestamp')
            posts = PostSerializer(posts_query,many=True).data
            for post in posts:
                # userid = post['user']
                user_ser = UserSerializer(user[0]).data
                post['user'] = {}
                post['user']['name'] = user_ser['name']
                post['user']['email'] = user_ser['email']
                post['user']['bio'] = user_ser['bio']
                post['user']['image'] = user_ser['profile_image']
        except ObjectDoesNotExist:
            posts = []
        # ------------------------------------------------
        print(posts)
        print(followers)
        print(following)

        return Response({"name":name,"email":email,"profilepic":str(profilepic),"bio":bio,"followers":followers,"following":following,"posts":posts})
    else:
        return Response({'error':'error'})

@api_view(['POST'])
def updateimage(request):
    if request.method=='POST':
        print(request.data)
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        user.profile_image = request.data.get('image')
        user.save()
        print("success")
        return Response({"success":True})

@api_view(['POST','GET','PUT'])
def updateuser(request):
    if request.method == 'POST':
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        user.name=request.data.get('name')
        user.bio = request.data.get('bio')
        user.save()
        return Response({"success":True})
    else:
        return Response({'error':'error'})

@api_view(['POST','GET','PUT','PATCH','DELETE'])
def updatepassword(request):
    if request.method == 'POST':
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        print(user)
        decrypted_pass = decrypt(user.password).decode("utf-8", "ignore")
        print(decrypted_pass,request.data.get('password'))
        if decrypted_pass == request.data.get('password') and request.data.get('npassword') == request.data.get('cpassword'):
            user.password = encrypt(request.data.get('npassword')).decode("utf-8", "ignore")
            # user.update(password=encrypt(request.data.get('npassword')).decode("utf-8", "ignore"))
            user.save()
            return Response({'success':True})
        return Response({'success':False})
    else:
        return Response({'error':'error'})





@api_view(['POST','GET'])
def follow_user(request):
    if request.method=='POST':
        next_user_email = request.data.get('next_user_email')
        next_user=User.objects.get(email=next_user_email)
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        my_user = User.objects.get(email=decoded_token['email'])
        # ADDING MYUSER TO NETXUSER'S FOLLOWERS
        user_follower_db = "react"
        try:
            user_follower_db  = Followers.objects.get(user=next_user)
        except ObjectDoesNotExist:
            user_follower_db = None
        if user_follower_db == None:
            follower = Followers(user=next_user)
            follower.save()
            follower.user_followers.add(my_user)
            follower.save()
            print("saved")
        else:
            Followers.objects.get(user=next_user).user_followers.add(my_user)
            print("already exist followers adding")
        # //////////////////////////////////////////

        # ADDING NEXTUSER TO MYUSER'S FOLLOWING
        try:
            my_user_follower_db  = Followers.objects.get(user=my_user)
        except ObjectDoesNotExist:
            my_user_follower_db = None
        if my_user_follower_db == None:
            follower = Followers(user=my_user)
            follower.save()
            follower.following.add(next_user)
            follower.save()
            print("saved")
        else:
            Followers.objects.get(user=my_user).following.add(next_user)
        content = my_user.name + " started following you."
        url = '/user/'+my_user.email
        notification = Notification(user=next_user,content=content,url=url)
        notification.save()
        return Response({"success":True})












@api_view(['POST','GET'])
def getall(request):
    users_query = User.objects.all()
    print("all users")
    serializer = UserSerializer(users_query,many = True)
    print(serializer.data)
    return Response(serializer.data)


# NOW THE CODE FOR OTHER USERS {INTERACTIONS }
@api_view(['POST','GET'])
def userprofile(request):
    if request.method=='POST':
        email = request.data.get('email')
        next_user_query = User.objects.get(email=email)
        next_user_ser = UserSerializer(next_user_query)
        try:
            posts_query = Post.objects.filter(user=next_user_query).order_by('-timestamp')
            posts = PostSerializer(posts_query,many=True).data
            for post in posts:
                userid = post['user']
                user = UserSerializer(User.objects.get(uid=userid)).data
                post['user'] = {}
                post['user']['name'] = user['name']
                post['user']['email'] = user['email']
                post['user']['bio'] = user['bio']
                post['user']['image'] = user['profile_image']
        except ObjectDoesNotExist:
            posts = []
        
        
        # user ki posts bhi jani hai
        return Response({"user":next_user_ser.data,"posts":posts})

@api_view(['POST','GET'])
def is_follower(request):
    token = request.data.get('token')
    decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
    my_user = User.objects.get(email=decoded_token['email'])

    follower_db_query = Followers.objects.get(user=my_user)
    follower_db = FollowSerializer(follower_db_query).data

    next_user_email = request.data.get('next_user_email')
    next_user_query = User.objects.get(email=next_user_email)
    next_user_ser = UserSerializer(next_user_query).data

    followed = False
    print(next_user_ser['uid'])
    if next_user_ser['uid'] in follower_db['following']:
        followed = True
    print(followed)
    return Response(followed)








### FORGOT PASSWORD API's
@api_view(['POST','GET'])
def forgot_send_code(request):
    if request.method == 'POST':
        print('api called')
        email = request.data.get('email')
        if "@" in str(email) and str(email).endswith('.com'):
            try:
                user = User.objects.get(email=email)
            except ObjectDoesNotExist:
                user = None
            if user != None:
                code = randint(100000, 999999)
                return Response({'success':True,'code':code})
            else:
                return Response({'success':False,'message':"Email not exist in our database"})
        return Response({'success':False,"message":"Enter valid email"})
        
@api_view(['POST','GET'])
def forgot_change_password(request):
    print("forgot called")
    if request.method == 'POST':
        email = request.data.get('email')
        user = User.objects.get(email=email)
        print(user)
        user.password = encrypt(request.data.get('password')).decode("utf-8", "ignore")
        user.save()
        return Response({'success':True})
    else:
        return Response({'error':'error'})