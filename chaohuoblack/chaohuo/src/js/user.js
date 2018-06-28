(function($){
	$(function(){
//		$('.user-manage-show .user-add').on('click',function(){
//			$('.user-manage-show').css('display','none');
//			$('.user-add-show').css('display','block');
//		});
//		$('.user-manage-show .user-table-kan').on('click',function(){
//			$('.user-manage-show').css('display','none');
//			$('.user-detail-show').css('display','block');
//		});
//		$('.user-manage-show .user-table-edi').on('click',function(){
//			$('.user-manage-show').css('display','none');
//			$('.user-bian-show').css('display','block');
//		});
//		$('.user-detail-show .user-detail-del').on('click',function(){
//			$('.user-detail-show').css('display','none');
//			$('.user-manage-show').css('display','block');
//		});
//		$('.index-btn-con').on('click',function(){
//			window.location.href = mainUrl + 'user.html';
//		});
//		$('.index-btn-cel').on('click',function(){
//			window.location.href = mainUrl + 'user.html';
//		});
//		$('.user-table-del').on('click',function(){
//			var _this = $(this);
//			$('.delete-wrap').show();
//			$('.delete-confirm').click(function(){
//				_this.parent().parent().remove();	
//				$('.delete-wrap').hide();
//			});
//			$('.delete-cancel').click(function(){
//				$('.delete-wrap').hide();
//			});
//		});
		var searchWord,pageNum,pageSize;
		//用户表格头部
		var oTableString = `<tr>
								<td>
									<input type="checkbox" class="user-allcheck"/>全选
								</td>
								<td>用户ID</td>
								<td>用户名称</td>
								<td>性别</td>
								<td>联系方式</td>
								<td>操作</td>
							</tr>`;
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize=10;
		var _this,userId,selfString;
		var sourceUrl,files;
		var address,avatar,birthDate,company,id,mail,name,position,region,sex,signature;//修改用户信息变量
		var sexName;
		var pagerBox = document.getElementById('pager');
		queryUsers(searchWord,1,pageSize,function(reqs){
			//console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;	
		});

		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		   	queryUsers(searchWord,(this.__index)-1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].sex)
							{
							case 0:
							  sexName="未知";
							  break;
							case null:
							  sexName="未知";
							  break;
							case 1:
							  sexName="男";
							  break;
							case 2:
							  sexName="女";
							  break;
							}
						oTableTr += `<tr>
									<td><input type="checkbox"  class="user-onecheck"/></td>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].name}</td>
									<td>${sexName}</td>
									<td>${tableLength[i].phone}</td>
									<td>
										<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
										<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
									</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
			
		   		}else{
		   			alert(reqs.msg);
		   		};
		   		
				var radios = $('.user-onecheck');
				$(document).on('click','.user-allcheck',function(){
				    for (var i=0; i<radios.length; i++){
						if($(this).is(':checked')){
					        radios[i].checked = true;	
						}else{
							radios[i].checked = false;
						}
				    }
					
				});
			});
		};
		
		 
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
		
		$(document).on('click','.user-search',function(){
			searchWord = $("input[name='userSearch']").val();
			$('.pager-box').remove();
			queryUsers(searchWord,0,10,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					pageNum = reqs.content.totalPages;
					numTotal = reqs.content.totalElements;
					oTableTr = '';
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].sex)
							{
							case 0:
							  sexName="未知";
							  break;
							case null:
							  sexName="未知";
							  break;
							case 1:
							  sexName="男";
							  break;
							case 2:
							  sexName="女";
							  break;
							}
						oTableTr += `<tr>
									<td><input type="checkbox"  class="user-onecheck"/></td>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].name}</td>
									<td>${sexName}</td>
									<td>${tableLength[i].phone}</td>
									<td>
										<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
										<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
									</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
					$('.user-index .index-total').html("共有数据:"+numTotal+"条");
					var pager = new Pager({
					  index: 1,
					  total: pageNum,
					  parent: pagerBox,
					  onchange: doChangePage
					});
			
		   		}else{
		   			alert(reqs.msg);
		   		};
			});
		});
		
		$('.user-index .index-total').html("共有数据:"+numTotal+"条");
		
		$(document).on('click','.index-query',function(){
			userId = $(this).attr("dataid");
			queryOneUser(userId,function(reqs){
				console.log(reqs);
				if(reqs.code ==1){
					switch (reqs.content.sex)
							{
							case 0:
							  sexName="未知";
							  break;
							case null:
							  sexName="未知";
							  break;
							case 1:
							  sexName="男";
							  break;
							case 2:
							  sexName="女";
							  break;
							}
					var userLength = reqs.content.communities;//用户创建的社群
					reqs.content.address = reqs.content.address ||'';
					reqs.content.region = reqs.content.region ||'';
					$('.main-content-inner').load('src/html/userdetail.html .user-detail-show',function(){
						$('.user-detail-show .user-selflist').html("");
						selfString ='';
						$('.user-detail-show .user-head').attr("src",reqs.content.avatar);
						$('.user-detail-show .user-name').html(reqs.content.name);
						//$('.user-detail-show .user-level').html(reqs.content.name);//会员等级
						$('.user-detail-show .user-sex').html(sexName);
						$('.user-detail-show .user-company').html(reqs.content.company);
						$('.user-detail-show .user-job').html(reqs.content.position);
						$('.user-detail-show .user-address').html(reqs.content.region+reqs.content.address);
						$('.user-detail-show .user-mobile').html(reqs.content.phone);
						$('.user-detail-show .user-qq').html(reqs.content.phone);
						$('.user-detail-show .user-wx').html(reqs.content.wx);
						$('.user-detail-show .user-mail').html(reqs.content.mail);
						$('.user-detail-show .user-birthday').html(reqs.content.birthDate);
						$('.user-detail-show .user-no').html(reqs.content.id);//会员编号
						//$('.user-detail-show .user-date').html(reqs.content.birthDate);//会员到期时间
						$('.user-detail-show .user-sign').html(reqs.content.signature);
						$('.user-detail-show .user-qrcode').attr("src",reqs.content.qrCode);
						for(var i=0;i<reqs.content.communities.length;i++){
							selfString +=`${reqs.content.communities[i].name},`;
						}
						$('.user-detail-show .user-selflist').append(selfString);//这个会员自建的社群	
					});
				}
			})
		});
		
		$(document).on('click','.index-editor',function(){
			_this = $(this);
			userId = $(this).attr("dataid");
			queryOneUser(userId,function(reqs){
				console.log(reqs);
				if(reqs.code ==1){
					switch (reqs.content.sex)
							{
							case 0:
							  sexName="未知";
							  break;
							case null:
							  sexName="未知";
							  break;
							case 1:
							  sexName="男";
							  break;
							case 2:
							  sexName="女";
							  break;
							}
					var userLength = reqs.content.communities;//用户创建的社群
					$('.main-content-inner').load('src/html/usereditor.html .user-bian-show',function(){
						$('.user-bian-show .user-selflist').html("");
						selfString ='';
						$('.user-bian-show .user-head').attr("src",reqs.content.avatar);
						$('.user-bian-show .user-name').val(reqs.content.name);
						//$('.user-bian-show .user-sex').html(sexName);
						$('.user-bian-show .user-company').val(reqs.content.company);
						$('.user-bian-show .user-job').val(reqs.content.position);
						//$('.user-bian-show .user-address').html(reqs.content.region);
						$('.user-bian-show .user-qq').html(reqs.content.phone);
						$('.user-bian-show .user-mobile').html(reqs.content.phone);
						$('.user-bian-show .user-wx').html(reqs.content.wx);
						$('.user-bian-show .user-mail').val(reqs.content.mail);
						$('.user-bian-show .user-birthday').val(reqs.content.birthDate);
						$('.user-bian-show .user-no').val(reqs.content.id);//会员编号
						$('.user-bian-show .user-sign').val(reqs.content.signature);
						$('.user-bian-show .user-qrcode').attr("src",reqs.content.qrCode);
						//三级地址联动
						$("#city").citySelect({
							prov:"上海",
							nodata:"none",
							required:true
						}); 
						//编辑用户信息
						$(document).on('click','.user-confirm',function(){
							
							address = $('.address-detail').val();
							avatar = sourceUrl;
							//birthDate = $('.user-birthday').val();
							company = $('.user-company').val();
							id = $('.user-no').val();
							mail = $('.user-mail').val();
							name = $('.user-name').val();
							position = $('.user-job').val();
							region = $('.prov').val()+$('.city').val()+$('.dist').val();
							if($('.dist').val()==null){
								region = $('.prov').val()+$('.city').val();
							}
							sex = $('input[type="radio"]:checked').val();
							signature = $('.user-sign').val();
							
							console.log(address);
 							modifyUser(address,avatar,birthDate,company,id,mail,name,position,region,sex,signature,function(reqs){
 								console.log(reqs);
								if(reqs.code==1){
									location.reload();
								}else{
									alert(reqs.msg);
								}
								
							})
						});
						$(document).on('click','.user-cancel',function(){
							location.reload();
						});
						
						
					});
					
					
				}
			});
		});
		
		
		//编辑用户头像
		$(document).on("change",".user-upa-file",function(e){
		    files =this.files;
			console.log(files[0].name);
			upLoad($.cookie("tokenid"),files[0].name,"B",function(reqs){
				console.log(reqs);
				oSign = reqs.content.oneEffectiveSign;
				oSigns = reqs.content.periodEffectiveSign;
				oPath = reqs.content.cosPath;
				
				imgJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
				    sourceUrl = reqs;	
				});
			});
			

		    var reader =new FileReader();
		    reader.readAsDataURL(files[0]);
		    reader.onload =function(e){
		        var dx =(e.total/1024)/1024;
		        if(dx>=2){
		          alert("文件大小大于2M");
		          return;
		        }
		        $('.user-head').attr('src',this.result);
		    }
	    });
		

		
		$(document).on('click','.user-detail-del',function(){
			location.reload();
//			$('.main-content-inner').load('user.html .user-manage-show',function(){
//				doChangePage();
//			});
		});

		
		
	})
})(jQuery)
