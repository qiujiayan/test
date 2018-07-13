define(function (require) {
    require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
        $(function () {
        	
//      	var versionName = 0,linkUrl;
//			appApi.getLastVersion(versionName,function(reqs){
//				console.log(reqs);
//				if(reqs.code==1){
//					linkUrl = reqs.content.downUrl;
//				}else{
//					$.dialog({
//                      content: reqs.msg,
//                      title: "alert",
//                      time: "2000"
//                  })
//				}
//			})
			
					$('.downloadApp').on('click',function(){
						if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){//苹果设备
							location.href ="https://itunes.apple.com/cn/app/%E8%B6%85%E7%81%AB-%E4%BD%A0%E7%9A%84%E7%A4%BE%E7%BE%A4%E5%8F%AF%E6%83%B3%E8%B1%A1/id1348054748?mt=8"; 
//				            $.dialog({
//		                        content: "请到苹果商店下载 超火APP",
//		                        title: "alert",
//		                        time: "2500"
//		                    })
				            
				        }
				        if(navigator.userAgent.match(/android/i)){//安卓设备
							location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.sf.superfire";	    
						}
					});
	
        });
    });
});
