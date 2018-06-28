define(function (require) {
    require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
        $(function () {
        	var tradetType = "MWEB";
   			var mwebUrl,orderNo,openid;
			var clickBtn=true;
			var show = common.getQueryString("show");
			var communityId = common.getQueryString("targetId");
        	var shareUserId = common.getQueryString("shareUserId");
			var money = common.getQueryString("money");
			var token = common.getQueryString("token");
			
//			var imGroupId = common.getQueryString("imGroupId");//聊天的id
//			var groupName = common.getQueryString("groupName");//社群名字
			$('.money .right').html(money + "元");


			
			
			$(document).on('click','.wxpay-check',function(){
				$(this).attr("src","/wxapp/static/images/share/nocheck.png").addClass("wxpay-nocheck");
				clickBtn=false;
			});
			$(document).on('click','.wxpay-nocheck',function(){
				$(this).attr("src","/wxapp/static/images/share/check.png").removeClass("wxpay-nocheck");
				clickBtn=true;
			});
			
			var iTimer,iTimer2,no,oStatus;
			//var secondurl = "http://www.chaohuo.net/wxapp/share/second.html";
			var secondurl = "http%3a%2f%2fwww.chaohuo.net%2fwxapp%2fshare%2fsecond.html";

			$('.atoncePay').on('click',function(){

				if(clickBtn){
					appApi.wxjoinCommunityUnifiedOrder(communityId,tradetType,token,openid,shareUserId,show,function(reqs){
						//console.log(reqs);
						if(reqs.code==1){
							mwebUrl = reqs.content.mweb_url;
							orderNo = reqs.content.orderNo;
							
							window.location.href="protocol://abb?"+orderNo;
							iTimer = setTimeout(function(){
								window.location.href=mwebUrl+"&redirect_url="+secondurl+"?orderNo="+orderNo;
							},1000)
						}else{
							$.dialog({
		                        content: reqs.msg,
		                        title: "alert",
		                        time: "2000"
		                    })
						}
					})	
				}else{
					$.dialog({
                        content: "请选取支付方式",
                        title: "alert",
                        time: "2000"
                    })
				}
				
			})
        	
        	


	
        });
    });
});
