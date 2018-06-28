//(function(){
//
//	var ua = window.navigator.userAgent.toLowerCase();
//	var inApp;
//	var ogoodsToptitle = document.querySelector('.goodsToptitle');
//	ua.indexOf('udstoreapp') > 0 ? inApp = true : inApp = false;
//	if(inApp){
//	    ogoodsToptitle.style.display='none';
//	}
//})()
//function downApp() {
//  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
//      window.location.href = "https://itunes.apple.com/us/app/you-dui-shang-cheng/id%1158780863?mt=8&uo=4";
//  }
//  if(navigator.userAgent.match(/android/i))
//  {
//		window.location.href = "http://www.udui.com/APP/Android/release/udui.apk";//android 下载地址  
//  }
//}

define(function (require) {
    require.async(['jquery'], function (jquery) {
        $(function () {
	//  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
	//      $('header').hide();
	//  }
	//  if(navigator.userAgent.match(/android/i))
	//  {
	//		$('header').hide();
	//  }
			$('body').css('display','block');
        });
    });
});
