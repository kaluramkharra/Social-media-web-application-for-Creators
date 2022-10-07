
from django.contrib import admin
from django.urls import include, path
from numpy import single
from API import user,post
from . import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),


    #-----USER APIs------------------------------------------------------------------------------------
    path('signup/',user.signup), #email,sending otp,detail and account creation
    path('sendcode/',user.sendcode),# sending otp on email
    path('login/',user.login), #login with credentials and saving token in localstorage
    path('getuser/',user.getuser), #all information about my account {followers,following,basic details,and my posts}
    path('updateimage/',user.updateimage), #uploading image as profile image
    path('updateuser/',user.updateuser), #updating basic details
    path('updatepassword/',user.updatepassword), #updating passwords

    path('getall/',user.getall), #temporary api
    path('followuser/', user.follow_user), # Follow any user 

    path('userprofile/',user.userprofile),# other users profile {basic details and his posts}

    # extra API
    path('isfollower/',user.is_follower), #check if next user is in my following list or not

    #forgot password apis
    path('forgot_sendcode/',user.forgot_send_code),
    path('forgot_change/',user.forgot_change_password),
    #-------------------------------------------------------------------------------------------------

    #----POST API's-----------------------------------------------------------------------------------
    path('newpost/',post.newpost),
    path('getposts/',post.getall),
    path('post/',post.single_post),
    path('like/',post.like),
    path('comment/',post.post_comment),

    # CATEGORIES API---------------------------------------------------------------------------------
    path('category/',post.category),

    #-----PITCH API----------------------------------------------------------------------------------
    path('pitch/',post.pitch),
    path('mypitches/',post.mypitches),
    path('singlepitch/',post.single_pitch),
    # ----------------------------------------------------------------------------------------------

    # NOTIFICATION API-------------------------------------------------------------------------------
    path('notifications/',post.notifications),
    path('search/',post.search)



]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
