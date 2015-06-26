/**
 * Created by lt on 2015/6/23.
 */
var key = 0 ;
var uploadpercent=0;
var mark ="";
var amountstr="";
var devicestr ="";
var deviceIDs = null;
var deviceCntPP = 9;

var ajaxData = $.ajax({
    async:false,
    type:"POST",
    url:"php/getUserDevices.php",
    data: {
        username:'admin'
    },
    success:function(data){
        deviceIDs = data;
    },
    dataType:'JSON'
});

var deviceCount = deviceIDs["devices"].length;

//导入设备
for(var i=1;i<deviceCount;i++)
{
    var id = deviceIDs['devices'][i]['device_id'];
    //导入设备信息到左侧导航栏
    amountstr = amountstr+"<li id='"+i+"'>"+id+"</li>";
    //导入详细信息到右侧表格
    devicestr = devicestr+ "<tr id='"+id+"'><td width='7%'><input type='checkbox' name='devicecheckbox'></td><td width='31%'>"+id+"</td> <td width='7%'>2.0</td> <td width='7%'>12</td> <td width='7%'>30</td> <td width='8%'>50</td> <td width='6%'>26℃</td> <td width='8%'>56%</td> <td width='6%'>2</td> <td width='8%'>在线</td> <td width='6%'><img src='image/set_blue.png'></td> </tr> <tr style='display: none;' id='devicecontrol_"+i+"'> <td colspan='11' style='padding-left: 55%;'> <button class='btn btn-default configbtn'>配置</button> <button class='btn btn-default upgradebtn'>固件升级</button> <button class='btn btn-default'>导出数据</button> </td> </tr>"
}
$("#deviceul").append(amountstr);
$("#devicetable").append(devicestr);

$(document).ready(function() {
    var left = $(".left");
    var leftbtn = $("#left-btn");
    var click = 0;
    var location = window.location.href;
    var singledeviceID ="";
    var deviceIDlist = "";

    //执行命令交互的JS
    //每一行中的配置按钮，单独配置
    $('.configbtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess'));
        deviceIDlist =$(this).parent().parent().prev().attr("id")+" ";
    });

    //下方的配置按钮，一次配置多台
    $('#configbtn').click(function() {
        key=1;
        deviceIDlist = "";
        $(":checkbox").each(function(){
            if($(this).prop("checked"))
            {
                deviceIDlist = deviceIDlist + $(this).parent().parent().attr("id")+" ";
            }
        });
        $('.mask').css({'display': 'block'});
        center($('.mess'));
    });

    //配置页面提交按钮
    $("#applybtn").click(function(){
        key=0;
        var applyData = $.ajax({
            type:"POST",
            url:"php/getUserDevices.php",
            data: {
                command:"applyconfig",
                configid:deviceIDlist
            },
            success:function(data){
                alert(data);
            }
        });
        closed($('.mess2'),$('.mess'));
        closed($('.mask'));
    });

    //左侧命令窗口提交的命令
    $(".commandlist").find("button").click(function(){
        var commandData = $.ajax({
            async:false,
            type:"POST",
            url:"php/getUserDevices.php",
            data: {
                command:mark
            },
            success:function(data){
                alert(data);
            }
        });
    });

    //实现页面控制的JS
    $("tbody tr:visible:even").css("background-color","lightgray");

    function removeClassDelayed(jqObj, cerror, to) {
        setTimeout(function () {
            jqObj.removeClass(cerror);
        }, to);
    }

    function addClassDelayed(jqObj, cerror, to) {
        setTimeout(function () {
            jqObj.addClass(cerror);
        }, to);
    }

    $(".closeimg").hover(function(){
        $(this).attr("src","image/close_blue.png");
    },function(){
        $(this).attr("src","image/close.png");
    }).click(function(){
        $(".upgrademenu").hide();
    });

    leftbtn.click(function () {
        $("#right").fadeToggle();
        click = (click + 1) % 2;
        if (click == 1) {
            left.animate({left: '-20%',opacity: '0'});
            leftbtn.animate({left: '0px'});
            removeClassDelayed($("#right"), "right", 500);
            addClassDelayed($("#right"), "right-full", 500);
        }
        else if (click == 0) {
            left.animate({left: '0px',opacity: '1'});
            leftbtn.animate({left: '20%'});
            removeClassDelayed($("#right"), "right-full", 500);
            addClassDelayed($("#right"), "right", 500);
        }
        $("#right").fadeToggle();
    });

    $(".head").hover(function(){
        var imgid = $(this).find("img").attr("id");
        $(this).find("img").eq(0).attr("src","image/"+imgid+"_blue.png");
    },function(){
        var imgid = $(this).find("img").attr("id");
        $(this).find("img").eq(0).attr("src","image/"+imgid+"_white.png");
    }).click(function(){
        if($(this).next().is(':visible')){
            $(this).next().slideUp();
            $(this).find("img").eq(1).attr("src","image/right_white.png");
        }
        else
        {
            $(".list").slideUp();
            $(this).next().slideToggle();
            $(".headicon2").attr("src","image/right_white.png");
            $(this).find("img").eq(1).attr("src","image/down_white.png");
        }
    });

    $(".userinfo").hover(function(){
        $(this).find("img").eq(0).attr("src","image/user_blue.png");
        $("#logout").show();
    },function(){
        $(this).find("img").eq(0).attr("src","image/user_white.png");
        $("#logout").hide();
    });

    $('.upgradebtn').click(function() {
        key=1;
        $('.mask').css({'display': 'block'});
        center($('.mess2'));

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
            if(key!=0) {
                obj.css({left: objLeft + 'px', top: objTop + 'px', 'display': 'block'});
            }
        });
    }

    function closed(obj1, obj2) {
        obj1.hide();
        obj2.hide();
    }

    $(".commandlist").find("li").click(function(){
        mark = $(this).text();
        $(this).siblings().removeClass("activeli");
        $(this).addClass("activeli");
    });



    $("#upgradeinfo").hover(function(){
        $(".upgrademenu").show();
    },function(){
        $(".upgrademenu").hide();
        $(".upgrademenu").hover(function(){
            $(".upgrademenu").show();
        },function(){
            $(".upgrademenu").hide();
        });
    });

    $("#uploadsure").click(function(){
        $(".upgrademenu").hide();
    });

    $("#chooseall").click(function(){
        $(":checkbox").each(function(){
            if($(this).prop("checked"))
            {
                $(this).prop("checked",false);
            }
            else
            {
                $(this).prop("checked",true);
            }
        });
    });

    $("#devicetable").find("img").click(function(){

        if($(this).parent().parent().next().is(":visible"))
        {
            $(this).attr("src","image/set_blue.png");
            $(this).parent().parent().next().hide();
            $(this).parent().parent().find(":checkbox").prop("checked",false);
        }
        else
        {
            $(":checkbox").each(function () {
                $(this).prop("checked",false);
                $(this).parent().parent().next().hide();
                $(this).parent().parent().find("img").attr("src","image/set_blue.png");
            });
            $(this).attr("src","image/set_click.png");
            $(this).parent().parent().next().show();
            $(this).parent().parent().find(":checkbox").prop("checked",true);
        }

        $("tbody tr:visible").css("background-color","lightgray");
        $("tbody tr:visible:odd").css("background-color","#ebeef0");

    });
});/**
 * Created by lt on 2015/6/25.
 */
