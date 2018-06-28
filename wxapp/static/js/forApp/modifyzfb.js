define(function (require) {
	var $ = require("jquery");
    require.async(['qrCode','zeptoAlert','wx','appApi','common'], function (qrCode,zeptoAlert,wx,appApi,common) {
        $(function () {
        	var token = common.getQueryString("token");
			var phone,name,cardNumber;
			var show = common.getQueryString("show");
        	//var zfbsource = common.getQueryString("zfbsource");//来源1是绑定 2是修改
        	
        	var clickBtn = true;
        	
        	appApi.getOneWithdrawNumber(token,show,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					$('.zfbinput').val(reqs.content.cardNumber);
					$('.nameinput').val(reqs.content.name);
					$('.phoneinput').val(reqs.content.phone);
				}else{
					$.dialog({
                        content: reqs.msg,
                        title: "alert",
                        time: "2000"
                    });	
				}
			});
        	
        	
        	
        	
			$('.wrap input').bind('input propertychange', function() {
			    if(($('.zfbinput').val() !="") && ($('.nameinput').val() !="") && ($('.phoneinput').val() !="")){
					$('.modifybtn').css("background","#FD3422");

			    }else{
			        $('.modifybtn').css('background','#d8d8d8');

			    }
		    });
		    
		    $('.wrap1 .inputcontent').on('click',function(){
			    var aa=$('.zfbinput').val(); 
				$('.zfbinput').val("").focus().val(aa);
		    	
		    });
		    $('.wrap2 .inputcontent').on('click',function(){
			    var bb=$('.nameinput').val(); 
				$('.nameinput').val("").focus().val(bb);
		    	
		    });
		    $('.wrap3 .inputcontent').on('click',function(){
			    var cc=$('.phoneinput').val(); 
				$('.phoneinput').val("").focus().val(cc);
		    	
		    });

		    
		    
		    $('.modifybtn').on('click',function(){
		    	phone = $('.phoneinput').val();
		    	name = $('.nameinput').val();
		    	cardNumber = $('.zfbinput').val();
		    	
		    	if(cardNumber ==""){
		    		clickBtn = false;
		    		$.dialog({
                        content: "账号不能为空",
                        title: "alert",
                        time: "2000"
                    });
		    	}else if(name==""){
		    		clickBtn = false;
		    		$.dialog({
                        content: "名字不能为空",
                        title: "alert",
                        time: "2000"
                    });
		    	}else if(phone==""){
		    		clickBtn = false;
		    		$.dialog({
                        content: "手机号不能为空",
                        title: "alert",
                        time: "2000"
                    });
		    	// }else if(!(/^1[34578]\d{9}$/.test(phone))){
				}else if(!(/^[0-9\+]+$/.test(phone))){
					clickBtn = false;
					$.dialog({
                        content: "手机号格式错误",
                        title: "alert",
                        time: "2000"
                    })
				}else{
					clickBtn = true;
				}
		    	
//		    	if(phone ==""||name==""||cardNumber==""){
//		    		clickBtn = false;
//		    		$.dialog({
//                      content: "信息不能为空",
//                      title: "alert",
//                      time: "2000"
//                 });
//		    	}else if(!(/^1[34578]\d{9}$/.test(phone))){
//					clickBtn = false;
//					$.dialog({
//                      content: "手机号格式错误",
//                      title: "alert",
//                      time: "2000"
//                  })
//				}else{
//					clickBtn = true;
//				}
				
				//console.log(clickBtn);
		    	if(clickBtn == true){
			    	appApi.updateWithdrawNumber(phone,name,cardNumber,token,show,function(reqs){
			    		//console.log(reqs);
			    		if(reqs.code==1){
			    			window.location.href = "cash.html?token="+token;
			    		}else{
			    			$.dialog({
		                        content: reqs.msg,
		                        title: "alert",
		                        time: "2000"
		                   });
			    		}
			    	});		
		    	};
		    	
		    });

			
        });
    });
});
