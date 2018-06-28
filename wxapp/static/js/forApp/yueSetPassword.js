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
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			var token = common.getQueryString("token");
			var passwordFirst;
			
			
			 //数字显示隐藏
		$(".xiaq_tb").click(function(){
			$(".numb_box").slideUp(300);
		});
		$(".mm_box").click(function(){
			$(".numb_box").slideDown(300);
		});
		var i = 0;
		$(".nub_ggg li .zf_num").click(function(){
			if(i<6){
				$(".mm_box li").eq(i).addClass("mmdd");
				$(".mm_box li").eq(i).attr("data",$(this).text());
				i++
			}
			if (i==6) {
				setTimeout(function(){
					var passwordFirst = "";
					$(".mm_box li").each(function(){
						passwordFirst += $(this).attr("data");
					});
					// alert("支付成功"+data);
					window.location.href="yueSetAgain.html?token="+token+"&passwordFirst="+passwordFirst;
				},100);
			};
		});            
		$(".nub_ggg li .zf_del").click(function(){
			if(i>0){
				i--
				$(".mm_box li").eq(i).removeClass("mmdd");
				$(".mm_box li").eq(i).attr("data","");
			}
		});
		$(".nub_ggg li .zf_empty").click(function(){
			$(".mm_box li").removeClass("mmdd");
			$(".mm_box li").attr("data","");
			i = 0;
		});



		
        });
    });
});
