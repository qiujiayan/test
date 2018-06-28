define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {

			$('.anback').on('click',function(){
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
					history.back();	
			    }
				if(navigator.userAgent.match(/android/i)){
					window.location.href="http://www.chaohuo.net/wxapp/forApp/false.html"; 
				}
			});
			
			
			
        });
    });
});
