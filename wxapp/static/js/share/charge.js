define(function (require) {
	require.async(['jquery', 'fastclick', 'zeptoAlert', 'wx', 'appApi', 'common'], function (jquery, fastclick, zeptoAlert, wx, appApi, common) {
		$(function () {
			var wxCode = common.getQueryString("code");
			var tradetType = "JSAPI";
			var clickBtn = true;
			var appId = 'wxf5a842a5b3adcfcc', timeStamp, nonceStr, package1, signType = "MD5", paySign, no;
			var token, totalAmount;
			var show = common.getQueryString("show");
			//	var doName = "http://192.168.0.168:8082/app";//田接口本地地址	
			//	var webDoName = "http://192.168.0.168:8082/web";
			//			//微信添加充值订单
			//	function wxRecharge(token,tradetType,openid,totalAmount,callback) {
			//		$.ajax({
			//			type: "GET",
			//			url: doName + "/wallet/tokenMethod/wxRecharge",
			//			dataType: "json",
			//			data: {
			//				token: token,
			//				tradetType:tradetType,
			//				openid:openid,
			//				totalAmount:totalAmount
			//			},
			//			xhrFields: {
			//				withCredentials: true
			//			},
			//			crossDomain: true,
			//			beforeSend: function() {},
			//			success: function(reqs) {
			//				callback(reqs);
			//			},
			//			error: function(reqs) {
			//				$.dialog({
			//                  content: reqs.msg,
			//                  title: "alert",
			//                  time: "2000"
			//              })
			//			}
			//		});
			//	}
			//	//查询入群订单状态
			//	function joinCommunityOrderQuery(no,callback) {
			//		$.ajax({
			//			type: "GET",
			//			url: doName + "/pay/tokenMethod/joinCommunityOrderQuery",
			//			dataType: "json",
			//			data: {
			//				no:no
			//			},
			//			xhrFields: {
			//				withCredentials: true
			//			},
			//			crossDomain: true,
			//			beforeSend: function() {},
			//			success: function(reqs) {
			//				callback(reqs);
			//			},
			//			error: function(reqs) {
			//				$.dialog({
			//                  content: reqs.msg,
			//                  title: "alert",
			//                  time: "2000"
			//              })
			//			}
			//		});
			//	}
			//	//获取微信openid
			//	function getOpenid(code,callback){
			//		$.ajax({
			//			type: "GET",
			//			url: webDoName + "/user/getOpenid",
			//			//url: webDoName + "/user/getOpenid",
			//		    dataType: "json",
			//			contentType: "application/json",
			//			data: {
			//				code:code,
			//			},
			//			async:false,
			//			crossDomain: true,
			//			success: function(reqs) {
			//				callback(reqs);					
			//			},
			//			error: function(reqs) {
			//				$.dialog({
			//                  content: reqs.msg,
			//                  title: "alert",
			//                  time: "2000"
			//              })
			//			}
			//		});	
			//	}



			if (wxCode == null || "") {
				var url = window.location.href;
				//url=encodeURI(url);
				url = encodeURIComponent(url);
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
			}
			if (wxCode) {
				appApi.getOpenid(wxCode, function (reqs) {
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

			$('.charge-wrap li').on('click', function () {
				$(this).addClass('active').siblings().removeClass('active');
			});
			$('.charge-now').on('click', function () {
				var openid = localStorage.getItem("openid");
				if (clickBtn) {
					token = localStorage.getItem("webtoken");
					totalAmount = $('.charge-wrap .active .charge-money').html();

					appApi.wxRecharge(token, tradetType, openid, totalAmount, show, function (reqs) {
						//console.log(reqs);
						if (reqs.code == 1) {
							appId = reqs.content.appid;
							timeStamp = reqs.content.timestamp;
							nonceStr = reqs.content.nonce_str;
							package1 = "prepay_id=" + reqs.content.prepay_id;
							paySign = reqs.content.sign;
							no = reqs.content.no;
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
							appApi.joinCommunityOrderQuery(no, show, function (reqs) {
								console.log(reqs);
								if (reqs.code == 1) {
									location.href = "charge.html";
								} else {
									$.dialog({
										content: reqs.msg,
										title: "alert",
										time: "2000"
									})
								}
							});
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
