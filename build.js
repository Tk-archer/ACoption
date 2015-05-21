/**
 * Created by Fszer on 2015/4/9.
 */
var path = require('path');
var fse = require('fs-extra');
var readdirp = require("readdirp");

var fileList = [];
var paths = "./app/";

readdirp({
    root: "./",
    fileFilter: ["*.json", "*.js", "*.css", "*.html","*.png"],
    directoryFilter: ["!app", "!*modules", "!*data"]
})
    .on("data", function (res) {
        var temp = res.parentDir.length != 0 ? res.parentDir + "/" + res.name : res.name;
        fileList.push(temp);
    }).on("end", function () {
        fileList.forEach(function (elem, index) {
            fse.copy(elem, paths + elem, function (err) {
                console.log(paths + elem);
            })
        })
    });

