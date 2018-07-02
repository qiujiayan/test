
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			$('body').css('display','block');			
			//shareUserId=73&targetId=188&targetType=2
			var targetType = common.getQueryString("targetType");
			var targetId = common.getQueryString("targetId");
			var shareUserId = common.getQueryString("shareUserId");
			var show = common.getQueryString("show");

			


		});
    });
});
