// var doName = "http://192.168.0.110:8092";
var doName = "http://192.168.0.168:8082";
var bucket = 'superfireoss';
var appid = '1255482466';
var region = 'sh';
var oSign,oSigns,oPath;
var sourceUrl;

function upLoad(fileName,imGroupId,doType,callback){
	$.ajax({
		type: "GET",
		url: doName + "/app/cos/tokenMethod/getCosSign",
	//	dataType: "json",
		data: {
			fileName: fileName,
			imGroupId: imGroupId,
			doType:doType
		},
		crossDomain: true,
		success: function(reqs) {
			//console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			//console.log(reqs);
		}
	});	
}

////初始化逻辑
////特别注意: JS-SDK使用之前请先到console.qcloud.com/cos 对相应的Bucket进行跨域设置
function fileJSSDK(oSigns,oSign,oPath,filename,callback){
	var cos = new CosCloud({
	    appid: appid, // APPID 必填参数
	    bucket: bucket, // bucketName 必填参数
	    region: region, // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
	    getAppSign: function (callback) {//获取签名 必填参数
	        callback(oSigns);
	    },
	    getAppSignOnce: function (callback) {//单次签名，参考上面的注释即可
			callback(oSign);
	    }
	});
	var successCallBack = function (result) {
		sourceUrl = result.data.source_url;
		callback(sourceUrl);//返回图片地址回调出去
		//console.log(sourceUrl);
	    console.log('request success.'+ result);
	    return sourceUrl;
	};
	
	var errorCallBack = function (result) {
	    result = result || {};
	    console.log('request error:', result && result.message);
	};
	
	var progressCallBack = function (curr, sha1) {
	    var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%';
	    var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%';
	    var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.';//上传过程
	    //console.log(msg);
	};	
	cos.sliceUploadFile(successCallBack, errorCallBack, progressCallBack, bucket, oPath, filename, 0);
}


//上传版本文件
var oSign,oSigns,oPath;
$('.upload-file').on("change",function(e){
	alert(1);
    var files =this.files;
	console.log(files[0].name);
	upLoad(files[0].name,"6620180126165939541","AA",function(reqs){
		console.log(reqs);
		oSign = reqs.content.oneEffectiveSign;
		oSigns = reqs.content.periodEffectiveSign;
		oPath = reqs.content.cosPath;
		
		fileJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
			console.log(reqs);
		    
		});
	});
	
//
//  var reader =new FileReader();
//  reader.readAsDataURL(files[0]);
//  reader.onload =function(e){
//  	alert("上传成功");
//		$('.appName').html(files[0].name);
//  }
});
