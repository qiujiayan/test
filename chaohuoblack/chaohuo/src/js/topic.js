(function($){
	$(function(){
    	var linkUrl,show,status,type,dataId;
		var radios = $('.user-onecheck');
		var sourceUrl,files;
		var pagerBox = document.getElementById('pager');
		var oTableTr = '',pageNum = 0,numTotal = 0;
		var isShow,isStatus;
		var oTableString = `<tr>
								<td>
									<input type="checkbox" class="user-allcheck"/>全选
								</td>
								<td>ID</td>
								<td>话题名</td>
								<td>话题logo</td>								
								<td>创建者</td>
								<td>创建时间</td>
								<td>状态</td>
								<td>调整</td>
								<td>操作</td>
							</tr>`;
		var oIcon;
		$(document).on('click','.banner-add-main',function(){
		    $('.manage-banner-show').css('display','none');
			$('.manage-banner-edi').css('display','block');
		});
	
		
		function doChangePage(){
		   oTableTr = '';
		   checkBanner((this.__index)-1,type,10,status,function(reqs){
		   		//console.log(reqs);
				var tableLength = reqs.content.list;
				for(var i = 0;i < tableLength.length;i++){
					switch (tableLength[i].status)
						{
						case 1:
						  isStatus="上线";
						  oIcon = `<i class="menu-icon fa fa-long-arrow-up"></i>
									<i class="menu-icon fa fa-long-arrow-down"></i>`;
						  break;
						case 2:
						  isStatus="已下线";
						  oIcon = "";
						  break;
						};
					oTableTr += `<tr>
								<td><input type="checkbox"  class="user-onecheck"/></td>
								<td class="banner-id">${tableLength[i].id}</td>
								<td>${tableLength[i].topicTitle}</td>
								<td><img src="${tableLength[i].sourceUrl}" height="30" width="60"/></td>
								<td class="banner-url">${tableLength[i].topicCreatename}</td>
								<td class="banner-time">${formatDate(new Date(tableLength[i].topicCreatetime))}</td>
								<td class="banner-status" statusid=${tableLength[i].status}>${isStatus}</td>
								<td dataid = ${tableLength[i].id}>${oIcon}</td>
								<td>
									<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
									<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
								</td>
							</tr>`; 
				}
				//console.log(oTableTr);
				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr);
//				oIcon = `<i class="menu-icon fa fa-long-arrow-down"></i>`;
//				var oTd=$('.index-table-show tr td');
//				$(oTd[16]).html("").append(oIcon);
//				//console.log($(aa[16]));
			})
		    var radios = $('.user-onecheck');
			$('.user-allcheck').on('click',function(){
			    for (var i=0; i<radios.length; i++){
					if($(this).is(':checked')){
				        radios[i].checked = true;	
					}else{
						radios[i].checked = false;
					}
			    }
				
			});
		   
		};
		
		
		
		checkBanner(0,'',10,'',function(reqs){
			//console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;
		})

		$('.index-total').html("共有数据：" +numTotal+"条");

	
		$('.user-allcheck').on('click',function(){
		    for (var i=0; i<radios.length; i++){
				if($(this).is(':checked')){
			        radios[i].checked = true;	
				}else{
					radios[i].checked = false;
				}
		    }
			
		});
		$('.user-table-del').on('click',function(){
			var _this = $(this);
			$('.delete-wrap').show();
			$('.delete-confirm').click(function(){
				_this.parent().parent().remove();	
				$('.delete-wrap').hide();
			});
			$('.delete-cancel').click(function(){
				$('.delete-wrap').hide();
			});
		});
		//console.log($.cookie("tokenid"));
		$('.manage-upa-file').on("change",function(e){
		    files =this.files;
			//console.log(files[0].name);
			upLoad($.cookie("tokenid"),files[0].name,"B",function(reqs){
				oSign = reqs.content.oneEffectiveSign;
				oSigns = reqs.content.periodEffectiveSign;
				oPath = reqs.content.cosPath;
				
				imgJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
				    sourceUrl = reqs;	
				});
			});
			

		    var reader =new FileReader();
		    reader.readAsDataURL(files[0]);
		    reader.onload =function(e){
		        var dx =(e.total/1024)/1024;
		        if(dx>=2){
		          alert("文件大小大于2M");
		          return;
		        }
		        $('.banner-img').attr('src',this.result);
		    }
	    });
    	$("#pid").change(function() {	
			 type = $(this).find("option:selected").val();		 
	    	if(type==0){
	    		$('.hand-type-div').show();
	    		type = $('.hand-type-div .hand-type').val();
	    	};
		});
		
		// 添加按钮的点击事件
	    $('.topic-add').on('click',function(){
			topicTitle =$('.topic-title').val();    //话题名
			// console.log(topicTitle);
			topicContent =$('.topic-content').val();//话题内容
			// console.log(topicContent);
	    	// show = $("select[name='bannershow']").val();
			sourceUrl = sourceUrl;
		    // console.log(sourceUrl);
			status =$("select[name='topicstatus']").val();//状态
			topicUsername ="";
			topicSort="";
			topicCreatetime="";	
			topicCreatename="";		
			id="";
	    	// type =$("select[name='bannertype']").val();
	    	// if(type==0){
	    	// 	$('.hand-type-div').show();
	    	// 	type = $('.hand-type-div .hand-type').val();
	    	// };
	    	// console.log(type);
			//console.log(linkUrl+','+show+','+status+','+type);
			
			
	    // 添加话题
		    addTopic(topicContent,sourceUrl,topicTitle,topicUsername,status,topicSort,topicCreatetime,topicCreatename,id,function(reqs){
		    	if(reqs.code == 1){
		    		alert("上传成功");
		    		location.reload();
//		    		$('.manage-banner-edi').css('display','none');
//		    		$('.manage-banner-show').css('display','block');
		    	}else{
		    		alert(reqs.msg);
		    	}
		    })
	    });
	    
	    $('.index-table-show').on('click','.index-editor',function(){
	    	dataId = $(this).attr('dataid');
	    	$('.manage-banner-bian .banner-img').attr('src',$(this).parent().parent().find('img').attr('src'));
	    	$('.modify-bannerlink').val($(this).parent().parent().find('.banner-url').html());
	    	//$("select[name='mpdify-status']").val($(this).parent().parent().find('.banner-status').html());
	    	
		    $('.manage-banner-show').css('display','none');
	    	$('.manage-banner-bian').css('display','block');
	    });
	    $('.index-table-show').on('click','.index-query',function(){
	    	console.log(1);
	    	dataId = $(this).attr('dataid');
	    	$('.manage-banner-detail .banner-img').attr('src',$(this).parent().parent().find('img').attr('src'));
	    	$('.bannerdetail-url').html($(this).parent().parent().find('.banner-url').html());
	    	$('.bannerdetail-time').html($(this).parent().parent().find('.banner-time').html());
	    	$('.bannerdetail-status').html($(this).parent().parent().find('.banner-status').html());
	    	
		    $('.manage-banner-show').css('display','none');
	    	$('.manage-banner-detail').css('display','block');
	    });
	    $('.manage-banner-detail').on('click','.bannerdetail-cel',function(){
	    	console.log($(this));
	    	$('.manage-banner-detail').css('display','none');
	    	$('.manage-banner-show').css('display','block');
	    });
	    $('.manage-banner-detail').on('click','.bannerdetail-con',function(){
	    	$('.manage-banner-bian .banner-img').attr('src',$(this).parent().parent().find('img').attr('src'));
	    	$('.modify-bannerlink').val($('.bannerdetail-url').html());
	    	console.log($(this));
	    	$('.manage-banner-detail').css('display','none');
	    	$('.manage-banner-bian').css('display','block');
	    });
	    
	    
	    
	    $('.banner-modify-cel').on('click',function(){
	    	$('.manage-banner-bian').css('display','none');
	    	$('.manage-banner-show').css('display','block');
	    });
	    
	    $('.banner-upa-file').on("change",function(e){
		    files =this.files;
			//console.log(files[0].name);
			upLoad($.cookie("tokenid"),files[0].name,"B",function(reqs){
				oSign = reqs.content.oneEffectiveSign;
				oSigns = reqs.content.periodEffectiveSign;
				oPath = reqs.content.cosPath;
				
				imgJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
				    sourceUrl = reqs;	
				});
			});
			

		    var reader =new FileReader();
		    reader.readAsDataURL(files[0]);
		    reader.onload =function(e){
		        var dx =(e.total/1024)/1024;
		        if(dx>=2){
		          alert("文件大小大于2M");
		          return;
		        }
		        $('.banner-img').attr('src',this.result);
		    }
	    });
	    
	    $('.banner-modify-que').on('click',function(){
	    	linkUrl = $('.modify-bannerlink').val();
	    	show = $("select[name='modify-show']").val();
	    	sourceUrl = sourceUrl;
	    	status =$("select[name='mpdify-status']").val();
	    	//type =$("select[name='bannertype']").val();
	    	
	    	console.log(linkUrl+','+show+','+status+','+type);
	    	
		    modifyBanner(dataId,linkUrl,show,sourceUrl,status,function(reqs){
		    	console.log(reqs);
		    	if(reqs.code == 1){
		    		alert("修改成功");
		    		location.reload();
		    		//$('.manage-banner-bian').css('display','none');
	    			//$('.manage-banner-show').css('display','block');
		    	}else{
		    		alert(reqs.msg);
		    	}
		    })
	    });
	    $('.banner-search').on('click',function(){
		    var oTableTr2='';
	    	$('.index-table-show').find('tbody').html("");
	    	$('.pager-box').remove();

	    	type =$("select[name='search-type']").val();
	    	status =$("select[name='search-status']").val();
	    	console.log(type+','+status);
	    	checkBanner(0,type,10,status,function(reqs){
	    		console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				
				var tableLength = reqs.content.list;
		   		//console.log(tableLength);
				for(var i = 0;i < tableLength.length;i++){
					switch (tableLength[i].status)
						{
						case 1:
						  isStatus="上线";
						  oIcon = `<i class="menu-icon fa fa-long-arrow-up"></i>
									<i class="menu-icon fa fa-long-arrow-down"></i>`;
						  break;
						case 2:
						  isStatus="已下线";
						  oIcon = "";
						  break;
						};
					oTableTr2 += `<tr>
								<td><input type="checkbox"  class="user-onecheck"/></td>
								<td class="banner-id">${tableLength[i].id}</td>
								<td>${tableLength[i].type}</td>
								<td><img src="${tableLength[i].sourceUrl}" height="30" width="60"/></td>
								<td class="banner-url">${tableLength[i].linkUrl}</td>
								<td>${formatDate(new Date(tableLength[i].createTime))}</td>
								<td class="banner-status" statusid=${tableLength[i].status}>${isStatus}</td>
								<td dataid = ${tableLength[i].id}>${oIcon}</td>
								<td>
									<span class="index-editor" dataid = ${tableLength[i].id}>编辑</span>
									<span class="index-query" dataid = ${tableLength[i].id}>查看</span>
								</td>
							</tr>`; 
				}
				//console.log(oTableTr);
				$('.index-table-show').html("");
				$('.index-table-show').append(oTableString + oTableTr2);
				$('.index-total').html("共有数据：" +numTotal+"条");
				var pager = new Pager({
				  index: 1,
				  total: pageNum,
				  parent: pagerBox,
				  onchange: doChangePage
				});
			});
			console.log(pageNum);
	    });
