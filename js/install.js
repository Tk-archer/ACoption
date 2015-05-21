/**
 * Created by Fszer on 2015/5/11.
 */

//封装列表对象
function List() {
    this.list = [];
    this.search = function (key) {
        for (var j = this.list.length - 1, i = 0; j > i; i++, j--) {
            if (this.list[i].name === key)
                return this.list[i];
            if (this.list[j].name === key)
                return this.list[j];
        }
    };
    this.add = function (elem) {
        this.list.push(elem);
    };
    this.del = function () {
        this.list.pop();
    };
}
//获取列表
var getList = function () {
    var Item = $("#mainer-inner").children().slice(2);
    var list = new List;
    var t;
    for (var i = 0; i < Item.length; i++) {
        t = {
            name: $($(Item[i]).find("a[title]")[0]).attr("title"),
            date: Item[i]
        };
        list.add(t);
    }
    list.del();
    return list;
};
//替换列表对象函数
function replace(modA, modB) {
    var A = $(modA.date), B = $(modB.date), ts = B.clone();
    A.replaceWith(ts);
}
//更新列表顺序
function upDataList(list, nlist) {
    nlist.forEach(function (elem, index) {
        if (elem.id !== index)
            replace(list.list[index], list.search(elem));
    })
}

onMessage(function (message, sender, sendResponse) {
    if (message.flag == 1) {
        sendResponse('ok');
        console.log("ok");
        upDataList(getList(), message.data);
    }
});

$(document).ready(function () {

    var s = new message(1, 0, "get", null);
    console.log(s);
    sendMessage(s, function (res) {
        console.log(res);
        upDataList(getList(), res);
    })
});