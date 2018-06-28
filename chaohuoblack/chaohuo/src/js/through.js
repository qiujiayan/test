(function($){
	$(function(){
		var pageNum,numTotal,pageSize=10,oTableTr;
		var page;
		var phone,status,applyStatus;
		var isApplyStatus,isStatus,editorStatus;
		var userLicenseId,rejectMsg;
		var pagerBox = document.getElementById('pager'); 
		//用户表格头部
		var oTableString = `<tr>
								<td>姓名</td>
								<td>身份证号</td>
								<td>类型</td>
								<td>状态</td>
								<td>操作</td>
							</tr>`;
		
		
		queryThroughList(phone,status,applyStatus,pageNum,pageSize,function(reqs){
			console.log(reqs);
			if(reqs.code==1){
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		    
		   	queryThroughList(phone,status,applyStatus,(this.__index)-1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					pageNum = reqs.content.totalPages;
   					numTotal = reqs.content.totalElements;
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 1:
							  isStatus="申请中";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
							  break;
							case 2:
							  isStatus="通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>详情</span>`;
							  break;
							case 3:
							  isStatus="未通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
							  break;
							};
						switch (tableLength[i].applyStatus)
							{
							case 1:
							  isApplyStatus="企业";
							  break;
							case 2:
							  isApplyStatus="个人";
							  break;
							};
						oTableTr += `<tr>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].cardNum}</td>
									<td>${isApplyStatus}</td>
									<td>${isStatus}</td>
									<td>${editorStatus}</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
					$('.index-total').html("共有数据:"+numTotal+"条");
			
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
		
		$(document).on('click','.index-editor',function(){
			userLicenseId = $(this).attr("throughid");
			$('.main-content-inner').load('src/html/through_detail.html .through-detail',function(){
				queryThroughPerson(userLicenseId,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
						switch (reqs.content.status)
							{
							case 1:
							  isStatus="申请中";
							  break;
							case 2:
							  isStatus="通过";
							  $('.index-btn-con').css('display','none');
							  $('.index-btn-not').css('display','none');
							  $('.index-btn-cel').css('marginLeft','40%');
							  break;
							case 3:
							  isStatus="未通过";
							  break;
							};
						if(reqs.content.applyStatus==1){
						    isApplyStatus="企业";
							$('.real-name .through-span').html(reqs.content.name);
							$('.through-name .through-span').html(isApplyStatus);
							$('.through-time .through-span').html(formatDate(new Date(reqs.content.createTime)));
							$('.id-card .through-span').html(reqs.content.cardNum);
							$('.card-front img').attr("src",reqs.content.cardFront);
							$('.card-contrary img').attr("src",reqs.content.cardContrary);
							$('.card-hand img').attr("src",reqs.content.cardHand);
							$('.company-name .through-span').html(reqs.content.businessName);
							$('.company-no .through-span').html(reqs.content.businessLicenseNum);
							$('.company-front img').attr("src",reqs.content.businessLicenseFront);	
							
						}else if(reqs.content.applyStatus!=1){
						    isApplyStatus="个人";
						    $('.real-name .through-span').html(reqs.content.name);
						    $('.through-name .through-span').html(isApplyStatus);
						    $('.through-time .through-span').html(formatDate(new Date(reqs.content.createTime)));
							$('.id-card .through-span').html(reqs.content.cardNum);
							$('.card-front img').attr("src",reqs.content.cardFront);
							$('.card-contrary img').attr("src",reqs.content.cardContrary);
							$('.card-hand img').attr("src",reqs.content.cardHand);
							$('.company-name').css('display','none');
							$('.company-no').css('display','none');
							$('.company-front').css('display','none');
						}


					}else{
						alert("错误信息"+reqs.msg);
					}
				});
				$(document).on('click','.index-btn-con',function(){
					$('.through-wrap').css('display','block');
				});
				$(document).on('click','.through-cancel',function(){
					$('.through-wrap').css('display','none');
				});
				$(document).on('click','.through-confirm',function(){
					console.log(userLicenseId);
					throughResult(rejectMsg,userLicenseId,2,function(reqs){
						console.log(reqs);
						if(reqs.code==1){
							alert("审核通过");
							$('.through-wrap').css('display','none');
							location.reload();
						}else{
							alert("错误信息"+reqs.msg);
						}
					});
				});
				$(document).on('click','.index-btn-not',function(){
					$('.nothrough-wrap').css('display','block');
				});
				$(document).on('click','.nothrough-cancel',function(){
					$('.nothrough-wrap').css('display','none');
				});
				$(document).on('click','.nothrough-confirm',function(){
					rejectMsg = $('.nothrough-wrap').find('textarea').val();
					console.log(rejectMsg);
					throughResult(rejectMsg,userLicenseId,3,function(reqs){
						console.log(reqs);
						if(reqs.code==1){
							alert("请求成功,审核不予通过");
							$('.through-wrap').css('display','none');
							location.reload();
						}else{
							alert("错误信息"+reqs.msg);
						}
					});
				});
				
				
				$(document).on('click','.index-btn-cel',function(){
					location.reload();
				});
				$(document).on('click','.through-detail img',function(){
					var resourceUrl = $(this).attr("src");
					$('.card-img').show();
					$('.card-img img').attr("src",resourceUrl);
				});
				$(document).on('click','.card-img .closebtn',function(){
					$('.card-img').hide();
				});
					
				
			})
		});
		
		
		$(document).on('click','.user-search',function(){
			$('.index-table').find('tbody').html("");
	    	$('.pager-box').remove();
			phone = $('input[name="userSearch"]').val();
			console.log(phone);
			queryThroughList(phone,status,applyStatus,0,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					oTableTr = '';
					pageNum = reqs.content.totalPages;
   					numTotal = reqs.content.totalElements;
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 1:
							  isStatus="申请中";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
							  break;
							case 2:
							  isStatus="通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>详情</span>`;
							  break;
							case 3:
							  isStatus="未通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
							  break;
							};
						switch (tableLength[i].applyStatus)
							{
							case 1:
							  isApplyStatus="企业";
							  break;
							case 2:
							  isApplyStatus="个人";
							  break;
							};
						oTableTr += `<tr>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].cardNum}</td>
									<td>${isApplyStatus}</td>
									<td>${isStatus}</td>
									<td>${editorStatus}</td>
								</tr>`; 
					}
					$('.index-table').html("");
					$('.index-table').append(oTableString + oTableTr);
					$('.index-total').html("共有数据:"+numTotal+"条");
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
			
		});

		
	})
})(jQuery)
