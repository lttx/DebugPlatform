/**
 * Created by lt on 2015/6/26.
 */
$(function() {
    var deviceid ="";
    var availableTags;
    $("#devicetable").find("tr").each(function(){
        deviceid = deviceid+$(this).attr("id")+" ";
    });
    availableTags = deviceid.split(" ");
    $( "#autocomplete" ).autocomplete({source:availableTags,scroll:true});
});

$(document).ready(function() {
    $("#searchbtn").click(function(){
        var value = document.getElementById('autocomplete').value;
        $("tr").each(
            function(){
                $(this).css("border","none");
                if($(this).attr("id")==value){
                    $(this).css("border","3px solid royalblue");
                }
            }
        );
    });
});