(function($){
	$(function(){
    
		var radios = $('.user-onecheck');

		var pagerBox = document.getElementById('pager');
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize = 10;
		var isShow,isStatus;
		
		var searchWord;
		var oTableString = `<tr>
								<td>发布人</td>
								<td>商品名称</td>
								<td>商品图片</td>
								<td>库存数量</td>
								<td>价格</td>
								<td>商品介绍</td>
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
		   getAllCommunityGoodsManage(searchWord,(this.__index)-1,pageSize,function(reqs){
		   		console.log(reqs);
		   		pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				$('.index-total').html("共有数据：" +numTotal+"条");
				var tableLength = reqs.content.list;
				for(var i = 0;i < tableLength.length;i++){
//					switch (tableLength[i].status)
//						{
//						case 0:
//						  isStatus="无";
//						  break;
//						case 1:
//						  isStatus="有";
//						  break;
//						};
					var oPicture=tableLength[i].picture.split(',');

					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].name}</td>
								<td><img src="${oPicture[0]}"/ style="height:50px;width:auto;"></td>
								<td>${tableLength[i].goodsCount}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td class="des">${tableLength[i].description}</td>
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
	    
	    	getAllCommunityGoodsManage(searchWord,0,10,function(reqs){
	    		console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				
				var tableLength = reqs.content.list;
		   		//console.log(tableLength);
				for(var i = 0;i < tableLength.length;i++){
					var oPicture=tableLength[i].picture.split(',');
					oTableTr += `<tr>
								<td>${tableLength[i].userName}</td>
								<td>${tableLength[i].name}</td>
								<td><img src="${oPicture[0]}"/></td>
								<td>${tableLength[i].goodsCount}</td>
								<td>${tableLength[i].yMoney}元</td>
								<td>${tableLength[i].description}</td>
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
	    
		getAllCommunityGoodsManage(searchWord,0,10,function(reqs){
		   	pageNum = reqs.content.totalPages;
		});
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
	
		var oRedHeader = `<tr><td>名称</td><td>商品图片</td><td>商品单价（元）</td><td>库存数量</td><td>状态</td></tr>`,oPic='';
		$(document).on('click','.index-query',function(){
			oPic='';
			$('.mallimg').html("");
			$('.manage-banner-show').hide();
			$('.mall-detail').show();
			var goodsId = $(this).attr("dataid");
			getOneCommunityGoodsManage(goodsId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var oContent = reqs.content;
					var oPicture=reqs.content.picture.split(',');

					switch (oContent.status)
						{
						case 0:
						  isStatus="下架";
						  break;
						case 1:
						  isStatus="上架";
						  break;
						};

					$('.mallpeople').html(oContent.userName);
					$('.mallname').html(oContent.name);
					$('.mallnum').html(oContent.goodsCount);
					$('.mallprice').html(oContent.yMoney+"元");
					$('.mall-goodsdetail').html(oContent.description);
					$('.malltime').html(formatDate(new Date(oContent.createTime)));
					$('.mallstatus').html(isStatus);
					
					for(var i=0;i<oPicture.length;i++){
						oPic +=`<img src="${oPicture[i]}" style="height:150px;width:auto;margin-right:15px;"/>`;
					}
					
					$('.mallimg').append(oPic);
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
