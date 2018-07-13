define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {

			var token = common.getQueryString("token");
			var ofee, owalletAmount, tableId, money, ocardNum, feeMoney;

			var clickBtn = true;
			var show = common.getQueryString("show");
			var payStatus, payPassword;



			//修改支付宝
			$('.modifyzfb').on('click', function () {
				console.log(1);
				window.location.href = "modifyzfb.html?token=" + token;
			});
			$(document).on('click', '.zfbpay-check', function () {
				$(this).attr("src", "/wxapp/static/images/share/nocheck.png").addClass("zfbpay-nocheck");
				clickBtn = false;
			});
			$(document).on('click', '.zfbpay-nocheck', function () {
				$(this).attr("src", "/wxapp/static/images/share/check.png").removeClass("zfbpay-nocheck");
				clickBtn = true;
			});

			$('.passWrap input').on('input', function () {
				if ($(this).val() != '') {
					$(this).blur();
					$(this).parent().next().find("input").focus();
					$(this).attr("type", "password");
				}
			});

			appApi.getWithdeawPage(token, show, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					ofee = reqs.content.fee;
					owalletAmount = reqs.content.walletAmount;
					tableId = reqs.content.cardDetail.id;
					ocardNum = reqs.content.cardDetail.cardNumber;
					payStatus = reqs.content.setPayFlag;
					$('.infactmoney span').html(owalletAmount);

					//					owalletAmount = owalletAmount.split(',');
					//					owalletAmount = owalletAmount.join('');
				} else {
					$.dialog({
						content: reqs.msg,
						title: "alert",
						time: "2000"
					})
				}
			});

			//查询支付宝账户
			appApi.getOneWithdrawNumber(token, show, function (reqs) {
				//console.log(reqs);
				if (reqs.code == 1) {
					$('.addmiddle .zfbname').html("姓名： " + reqs.content.name);
					$('.addmiddle .zfbnum').html("支付宝账号： " + reqs.content.cardNumber);
				} else {
					//修改支付宝账号信息
					$.dialog({
						content: reqs.msg,
						title: "alert",
						time: "2000"
					})
				}
			});
			$('.mymoney').on('input propertychange', function () {
				$('.charge .chargem').html((ofee * $(this).val()).toFixed(2));
			});
			$('.cashbtn').on('click', function () {
				money = parseFloat($('.mymoney').val());
				feeMoney = $('.chargem').html();
				var balance = $("#balance").text();
				console.log(money)
				//提现金额不得小于100.00
				if (isNaN(money)) {
					$.dialog({
						content: "提现金额不能空",
						title: "alert",
						time: "2000"
					});
				}
				else if (money < 100) {
					$.dialog({
						content: "提现金额不能小于100.00",
						title: "alert",
						time: "2000"
					});
				}
				else if (money > balance) {
					$.dialog({
						content: "提现金额不能大于余额",
						title: "alert",
						time: "2000"
					});
				}
				else {
					if (clickBtn == true) {
						console.log(payStatus);
						switch (payStatus) {
							case 0://未设置支付账户
								$('.bindbg').show();
								break;
							case 1://已设置支付账户
								$('.pwd-box .money').html(money + "元");
								$('.pwd-box .payFee span').html(feeMoney);
								setTimeout(function () {
									$('.pwd-box').show();
								}, 800)
								
							

								break;
						}
						//					appApi.withdrawMoney(token,money,tableId,function(reqs){
						//						console.log(reqs);
						//						if(reqs.code==1){
						//							window.location.href="progress.html?owalletAmount="+money+"&ofee="+ofee+"&ocardNum="+ocardNum;
						//						}else{
						//							$('.bindbg').show();
						//						}
						//					});					
					} else {
						$.dialog({
							content: "请选取提现账户",
							title: "alert",
							time: "2000"
						});
					}
				}
			});
			// 隐藏未绑定密码
			$(document).on('click', '.bindbg .left', function () {
				$('.bindbg').hide();
			});
			// 隐藏输入提现密码
			$(document).on('click', '.passwordWrap span', function () {
				$('.passwordBg').hide();
			});
			// 未绑定密码，将跳转到设置密码
			$(document).on('click', '.bindbg .right', function () {
				window.location.href = "setPassword.html?token=" + token;
			});

			document.activeElement.blur();


			var $input = $(".fake-box input");
			$("#pwd-input").on("input", function () {
				document.getElementById("pwd-input").focus();
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
					payPassword = pwd;
					appApi.withdrawMoney(token, payPassword, money, tableId, show, function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							window.location.href = "progress.html?owalletAmount=" + money + "&ofee=" + ofee + "&ocardNum=" + ocardNum;
						} else {
							// 密码输入错误时,会提示密码错误
							$.dialog({
								content: reqs.msg,
								title: "alert",
								time: "2000"
							});
							//  这里写密码错误之后 的跳转
							setTimeout(function () {
								$("#pwd-input").val("");
								$input.val("");
							}, 2000)

						}
					});

				}
			});
			$("#close_span").click(function () {
				$("#pwd-input").val("");
				$input.val("");
				$(".pwd-box").hide();
		

			});

		});

	});
});