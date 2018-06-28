define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = common.getQueryString("token");
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
						password = passwordFirst;
						confirmPassword = passwordAgain;

						if (passwordFirst == passwordAgain) {
							window.location.href="FindPasswordCode.html?token="+token+"&passwordAgain="+passwordAgain;
				
						} else {

							$('.falseDetail').show();
						}
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




		});
	});
});
