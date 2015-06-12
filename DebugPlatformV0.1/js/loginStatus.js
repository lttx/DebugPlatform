/**
 * Created by jixian on 2015/6/11.
 */
$(document).ready(function(){
    if($.cookie('loginStatus') && $.cookie("loginStatus") != 'null'){
    }
    else{
        window.location.href='index.html';
    }

    $("#logout").click(function(){
        $.cookie('loginStatus',null,{path:'/DebugPlatform'});
        $.cookie('username',null,{path:'/DebugPlatform'});
        window.location.href="index.html";
    });
});
