!function(t){t(function(){function n(n){var o=t(n).parent().parent();console.log(o),o.prev().insertAfter(o)}function o(n){var o=t(n).parent().parent();o.next().insertBefore(o)}var e,a,i=t.cookie("tokenid"),d="",c="",l="",r="",s="<tr>\n\t\t\t\t\t\t\t\t<td>类别ID</td>\n\t\t\t\t\t\t\t\t<td>所有类别</td>\n\t\t\t\t\t\t\t\t<td>调整</td>\n\t\t\t\t\t\t\t\t<td>状态</td>\n\t\t\t\t\t\t\t</tr>";queryList(i,function(n){if(console.log(n),1==n.code){c="",d="";for(var o=0;o<n.content.length;o++){switch(n.content[o].status){case 1:e="已上线",a='<i class="menu-icon fa fa-long-arrow-up"></i>\n\t\t\t\t\t\t\t\t\t<i class="menu-icon fa fa-long-arrow-down"></i>';break;case 2:e="下线",a=""}d+='<option data-id = "'+n.content[o].id+'">'+n.content[o].name+"</option>",c+="<tr>\n\t\t\t\t\t\t\t\t\t<td>"+n.content[o].id+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+n.content[o].name+"</td>\n\t\t\t\t\t\t\t\t\t<td dataid = "+n.content[o].id+">"+a+"</td>\n\t\t\t\t\t\t\t\t\t<td>"+e+"</td>\n\t\t\t\t\t\t\t\t</tr>"}t(".index-man-sel").append(d),t(".index-table").html(""),t(".index-table").append(s+c)}else alert("错误信息"+n.msg)}),t(".index-lei-add").on("click",function(){var n=t(".index-text").val();""!=n?(console.log(n),addList(i,n,function(n){console.log(n),1==n.code?(t(".index-text").val(""),queryList(i,function(n){console.log(n.content);for(var o=0;o<n.content.length;o++)d+='<option data-id = "'+n.content[o].id+'">'+n.content[o].name+"</option>";t(".index-man-sel").append(d)}),location.reload()):alert("错误信息"+n.msg)})):alert("内容不能为空")}),t(".index-lei-que").on("click",function(){l=t(".index-man-sel").find("option:selected").attr("data-id"),r=t(".index-man-zh").find("option:selected").val(),ediList(i,l,r,function(t){console.log(t),1==t.code?(alert("已下线"),location.reload()):alert("错误信息"+t.msg)})});t(document).on("click",".fa-long-arrow-up",function(){var o=t(this),e=o.parent().attr("dataid");updateCommunityCategorySort(e,1,1,function(t){console.log(t),1==t.code?n(o):alert("向上排序错误"+t.msg)})}),t(document).on("click",".fa-long-arrow-down",function(){var n=t(this),e=n.parent().attr("dataid");updateCommunityCategorySort(e,0,1,function(t){console.log(t),1==t.code?o(n):alert("向下排序错误"+t.msg)})}),t(document).on("click",".search-online",function(){queryOnlineList(i,function(n){if(console.log(n),1==n.code){c="",d="";for(var o=0;o<n.content.length;o++)d+='<option data-id = "'+n.content[o].id+'">'+n.content[o].name+"</option>",c+="<tr>\n\t\t\t\t\t\t\t\t\t\t<td>"+n.content[o].id+"</td>\n\t\t\t\t\t\t\t\t\t\t<td>"+n.content[o].name+"</td>\n\t\t\t\t\t\t\t\t\t\t<td dataid = "+n.content[o].id+'>\n\t\t\t\t\t\t\t\t\t\t\t<i class="menu-icon fa fa-long-arrow-up"></i>\n\t\t\t\t\t\t\t\t\t\t\t<i class="menu-icon fa fa-long-arrow-down"></i>\n\t\t\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t\t\t\t<td>上线</td>\n\t\t\t\t\t\t\t\t\t</tr>';t(".index-man-sel").append(d),t(".index-table").html(""),t(".index-table").append(s+c)}else alert("错误信息"+n.msg)})})})}(jQuery);