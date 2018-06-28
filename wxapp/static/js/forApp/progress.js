define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {

			var owalletAmount = common.getQueryString("owalletAmount");
			var ofee = common.getQueryString("ofee");
			var ocardNum = common.getQueryString("ocardNum");
			
			$('.cd1 .right').html("￥"+owalletAmount);
			$('.cd2 .right').html("￥"+ofee);
			$('.cd3 .right').html(ocardNum);


			
			
        });
    });
});
