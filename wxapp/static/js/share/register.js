define(function (require) {
    require.async(['jquery','fastclick','zeptoAlert','wx','appApi','common'], function (jquery,fastclick,zeptoAlert,wx,appApi,common) {
        $(function () {
			var btnClick = true,btnRegister = false;
		    var countdown=60; 
		    var vall = $('.get-code');//获取验证码框
		    var iTimer = null;
			var oPhone,oCode,oPassword,oinvitationCode;
			var shareUserId = common.getQueryString("shareUserId");
			var targetId = common.getQueryString("targetId");
			var show = common.getQueryString("show");
			
//	        if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){//苹果设备
//	            //window.location.href = "https://itunes.apple.com/us/app/xxx-xxx-shang-cheng/id%1158780863?mt=8&uo=4";
//	            
//	        }
//	        if(navigator.userAgent.match(/android/i)){//安卓设备
//	            
//	            
//			}

			//密码显示方式
			$(document).on('click','.eyes',function(){
				$(this).css("background-image","url(/wxapp/static/images/share/open.png)").addClass("eyes-open");
				$('.password').attr("type","text");
			});
			$(document).on('click','.eyes-open',function(){
				$(this).css("background-image","url(/wxapp/static/images/share/close.png)").removeClass("eyes-open");
				$('.password').attr("type","password");
			});
			
			//获取验证码
			$('.get-code').on('click',function(){
				if(btnClick == true){
					btnClick = false;
					oPhone = $('.phone-div input').val();
					if(!(/^1[34578]\d{9}$/.test(oPhone))){
						btnClick = true;
						$.dialog({
	                        content: "手机号格式错误",
	                        title: "alert",
	                        time: "2000"
	                    })
					}else{
						appApi.getVerificationCode(oPhone,"R", show,function(reqs){
							console.log(reqs);
							if(reqs.code==1){
								settime(vall);	
							}else{
								btnClick = true;
								$.dialog({
			                        content: reqs.msg,
			                        title: "alert",
			                        time: "2000"
			                    })
							}
						});	
					}
				}
			})

			
			//获取验证码倒计时
			function settime(val) { 
				if (countdown == 0) { 
					btnClick = true;
					clearTimeout(iTimer);
					val.html("获取验证码"); 
					countdown = 60; 
				} else { 
					btnClick = false;
					val.html("重新发送(" + countdown + ")"); 
					countdown--; 
					setTimeout(function() { 
						iTimer = settime(val) ;
					},1000) 
				} 
			}
			
			$('.wrap input').bind('input propertychange', function() {
				// console.log("手机号"+$('.phone-div input').val())
				// console.log("验证码"+$('.code-div input').val())
				// console.log("密码"+$('.password-div input').val())
				// console.log("邀请码"+$('.invitationCode-div input').val())
				
			    if(($('.phone-div input').val() !="") && ($('.code-div input').val() !="") && ($('.password-div input').val() !="") && ($('.invitationCode-div input').val() !="")){
			        $('.register').css('background','#ff1400');
			    }else{
			        $('.register').css('background','#E0E0E0');
			    }
		    });
			
			
			$('.register').on('click',function(){
				oPhone = $('.phone-div input').val();
				oCode = $('.code-div input').val();
				oPassword = $('.password-div input').val();
				oinvitationCode = $('.invitationCode-div input').val();
				if(oPhone == ''||oCode==''||oPassword==''||oinvitationCode==""){
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
					appApi.userRegiste(oPhone,oCode,oPassword,oinvitationCode,show, function(reqs){
						// console.log(reqs);
						if(reqs.code==1){
							localStorage.setItem("webtoken",reqs.content.token);
							localStorage.setItem("webuserid",reqs.content.userId);
							location.href = "community.html?shareUserId="+shareUserId + "&targetId=" +targetId;
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
