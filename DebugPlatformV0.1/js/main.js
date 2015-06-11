/**
 * Created by lt on 2015/6/10.
 */
var change=890;
var container=$(".device-container");
var clickid;
var currentshow=0;
var totalnumber=container.length;
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
                currentshow=totalnumber;//如果是第一页，则去最后一页
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
            currentshow=clickid;//最后是点击相应的页数的情况
        }
        show(currentshow);
    }
);
function show(number)
{
    $(".device-data").hide();
    $(".device-data").eq(number).show();
}

