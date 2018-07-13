define(function (require) {


	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {

			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			var appVersion = common.getQueryString("appVersion");
			var oHeader = '<div class="detailheader">明细</div>';
			var oString = '';
			var pageNum = 0;
			var orderId, walletDetailType;

			//var name;
			//var walletDetailTypeStr,createTime,no;
			var clickBtn = false;

			$('.iosback').on('click', function () {
				window.location.href = "protocol://finish";
			});

			$('.drawcash').on('click', function () {
				if (clickBtn == true) {
					//查询支付宝账户code等于1，已绑定。code等于2未绑定
					appApi.getOneWithdrawNumber(token, show, function (reqs) {
						//console.log(reqs);
						if (reqs.code == 1) {
							window.location.href = "cash.html?token=" + token;
						} else {
							//添加支付宝账号
							window.location.href = "addzfb.html?token=" + token;
						}
					});
				}
			});

			// appApi.getWithdeawPage(token,show,function(reqs){
			// 	console.log(reqs);
			// 	if(reqs.code==1){
			// 		name = reqs.content.cardDetail.name;
			// 	}else{
			// 		$.dialog({
			//          content: reqs.msg,
			//          title: "alert",
			//          time: "2000"
			//      })
			// 	}
			// });


			appApi.getMyWalletInfos(token, pageNum, show, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					clickBtn = true;
					$('.totalmoney span').text(reqs.content.wallet);
					// 判断是否可以提现
					// var _yue = $(".totalmoney span").text();
					var _yue = parseFloat(reqs.content.wallet);
					console.log(_yue);
					// alert(_yue);
					if (_yue < 100 || isNaN(_yue)) {
						// console.log("不可提现");
						$(".error_mass").show();
						$(".drawcash").hide();
						$(".drawcash2").show();
					} else {
						// console.log("可提现");
						$(".error_mass").hide();
						$(".drawcash2").hide();
						$(".drawcash").show();

					}
					var oList = reqs.content.walletInfos;
					for (var i = 0; i < oList.length; i++) {
						if (oList[i].walletDetailType == 3) {
							oString += `<div class="detail" dataid="${oList[i].orderId}" typeId="${oList[i].walletDetailType}">
										<div class="leftdetail rightred${oList[i].walletDetailType}">
											<div class="topname">提现<span>(失败)</span></div>											
											<div class="time">${common.formatDate(new Date(oList[i].createTime))}</div>
										</div>
										<div class="rightdetail rightred${oList[i].walletDetailType}">${oList[i].walletAmount}</div>
									</div>`;

						} else {
							oString += `<div class="detail" dataid="${oList[i].orderId}" typeId="${oList[i].walletDetailType}">
										<div class="leftdetail rightred${oList[i].walletDetailType}">
											<div class="topname">${oList[i].walletDetailTypeStr}</div>
											<div class="time">${common.formatDate(new Date(oList[i].createTime))}</div>
										</div>
										<div class="rightdetail rightred${oList[i].walletDetailType}">${oList[i].walletAmount}</div>
									</div>`;
						}

					}
					$('.detailwrap').append(oHeader + oString);
					// $('.detailwrap').append( oString);
				} else {
					$.dialog({
						content: reqs.msg,
						title: "alert",
						time: "2000"
					})
				}
			});




			$(window).scroll(function () {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				var windowHeight = $(this).height();
				if (scrollTop + windowHeight == scrollHeight) {
					pageNum++;
					appApi.getMyWalletInfos(token, pageNum, show, function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							oString = '';
							var oListMore = reqs.content.walletInfos;
							for (var i = 0; i < oListMore.length; i++) {   //.rightred
								oString += `<div class="detail" dataid="${oListMore[i].orderId}" typeId="${oListMore[i].walletDetailType}">
												<div class="leftdetail">
													<div class="topname rightred${oListMore[i].walletDetailType}">${oListMore[i].walletDetailTypeStr}</div>
													<div class="time">${common.formatDate(new Date(oListMore[i].createTime))}</div>
												</div>
												<div class="rightdetail rightred${oListMore[i].walletDetailType}">${oListMore[i].walletAmount}</div>
											</div>`;
							}
							$('.detailwrap').append(oString);
						} else {
							$.dialog({
								content: reqs.msg,
								title: "alert",
								time: "2000"
							})
						}
					});
				}
			});

			$(document).on('click', '.detail', function () {
				orderId = $(this).attr("dataid");
				walletDetailType = $(this).attr("typeId");//1  进群支付  2提现  3提现失败   4充值  5进群入账 678邀请收益 9红包进账 10红包退款
				console.log(orderId + ',' + walletDetailType);

				switch (walletDetailType) {
					case "1":
						break;
					case "2":
						window.location.href = "cashdetail2.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "3":
						window.location.href = "cashdetail2.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "4":
						break;
					case "5":
						window.location.href = "cashdetail.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "6":
						window.location.href = "cashdetail3.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "7":
						window.location.href = "cashdetail3.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "8":
						window.location.href = "cashdetail3.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "9":
						window.location.href = "cashdetail.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
					case "10":
						window.location.href = "cashdetail.html?token=" + token + "&orderId=" + orderId + "&walletDetailType=" + walletDetailType;
						break;
				};
				//				appApi.getMyWalletDetail(token,orderId,walletDetailType,function(reqs){
				//					console.log(reqs);
				//					if(reqs.code==1){	//status 0处理中 1提现成功 -1失败
				//						switch (reqs.content.status)
				//							{
				//							case 0:
				//							  window.location.href="progress.html";
				//							  break;
				//							case 1:
				//							  window.location.href="cashdetail.html?token="+token+"&orderId="+orderId+"&walletDetailType="+walletDetailType+"&name="+name;
				//							  break;
				//							case -1:
				//							  
				//							  break;
				//							};
				//					
				//					
				//					}else{
				//							$.dialog({
				//		                        content: reqs.msg,
				//		                        title: "alert",
				//		                        time: "2000"
				//		                    })
				//						}
				//				})

			});
			// if(appVersion=="1.9.3"){
			// 	$("#link").click(function(){
			// 		window.location.href = "paymentCenter.html?token=" + token;				
			// 	});
			// }else{
			// 	$("#link").click(function(){
			// 		window.location.href = "walletquestion.html";			
			// 	});
			// }


			$("#link").click(function () {
				window.location.href = "paymentCenter.html?token=" + token;
			});






		});
	});
});
