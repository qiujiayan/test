define(function (require, exports, module) {
	//判断是否微信环境
	var ua = window.navigator.userAgent.toLowerCase();
    var isWx = (ua.match(/MicroMessenger/i) == 'micromessenger');
	
	function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    };
    function formatDate(now) { 
		var year=now.getFullYear(); 
		var month=now.getMonth()+1; 
		var date=now.getDate(); 
		var hour=now.getHours(); 
		var minute=now.getMinutes(); 
		var second=now.getSeconds(); 
		if(minute < 10){
			minute = "0"+ minute;
		}
		if(second < 10){
			second = "0"+ second;
		}
		return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
	}
    function htmlspecialcharsDecode(str) {
        str = str.replace(/&amp;/g, '&');
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, "\"");
        str = str.replace(/&#39;/g, "\'");
        return str;
    }
    
    exports.getQueryString = getQueryString;
    exports.formatDate = formatDate;
    exports.htmlspecialcharsDecode = htmlspecialcharsDecode;
});
