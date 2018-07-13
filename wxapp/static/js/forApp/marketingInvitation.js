
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			$('body').css('display','block');

            var fxtt,fxdes,fximg;    
			var codeUrl;
			// var shareCodeUrl;
			var communityId = common.getQueryString("communityId"); //群号
			var token = common.getQueryString("token");
			var shareUserId = common.getQueryString("shareUserId");	//分享人的id,即是当前登录者
			var show = common.getQueryString("show");			
			// var isShareLink = common.getQueryString("isShareLink");
			// var token = "1727816907ef4572882bac4ae59b6507";
			var loginUserId = ""
			// var shareUserId=5040;
			// var communityId=53;
			// var targetType=2;
			// alert(window.location.href);
		
			appApi.getCommunitySellCode(token,loginUserId,shareUserId,communityId,show,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					fximg = reqs.content.targetAvatar;
					fxtt = reqs.content.targetName;
					$('#user_pic').attr("src",reqs.content.communityPicture);
					$('#user_pic').show();
					$('.item .pGroup').html(reqs.content.communityName);
					$('.item .pName').html(reqs.content.userName);
					$('.item span em').html(reqs.content.invitationCode);
					var detail = reqs.content.detail;
					mainUrl = "http://www.chaohuo.net/wxapp";
					// 生成二维码
					// var codeUrl= "http://www.chaohuo.net/wxapp/share/index.html?shareUserId="+shareUserId+"&communityId="+communityId+"&detail="+detail+"&=community";
					var codeUrl= mainUrl + "/share/index.html?shareUserId="+reqs.content.shareUserId+"&targetId="+reqs.content.communityId+"&detail="+detail+"&=community";
					console.log(codeUrl);
					$('#code').qrcode(codeUrl);					
				}else{
					
					$.dialog({
                        content: reqs.msg,
                        title: "alert",
                        time: "2000"
                    })
				}
			})
		});
    });
});
