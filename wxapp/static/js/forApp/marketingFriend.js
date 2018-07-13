define(function (require) {
	var $ = require("jquery");
	require.async(['qrCode', 'zeptoAlert', 'wx', 'appApi', 'common'], function (qrCode, zeptoAlert, wx, appApi, common) {
		$(function () {
			$('body').css('display', 'block');
			var targetType = common.getQueryString("targetType");
			var targetId = common.getQueryString("targetId");
			var shareUserId = common.getQueryString("shareUserId");
			var show = common.getQueryString("show");
			var loginUserId = common.getQueryString("loginUserId");
			var token = common.getQueryString("token");
			// var token = "f863ce5e00e651b0d630ac35652d8063";
			// var token = "59a1e3c176d20e8330c7551c1d3d82a3";
			// var communityId = 60;
			var loginUserId = "";
			var communityId = common.getQueryString("communityId");
			var pageNum1 = 0;
			var pageNum2 = 0;
			var pageSize = 10;
			var oString = '';



			$(".chose_tit span").click(function () {
				$(this).addClass("on").siblings("span").removeClass("on");
				var aa = $(this).index();
				$(".fir_con").hide();
				$(".fir_con").eq(aa).show();
			});

			//一级铁杆
			// $(window).scroll(function () {

			// 	alert("1111");
			// 	var scrollTop = $(this).scrollTop();
			// 	var scrollHeight = $(document).height();
			// 	var windowHeight = $(this).height();
			// 	if (scrollTop + windowHeight == scrollHeight) {
			// 		pageNum++;
			// 第一页
			appApi.getAppMercenary(loginUserId, token, communityId, pageNum1, pageSize, show, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					// 如果是群主，就没有推荐人
					console.log(reqs.content.myInviter);
					if (reqs.content.myInviter == null) {
						$('.fir_tit').hide();
						$(".chose_tit").addClass('mt48');
					} else {
						$('.fir_tit').show();
						$(".chose_tit").removeClass('mt48');
						var aa = `<img src="${reqs.content.myInviter.userAvatar}" alt="">
									<span>${reqs.content.myInviter.userName}</span>
								<em>我的推荐人</em>`;
						$(".fir_tit").append(aa);
					}
					oString = '';
					var oList = reqs.content.myOneGavelock;
					$("#one_num").html(reqs.content.oneCounts);

					for (var i = 0; i < oList.length; i++) {
						oString += `<div class="item" dataid="${oList[i].id}">
										<a href="marketingFriendTwo.html?loginUserId=${loginUserId}&token=${token}
										&mercenaryId=${oList[i].id}&communityId=${communityId}&show=${show}&name=${oList[i].userName}">
										<div class="pic">
											<img src="${oList[i].userAvatar}" alt="">
										</div>
										<div class="text">
											<h4><span>${oList[i].userName}</span><em>${oList[i].time}</em></h4>
											<p>赚取收益：¥${oList[i].profit}</p>
											<p>群内支付：¥${oList[i].payment}</p>
										</div>										
										<div class="more">
											<img src="../static/images/marketing/Rectangle.png" alt="">
										</div>
										</a></div>`;
					}
					$('#one').append(oString);
				}
				// else if (reqs.code == 2) {
				// 	$("#one_num").html(0);
				// }
				// else {
				// 	$.dialog({
				// 		content: reqs.msg,
				// 		title: "alert",
				// 		time: "2000"
				// 	})
				// }
			});

			// 后面页
			$(window).scroll(function () {
				var scrollTop = $(this).scrollTop();
				var scrollHeight = $(document).height();
				// console.log(scrollTop);
				var windowHeight = $(this).height();

				if (scrollTop + windowHeight == scrollHeight) {
	
					var type = 0;
					$(".chose_tit span").each(function (index, el) {
						if ($(this).hasClass("on")) {
							type = index;
						}
					});
					if (type == 0) {
						pageNum1++;
						appApi.getAppMercenary(loginUserId, token, communityId, pageNum1, pageSize, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								// 如果是群主，就没有推荐人
								console.log(reqs.content.myInviter);
								if (reqs.content.myInviter == null) {
									$('.fir_tit').hide();
									$(".chose_tit").addClass('mt48');
								} else {
									$('.fir_tit').show();
									$(".chose_tit").removeClass('mt48');
									var aa = `<img src="${reqs.content.myInviter.userAvatar}" alt="">
												<span>${reqs.content.myInviter.userName}</span>
											<em>我的推荐人</em>`;
									$(".fir_tit").append(aa);
								}
								oString = '';
								var oList = reqs.content.myOneGavelock;
								// $("#one_num").html(oList.length);
								for (var i = 0; i < oList.length; i++) {
									oString += `<div class="item" dataid="${oList[i].id}">
													<a href="marketingFriendTwo.html?loginUserId=${loginUserId}&token=${token}
													&mercenaryId=${oList[i].id}&communityId=${communityId}&show=${show}&name=${oList[i].userName}">
													<div class="pic">
														<img src="${oList[i].userAvatar}" alt="">
													</div>
													<div class="text">
														<h4><span>${oList[i].userName}</span><em>${oList[i].time}</em></h4>
														<p>赚取收益：¥${oList[i].profit}</p>
														<p>群内支付：¥${oList[i].payment}</p>
													</div>										
													<div class="more">
														<img src="../static/images/marketing/Rectangle.png" alt="">
													</div>
													</a></div>`;
								}
								$('#one').append(oString);
							}
						});
					}
					else if (type == 1) {
						pageNum2++;
						appApi.getAppTwoMercenary(loginUserId, token, communityId, pageNum2, pageSize, show, function (reqs) {
							console.log(reqs);
							if (reqs.code == 1) {
								oString = '';
								var oList = reqs.content.myTwoGavelock;
								// alert(reqs.content.myTwoGavelock)
								// $("#two_num").html(reqs.content.twoCounts);

								for (var i = 0; i < oList.length; i++) {
									oString += `<div class="item" dataid="${oList[i].id}">
													
													<div class="pic">
														<img src="${oList[i].userAvatar}" alt="">
													</div>
													<div class="text">
														<h4><span>${oList[i].userName}</span><em>${oList[i].time}</em></h4>
														<p>赚取收益：¥${oList[i].profit}</p>
														<p>群内支付：¥${oList[i].payment}</p>
													</div>
													
													</div>`;
								}
								$('#two').append(oString);
							}
						});
					}
				}
			});

			// 	}
			// });





			//二级铁杆
			appApi.getAppTwoMercenary(loginUserId, token, communityId, pageNum2, pageSize, show, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					oString = '';
					var oList = reqs.content.myTwoGavelock;
					// alert(reqs.content.myTwoGavelock)
					$("#two_num").html(reqs.content.twoCounts);

					for (var i = 0; i < oList.length; i++) {
						oString += `<div class="item" dataid="${oList[i].id}">
										
										<div class="pic">
											<img src="${oList[i].userAvatar}" alt="">
										</div>
										<div class="text">
											<h4><span>${oList[i].userName}</span><em>${oList[i].time}</em></h4>
											<p>赚取收益：¥${oList[i].profit}</p>
											<p>群内支付：¥${oList[i].payment}</p>
										</div>
										
										</div>`;
					}
					$('#two').append(oString);
				}
				if (reqs.code == 2) {
					$("#two_num").html(0);
				}

				// else {
				// 	$.dialog({
				// 		content: reqs.msg,
				// 		title: "alert",
				// 		time: "2000"
				// 	});
				// }
			});






		});
	});
});