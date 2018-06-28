
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

			appApi.getQcCodeDetail(targetId,targetType,show,function(reqs){
				//console.log(reqs);
				if(reqs.code==1){
					fximg = reqs.content.targetAvatar;
					fxtt = reqs.content.targetName;
					$('.card-top img').attr("src",reqs.content.targetAvatar);
					$('.card-top .title .p1').html(reqs.content.targetName);
					switch (targetType)
						{
						case "1":
						    $('.card-top .title .p2').html(reqs.content.detail);
						  break;
						case "2":
							$('.card-top .title .p2').html("ID:"+reqs.content.detail);
						  break;
						}
					//wxShare();
				}else{
					$.dialog({
                        content: "该用户不存在",
                        title: "alert",
                        time: "2000"
                    })
				}
			})
			
			//targetType 1是个人2是社群
			switch (targetType)
				{
				case "1":
				  codeUrl="opensuperfire://user/"+targetId;
				  //codeUrl="opensuperfire:/user/"+targetId;//之前老的
				  break;
				case "2":
				//mainUrl = "http://192.168.0.250:8020/wxapp"
				mainUrl = "http://www.chaohuo.net/wxapp";
				//?shareUserId=73&targetId=199&targetType=2&opensuperfire=community
				  codeUrl= mainUrl + "/share/index.html?shareUserId="+shareUserId+"&targetId="+targetId+"&=community";
					// 20180614qjyopensuperfire
				//   shareCodeUrl= mainUrl + "/share/index.html?isShareLink="+isShareLink+"&targetId="+targetId+"&shareUserId="+shareUserId+"&opensuperfire=community";
				  //codeUrl= "opensuperfire://community/"+targetId+"?shareUserId="+ shareUserId;
				  break;
				}
//			console.log(targetId+','+targetType);
			console.log(codeUrl);
			$("#link").html(codeUrl);
			$('#code').qrcode(codeUrl);
//			$("#code").qrcode({ 
//				width: 2, //宽度 
//				height:2, //高度 
//				text: "a" //任意内容
//			});
			function convertCanvasToImage(canvas) { 
				var image = new Image(); 
				image.src = canvas.toDataURL("a"); 
				return image; 
			} 
			var mycanvas1=document.getElementsByTagName('canvas')[0]; 
			var imgimg=convertCanvasToImage(mycanvas1); 
			$('#code').html("");
			$('#code').append(imgimg);
			//$('#code img').attr('src',imgCode);
			
			//微信分享
            function wxShare() {
                var reqUrl = window.location.href;
            	//console.log(fximg);
                appApi.getWX(reqUrl,show, function(reqs) {
                	//console.log(reqs)
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来， 若要查看传入的参数， 可以在pc端打开， 参数信息会通过log打出， 仅在pc端时才会打印。
                        appId: "wxf5a842a5b3adcfcc", // 必填，公众号的唯一标识
                        timestamp: reqs.content.timestamp, // 必填，生成签名的时间戳
                        nonceStr: reqs.content.nonceStr, // 必填，生成签名的随机串
                        signature: reqs.content.signature, // 必填，签名，见附录1
                        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                	//console.log(reqs);

                    wx.ready(function() {
                        wx.onMenuShareAppMessage({   //分享给朋友
                            title:  fxtt + "的二维码",//分享标题
                            desc: "扫一扫快速加入",//分享描述
                            imgUrl: fximg,//分享图标
                            link: reqUrl,//分享链接
                            success: function(res) {},
                            cancel: function(res) {},
                            fail: function(res) {}
                        });

                        wx.onMenuShareTimeline({    //分享到朋友圈
                            title: fxtt + "的二维码",//分享标题
                            desc: "扫一扫快速加入",//分享描述
                            imgUrl: fximg,
                            link: reqUrl,
                            success: function(res) {},
                            cancel: function(res) {},
                            fail: function(res) {}
                        })
                    });
                });
                
            }
            wxShare();		
			
        });
    });
});
