define(function (require) {
	var $ = require("jquery");
    require.async(['zeptoAlert','wx','appApi','common'], function (zeptoAlert,wx,appApi,common) {
        $(function () {
        	
        	var mLngData = common.getQueryString("mLngData");
        	var mLatData = common.getQueryString("mLatData");
        	console.log(mLngData+','+mLatData);
        	
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(	mLngData, mLatData);
			map.centerAndZoom(point, 15);
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker);               // 将标注添加到地图中
			marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
			
 
			
        });
    });
});
