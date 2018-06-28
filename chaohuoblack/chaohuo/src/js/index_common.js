(function($){
	$(function(){
		var templateHeader = `<div class="navbar-container ace-save-state" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="index.html" class="navbar-brand">
						<small>
							超火系统V1.0
						</small>
					</a>
				</div>
				<div class="index-loginer">
					<img src="assets/images/avatars/avatar2.png" />
					<span class="index-wel">欢迎您：123456</span>
					<div class="index-quit">注销</div>
				</div>
			</div>`;
		var templateSlider = `<ul class="nav nav-list">
					<li class="index">
						<a href="index.html" class="dropdown-toggle">
							<i class="menu-icon fa fa-users"></i>
							<span class="menu-text" onclick="window.location.href = 'index.html'"> 社群管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu" style="display:block">
							<li class="">
								<a href="index_man.html">
									社群类别等管理
								</a>
							</li>
							<li class="setup-mylist">
								<a href="#">
									创建社群
								</a>
							</li>
						</ul>					
					</li>
					
					<li class="user">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-user"></i>
							<span class="menu-text" onclick="window.location.href = 'user.html'"> 用户管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>	
						<ul class="submenu" style="display:block">
							<li class="user-detail">
								<a href="feedback.html">
									用户反馈
								</a>
							</li>
							<li>
								<a href="tipoff.html">
									举报/投诉
								</a>
							</li>
						</ul>
					
					</li>
					<li class="direct">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-fire"></i>
							<span class="menu-text" onclick="window.location.href = 'direct.html'"> 直播管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu" style="display:block">
							<li class="">
								<a href="direct_through.html">
									直播资格审核
								</a>
							</li>
						</ul>			
					</li>

					
					<li class="finance">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-money"></i>
							<span class="menu-text" onclick="window.location.href = 'finance.html'"> 财务管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>	
						<b class="arrow"></b>
						<ul class="submenu" style="display:block">
							<li class="">
								<a href="finance_cash.html">
									提现管理
								</a>
							</li>
							<li class="">
								<a href="red_package.html">
									红包管理
								</a>
							</li>
						</ul>
						
					</li>					
					<li class="manage">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-share-alt"></i>
							<span class="menu-text" onclick="window.location.href = 'manage.html'"> 系统管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						
						
						<b class="arrow"></b>

						<ul class="submenu" style="display:block">
							<li class="">
								<a href="manage.html">
									banner管理
								</a>
							</li>
							<li class="">
								<a href="messagePush.html">
									APP消息推送
								</a>
							</li>
							<li class="">
								<a href="manage_ban.html">
									版本管理
								</a>
							</li>
							<li class="">
								<a href="#" class="dropdown-toggle">
									<span class="menu-text" onclick="window.location.href = 'manage_sec.html'"> 权限管理 </span>
									<b class="arrow fa fa-angle-down"></b>
								</a>
								<b class="arrow"></b>

								<ul class="submenu">
									<li class="addAdmin">
										<a href="addAdmin.html">
											添加管理员
										</a>
									</li>
									<li class="addPermissionCategory">
										<a href="addPermissionCategory.html">
											角色管理
										</a>
									</li>
									<li class="permission">
										<a href="permission.html">
											权限模块
										</a>
									</li>
								</ul>
							</li>
						</ul>		
					</li>
					<li class="through">
						<a href="through.html">
							<i class="menu-icon fa fa-eye"></i>
							<span class="menu-text"> 审核 </span>
						</a>												
						<b class="arrow"></b>		
					</li>
					<li class="mall">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-shopping-bag"></i>
							<span class="menu-text" onclick="window.location.href = 'mall.html'"> 商城管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>	
						<b class="arrow"></b>
						<ul class="submenu" style="display:block">
							<li class="">
								<a href="mall_order.html">
									订单管理
								</a>
							</li>
							<li class="">
								<a href="mall_goods.html">
									商品管理
								</a>
							</li>
						</ul>						
					</li>

					<li class="topic">
						<a href="#" class="dropdown-toggle">
							<i class="menu-icon fa fa-fire"></i>
							<span class="menu-text" onclick="window.location.href = 'topic.html'"> 话题管理 </span>
							<b class="arrow fa fa-angle-down"></b>
						</a>
						<b class="arrow"></b>
						<ul class="submenu" style="display:block">
							<li class="">
								<a href="topic.html">
									话题列表
								</a>
							</li>
						</ul>			
					</li>

					<li class="safe">
						<a href="safe.html">
							<i class="menu-icon fa fa-exclamation-circle"></i>
							<span class="menu-text"> 安全管理 </span>
						</a>												
						<b class="arrow"></b>		
					</li>
				</ul>
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>`;
		$('#navbar').append(templateHeader);
		$('#sidebar').append(templateSlider);
		$('.nav-list>li').on('click',function(){
			//$(this).addClass('active').siblings().removeClass('active');
			$(this).toggleClass('active');
		});
		
		//显示模块管理
		var oArr =new Array();
		var role = localStorage.getItem("role");
		var roleModel = localStorage.getItem("roleModel");
		var hrefUrl;
		oArr = roleModel.split(',');
 		//console.log(role+','+roleModel);
		//console.log(oArr);
	/*	if(role=="ADMIN"){
			$('.index').css('display','block');
			$('.direct').css('display','block');
			$('.video').css('display','block');
			$('.finance').css('display','block');
			$('.system').css('display','block');
			$('.manage').css('display','block');
			$('.through').css('display','block');
			$('.safe').css('display','block');
			
		}else{
			for(var i=0;i<oArr.length;i++){
				oArr[i] = oArr[i].substring(0,oArr[i].length-1).trim();
				console.log('.'+oArr[i]);
				$('.'+oArr[i]).css('display','block');
			}	
		};*/

		if(role=="ADMIN"){
			$('.index').css('display','block');
			$('.direct').css('display','block');
			$('.video').css('display','block');
			$('.finance').css('display','block');
			$('.system').css('display','block');
			$('.manage').css('display','block');
			$('.through').css('display','block');
			$('.safe').css('display','block');
		}
		if(roleModel !=''){
			for(var i=0;i<oArr.length;i++){
				oArr[i] = oArr[i].substring(0,oArr[i].length-1).trim();
				$('.'+oArr[i]).css('display','block');
			}
		}else{
			alert("您还没有权限操作，请联系超级管理员~");
		}
		
		
		
		
		//console.log($.cookie("usernameq"));
		if($.cookie("usernameq") !=''){
			//console.log(1);
			$('.index-loginer .index-wel').html("Hi,欢迎你  " + $.cookie("usernameq"));	
		}else{
			location.href = "login.html";
		}
//		if($.cookie("usernameq") ==undefined){
//			location.href = "login.html";
//		}else if($.cookie("usernameq") !=''){
//			$('.index-loginer .index-wel').html("Hi,欢迎你  " + $.cookie("usernameq"));	
//		}
		$('.index-loginer .index-quit').on('click',function(){
			console.log(1)
			$.cookie("rmbUser","false");
			$.cookie("usernameq","");
			$.cookie("passwordq","");
			location.href = "login.html";
		});
		
		
		$('.user-dateout').on('click',function(){
			$(".index-table").table2excel({
	            exclude: ".noExl",
	            name: "表格统计",
	            filename: "表格统计",
	            exclude_img: true,
	            exclude_links: true,
	            exclude_inputs: true
	        });
		});
		
		
		$('.index-shuaxin').on('click',function(){
			location.reload();
		});
		$('.setup-mylist').on('click',function(){
			//location.href = "index.html";
			$('.setup-mainlist').css('display','none');
	    	$('.setup-list').css('display','block');
		});


			
	})
})(jQuery)


					
//					<li class="video">
//						<a href="#" class="dropdown-toggle">
//							<i class="menu-icon fa fa-video-camera"></i>
//							<span class="menu-text" onclick="window.location.href = 'video.html'"> 视频管理 </span>
//							<b class="arrow fa fa-angle-down"></b>
//						</a>
//						
//						
//						<b class="arrow"></b>
//
//						<ul class="submenu" style="display:block">
//							<li class="">
//								<a href="video_edi.html">
//									编辑
//								</a>
//							</li>
//						</ul>					
//					</li>