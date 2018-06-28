define(function (require) {
    require.async(['jquery','fastclick','zeptoAlert','wx','appApi','common'], function (jquery,fastclick,zeptoAlert,wx,appApi,common) {
        $(function () {

			var show = common.getQueryString("show");
			var oPhone,oPassword;
		
			var loginType = 1;

			//密码显示方式
			$(document).on('click','.eyes',function(){
				$(this).css("background-image","url(/wxapp/static/images/share/open.png)").addClass("eyes-open");
				$('.password').attr("type","text");
			});
			$(document).on('click','.eyes-open',function(){
				$(this).css("background-image","url(/wxapp/static/images/share/close.png)").removeClass("eyes-open");
				$('.password').attr("type","password");
			});
			

			$('.wrap input').bind('input propertychange', function() {
			    if(($('.phone-div input').val() !="") && ($('.password-div input').val() !="")){
			        $('.login').css('background','#ff1400');
			    }else{
			        $('.login').css('background','#E0E0E0');
			    }
		    });
			
			
			$('.login').on('click',function(){
				oPhone = $('.phone-div input').val();
				oPassword = $('.password-div input').val();

				if(oPhone == ''||oPassword==''){
					$.dialog({
                        content: "信息不能为空",
                        title: "alert",
                        time: "2000"
                    })
				}else if(!(/^[a-zA-Z0-9]{6,20}$/.test(oPassword))){
					$.dialog({
                        content: "密码格式错误",
                        title: "alert",
                        time: "2000"
                    })
				}else{
					appApi.userLogin(loginType,oPhone,oPassword, show,function(reqs){
						//console.log(reqs);
						if(reqs.code==1){
							localStorage.setItem("webtoken",reqs.content.token);
							localStorage.setItem("webuserid",reqs.content.userId);
							location.href = "charge.html";
						}else{
							$.dialog({
		                        content: reqs.msg,
		                        title: "alert",
		                        time: "2000"
		                    })
						}
					});
				}
			});
	
			
	
	
	
        });
    });
});
