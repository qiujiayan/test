define(function (require) {
	var $ = require("jquery");
    require.async(['zeptoAlert','wx','common'], function (zeptoAlert,wx,common) {
        $(function () {

			$('.redback').on('click',function(){

				window.location.href="http://www.chaohuo.net/wxapp/forApp/false.html"; 
			});
 
			
        });
    });
});
