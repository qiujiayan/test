!function(t){t(function(){function e(){z="",checkList(w,F,p,P,q,this.__index-1,10,function(e){if(console.log(e),1==e.code){for(var n=e.content.list,a=0;a<n.length;a++){switch(n[a].status){case 0:B="永久封号";break;case 1:B="正常";break;case 2:B="封号1天";break;case 3:B="封号3天";break;case 4:B="封号7天"}switch(n[a].privateFlag){case 1:E="私有";break;case 0:E="公开"}switch(n[a].liveFlag){case 0:M="未申请";break;case 1:M="申请中";break;case 2:M="申请通过";break;case 3:M="申请未通过"}z+='<tr>\n\t\t\t\t\t\t\t\t\t<td><input type="checkbox"  class="index-checkone"/></td>\n\t\t\t\t\t\t\t\t\t<td>'+n[a].id+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[a].name+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[a].no+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[a].communityCategoryName+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[a].userTotal+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+B+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+M+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+E+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[a].recommend+'</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<span class="index-editor" dataid = '+n[a].id+'>编辑</span>\n\t\t\t\t\t\t\t\t\t\t<span class="index-query" dataid = '+n[a].id+">查看</span>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>"}t(".index-table").html(""),t(".index-table").append(O+z)}else alert("错误信息"+e.msg)});var e=t(".index-checkone");t(".index-checkall").on("click",function(){for(var n=0;n<e.length;n++)t(this).is(":checked")?e[n].checked=!0:e[n].checked=!1})}var n,a,s,i,l,c,o,d,r,u,m,p,g,f,v,h,y,b,k,x,j,w,F,q,P,_,L,S,E,M,D=t.cookie("tokenid"),N="",T="",B="正常",I="",C="";queryList(D,function(e){if(1==e.code){for(var n=0;n<e.content.length;n++)N+='<option value = "'+e.content[n].id+'">'+e.content[n].name+"</option>";t(".index-leibie").append(N),t("select[name='setup-lei']").append(N),t("select[name='bianji-type']").append(N)}}),queryOnlineList(D,function(e){if(1==e.code){for(var n=0;n<e.content.length;n++)T+='<option value = "'+e.content[n].id+'">'+e.content[n].name+"</option>";t("select[name='setup-lei-online']").append(T)}});var O='<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<input type="checkbox" class="index-checkall"/>全选\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>社群ID</td>\n\t\t\t\t\t\t\t\t<td>社群名称</td>\n\t\t\t\t\t\t\t\t<td>社群账号</td>\n\t\t\t\t\t\t\t\t<td>社群类别</td>\n\t\t\t\t\t\t\t\t<td>社群人数</td>\n\t\t\t\t\t\t\t\t<td>状态</td>\n\t\t\t\t\t\t\t\t<td>直播权限</td>\n\t\t\t\t\t\t\t\t<td>标识</td>\n\t\t\t\t\t\t\t\t<td>推荐</td>\n\t\t\t\t\t\t\t\t<td>操作</td>\n\t\t\t\t\t\t\t</tr>',z="",G=0,R=0;checkList(w,F,p,P,q,0,10,function(t){1==t.code?(G=t.content.totalPages,R=t.content.totalElements):alert("错误信息"+t.msg)}),t(document).on("click",".index-search",function(){w=t('input[name="header-search-name"]').val(),F=t('select[name="header-search-type"]').val(),q=t('input[name="header-search-status"]').val(),checkList(w,F,p,P,q,0,10,function(n){if(console.log(n),1==n.code){z="",G=n.content.totalPages,R=n.content.totalElements;for(var a=n.content.list,s=0;s<a.length;s++){switch(a[s].status){case 0:B="永久封号";break;case 1:B="正常";break;case 2:B="封号1天";break;case 3:B="封号3天";break;case 4:B="封号7天"}switch(a[s].privateFlag){case 1:E="私有";break;case 0:E="公开"}switch(a[s].liveFlag){case 0:M="封播";break;case 1:M="正常"}z+='<tr>\n\t\t\t\t\t\t\t\t\t<td><input type="checkbox"  class="index-checkone"/></td>\n\t\t\t\t\t\t\t\t\t<td>'+a[s].id+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+a[s].name+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+a[s].no+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+a[s].communityCategoryName+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+a[s].userTotal+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+B+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+M+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+E+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+a[s].recommend+'</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<span class="index-editor" dataid = '+a[s].id+'>编辑</span>\n\t\t\t\t\t\t\t\t\t\t<span class="index-query" dataid = '+a[s].id+">查看</span>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>"}t(".index-table").html(""),t(".index-table").append(O+z),t(".pager-box").remove(),_=new Pager({index:1,total:G,parent:U,onchange:e})}else alert("错误信息"+n.msg)})});var U=document.getElementById("pager");_=new Pager({index:1,total:G,parent:U,onchange:e}),t(".index-total").html("共有数据："+R+"条"),t(".index-table").on("click",".index-editor",function(){g=t(this).attr("dataid"),a=t(this).attr("dataid"),checkOneList(a,function(e){if(console.log(e),1==e.code){t(".bianji-detail-people").empty(),I="",t(".setup-mainlist").css("display","none"),t(".setup-binaji").css("display","block"),t(".bianji-name").val(e.content.name),t(".bianji-zhang").html(e.content.no),t(".bianji-num").val(e.content.userTotal),t(".bianji-host").html(e.content.communityMasterName),t("select[name='bianji-type'] option[value='"+e.content.type+"']").attr("selected",!0),t("select[name='bianji-status'] option[value='"+e.content.status+"']").attr("selected",!0),t(".bianji-textarea").val(e.content.introduction);for(var n=0;n<e.content.users.length;n++)null==e.content.users[n].name&&(e.content.users[n].name="未定义"),null==e.content.users[n].avatar&&(e.content.users[n].avatar="assets/images/gallery/image-1.jpg"),I+='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+e.content.users[n].id+'"  communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.users[n].avatar+'"/>\t\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.users[n].name+'</span>\n\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t</div>';t(".bianji-detail-people").append(I+'<div class="index-img2 col-md-1 col-sm-1 col-xs-3 addusers">添加</div>\n\t\t\t\t\t\t<input type="text" placeholder="添加成员账号(必填)" class="addusers-mobile"/>')}else alert("错误信息"+e.msg)}),queryFiles(a,L,S,0,10,function(e){if(console.log(e),1==e.code){t(".bianji-detail-file").empty(),C="";for(var n=0;n<e.content.list.length;n++)null==e.content.list[n].name&&(e.content.list[n].name="未定义"),null==e.content.list[n].url&&(e.content.list[n].url="assets/images/gallery/image-1.jpg"),C+='<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="'+e.content.list[n].id+'"  communityid="'+a+'">\n    \t\t\t\t\t\t\t\t\t<a href="'+e.content.list[n].url+'" target="_blank">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.list[n].url+'"/>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.list[n].name+"</span>\n\t\t\t\t\t\t\t\t\t</div>";t(".bianji-detail-file").append(C)}else alert("错误信息"+e.msg)}),t(".bianji-detail-people").on("click",".addusers",function(){var e=t(".addusers-mobile").val();checkPhone(e)?queryPhone(e,function(e){if(console.log(e.content),1==e.code){var n=e.content.name,s=e.content.avatar;null==n&&(n="未定义"),null==s&&(s="assets/images/gallery/image-1.jpg");var i=e.content.id;addSetupNum(a,i,"U",function(e){if(console.log(e),1==e.code){var l='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+i+'" communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t\t<img src="'+s+'"/>\t\n\t\t\t\t\t\t\t\t\t\t\t<span>'+n+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t\t</div>';t(".bianji-detail-people").prepend(l),alert("添加成功"),t(".addusers-mobile").val("")}else alert("错误信息"+e.msg)})}else alert("错误信息"+e.msg)}):alert("手机号错误!")})}),t(".index-table").on("click",".index-query",function(){a=t(this).attr("dataid"),console.log(a),checkOneList(a,function(e){if(console.log(e),1==e.code){switch(t(".setup-mainlist").css("display","none"),t(".setup-detail").css("display","block"),I="",t(".setup-detail-people").empty(),e.content.status){case 0:B="永久封号";break;case 1:B="正常";break;case 2:B="封号1天";break;case 3:B="封号3天";break;case 4:B="封号7天"}switch(e.content.privateFlag){case 1:E="私有";break;case 0:E="公开"}switch(e.content.liveFlag){case 0:M="封播";break;case 1:M="正常"}t(".setup-detail-name").html(e.content.name),t(".setup-detail-zhang").html(e.content.no),t(".setup-detail-num").html(e.content.userTotal),t(".setup-detail-host").html(e.content.communityMasterName),t(".setup-detail-type").html(e.content.communityCategoryName),t(".setup-detail-status").html(B),t(".setup-detail-liveFlag").html(M),t(".setup-detail-admin").html(e.content.admin),t(".setup-detail-time").html(formatDate(new Date(e.content.createTime))),t(".setup-detail-textarea").html(e.content.introduction),t(".setup-detail-recomend").html(e.content.recommend),t(".setup-detail-privateFlag").html(void 0),t(".setup-detail-liveFlag").html(void 0);for(var n=0;n<e.content.users.length;n++)null==e.content.users[n].name&&(e.content.users[n].name="未定义"),null==e.content.users[n].avatar&&(e.content.users[n].avatar="assets/images/gallery/image-1.jpg"),I+='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+e.content.users[n].id+'" communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.users[n].avatar+'"/>\t\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.users[n].name+'</span>\n\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t</div>';t(".setup-detail-people").append(I)}else console.log(e.msg),alert("错误信息"+e.msg)}),queryFiles(a,L,S,0,10,function(e){if(console.log(e),1==e.code){t(".bianji-detail-file").empty(),C="";for(var n=0;n<e.content.list.length;n++)null==e.content.list[n].name&&(e.content.list[n].name="未定义"),null==e.content.list[n].url&&(e.content.list[n].url="assets/images/gallery/image-1.jpg"),C+='<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="'+e.content.list[n].id+'"  communityid="'+a+'">\n    \t\t\t\t\t\t\t\t\t<a href="'+e.content.list[n].url+'" target="_blank">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.list[n].url+'"/>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.list[n].name+"</span>\n\t\t\t\t\t\t\t\t\t</div>";t(".bianji-detail-file").append(C)}else alert("错误信息"+e.msg)})}),t(".setup-cel").on("click",function(){t(".setup-detail").css("display","none"),t(".setup-mainlist").css("display","block")}),t(".setup-cel-search").on("click",function(){t(".search-allusers").css("display","none"),t(".setup-binaji").css("display","block")}),t(".setup-upa-file").on("change",function(e){files=this.files,upLoad(t.cookie("tokenid"),files[0].name,"B",function(t){oSign=t.content.oneEffectiveSign,oSigns=t.content.periodEffectiveSign,oPath=t.content.cosPath,imgJSSDK(oSigns,oSign,oPath,files[0],function(t){n=t})});var a=new FileReader;a.readAsDataURL(files[0]),a.onload=function(e){if(e.total/1024/1024>=2)return void alert("文件大小大于2M");t(".banner-img").attr("src",this.result)}}),t(".setup-list-btn").on("click",function(){var e=t("input[name='setup-phone']").val();switch(queryPhone(e,function(t){console.log(t),1==t.code?i=t.content.id:alert("错误信息"+t.msg)}),s=t("select[name='setup-lei-online']").val(),l=t("textarea[name='setup-textarea']").val(),c=t("select[name='setup-way']").val(),d=t("input[name='setup-name']").val(),m=t("select[name='setup-type']").val(),p=t("select[name='setup-privateFlag']").val(),u=n,c){case 1:o="",r="";break;case 2:o=t("input[name='setup-money']").val(),r="";break;case 3:o="",r=t("input[name='setup-password']").val()}console.log(s+","+i+","+l+","+c+","+d+","+m),setupList(s,i,l,c,o,d,r,u,p,m,function(t){console.log(t),1==t.code?(alert("创建社群成功"),location.reload()):alert("错误信息"+t.msg)})}),t(".setup-list-cel").on("click",function(){t(".setup-list").css("display","none"),t(".setup-mainlist").css("display","block")}),t(".bianji-con").on("click",function(){f=t(".bianji-name").val(),v=t(".bianji-textarea").val(),h=t(".bianji-recomend").val(),y=t("select[name='bianji-type']").val(),b=t(".bianji-num").val(),k=t("select[name='bianji-status']").val(),x=t("select[name='bianji-privateFlag']").val(),j=t("select[name='bianji-liveFlag']").val(),console.log(g+","+f+","+v+","+h+","+y+","+b+","+k),modifyShequn(g,f,v,x,h,y,b,k,j,function(t){console.log(t),1==t.code?location.reload():alert("错误信息"+t.msg)})}),t(".bianji-cel").on("click",function(){t(".setup-binaji").css("display","none"),t(".setup-mainlist").css("display","block")});var A,J,K="",Q=document.getElementById("pager2");t(document).on("click",".index-more",function(){J=t(this).parent().parent().find(".bianji-name").val(),t(".setup-binaji").css("display","none"),t(".setup-detail").css("display","none"),t(".search-allusers").css("display","block"),void 0==(a=t(this).parent().find(".mana-user").attr("communityid"))&&(a=t(this).parent().find(".mana-user").attr("communityid"));var e,n,s=50;console.log(a),queryMember(a,e,n,0,s,function(i){function l(){console.log(A),K="",queryMember(a,e,n,this.__index-1,s,function(e){if(console.log(e),1==e.code&&e.content.list){for(var n=e.content.list,s=0;s<n.length;s++)null==n[s].name&&(n[s].name="未定义"),null==n[s].avatar&&(n[s].avatar="assets/images/gallery/image-1.jpg"),K+='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+n[s].id+'"  communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="'+n[s].avatar+'"/>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<span>'+n[s].name+'</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>';t(".search-allusers .index-img").html(""),t(".search-allusers .index-img").append(K)}})}if(console.log(i),A=i.content.totalPages,1==i.code){for(var c=i.content.list,o=0;o<c.length;o++)null==c[o].name&&(c[o].name="未定义"),null==c[o].avatar&&(c[o].avatar="assets/images/gallery/image-1.jpg"),K+='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+c[o].id+'" communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t\t<img src="'+c[o].avatar+'"/>\t\n\t\t\t\t\t\t\t\t\t\t\t<span>'+c[o].name+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t\t</div>';t(".search-allusers .setup-detail-name").html(J),t(".search-allusers .index-img").append(K)}else alert("错误信息"+i.msg);new Pager({index:1,total:A,parent:Q,onchange:l})})});var X,Y="",H=document.getElementById("pager3");t(document).on("click",".index-more-file",function(){t(".setup-binaji").css("display","none"),t(".setup-detail").css("display","none"),t(".search-allfiles").css("display","block"),a=t(this).parent().find(".setup-files").attr("communityid"),void 0==a&&(a=t(this).parent().find(".setup-files").attr("communityid")),console.log(a),queryFiles(a,L,S,0,50,function(e){function n(){console.log(X),Y="",queryFiles(a,L,S,this.__index-1,50,function(e){if(console.log(e),1==e.code&&e.content.list.length>0){t(".setup-detail-files").empty(),C="";for(var n=0;n<e.content.list.length;n++)null==e.content.list[n].name&&(e.content.list[n].name="未定义"),null==e.content.list[n].url&&(e.content.list[n].url="assets/images/gallery/image-1.jpg"),C+='<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="'+e.content.list[n].id+'"  communityid="'+a+'">\n\t\t    \t\t\t\t\t\t\t\t\t<a href="'+e.content.list[n].url+'" target="_blank">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.list[n].url+'"/>\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t<span>'+e.content.list[n].name+"</span>\n\t\t\t\t\t\t\t\t\t\t\t</div>";t(".setup-detail-files").append(C)}else alert("错误信息"+e.msg)})}if(X=e.content.totalPages,console.log(e),1==e.code&&e.content.list.length>0){t(".setup-detail-files").empty(),C="";for(var s=0;s<e.content.list.length;s++)null==e.content.list[s].name&&(e.content.list[s].name="未定义"),null==e.content.list[s].url&&(e.content.list[s].url="assets/images/gallery/image-1.jpg"),C+='<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="'+e.content.list[s].id+'"  communityid="'+a+'">\n    \t\t\t\t\t\t\t\t\t<a href="'+e.content.list[s].url+'" target="_blank">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.list[s].url+'"/>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.list[s].name+"</span>\n\t\t\t\t\t\t\t\t\t</div>";t(".setup-detail-files").append(C)}else alert("错误信息"+e.msg);new Pager({index:1,total:X,parent:H,onchange:n})})}),t(document).on("click",".setup-cel-files",function(){t(".search-allfiles").css("display","none"),t(".setup-binaji").css("display","block")}),t(document).on("click",".search-search",function(){phone=t('input[name="search-mobile"]').val(),d=t('input[name="search-name"]').val(),queryMember(a,phone,d,0,1,function(e){if(console.log(e),1==e.code){t(".search-allusers .index-img").html(""),K="";for(var n=e.content.list,s=0;s<n.length;s++)null==n[s].name&&(n[s].name="未定义"),null==n[s].avatar&&(n[s].avatar="assets/images/gallery/image-1.jpg"),K+='<div class="col-md-1 col-sm-1 col-xs-3 mana-user" usersid="'+n[s].id+'" communityid="'+a+'">\n\t\t\t\t\t\t\t\t\t\t\t<img src="'+n[s].avatar+'"/>\t\n\t\t\t\t\t\t\t\t\t\t\t<span>'+n[s].name+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="fluid">禁言中</div>\n\t\t\t\t\t\t\t\t\t\t</div>';t(".search-allusers .index-img").append(K)}else alert("错误信息"+e.msg)})}),t(document).on("click",".search-files",function(){L=t('input[name="search-files"]').val(),queryFiles(a,L,S,0,50,function(e){if(console.log(e),1==e.code&&e.content.list.length>0){t(".setup-detail-files").empty(),C="";for(var n=0;n<e.content.list.length;n++)null==e.content.list[n].name&&(e.content.list[n].name="未定义"),null==e.content.list[n].url&&(e.content.list[n].url="assets/images/gallery/image-1.jpg"),C+='<div class="col-md-1 col-sm-1 col-xs-3 setup-files" usersid="'+e.content.list[n].id+'"  communityid="'+a+'">\n    \t\t\t\t\t\t\t\t\t<a href="'+e.content.list[n].url+'" target="_blank">\n\t\t\t\t\t\t\t\t\t\t<img src="'+e.content.list[n].url+'"/>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<span>'+e.content.list[n].name+"</span>\n\t\t\t\t\t\t\t\t\t</div>";t(".setup-detail-files").append(C)}else alert("错误信息"+e.msg)})});var V,a,W;t(".index-img ").on("contextmenu",".mana-user",function(e){console.log(t(this)),e.preventDefault();var e=event||window.event;return W=t(e.target).parent(),V=W.attr("usersid"),a=W.attr("communityid"),t(".img-mana").css({left:e.clientX+"px",top:e.clientY+"px"}),t(".img-mana").show(),console.log(V+","+a),!1}),t(".img-mana").on("click",".gag",function(){Gag(V,a,1e3,function(t){console.log(t),1==t.code&&(alert("此用户禁言成功"),W.find(".fluid").css("display","block"))})}),t(".img-mana").on("click",".delete",function(){console.log(V+","+a),delMember(V,a,function(t){console.log(t),1==t.code&&(alert("此用户已删除"),W.remove())})}),t(".img-mana").on("click",".ungag",function(){unbindGag(V,a,function(t){console.log(V+","+a),console.log(t),1==t.code?(alert("此用户解除禁言成功"),W.find(".fluid").css("display","none")):alert("错误信息"+t.msg)})}),window.onclick=function(e){t(".img-mana").css({display:"none"})}})}(jQuery);