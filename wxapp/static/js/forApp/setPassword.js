// define(function (require) {
// 	var $ = require("jquery");
//     require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
//         $(function () {

// 			var token = common.getQueryString("token");
// 			var passwordFirst;

// 			$('.setPasswordWrap input').on('input',function(){
// 				if($(this).val() != ''){
// 					$(this).blur();
// 					$(this).parent().next().find("input").focus();
// 					$(this).attr("type","password");
// 				}
// 				if($('.pass1 input').val() != '' && $('.pass2 input').val() != ''&&$('.pass3 input').val() != ''&&$('.pass4 input').val() != ''&&$('.pass5 input').val() != ''&&$('.pass6 input').val() != ''){
// 					passwordFirst = $('.pass1 input').val() + $('.pass2 input').val()+ $('.pass3 input').val()+ $('.pass4 input').val()+ $('.pass5 input').val()+ $('.pass6 input').val();
// 					console.log(passwordFirst);
// 					window.location.href="setAgain.html?token="+token+"&passwordFirst="+passwordFirst;
// 				}
// 			});
//         });
//     });
// });

define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = common.getQueryString("token");
			var passwordFirst;

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
					window.location.href = "setAgain.html?token=" + token + "&passwordFirst=" + passwordFirst;
				}
			});










		});
	});
});
