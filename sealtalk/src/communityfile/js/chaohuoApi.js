//(function($){
//	$(function(){
		//var doName = "http://192.168.0.110:8082/app";//田接口本地地址
		var doName = "https://www.chaohuo.net:7090/app";//线上地址
		alert("22220");		
		//var commonToken = localStorage.getItem("filetoken");
		
		var files,sourceUrl;
		var oSign,oSigns,oPath;
		var bucket = 'superfireoss';
		var appid = '1255482466';
		var region = 'sh';
		var commonToken =  getQueryString("filet");
		console.log(commonToken)
		
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
		};
		
		function upLoad(fileName,doType,callback){
			$.ajax({
				type: "GET",
				url: doName + "/cos/tokenMethod/getCosSign?token="+commonToken,
			//	dataType: "json",
				data: {
					fileName: fileName,
					doType:doType
				},
				async:false,
				crossDomain: true,
				success: function(reqs) {
					callback(reqs);				
				},
				error: function(reqs) {
					//console.log(reqs);
				}
			});	
		}

		////初始化逻辑
		////特别注意: JS-SDK使用之前请先到console.qcloud.com/cos 对相应的Bucket进行跨域设置
		//上传小于20M文件
		function imgJSSDK(oSigns,oSign,oPath,filename,callback){
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
			cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, oPath, filename, 0);
		}
		//大于20M东西上传
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
		//查看群文件
		function getCommunityFilesByImGroupId(communityId,imGroupId,pageNum,pageSize,searchWord,callback) {
			$.ajax({
				type: "GET",
				url: doName + "/community/tokenMethod/getCommunityFiles?token="+commonToken,
				dataType: "json",
				data: {
					communityId:communityId,
					imGroupId:imGroupId,
					pageNum:pageNum,
					pageSize:pageSize,
					searchWord:searchWord
				},
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				beforeSend: function() {},
				success: function(reqs) {
					callback(reqs);
				},
				error: function(reqs) {
					$.dialog({
	                    content: reqs.msg,
	                    title: "alert",
	                    time: "2000"
	                })
				}
			});
		}
		//上传群文件
		function createCommunityFile(communityId,imGroupId,name,size,type,url,callback){
			var data = {
					communityId: communityId,
					imGroupId: imGroupId,
					name:name,
					size:size,
					type:type,
					url:url
				}
			var data = JSON.stringify(data);
			$.ajax({
				type: "POST",
				url: doName + "/community/tokenMethod/createCommunityFile?token="+commonToken,
			    dataType: "json",
				contentType: "application/json",
				data: data,
				async:false,
				crossDomain: true,
				success: function(reqs) {
					callback(reqs);					
				},
				error: function(reqs) {
					console.log(reqs);
				}
			});	
		}
		
		//查看群详情
		function getCommunityInfo(communityId,callback){
			$.ajax({
				type: "GET",
				url: doName + "/community/tokenMethod/getCommunityInfo?token="+commonToken,
			    dataType: "json",
				data: {
					communityId:communityId
				},
				async:false,
				crossDomain: true,
				success: function(reqs) {
					callback(reqs);					
				},
				error: function(reqs) {
					console.log(reqs);
				}
			});	
		}
	    


//		
//	})
//})(jQuery)
