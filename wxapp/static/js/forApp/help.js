define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {

			$('.helpback').on('click',function(){
				//window.location.href="protocol://helpfinish"; 
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
					window.location.href="protocol://finish";
			    }
				if(navigator.userAgent.match(/android/i)){
					window.location.href="http://www.chaohuo.net/wxapp/forApp/false.html"; 
				}
			});
 
			
        });
    });
});
