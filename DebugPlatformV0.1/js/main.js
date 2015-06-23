/**
 * Created by lt on 2015/6/10.
 */
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
var deviceStr = "";
for(var count = 0; count < deviceCount; count++){
        deviceStr += '<div class="device"><table><tr><td class="td1">设备ID</td><td class="blank"></td><td class="td2">'+deviceIDs["devices"][count]["device_id"]+'</td></tr><tr><td class="td1">设备版本</td><td class="blank"></td><td class="td2">2.0</td></tr></table><button class="device-btn">ATLAS home</button></div>';

}
$(".device-container").append(deviceStr);

var change="448px";
var container=$(".device-container");
var clickid;



$(document).ready(function(){
    //改成了只向device-container中添加数据

    $(".device-btn").click(function(){
	var deviceID = $(this).parent().find('.td2').eq(0).text();
        window.location.href = "device.html?"+deviceID;
    });

    $(".userinfo").hover(function(){
        $("#usericon").attr("src","image/user_blue.png");
        $("#logout").show();
    },function(){
        $("#usericon").attr("src","image/user_grey.png");
        $("#logout").hide();
    });

    //生成下方的分页标签
    var totalnumber = Math.floor(count/deviceCntPP);
    var controlstr = "";
    var currentshow=0;

    for(i=0;i<=totalnumber;i++)
    {
        controlstr = controlstr+"<li id='"+i+"'>"+(i+1)+"</li>";
    }
    $("#pre").after(controlstr);
    showli(0);
    $("#pre").hide();
    $("#next").show();
    $("li").click(
        function()
        {
            clickid=$(this).attr("id");
            if(clickid=="pre")
            {
                if(currentshow=="0")
                {
                    currentshow=totalnumber;
                }
                else
                {
                    currentshow = currentshow-1;
                }
            }
            else if(clickid=="next")
            {
                if(currentshow==totalnumber)
                {
                    currentshow=0;
                }
                else
                {
                    currentshow = parseInt(currentshow)+parseInt(1);
                }
            }
            else
            {
                currentshow=clickid;
            }
            show(currentshow);
            //切换选中状态,最多显示7个
            $("li").removeClass("choosedli");
            showli(currentshow);
            //隐藏与现实最后一页和第一页
            if(currentshow==0)
            {
                $("#pre").hide();
            }
            else
            {
                $("#pre").show();
            }
            if(currentshow==totalnumber)
            {
                $("#next").hide();
            }
            else
            {
                $("#next").show();
            }
        }
    );
});


//改为向上或者向下滑动距离
function show(number)
{
    var changenum = number*447+"px";
    $(".device-container").css("top","-"+changenum);
}

function showli(number)
{
    number = parseInt(number)+parseInt(1);
    var choosedli = $("li").eq(parseInt(number));
    choosedli.addClass("choosedli");
    choosedli.prevAll().hide();
    choosedli.prev().show();
    choosedli.prev().prev().show();
    choosedli.nextAll().hide();
    if(number==1)
    {
        choosedli.next().next().next().show();
        choosedli.next().next().next().next().show();
    }
    choosedli.next().show();
    choosedli.next().next().show();
}
