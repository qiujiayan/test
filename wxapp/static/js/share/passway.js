define(function (require) {
    require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
        $(function () {
			var password;
			var token = localStorage.getItem("webtoken");
        	var userid = localStorage.getItem("userId");
			var show = common.getQueryString("show");
        	var shareUserId = common.getQueryString("shareUserId");
			var communityId = common.getQueryString("targetId");
			
//			$('.pass input').on('input',function(){
//				if($(this).val() != ''){
//					$(this).blur();
//					$(this).parent().next().find("input").focus();
//				}
//			});
			$('.confirmPay').on('click',function(){
				//password = $('.password-one input').val() + $('.password-two input').val()+$('.password-three input').val()+$('.password-four input').val();
				password = $('.pass input').val();
				console.log(password);
				appApi.joinCommunity(communityId,password,shareUserId,token,show,function(reqs){
					console.log(reqs);
					if(reqs.code==1){
					    location.href = "join.html";
					}else{
						$('.pass input').val("");
						$('.pass input').focus();
//						$('.password-one input').val("");
//						$('.password-two input').val("");
//						$('.password-three input').val("");
//						$('.password-four input').val("");
//						$('.password-one input').focus();
						$.dialog({
	                        content: reqs.msg,
	                        title: "alert",
	                        time: "2000"
	                    })
					}
				});
			});
			
			

	
        });
    });
});
