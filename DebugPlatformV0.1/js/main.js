/**
 * Created by lt on 2015/6/10.
 */
$(document).ready(function(){
    //改成了只向device-container中添加数据
    var str="";
    for(var count = 0; count <19; count++){
        str += '<div class="device"><table><tr><td class="td1">设备ID</td><td class="blank"></td><td class="td2">'+'设备的ID'+'</td></tr><tr><td class="td1">设备版本</td><td class="blank"></td><td class="td2">2.0</td></tr></table><button class="device-btn">ATLAS home</button></div>';
    }
    $(".device-container").append(str);

    $(".device-btn").click(function(){
        window.location.href = "device.html";
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
                    currentshow = currentshow + 1;
                }
            }
            else
            {
                currentshow=clickid;
            }
            show(currentshow);
        }
    );
});

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
	var htmlStart = "";
	var htmlEnd = "";
	if($(".device").length % deviceCntPP ==0){
	    htmlStart = "<div class='device_data'>";
	    htmlEnd = "</div>";
	}
	deviceStr += htmlStart + '<div class="device"><table><tr><td class="td1">设备ID</td><td class="blank"></td><td class="td2">'+deviceIDs["devices"][count]["device_id"]+'</td></tr><tr><td class="td1">设备版本</td><td class="blank"></td><td class="td2">2.0</td></tr></table><button class="device-btn">ATLAS home</button></div>'+htmlEnd;

}
$(".device-container").append(deviceStr);
alert($(".device").length);


var change="448px";
var container=$(".device-container");
var clickid;

//改为向上或者向下滑动距离
function show(number)
{
    var changenum = number*446+"px";
    $(".device-container").css("top","-"+changenum);
}


