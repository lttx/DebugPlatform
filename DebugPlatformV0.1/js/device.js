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
       // ����
        function center(obj) {

                var screenWidth = $(window).width(), screenHeight = $(window).height();  //��ǰ��������ڵ� ���
                var scrolltop = $(document).scrollTop();//��ȡ��ǰ���ھ���ҳ�涥���߶�

                var objLeft = (screenWidth - obj.width())/2 ;
                var objTop = (screenHeight - obj.height())/2 + scrolltop;

                //��������ڴ�С�ı�ʱ
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
                //������й�����ʱ�Ĳ�����
                $(window).scroll(function () {
                    screenWidth = $(window).width();
                    screenHeight = $(widow).height();
                    scrolltop = $(document).scrollTop();
                    objLeft = (screenWidth - obj.width()) / 2;
                    objTop = (screenHeight - obj.height()) / 2 + scrolltop;

                    obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
                });
            }


        // ���� �Ĳ���
        function closed(obj1, obj2) {
                obj1.hide();
                obj2.hide();
        }

     });

