/**
 * Created by Fszer on 2015/5/10.
 */

var oList=["娱 乐", "新番更新列表","动 画", "舞 蹈", "游 戏", "影 视", "科 技", "体 育"];
//响应信息函数
onMessage(function (message, sender, sendResponse) {
    if (message.flag == 2)

        sendResponse(uLists.list);
});
//
getList = function () {
    var li = $('[name="lists"]');
    var list=[];
    for (var i = 0; i < li.length; i++) {
        var index=parseInt($(li[i]).attr("data-row"));
        list[index-1]=$(li[i]).attr("value");
    }
    return list;
};
setlist= function (list) {
    var li="";
    list.forEach(function (elem,index) {
        li+="<li name='lists'data-row=' "+index+1+"' data-col='1' data-sizex='1' data-sizey='1' value='"+elem+"'>"+elem+"</li>"
    });
    $("ul").append(li);

    var gr=$(".gridster ul").gridster({
        widget_margins: [0, 2],
        widget_base_dimensions: [200, 40]
    }).data('gridster');
    setTimeout(function () {
        $("#temp").fadeOut("fast", function () {
            $(this).remove();
        })

    },500);


};


$(document).ready(function () {
    var s =new message(1,0,"get",null);
    console.log(s);
    sendMessage(s, function (res) {
        res=res.length==0?oList:res;
        console.log(res);
        setlist(res);
    });

    $("#save").click(function () {
        var list=getList();
        var s=new message(1,0,"save", list);
        console.log(s);
        sendMessage(s,function(res){
            console.log(res);
        })
    });
    $("#reset").click(function () {
        var s=new message(1,0,"reset");
        console.log(s);
        sendMessage(s,function(res){

            console.log(res);
            setlist(res);
            location.reload();
        })

    });
});

