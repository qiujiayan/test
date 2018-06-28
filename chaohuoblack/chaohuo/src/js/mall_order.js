(function($){
	$(function(){
    
		var radios = $('.user-onecheck');

		var pagerBox = document.getElementById('pager');
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize = 10;
		var isShow,isStatus;
		
		var searchWord,status;
		var oTableString = `<tr>
								<td>用户名</td>
								<td>购买商品名</td>
								<td>购买个数</td>
								<td>价格</td>
								<td>时间</td>
								<td>订单号</td>
								<td>状态</td>
								<td>操作</td>
							</tr>`;

		$.fn.ellipsis = function(charCount) {
            return $(this).each(function() {
                var el = $(this);
                var originalText = el.html();
                var originalTextLength = originalText.length;
                if(charCount < originalTextLength){
                    var text = originalText.substr(0, charCount);
                    el.html(text + "...");
                }
            });
        };
		function doChangePage(){
		   oTableTr = '';
		   getAllCommunityGoodsOrderManage(searchWord,status,(this.__index)-1,pageSize,function(reqs){
		   		console.log(reqs);
		   		pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				$('.index-total').html("共有数据：" +numTotal+"条");
				var tableLength = reqs.content.list;
				for(var i = 0;i < tableLength.length;i++){
					switch (tableLength[i].communityGoods.status)
						{
						case 0:
						  isStatus="未发货";
						  break;
						case 1:
						  isStatus="已发货";
						  break;
						};

					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].communityGoods.name}</td>
								<td>${tableLength[i].communityGoods.goodsCount}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td>${formatDate(new Date(tableLength[i].payTime))}</td>
								<td>${tableLength[i].no}</td>
								<td>${isStatus}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
								</td>
							</tr>`; 
				}

				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr);
				$('.des').ellipsis(20);
			})
	   
		};
		
	    $('.index-search').on('click',function(){
		    var oTableTr2='';
	    	$('.index-table-show').find('tbody').html("");
	    	$('.pager-box').remove();

	    	searchWord =$(".rednumber").val();
	    
	    	getAllCommunityGoodsOrderManage(searchWord,status,0,10,function(reqs){
	    		console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				
				var tableLength = reqs.content.list;
		   		//console.log(tableLength);
				for(var i = 0;i < tableLength.length;i++){
					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].communityGoods.name}</td>
								<td>${tableLength[i].communityGoods.goodsCount}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td>${formatDate(new Date(tableLength[i].payTime))}</td>
								<td>${tableLength[i].no}</td>
								<td>${isStatus}</td>
								<td>
									<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
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
	    
		getAllCommunityGoodsOrderManage(searchWord,status,0,10,function(reqs){
		   	pageNum = reqs.content.totalPages;
		});
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
	
		var oRedHeader = `<tr><td>名称</td><td>商品图片</td><td>商品单价（元）</td><td>库存数量</td><td>状态</td></tr>`;
		$(document).on('click','.index-query',function(){
			$('.mallimg').html("");
			$('.manage-banner-show').hide();
			$('.mall-detail').show();
			var orderId = $(this).attr("dataid");
			getOneCommunityGoodsOrderIdManage(orderId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var oContent = reqs.content;

					switch (oContent.status)
						{
						case 0:
						  isStatus="未发货";
						  break;
						case 1:
						  isStatus="已发货";
						  break;
						};

					$('.mallpeople').html(oContent.userName);
					$('.mallname').html(oContent.communityGoods.name);
					$('.mallnum').html(oContent.communityGoods.goodsCount);
					$('.mallprice').html(oContent.yMoney+"元");
					$('.malltime').html(formatDate(new Date(oContent.createTime)));
					$('.mallorder').html(oContent.no);
					$('.mallstatus').html(isStatus);
					
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
