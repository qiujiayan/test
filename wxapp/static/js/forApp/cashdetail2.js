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
			var owalletAmount,owalletDetailTypeStr,ofee,ocreateTime,ono,ocardNum;
			
			appApi.getMyWalletDetail(token,orderId,walletDetailType,show,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	//status 0处理中 1提现成功 -1失败
					if(reqs.content.outAccount == "ZFB"){
						oAccount = "支付宝";
					};
					if(reqs.content.status == 0){
						$('footer').show();
					};
					owalletAmount = reqs.content.walletAmount;
					owalletDetailTypeStr = reqs.content.walletDetailTypeStr;
					ofee = reqs.content.fee;
					ocreateTime = reqs.content.createTime;
					ono = reqs.content.no;
					ocardNum = reqs.content.cardNum;

					$('.cdname .right').html(reqs.content.indexFlag+owalletAmount);
					$('.cd1 .right').html(owalletDetailTypeStr);
					$('.cd2 .right').html("￥"+ofee);
					$('.cd3 .right').html(oAccount);
					$('.cd4 .right').html(common.formatDate(new Date(ocreateTime)));
					$('.cd5 .right').html(ono);

				}else{
						$.dialog({
	                        content: reqs.msg,
	                        title: "alert",
	                        time: "2000"
	                    })
					}
			});
			
			$(document).on('click','footer span',function(){
				window.location.href="progress.html?owalletAmount="+owalletAmount+"&ofee="+ofee+"&ocardNum="+ocardNum;
			})
			
			
        });
    });
});
