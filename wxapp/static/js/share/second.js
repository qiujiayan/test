define(function (require) {
    require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
        $(function () {

			
			var imGroupId = common.getQueryString("imGroupId");//聊天的id
			var groupName = common.getQueryString("groupName");//社群名字
			var orderNo = common.getQueryString("orderNo");//订单号

        	
        	$('.atoncePay').on('click',function(){
        		window.location.href = "iOSChuwangApp://"+imGroupId+'/'+groupName+'/'+orderNo;
        	});


	
        });
    });
});
