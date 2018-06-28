(function($){
	$(function(){
    	var linkUrl,show,type,dataId;
		var radios = $('.user-onecheck');
		var sourceUrl,files;
		var pagerBox = document.getElementById('pager');
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize = 10;
		var isShow,isStatus;
		
		var searchWord;
		var oTableString = `<tr>
								<td>ID</td>
								<td>手机号</td>
								<td>操作人</td>
								<td>红包金额</td>
								<td>红包个数</td>
								<td>发红包时间</td>
								<td>红包状态</td>
								<td>操作</td>
							</tr>`;


		function doChangePage(){
		   oTableTr = '';
		   getAllSendRedPacketOrders(searchWord,(this.__index)-1,pageSize,function(reqs){
		   		pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				$('.index-total').html("共有数据：" +numTotal+"条");
				var tableLength = reqs.content.list;
				for(var i = 0;i < tableLength.length;i++){
					switch (tableLength[i].status)
						{
						case 0:
						  isStatus="未领取";
						  break;
						case 1:
						  isStatus="已领完";
						  break;
						case 2:
						  isStatus="过期";
						  break;
						case 3:
						  isStatus="未领完";
						  break;
						};
					oTableTr += `<tr>
								<td>${tableLength[i].id}</td>
								<td>${tableLength[i].phone}</td>
								<td>${tableLength[i].name}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td>${tableLength[i].redPacketCount}</td>
								<td>${formatDate(new Date(tableLength[i].payTime))}</td>
								<td statusid=${tableLength[i].status}>${isStatus}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].no}>查看</span>
								</td>
							</tr>`; 
				}
				//console.log(oTableTr);
				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr);
			})
	   
		};
		
	    $('.index-search').on('click',function(){
		    var oTableTr2='';
	    	$('.index-table-show').find('tbody').html("");
	    	$('.pager-box').remove();

	    	searchWord =$(".rednumber").val();
	    
	    	getAllSendRedPacketOrders(searchWord,0,10,function(reqs){
	    		console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				
				var tableLength = reqs.content.list;
		   		//console.log(tableLength);
				for(var i = 0;i < tableLength.length;i++){
					switch (tableLength[i].status)
						{
						case 0:
						  isStatus="未领取";
						  break;
						case 1:
						  isStatus="已领完";
						  break;
						case 2:
						  isStatus="过期";
						  break;
						case 3:
						  isStatus="未领完";
						  break;
						};
					oTableTr += `<tr>
								<td>${tableLength[i].id}</td>
								<td>${tableLength[i].phone}</td>
								<td>${tableLength[i].name}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td>${tableLength[i].redPacketCount}</td>
								<td>${formatDate(new Date(tableLength[i].payTime))}</td>
								<td statusid=${tableLength[i].status}>${isStatus}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].no}>查看</span>
								</td>
							</tr>`; 
				}

				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr2);
				$('.index-total').html("共有数据：" +numTotal+"条");
				var pager = new Pager({
				  index: 1,
				  total: pageNum,
				  parent: pagerBox,
				  onchange: doChangePage
				});
			});
	    });
	    
		getAllSendRedPacketOrders(searchWord,0,10,function(reqs){
		   	pageNum = reqs.content.totalPages;
		});
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
	
		var oRedHeader = `<tr><td>账号</td><td>名字</td><td>领取金额（元）</td><td>领取时间</td></tr>`,oRedString='';
		$(document).on('click','.index-query',function(){
			oRedString ='';
			$('.redTable').html("");
			$('.manage-banner-show').hide();
			$('.manage-banner-detail').show();
			var no = $(this).attr("dataid");
			getOneRedPacketDetail(no,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var oSendUser = reqs.content.sedUser;
					var oGetUsers = reqs.content.getUsers;
					switch (oSendUser.status)
						{
						case 0:
						  isStatus="未领取";
						  break;
						case 1:
						  isStatus="已领完";
						  break;
						case 2:
						  isStatus="过期";
						  break;
						case 3:
						  isStatus="未领完";
						  break;
						};
					if(!oSendUser.redPacketCount){
						oSendUser.redPacketCount = 1;
					}
					
					$('.redsender').html(oSendUser.name);
					$('.redPhone').html(oSendUser.phone);
					$('.redMoney').html(oSendUser.yMoney);
					$('.redNum').html(oSendUser.redPacketCount);
					$('.redtime').html(formatDate(new Date(oSendUser.payTime)));
					$('.redStatus').html(isStatus);
					
					for(var i=0;i<oGetUsers.length;i++){
						oRedString += `<tr>
											<td>${oGetUsers[i].phone}</td>
											<td>${oGetUsers[i].name}</td>
											<td>${oGetUsers[i].yMoney}</td>
											<td>${formatDate(new Date(oGetUsers[i].payTime))}</td>
										</tr>`;
					}
					$('.redTable').append(oRedHeader+oRedString);

				}else{
					alert(reqs.msg);
				}
			})
		});
		$(document).on('click','.index-btn-cel',function(){
			$('.manage-banner-show').show();
			$('.manage-banner-detail').hide();
		});
	
		
	})
})(jQuery)
