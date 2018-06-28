(function($){
	$(function(){

		var pagerBox = document.getElementById('pager');
		var oHead = `<tr>
						<td>ID</td>
						<td>推送时间</td>
						<td>推送系统</td>
						<td>标题</td>
						<td>内容</td>
					</tr>`;
		var oTableTr = '',pageNum = 0,numTotal = 0,pageSize=10,status;

		
	
		getAllSystemMessages(0,pageSize,function(reqs){
			console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;	
			$('.index-total').html("共有数据:"+numTotal+"条");
		});
		
		function doChangePage(){
		    oTableTr = '';
		    if((this.__index)== undefined){
		    	this.__index = 1;
		    };
		   	getAllSystemMessages((this.__index)-1,pageSize,function(reqs){
				console.log(reqs);
				if(reqs.code==1){	
					var tableLength = reqs.content.list;
					for(var i = 0;i < tableLength.length;i++){
						if(tableLength[i].title == null){
							tableLength[i].title ="";
						}
						oTableTr += `<tr>
										<td>${tableLength[i].id}</td>
										<td>${formatDate(new Date(tableLength[i].createTime))}</td>
										<td>${tableLength[i].target}</td>
										<td>${tableLength[i].title}</td>
										<td>${tableLength[i].content}</td>
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
		

		$(document).on('click','.index-btn-cel',function(){
			location.reload();
		});
		$(document).on('click','.index-btn-con',function(){
			$('.nothrough-wrap').show();
		});
		$(document).on('click','.nothrough-cancel',function(){
			$('.nothrough-wrap').hide();
		});

		var title,type,content;
		$(document).on('click','.add-version',function(){
			$('.user-manage-show').hide();
			$('.manage-banner-add').show();
		});
		$(document).on('click','.index-btn-con',function(){
			$('.delete-wrap').show();
			title = $('.message-title').val();
			type = $("select[name='search-type']").val();
			content = $('.version-detail').val();
		});
		$(document).on('click','.delete-confirm',function(){
			console.log(title+','+type+','+content);
			sendPushAllWithOutExtra(title,type,content,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("推送成功");
					location.reload();
				}else{
					alert("推送失败");
				}
			})
		});
		$(document).on('click','.delete-cancel',function(){
			$('.delete-wrap').hide();
		});
		
		
		
	})
})(jQuery)
