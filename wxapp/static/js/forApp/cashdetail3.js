define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
        	//提现页面
			var token = common.getQueryString("token");
			var show = common.getQueryString("show");
			//var name = common.getQueryString("name");
			var orderId = common.getQueryString("orderId");
			var walletDetailType = common.getQueryString("walletDetailType");
			
			var oAccount;
			var owalletAmount,owalletDetailTypeStr,ofee,ocreateTime,ono;
			
			appApi.getMyWalletDetail(token,orderId,walletDetailType,show,function(reqs){
				//console.log(reqs);
				if(reqs.code==1){	//status 0处理中 1提现成功 -1失败
					$('.cdname .right').html(reqs.content.indexFlag+reqs.content.walletAmount);
					$('.cd1 .right').html(reqs.content.walletDetailTypeStr);
					$('.cd2 .right').html(reqs.content.payUsername);

					$('.cd3 .right').html(common.formatDate(new Date(reqs.content.createTime)));
					$('.cd4 .right').html(reqs.content.no);

				}else{
						$.dialog({
	                        content: reqs.msg,
	                        title: "alert",
	                        time: "2000"
	                    })
					}
			});
			
			
			
			
        });
    });
});
