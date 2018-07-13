define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var passwordFirst = common.getQueryString("passwordFirst");
			var passwordAgain = "";
			var password, confirmPassword;
			var type = 1;
		
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
					password = passwordFirst;
					confirmPassword = passwordAgain;
					$("#pwd-input").val("");
					if (passwordFirst == passwordAgain) {

						appApi.setPayPassword(token, password, confirmPassword, type, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								// alert("修改成功");
								$.dialog({
									content:"设置成功",
									title: "alert",
									time: "2000"
								});
								setTimeout(function () {
									window.location.href = "paymentCenter.html?token=" + token;
								}, 1500); 
								
							}
							else if (reqs.code == 2) {
								alert("您设置的新密码与原密码相同,请重新输入");
								window.location.href = "PaySetPassword.html?token=" + token;
							}
						});
					} else {
						$.dialog({
							content:"两次输入密码不一致，请重新输入！",
							title: "alert",
							time: "2000"
						});
						setTimeout(function () {
							window.location.href = "PaySetPassword.html?token=" + token;
						}, 1500);
					}

				}
			});
		});
	});
});
