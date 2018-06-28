//var mainUrl = 'http://192.168.0.109:8020/chaohuo';//本地地址location.href
//var doName = "http://192.168.0.117:8082";//朱接口本地地址
var doName = "http://192.168.0.168:8092/manage";//田接口本地地址
// var doName = "https://www.chaohuo.net:7092/manage";//线上地址
var bucket = 'superfireoss';
var appid = '1255482466';
var region = 'sh';
var oSign,oSigns,oPath;
var sourceUrl;
var commonToken = $.cookie("tokenid");

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
//查看所有权限模块
function getAllRoleModels(type,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/getAllRoleModels?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: {
			type:type,
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("getAllRoleModels错误信息"+reqs.msg);
		}
	});	
}
//添加权限模块
function addRoleModel(roleModelName,roleModelValue,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/addRoleModel?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: {
			roleModelName:roleModelName,
			roleModelValue:roleModelValue
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("addRoleModel错误信息"+reqs.msg);
		}
	});	
}
//修改模块名字
function updateRoleModelInfo(id,roleModelName,roleModelValue,status,callback){
	var data = {
			id:id,
			roleModelName: roleModelName,
			roleModelValue: roleModelValue,
			status:status
		}
	data = JSON.stringify(data);
	$.ajax({
		type: "POST",
		url: doName + "/adminUser/updateRoleModelInfo?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data:data,
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("updateRoleModelInfo错误信息"+reqs.msg);
		}
	});	
}
//查看所有角色
function getAllRolesWithRoleModels(type,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/getAllRolesWithRoleModels?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: {
			type:type,
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("getAllRolesWithRoleModels错误信息"+reqs.msg);
		}
	});	
}
//添加角色
function addRole(roleName,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/addRole?token="+commonToken,
	    dataType: "json",
		contentType: "application/json",
		data: {
			roleName:roleName
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("addRole错误信息"+reqs.msg);
		}
	});	
}
//添加角色权限
function addAdminRoleModel(adminRoleId,roleModelIds,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/addAdminRoleModel?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data:{
			adminRoleId:adminRoleId,
			roleModelIds:roleModelIds
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("addAdminRoleModel错误信息"+reqs.msg);
		}
	});	
}
//删除角色权限
function delAdminRoleModel(adminRoleId,roleModelIds,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/delAdminRoleModel?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data:{
			adminRoleId:adminRoleId,
			roleModelIds:roleModelIds
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("delAdminRoleModel错误信息"+reqs.msg);
		}
	});	
}
//为管理员添加角色
function addAdminRole(adminUserId,adminRoleId,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/addAdminRole?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data:{
			adminUserId:adminUserId,
			adminRoleId:adminRoleId
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("addAdminRole错误信息"+reqs.msg);
		}
	});	
}
//添加管理员
function adminUserRegiste(username,password,callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/adminUserRegiste",
	    dataType: "json",
 		contentType: "application/json",
		data:{
			username:username,
			password:password
		},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("adminUserRegiste错误信息"+reqs.msg);
		}
	});	
}
//所有管理员
function getAllAdminUser(callback){
	$.ajax({
		type: "GET",
		url: doName + "/adminUser/getAllAdminUser?token="+commonToken,
	    dataType: "json",
 		contentType: "application/json",
		data:{},
		crossDomain: true,
		success: function(reqs) {
			callback(reqs);					
		},
		error: function(reqs) {
			alert("getAllAdminUser错误信息"+reqs.msg);
		}
	});	
}