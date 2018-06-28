(function($){
	$(function(){
		var oToken = $.cookie("tokenid"),isStatus;
		var oStr = '',oStr2 = '',oTableTr = '';
		var oSel = '',oSel2 = '',oIcon;
		//类别表格头部
		var oTableString = `<tr>
								<td>类别ID</td>
								<td>所有类别</td>
								<td>调整</td>
								<td>状态</td>
							</tr>`;
		queryList(oToken,function(res){
			console.log(res);
			if(res.code==1){
				oTableTr ='';
				oStr2='';
				for(var i=0;i<res.content.length;i++){
					switch (res.content[i].status)
							{
							case 1:
							  isStatus="已上线";
							  oIcon = `<i class="menu-icon fa fa-long-arrow-up"></i>
									<i class="menu-icon fa fa-long-arrow-down"></i>`;
							  break;
							case 2:
							  isStatus="下线";
							  oIcon="";
							  break;
							};
//					oStr += '<li data-id = "'+ res.content[i].id +'">'+res.content[i].name+'</li>';
 					oStr2 += '<option data-id = "'+ res.content[i].id +'">'+res.content[i].name+'</option>';
					oTableTr += `<tr>
									<td>${res.content[i].id}</td>
									<td>${res.content[i].name}</td>
									<td dataid = ${res.content[i].id}>${oIcon}</td>
									<td>${isStatus}</td>
								</tr>`; 
				}
				//$('.index-man-list').append(oStr);
 				$('.index-man-sel').append(oStr2);	
				$('.index-table').html("");
				$('.index-table').append(oTableString + oTableTr);
			}else{
				alert("错误信息"+res.msg);
			}
		});
		$('.index-lei-add').on('click',function(){
			var oListName = $('.index-text').val();
			if(oListName != ''){
				console.log(oListName);
				addList(oToken,oListName,function(res){
					console.log(res);
					if(res.code == 1){
						$('.index-text').val("");
						queryList(oToken,function(res){
							//$('.index-man-sel').html("");
							console.log(res.content);
							for(var i=0;i<res.content.length;i++){
								//oStr = '<li data-id = "'+ res.content[i].id +'">'+res.content[i].name+'</li>';
 								oStr2 += '<option data-id = "'+ res.content[i].id +'">'+res.content[i].name+'</option>';
							}
							//$('.index-man-list').append(oStr);
 							$('.index-man-sel').append(oStr2);
						});
						location.reload();
					}else{
						alert("错误信息"+res.msg);
					}
				});	
			}else{
				alert("内容不能为空");
			}
			
		});
		$('.index-lei-que').on('click',function(){
			//console.log(oToken);
			oSel = $('.index-man-sel').find('option:selected').attr('data-id');
			oSel2 = $('.index-man-zh').find('option:selected').val();//0是下线，1是上线,-1是删除
			ediList(oToken,oSel,oSel2,function(res){
				console.log(res);
				if(res.code == 1){
					alert("已下线");
					location.reload();
				}else{
						alert("错误信息"+res.msg);
					}
				
			})
		});
		 function up(obj){ 
			var objParentTR=$(obj).parent().parent(); 
	    	console.log(objParentTR);
			var prevTR=objParentTR.prev(); 
			prevTR.insertAfter(objParentTR); 
		} 
		function down(obj){ 
			var objParentTR=$(obj).parent().parent(); 
			var nextTR=objParentTR.next(); 
			nextTR.insertBefore(objParentTR); 
		}
	    
	    var type=1;
	    $(document).on('click','.fa-long-arrow-up',function(){
	    	//console.log($(this));
	    	var _this = $(this);
	    	var catetoryId = _this.parent().attr('dataid');
	    	updateCommunityCategorySort(catetoryId,1,type,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					up(_this);
				}else{
					alert("向上排序错误"+reqs.msg);
				}
	    	})
	    });
	    $(document).on('click','.fa-long-arrow-down',function(){
	    	var _this = $(this);
	    	var catetoryId = _this.parent().attr('dataid');
	    	updateCommunityCategorySort(catetoryId,0,type,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					down(_this);
				}else{
					alert("向下排序错误"+reqs.msg);
				}
	    	})	
	    });
	    $(document).on('click','.search-online',function(){
	    	
	    	queryOnlineList(oToken,function(res){
	    		console.log(res)
	    		if(res.code==1){
					oTableTr ='';
					oStr2='';
					for(var i=0;i<res.content.length;i++){
	 					oStr2 += '<option data-id = "'+ res.content[i].id +'">'+res.content[i].name+'</option>';
						oTableTr += `<tr>
										<td>${res.content[i].id}</td>
										<td>${res.content[i].name}</td>
										<td dataid = ${res.content[i].id}>
											<i class="menu-icon fa fa-long-arrow-up"></i>
											<i class="menu-icon fa fa-long-arrow-down"></i>
										</td>
										<td>上线</td>
									</tr>`; 
					}

	 				$('.index-man-sel').append(oStr2);	
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
				}else{
					alert("错误信息"+res.msg);
				}
	    	})
	    })
		
	})
})(jQuery)
