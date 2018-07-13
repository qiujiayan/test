define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			$('body').css('display', 'block');
			//shareUserId=73&targetId=188&targetType=2
			var loginUserId = common.getQueryString("loginUserId");
			var token = common.getQueryString("token");
			// var token = "f863ce5e00e651b0d630ac35652d8063";
			// var token = "59a1e3c176d20e8330c7551c1d3d82a3";
			
			var mercenaryId = common.getQueryString("mercenaryId");
			var communityId = common.getQueryString("communityId");	

			var show = common.getQueryString("show");
			var name = common.getQueryString("name");
			$('#name').html(name);
			// alert(name);
			// var communityId = 60;
			var loginUserId = "";
			var pageNum = 0;
			var pageSize = 10;	
			
			appApi.getAppMercenaryMercenary(loginUserId, token, mercenaryId, communityId, pageNum, pageSize, show, function (reqs) {
				// console.log("88888");
				console.log(reqs);
				if (reqs.code == 1) {
					
					var oString = '';
					var omyTwoGavelock = reqs.content;
					// $("#one").html(omyTwoGavelock.length);
					for (var i = 0; i < omyTwoGavelock.length; i++) {
						
						oString += `<div class="item" dataid="${omyTwoGavelock[i].id}">
										<div class="pic">
											<img src="${omyTwoGavelock[i].userAvatar}" alt="">
										</div>
										<div class="text">
											<h4>${omyTwoGavelock[i].userName}<em>${omyTwoGavelock[i].time}</em></h4>
											<p>赚取收益：¥${omyTwoGavelock[i].profit}</p>
											<p>群内支付：¥${omyTwoGavelock[i].payment}</p>
										</div>
										
										</div>`;
					}
					$('#one').append(oString);
				}
				else {
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
					appApi.getAppMercenaryMercenary(loginUserId, token, mercenaryId, communityId, pageNum, pageSize, show, function (reqs) {
						// console.log("88888");
						console.log(reqs);
						if (reqs.code == 1) {
							
							var oString = '';
							var omyTwoGavelock = reqs.content;
							// $("#one").html(omyTwoGavelock.length);
							for (var i = 0; i < omyTwoGavelock.length; i++) {
								
								oString += `<div class="item" dataid="${omyTwoGavelock[i].id}">
												<div class="pic">
													<img src="${omyTwoGavelock[i].userAvatar}" alt="">
												</div>
												<div class="text">
													<h4>${omyTwoGavelock[i].userName}<em>${omyTwoGavelock[i].time}</em></h4>
													<p>赚取收益：¥${omyTwoGavelock[i].profit}</p>
													<p>群内支付：¥${omyTwoGavelock[i].payment}</p>
												</div>
												
												</div>`;
							}
							$('#one').append(oString);
						}
						// else {
						// 	$.dialog({
						// 		content: reqs.msg,
						// 		title: "alert",
						// 		time: "2000"
						// 	})
						// }
					});
				}
			});
		});
	});
});