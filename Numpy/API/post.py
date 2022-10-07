from pickle import TRUE
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .models import Notification, Pitch, User
from .models import Followers,Post,Comment
from rest_framework import serializers
from .userser import UserSerializer
from .followser import FollowSerializer
from .commentser import CommentSerializer
from .postser import PostSerializer
from .pitchser import PitchSerializer
from .notiser import NotificationSerializer
from django.core.exceptions import ObjectDoesNotExist
import jwt
from django.db.models import Count
jwt_key = "mhasecret"


# USER CREATE NEW POST---------------------------------------------------------
@api_view(['POST'])
def newpost(request):
    if request.method == 'POST':
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        category = request.data.get('category')
        content = request.data.get('content')
        image = request.data.get('image')
        post = Post(user=user,category=category,content=content,image=image)
        post.save()
        # CONSIDER IN FUTURE
        followers = Followers.objects.get(user=user).user_followers.all()
        for follower in followers:
            content = user.name + "  has made post for you."
            url = '/post/'+post.slug
            notification = Notification(user=follower,content=content,url=url)
            notification.save()

        # content = user.name + " likes you post."
        # url = '/post/'+post['slug']
        # notification = Notification(user=user.followers,content=content,url=url)
        # notification.save()
        

        return Response({"success":True})
# -----------------------------------------------------------------------------


@api_view(['POST','GET'])
def single_post(request):
    slug = request.data.get('slug')
    post_query = Post.objects.get(slug=slug)
    Post.objects.filter(slug=slug).update(views=post_query.views + 1)
    serializer = PostSerializer(post_query)
    post = serializer.data
    userid = post['user']
    user = UserSerializer(User.objects.get(uid=userid)).data
    post['user'] = {}
    post['user']['name'] = user['name']
    post['user']['email'] = user['email']
    post['user']['bio'] = user['bio']
    post['user']['image'] = user['profile_image']
    post['liked_user'] = []
    for uid in post['likes']:
        post['liked_user'].append(UserSerializer(User.objects.get(uid=uid)).data['email'])
    comments_query = Comment.objects.filter(post = post_query,parent=None).order_by('-timestamp')
    comments = CommentSerializer(comments_query,many=True).data
    for comment in comments:
        user = UserSerializer(User.objects.get(uid=comment['user'])).data
        comment['user'] = {}
        comment['user']['name'] = user['name']
        comment['user']['email'] = user['email']
        comment['user']['bio'] = user['bio']
        comment['user']['image'] = user['profile_image']
    return Response({"post":post,"comments":comments})


@api_view(['POST','GET'])
def getall(request):
    token = request.data.get('token')
    decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
    user = User.objects.get(email=decoded_token['email'])
    following_users = Followers.objects.get(user=user).following.all()
    posts_query = Post.objects.filter().order_by('-timestamp')
    serializer = PostSerializer(posts_query,many=True)
    posts = []
    for post in serializer.data:
        userid = post['user']
        user_query = User.objects.get(uid=userid)
        user = UserSerializer(User.objects.get(uid=userid)).data
        if user_query in following_users:
            posts.append(post)
            post['user'] = {}
            post['user']['name'] = user['name']
            post['user']['email'] = user['email']
            post['user']['bio'] = user['bio']
            post['user']['image'] = user['profile_image']
        
        # post['user'] = {}
        # post['user']['name'] = user['name']
        # post['user']['email'] = user['email']
        # post['user']['bio'] = user['bio']
        # post['user']['image'] = user['profile_image']
    # print(serializer.data)
    # print(posts)
    # print(type(serializer.data))
    # print(type(posts))
    return Response(posts)



@api_view(['POST'])
def like(request):
    if request.method=='POST':
        slug = request.data.get('slug')
        post_query = Post.objects.get(slug=slug)
        post = PostSerializer(post_query).data

        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        if user.uid in post['likes']:
            post_query.likes.remove(user)
        else:
            post_query.likes.add(user)
        content = user.name + " likes you post."
        url = '/post/'+post['slug']
        notification = Notification(user=post_query.user,content=content,url=url)
        notification.save()
        return Response({"success":True})

@api_view(['POST'])
def post_comment(request):
    slug = request.data.get('slug')
    post = Post.objects.get(slug=slug)

    token = request.data.get('token')
    decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
    user = User.objects.get(email=decoded_token['email'])

    content = request.data.get('content')
    comment = Comment(content=content,user=user,post=post)
    comment.save()
    content = user.name + " commented on you post."
    url = '/post/'+slug
    notification = Notification(user=post.user,content=content,url=url)
    notification.save()
    return Response({"success":True})



