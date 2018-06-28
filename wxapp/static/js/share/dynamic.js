define(function (require) {
    require.async(['zepto','zeptoAlert','wx','appApi','common'], function (zepto,zeptoAlert,wx,appApi,common) {
        $(function () {

			var userDynamicId = common.getQueryString("userDynamicId");
			var pageNum = 0;
			var show = common.getQueryString("show");
			var imgString='',zanString='';
			//var dynamicCommentCount,
			var imgLove=`<img src="../static/images/share/af.png" class="icon-love"/>`;
			var moreLove=`<span class="loadmoreDiscuss">更多</span>`;
			var moreComment=`<div class="more loadmoreDiscuss">显示更多评论</div>`;
			
			var commentString='';
			
//			var versionName = 0,linkUrl;
//			appApi.getLastVersion(versionName,function(reqs){
//				//console.log(reqs);
//				if(reqs.code==1){
//					linkUrl = reqs.content.downUrl;
//				}else{
//					$.dialog({
//                      content: reqs.msg,
//                      title: "alert",
//                      time: "2000"
//                  })
//				}
//			})
			
			$('.cancel').on('click',function(){
				$('.load').hide();
			})
			$('.loadapp').on('click',function(){
				if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){//苹果设备
					location.href ="https://itunes.apple.com/cn/app/%E8%B6%85%E7%81%AB/id1348054748?mt=8"; 
		        }
		        if(navigator.userAgent.match(/android/i)){//安卓设备 
					location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.sf.superfire";	  
				}
			})
			
			appApi.getUserDynamicDetail(userDynamicId,pageNum,show,function(reqs){
				//console.log(reqs);
				if(reqs.code==1){
					//console.log(reqs.content.dynamicPointCount)
					var reqsPic = reqs.content.dynamicPictures;
					var reqsZan = reqs.content.pointUsers;
					var reqsComment = reqs.content.dynamicComments;
					$('.icon-two .first-span').html(reqs.content.dynamicPointCount);
					$('.icon-two .second-span').html(reqs.content.dynamicCommentCount);
					$('.comment').html(reqs.content.dynamicContent);
					if(reqsPic.length > 0){
						for(var i=0;i<reqsPic.length;i++){
							imgString +=`<img src="${reqsPic[i]}"/>`;
						}
						$('.top-img').append(imgString);
					}
					if(reqsZan.length > 0){
						$('.zan-check').show();
						for(var j=0;j<reqsZan.length;j++){
							zanString +=`<img src="${reqsZan[j].avatar}" class="icon-avatar"/>`;
						}
						$('.zan-check').append(imgLove+zanString+moreLove);
					}
					if(reqsComment.length > 0){
						for(var k=reqsComment.length-1;k>=0;k--){	
							commentString +=`<p><span class="myself">${reqsComment[k].replyUsername}</span><span class="reapply">回复</span><span class="other">${reqsComment[k].createUsername}</span><span class="detail">:${reqsComment[k].content}</span></p>`;
						}
						$('.discuss').append(commentString+moreComment);
						for(var n=reqsComment.length-1;n>=0;n--){	
							if(reqsComment[n].replyUsername == undefined){
							//console.log(n)
								$('.myself').eq(reqsComment.length-n-1).hide();
								$('.myself').eq(reqsComment.length-n-1).next().hide();
							}
						}
					}
				}else{
					$.dialog({
                        content: reqs.msg,
                        title: "alert",
                        time: "2000"
                    })
				}
			});
			
			$(document).on('tap','.loadmoreDiscuss',function(){
				$.dialog({
                    content: "请去下载 超火APP ! 在APP中查看哦~",
                    title: "alert",
                    time: "2000"
               });
               $('.load').show();
			})
	
        });
    });
});
