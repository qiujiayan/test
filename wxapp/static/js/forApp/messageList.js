define(function (require) {
	var $ = require("jquery");
    require.async(['zeptoAlert','wx','appApi','common'], function (zeptoAlert,wx,appApi,common) {
        $(function () {
			// 判断安卓或ios
			var id = common.getQueryString("id");
			var token = common.getQueryString("token");
			var userCollectionId = common.getQueryString("userCollectionId");
			var oString = '',oContent,imgfileurl;
			var show = common.getQueryString("show");



			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid){
				$("header").hide();
				$(".wrap").css("margin-top","-0.1rem");
			}
			else{
				$("header").show();
				$(".wrap").css("margin-top",".88rem");
			}
			$('.messageback').on('click',function(){
				window.location.href="http://www.chaohuo.net/wxapp/forApp/false.html"; 
			});

		
			
			if(userCollectionId){
				$('.headdelete').css('display','block');
			}
			
			$.fn.ellipsis = function(charCount) {
	            return $(this).each(function() {
	                var el = $(this);
	                var originalText = el.html();
	                var originalTextLength = originalText.length;
	                if(charCount < originalTextLength){
	                    var text = originalText.substr(0, charCount);
	                    el.html(text + "...");
	                }
	            });
	        };

			
			appApi.getOneMessage(id,token,show,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					var oList = reqs.content.content;
						oList = eval("("+oList+")");
						//console.log(oList);
					for(var i=0;i<oList.length;i++){
						switch (oList[i].objectName)
							{
							  case "RC:TxtMsg"://文本消息
							   		oContent = `<div class="textMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<p>${oList[i].content}</p>
													</div>
												</div>`;
							  		break;
							  case "app:ImgMessage"://图片消息
									oContent = `<div class="imgMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="imgContent" imgData="${oList[i].fileUrl}">
															<img src="${oList[i].fileUrl}" />
														</div>
													</div>
												</div>`;
									break;

									// 20180508qjy
								case "app:ImgMedialMsg"://媒体类型图片消息
								oContent = `<div class="imgMessage">
												<div class="left">
													<img src="${oList[i].avatar}"/>
												</div>
												<div class="right">
													<div class="topDetail">
														<span class="personName">${oList[i].userName}</span>
														<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
													</div>
													<div class="imgContent" imgData="${oList[i].fileUrl}">
														<img src="${oList[i].fileUrl}" />
													</div>
												</div>
											</div>`;
								break;
									
							  case "RCBQMM:EmojiMsg"://动画表情图
									oContent = `<div class="animateMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<p>[动画表情]</p>
													</div>
												</div>`;
									  break;
									  
									  case "RCBQMM:GifMsg"://非文本类型
									  oContent = `<div class="animateMessage">
													  <div class="left">
														  <img src="${oList[i].avatar}"/>
													  </div>
													  <div class="right">
														  <div class="topDetail">
															  <span class="personName">${oList[i].userName}</span>
															  <span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														  </div>
														  <p>[流行动画表情]</p>
													  </div>
												  </div>`;
										break;
							  case "RC:FileMsg"://文件類型
							  		var index1=oList[i].objectName.lastIndexOf(".");
									var index2=oList[i].objectName.length;
									var suffix=oList[i].objectName.substring(index1+1,index2);
							  		switch (suffix){
							  			case "png":
							  				imgfileurl = `<img src="../static/images/picture.png"/>`;
							  				break;
							  			case "jpg":
							  				imgfileurl = `<img src="../static/images/picture.png"/>`;
							  				break;
							  			case "MP3":
							  				imgfileurl = `<img src="../static/images/radio.png"/>`;
							  				break;
							  			case "mp4":
							  				imgfileurl = `<img src="../static/images/video.png"/>`;
							  				break;
							  			case "doc":
							  				imgfileurl = `<img src="../static/images/word.png"/>`;
							  				break;
							  			case "pdf":
							  				imgfileurl = `<img src="../static/images/word.png"/>`;
							  				break;
							  			case "zip":
							  				imgfileurl = `<img src="../static/images/zip.png"/>`;
							  				break;
							  			default:
							  				imgfileurl = `<img src="../static/images/other.png"/>`;
							  				break;
							  		}
									oContent = `<div class="fileMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="fileContent" fileData="${oList[i].fileUrl}" fileName="${oList[i].fileName}" fileSize="${oList[i].fileSize}">
															<div class="fileLeft">
																${imgfileurl}
															</div>
															<div class="fileRight">
																<p class="p1">${oList[i].fileName}</p>
																<p class="p2">${oList[i].fileSize} B</p>
															</div>
														</div>
													</div>
												</div>`;
							  		break;
							  case "RC:LBSMsg"://位置
									oContent = `<div class="mapMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="mapContent" mLngData = "${oList[i].mLng}" mLatData = "${oList[i].mLat}">
															<div class="mapLeft">
																<img src="../static/images/map.png"/>
															</div>
															<div class="mapRight">
																<p class="p1">[位置]</p>
																<p class="p2">${oList[i].mPoi}</p>
															</div>
														</div>
													</div>
												</div>`;
							 		break;
							  case "RC:CardMsg"://名片
									oContent = `<div class="cardMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<p>[个人名片]</p>
													</div>
												</div>`;
							  		break;
							  case "RC:VcMsg"://语音
									oContent = `<div class="radioMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="radioContent">
															<div class="radioLeft">
																<img src="../static/images/horn.png"/>
															</div>
															<div class="radioRight">
																转发语音不能播放
															</div>
														</div>
													</div>
												</div>`;
							 		break;
							 	case "app:TransmitMessage"://消息记录
									oContent = `<div class="historyMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="historyContent" dataId="${oList[i].transmitId}">
															<p class="historyTitle">群聊的聊天记录</p>
														</div>
													</div>
												</div>`;
							 		break;
							 	case "app:CollectionMessage"://收藏的消息转发
									oContent = `<div class="graphicMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="graphicContent" graphicId="${oList[i].collectionId}">
															<p class="graphicTitle">收藏记录</p>
															<div class="graphicLeft">
																<img src="${oList[i].collectionPicture}"/>
															</div>
															<div class="graphicRight">
																<p>${oList[i].collectionContent}</p>
															</div>
														</div>
													</div>
												</div>`;
									break;
								case "app:VideoMessage"://视频转发
									oContent = `<div class="videoMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="videoContent" videoId="${oList[i].videoUrl}">
															<div class="videoLeft">
																<img src="../static/images/play.png"/>
															</div>
															<div class="videoRight">
																视频
															</div>
														</div>
													</div>
											</div>`;
									 break;
									 
								// 20180508qjyqjy
								case "app:VideoMsg"://媒体类型视频
									oContent = `<div class="videoMessage">
													<div class="left">
														<img src="${oList[i].avatar}"/>
													</div>
													<div class="right">
														<div class="topDetail">
															<span class="personName">${oList[i].userName}</span>
															<span class="time">${common.formatDate(new Date(oList[i].sentTime))}</span>
														</div>
														<div class="videoContent" videoId="${oList[i].videoUrl}">
															<div class="videoLeft">
																<img src="../static/images/play.png"/>
															</div>
															<div class="videoRight">
																视频
															</div>
														</div>
													</div>
											</div>`;
						 			break;
							  default:
							  		break;
							}
							
						oString += oContent;
						
					}
					
					$('.wrap').append(oString);
					$(".mapMessage .mapRight .p2").ellipsis(18);
					$(".topDetail .personName").ellipsis(12);

				}else{
					$.dialog({
                        content: reqs.msg,
                        title: "alert",
                        time: "2000"
                    })
				}
			})
			var mLng,mLat,fileData,fileName,fileSize,imgData,dataId,graphicId,videoId;
			$(document).on('click','.mapContent',function(){
				mLng = $(this).attr("mLngData");
				mLat = $(this).attr("mLatData");
				location.href = "map.html?mLngData="+mLng+"&mLatData="+mLat;
			});
			$(document).on('click','.imgContent',function(){
				imgData = $(this).attr("imgData");
				//console.log(imgData);
				location.href = "protocol://imgMessage/"+imgData;
			});
			$(document).on('click','.fileContent',function(){
				fileData = $(this).attr("fileData");
				fileName = $(this).attr("fileName");
				fileSize = $(this).attr("fileSize");
				//console.log(fileData);
				//location.href = "protocol://fileMessage/"+fileName+"/"+fileData;
//				var aa="protocol://fileMessage/{'fileName':" +"'" +fileName+"'" + ",'fileData':"+"'"+fileData+"'"+"}";
//				console.log(aa);
				//location.href = "protocol://fileMessage/{fileName:"+fileName + ",fileData:"+fileData+"}";
				// location.href = "protocol://fileMessage/{'fileName':" +"'" +fileName+"'" + ",'fileData':"+"'"+fileData+"'"+"}";
				location.href = "protocol://fileMessage/{'fileName':" +"'" +fileName+"'" + ",'fileData':"+"'"+fileData+"'" + ",'fileSize':"+"'"+fileSize+"'"+"}";
			});
			$(document).on('click','.historyContent',function(){
				dataId = $(this).attr("dataId");
				window.location.href = "messageList2.html?id="+dataId+"&token="+token;
			});
			$(document).on('click','.graphicContent',function(){
				graphicId = $(this).attr("graphicId");
				//console.log(graphicId);
				location.href = "protocol://graphicMessage/"+graphicId;
				
			});
			$(document).on('click','.videoContent',function(){
				videoId = $(this).attr("videoId");
//				var index1=videoId.lastIndexOf(".");
//				var index2=videoId.length;
//				var suffix=videoId.substring(index1+1,index2);
				//console.log("protocol://videoMessage/{'videoUrl':" +"'" +videoId+"'" + ",'videoType':"+"'"+suffix+"'"+"}");
				location.href = "protocol://videoMessage/"+videoId;
				//location.href = "protocol://videoMessage/{'videoUrl':" +"'" +videoId+"'" + ",'videoType':"+"'"+suffix+"'"+"}";
				
			});
			$(document).on('click','.headdelete',function(){
				console.log(userCollectionId);
				location.href = "protocol://collectionMessage/"+userCollectionId;	
			});
			

        });
    });
});
