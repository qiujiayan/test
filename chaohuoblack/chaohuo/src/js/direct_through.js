(function($){
	$(function(){
//		var pageNum,numTotal,pageSize=10,oTableTr;
//		var page;
//		var phone,status,applyStatus;
//		var isApplyStatus,isStatus,editorStatus;
//		var userLicenseId,rejectMsg;
//		
		
		
		var pageNum=0,isStatus,editorStatus,page,oTableTr,pageNumT=0,userLicenseId;
		var pagerBox = document.getElementById('pager'); 
		var commonToken = $.cookie("tokenid");
		//用户表格头部
		var oTableString = `<tr>
								<td>用户ID</td>
								<td>姓名</td>
								<td>身份证号</td>
								<td>企业名称</td>
								<td>状态</td>
								<td>操作</td>
							</tr>`;
		
		getCommunityLiveInfos(commonToken,pageNum,function(reqs){
			console.log(reqs);
			if(reqs.code==1){
				pageNumT = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
			}else{
				alert("错误信息"+reqs.msg);
			}
		})
		
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		    
		   	getCommunityLiveInfos(commonToken,(this.__index)-1,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					pageNumT = reqs.content.totalPages;
   					numTotal = reqs.content.totalElements;
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						switch (tableLength[i].status)
							{
							case 1:
							  isStatus="申请中";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} cardFront= ${tableLength[i].cardFront} cardContrary= ${tableLength[i].cardContrary} cardHand= ${tableLength[i].cardHand} businessLicenseFront= ${tableLength[i].businessLicenseFront} comNum= ${tableLength[i].businessLicenseNum}>审核</span>`;
							  break;
							case 2:
							  isStatus="通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} cardFront= ${tableLength[i].cardFront} cardContrary= ${tableLength[i].cardContrary} cardHand= ${tableLength[i].cardHand} businessLicenseFront= ${tableLength[i].businessLicenseFront} comNum= ${tableLength[i].businessLicenseNum}>详情</span>`;
							  break;
							case 3:
							  isStatus="未通过";
							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} cardFront= ${tableLength[i].cardFront} cardContrary= ${tableLength[i].cardContrary} cardHand= ${tableLength[i].cardHand} businessLicenseFront= ${tableLength[i].businessLicenseFront} comNum= ${tableLength[i].businessLicenseNum}>审核</span>`;
							  break;
							};
						if(tableLength[i].businessName==null){
							tableLength[i].businessName="";
						}

						oTableTr += `<tr>
									<td>${tableLength[i].id}</td>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].cardNum}</td>
									<td>${tableLength[i].businessName}</td>
									<td is-status = ${tableLength[i].status}>${isStatus}</td>
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
		  total: pageNumT,
		  parent: pagerBox,
		  onchange: doChangePage
		});
		
		$(document).on('click','.index-editor',function(){
			var _this=$(this);
			userLicenseId = _this.attr("throughid");
			
			console.log(_this.parent().prev().attr("is-status"));
			var numnum = Number(_this.parent().prev().attr("is-status"));
			var componeyNum;

			$('.main-content-inner').load('src/html/direct_detail.html .through-detail',function(){
				console.log(_this.attr("comNum"));
				if(_this.attr("comNum")==null){
					componeyNum="";
				}
				$('.real-name .through-span').html(_this.parent().prev().prev().prev().prev().html());
				$('.id-card .through-span').html(_this.parent().prev().prev().prev().html());
				$('.card-front img').attr("src",_this.attr("cardFront"));
				$('.card-contrary img').attr("src",_this.attr("cardContrary"));
				$('.card-hand img').attr("src",_this.attr("cardHand"));
				$('.company-name .through-span').html(_this.parent().prev().prev().html());
				$('.company-no .through-span').html(componeyNum);
				$('.company-front img').attr("src",_this.attr("businessLicenseFront"));
				switch (numnum)
					{
					case 1:
					  $('.index-btn-con').css('display','block');
					  $('.index-btn-not').css('display','block');
					  break;
					case 2:
					  $('.index-btn-con').css('display','none');
					  $('.index-btn-not').css('display','none');
					  $('.index-btn-cel').css('marginLeft','40%');
					  break;
					case 3:
					 $('.index-btn-con').css('display','block');
					  $('.index-btn-not').css('display','block');
					  break;
					};
				$(document).on('click','.index-btn-con',function(){
					$('.through-wrap').css('display','block');
				});
				$(document).on('click','.through-cancel',function(){
					$('.through-wrap').css('display','none');
				});
				$(document).on('click','.through-confirm',function(){
					console.log(userLicenseId);
					auditCommunityLive(commonToken,userLicenseId,2,function(reqs){
						console.log(reqs);
						if(reqs.code==1){
							alert("审核通过");
							$('.through-wrap').css('display','none');
							location.reload();
						}else{
							alert("错误信息"+reqs.msg);
						}	
					})
				});
				$(document).on('click','.index-btn-not',function(){
					$('.nothrough-wrap').css('display','block');
				});
				$(document).on('click','.nothrough-cancel',function(){
					$('.nothrough-wrap').css('display','none');
				});
				$(document).on('click','.index-btn-cel',function(){
					location.reload();
				});
				$(document).on('click','.index-btn-con',function(){
					$('.through-wrap').css('display','block');
				});
				$(document).on('click','.nothrough-confirm',function(){
					console.log(userLicenseId);
					auditCommunityLive(commonToken,userLicenseId,3,function(reqs){
						console.log(reqs);
						if(reqs.code==1){
							alert("请求成功,审核不予通过");
							$('.through-wrap').css('display','none');
							location.reload();
						}else{
							alert("错误信息"+reqs.msg);
						}	
					})
				});
				
			})
		});
		
