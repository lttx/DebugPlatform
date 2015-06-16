/**
 * Created by lt on 2015/6/10.
 */

var userInfo={};
if($.cookie("loginStatus") && $.cookie("loginStatus") != 'null'){
    window.location.href = "main.html";
}

var click=0;
$("#loginbtn").hover(
    function(){
        $(this).attr("src","image/log_blue.png");
    },function(){
        $(this).attr("src","image/login.png");
    }).click(function(){
        var userName = $("#username").val();
        var password = md5($("#password").val().trim());
        $("#password").val(password);
        if(userName == 'admin'){
            if(password=='7dae8bbd800f38dfa83213d7919dc996'){
                $.cookie('loginStatus',true,{path:'/DebugPlatform'});
                $.cookie('username',userName,{path:'/DebugPlatform'});
                $.ajax({
                    type:"POST",
                    url:"php/getUserDevices.php",
                    data: {
                        username:userName
                    },
                    success:function(data){
                        window.location.href = "main.html";
                },
                    dataType:'JSON'
                });
            }else{
                alert("Wrong username or password!");
            }
        }else{
            alert("Wrong username or password!");
        }
    });

$("#rememberpdw").click(function(){
        click = (click+1)%2;
        if(click) {
            $(this).attr("src","image/password_blue.png");
        }
        else {
            $(this).attr("src", "image/password_grey.png");
        }
});

