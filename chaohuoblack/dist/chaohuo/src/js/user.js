!function(t){t(function(){function e(){y="",void 0==this.__index&&(this.__index=1),queryUsers(n,this.__index-1,s,function(e){if(console.log(e),1==e.code){for(var n=e.content.list,o=0;o<n.length;o++){switch(n[o].sex){case 0:case null:x="未知";break;case 1:x="男";break;case 2:x="女"}y+='<tr>\n\t\t\t\t\t\t\t\t\t<td><input type="checkbox"  class="user-onecheck"/></td>\n\t\t\t\t\t\t\t\t\t<td>'+n[o].id+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[o].name+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+x+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n[o].phone+'</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<span class="index-editor" dataid = '+n[o].id+'>编辑</span>\n\t\t\t\t\t\t\t\t\t\t<span class="index-query" dataid = '+n[o].id+">查看</span>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>"}t(".index-table").html(""),t(".index-table").append(k+y)}else alert(e.msg);var s=t(".user-onecheck");t(document).on("click",".user-allcheck",function(){for(var e=0;e<s.length;e++)t(this).is(":checked")?s[e].checked=!0:s[e].checked=!1})})}var n,o,s,a,i,c,r,l,d,u,h,m,p,f,w,g,v,b,x,k='<tr>\n\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t<input type="checkbox" class="user-allcheck"/>全选\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t<td>用户ID</td>\n\t\t\t\t\t\t\t\t<td>用户名称</td>\n\t\t\t\t\t\t\t\t<td>性别</td>\n\t\t\t\t\t\t\t\t<td>联系方式</td>\n\t\t\t\t\t\t\t\t<td>操作</td>\n\t\t\t\t\t\t\t</tr>',y="",o=0,q=0,s=10,S=document.getElementById("pager");queryUsers(n,1,s,function(t){o=t.content.totalPages,q=t.content.totalElements});new Pager({index:1,total:o,parent:S,onchange:e});t(document).on("click",".user-search",function(){n=t("input[name='userSearch']").val(),t(".pager-box").remove(),queryUsers(n,0,10,function(n){if(console.log(n),1==n.code){o=n.content.totalPages,q=n.content.totalElements,y="";for(var s=n.content.list,a=0;a<s.length;a++){switch(s[a].sex){case 0:case null:x="未知";break;case 1:x="男";break;case 2:x="女"}y+='<tr>\n\t\t\t\t\t\t\t\t\t<td><input type="checkbox"  class="user-onecheck"/></td>\n\t\t\t\t\t\t\t\t\t<td>'+s[a].id+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+s[a].name+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+x+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+s[a].phone+'</td>\n\t\t\t\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t\t\t\t<span class="index-editor" dataid = '+s[a].id+'>编辑</span>\n\t\t\t\t\t\t\t\t\t\t<span class="index-query" dataid = '+s[a].id+">查看</span>\n\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t</tr>"}t(".index-table").html(""),t(".index-table").append(k+y),t(".user-index .index-total").html("共有数据:"+q+"条");new Pager({index:1,total:o,parent:S,onchange:e})}else alert(n.msg)})}),t(".user-index .index-total").html("共有数据:"+q+"条"),t(document).on("click",".index-query",function(){i=t(this).attr("dataid"),queryOneUser(i,function(e){if(console.log(e),1==e.code){switch(e.content.sex){case 0:case null:x="未知";break;case 1:x="男";break;case 2:x="女"}e.content.communities;e.content.address=e.content.address||"",e.content.region=e.content.region||"",t(".main-content-inner").load("src/html/userdetail.html .user-detail-show",function(){t(".user-detail-show .user-selflist").html(""),c="",t(".user-detail-show .user-head").attr("src",e.content.avatar),t(".user-detail-show .user-name").html(e.content.name),t(".user-detail-show .user-sex").html(x),t(".user-detail-show .user-company").html(e.content.company),t(".user-detail-show .user-job").html(e.content.position),t(".user-detail-show .user-address").html(e.content.region+e.content.address),t(".user-detail-show .user-mobile").html(e.content.phone),t(".user-detail-show .user-qq").html(e.content.phone),t(".user-detail-show .user-wx").html(e.content.wx),t(".user-detail-show .user-mail").html(e.content.mail),t(".user-detail-show .user-birthday").html(e.content.birthDate),t(".user-detail-show .user-no").html(e.content.id),t(".user-detail-show .user-sign").html(e.content.signature),t(".user-detail-show .user-qrcode").attr("src",e.content.qrCode);for(var n=0;n<e.content.communities.length;n++)c+=e.content.communities[n].name+",";t(".user-detail-show .user-selflist").append(c)})}})}),t(document).on("click",".index-editor",function(){a=t(this),i=t(this).attr("dataid"),queryOneUser(i,function(e){if(console.log(e),1==e.code){switch(e.content.sex){case 0:case null:x="未知";break;case 1:x="男";break;case 2:x="女"}e.content.communities;t(".main-content-inner").load("src/html/usereditor.html .user-bian-show",function(){t(".user-bian-show .user-selflist").html(""),c="",t(".user-bian-show .user-head").attr("src",e.content.avatar),t(".user-bian-show .user-name").val(e.content.name),t(".user-bian-show .user-company").val(e.content.company),t(".user-bian-show .user-job").val(e.content.position),t(".user-bian-show .user-qq").html(e.content.phone),t(".user-bian-show .user-mobile").html(e.content.phone),t(".user-bian-show .user-wx").html(e.content.wx),t(".user-bian-show .user-mail").val(e.content.mail),t(".user-bian-show .user-birthday").val(e.content.birthDate),t(".user-bian-show .user-no").val(e.content.id),t(".user-bian-show .user-sign").val(e.content.signature),t(".user-bian-show .user-qrcode").attr("src",e.content.qrCode),t("#city").citySelect({prov:"上海",nodata:"none",required:!0}),t(document).on("click",".user-confirm",function(){d=t(".address-detail").val(),u=r,h=t(".user-company").val(),m=t(".user-no").val(),p=t(".user-mail").val(),f=t(".user-name").val(),w=t(".user-job").val(),g=t(".prov").val()+t(".city").val()+t(".dist").val(),null==t(".dist").val()&&(g=t(".prov").val()+t(".city").val()),v=t('input[type="radio"]:checked').val(),b=t(".user-sign").val(),console.log(d),modifyUser(d,u,void 0,h,m,p,f,w,g,v,b,function(t){console.log(t),1==t.code?location.reload():alert(t.msg)})}),t(document).on("click",".user-cancel",function(){location.reload()})})}})}),t(document).on("change",".user-upa-file",function(e){l=this.files,console.log(l[0].name),upLoad(t.cookie("tokenid"),l[0].name,"B",function(t){console.log(t),oSign=t.content.oneEffectiveSign,oSigns=t.content.periodEffectiveSign,oPath=t.content.cosPath,imgJSSDK(oSigns,oSign,oPath,l[0],function(t){r=t})});var n=new FileReader;n.readAsDataURL(l[0]),n.onload=function(e){if(e.total/1024/1024>=2)return void alert("文件大小大于2M");t(".user-head").attr("src",this.result)}}),t(document).on("click",".user-detail-del",function(){location.reload()})})}(jQuery);