//		
//		$(document).on('click','.user-search',function(){
//			$('.index-table').find('tbody').html("");
//	    	$('.pager-box').remove();
//			phone = $('input[name="userSearch"]').val();
//			console.log(phone);
//			queryThroughList(phone,status,applyStatus,0,pageSize,function(reqs){
//				console.log(reqs);
//				if(reqs.code==1){
//					oTableTr = '';
//					pageNum = reqs.content.totalPages;
// 					numTotal = reqs.content.totalElements;
//					var tableLength = reqs.content.list;
//					for(var i = 0;i < tableLength.length;i++){
//						switch (tableLength[i].status)
//							{
//							case 1:
//							  isStatus="申请中";
//							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
//							  break;
//							case 2:
//							  isStatus="通过";
//							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>详情</span>`;
//							  break;
//							case 3:
//							  isStatus="未通过";
//							  editorStatus = `<span class="index-editor" throughid = ${tableLength[i].id} dataid= ${tableLength[i].userId}>审核</span>`;
//							  break;
//							};
//						switch (tableLength[i].applyStatus)
//							{
//							case 1:
//							  isApplyStatus="企业";
//							  break;
//							case 2:
//							  isApplyStatus="个人";
//							  break;
//							};
//						oTableTr += `<tr>
//									<td>${tableLength[i].name}</td>
//									<td>${tableLength[i].cardNum}</td>
//									<td>${isApplyStatus}</td>
//									<td>${isStatus}</td>
//									<td>${editorStatus}</td>
//								</tr>`; 
//					}
//					$('.index-table').html("");
//					$('.index-table').append(oTableString + oTableTr);
//					$('.index-total').html("共有数据:"+numTotal+"条");
//					var pager = new Pager({
//					  index: 1,
//					  total: pageNum,
//					  parent: pagerBox,
//					  onchange: doChangePage
//					});
//			
//		   		}else{
//		   			alert("错误信息"+reqs.msg);
//		   		};
//			});
//			
//		});
		

		
	})
})(jQuery)
