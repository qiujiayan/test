
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			//var codeUrl;
			if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){//苹果设备
				location.href ="https://itunes.apple.com/cn/app/%E8%B6%85%E7%81%AB/id1348054748?mt=8";
		    }
			if(navigator.userAgent.match(/android/i)){//安卓设备 
				location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.sf.superfire";	  
			}

			
        });
    });
});
