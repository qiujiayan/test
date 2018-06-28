(function ($) {
	$(function () {
		var oTableHead = `<tr>
						<td>ID</td>
						<td>版本号</td>
						<td>下载地址</td>
						<td>系统</td>
						<td>创建时间</td>
						<td>状态</td>
						<td style="width:100px;">说明</td>
						<td>操作</td>
					</tr>`;
		var oTable = '', isStatus, isDes,osVersion;
		var sourceUrl;
		var files, oSigns, oSign, oPath;
		var id;

		getAllAppVersion(function (reqs) {
			// console.log(reqs);
			if (reqs.code == 1) {
				$('.index-total').html("共有数据：" + reqs.content.length + "条");
				oTable = '';
				for (var i = 0; i < reqs.content.length; i++) {
					if (reqs.content[i].status == 1) {
						isStatus = "上线";
					} else {
						isStatus = "下线";
					};
					if (reqs.content[i].des == null) {
						reqs.content[i].des = "无";
					}
					if(reqs.content[i].osVersion == 1){
						osVersion = "安卓";
					}else {
						osVersion = "ios";
					}
					oTable += `<tr>
								<td>${reqs.content[i].id}</td>
								<td>${reqs.content[i].appVersion}</td>
								<td>${reqs.content[i].downUrl}</td>
								<td>${osVersion}</td>
								<td>${formatDate(new Date(reqs.content[i].createTime))}</td>
								<td>${isStatus}</td>
								<td><div style="width:100px;height:60px;overflow:hidden;">${reqs.content[i].des}</div></td>
								<td>
									<span class="index-editor" dataid = ${reqs.content[i].id}>编辑</span>
								</td>
							</tr>`;
				}
				
				$('.index-table').append(oTableHead + oTable);
			} else {
				alert("错误信息" + reqs.msg);
			}
		});

		//添加版本
		$(function () {
			var sourceUrl = "";//文件路径或填写的url
			var _ban = 1; // 上传的是安卓还是ios  1--安卓   2--ios
			$(".system-ai").change(function () {
				_ban = $(".system-ai option:selected").val();
				if (_ban == 1) {
					$(".anzhuo_con").show();
					$(".ios_con").hide();
				}
				else {
					$(".anzhuo_con").hide();
					$(".ios_con").show();
				}
			});
			// 获取 上传文件
			$('.manage-banner-add .manage-upa-file').on("change", function (e) {
				files = this.files;
				// console.log(files[0].name);
				upLoad($.cookie("tokenid"), files[0].name, "AA", function (reqs) {
					console.log(reqs);
					oSign = reqs.content.oneEffectiveSign;
					oSigns = reqs.content.periodEffectiveSign;
					oPath = reqs.content.cosPath;
					fileJSSDK(oSigns, oSign, oPath, files[0], function (reqs) {
						//console.log(reqs);
						sourceUrl = reqs;						
					});
				});
				var reader = new FileReader();
				console.log(reader);
				reader.readAsDataURL(files[0]);
				if(reader){
					reader.onload = function (e) {					
						alert("上传成功");
						$('.appName').html(files[0].name);
					}
				}
				else{
					alert("上传失败");
				}		
				
			});
			// 点击事件
			$(document).on('click', '.index-btn-con', function () {
				if (_ban == 1) {
					var osVersion = "1";
				} else if (_ban == 2) {
					var osVersion = "2";
					var ios_url = $(".iosName").val();
					if (ios_url == "") {
						sourceUrl = sourceUrl;
					}
					else {
						sourceUrl = ios_url;
					}
				}
				
				// console.log(sourceUrl);
				var appVersion = $('.version-num').val();
				var des = $('.version-detail').val();
				addAppVersion(appVersion,sourceUrl,des,osVersion,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
						alert("版本添加成功");
						location.reload();
					}else{
						alert("添加版本错误信息"+reqs.msg);
					}
				})
			})
		});




		//ios上传版本文件
		// $('.manage-banner-addios .manage-upa-file-ios').on("change",function(e){
		//     files =this.files;
		// 	console.log(files[0].name);
		// 	upLoad($.cookie("tokenid"),files[0].name,"AA",function(reqs){
		// 		console.log(reqs);
		// 		oSign = reqs.content.oneEffectiveSign;
		// 		oSigns = reqs.content.periodEffectiveSign;
		// 		oPath = reqs.content.cosPath;

		// 		fileJSSDK(oSigns,oSign,oPath,files[0],function(reqs){

		// 		    sourceUrl = reqs;	
		// 		    $(document).on('click','.index-btn-con-ios',function(){
		// 		    	console.log(sourceUrl);
		// 			    var appVersion = $('.version-num-ios').val();
		// 				var des = $('.version-detail-ios').val();
		// 				var iosurl = $('.iosName').val();
		// 				var osVersion = "2";

		// 			    addAppVersion(appVersion,sourceUrl,iosurl,des,osVersion,function(reqs){
		// 			    	console.log(reqs);
		// 			    	if(reqs.code==1){
		// 			    		alert("版本添加成功");
		// 			    		location.reload();
		// 			    	}else{
		// 						alert("添加版本错误信息"+reqs.msg);
		// 					}
		// 			    })
		// 		    })
		// 		});
		// 	});
		//     var reader =new FileReader();
		//     reader.readAsDataURL(files[0]);
		//     reader.onload =function(e){
		//     	alert("上传成功");
		// 		$('.appName-ios').html(files[0].name);
		//     }
		// });

		// $('.manage-banner-addios').hide();
		$('.manage-banner-add').hide();
		$(document).on('click', '.add-version', function () {
			$('.user-manage-show').hide();
			$('.manage-banner-add').show();
			// $('.manage-banner-addios').hide();
		});
		// $(document).on('click','.addios-version',function(){
		// 	$('.user-manage-show').hide();
		// 	$('.manage-banner-addios').show();
		// 	$('.manage-banner-add').hide();
		// });

		$(document).on('click', '.index-btn-cel', function () {
			$('.manage-banner-add').hide();
			// $('.manage-banner-addios').hide();			
			$('.manage-banner-edi').hide();
			$('.user-manage-show').show();
		});
		$(document).on('click', '.index-editor', function () {
			id = $(this).attr("dataid");
			$('.user-manage-show').hide();
			$('.manage-banner-edi').show();
			// alert($(this).parent().prev().prev().prev().prev().html());
			if($(this).parent().prev().prev().prev().prev().html()=="ios"){
				$("#modify_ios").show();
				// alert("111");
			}
			else if($(this).parent().prev().prev().prev().prev().html()=="安卓"){
				$("#modify_ios").hide();
				// alert("222");
			}
			$('.version-num-modify').val($(this).parent().prev().prev().prev().prev().prev().prev().html());// 版本号
			$(".modify-appName").html($(this).parent().prev().prev().prev().prev().prev().html())// 下载地址
			$('.version-detail-modify').val($(this).parent().prev().children().html());//说明
			$(".version-xitong-modify").val($(this).parent().prev().prev().prev().prev().html()); // 系统
		});



		
		//修改版本
		$('.manage-banner-edi .modify-upa-file').on("change", function (e) {
			files = this.files;
			console.log(files[0].name);
			upLoad($.cookie("tokenid"), files[0].name, "AA", function (reqs) {
				// console.log(reqs);
				oSign = reqs.content.oneEffectiveSign;
				oSigns = reqs.content.periodEffectiveSign;
				oPath = reqs.content.cosPath;
				fileJSSDK(oSigns, oSign, oPath, files[0], function (reqs) {
					sourceUrl = reqs;
					console.log(sourceUrl);
				});
			});

			var reader = new FileReader();
			console.log(reader);
			reader.readAsDataURL(files[0]);
			if(reader){
				reader.onload = function (e) {					
					alert("上传成功");
					$('.modify-appName').html(files[0].name);
				}
			}
			else{
				alert("上传失败");
			}	
		});

		$('.version-con').on('click', function () {
			var _iocfill = $("#modify_ios_fill").val();
			
			var appVersion = $('.version-num-modify').val();
			var des = $('.version-detail-modify').val();
			var status = $("select[name='versionStatus']").val();
			

			if(_iocfill == ""){
				sourceUrl = sourceUrl || $('.modify-appName').html();
			}
			else{
				sourceUrl = _iocfill;
			}

			
			// console.log(sourceUrl);
			// console.log(id+"---"+appVersion+"---"+sourceUrl+"--"+status+"--"+des);
			updateAppVersion(id, appVersion, sourceUrl, status, des, function (reqs) {
				// console.log(reqs);
				if (reqs.code == 1) {
					alert("修改成功");
					location.reload();
				} else {
					alert("修改版本错误信息" + reqs.msg);
				}
			})
		})


	})
})(jQuery)