# CATEGORIES---------------------------------------------------------------------------------------
@api_view(['POST'])
def category(request):
    category = request.data.get('slug')
    if category == 'popular-discussions':
        post_query = Post.objects.all().annotate(dcount=Count('comment')).order_by('-dcount')[:20]

    elif category == 'popular-works':
        post_query = Post.objects.filter(category='Work').order_by('-views')[:20]
    elif category == 'popular-ideas':
        post_query = Post.objects.filter(category='Idea').order_by('-views')[:20]
    else:
        post_query = Post.objects.all()
    serializer = PostSerializer(post_query,many=True)
    for post in serializer.data:
        userid = post['user']
        user = UserSerializer(User.objects.get(uid=userid)).data
        post['user'] = {}
        post['user']['name'] = user['name']
        post['user']['email'] = user['email']
        post['user']['bio'] = user['bio']
        post['user']['image'] = user['profile_image']
    return Response(serializer.data)
    








@api_view(['POST','GET'])
def pitch(request):
    pitcher_user_email = request.data.get('email')
    content = request.data.get('content')
    slug = request.data.get('slug')
    post = Post.objects.get(slug=slug)
    work_user = post.user

    token = request.data.get('token')
    decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
    pitcher_user = User.objects.get(email=decoded_token['email'])

    pitch = Pitch(content=content,pitcheruser=pitcher_user,workuser=work_user,email=pitcher_user_email,post=post)
    pitch.save()
    content = pitcher_user.name + " has made bid on your post."
    url = '/mypitches/'+str(pitch.sno) #to be updaated
    notification = Notification(user=pitcher_user,content=content,url=url)
    notification.save()

    return Response({"success":True})


@api_view(['POST','GET'])
def mypitches(request):
    token = request.data.get('token')
    decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
    user = User.objects.get(email=decoded_token['email'])
    try:
        pitch_query = Pitch.objects.filter(workuser=user).order_by('-timestamp')
        my_pitches = PitchSerializer(pitch_query,many=True).data
        for pitch in my_pitches:
            pitcheruserid = pitch['pitcheruser']
            pitcheruser = UserSerializer(User.objects.get(uid=pitcheruserid)).data
            pitch['pitcheruser'] = {}
            pitch['pitcheruser']['name'] = pitcheruser['name']
            pitch['pitcheruser']['email'] = pitcheruser['email']
            
            postid = pitch['post']
            post = PostSerializer(Post.objects.get(pid=postid)).data
            pitch['post'] = {}
            pitch['post']['slug'] = post['slug']
            pitch['post']['image'] = post['image']
    except ObjectDoesNotExist:
        my_pitches = []
    return Response({"mypitches":my_pitches})




@api_view(['POST','GET'])
def single_pitch(request):
    slug = request.data.get('slug')
    pitch_query = Pitch.objects.get(slug=slug) #to be updated
    pitch = PitchSerializer(pitch_query).data
    pitcheruserid = pitch['pitcheruser']
    pitcheruser = UserSerializer(User.objects.get(uid=pitcheruserid)).data
    pitch['pitcheruser'] = {}
    pitch['pitcheruser']['name'] = pitcheruser['name']
    pitch['pitcheruser']['email'] = pitcheruser['email']
    pitch['pitcheruser']['bio'] = pitcheruser['bio']
    pitch['pitcheruser']['profile_image'] = pitcheruser['profile_image']
        
    postid = pitch['post']
    post = PostSerializer(Post.objects.get(pid=postid)).data
    pitch['post'] = {}
    pitch['post']['slug'] = post['slug']
    pitch['post']['image'] = post['image']
    pitch['post']['content'] = post['content']
    return Response({'pitch':pitch})



@api_view(['POST','GET'])
def notifications(request):
    if request.method == 'POST':
        token = request.data.get('token')
        decoded_token = jwt.decode(token, jwt_key, algorithms=["HS256"])
        user = User.objects.get(email=decoded_token['email'])
        notification_query = Notification.objects.filter(user=user).order_by('-timestamp')
        my_notifications = NotificationSerializer(notification_query,many=True).data
        return Response({"notifications":my_notifications})
    else:
        return Response({"success":False})

@api_view(['POST','GET'])
def search(request):
    query=request.data.get('slug')
    if len(query)>78:
        return Response({"posts":{},"message":'no posts found'})
    else:
        postcontent= Post.objects.filter(content__icontains=query)
        postcategory =Post.objects.filter(category__icontains=query)
        allposts_query=  postcontent.union(postcategory)
        all_posts = PostSerializer(allposts_query,many=True).data
        for post in all_posts:
            userid = post['user']
            user = UserSerializer(User.objects.get(uid=userid)).data
            post['user'] = {}
            post['user']['name'] = user['name']
            post['user']['email'] = user['email']
            post['user']['bio'] = user['bio']
            post['user']['image'] = user['profile_image']
    if len(all_posts)==0:
        return Response({"posts":{},"message":'no posts found'})
    return Response({"posts":all_posts})