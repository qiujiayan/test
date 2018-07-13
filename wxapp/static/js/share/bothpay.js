define(function (require) {
	require.async(['jquery', 'zeptoAlert', 'wx', 'appApi', 'common'], function (jquery, zeptoAlert, wx, appApi, common) {
		$(function () {
			var tradetType;
			var mwebUrl, orderNo, openid;
			var clickBtn = true;
			// 临急处理,下周一会删
			// var communityId = common.getQueryString("targetId");
			var _url = window.location.href;
			_url=_url.replace('?targetId','&targetId');
			// var communityId = common.getQueryString("targetId");
			var communityId = common.aaa("targetId",_url);
			// alert(communityId);
			var shareUserId = common.getQueryString("shareUserId");
			var money = common.getQueryString("money");
			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var payType = 1;
			// var money = "0.1";

			//			var imGroupId = common.getQueryString("imGroupId");//聊天的id
			//			var groupName = common.getQueryString("groupName");//社群名字
			$('.money .right').html(money + "元");
			
			// var communityId = 79,token = "29e0351a12cfde7cd7886eabce25bb0e";
		

			//支付宝支付
			$('.zfbpay').on('click', function () {
				$('.zfbpay-check').attr("src", "/wxapp/static/images/share/check.png");
				$('.wxpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				payType = 1;
			});
			//微信支付
			$('.wxpay').on('click', function () {
				$('.wxpay-check').attr("src", "/wxapp/static/images/share/check.png");
				$('.zfbpay-check').attr("src", "/wxapp/static/images/share/nocheck.png");
				payType = 2;
			});


			var iTimer, iTimer2, no, oStatus;
			//var secondurl = "http://www.chaohuo.net/wxapp/share/second.html";
			var secondurl = "http%3a%2f%2fwww.chaohuo.net%2fwxapp%2fshare%2fsecond.html";

			$('.atoncePay').on('click', function () {
				var that = this;
				if ($(this).hasClass("none_butt")) {
					$.dialog({
						content: "不可重复点击",
						title: "alert",
						time: "2000"
					})
				}
				else {
					$(that).addClass("none_butt");
					switch (payType) {
						case 1:
							tradetType = "WAP";
							appApi.zfbjoinCommunityUnifiedOrder(communityId, tradetType, token, shareUserId, show,function (reqs) {
								console.log(reqs);
								if (reqs.code == 1) {
									orderNo = reqs.content.orderNo;
									window.location.href = "protocol://zfb?" + orderNo;
									iTimer2 = setTimeout(function () {
										$('body').html(reqs.content.body);
									}, 1000);
								} else {
									$.dialog({
										content: reqs.msg,
										title: "alert",
										time: "2000"
									});
									$(that).removeClass("none_butt");
								}
							})
							break;
						case 2:
							tradetType = "MWEB";
							appApi.wxjoinCommunityUnifiedOrder(communityId, tradetType, token, openid, shareUserId,show, function (reqs) {
								//console.log(reqs);
								if (reqs.code == 1) {
									mwebUrl = reqs.content.mweb_url;
									orderNo = reqs.content.orderNo;

									window.location.href = "protocol://abb?" + orderNo;
									iTimer = setTimeout(function () {
										window.location.href = mwebUrl + "&redirect_url=" + secondurl + "?orderNo=" + orderNo;
									}, 1000);
								} else {
									$.dialog({
										content: reqs.msg,
										title: "alert",
										time: "2000"
									});
									$(that).removeClass("none_butt");
								}
							})
							break;
						default:
							$.dialog({
								content: "请选取支付方式",
								title: "alert",
								time: "2000"
							})
							$(that).removeClass("none_butt");
					}

				}


				//				if(clickBtn){
				//					appApi.wxjoinCommunityUnifiedOrder(communityId,tradetType,token,openid,shareUserId,function(reqs){
				//						//console.log(reqs);
				//						if(reqs.code==1){
				//							mwebUrl = reqs.content.mweb_url;
				//							orderNo = reqs.content.orderNo;
				//							
				//							window.location.href="protocol://abb?"+orderNo;
				//							iTimer = setTimeout(function(){
				//								window.location.href=mwebUrl+"&redirect_url="+secondurl+"?orderNo="+orderNo;
				//							},1000)
				//						}else{
				//							$.dialog({
				//		                        content: reqs.msg,
				//		                        title: "alert",
				//		                        time: "2000"
				//		                    })
				//						}
				//					})	
				//				}else{
				//					$.dialog({
				//                      content: "请选取支付方式",
				//                      title: "alert",
				//                      time: "2000"
				//                  })
				//				}

			})





		});
	});
});









// define(function (require) {
//     require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
//         $(function () {
//         	var tradetType;
//    			var mwebUrl,orderNo,openid;
// 			// var clickBtn=true;
// 			var _url = window.location.href;
// 			_url=_url.replace('?targetId','&targetId');
// 			var communityId = common.getQueryString("targetId");
// 			alert(_url);
// 			// alert(communityId);
//         	var shareUserId = common.getQueryString("shareUserId");
// 			var money = common.getQueryString("money");
// 			var token = common.getQueryString("token");
// 			var show = common.getQueryString("show");
// 			var payType = 1;
			
// //			var imGroupId = common.getQueryString("imGroupId");//聊天的id
// //			var groupName = common.getQueryString("groupName");//社群名字
// 			$('.money .right').html(money + "元");
		
// 			//var communityId = 267,token = "ab5d211d4a6a5c5571d0a943876f74d3",shareUserId;
			
// 			//支付宝支付
// 			$('.zfbpay').on('click',function(){
// 				$('.zfbpay-check').attr("src","/wxapp/static/images/share/check.png");
// 				$('.wxpay-check').attr("src","/wxapp/static/images/share/nocheck.png");
// 				payType = 1;
// 			});
// 			//微信支付
// 			$('.wxpay').on('click',function(){
// 				$('.wxpay-check').attr("src","/wxapp/static/images/share/check.png");
// 				$('.zfbpay-check').attr("src","/wxapp/static/images/share/nocheck.png");
// 				payType = 2;
// 			});
			
			
// 			var iTimer,iTimer2,no,oStatus;
// 			//var secondurl = "http://www.chaohuo.net/wxapp/share/second.html";
// 			var secondurl = "http%3a%2f%2fwww.chaohuo.net%2fwxapp%2fshare%2fsecond.html";

// 			$('.atoncePay').on('click',function(){
// 				switch (payType)
// 				{
// 					case 1:
// 						tradetType = "WAP";
// 					    appApi.zfbjoinCommunityUnifiedOrder(communityId,tradetType,token,shareUserId,show,function(reqs){
// 					    	console.log(reqs); 
// 					    	if(reqs.code==1){
// 					    		orderNo = reqs.content.orderNo;
// 					    		window.location.href="protocol://zfb?"+orderNo;
// 					    		iTimer2 = setTimeout(function(){
// 							    	$('body').html(reqs.content.body);	
// 								},1000);
// 					    	}else{
// 					    		$.dialog({
// 			                        content: reqs.msg,
// 			                        title: "alert",
// 			                        time: "2000"
// 			                    });
// 					    	}
// 					    })
// 					  break;
// 					case 2:
// 						tradetType = "MWEB";
// 						appApi.wxjoinCommunityUnifiedOrder(communityId,tradetType,token,openid,shareUserId,show,function(reqs){
// 							//console.log(reqs);
// 							if(reqs.code==1){
// 								mwebUrl = reqs.content.mweb_url;
// 								orderNo = reqs.content.orderNo;
								
// 								window.location.href="protocol://abb?"+orderNo;
// 								iTimer = setTimeout(function(){
// 									window.location.href=mwebUrl+"&redirect_url="+secondurl+"?orderNo="+orderNo;
// 								},1000);
// 							}else{
// 								$.dialog({
// 			                        content: reqs.msg,
// 			                        title: "alert",
// 			                        time: "2000"
// 			                    });
// 							}
// 						})	
// 					  break;
// 					default:
// 						$.dialog({
// 	                        content: "请选取支付方式",
// 	                        title: "alert",
// 	                        time: "2000"
// 	                    })
// 				}


// //				if(clickBtn){
// //					appApi.wxjoinCommunityUnifiedOrder(communityId,tradetType,token,openid,shareUserId,function(reqs){
// //						//console.log(reqs);
// //						if(reqs.code==1){
// //							mwebUrl = reqs.content.mweb_url;
// //							orderNo = reqs.content.orderNo;
// //							
// //							window.location.href="protocol://abb?"+orderNo;
// //							iTimer = setTimeout(function(){
// //								window.location.href=mwebUrl+"&redirect_url="+secondurl+"?orderNo="+orderNo;
// //							},1000)
// //						}else{
// //							$.dialog({
// //		                        content: reqs.msg,
// //		                        title: "alert",
// //		                        time: "2000"
// //		                    })
// //						}
// //					})	
// //				}else{
// //					$.dialog({
// //                      content: "请选取支付方式",
// //                      title: "alert",
// //                      time: "2000"
// //                  })
// //				}
				
// 			})
        	
        	


	
//         });
//     });
// });
