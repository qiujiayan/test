(function($){
	$(function(){
		var oHead = `<span class="index-name">所有权限：</span>`,oString='';
		var oRollHead = '<caption align="top">角色列表</caption><tr><td>所有角色</td><td>拥有权限</td><td>状态</td><td>编辑</td></tr>',oStatus,oP='',oRollString='';
		var type;
		var roleName;
		var adminRoleId,roleModelIds;
		var chk_value =''; 
	

	
		//查看所有模块
		getAllRoleModels(type,function(reqs){
			//console.log(reqs);
			if(reqs.code==1){
				for(var i=0;i<reqs.content.length;i++){
					oString +=`<div class="permission-list">
									<input type="checkbox" value="${reqs.content[i].id}" name="checkbox"/>
									<span>${reqs.content[i].roleModelName}</span>				
								</div>`;
				}
				$('.all-moduleRole').append(oHead+oString);
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		//查看所有角色
		getAllRolesWithRoleModels(type,function(reqs){
			//console.log(reqs);
			if(reqs.code==1){
				for(var i=0;i<reqs.content.length;i++){
					oP = '';
					if(reqs.content[i].status == 1){
						oStatus = "上线";
					}else{
						oStatus = "未上线";
					}
					for(var j=0;j<reqs.content[i].roleModels.length;j++){
						oP += `<p>${reqs.content[i].roleModels[j].roleModelName}</p>`;
					}
					oRollString +=`<tr><td>${reqs.content[i].roleName}</td><td>${oP}</td><td>${oStatus}</td><td><span class="role-editor" dataId="${reqs.content[i].id}">权限编辑</span></td></tr>`;
				}
				$('.index-table').append(oRollHead+oRollString);
			}else{
				alert("错误信息"+reqs.msg);
			}
		});
		
		//添加角色
		$(document).on('click','.index-lei-que',function(){
			roleName = $('.role-name').val();
			addRole(roleName,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.role-name').val("");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})

		});
		
		//角色编辑
		$(document).on('click','.role-editor',function(){
			dataId = $(this).attr("dataId");
			$('.role-list').css('display','none');
			$('.roles-editor').css('display','block');
			$('.role-name').html($(this).parent().prev().prev().prev().html());
			$('.role-permission').html($(this).parent().prev().prev().html());
			$('.role-name').attr("dataId",dataId);
		});
		
		//为角色添加权限
		$(document).on('click','.role-confirm',function(){
			chk_value='';
			$('input[name="checkbox"]:checked').each(function(){ 
				chk_value += $(this).val() +','; 
			});
			chk_value = chk_value.substring(0,chk_value.length-1);
			adminRoleId = $('.role-name').attr("dataId");
			roleModelIds =chk_value;
			console.log(roleModelIds);
			addAdminRoleModel(adminRoleId,roleModelIds,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("添加成功");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})
		});
		//为角色删除权限
		$(document).on('click','.role-delete',function(){
			chk_value='';
			$('input[name="checkbox"]:checked').each(function(){ 
				chk_value += $(this).val() +','; 
			});
			chk_value = chk_value.substring(0,chk_value.length-1);
			adminRoleId = $('.role-name').attr("dataId");
			roleModelIds =chk_value;
			console.log(roleModelIds);
			delAdminRoleModel(adminRoleId,roleModelIds,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("删除成功");
					location.reload();
				}else{
					alert("错误信息"+reqs.msg);
				}
			})
		});
		$(document).on('click','.role-concel',function(){
			$('.roles-editor').css('display','none');
			$('.role-list').css('display','block');
		})
		
		
	})
})(jQuery)