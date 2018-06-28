(function($){
	$(function(){
		var type,oString;
		var adminUserId,adminRoleId;
		var oHead = `<caption align="top">管理员列表</caption><tr><td>管理员</td><td>角色</td><td>角色修改</td></tr>`,oList='';
		var oRoleName;
		
		getAllAdminUser(function(reqs){
			console.log(reqs);
			if(reqs.code==1){
				for(var i=0;i<reqs.content.length;i++){
					if(reqs.content[i].roleName == null){
						oRoleName = '无角色';
					}else{
						oRoleName = reqs.content[i].roleName;
					}
					oList += `<tr><td adminId="${reqs.content[i].id}">${reqs.content[i].username}</td><td roleId="${reqs.content[i].adminRoleId}">${oRoleName}</td><td><span class="index-editor">修改</span></td></tr>`;
				}
				$('.index-table').append(oHead+oList);
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		
		getAllRolesWithRoleModels(type,function(reqs){
			if(reqs.code==1){
				for(var i=0;i<reqs.content.length;i++){
					oString += `<option value ="${reqs.content[i].id}">${reqs.content[i].roleName}</option>`;
				}
				$('.index-man-zh').append(oString);
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		$(document).on('click','.index-editor',function(){
			$('.admin-list').css('display','none');
			$('.admin-editor').css('display','block');
			$('.admin-name').html($(this).parent().prev().prev().html());
			$('.admin-name').attr("adminId",$(this).parent().prev().prev().attr("adminId"));
		});
		$(document).on('click','.admin-concel',function(){
			$('.admin-editor').css('display','none');
			$('.admin-list').css('display','block');
		});
		$(document).on('click','.admin-confirm',function(){
			adminUserId = $('.admin-name').attr("adminId");
			adminRoleId = $('.index-man-zh').val();
			addAdminRole(adminUserId,adminRoleId,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("管理员角色修改成功");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})
		});
		
		
	})
})(jQuery)
