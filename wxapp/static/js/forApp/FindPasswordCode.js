define(function (require) {
	var $ = require("jquery");
	require.async(['zeptoAlert', 'wx', 'appApi', 'common'], function (zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var pageNum = 1;
			// var token = "995d2f78f0e5b56c8bca958ba562a5cb";
			appApi.getMyWalletInfos(token, pageNum, show,function (reqs) {
				console.log(reqs);
				// console.log(reqs.content.cardDetail.cardNumber);
				if (reqs.code == 1) {
					$('.mass span').html(reqs.content.phone);	 		
				} else {
					$.dialog({
						content: reqs.msg,
						title: "alert",
						time: "2000"
					})
				}
			});
			// 发送验证码
			$("#send_btn").click(function () {
				var doType = "AC";
				appApi.getVerificationCodeByToken(token, doType, show,function (reqs) {
					console.log(reqs);
					if(reqs.code==2){
						$.dialog({
							content: reqs.msg,
							title: "alert",
							time: "2000"
						})
					}
					else if(reqs.code==1){
						$.dialog({
							content: "验证码已发送,注意查收!",
							title: "alert",
							time: "2000"
						})
					}
				})
			});
			//提交验证码和密码
			$(".finishBtn").click(function(){
				var code = $("#code").val();
				var token = common.getQueryString("token");
				var passwordAgain = common.getQueryString("passwordAgain");
				// alert(code);
				appApi.forgetPayPassword(token,code,passwordAgain,show, function (reqs) {
					console.log(reqs);
					// console.log(reqs.content.cardDetail.cardNumber);
					if (reqs.code == 2) {
						$.dialog({
							content: "验证码错误,请重新输入!",
							title: "alert",
							time: "2000"
						})		
					}else if(reqs.code==1){
						// $.dialog({
						// 	content: "设置成功",
						// 	title: "alert",
						// 	time: "2000"
						// })
						alert("设置成功");
						window.location.href="paymentCenter.html?token="+token
					}
				});
			})
		});
	});
});
