
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			
			var token = common.getQueryString("token");
			var communityId = common.getQueryString("communityId");

			// var targetType = common.getQueryString("targetType");
			// var targetId = common.getQueryString("targetId");
			// var shareUserId = common.getQueryString("shareUserId");
			// var show = common.getQueryString("show");
			// var isShareLink = common.getQueryString("isShareLink");
			
		});
    });
});
