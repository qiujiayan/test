define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {

			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var passwordFirst = common.getQueryString("passwordFirst");
			var passwordAgain = "";
			var password, confirmPassword;
			var type=0;

			// $('.setPasswordWrap input').on('input',function(){
			// 	if($(this).val() != ''){
			// 		$(this).blur();
			// 		$(this).parent().next().find("input").focus();
			// 		$(this).attr("type","password");
			// 	}
			// 	if($('.pass1 input').val() != '' && $('.pass2 input').val() != ''&&$('.pass3 input').val() != ''&&$('.pass4 input').val() != ''&&$('.pass5 input').val() != ''&&$('.pass6 input').val() != ''){
			// 		passwordAgain = $('.pass1 input').val() + $('.pass2 input').val()+ $('.pass3 input').val()+ $('.pass4 input').val()+ $('.pass5 input').val()+ $('.pass6 input').val();
			// 	}
			// });


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
					console.log(password + ',' + confirmPassword);
					appApi.setPayPassword(token, password, confirmPassword, type,show,function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							$('.setBg').show();
							setTimeout(function () {
								window.location.href = "cash.html?token=" + token;
							}, 1000);
						}
					});
				} else {
					$('.finishBtn').hide();
					$('.falseDetail').show();
					setTimeout(function () {
						window.location.href = "PaySetPassword0.html?token=" + token;
					}, 1000);
				}

			});


		});
	});
});
