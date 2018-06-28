/* var options = {
	 	domain			: 'http://cos.chaohuo.net/',											// default : '' ,必须设置文件服务器地址。
	  	file_data_name	: 'file',										// default : file , 文件对象的 key 。
	 	base64_size		: 3,											// default : 3 单位 MB 。
		chunk_size		: 20,											// default : 3 单位 MB 。
		headers			: { Content-Type : 'multipart/form-data'},		// default : { Content-Type : 'multipart/form-data'} ,增加 requestHeader 需扩展。 
	  	multi_parmas	: { },											// default : {} 扩展上传属性 。
	  	query			: { },											// default : {}	扩展 url 参数 e.g. http://rongcloud.cn?name=zhangsan 。
	  	support_options : true,											// default : true, 文件服务器不支持 OPTIONS 请求需设置为 false。
		data 			: dataType.form,
		refreshSign		: function(cb){}
  	};*/

//-----FILE----------------------------------------------------------------------------------------------------------
var callback = {
		onError	: function (errorCode) { 
			console.log(errorCode);
		},
		onProgress : function (loaded, total) {
			var percent = Math.floor(loaded/total*100);
			var progressBar 	= document.getElementById('progressBar'), 
				progressContent = document.getElementById('progressContent');
				progressBar.style.width = percent + '%';
        		progressContent.innerHTML = percent + "%";
		},
		onCompleted : function (data) { 
			document.getElementById('success-log').innerHTML += JSON.stringify(data) + '</br>';
		} 
 };
var fileName = "a.txt",imGroupId = "6620180126165939541",doType="AA";
var appServerBaseUrl = "http://192.168.0.168:8082";
var fileConfig = { 
			domain: 'http://cos.chaohuo.net/',
		 	multi_parmas : {op: 'upload', insertOnly:0},
		 	file_data_name : 'fileContent',
		 	support_options:false,
		 	chunk_size:20,
		 	refreshSign:function(cb){
				$.ajax({
	                type: "GET",
	                url: appServerBaseUrl + "/app/cos/tokenMethod/getCosSign?fileName="+fileName+"&imGroupId="+imGroupId+"&doType="+doType,
	                dataType: "text",
	                success: function (data) {
	                	console.log(data);
	                    var data = JSON.parse(data);
	                	cb({path:'http://cos.chaohuo.net/files/v1/10011010' + data.path, sign:data.sign});
	                }
	            });
		 	}
		 };
var fileUpload = uploadTencent.init(fileConfig);
var file = document.getElementById("file-Id");
file.onchange = function(){
	fileUpload.upload(file.files[0], callback);
};
