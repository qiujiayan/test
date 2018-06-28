(function($){
	$(function(){
		var roleModelName,roleModelValue,type,status,id;
		var oHead = '<caption align="top">权限模块列表</caption><tr><td>所有权限</td><td>标识</td><td>状态</td><td>修改</td></tr>';
		var oString = '',oStatus;
		var dataId;
		getAllRoleModels(type,function(reqs){
			//console.log(reqs);
			if(reqs.code==1){
				for(var i=0;i<reqs.content.length;i++){
					if(reqs.content[i].status == 1){
						oStatus = "上线";
					}else{
						oStatus = "未上线";
					}
					oString +=`<tr><td>${reqs.content[i].roleModelName}</td><td>${reqs.content[i].roleModelValue}</td><td>${oStatus}</td><td><span class="index-editor" dataId="${reqs.content[i].id}">修改</span></td></tr>`;
				}
				$('.index-table').append(oHead+oString);
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		$(document).on('click','.peimission-confirm',function(){
			roleModelName = $('.permission-string').val();
			roleModelValue = $('.permission-url').val();
			console.log(roleModelName+','+roleModelValue);
			addRoleModel(roleModelName,roleModelValue,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.permission-string').val("");
					$('.permission-url').val("");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})
		});
		
		$(document).on('click','.index-editor',function(){
			$('.permission-list').css('display','none');
			$('.permission-editor').css('display','block');
			dataId = $(this).attr("dataId");
			$('.module-name').val($(this).parent().prev().prev().prev().html());
			$('.module-info').val($(this).parent().prev().prev().html());
			$('.module-name').attr("dataId",dataId);
		});

		
		$(document).on('click','.editor-confirm',function(){
			id = $('.module-name').attr("dataId");
			roleModelName = $('.module-name').val();
			roleModelValue = $('.module-info').val();
			status = $("select[name='module-status']").val();
			updateRoleModelInfo(id,roleModelName,roleModelValue,status,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("修改成功");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})
		})
		
		$(document).on('click','.editor-concel',function(){
			$('.permission-editor').css('display','none');
			$('.permission-list').css('display','block');
		});
		
	})
})(jQuery)
