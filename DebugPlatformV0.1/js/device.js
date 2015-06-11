/**
 * Created by lt on 2015/6/11.
 */
var key=0;
var uploadpercent=0;
function clickdown(a)
{
    document.getElementById(a+"img").src = "image/"+a+"_blue.png";
}
function clickup(a)
{
    document.getElementById(a+"img").src = "image/"+a+"_grey.png";
    if(a=="back")
    {
        window.location.href = "http://localhost:63342/ATLAS/main.html";
    }
    if(a=="refresh")
    {
    }
}

$(document).ready(function() {

    $(".userinfo").hover(function(){
        $(this).find("img").attr("src","image/user_blue.png");
    },function(){
        $(this).find("img").attr("src","image/user_grey.png");
    });

    $(".userinfo").click(function(){
        window.location.href = "http://localhost:63342/ATLAS/index.html";
    });

    $('#undatebtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess2'));
        var a = setInterval(function(){
            uploadpercent = (uploadpercent+1)%100;
            $(".progress-in").css('width',uploadpercent+"%");
            $(".progress-val").text(uploadpercent+"%");
        },50);
    });

    $('#configbtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess'));
    });

    $(".mask").click(function(){
        key=0;
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
        clearInterval(a);
    });
       // 居中
        function center(obj) {

                var screenWidth = $(window).width(), screenHeight = $(window).height();  //当前浏览器窗口的 宽高
                var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度

                var objLeft = (screenWidth - obj.width())/2 ;
                var objTop = (screenHeight - obj.height())/2 + scrolltop;

                //浏览器窗口大小改变时
                obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});

                $(window).resize(function () {
                    screenWidth = $(window).width();
                    screenHeight = $(window).height();
                    scrolltop = $(document).scrollTop();

                    objLeft = (screenWidth - obj.width()) / 2;
                    objTop = (screenHeight - obj.height()) / 2 + scrolltop;
                    if(key!=0) {
                        obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
                    }
                });
                //浏览器有滚动条时的操作、
                $(window).scroll(function () {
                    screenWidth = $(window).width();
                    screenHeight = $(widow).height();
                    scrolltop = $(document).scrollTop();
                    objLeft = (screenWidth - obj.width()) / 2;
                    objTop = (screenHeight - obj.height()) / 2 + scrolltop;

                    obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
                });
            }


        // 隐藏 的操作
        function closed(obj1, obj2) {
                obj1.hide();
                obj2.hide();
        }

     });

