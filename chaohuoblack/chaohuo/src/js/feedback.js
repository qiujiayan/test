(function($){
	$(function(){
//		getAllFeedBack(status,pageNum,pageSize,function(reqs){
//		})
		var pagerBox = document.getElementById('pager');
		var oHead = `<tr>
						<td>用户ID</td>
						<td>联系方式</td>
						<td>创建时间</td>
						<td>用户反馈</td>
						<td>状态</td>
						<td>处理人</td>
						<td>处理时间</td>
						<td>处理意见</td>
						<td>操作</td>
					</tr>`;
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize=10,status;
		var isStatus,isWho,isDes,iscontact,isBtn;
		var dealId,imgId,dealDesc;
		var totalImg='',imgHead=`<span class="index-name">图片：</span>`;
		
		
		getAllFeedBack(status,1,pageSize,function(reqs){
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;	
			$('.index-total').html("共有数据:"+numTotal+"条");
		});
		
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		   	getAllFeedBack(status,(this.__index)-1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 0:
							  isStatus="未处理";
							  break;
							case 1:
							  isStatus="已经处理";
							  break;
							case null:
							  isStatus="未处理";
							  break;
							}
						switch (tableLength[i].dealUserId)
							{
							case null:
							  isWho="";
							  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id} imgid= ${tableLength[i].imgs}>处理</span>`;
							  break;
							default:
							  isWho = tableLength[i].dealUserId;
							  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id} imgid= ${tableLength[i].imgs}>已处理</span>`;
							  break;
							}
						switch (tableLength[i].dealDesc)
							{
							case null:
							  isDes="";
							  break;
							default:
							  isDes = tableLength[i].dealDesc;
							  break;
							}
						switch (tableLength[i].contact)
							{
							case null:
							  iscontact="";
							  break;
							default:
							  iscontact = tableLength[i].contact;
							  break;
							}
						oTableTr += `<tr dataid="${tableLength[i].id}">
										<td>${tableLength[i].userId}</td>
										<td class="userPhone">${iscontact}</td>
										<td class="userTime">${formatDate(new Date(tableLength[i].createTime))}</td>
										<td class="userDes">${tableLength[i].des}</td>
										<td class="userStatus">${isStatus}</td>
										<td class="dealUser">${isWho}</td>
										<td class="dealTime">${formatDate(new Date(tableLength[i].dealTime))}</td>
										<td class="dealDes">${isDes}</td>
										<td>${isBtn}</td>
									</tr>`;
					}
					$('.index-table').html("");
					$('.index-table').append(oHead + oTableTr);
			
		   		}else{
		   			alert("反馈信息"+reqs.msg);
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
			getAllFeedBack(status,1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					console.log(1);
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
							  break;
							case 1:
							  isStatus="已经处理";
							  break;
							case null:
							  isStatus="未处理";
							  break;
							}
						switch (tableLength[i].dealUserId)
							{
							case null:
							  isWho="";
							  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id} imgid= ${tableLength[i].imgs}>待处理</span>`;
							  break;
							default:
							  isWho = tableLength[i].dealUserId;
							  isBtn = `<span class="index-editor" dataid = ${tableLength[i].id} imgid= ${tableLength[i].imgs}>详情</span>`;
							  break;
							}
						switch (tableLength[i].dealDesc)
							{
							case null:
							  isDes="";
							  break;
							default:
							  isDes = tableLength[i].dealDesc;
							  break;
							}
						switch (tableLength[i].contact)
							{
							case null:
							  iscontact="";
							  break;
							default:
							  iscontact = tableLength[i].contact;
							  break;
							}
						oTableTr += `<tr dataid="${tableLength[i].id}">
										<td>${tableLength[i].userId}</td>
										<td class="userPhone">${iscontact}</td>
										<td class="userTime">${formatDate(new Date(tableLength[i].createTime))}</td>
										<td class="userDes">${tableLength[i].des}</td>
										<td class="userStatus">${isStatus}</td>
										<td class="dealUser">${isWho}</td>
										<td class="dealTime">${formatDate(new Date(tableLength[i].dealTime))}</td>
										<td class="dealDes">${isDes}</td>
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
					alert("错误信息"+reqs.msg);
				}
			});
		})

		
		$(document).on('click','.index-editor',function(){
			var _this=$(this);
			dealId = $(this).attr("dataid");
			imgId = $(this).attr("imgid");
			var aaa=_this.parent().parent().find('.dealUser').html();
			$('.main-content-inner').load('src/html/feedback_detail.html .through-detail',function(){
				imgId = imgId.split(',');
				console.log(imgId);
				if(aaa!=""){
					$('.index-btn-con').css('display','none');
					$('.index-btn-cel').css('marginLeft','40%');
				}
				for(var i=0;i<imgId.length;i++){
					totalImg +=`<img src="${imgId[i]}"/>`;
				}
				$('.detail-img').append(imgHead+totalImg);
				$('.real-name .through-span').html(_this.parent().parent().find('.userPhone').html());
				$('.through-time .through-span').html(_this.parent().parent().find('.userTime').html());
				$('.through-feedback .through-span').html(_this.parent().parent().find('.userDes').html());
				$('.through-status .through-span').html(_this.parent().parent().find('.userStatus').html());
				$('.through-people .through-span').html(aaa);
				$('.through-dealtime .through-span').html(_this.parent().parent().find('.dealTime').html());
				$('.through-dealidea .through-span').html(_this.parent().parent().find('.dealDes').html());
				
				
			})
			
		})
		$(document).on('click','.index-btn-cel',function(){
			location.reload();
		});
		$(document).on('click','.index-btn-con',function(){
			$('.nothrough-wrap').show();
		});
		$(document).on('click','.nothrough-cancel',function(){
			$('.nothrough-wrap').hide();
		});
		$(document).on('click','.nothrough-confirm',function(){
			dealDesc = $('.dealIdea').val();
			id = dealId;
			dealFeedBack(id,dealDesc,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("处理成功");
					location.reload();
				}else{
					alert("处理反馈错误信息"+reqs.msg);
				}
			})
		})
		

		
	})
})(jQuery)
