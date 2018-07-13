define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {

			var token = common.getQueryString("token");
			var passwordFirst = common.getQueryString("passwordFirst");
			var show = common.getQueryString("show");
			var passwordAgain = "";
			var password, confirmPassword;
			var type = 0;
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
						console.log(password + ',' + confirmPassword);
						appApi.setPayPassword(token, password, confirmPassword, type, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								$.dialog({
									content:"设置成功！",
									title: "alert",
									time: "2000"
								});
								setTimeout(function () {
									window.location.href = "paymentCenter.html?token=" + token;
								}, 1000);
							}
						});
					} else {
						$.dialog({
							content:"两次输入密码不一致，请重新输入！",
							title: "alert",
							time: "2000"
						});
						setTimeout(function () {
							window.location.href = "PaySetPassword0.html?token=" + token;
						}, 2000);
					}

				}
			});

			// 验证
			$(document).on('click', '.finishBtn', function () {
				password = passwordFirst;
				confirmPassword = passwordAgain;

				if (passwordFirst == passwordAgain) {
					console.log(password + ',' + confirmPassword);
					appApi.setPayPassword(token, password, confirmPassword, type, show, function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							$('.setBg').show();
							setTimeout(function () {
								window.location.href = "paymentCenter.html?token=" + token;
							}, 1000);
						}
					});
				} else {
					$('.finishBtn').hide();
					$('.falseDetail').show();
					setTimeout(function () {
						window.location.href = "PaySetPassword0.html?token=" + token;
					}, 2000);
				}

			});


		});
	});
});
