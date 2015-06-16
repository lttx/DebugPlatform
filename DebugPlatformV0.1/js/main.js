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


var change=890;
var container=$(".device-container");
var clickid;
var currentshow=0;
//var totalnumber=container.length;
var totalnumber = Math.floor(deviceCount/deviceCntPP);
var str = "";
for(i=0;i<=totalnumber;i++)
{
str = str+"<li id='"+i+"'>"+(i+1)+"</li>";
}
$("#pre").after(str);
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
function show(number)
{
    $(".device-data").hide();
    $(".device-data").eq(number).show();
}

$(document).ready(function(){
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

});
