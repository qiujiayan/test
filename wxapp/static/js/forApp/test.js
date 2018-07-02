define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			var $input = $(".fake-box input");
			$("#pwd-input").on("input", function () {
				var pwd = $(this).val().trim();
				for (var i = 0, len = pwd.length; i < len; i++) {
					$input.eq("" + i + "").val(pwd[i]);
				}
				$input.each(function () {
					var index = $(this).index();
					if (index >= len) {
						$(this).val("");
					}
				});
				if (len == 6) {
					//提交支付
					alert("333");
				}
			});
		});

	});
});