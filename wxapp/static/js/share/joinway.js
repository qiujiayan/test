define(function (require) {
	require.async(['jquery', 'zeptoAlert', 'wx', 'appApi', 'common'], function (jquery, zeptoAlert, wx, appApi, common) {
		$(function () {
			var token = localStorage.getItem("webtoken");
			var userid = localStorage.getItem("userId");

			//token="0b2485ae6a30a177bb372e87d575f9e1";

			var shareUserId = common.getQueryString("shareUserId");
			var communityId = common.getQueryString("targetId");
			var money = common.getQueryString("money");
			var wxCode = common.getQueryString("code");
			alert(wxcode);
			var show = common.getQueryString("show");
			var tradetType = "JSAPI";
			var clickBtn = true;
			var appId = 'wxf5a842a5b3adcfcc', timeStamp, nonceStr, package1, signType = "MD5", paySign;

			var password;



			$('.money .right').html(money + "元");

			$(document).on('click', '.wxpay-check', function () {
				$(this).attr("src", "/wxapp/static/images/share/nocheck.png").addClass("wxpay-nocheck");
				clickBtn = false;
			});
			$(document).on('click', '.wxpay-nocheck', function () {
				$(this).attr("src", "/wxapp/static/images/share/check.png").removeClass("wxpay-nocheck");
				clickBtn = true;
			});

			if (wxCode == null || "") {
				var url = window.location.href;
				url=encodeURI(url);
				// url = encodeURIComponent(url);
				alert("1111");
				alert(url);
				// alert('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect');
				base_url = encodeURIComponent('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect');
				window.location.href = base_url;
				
				wxCode = common.getQueryString("code");
				alert(wxCode);
				// alert(url);
			}
			if (wxCode) {
				appApi.getOpenid(wxCode, show, function (reqs) {
					//console.log(reqs)
					if (reqs.code == 1) {
						localStorage.setItem("openid", reqs.content);
					} else {
						$.dialog({
							content: "获取参数错误~",
							title: "alert",
							time: "2000"
						})
					}
				})
			}


			$('.atoncePay').on('click', function () {
				var openid = localStorage.getItem("openid");
				if (clickBtn) {
					appApi.wxjoinCommunityUnifiedOrder(communityId, tradetType, token, openid, shareUserId, show, function (reqs) {
						//console.log(reqs);
						if (reqs.code == 1) {
							appId = reqs.content.appid;
							timeStamp = reqs.content.timestamp;
							nonceStr = reqs.content.nonce_str;
							package1 = "prepay_id=" + reqs.content.prepay_id;
							paySign = reqs.content.sign;
							onBridgeReady(appId, timeStamp, nonceStr, package1, signType, paySign);
						} else {
							$.dialog({
								content: reqs.msg,
								title: "alert",
								time: "2000"
							})
						}
					})
				} else {
					$.dialog({
						content: "请选取支付方式",
						title: "alert",
						time: "2000"
					})
				}

			})


			//微信支付api
			function onBridgeReady(appId, timeStamp, nonceStr, package1, signType, paySign) {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId": appId, //公众号名称，由商户传入
						"timeStamp": timeStamp, //时间戳，自1970年以来的秒数
						"nonceStr": nonceStr, //随机串
						"package": package1, //"prepay_id=u802345jgfjsdfgsdg888",
						"signType": signType, //微信签名方式MD5：
						"paySign": paySign //微信签名
					},
					function (res) {
						//if (res.err_msg == "get_brand_wcpay_request：ok" ) {}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							//alert("微信支付成功!");
							appApi.joinCommunity(communityId, password, shareUserId, token, show, function (reqs) {
								if (reqs.code == 1) {
									location.href = "join.html";
								} else {
									$.dialog({
										content: reqs.msg,
										title: "alert",
										time: "2000"
									})
								}
							});
							location.href = "join.html";
						} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
							//alert("用户取消支付!");
							history.go(-1);
						} else {
							//alert(res.err_msg);
							//alert("支付失败!");
							history.go(-1);
						}
					}
				);
			}


		});
	});
});
