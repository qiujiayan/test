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
			//数字显示隐藏
			$(".xiaq_tb").click(function () {
				$(".numb_box").slideUp(300);
			});
			$(".mm_box").click(function () {
				$(".numb_box").slideDown(300);
			});
			var i = 0;
			$(".nub_ggg li .zf_num").click(function () {
				if (i < 6) {
					$(".mm_box li").eq(i).addClass("mmdd");
					$(".mm_box li").eq(i).attr("data", $(this).text());
					i++
				}
				if (i == 6) {
					setTimeout(function () {
						$(".mm_box li").each(function () {
							passwordAgain += $(this).attr("data");
						});
						// alert(passwordAgain);
						$('.finishBtn').show();
					}, 100);
					
				};
			});
			$(".nub_ggg li .zf_del").click(function () {
				if (i > 0) {
					i--
					$(".mm_box li").eq(i).removeClass("mmdd");
					$(".mm_box li").eq(i).attr("data", "");
				}
			});
			$(".nub_ggg li .zf_empty").click(function () {
				$(".mm_box li").removeClass("mmdd");
				$(".mm_box li").attr("data", "");
				i = 0;
			});


			// 验证
			$(document).on('click', '.finishBtn', function () {
				password = passwordFirst;
				confirmPassword = passwordAgain;
				
				if (passwordFirst == passwordAgain) {

					appApi.setPayPassword(token, password,confirmPassword,type, show,function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							alert("修改成功");
							window.location.href = "paymentCenter.html?token=" + token;
						}
						else if(reqs.code == 2){
							alert("您设置的新密码与原密码相同,请重新输入");
							window.location.href = "PaySetPassword.html?token=" + token;
						}
					});
				} else {
					
					$('.falseDetail').show();
				}

			});


		});
	});
});
