/**
 * Created by Fszer on 2015/5/12.
 */
function uList(){
    this.list=[];
    //保存
    this.saveList=function () {
        localStorage["userList"] = JSON.stringify(this.list);
    };
    //加载
    this.loadList=function () {
        this.list=localStorage["userList"]?JSON.parse(localStorage["userList"]):[];
    };
    //获取
    this.getList = function () {
        var li = $('[name="lists"]');
        this.list=[];
        for (var i = 0; i < li.length; i++) {
            this.add($(li[i]).html());
        }
        this.saveList();
    };
    this.add= function (elem) {
        this.list.push(elem);
    };
    this.reset=function(list){
        this.list=list||[];
        this.saveList();
    };
    this.isNull=function(){
        return this.list.length==0;
    }
}



var uLists=new uList();
uLists.loadList();



onMessage(function (message, sender, sendResponse) {
    if(message.flag == "get"){
        if(uLists.isNull())
            uLists.loadList();
        sendResponse(uLists.list);

    }
    if(message.flag == "reset"){
        uLists.reset([]);
        sendResponse(uLists.list);

    }
    if(message.flag == "save"){
        uLists.reset(message.data);
        chrome.tabs.query({url:"http://www.acfun.tv/"}, function(tabs){
            tabs.forEach(function (ele) {
                message.id=0;
                message['tid']=ele.id;
                message.flag=1;
                console.log(message);
                sendMessage(message,function (response) {
                    console.log(response);
                    sendResponse(response);
                });
            });
        });
    }

});
