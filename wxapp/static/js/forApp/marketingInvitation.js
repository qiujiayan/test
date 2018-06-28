
define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
			$('body').css('display','block');
			
			//shareUserId=73&targetId=188&targetType=2

            var fxtt,fxdes,fximg;
     
			var codeUrl;
			// var shareCodeUrl;
			var targetType = common.getQueryString("targetType");
			var targetId = common.getQueryString("targetId");
			var shareUserId = common.getQueryString("shareUserId");
			var show = common.getQueryString("show");

			// var isShareLink = common.getQueryString("isShareLink");
			shareUserId=5040;
			targetId=50;
			targetType=2;
			appApi.getQcCodeDetail(targetId,targetType,show,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					fximg = reqs.content.targetAvatar;
					fxtt = reqs.content.targetName;
					$('#user_pic').attr("src",reqs.content.targetAvatar);
					$('#user_pic').show();
					$('.item .pGroup').html(reqs.content.targetName);
					var detail = reqs.content.detail;

					// 生成二维码
					var codeUrl= "http://www.chaohuo.net/wxapp/share/index.html?shareUserId="+shareUserId+"&targetId="+targetId+"&detail="+detail+"&=community";
					console.log(codeUrl);
					$('#code').qrcode(codeUrl);					
				}else{
					
					$.dialog({
                        content: "该用户不存在",
                        title: "alert",
                        time: "2000"
                    })
				}
			})
		});
    });
});
