(function($){
	$(function(){
		
		var pagerBox = document.getElementById('pager');
		var pagerBox2 = document.getElementById('pager2');
		var oTableTr = '',pageNum = 0,numTotal = 0 ,pageSize = 10;
		var searchWord;
		var oTableString = `<tr>
								<td>用户ID</td>
								<td>用户名</td>
								<td>超火号</td>
								<td>电话</td>
								<td>钱包</td>
								<td>账单详情</td>
							</tr>`;
		var oTableTr2 = '',oTableString2 = `<tr>
								<td>订单ID</td>
								<td>进出账金额</td>
								<td>用途</td>
								<td>时间</td>
							</tr>`;
		var userId;
	

		function doChangePage(){
		   oTableTr = '';
		   getAllWallet(searchWord,(this.__index)-1,pageSize,function(reqs){
		   		//console.log(reqs);
		   		if(reqs.code==1){
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						if(tableLength[i].phone == null){
							tableLength[i].phone = "未知";
						}
						oTableTr +=`<tr>
									<td>${tableLength[i].userId}</td>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].phone}</td>
									<td>${tableLength[i].walletYuan}元</td>
									<td><span class="index-editor" userId="${tableLength[i].userId}">查看</span></td>
								</tr>`;
					}
	
					$('.finance-main .index-table').html("");
					$('.finance-main .index-table').append(oTableString + oTableTr);	
		   		}else{
		   			alert(reqs.msg);
		   		}

			})  
		};
		function doChangePage2(){
		   oTableTr2 = '';
		   getOneDetailWallet(userId,(this.__index)-1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var tableLength = reqs.content.walletOrderDetails.list;
					for(var i = 0;i < tableLength.length;i++){
						oTableTr2 +=`<tr>
										<td>${tableLength[i].orderId}</td>
										<td>${tableLength[i].money}元</td>
										<td>${tableLength[i].orderType}</td>
										<td>${formatDate(new Date(tableLength[i].payTime))}</td>
									</tr>`;
					}
	
					$('.finance-detail .index-table').html("");
					$('.finance-detail .index-table').append(oTableString2 + oTableTr2);	
				}else{
		   			alert(reqs.msg);
		   		}
			}); 
		};
		
		
		getAllWallet(searchWord,0,pageSize,function(reqs){
			//console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;
		});
		$(document).on('click','.index-editor',function(){
			$('.finance-main').hide();
			$('.finance-detail').show();
			
			userId = $(this).attr("userId");

			oTableTr2 = '';
			getOneDetailWallet(userId,0,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var tableLength = reqs.content.walletOrderDetails.list;
					var totalpages = reqs.content.walletOrderDetails.totalPages;
	
					for(var i = 0;i < tableLength.length;i++){
						oTableTr2 +=`<tr>
										<td>${tableLength[i].orderId}</td>
										<td>${tableLength[i].money}元</td>
										<td>${tableLength[i].orderType}</td>
										<td>${formatDate(new Date(tableLength[i].payTime))}</td>
									</tr>`;
					}
	
					$('.finance-detail .index-table').html("");
					$('.finance-detail .index-table').append(oTableString2 + oTableTr2);
					$('.finance-detail .index-total').html("共有数据：" +reqs.content.walletOrderDetails.totalElements+"条");
					var pager2 = new Pager({
					  index: 1,
					  total: totalpages,
					  parent: pagerBox2,
					  onchange: doChangePage2
					});	
				}else{
		   			alert(reqs.msg);
		   		}
				
			});
		});
		
		$(document).on('click','.index-search',function(){
			searchWord = $('.search-word').val();
			oTableTr = '';
		   getAllWallet(searchWord,0,pageSize,function(reqs){
		   		pageNum = reqs.content.totalPages;
		   		//console.log(reqs);
		   		if(reqs.code==1){
		   			$('.pager-box').remove();
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						if(tableLength[i].phone == null){
							tableLength[i].phone = "未知";
						}
						oTableTr +=`<tr>
									<td>${tableLength[i].userId}</td>
									<td>${tableLength[i].name}</td>
									<td>${tableLength[i].no}</td>
									<td>${tableLength[i].phone}</td>
									<td>${tableLength[i].walletYuan}元</td>
									<td><span class="index-editor" userId="${tableLength[i].userId}">查看</span></td>
								</tr>`;
					}
					$('.finance-main .index-table').html("");
					$('.finance-main .index-table').append(oTableString + oTableTr);	
		   		}else{
		   			alert(reqs.msg);
		   		}
		   		var pager = new Pager({
				  index: 1,
				  total: pageNum,
				  parent: pagerBox,
				  onchange: doChangePage
				});

			}) 
		});
		
		$(document).on('click','.index-btn-cel',function(){
			location.reload();
		});

		$('.index-total').html("共有数据：" +numTotal+"条");


		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});

		
	})
})(jQuery)
