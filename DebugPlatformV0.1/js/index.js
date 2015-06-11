/**
 * Created by lt on 2015/6/10.
 */
var click=0;
$("#loginbtn").hover(
    function(){
        $(this).attr("src","image/log_blue.png");
    },function(){
        $(this).attr("src","image/login.png");
    }
);

$("#rememberpdw").click(function(){
        click = (click+1)%2;
        if(click) {
            $(this).attr("src","image/password_blue.png");
        }
        else {
            $(this).attr("src", "image/password_grey.png");
        }
});

