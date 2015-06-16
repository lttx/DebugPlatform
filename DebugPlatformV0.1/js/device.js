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
        history.go(-1);
    }
    if(a=="refresh")
    {
	window.location.reload();
    }
}

/* read parameters from url
    lttx  2015/06/16
*/

var url = window.location.href;
var deviceID = url.split('?')[1];
$(".headdata").find(".blank").next().eq(0).html(deviceID);

requestData();
setInterval(requestData,60000);

function requestData(){
$.ajax({
    async: false,
    type:"POST",
    url:"php/getLatestData.php",
    data: {
    	deviceID:deviceID
    },
    success:function(data){
	var normalData = data["normal_data"];
	var fanData = data["fan_data"];
        $("#pm01").text(normalData["pm01"]);
        $("#pm25").text(normalData["pm25"]);
        $("#pm10").text(normalData["pm10"]);
        $("#temperature").text(normalData["t"]);
        $("#humidity").text(normalData["h"]);
        $("#fanlevel").text(fanData["fan_speed"]);
	$(".footinfo").each(function(){
	   $(this).text(normalData["time"]); 
	});
	$(".footinfo").eq(5).text(fanData["time"]);
    },
    dataType:'JSON'
});

}

$(document).ready(function() {


    $(".userinfo").hover(function(){
        $("#usericon").attr("src","image/user_blue.png");
        $("#logout").show();
    },function(){
        $("#usericon").attr("src","image/user_grey.png");
        $("#logout").hide();
    });

    $('#undatebtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess2'));

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
   $(".closebtn").click(function () {
        key=0;
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
        clearInterval(a);
    });

    $(".closebtn2").click(function () {
        key=0;
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
        clearInterval(a);
    });

    $("#applybtn").click(function(){
        key=0;
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
        clearInterval(a);
    });

    $(".commandlist").find("li").click(function(){
        var mess=$(this).text();
        $(this).parent().prev().prev().val(mess);
    });

    $(".mess2-config-btn").click(function(){
        var a = setInterval(function(){
            if(uploadpercent!=100){
                uploadpercent = (uploadpercent+1)%101;
            }
            if(uploadpercent==100)
            {
                uploadpercent=uploadpercent;
            }
            $(".progress-in").css('width',uploadpercent+"%");
            $(".progress-val").text(uploadpercent+"%");
        },50);
        $(".command2").hide();
        $(".progress").show();
        $(".progress-val").show();
        $(".progress-bar").show();
        $(".progress-in").css("display","block");
        $(".upload-info").show();
    });
        function center(obj) {

                var screenWidth = $(window).width(), screenHeight = $(window).height(); 
                var scrolltop = $(document).scrollTop();

                var objLeft = (screenWidth - obj.width())/2 ;
                var objTop = (screenHeight - obj.height())/2 + scrolltop;

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
                $(window).scroll(function () {
                    screenWidth = $(window).width();
                    screenHeight = $(widow).height();
                    scrolltop = $(document).scrollTop();
                    objLeft = (screenWidth - obj.width()) / 2;
                    objTop = (screenHeight - obj.height()) / 2 + scrolltop;

                    obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
                });
            }

        function closed(obj1, obj2) {
                obj1.hide();
                obj2.hide();
        }

     });

