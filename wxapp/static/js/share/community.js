define(function (require) {
    require.async(['jquery','zeptoAlert','wx','appApi','common'], function (jquery,zeptoAlert,wx,appApi,common) {
        $(function () {
        	var token = localStorage.getItem("webtoken");
        	var userid = localStorage.getItem("userId");
        	//token="0e73febad2fc1c37eeb0d3d6705f32ac";
			var show = common.getQueryString("show");
        	var shareUserId = common.getQueryString("shareUserId");
			var communityId = common.getQueryString("targetId");
			var money;
			var joinWay;
			var password;
        	
        	appApi.getCommunityInfo(communityId,token, show,function(reqs){
        		console.log(reqs);
        		if(reqs.code==1){
        			joinWay = reqs.content.joinWay;
        			money = reqs.content.money;
        			$('.top img').attr("src",reqs.content.picture);
        			$('.wrap .left img').attr("src",reqs.content.userAvatar);
        			$('.wrap .title').html(reqs.content.name);
        			$('.wrap .left span').html(reqs.content.username);
        			$('.wrap .right span').html("ID:"+reqs.content.no);
        			$('.wrap .com-detail').html(reqs.content.notice);
        			$('.com-direct .right p').html("成员："+reqs.content.userTotal+"人");
        			
        			$('.apply').on('click',function(){
        				console.log(joinWay);
        				switch (joinWay)
							{
							case 1://任何人都可以加入
								appApi.joinCommunity(communityId,password,shareUserId,token,show,function(reqs){
									console.log(reqs);
									if(reqs.code==1){
									    location.href = "join.html";
									}else{
										$.dialog({
					                        content: reqs.msg,
					                        title: "alert",
					                        time: "2000"
					                    })
									}
								});
							    break;
							case 2://收费后加入
							    location.href = "joinway.html?shareUserId="+shareUserId + "&targetId=" +communityId + "&money="+ money;
							    break;
							case 3://密码通过后加入
							    location.href = "passway.html?shareUserId="+shareUserId + "&targetId=" +communityId;
							  break;
							case 4://需要管理员同意
								var imRyFriendUserId = communityId;
								appApi.addImRyNotice(imRyFriendUserId,1,token,show,function(reqs){
									console.log(reqs);
									if(reqs.code==1){
									    location.href = "waitjoin.html";
									}else{
										$.dialog({
					                        content: reqs.msg,
					                        title: "alert",
					                        time: "2000"
					                    })
									}
								})
							    break;
							}
        			})
        			
        			
        		}else{
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
