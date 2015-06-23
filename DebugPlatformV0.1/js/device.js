/**
 * Created by lt on 2015/6/11.
 */
var key=0;
var uploadpercent=0;
var configData=null;
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

function confirmConfChange(confItemName){
    var res = false;
    if($("#"+confItemName).val() != configData[confItemName]){
    	configData[confItemName] = $("#"+confItemName).val();
	res = true;
    }
    return res;
}

$(document).ready(function() {


    $(".userinfo").hover(function(){
        $("#usericon").attr("src","image/user_blue.png");
        $("#logout").show();
    },function(){
        $("#usericon").attr("src","image/user_grey.png");
        $("#logout").hide();
    });

    $('#sendCommand').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess2'));
    });

    $('#configbtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess'));

	$.ajax({
             url:"php/getDataByUrl.php",
             type:"POST",
             data:{
                 deviceID:deviceID
             },
             success:function(data){
		 configData = data;
                 $(".mess-body").find(".form-control").eq(0).val(data["sensor_interval"]);
                 $(".mess-body").find(".form-control").eq(1).val(data["duty_interval"]);
                 $(".mess-body").find(".form-control").eq(2).val(data["fan_speed"]);
                 $(".mess-body").find(".form-control").eq(3).val(data["check_interval"]);
                 $(".mess-body").find(".form-control").eq(4).val(data["time_sync_interval"]);
                 $(".mess-body").find(".form-control").eq(5).val(data["sensor_avg"]);
                 //$(".mess-body").find(".form-control").eq(6).val(data["sensor_interval"]);
             },
             dataType:'JSON'
         });

    });

    $(".mask").click(function(){
        key=0;
        closed($('.mess2'),$('.mess'));
        //closed($('.mask'));
	$('.mask').hide();
        //clearInterval(a);
    });
   $(".closebtn").click(function () {
        key=0;
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
        //clearInterval(a);
    });

    $(".closebtn2").click(function () {
        key=0;
        closed($('.mess2'),$('.mess'));
        //closed($('.mask'));
	$('.mask').hide();
        //clearInterval(a);
    });

    $("#applybtn").click(function(){
        //key=0;
        //closed($('.mess2'),$('.mess'));
        //closed($('.mask'));
        //clearInterval(a);
	if(confirmConfChange("sensor_interval")||confirmConfChange("duty_interval")||confirmConfChange("fan_speed")||
		confirmConfChange("check_interval")||confirmConfChange("time_sync_interval")||confirmConfChange("sensor_avg")){
	    configData["latest_change_time"]=getCurrentDateTime();
            $.ajax({
                 url:'php/uploadData.php',
                 type:"POST",
                 data:{
                     data:configData,
		     deviceID:deviceID
                 },
                 success:function(data){
		    if(data['resp']=='true'){
			alert("参数已修改，请下发命令!");
		    	//$("#confAppBtn").attr("disabled",false);
		    }
                 },
                 dataType:'JSON'
             });
		closePanel();
	}else{
		alert("参数未做修改,请确认!");
	}

    });


    /*$("#confAppBtn").click(function(){
	var command=$("#config_command").val();
	if(command=="config"){
	    $.ajax({
	    	url:'php/postCommand.php',
		type:'POST',
		data:{
		    command:command,
		    deviceID:deviceID
		},
		success:function(data){
		    if(data['resp']=='true'){
			alert("配置成功！");
			closePanel();
		    }else{
		    	alert("配置失败");
		    }
		},
		dataType:'JSON'
	    });
	}else{
	    alert("只支持confing命令！");
	}
    });*/

   $("#upgradeConfirm").click(function(){
	var command = $("#upgradeCommand").val();
	if(command =="upgrade"){
	if(confirmPanel(command)){
	    $.ajax({
		url:'php/postCommand.php',
		type:'POST',
		data:{
		    command:command,
		    deviceID:deviceID
		},
		success:function(data){
		    if(data["resp"]=='true'){
		    	alert("命令下发成功，请十分钟后去服务器查询升级日志!");
		    }else{
			alert("命令下发失败，请重新提交！");
		    }
		},
		dataType:"JSON"
	    });
	}else{
	    alert("update false,please try again!");
	    return;
	}
	}else{
	    if(confirmPanel(command)){
            $.ajax({
                url:'php/postCommand.php',
                type:'POST',
                data:{
                    command:command,
                    deviceID:deviceID
                },
                success:function(data){
                    if(data["resp"]=='true'){
                        alert("命令下发成功，请刷新页面查看最新数据");
                    }else{
                        alert("命令下发失败，请重新提交！");
                    }
                },
                dataType:"JSON"
            });
        }else{
            alert("取消命令下发！");
            return;
        }

	};
	closePanel();	
   });


    $(".commandlist").find("li").click(function(){
        var mess=$(this).text();
        $(this).parent().prev().prev().val(mess);
    });

    /*$(".mess2-config-btn").click(function(){
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
    });*/
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
                    screenHeight = $(window).height();
                    scrolltop = $(document).scrollTop();
                    objLeft = (screenWidth - obj.width()) / 2;
                    objTop = (screenHeight - obj.height()) / 2 + scrolltop;
                    if(key!=0) {
                        obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
                    }
                });
            }

        function closed(obj1, obj2) {
                obj1.hide();
                obj2.hide();
        }
	function closePanel(){
            key = 0;
            closed($('.mess2'),$('.mess'));
            //closed('.mask');
	    $('.mask').hide();
            //clearInterval(a);

	}

	function getCurrentDateTime(){
	    var date = new Date();
	    var year = date.getFullYear().toString();
	    var month = (date.getMonth()+1).toString();
	    var day = date.getDate().toString();
	    var hour = date.getHours().toString();
	    var min = date.getMinutes().toString();
	    var sec = date.getSeconds().toString();
	    return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	}
     
        function confirmPanel(command){
	    if(confirm("将要提交"+command+"指令，请确认！")){
	    	return true;
	    }else{
	    	return false;
	    }
	}
});

