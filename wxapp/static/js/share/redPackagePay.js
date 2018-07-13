define(function (require) {
	var $ = require("jquery");
	require.async(['jquery', 'zeptoAlert', 'wx', 'appApi', 'common'], function (jquery, zeptoAlert, wx, appApi, common) {
		$(function () {

			var mwebUrl, orderNo, openid;
			var clickBtn = true;

			var targetId = common.getQueryString("targetId");
			var targetType = common.getQueryString("targetType");
			var orderType = common.getQueryString("orderType");
			var yMoney = common.getQueryString("yMoney");
			// var yMoney = 1;
			// var Money=1
			var dsc = common.getQueryString("dsc");
			var show = common.getQueryString("show");
			var redPacketCount = common.getQueryString("redPacketCount");
			// var token ="362df1f024abadf0842cb44890488a01"
			var token = common.getQueryString("token");

			var appVersion = common.getQueryString("appVersion");
			var payType = 3;

			//var targetId=5018,targetType=1,orderType=1,yMoney=0.01,dsc,redPacketCount=1,tradetType,openid,token="8f7d664c59b96e137184bfa8987c816f";
			// var appVersion = "1.9.3"
			// if (appVersion == "1.9.3") {
			// 	$('.yuepay').show();
			// } else {
			// 	$('.yuepay').hide();
			// }


			$('.money .right').html(yMoney + "元");
			// $("#look_money").html(yMoney + "元");
			$("#content-text").html(yMoney + "元")
			//余额支付
			$('.yuepay').on('click', function () {
				$('.yuepay-check').attr("src", "/wxapp/static/images/share/check.png");
				$('.zfbpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				$('.wxpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				payType = 3;
			});
			//支付宝支付
			$('.zfbpay').on('click', function () {
				$('.yuepay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				$('.zfbpay-check').attr("src", "/wxapp/static/images/share/check.png");
				$('.wxpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				payType = 1;
			});
			//微信支付
			$('.wxpay').on('click', function () {
				$('.yuepay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				$('.wxpay-check').attr("src", "/wxapp/static/images/share/check.png");
				$('.zfbpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				payType = 2;
			});


			var iTimer, iTimer2, no, oStatus;
			//var secondurl = "http://www.chaohuo.net/wxapp/share/second.html";
			var secondurl = "http%3a%2f%2fwww.chaohuo.net%2fwxapp%2fshare%2fsecond.html";


			$('.atoncePay').on('click', function () {
				switch (payType) {
					case 1://支付宝
						tradetType = "WAP";
						appApi.zfbAddRedPacketOrder(targetId, targetType, orderType, yMoney, dsc, redPacketCount, tradetType, token, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								orderNo = reqs.content.orderNo;
								window.location.href = "protocol://redZfb?" + orderNo;
								iTimer2 = setTimeout(function () {
									$('body').html(reqs.content.body);
								}, 500);
							} else {
								$.dialog({
									content: reqs.msg,
									title: "alert",
									time: "2000"
								});
							}
						})
						break;
					case 2://微信
						tradetType = "MWEB";
						// targetId = 50;
						// targetType = 2;
						// orderType = 2;
						// redPacketCount = 3;
						appApi.wxAddRedPacketOrder(targetId, targetType, orderType, yMoney, dsc, redPacketCount, tradetType, openid, token, show, function (reqs) {
							//console.log(reqs);
							if (reqs.code == 1) {
								mwebUrl = reqs.content.mweb_url;
								orderNo = reqs.content.orderNo;

								window.location.href = "protocol://redWx?" + orderNo;

								iTimer = setTimeout(function () {
									window.location.href = mwebUrl + "&redirect_url=" + secondurl + "?orderNo=" + orderNo;
								}, 500);
							} else {
								$.dialog({
									content: reqs.msg,
									title: "alert",
									time: "2000"
								});
							}
						})
						break;
					case 3://余额
						// alert(3);
						//要判断有没有设置支付密码，没有就弹窗 让设置 有就 $(".passwordBg").show();
						tradetType = "MWEB";
						// var token = common.getQueryString("token");
						// var token = "82104fcd6896d6d147eeeac9f12be2e4"//13450416801
						appApi.checkSetPayPassword(token, show, function (reqs) {
							console.log(reqs);
							if (reqs.content == 1) {
								// alert("有密码！");
								$(".pwd-box").show();//有密码

							}
							else if (reqs.content == 0) {
								// alert("wu密码！");
								$(".prompt").show();//没有密码

							}

							else if (reqs.code == 3) {
								$.dialog({
									content: "登录过期",
									title: "alert",
									time: "2000"
								})
							}
						});
						$(".prompt .ok_but").click(function () {
							$(".prompt").hide();
							// 跳到设置密码页面
							window.location.href = "../forApp/yueSetPassword.html?token=" + token + "&yMoney=" + yMoney + "&appVersion=" + appVersion + "&targetId=" + targetId + "&targetType=" + targetType + "&orderType=" + orderType;
							setTimeout(function () {
								window.location.reload();
							}, 1000)
						});


						break;
					default:
						$.dialog({
							content: "请选取支付方式",
							title: "alert",
							time: "2000"
						})
				}

			});
			var payPassWord = "";
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
					// targetId = 53;
					// targetType = 2;
					// orderType = 2;
					// redPacketCount = 0;
					tradetType = "MWEB";
					payPassWord = pwd;
					appApi.walletAddRedPacketOrder(targetId, targetType, orderType,yMoney, dsc, redPacketCount, tradetType, token, payPassWord, show, function (reqs) {

						console.log(reqs);
						if (reqs.code == 1) {
							orderNo = reqs.content;
							alert("支付成功");
							// alert(oderNo);
							window.location.href = "protocol://redYue?" + orderNo;
							iTimer = setTimeout(function () {
								window.location.href = "second.html?orderNo=" + orderNo;
							}, 500);
						} else if (reqs.code == 2) {
							$.dialog({
								content: reqs.msg,
								title: "alert",
								time: "2000"
							});
							setTimeout(function () {
								window.location.reload();
							}, 2000)
							// $(".passwordBg").hide();

							$(".mm_box li").removeClass("mmdd");
							$(".mm_box li").attr("data", "");
							i = 0;

						} else {
							$.dialog({
								content: reqs.msg,
								title: "alert",
								time: "2000"
							});
						}

					})
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
