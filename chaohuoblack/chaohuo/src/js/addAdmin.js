(function($){
	$(function(){
		var username,password;
		$(document).on('click','.index-lei-que',function(){
			username = $("input[name=username]").val();
			password = $("input[name=password]").val();
			console.log(username+','+password);
			adminUserRegiste(username,password,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					alert("添加成功");
					$("input[name=username]").val("");
					$("input[name=password]").val("");
				}else{
					alert("错误信息"+reqs.msg);
				}
			})	
		})
		
		
	})
})(jQuery)