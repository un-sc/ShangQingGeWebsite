var json = [{
    "name": "首页",
    "icon": "<i class='mdi mdi-home'></i>",
    "url": "./index.html"
},
{
    "name": "关于",
    "icon": "<i class='mdi mdi-information'></i>",
    "url": "./about.html"
},
{
    "name": "加入服务器",
    "icon": "<i class='mdi mdi-lan-connect'></i>",
    "url": "./join.html"
},
{
    "name": "服务器规定",
    "icon": "<i class='mdi mdi-book-open'></i>",
    "url": "./rules.html"
},
{
    "name": "联安的blog",
    "icon": "<i class='mdi mdi-blogger'></i>",
    "url": "https://blog.unsc.dev",
    "target": "_blank"
},
{
    "name": "English",
    "icon": "<i class='mdi mdi-alphabetical'></i>",
    "url": "./en-us/index.html",
    "target": "_blank"
}
]
/*递归实现获取无级树数据并生成DOM结构*/
var str = "";
var forTree = function (o) {
    for (var i = 0; i < o.length; i++) {
        var urlstr = "";
        try {
            if (typeof o[i]["target"] == "undefined") {    
                urlstr = "<li class='nav-item'><a href=" + o[i]["url"] + ">" + o[i]["icon"] + o[i]["name"] + "</a></li>";
            } else {
                urlstr = "<li class='nav-item'><a href=" + o[i]["url"] + " target=" + o[i]["target"] + ">" + o[i]["icon"] + o[i]["name"] + "</a></li>";
            }
            str += urlstr;
            if (o[i]["list"] != null) {
                forTree(o[i]["list"]);
            }
            str += "</ul>";
        } catch (e) { }
    }
    return str;
}
/*添加无级树*/
document.getElementById("menuTree").innerHTML = forTree(json);
/*树形菜单*/
var menuTree = function () {
    //给有子对象的元素加[+-]
    $("#menuTree ul").each(function (index, element) {
        var ulContent = $(element).html();
        var spanContent = $(element).siblings("span").html();
        if (ulContent) {
            $(element).siblings("span").html("[+] " + spanContent)
        }
    });

    $("#menuTree").find("div span").click(function () {
        var ul = $(this).siblings("ul");
        var spanStr = $(this).html();
        var spanContent = spanStr.substr(3, spanStr.length);
        if (ul.find("div").html() != null) {
            if (ul.css("display") == "none") {
                ul.show(300);
                $(this).html("[-] " + spanContent);
            } else {
                ul.hide(300);
                $(this).html("[+] " + spanContent);
            }
        }
    })
}

function curzt(v) {
    $("#menuTree span").each(function (index, element) {
        var ul = $(this).siblings("ul");
        var spanStr = $(this).html();
        var spanContent = spanStr.substr(3, spanStr.length);
        if (ul.find("div").html() != null) {
            $(this).html("[" + v + "] " + spanContent);
        }
    });
}
