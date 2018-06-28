
define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			var ok_paypassword = 0;	//用于判断是否设置过支付密码  1 有  2 没有
			var show = common.getQueryString("show");
			var token = common.getQueryString("token");
			// var token = "995d2f78f0e5b56c8bca958ba562a5cb";//有支付密码17602133781
			// var token = "a6cfb843361928123e4d4a4c8b7e0405"//有支付密码
			// var token = "d8a6ec5a88cdba696896c770a0038ef6"//没有支付密码
			// var token = "925a43297f372d88f60838d5bf1c1e0d"//13450416801
			appApi.checkSetPayPassword(token, show,function (reqs) {
				console.log(reqs);

				if (reqs.content == 1) {
					ok_paypassword = 1;
				}
				else if (reqs.content == 0) {
					ok_paypassword = 2;
				}
				console.log(ok_paypassword)
				// else {
				// 	$.dialog({
				// 		content: reqs.msg,
				// 		title: "alert",
				// 		time: "2000"
				// 	})
				// }
			});

			// 修改支付密码判断该用户有没有设置密码
			$(".question1").click(function () {
				if (ok_paypassword == 1) {
					
					window.location.href = "modifyPassword.html?token=" + token;

					// alert("youmima");
				}
				else if (ok_paypassword == 2) {
					$(".prompt").show();
				}
			});
			// 找回支付密码判断该用户有没有设置密码
			$(".question2").click(function () {
				if (ok_paypassword == 1) {
					
					window.location.href = "FindPayPassword.html?token=" + token;

					// alert("youmima");
				}
				else if (ok_paypassword == 2) {
					$(".prompt").show();
				}
			});

			$(".prompt .pop_bg").click(function(){
				$(".prompt").hide();
			})
			$(".prompt .none_but").click(function(){
				$(".prompt").hide();
			});
			$(".prompt .ok_but").click(function(){				
				$(".prompt").hide();			
				window.location.href = "PaySetPassword0.html?token=" + token;

			});

		});
	});
});
