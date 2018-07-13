
define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			var payPassword = "";
		
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
					payPassWord = pwd;
					$("#pwd-input").val("");

					// var token = "995d2f78f0e5b56c8bca958ba562a5cb";
					var token = common.getQueryString("token");
					var show = common.getQueryString("show");
					// alert(token);	
					console.log(payPassWord)				
					appApi.isCheckPayPassword(token, payPassWord, show, function (reqs) {
						console.log(reqs.msg);
						// 	console.log(msg);
						if (reqs.code == 3) {
							alert("登录过期");
						}
						else if (reqs.code == 2) {
							alert("密码错误,请重新输入");
							// $.dialog({
							// 	content:"密码错误" ,
							// 	title: "alert",
							// 	time: "1000"
							// })
							setTimeout(function () {
								window.location.reload();
							}, 500)
						}
						else if (reqs.code == 1) {
							window.location.href = "PaySetPassword.html?token=" + token;
						}
					});

				}
			});
		});
	});
});
