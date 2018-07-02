define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {

			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var passwordFirst = common.getQueryString("passwordFirst");
			var passwordAgain = "";
			var password, confirmPassword;
			var type = 0;
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
					passwordAgain = pwd;
					$("#pwd-input").val("");
					password = passwordFirst;
					confirmPassword = passwordAgain;
					if (passwordFirst == passwordAgain) {
						// console.log(password + ',' + confirmPassword);
						appApi.setPayPassword(token, password, confirmPassword, type, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								$.dialog({
									content: "密码设置成功！",
									title: "alert",
									time: "2000"
								})
								setTimeout(function () {
									window.location.href = "../share/redPackagePay.html?token=" + token + "&yMoney=" + yMoney + "&appVersion=" + appVersion + "&targetId=" + targetId + "&targetType=" + targetType + "&orderType=" + orderType;
								}, 1000);
							}
						});
					} else {
						$.dialog({
							content: "两次输入的密码不一致请重新输入！",
							title: "alert",
							time: "2000"
						})
						setTimeout(function () {
							window.location.href = "yueSetPassword.html?token=" + token + "&yMoney=" + yMoney + "&appVersion=" + appVersion + "&targetId=" + targetId + "&targetType=" + targetType + "&orderType=" + orderType;
						}, 2000);
					}
				}
			});
		});
	});
});
