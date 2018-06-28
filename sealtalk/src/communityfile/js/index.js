(function($){
	$(function(){
		var imGroupId = getQueryString("im");
		var communityId = getQueryString("comm");
		var name,size,type,url;
		var pageNum = 0,pageSize = 99,searchWord;
		
		var files,sourceUrl;
		var oSign,oSigns,oPath;
		var bucket = 'superfireoss';
		var appid = '1255482466';
		var region = 'sh';
		
		//var commonToken = localStorage.getItem("filetoken");
		var oString='';
		
		
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

		getCommunityInfo(communityId,function(reqs){
			// console.log(reqs);
			if(reqs.code == 1){
				if(reqs.content.createFlag != 1){
					$('.add').css('display','none');
				}
			}
		})

		//查询社群文件
		getCommunityFilesByImGroupId(communityId,imGroupId,pageNum,pageSize,searchWord,function(reqs){
			//console.log(reqs);
			if(reqs.code == 1){
				var tableLength = reqs.content;
				if(tableLength.length > 0){
					$('.nofile').hide();
				}
				for(var i=0;i<tableLength.length;i++){
					oString +=`<li datahref="${tableLength[i].url}">
								<div class="left">
									<img src="${tableLength[i].typeUrl}" />
								</div>
								<div class="right">
									<p class="toptitle">
										<span class="title">${tableLength[i].name}</span>
										<span class="time">${formatDate(new Date(tableLength[i].createTime))}</span>
									</p>
									<p class="uppeople">上传人：${tableLength[i].userName}</p>
								</div>
							</li>`;
				}
				
				$('.filelist').append(oString);
				$(".toptitle .title").ellipsis(28); 
			}
		})

		//上传社群文件
		$('.upfilehidden').on("change",function(){
		    files =this.files;
			
			var index1=files[0].name.lastIndexOf(".");
			var index2=files[0].name.length;
			var suffix=files[0].name.substring(index1+1,index2);

			name = files[0].name;
			//console.log(name)
			upLoad(files[0].name,"G",function(reqs){
				// console.log(reqs);
				if(reqs.code == 1){
					oSign = reqs.content.oneEffectiveSign;
					oSigns = reqs.content.periodEffectiveSign;
					oPath = reqs.content.cosPath;
					
					imgJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
					    sourceUrl = reqs;	
					    createCommunityFile(communityId,imGroupId,name,size,suffix,sourceUrl,function(reqs){
				    		// console.log(reqs);
				    		if(reqs.code == 1){
				    			location.reload();
				    		}else{
				    			alert("只有群主可以上传哦~~");
				    		}
				    	})
					});
					
				}
				
			});
//
//		    var reader =new FileReader();
//		    reader.readAsDataURL(files[0]);
//		    reader.onload =function(e){
//		    	console.log(sourceUrl);
////		    	$('.upfilename').show();
////		    	name = $('.upfilename').val();
////		    	createCommunityFile(communityId,imGroupId,name,size,suffix,sourceUrl,function(reqs){
////		    		console.log(reqs);
////		    	})
////		        var dx =(e.total/1024)/1024;
////		        if(dx>=2){
////		          alert("文件大小大于2M");
////		          return;
////		        }
//		        //$('.banner-img').attr('src',this.result);
//		    }
	    });
		
		$(document).on('click','.filelist li',function(){
			var hrefUrl = $(this).attr("datahref");
			window.location.href = hrefUrl;
		});
		
		
	})
})(jQuery)
