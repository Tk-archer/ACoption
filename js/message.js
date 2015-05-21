/**
 * Created by Fszer on 2015/5/11.
 */

//发送

sendMessage= function (option,cb) {

    var sends={
        flag:option.flag,
        data:option.data
    };
    if(option.id===0)
        chrome.tabs.sendMessage(option["tid"],sends,cb);
    if(option.id===1)
        chrome.runtime.sendMessage(sends,cb);
};
//响应信息
/*function(message, sender, sendResponse){

 }*/
onMessage = function (cb) {
    chrome.runtime.onMessage.addListener(cb);
};

function message(id,tid,flag,data){
    this.id=id||1;
    this.tid=tid||null;
    this.flag=flag||null;
    this.data=data||null;
}