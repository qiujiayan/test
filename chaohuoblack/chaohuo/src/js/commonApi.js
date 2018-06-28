//var mainUrl = 'http://192.168.0.250:8020/chaohuo';//本地地址location.href
//var mainUrl = 'http://www.chaohuo.net/chaohuo';//线上地址location.href
//var doName = "http://192.168.0.117:8092/manage";//朱接口本地地址
var doName = "http://192.168.0.168:8092/manage";//田接口本地地址
// var doName = "https://www.chaohuo.net:7092/manage";//线上地址
// var doName = "http://123.206.108.84:8099/manage";//测试端口
var bucket = 'superfireoss';
var appid = '1255482466';
var region = 'sh';
var oSign,oSigns,oPath;
var sourceUrl;
var commonToken = $.cookie("tokenid");

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}   
function formatDate(now) { 
	var year=now.getFullYear(); 
	var month=now.getMonth()+1; 
	var date=now.getDate(); 
	var hour=now.getHours(); 
	var minute=now.getMinutes(); 
	var second=now.getSeconds(); 
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}
function checkPhone(str){ 
    var phone = /^1[34578]\d{9}$/;
	return phone.test(str); 
}
function upLoad(token,fileName,doType,callback){
	$.ajax({
		type: "GET",
		url: doName + "/cos/tokenMethod/getCosSign",
	//	dataType: "json",
		data: {
			token: token,
			fileName: fileName,
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
//	upLoad(token,fileName,doType,function(reqs){
//		oSign = reqs.content.oneEffectiveSign;
//		oSigns = reqs.content.periodEffectiveSign;
//		oPath = reqs.content.cosPath;
//	});
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
	    // console.log('request success.'+ result);
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
//cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, path, file, insertOnly);
//cos.sliceUploadFile(successCallBack, errorCallBack, progressCallBack, bucket, path, file, insertOnly);
//上传文件,适合小于20M的文件上传
//$('#uploadFile').on('click', function () {
//  $('#js-file').off('change').on('change', function (e) {
//      var file = e.target.files[0];
////                  console.log(bucket);
////                  console.log(file.name);
////                  console.log(file);
//
//      // 分片上传过程可能会有 op=upload_slice_list 的 POST 请求返回 404，不会影响上传：https://github.com/tencentyun/cos-js-sdk-v4/issues/16
//      cos.uploadFile(successCallBack, errorCallBack, progressCallBack, bucket, cc, file, 0);//insertOnly==0 表示允许覆盖文件 1表示不允许
//      $('#form')[0].reset();
//      return false;
//  });
//
//  setTimeout(function () {
//      $('#js-file').click();
//  }, 0);
//
//  return false;
//});


//登录接口
function Login(password,username,callback){
	var userdata = {
			password: password,
			username: username
		}
	var userdata = JSON.stringify(userdata);
	$.ajax({
		type: "POST",
		url: doName + "/adminUser/adminUserLogin",
	    dataType: "json",
		contentType: "application/json",
		data: userdata,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//添加社群种类
function addList(token,name,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/addCommunityCategory",
	    dataType: "json",
		contentType: "application/json",
		data: {
			token:token,
			name:name
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询所有社群种类
function queryList(token,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/getAllCommunityCategories",
	    dataType: "json",
		contentType: "application/json",
		data: {
			token:token
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询上线社群种类
function queryOnlineList(token,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/getAllEnabledCommunityCategories",
	    dataType: "json",
		contentType: "application/json",
		data: {
			token:token
		},
		crossDomain: true,
		success: function(res) {
			callback(res);					
		},
		error: function(res) {
			alert("错误信息"+res.msg);
		}
	});	
}
//调整社群种类顺序
function updateCommunityCategorySort(id,upOrDown,type,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/updateCommunityCategorySort?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: {
			id:id,
			upOrDown:upOrDown,
			type:type
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//上下线社群种类
function ediList(token,id,status,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/updateCommunityCategoryStatus",
	    dataType: "json",
		contentType: "application/json",
		data: {
			token:token,
			id:id,
			status:status
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查看分页社群列表
//function checkList(searchWord,categoryType,status,pageNum,pageSize,callback){
//	$.ajax({
//		type: "GET",
//		url: doName + "/community/getAllCommunities",
//	    dataType: "json",
// 		contentType: "application/json",
//		data: {
//			searchWord:searchWord,
//			categoryType:categoryType,
//			status:status,
//			pageNum:pageNum,
//			pageSize:pageSize,
//		},
//		async:false,
//		crossDomain: true,
//		success: function(reqs) {
//			callback(reqs);					
//		},
//		error: function(reqs) {
//			alert("错误信息"+reqs.msg);
//		}
//	});	
//}
//查看分页社群列表
function checkList(searchWord,categoryType,privateFlag,liveFlag,status,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/getAllCommunities?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			categoryType:categoryType,
			privateFlag:privateFlag,
			liveFlag:liveFlag,
			status:status,
			pageNum:pageNum,
			pageSize:pageSize,
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//根据手机号查询用户
function queryPhone(phone,callback){
	$.ajax({
		type: "GET",
		url: doName + "/user/getUserByPhone?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			phone:phone,
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查看单个社群
function checkOneList(communityId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/community/getOneDetailById?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			communityId:communityId,
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//创建社群
function setupList(categoryId,createUser,introduction,joinWay,money,name,password,picture,privateFlag,type,callback){
	var setupdata = {
			categoryId: categoryId,
			createUser: createUser,
			introduction:introduction,
			joinWay:joinWay,
			money:money,
			name:name,
			password:password,
			picture:picture,
			privateFlag:privateFlag,
			type:type
		}
	var setupdata = JSON.stringify(setupdata);
	$.ajax({
		type: "POST",
		url: doName + "/community/createCommunity?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: setupdata,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//向社群添加成员
function addSetupNum(communityId,userId,userType,callback){
	var addsetupdata = {
			communityId: communityId,
			userId: userId,
			userType:userType,
		}
	var addsetupdata = JSON.stringify(addsetupdata);
	$.ajax({
		type: "POST",
		url: doName + "/community/addUsersToChartGroup?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: addsetupdata,
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
//添加banner
function addBanner(linkUrl,show,sourceUrl,status,type,callback){
	var bannerdata = {
			linkUrl: linkUrl,
			show: show,
			sourceUrl:sourceUrl,
			status:status,
			type:type
		}
	var bannerdata = JSON.stringify(bannerdata);
	$.ajax({
		type: "POST",
		url: doName + "/banner/tokenMethod/addBanner?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: bannerdata,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//查看分页banenr列表
function checkBanner(pageNum,type,pageSize,status,callback){
	$.ajax({
		type: "GET",
		url: doName + "/banner/getAllBanners?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			pageNum:pageNum,
			type:type,
			pageSize:pageSize,
			status:status
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//修改banner
function modifyBanner(id,linkUrl,show,sourceUrl,status,callback){
	var modifydata = {
			id:id,
			linkUrl: linkUrl,
			show: show,
			sourceUrl:sourceUrl,
			status:status
		}
	var modifydata = JSON.stringify(modifydata);
	$.ajax({
		type: "POST",
		url: doName + "/banner/tokenMethod/updateBanner?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: modifydata,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//修改社群编辑
function modifyShequn(id,name,introduction,privateFlag,recommend,type,userTotal,status,liveFlag,callback){
	var shequndata = {
			id:id,
			name:name,
			introduction: introduction,
			privateFlag:privateFlag,
			recommend: recommend,
			type:type,
			userTotal:userTotal,
			status:status,
			liveFlag:liveFlag
		}
	var shequndata = JSON.stringify(shequndata);
	$.ajax({
		type: "POST",
		url: doName + "/community/updateCommunity?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: shequndata,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//成员禁言功能
function Gag(userId,comunityId,muteDuration,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityUser/banUserByUserIdAndComunityId?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userId:userId,
			comunityId:comunityId,
			muteDuration:muteDuration,
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//成员解除禁言功能
function unbindGag(userId,comunityId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityUser/unBanUserByUserIdAndComunityId?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userId:userId,
			comunityId:comunityId,
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//删除成员
function delMember(userId,communityId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/user/delUsersToChartGroupBatch?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userId:userId,
			communityId:communityId
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//分页查找群成员
function queryMember(communityId,phone,name,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityUser/getAllCommunityUserByCommunityId?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			communityId:communityId,
			phone:phone,
			name:name,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//修改banner排序
function modifyBannerSort(bannerId,upOrDown,type,callback){
	$.ajax({
		type: "GET",
		url: doName + "/banner/updateBannerSort?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			bannerId:bannerId,
			upOrDown:upOrDown,
			type:type
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//分页查询所有社群文件
function queryFiles(communityId,fileName,filetype,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityFile/getAllFilesByCommunityId?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			communityId:communityId,
			fileName:fileName,
			type:filetype,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//分页查询所有社群成员
function queryUsers(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/user/getAllUserPage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询单个社群成员
function queryOneUser(userId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/user/getUserByIdWithCommunity?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userId:userId
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//修改成员编辑
function modifyUser(address,avatar,birthDate,company,id,mail,name,position,region,sex,signature,callback){
	var userData = {
			address:address,
			avatar:avatar,
			birthDate: birthDate,
			company:company,
			id: id,
			mail:mail,
			name:name,
			position:position,
			region:region,
			sex:sex,
			signature:signature
		}
	var userData = JSON.stringify(userData);
	$.ajax({
		type: "POST",
		url: doName + "/user/updateUserById?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: userData,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//查询所有直播
function queryAllLives(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityLive/getAllLives?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询所有直播
function getCommunityLiveInfos(token,pageNum,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLiveLicense/getCommunityLiveInfos",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			token:token,
			pageNum:pageNum,
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//直播审核
function auditCommunityLive(token,id,status,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLiveLicense/auditCommunityLive",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			token:token,
			id:id,
			status:status
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询直播详情
function queryOneLives(communityLiveId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityLive/getOneDetailById?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			communityLiveId:communityLiveId
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询申请列表
function queryThroughList(phone,status,applyStatus,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLicense/getAllUserLicenses?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			phone:phone,
			status:status,
			applyStatus:applyStatus,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//个人审核信息
function queryThroughPerson(userLicenseId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLicense/getOneUserLicenseDetail?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userLicenseId:userLicenseId
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//审核结果
function throughResult(rejectMsg,userLicenseId,status,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLicense/updateUserLicense?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			rejectMsg:rejectMsg,
			userLicenseId:userLicenseId,
			status:status
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//直播认证列表
function getAllUserLiveLicense(name,phone,status,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLiveLicense/getAllUserLiveLicense?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			name:name,
			phone:phone,
			status:status,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//单个直播认证
function updateUserLiveLicense(id,status,callback){
	$.ajax({
		type: "GET",
		url: doName + "/userLiveLicense/updateUserLiveLicense?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			id:id,
			status:status
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//版本列表
function getAllAppVersion(callback){
	$.ajax({
		type: "GET",
		url: doName + "/appVersion/getAllAppVersion?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//上传APP版本
function addAppVersion(appVersion,downUrl,des,osVersion,callback){
	// console.log("测试")
	var AppData = {
			appVersion:appVersion,
			downUrl:downUrl,
			des:des,
			osVersion:osVersion
		}
	AppData = JSON.stringify(AppData);
	$.ajax({
		type: "POST",
		url: doName + "/appVersion/addAppVersion?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: AppData,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);		
			// console.log("测试11")			
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//修改APP版本
function updateAppVersion(id,appVersion,downUrl,status ,des,callback){
	var AppData = {
			id:id,
			appVersion:appVersion,
			downUrl:downUrl,
			status:status,
			des:des
		}
	AppData = JSON.stringify(AppData);
	$.ajax({
		type: "POST",
		url: doName + "/appVersion/updateAppVersion?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: AppData,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//获得反馈列表
function getAllFeedBack(status,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/feedBack/getAllFeedBack?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			status:status,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//反馈处理
function dealFeedBack(id,dealDesc,callback){
	var dealFeedData = {
			id:id,
			dealDesc:dealDesc
		}
	dealFeedData = JSON.stringify(dealFeedData);
	$.ajax({
		type: "POST",
		url: doName + "/feedBack/dealFeedBack?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: dealFeedData,
		crossDomain: true,
		success: function(reqs) {
			console.log(reqs);
			callback(reqs);					
		},
		error: function(reqs) {
			console.log(reqs);
		}
	});	
}
//查询用户钱包列表
function getAllWallet(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/appWallet/getAllWallet",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("钱包列表错误信息"+reqs.msg);
		}
	});	
}
//查询用户订单详情
function getOneDetailWallet(userId,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/appWallet/getOneDetailWallet",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			userId:userId,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("钱包列表错误信息"+reqs.msg);
		}
	});	
}
//查询提现列表
function getAllWithdraw(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/appWallet/getAllWithdraw?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//处理提现
function dealWithdrawOrder(id,status,msg,callback){
	$.ajax({
		type: "GET",
		url: doName + "/appWallet/dealWithdrawOrder?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			id:id,
			status:status,
			msg:msg
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询单个提现订单详情
function getOneWithdrawDetail(id,callback){
	$.ajax({
		type: "GET",
		url: doName + "/appWallet/getOneWithdrawDetail?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			id:id,
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("错误信息"+reqs.msg);
		}
	});	
}
//查询所有的举报
function getAllInform(status,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/inform/getAllInform",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			status:status,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("举报列表错误信息"+reqs.msg);
		}
	});	
}
//处理举报
function dealInform(id,callback){
	$.ajax({
		type: "GET",
		url: doName + "/inform/dealInform?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			id:id
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("处理举报错误信息"+reqs.msg);
		}
	});	
}
//查询单个举报详情
function getOneDetailById(id,callback){
	$.ajax({
		type: "GET",
		url: doName + "/inform/getOneDetailById?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			id:id
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("查询举报错误信息"+reqs.msg);
		}
	});	
}
//添加推送消息
function sendPushAllWithOutExtra(title,type,content,callback){
	$.ajax({
		type: "GET",
		url: doName + "/jpush/sendPushAllWithOutExtra?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			title:title,
			type:type,
			content:content
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("举报列表错误信息"+reqs.msg);
		}
	});	
}
//查询所有推送消息列表
function getAllSystemMessages(pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/jpush/getAllSystemMessages?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("推送消息列表错误信息"+reqs.msg);
		}
	});	
}
//查看红包列表
function getAllSendRedPacketOrders(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/redPacket/getAllSendRedPacketOrders?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("查看红包列表错误信息"+reqs.msg);
		}
	});	
}
//查看红包详情
function getOneRedPacketDetail(no,callback){
	$.ajax({
		type: "GET",
		url: doName + "/redPacket/getOneRedPacketDetail",
	    dataType: "json",
 		contentType: "application/json",
		data: {
			no:no
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("查看红包详情错误信息"+reqs.msg);
		}
	});	
}
//查询所有的社群包含商品信息
function getAllCommunityWithGoods(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getAllCommunityWithGoods?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}
//根据社群id查看商品列表
function getAllGoodsByCommunityIdManage(communityId,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getAllGoodsByCommunityIdManage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			communityId:communityId,
			pageNum:pageNum,
			pageSize:pageSize
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}
//后台查询所有商品
function getAllCommunityGoodsManage(searchWord,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getAllCommunityGoodsManage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}
//后台查询单个商品
function getOneCommunityGoodsManage(goodsId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getOneCommunityGoodsManage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			goodsId:goodsId
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}
//后台查询所有订单
function getAllCommunityGoodsOrderManage(searchWord,status,pageNum,pageSize,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getAllCommunityGoodsOrderManage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			searchWord:searchWord,
			status:status,
			pageNum:pageNum,
			pageSize:pageSize
		},
		async:false,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}
//后台查询单个订单
function getOneCommunityGoodsOrderIdManage(orderId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/communityGoods/getOneCommunityGoodsOrderIdManage?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data: {
			orderId:orderId
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert(reqs.msg);
		}
	});	
}


//添加话题
function addTopic(topicContent,sourceUrl,topicTitle,topicUsername,status,topicSort,topicCreatetime,topicCreatename,id,callback){
	var topicdata = {
			content: topicContent,
			picture:sourceUrl,
			title:topicTitle,
			username:topicUsername,		
			status:status,
			sort:topicSort,
			createtime:topicCreatetime,
			createname:topicCreatename,	
			id:id			
		}
	var topicdata = JSON.stringify(topicdata);
	$.ajax({
		type: "POST",
		url: doName + "/topic/addTopic?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: topicdata,
		crossDomain: true,
		success: function(reqs) {
			// console.log(reqs);
			callback(reqs);			
		},
		error: function(reqs) {
			console.log(reqs);		
		}
	});		
}