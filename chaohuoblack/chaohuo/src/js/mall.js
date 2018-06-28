(function($){
	$(function(){
    
		var radios = $('.user-onecheck');

		var pagerBox = document.getElementById('pager');
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize = 10;
		var isShow,isStatus;
		
		var searchWord;
		var oTableString = `<tr>
								<td>群主</td>
								<td>群名</td>
								<td>商品信息</td>
								<td>发布商品数量</td>
								<td>操作</td>
							</tr>`;


		function doChangePage(){
		   oTableTr = '';
		   getAllCommunityWithGoods(searchWord,(this.__index)-1,pageSize,function(reqs){
		   		pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				$('.index-total').html("共有数据：" +numTotal+"条");
				var tableLength = reqs.content.list;
				for(var i = 0;i < tableLength.length;i++){
					if(tableLength[i].count==0){
						isStatus="无";
					}else{
						isStatus="有";
					}
					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].communityName}</td>
								<td>${isStatus}</td>
								<td>${tableLength[i].count}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].communityId}>查看</span>
								</td>
							</tr>`; 
				}

				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr);
			})
	   
		};
		
		//搜索
	    $('.index-search').on('click',function(){
		    var oTableTr='';
	    	$('.index-table-show').find('tbody').html("");
	    	$('.pager-box').remove();

	    	searchWord =$(".rednumber").val();
	    
	    	getAllCommunityWithGoods(searchWord,0,10,function(reqs){
	    		//console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				
				var tableLength = reqs.content.list;

				for(var i = 0;i < tableLength.length;i++){
					if(tableLength[i].count==0){
						isStatus="无";
					}else{
						isStatus="有";
					}
					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].communityName}</td>
								<td>${isStatus}</td>
								<td>${tableLength[i].count}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].communityId}>查看</span>
								</td>
							</tr>`; 
				}

				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr);
				$('.index-total').html("共有数据：" +numTotal+"条");
				var pager = new Pager({
				  index: 1,
				  total: pageNum,
				  parent: pagerBox,
				  onchange: doChangePage
				});
			});
	    });
	    
		getAllCommunityWithGoods(searchWord,0,10,function(reqs){
		   	pageNum = reqs.content.totalPages;
		});
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
	
		var oRedHeader = `<tr><td>名称</td><td>商品图片</td><td>商品单价（元）</td><td>库存数量</td><td>状态</td></tr>`,oRedString='';
		$(document).on('click','.index-query',function(){
			oRedString ='';
			$('.redTable').html("");
			$('.manage-banner-show').hide();
			$('.mall-detail').show();
			var no = $(this).attr("dataid");
			getAllGoodsByCommunityIdManage(no,0,99,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var oList = reqs.content.list.list;
					var oUser = reqs.content.user;

					
					$('.mallname').html(oUser.communityName);
					$('.mallpeople').html(oUser.userName);

					
					for(var i=0;i<oList.length;i++){
						var oPicture=oList[i].picture.split(',');
						switch (oList[i].status)
							{
							case 0:
							  isStatus="下架";
							  break;
							case 1:
							  isStatus="上架";
							  break;
							};
						oRedString += `<tr>
											<td>${oList[i].name}</td>
											<td><img src="${oPicture[0]}" style="height:50px;width:auto;"/></td>
											<td>${oList[i].yMoney}</td>
											<td>${oList[i].goodsCount}</td>
											<td>${isStatus}</td>
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
			$('.mall-detail').hide();
		});
	
		
	})
})(jQuery)
