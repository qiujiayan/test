(function($){
	$(function(){

		var pagerBox = document.getElementById('pager');
		var oHead = `<tr>
						<td>ID</td>
						<td>时间</td>
						<td>类别</td>
						<td>举报人</td>
						<td>举报内容</td>
						<td>被举报人</td>
						<td>状态</td>
						<td>操作</td>
					</tr>`;
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize=10,status;
		var isStatus,isWho,isDes,iscontact,isBtn;
		var dealId,imgId,dealDesc;
		var totalImg='',imgHead=`<span class="index-name">图片：</span>`;
		
		var targetType;
		
		getAllInform(status,0,pageSize,function(reqs){
			//console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;	
			$('.index-total').html("共有数据:"+numTotal+"条");
		});
		
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		   	getAllInform(status,(this.__index)-1,pageSize,function(reqs){
				//console.log(reqs);
				if(reqs.code==1){	
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
								case 0:
								  isStatus="未处理";
								  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id}>处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
								case 1:
								  isStatus="已经处理";
								  isBtn = `<span dataid = ${tableLength[i].id} class="haveDeal">已处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
								case null:
								  isStatus="未处理";
								  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id}>处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
							}
						switch (tableLength[i].targetType)
							{
								case 1:
								  targetType="用户";
								  break;
								case 2:
								  targetType="社群";
								  break;
								case 3:
								  targetType="动态";
								  break;
								case 4:
								  targetType="评论";
								  break;
								case 5:
								  targetType="群视频";
								  break;
							}
						oTableTr += `<tr userid=${tableLength[i].userId} targetId=${tableLength[i].targetId} informUserid=${tableLength[i].informUser.id}>
										<td>${tableLength[i].id}</td>
										<td>${formatDate(new Date(tableLength[i].createTime))}</td>
										<td>${targetType}</td>
										<td>${tableLength[i].user.name}</td>
										<td>${tableLength[i].content}</td>
										<td>${tableLength[i].informUser.name}</td>
										<td>${isStatus}</td>
										<td>${isBtn}</td>
									</tr>`;
					}
					$('.index-table').html("");
					$('.index-table').append(oHead + oTableTr);
			
		   		}else{
		   			alert("举报信息"+reqs.msg);
		   		};

			});
		};
		
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
		
		//搜索已经处理或者未处理的
		$(document).on('click','.user-search',function(){
			status = $("select[name='feedbackStatus']").val();
			$('.pager-box').remove();
			getAllInform(status,pageNum,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					pageNum = reqs.content.totalPages;
					numTotal = reqs.content.totalElements;	
					$('.index-total').html("共有数据:"+numTotal+"条");
					oTableTr = '';
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
								case 0:
								  isStatus="未处理";
								  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id}>处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
								case 1:
								  isStatus="已经处理";
								  isBtn = `<span dataid = ${tableLength[i].id} class="haveDeal">已处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
								case null:
								  isStatus="未处理";
								  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id}>处理</span>
								  <span class="query-detail" dataid = ${tableLength[i].id} datatype = ${tableLength[i].targetType}>详情</span>`;
								  break;
							}
						switch (tableLength[i].targetType)
							{
								case 1:
								  targetType="用户";
								  break;
								case 2:
								  targetType="社群";
								  break;
								case 3:
								  targetType="动态";
								  break;
								case 4:
								  targetType="评论";
								  break;
								case 5:
								  targetType="群视频";
								  break;
							}
						oTableTr += `<tr userid=${tableLength[i].userId} targetId=${tableLength[i].targetId} informUserid=${tableLength[i].informUser.id}>
										<td>${tableLength[i].id}</td>
										<td>${formatDate(new Date(tableLength[i].createTime))}</td>
										<td>${targetType}</td>
										<td>${tableLength[i].user.name}</td>
										<td>${tableLength[i].content}</td>
										<td>${tableLength[i].informUser.name}</td>
										<td>${isStatus}</td>
										<td>${isBtn}</td>
									</tr>`;
					}
					$('.index-table').html("");
					$('.index-table').append(oHead + oTableTr);
					var pager = new Pager({
					  index: 1,
					  total: pageNum,
					  parent: pagerBox,
					  onchange: doChangePage
					});
								
				}else{
					alert("举报信息"+reqs.msg);
				}
			});
		})

		
		$(document).on('click','.index-editor',function(){
			$('.nothrough-wrap').show();
			var _this=$(this);
			dealId = $(this).attr("dataid");
		})

		$(document).on('click','.nothrough-cancel',function(){
			$('.nothrough-wrap').hide();
		});
		$(document).on('click','.nothrough-confirm',function(){
			var id = dealId;
			console.log(id);
			dealInform(id,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("发送提醒成功");
					location.reload();
				}else{
					alert("处理举报错误信息"+reqs.msg);
				}
			})
		});
		$(document).on('click','.dewrap-cancel',function(){
			$('.dewrap').hide();
		});
		$(document).on('click','.query-detail',function(){
			var id = $(this).attr("dataid");
			var datatype = $(this).attr("datatype");
			var oAll;
			getOneDetailById(id,function(reqs){
				//console.log(reqs);
				if(reqs.code==1){
					oAll = reqs.content;
				}else{
					alert("查看举报详情"+reqs.msg);
				}
			});
			console.log(oAll);
			console.log(datatype);
			$('.dewrap').show();
			switch (datatype)
			{
				case "1":
				  //targetType="用户";
				  $('.dewrap .dewrap-detail').html("用户名: "+oAll.user.name);
				  $('.dewrap img').attr("src",oAll.user.avatar);
				  break;
				case "2":
				  //targetType="社群";
				  $('.dewrap .dewrap-detail').html("社群名: "+oAll.user.name);
				  $('.dewrap img').attr("src",oAll.user.picture);
				  break;
				case "3":
				  //targetType="动态";
				  $('.dewrap .dewrap-detail').html("动态内容: "+oAll.userDynamic.content);
				  $('.dewrap img').attr("src",oAll.userDynamic.pictureOne);
				  break;
				case "4":
				  //targetType="评论";
				  $('.dewrap .dewrap-detail').html("评论内容: "+oAll.userDynamicComment.content);
				  $('.dewrap img').hide();
				  break;
				case "5":
				  //targetType="群视频";
				  $('.dewrap .dewrap-detail').html("视频名: "+oAll.communityLive.liveName);
				  $('.dewrap img').hide();
				  break;
			}
			
		})
		

		
	})
})(jQuery)
