

define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			appVersion = "1.9.3"
			yMoney = "10"
			var token = common.getQueryString("token");
			var passwordFirst;
			var yMoney = common.getQueryString("yMoney");
			var appVersion = common.getQueryString("appVersion");
			var targetId = common.getQueryString("targetId");
			var targetType = common.getQueryString("targetType");
			var orderType = common.getQueryString("orderType");
			var $input = $(".fake-box input");
			document.getElementById("pwd-input").focus();
			// alert(pwd)
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
					var passwordFirst = pwd;
					$("#pwd-input").val("");
					window.location.href = "yueSetAgain.html?token=" + token + "&passwordFirst=" + passwordFirst + "&yMoney=" + yMoney + "&appVersion=" + appVersion + "&targetId=" + targetId + "&targetType=" + targetType + "&orderType=" + orderType;

				}
			});
		});
	});
});