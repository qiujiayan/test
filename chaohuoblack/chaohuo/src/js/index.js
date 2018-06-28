(function($){
	$(function(){
		var oToken = $.cookie("tokenid");
		var oStr2 = '',oStr3 = '',qunStatus = '正常',sourceUrl,communityId,setpeople='',oprivateFlag,oliveFlag,setfile='';
		var categoryId,createUser,introduction,joinWay,money,name,password,picture,type,privateFlag;
		var oString  = `<div class="index-img2 col-md-1 col-sm-1 col-xs-3 addusers">添加</div>
						<input type="text" placeholder="添加成员账号(必填)" class="addusers-mobile"/>`;
		
		var mid,mname,mintroduction,mrecommend,mtype,muserTotal,mstatus,mprivateFlag,mliveFlag;
		var searchWord,categoryType,status,liveFlag;
		var pager;
		var fileName,filetype;
		var privateFlagStatus,liveFlagStatus;
		
		queryList(oToken,function(res){
			//console.log(res);
			if(res.code==1){
				for(var i=0;i<res.content.length;i++){
					oStr2 += '<option value = "'+ res.content[i].id +'">'+res.content[i].name+'</option>';
				}
				$('.index-leibie').append(oStr2);
				$("select[name='setup-lei']").append(oStr2);
				$("select[name='bianji-type']").append(oStr2);	
			}
		});
		//创建社群时查找所有上线的社群
		queryOnlineList(oToken,function(res){
			//console.log(res);
			if(res.code==1){
				for(var i=0;i<res.content.length;i++){
					oStr3 += '<option value = "'+ res.content[i].id +'">'+res.content[i].name+'</option>';
				}
				$("select[name='setup-lei-online']").append(oStr3);	
			}
		});
		
		//社群表格头部
		var oTableString = `<tr>
								<td>
									<input type="checkbox" class="index-checkall"/>全选
								</td>
								<td>社群ID</td>
								<td>社群名称</td>
								<td>社群账号</td>
								<td>社群类别</td>
								<td>社群人数</td>
								<td>状态</td>
								<td>直播权限</td>
								<td>标识</td>
								<td>推荐</td>
								<td>操作</td>
							</tr>`;
		var oTableTr = '',pageNum = 0,numTotal = 0;
		
		function doChangePage(){
		   oTableTr = '';
		   checkList(searchWord,categoryType,privateFlag,liveFlag,status,(this.__index)-1,10,function(reqs){
		   		console.log(reqs);
		   		if(reqs.code==1){
		   			
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 0:
							  qunStatus="永久封号";
							  break;
							case 1:
							  qunStatus="正常";
							  break;
							case 2:
							  qunStatus="封号1天";
							  break;
							case 3:
							  qunStatus="封号3天";
							  break;
							case 4:
							  qunStatus="封号7天";
							  break;
							}
						switch (tableLength[i].privateFlag)
							{
							case 1:
							  privateFlagStatus="私有";
							  break;
							case 0:
							  privateFlagStatus="公开";
							  break;
							}
						switch (tableLength[i].liveFlag)
							{
							case 0:
							  liveFlagStatus="未申请";
							  break;
							case 1:
							  liveFlagStatus="申请中";
							  break;
							case 2:
							  liveFlagStatus="申请通过";
							  break;
							case 3:
							  liveFlagStatus="申请未通过";
							  break;
							}
						oTableTr += `<tr>
									<td><input type="checkbox"  class="index-checkone"/></td>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].communityCategoryName}</td>
									<td>${tableLength[i].userTotal}</td>
									<td>${qunStatus}</td>
									<td>${liveFlagStatus}</td>
									<td>${privateFlagStatus}</td>
									<td>${tableLength[i].recommend}</td>
									<td>
										<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
										<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
									</td>
								</tr>`; 
					}
					//console.log(oTableTr);
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
			
		   		}else{
		   			alert("错误信息"+reqs.msg);
		   		}
			})
		    var radios = $('.index-checkone');
			$('.index-checkall').on('click',function(){
			    for (var i=0; i<radios.length; i++){
					if($(this).is(':checked')){
				        radios[i].checked = true;	
					}else{
						radios[i].checked = false;
					}
			    }
				
			});
		   
		}
		checkList(searchWord,categoryType,privateFlag,liveFlag,status,0,10,function(reqs){
			if(reqs.code==1){
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				//console.log(reqs);	
			}else{
	   			alert("错误信息"+reqs.msg);
	   		}
		})
		
		$(document).on('click','.index-search',function(){
			searchWord = $('input[name="header-search-name"]').val();
			categoryType = $('select[name="header-search-type"]').val();
			status = $('input[name="header-search-status"]').val();
			
			checkList(searchWord,categoryType,privateFlag,liveFlag,status,0,10,function(reqs){
					console.log(reqs);	
				if(reqs.code==1){
					oTableTr ='';
					pageNum = reqs.content.totalPages;
					numTotal = reqs.content.totalElements;
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 0:
							  qunStatus="永久封号";
							  break;
							case 1:
							  qunStatus="正常";
							  break;
							case 2:
							  qunStatus="封号1天";
							  break;
							case 3:
							  qunStatus="封号3天";
							  break;
							case 4:
							  qunStatus="封号7天";
							  break;
							}
						switch (tableLength[i].privateFlag)
							{
							case 1:
							  privateFlagStatus="私有";
							  break;
							case 0:
							  privateFlagStatus="公开";
							  break;
							}
						switch (tableLength[i].liveFlag)
							{
							case 0:
							  liveFlagStatus="封播";
							  break;
							case 1:
							  liveFlagStatus="正常";
							  break;
							}
						oTableTr += `<tr>
									<td><input type="checkbox"  class="index-checkone"/></td>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].communityCategoryName}</td>
									<td>${tableLength[i].userTotal}</td>
									<td>${qunStatus}</td>
									<td>${liveFlagStatus}</td>
									<td>${privateFlagStatus}</td>
									<td>${tableLength[i].recommend}</td>
									<td>
										<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
										<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
									</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
					//移除生产的页码,重新生成
					$('.pager-box').remove();
					pager = new Pager({
					  index: 1,
					  total: pageNum,
					  parent: pagerBox,
					  onchange: doChangePage
					});
					
				}else{
		   			alert("错误信息"+reqs.msg);
		   		}
			})
		})
		
		var pagerBox = document.getElementById('pager');
		 
		pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
		


		$('.index-total').html("共有数据：" +numTotal+"条");
		
		
		//社群编辑查看	
		$('.index-table').on('click','.index-editor',function(){
			mid = $(this).attr('dataid');
			//console.log($(this).attr('dataid'));
	    	communityId = $(this).attr('dataid');
			checkOneList(communityId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.bianji-detail-people').empty();
					setpeople = '';
					$('.setup-mainlist').css('display','none');
	    			$('.setup-binaji').css('display','block');
					$('.bianji-name').val(reqs.content.name);
					$('.bianji-zhang').html(reqs.content.no);
					$('.bianji-num').val(reqs.content.userTotal);
					$('.bianji-host').html(reqs.content.communityMasterName);
					///$('.bianji-hosts').html(reqs.content.createUser);//社群管理员
					
					//$('.bianji-type').val(reqs.content.communityCategoryName);
					//console.log($("select[name='bianji-type']"));
					$("select[name='bianji-type'] option[value='"+reqs.content.type+"']").attr("selected",true);
					$("select[name='bianji-status'] option[value='"+reqs.content.status+"']").attr("selected",true);

					$('.bianji-textarea').val(reqs.content.introduction);
 					for(var i=0;i<reqs.content.users.length;i++){
 						if(reqs.content.users[i].name == null){
 							reqs.content.users[i].name ="未定义";
 						}
 						if(reqs.content.users[i].avatar == null){
 							reqs.content.users[i].avatar ="assets/images/gallery/image-1.jpg";
 						}
    					setpeople += `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${reqs.content.users[i].id}"  communityid="${communityId}">
										<img src="${reqs.content.users[i].avatar}"/>	
										<span>${reqs.content.users[i].name}</span>
										<div class="fluid">禁言中</div>
									</div>`;
									
 					}
 					$('.bianji-detail-people').append(setpeople+oString);	
					
					
				}else{
					alert("错误信息"+reqs.msg);
				}
			});
			
			queryFiles(communityId,fileName,filetype,0,10,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.bianji-detail-file').empty();
					setfile = '';
 					for(var i=0;i<reqs.content.list.length;i++){
 						if(reqs.content.list[i].name == null){
 							reqs.content.list[i].name ="未定义";
 						}
 						if(reqs.content.list[i].url == null){
 							reqs.content.list[i].url ="assets/images/gallery/image-1.jpg";
 						}
    					setfile += `<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="${reqs.content.list[i].id}"  communityid="${communityId}">
    									<a href="${reqs.content.list[i].url}" target="_blank">
										<img src="${reqs.content.list[i].url}"/>
										</a>
										<span>${reqs.content.list[i].name}</span>
									</div>`;
									
 					}
 					$('.bianji-detail-file').append(setfile);	
					
					
				}else{
					alert("错误信息"+reqs.msg);
				}
			});

			$('.bianji-detail-people').on('click','.addusers',function(){
				var usersMobile = $('.addusers-mobile').val();
				if(checkPhone(usersMobile)){
					queryPhone(usersMobile,function(reqs){
						console.log(reqs.content);
						if(reqs.code ==1){
							var userName = reqs.content.name;//这个用户名字
							var userImg = reqs.content.avatar;//这个用户头像
							if(userName==null){
								userName="未定义";
							}
							if(userImg==null){
								userImg="assets/images/gallery/image-1.jpg";
							}

							var userId = reqs.content.id;//这个用户id
							var userType = "U";
							addSetupNum(communityId,userId,userType,function(reqs){
								console.log(reqs);
								if(reqs.code ==1){
									var thisUser = `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${userId}" communityid="${communityId}">
											<img src="${userImg}"/>	
											<span>${userName}</span>
											<div class="fluid">禁言中</div>
										</div>`;
									$('.bianji-detail-people').prepend(thisUser);
									alert("添加成功");
									$('.addusers-mobile').val("");
								}else{
									alert("错误信息"+reqs.msg);
								}
							});
							
						}else{
							alert("错误信息"+reqs.msg);
						}
					})
				}else{
					alert("手机号错误!");
				}
				//checkPhone(usersMobile)	
			})
	
			//location.href = mainUrl + "/index_two.html?listid=" + $(this).attr('dataid');

		});
		
		
		//查看社群详情
		$('.index-table').on('click','.index-query',function(){
			communityId = $(this).attr('dataid');
			console.log(communityId);
			checkOneList(communityId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.setup-mainlist').css('display','none');
	    			$('.setup-detail').css('display','block');
					setpeople = '';
					$('.setup-detail-people').empty();
					switch (reqs.content.status)
						{
						case 0:
						  qunStatus="永久封号";
						  break;
						case 1:
						  qunStatus="正常";
						  break;
						case 2:
						  qunStatus="封号1天";
						  break;
						case 3:
						  qunStatus="封号3天";
						  break;
						case 4:
						  qunStatus="封号7天";
						  break;
						}
					switch (reqs.content.privateFlag)
						{
						case 1:
						  privateFlagStatus="私有";
						  break;
						case 0:
						  privateFlagStatus="公开";
						  break;
						}
					switch (reqs.content.liveFlag)
						{
						case 0:
						  liveFlagStatus="封播";
						  break;
						case 1:
						  liveFlagStatus="正常";
						  break;
						}

					$('.setup-detail-name').html(reqs.content.name);
					$('.setup-detail-zhang').html(reqs.content.no);
					$('.setup-detail-num').html(reqs.content.userTotal);
					$('.setup-detail-host').html(reqs.content.communityMasterName);
					$('.setup-detail-type').html(reqs.content.communityCategoryName);
					$('.setup-detail-status').html(qunStatus);
					$('.setup-detail-liveFlag').html(liveFlagStatus);
					
					$('.setup-detail-admin').html(reqs.content.admin);
					$('.setup-detail-time').html(formatDate(new Date(reqs.content.createTime)));//时间
					
					$('.setup-detail-textarea').html(reqs.content.introduction);
					$('.setup-detail-recomend').html(reqs.content.recommend);
					$('.setup-detail-privateFlag').html(oprivateFlag);
					$('.setup-detail-liveFlag').html(oliveFlag);
					
 					for(var i=0;i<reqs.content.users.length;i++){
 						if(reqs.content.users[i].name == null){
 							reqs.content.users[i].name ="未定义";
 						}
 						if(reqs.content.users[i].avatar == null){
 							reqs.content.users[i].avatar ="assets/images/gallery/image-1.jpg";
 						}
    					setpeople += `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${reqs.content.users[i].id}" communityid="${communityId}">
										<img src="${reqs.content.users[i].avatar}"/>	
										<span>${reqs.content.users[i].name}</span>
										<div class="fluid">禁言中</div>
									</div>`;		
 					}
 					$('.setup-detail-people').append(setpeople);		
				}else{
					console.log(reqs.msg);
					alert("错误信息"+reqs.msg);
				}
			});
			queryFiles(communityId,fileName,filetype,0,10,function(reqs){
				console.log(reqs);
				//if(reqs.code==1 && reqs.content.list.length>0){
				if(reqs.code==1){
					$('.bianji-detail-file').empty();
					setfile = '';
 					for(var i=0;i<reqs.content.list.length;i++){
 						if(reqs.content.list[i].name == null){
 							reqs.content.list[i].name ="未定义";
 						}
 						if(reqs.content.list[i].url == null){
 							reqs.content.list[i].url ="assets/images/gallery/image-1.jpg";
 						}
    					setfile += `<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="${reqs.content.list[i].id}"  communityid="${communityId}">
    									<a href="${reqs.content.list[i].url}" target="_blank">
										<img src="${reqs.content.list[i].url}"/>
										</a>
										<span>${reqs.content.list[i].name}</span>
									</div>`;
									
 					}
 					$('.bianji-detail-file').append(setfile);	
					
					
				}else{
					alert("错误信息"+reqs.msg);
				}
			});
			//console.log($(this).attr('dataid'));
			//location.href = mainUrl + "/index_three.html?listid=" + $(this).attr('dataid');
		});
		$('.setup-cel').on('click',function(){
	    	$('.setup-detail').css('display','none');
			$('.setup-mainlist').css('display','block');
		});
		$('.setup-cel-search').on('click',function(){
	    	$('.search-allusers').css('display','none');
	    	$('.setup-binaji').css('display','block');
		});
		
		//上传文件功能
		$('.setup-upa-file').on("change",function(e){
		    files =this.files;
			//console.log(files[0].name);
			upLoad($.cookie("tokenid"),files[0].name,"B",function(reqs){
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
		        $('.banner-img').attr('src',this.result);
		    }
	    });	
	    
	    //创建社群
	    $('.setup-list-btn').on('click',function(){
		    var phonenum = $("input[name='setup-phone']").val();
		    queryPhone(phonenum,function(reqs){
		    	console.log(reqs);
		    	if(reqs.code==1){
		    		createUser = reqs.content.id;
		    	}else{
	    			alert("错误信息"+reqs.msg);
	    		}
		    });
	    	categoryId = $("select[name='setup-lei-online']").val();
	    	introduction = $("textarea[name='setup-textarea']").val();
	    	joinWay = $("select[name='setup-way']").val();
	    	name = $("input[name='setup-name']").val();
	    	type = $("select[name='setup-type']").val();
	    	privateFlag = $("select[name='setup-privateFlag']").val();
	    	picture = sourceUrl;
	    	switch (joinWay)
				{
				case 1:
				  money = '';
	    		  password = '';
				  break;
				case 2:
				  money = $("input[name='setup-money']").val();
	    		  password = '';
				  break;
				case 3:
				  money = '';
	    		  password = $("input[name='setup-password']").val();
				  break;
				}
	    	console.log(categoryId + ','+createUser+','+introduction+','+joinWay+','+name+','+type);
	    	
	    	setupList(categoryId,createUser,introduction,joinWay,money,name,password,picture,privateFlag,type,function(reqs){
	    		console.log(reqs);
	    		if(reqs.code == 1){
	    			alert("创建社群成功");
	    			location.reload();
	    		}else{
	    			alert("错误信息"+reqs.msg);
	    		}
	    	});
	    });
	    $('.setup-list-cel').on('click',function(){
	    	$('.setup-list').css('display','none');
	    	$('.setup-mainlist').css('display','block');
	    });
	    
	    
	    //编辑社群确认
	    $('.bianji-con').on('click',function(){
	    
	    	mname = $('.bianji-name').val();
	    	mintroduction = $('.bianji-textarea').val();
	    	mrecommend = $('.bianji-recomend').val();;
	    	mtype = $("select[name='bianji-type']").val();
	    	muserTotal = $('.bianji-num').val();
	    	mstatus = $("select[name='bianji-status']").val();
	    	mprivateFlag = $("select[name='bianji-privateFlag']").val();
	    	mliveFlag = $("select[name='bianji-liveFlag']").val();
	    	
	    	console.log(mid+','+mname+','+mintroduction+','+mrecommend+','+mtype+','+muserTotal+','+mstatus)
	    	modifyShequn(mid,mname,mintroduction,mprivateFlag,mrecommend,mtype,muserTotal,mstatus,mliveFlag,function(reqs){
	    		console.log(reqs);
	    		if(reqs.code==1){
	    			location.reload();
	    		}else{
	    			alert("错误信息"+reqs.msg);
	    		}
	    	})
	    });
	    $('.bianji-cel').on('click',function(){
	    	$('.setup-binaji').css('display','none');
	    	$('.setup-mainlist').css('display','block');

	    });
	    	
	    	
		
		//查看更多成员功能
		var oStringUsers ='';
		var pageNum2;
		var pagerBox2 = document.getElementById('pager2');
		var listName;
	    $(document).on('click','.index-more',function(){
			listName = $(this).parent().parent().find('.bianji-name').val();
	    	$('.setup-binaji').css('display','none');
	    	$('.setup-detail').css('display','none');
	    	$('.search-allusers').css('display','block');
	    	
	    	communityId = $(this).parent().find('.mana-user').attr('communityid');
	    	if(communityId == undefined){
		    	communityId = $(this).parent().find('.mana-user').attr('communityid');	
	    	}
	    	
	    	
	    	var phone;
	    	var name;
	    	var pageNum = 0;
	    	var pageSize = 50;
	    	console.log(communityId);
		    queryMember(communityId,phone,name,pageNum,pageSize,function(reqs){
		    	console.log(reqs);
	    		pageNum2 = reqs.content.totalPages;
		    	if(reqs.code==1){
		    		var userslength = reqs.content.list;
		    		for(var i=0;i<userslength.length;i++){
		    			if(userslength[i].name == null){
							userslength[i].name ="未定义";
						}
						if(userslength[i].avatar == null){
							userslength[i].avatar ="assets/images/gallery/image-1.jpg";
						}
			    		oStringUsers += `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${userslength[i].id}" communityid="${communityId}">
											<img src="${userslength[i].avatar}"/>	
											<span>${userslength[i].name}</span>
											<div class="fluid">禁言中</div>
										</div>`;
		    		}
		    		$('.search-allusers .setup-detail-name').html(listName);
		    		$('.search-allusers .index-img').append(oStringUsers);
		    		
		    	}
		    	else{
					alert("错误信息"+reqs.msg);
				}
				function doChangePage2(){
				   //this.__index
				 console.log(pageNum2);
				 	oStringUsers = '';
					queryMember(communityId,phone,name,(this.__index)-1,pageSize,function(reqs){
						console.log(reqs);
						if(reqs.code==1&&reqs.content.list){
				    		var userslength = reqs.content.list;
				    		for(var i=0;i<userslength.length;i++){
					    		if(userslength[i].name == null){
									userslength[i].name ="未定义";
								}
								if(userslength[i].avatar == null){
									userslength[i].avatar ="assets/images/gallery/image-1.jpg";
								}
					    		oStringUsers += `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${userslength[i].id}"  communityid="${communityId}">
													<img src="${userslength[i].avatar}"/>	
													<span>${userslength[i].name}</span>
													<div class="fluid">禁言中</div>
												</div>`;
				    		}
				    		$('.search-allusers .index-img').html("");
				    		$('.search-allusers .index-img').append(oStringUsers);
				    	}
					}) 
				}
				var pager2 = new Pager({
				  index: 1,
				  total: pageNum2,
				  parent: pagerBox2,
				  onchange: doChangePage2
				});
		
		    });	    
	    });
	    //查看更多社群文件功能
		var oStringFiles ='';
		var pageNum3;
		var pagerBox3 = document.getElementById('pager3');
		
	    $(document).on('click','.index-more-file',function(){
			
	    	$('.setup-binaji').css('display','none');
	    	$('.setup-detail').css('display','none');
	    	$('.search-allfiles').css('display','block');
	    	
	    	communityId = $(this).parent().find('.setup-files').attr('communityid');
	    	if(communityId == undefined){
		    	communityId = $(this).parent().find('.setup-files').attr('communityid');	
	    	}
	    	console.log(communityId);
	    	queryFiles(communityId,fileName,filetype,0,50,function(reqs){
	    		pageNum3 = reqs.content.totalPages;
				console.log(reqs);
				if(reqs.code==1 && reqs.content.list.length>0){
					$('.setup-detail-files').empty();
					setfile = '';
 					for(var i=0;i<reqs.content.list.length;i++){
 						if(reqs.content.list[i].name == null){
 							reqs.content.list[i].name ="未定义";
 						}
 						if(reqs.content.list[i].url == null){
 							reqs.content.list[i].url ="assets/images/gallery/image-1.jpg";
 						}
    					setfile += `<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="${reqs.content.list[i].id}"  communityid="${communityId}">
    									<a href="${reqs.content.list[i].url}" target="_blank">
										<img src="${reqs.content.list[i].url}"/>
										</a>
										<span>${reqs.content.list[i].name}</span>
									</div>`;
									
 					}
 					$('.setup-detail-files').append(setfile);							
				}else{
					alert("错误信息"+reqs.msg);
				};
				function doChangePage3(){
				   //this.__index
				 console.log(pageNum3);
				 	oStringFiles = '';
					queryFiles(communityId,fileName,filetype,(this.__index)-1,50,function(reqs){
						console.log(reqs);
						if(reqs.code==1 && reqs.content.list.length>0){
							$('.setup-detail-files').empty();
							setfile = '';
		 					for(var i=0;i<reqs.content.list.length;i++){
		 						if(reqs.content.list[i].name == null){
		 							reqs.content.list[i].name ="未定义";
		 						}
		 						if(reqs.content.list[i].url == null){
		 							reqs.content.list[i].url ="assets/images/gallery/image-1.jpg";
		 						}
		    					setfile += `<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="${reqs.content.list[i].id}"  communityid="${communityId}">
		    									<a href="${reqs.content.list[i].url}" target="_blank">
												<img src="${reqs.content.list[i].url}"/>
												</a>
												<span>${reqs.content.list[i].name}</span>
											</div>`;
											
		 					}
		 					$('.setup-detail-files').append(setfile);							
						}else{
							alert("错误信息"+reqs.msg);
						};
					}) 
				}
				var pager3 = new Pager({
				  index: 1,
				  total: pageNum3,
				  parent: pagerBox3,
				  onchange: doChangePage3
				});
			});   
	    });
	    
	    //查看社群更多文件时取消键
	    $(document).on('click','.setup-cel-files',function(){
	    	$('.search-allfiles').css('display','none');
	    	$('.setup-binaji').css('display','block');

	    });
	    
	    //搜索单个成员功能
	    $(document).on('click','.search-search',function(){
	    	phone = $('input[name="search-mobile"]').val();
	    	name = $('input[name="search-name"]').val();
	    	queryMember(communityId,phone,name,0,1,function(reqs){
	    		console.log(reqs);
	    		if(reqs.code==1){
	    			$('.search-allusers .index-img').html("");
	    			oStringUsers = '';
	    			var userslength = reqs.content.list;
		    		for(var i=0;i<userslength.length;i++){
		    			if(userslength[i].name == null){
							userslength[i].name ="未定义";
						}
						if(userslength[i].avatar == null){
							userslength[i].avatar ="assets/images/gallery/image-1.jpg";
						}
			    		oStringUsers += `<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="${userslength[i].id}" communityid="${communityId}">
											<img src="${userslength[i].avatar}"/>	
											<span>${userslength[i].name}</span>
											<div class="fluid">禁言中</div>
										</div>`;
		    		}
		    		$('.search-allusers .index-img').append(oStringUsers);
	    		}else{
	    			alert("错误信息"+reqs.msg);
	    		}
	    	})
	    });
	    //搜索单个社群文件
	    $(document).on('click','.search-files',function(){
	    	fileName = $('input[name="search-files"]').val();
	    	queryFiles(communityId,fileName,filetype,0,50,function(reqs){
				console.log(reqs);
				if(reqs.code==1 && reqs.content.list.length>0){
					$('.setup-detail-files').empty();
					setfile = '';
 					for(var i=0;i<reqs.content.list.length;i++){
 						if(reqs.content.list[i].name == null){
 							reqs.content.list[i].name ="未定义";
 						}
 						if(reqs.content.list[i].url == null){
 							reqs.content.list[i].url ="assets/images/gallery/image-1.jpg";
 						}
    					setfile += `<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="${reqs.content.list[i].id}"  communityid="${communityId}">
    									<a href="${reqs.content.list[i].url}" target="_blank">
										<img src="${reqs.content.list[i].url}"/>
										</a>
										<span>${reqs.content.list[i].name}</span>
									</div>`;
 					}
 					$('.setup-detail-files').append(setfile);							
				}else{
					alert("错误信息"+reqs.msg);
				};
			})
	    });
	    
	    
	    //禁言等功能
	    var userId,communityId,_this;
		$('.index-img ').on('contextmenu','.mana-user',function(e){
			console.log($(this));
	    	e.preventDefault();
			var e = event || window.event;
			//var _this = $(this);
			_this = $(e.target).parent();

 			userId = _this.attr('usersid');
			//console.log(userId);
 			
			communityId = _this.attr('communityid');
	
			$('.img-mana').css({"left":e.clientX+'px',"top":e.clientY+'px'});
			$('.img-mana').show();
			
			console.log(userId + ','+communityId);
			return false;
		});
		//成员禁言
		$('.img-mana').on('click','.gag',function(){
			var muteDuration = 1000;
			Gag(userId,communityId,muteDuration,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("此用户禁言成功");
					_this.find('.fluid').css('display','block');
				}
			});
		});
		//成员删除
		$('.img-mana').on('click','.delete',function(){
			console.log(userId + ','+communityId);
			delMember(userId,communityId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("此用户已删除");
					_this.remove();
				}
			});
		});
		//成员解禁言
		$('.img-mana').on('click','.ungag',function(){
			unbindGag(userId,communityId,function(reqs){
		        console.log(userId + ','+communityId);
				console.log(reqs);
				if(reqs.code==1){
					alert("此用户解除禁言成功");
					_this.find('.fluid').css('display','none');
				}else{
					alert("错误信息"+reqs.msg);
				}
			});
		});
		window.onclick=function(e){
			$('.img-mana').css({'display':'none'});
		};
		
	    
		
	})
})(jQuery)
