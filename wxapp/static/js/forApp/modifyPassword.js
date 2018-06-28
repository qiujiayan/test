
define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {			
			var payPassword="";

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
						// var payPassword = "";
						$(".mm_box li").each(function () {
							payPassword += $(this).attr("data");
						});
						// var token = "995d2f78f0e5b56c8bca958ba562a5cb";
						var token = common.getQueryString("token");
						var show = common.getQueryString("show");
						// alert(token);
											
						var aa={
							"payPassWord": payPassword
						  };
						//   alert(aa.payPassWord);
						  
						appApi.isCheckPayPassword(token, aa, show,function (reqs){
							console.log(reqs.code);	
							if(reqs.code==3)	{
								alert("登录过期");
							}	
							else if(reqs.code==2){
								alert("密码错误");
								window.location.reload();
							}	
							else if(reqs.code==1){
								window.location.href = "PaySetPassword.html?token=" + token;
							}			
						});
						// alert("支付成功"+data);
						// window.location.href = "setPassword.html?token=" + token + "&passwordFirst=" + passwordFirst;
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
