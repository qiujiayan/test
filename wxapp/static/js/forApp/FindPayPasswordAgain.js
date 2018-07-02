define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = common.getQueryString("token");
			var passwordFirst = common.getQueryString("passwordFirst");
			var passwordAgain = "";
			var password, confirmPassword;
			var type = 1;
			var $input = $(".fake-box input");
			document.getElementById("pwd-input").focus();
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
					var passwordAgain = pwd;
					confirmPassword = passwordAgain;
					$("#pwd-input").val("");
					if (passwordFirst == passwordAgain) {
						window.location.href = "FindPasswordCode.html?token=" + token + "&passwordAgain=" + passwordAgain;

					} else {
						$.dialog({
	                        content: "两次密码输入不一致,请重新输入。",
	                        title: "alert",
	                        time: "2000"
						});
						window.location.href = "FindPayPassword.html?token=" + token;
					}
				}
			});
		});
	});
});
