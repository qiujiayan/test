var doName, mainUrl, rescUrl,webDoName;
//本地环境
// doName = "http://192.168.0.168:8082/app";//田接口本地地址
// webDoName = "http://192.168.0.168:8082/web";//田接口本地地址
// // doName = "http://192.168.0.118:8082/app";//程扬接口本地地址
// // webDoName = "http://192.168.0.118:8082/web";//程扬接口本地地址
// mainUrl = "http://192.168.0.113:8080/wxapp"//app
// rescUrl = "http://192.168.0.113:8080"//基础路经


//生产环境

doName = "https://www.chaohuo.net:7090/app";//线上地址
webDoName = "https://www.chaohuo.net:7090/web";//田接口本地地址
mainUrl = "https://www.chaohuo.net/wxapp";
rescUrl = "https://www.chaohuo.net/";

//测试环境

// doName ="http://123.206.108.84:8099/app"
// webDoName = "http://123.206.108.84:8099/web";
// mainUrl = "http://192.168.1.101:8080/wxapp";
// rescUrl = "http://192.168.1.101:8080";
// mainUrl = "https://www.chaohuo.net/test";
// rescUrl = "https://www.chaohuo.net/";
seajs.config({
    base: rescUrl,
    alias: {
        // zepto: "wxapp/static/js/plugins/zepto.min",
        // jquery: "wxapp/static/js/plugins/jquery-3.1.0.min",
        // qrCode: "wxapp/static/js/plugins/jquery.qrcode.min",
        // zeptoAlert: "wxapp/static/js/plugins/zepto.alert",
        // selfAlert: "wxapp/static/js/plugins/alert",
		// wx: "wxapp/static/js/plugins/jweixin",
        // iSlider: "wxapp/static/js/plugins/swipeSlide.min",
        // fastclick: "wxapp/static/js/plugins/fastclick",
        // appApi: "wxapp/static/js/plugins/appApi",
        // common: "wxapp/static/js/plugins/common",
        // md5: "wxapp/static/js/plugins/md5",       
        // swiper : 'wxapp/static/js/plugins/swiper-3.4.0.jquery.min',

        zepto: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/zepto.min.js",
        jquery: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/jquery-3.1.0.min.js",
        qrCode: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/jquery.qrcode.min.js",
        zeptoAlert: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/zepto.alert.js",
        selfAlert: "wxapp/static/js/plugins/alert",
		wx: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/jweixin.js",
        iSlider: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/swipeSlide.min.js",
        fastclick: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/fastclick.js",
        appApi: "wxapp/static/js/plugins/appApi",
        common: "wxapp/static/js/plugins/common",
        md5: "https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/md5.js",       
        swiper : 'https://superfireoss-1255482466.file.myqcloud.com/STATIC_SOURCE/swiper-3.4.0.jquery.min.js',

    },
    preload: [ "jquery" ],
    map: [ [ /^(.*\.(?:css|js))(.*)$/i, "$1?v="+new Date().getTime() ] ],
    vars: [],
    charset: "utf-8"
});