//		$('.index-total').html("共有数据：" +numTotal+"条");
		var pager = new Pager({
		  index: 1,
		  total: pageNum,
		  parent: pagerBox,
		  onchange: doChangePage
		});
	    
	    //让表格里的tr互换位置
	    function doit(a,b) {
	       $(".index-table-show tr:nth-child(" + a + ")").insertAfter($(".index-table-show tr:nth-child(" + b + ")"));
	    }
	    function up(obj){ 
			var objParentTR=$(obj).parent().parent(); 
	    	console.log(objParentTR);
			var prevTR=objParentTR.prev(); 
			prevTR.insertAfter(objParentTR); 
		} 
		function down(obj){ 
			var objParentTR=$(obj).parent().parent(); 
			var nextTR=objParentTR.next(); 
			nextTR.insertBefore(objParentTR); 
		}
	    
	    
	    $(document).on('click','.fa-long-arrow-up',function(){
	    	//console.log($(this));
	    	var _this = $(this);
	    	var bannerId = _this.parent().attr('dataid');
			modifyBannerSort(bannerId,1,type,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					up(_this);
				}else{
					alert(reqs.msg);
				}
			})	
	    });
	    $(document).on('click','.fa-long-arrow-down',function(){
	    	//console.log($(this));
	    	var _this = $(this);
	    	var bannerId = _this.parent().attr('dataid');
			modifyBannerSort(bannerId,0,type,function(reqs){
				console.log(reqs);
				if(reqs.code==1){
					down(_this);
				}else{
					alert(reqs.msg);
				}
			})	
	    });
	    
		$(document).on('click','.index-btn-cel',function(){
			$('.manage-banner-edi').css('display','none');
	    	$('.manage-banner-show').css('display','block');
		})
		
	})
})(jQuery)
