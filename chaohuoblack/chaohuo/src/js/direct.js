(function($){
	$(function(){
/*		$('.user-table-del').on('click',function(){
			var _this = $(this);
			$('.delete-wrap').show();
			$('.delete-confirm').click(function(){
				_this.parent().parent().remove();	
				$('.delete-wrap').hide();
			});
			$('.delete-cancel').click(function(){
				$('.delete-wrap').hide();
			});
		});*/
		var searchWord,pageNum,pageSize=10,oTableTr,paper,isStatus,numTotal;
		var communityLiveId;
		var oString='';
		var pagerBox = document.getElementById('pager'); 
		//用户表格头部
		var oTableString = `<tr>
								<td>社群ID</td>
								<td>直播ID</td>
								<td>社群账号</td>
								<td>主播</td>
								<td>房间人数</td>
								<td>社群类别</td>
								<td>分享人数</td>
								<td>操作</td>
							</tr>`;

		queryAllLives(searchWord,0,pageSize,function(reqs){
			console.log(reqs);
			if(reqs.code==1){
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		$('.direct-index .index-total').html("共有数据:"+numTotal+"条");
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		   	queryAllLives(searchWord,(this.__index)-1,pageSize,function(reqs){
				if(reqs.code==1){	
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
//						switch (tableLength[i].status)
//							{
//							case 1:
//							  isStatus="直播中";
//							  break;
//							case 2:
//							  isStatus="直播暂停";
//							  break;
//							case 3:
//							  isStatus="直播结束";
//							  break;
//							case 0:
//							  isStatus="直播删除";
//							  break;
//							};
						//status     '状态  1,直播中  3,直播结束   2,直播暂停  0,直播删除',
						//console.log(tableLength[i]);
						oTableTr += `<tr>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].communityLiveId}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].userName}</td>
									<td>${tableLength[i].userTotal}</td>
									<td>${tableLength[i].categoryName}</td>
									<td>${tableLength[i].shareNum}</td>
									<td>
										<span class="index-query" dataid = ${tableLength[i].communityLiveId}>查看</span>
									</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
			
		   		}else{
		   			alert("错误信息"+reqs.msg);
		   		};
			});
		};
		
		
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
		
		$(document).on('click','.direct-search',function(){
			oTableTr = '';
			searchWord = $('.direct-input').val();
		   	queryAllLives(searchWord,0,pageSize,function(reqs){
				if(reqs.code==1){	
					pageNum = reqs.content.totalPages;
					numTotal = reqs.content.totalElements;
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
//						switch (tableLength[i].status)
//							{
//							case 1:
//							  isStatus="直播中";
//							  break;
//							case 2:
//							  isStatus="直播暂停";
//							  break;
//							case 3:
//							  isStatus="直播结束";
//							  break;
//							case 0:
//							  isStatus="直播删除";
//							  break;
//							};

						oTableTr += `<tr>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].communityLiveId}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].userName}</td>
									<td>${tableLength[i].userTotal}</td>
									<td>${tableLength[i].categoryName}</td>
									<td>${tableLength[i].shareNum}</td>
									<td>
										<span class="index-query" dataid = ${tableLength[i].communityLiveId}>查看</span>
									</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
					$('.direct-index .index-total').html("共有数据:"+numTotal+"条");
					var pager = new Pager({
					  index: 1,
					  total: pageNum,
					  parent: pagerBox,
					  onchange: doChangePage
					});
		   		}else{
		   			alert("错误信息"+reqs.msg);
		   		};
			});
		})
		
//		$(document).on('click','.index-editor',function(){
//			$('.main-content-inner').load('src/html/liveseditor.html .direct-edi',function(){
//				
//			})
//		});
		$(document).on('click','.index-query',function(){
			communityLiveId = $(this).attr("dataid");
			console.log(communityLiveId);
			$('.main-content-inner').load('src/html/livesedetail.html .direct-detail',function(){
				queryOneLives(communityLiveId,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
						oString = '';
						switch (reqs.content.status)
							{
							case 1:
							  isStatus="直播中";
							  break;
							case 2:
							  isStatus="直播暂停";
							  break;
							case 3:
							  isStatus="直播结束";
							  break;
							case 0:
							  isStatus="直播删除";
							  break;
							};
						$('.lives-name').html(reqs.content.liveName);
						$('.lives-status').html(isStatus);
						$('.lives-comname').html(reqs.content.communityName);
						$('.lives-logo').attr("src",reqs.content.liveCoverUrl);
						$('.lives-username').html(reqs.content.userName);
						$('.lives-comid').html(reqs.content.communityId);
						$('.lives-id').html(reqs.content.id);
						$('.lives-follow').html(reqs.content.followNum);
						$('.lives-share').html(reqs.content.shareNum);
						$('.lives-address').html(reqs.content.hlsPlayUrl);
						if(reqs.content.videos.length>0){
							for(var i=0;i<reqs.content.videos.length;i++){
								oString += `<img src="${reqs.content.videos[i].liveCoverUrl}" liveid="${reqs.content.videos[i].communityLiveId}" class="videoimg" videourl="${reqs.content.videos[i].videoUrl}"/>`;
							}	
							$('.index-img').append(oString);
						};
						$(document).on('click','.videoimg',function(){
							location.href = $(this).attr("videourl");
						})
						
					}else{
						alert("错误信息"+reqs.msg);
					}
				});
				$(document).on('click','.lives-cancel',function(){
					location.reload();
				});
			})
		});
		
		
	})
})(jQuery)
