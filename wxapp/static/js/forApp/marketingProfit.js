
define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			$('body').css('display', 'block');
			//shareUserId=73&targetId=188&targetType=2

			var targetId = common.getQueryString("targetId");
			var shareUserId = common.getQueryString("shareUserId");

			var show = common.getQueryString("show");
			var loginUserId = common.getQueryString("loginUserId");
			var token = common.getQueryString("token");
			var communityId = common.getQueryString("communityId");
			// var token = "59a1e3c176d20e8330c7551c1d3d82a3";
			// var communityId = 60;
			var pageNum = 0;
			var pageSize = 20;
			var oString = '';

			var loginUserId = "";
			// var token = "59a1e3c176d20e8330c7551c1d3d82a3";

			appApi.getAppCommission(loginUserId, token, communityId, pageNum, pageSize, show, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					oString = '';
					$('.title span').html(reqs.content.total);
					var oListMore = reqs.content.commissionInfos;
					for (var i = 0; i < oListMore.length; i++) {   //.rightred
						oString += `<li data-id="${oListMore[i].orderId}"><span>${oListMore[i].userName} 加入了${oListMore[i].targetName}</span><em>${oListMore[i].money}</em></li>`;
					}
					$('#mingxi_con').append(oString);
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
					appApi.getAppCommission(loginUserId, token, communityId, pageNum, pageSize, show, function (reqs) {
						console.log(reqs);
						if (reqs.code == 1) {
							oString = '';
							$('.title span').html(reqs.content.total);
							var oListMore = reqs.content.commissionInfos;
							// console.log(oListMore);
							if(oListMore){								
								for (var i = 0; i < oListMore.length; i++) {   //.rightred
									oString += `<li data-id="${oListMore[i].orderId}"><span>${oListMore[i].userName} 加入了${oListMore[i].targetName}</span><em>${oListMore[i].money}</em></li>`;
								}
								$('#mingxi_con').append(oString);
							}				
							
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
		});
	});
});
