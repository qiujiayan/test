(function($){
	$(function(){
//		$('.index-img img').contextmenu(function(e){
//			var e = event || window.event;
//			console.log($(this).width())
//			$('.img-mana').css({"left":$(this).position().left+$(this).width()-25+'px',"top":$(this).position().top+'px'});
//			$('.img-mana').show();
//			return false;
//		});

				$('.index-img .mana-user').on('contextmenu',function(e){
			console.log($(this));
	    	e.preventDefault();
			var e = event || window.event;
			var _this = $(this);
			var userId = _this.attr('usersid');
			var communityId = _this.attr('communityid');
	
			$('.img-mana').css({"left":e.clientX+'px',"top":e.clientY+'px'});
			$('.img-mana').show();
			
			console.log(userId + ','+communityId);
			
			$('.img-mana').on('click','.gag',function(){
				console.log(0);
				var muteDuration = 100000000;
				Gag(userId,communityId,muteDuration,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
						alert("此用户禁言成功");
						_this.find('.fluid').css('display','block');
					}
				});
			});
			$('.img-mana').on('click','.delete',function(){
				console.log(1);
				console.log(userId + ','+communityId);
				delMember(userId,communityId,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
						alert("此用户已删除");
						_this.remove();
					}
				});
			});
			$('.img-mana').on('click','.ungag',function(){
				console.log(2);
				unbindGag(userId,communityId,function(reqs){
			        console.log(userId + ','+communityId);
					console.log(reqs);
					if(reqs.code==1){
						alert("此用户解除禁言成功");
						_this.find('.fluid').css('display','none');
					}else{
						alert(reqs.msg);
					}
				});
			});
			return false;
		});
		window.onclick=function(e){
			$('.img-mana').css({'display':'none'});
		};
		

			
		
	})
})(jQuery)
