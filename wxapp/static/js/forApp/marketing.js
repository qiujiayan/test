
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			
			var token = common.getQueryString("token");
			
			var communityId = common.getQueryString("communityId");
			
			var shareUserId = common.getQueryString("shareUserId");
			var show = common.getQueryString("show");
			// var isShareLink = common.getQueryString("isShareLink");
			$('.iconfont').on('click',function(){
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
					history.back();	
					window.location.href = "protocol://finish";
			    }
				if(navigator.userAgent.match(/android/i)){
					window.location.href="http://www.chaohuo.net/wxapp/forApp/false.html"; 
				}
			});
			// $('.iconfont').on('click', function () {
			// 	window.location.href = "protocol://finish";
			// });


			// 点击进入邀请页面
			$(".head_link").click(function(){
				window.location.href = "marketingInvitation.html?token=" + token +"&communityId="+communityId;
			})
			// 点击进入我的收益
			$(".profit").click(function(){
				window.location.href = "marketingProfit.html?token=" + token +"&communityId="+communityId+ "&shareUserId="+shareUserId;
			})
			// 点击进入我的铁杆
			$(".fri").click(function(){
				window.location.href = "marketingFriend.html?token=" + token +"&communityId="+communityId+ "&shareUserId="+shareUserId;
			})

		});
    });
});
