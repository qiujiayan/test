define(function (require, exports, module) {
	//	if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){//苹果设备
	//		doName = "https://www.chaohuo.net:7083/app";//线上地址
	//		webDoName = "https://www.chaohuo.net:7083/web";	
	//  }


	//获取微信openid
	function getOpenid(code, show, callback) {
		alert(code);
		$.ajax({
			type: "GET",
			url: webDoName + "/user/getOpenid?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				code: code,
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//红包余额支付
	function walletAddRedPacketOrder(targetId, targetType, orderType, yMoney, dsc, redPacketCount, tradetType, token, payPassWord, show, callback) {
		console.log(redPacketCount);
		console.log(targetType);
		// var _url='';
		// if(show==null){
		// 	_url = doName + "/redPacket/tokenMethod/walletAddRedPacketOrder?token="+token;
		// }
		// else{
		// 	_url = doName + "/redPacket/tokenMethod/walletAddRedPacketOrder?token="+token+"&show="+show;
		// }
		var redyueData = {
			targetId: targetId,
			targetType: targetType,
			orderType: orderType,
			yMoney: yMoney,
			dsc: dsc,
			redPacketCount: redPacketCount,
			tradetType: tradetType,
			payPassWord: payPassWord
		}
		var redyueData = JSON.stringify(redyueData);
		console.log(redyueData);

		$.ajax({
			type: "POST",
			url: doName + "/redPacket/tokenMethod/walletAddRedPacketOrder?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: redyueData,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//红包支付宝支付
	function zfbAddRedPacketOrder(targetId, targetType, orderType, yMoney, dsc, redPacketCount, tradetType, token, show, callback) {
		var redZfbData = {
			targetId: targetId,
			targetType: targetType,
			orderType: orderType,
			yMoney: yMoney,
			dsc: dsc,
			redPacketCount: redPacketCount,
			tradetType: tradetType,
		}
		var redZfbData = JSON.stringify(redZfbData);
		$.ajax({
			type: "POST",
			url: doName + "/redPacket/tokenMethod/zfbAddRedPacketOrder?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: redZfbData,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//红包微信支付
	function wxAddRedPacketOrder(targetId, targetType, orderType, yMoney, dsc, redPacketCount, tradetType, openid, token, show, callback) {
		var redWxData = {
			targetId: targetId,
			targetType: targetType,
			orderType: orderType,
			yMoney: yMoney,
			dsc: dsc,
			redPacketCount: redPacketCount,
			tradetType: tradetType,
			openid: openid
		}
		var redWxData = JSON.stringify(redWxData);
		$.ajax({
			type: "POST",
			url: doName + "/redPacket/tokenMethod/wxAddRedPacketOrder?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: redWxData,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//微信统一下单支付 支付类型tradetType APP MWEB
	function wxjoinCommunityUnifiedOrder(communityId, tradetType, token, openid, shareUserId, show, callback) {
		// console.log(communityId)
		$.ajax({
			type: "GET",
			url: doName + "/pay/tokenMethod/wx/joinCommunityUnifiedOrder?show=" + show,
			dataType: "json",
			data: {
				communityId: communityId,
				tradetType: tradetType,
				token: token,
				openid: openid,
				shareUserId: shareUserId
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//微信添加充值订单
	function wxRecharge(token, tradetType, openid, totalAmount, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/wxRecharge?show=" + show,
			dataType: "json",
			data: {
				token: token,
				tradetType: tradetType,
				openid: openid,
				totalAmount: totalAmount
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//支付宝====入群===统一下单(获取orderStr)
	function zfbjoinCommunityUnifiedOrder(communityId, tradetType, token, shareUserId, show, callback) {

		console.log(tradetType);
		console.log(token);
		console.log(shareUserId);
		console.log(show);
		$.ajax({
			type: "GET",
			url: doName + "/pay/tokenMethod/zfb/joinCommunityUnifiedOrder?show=" + show,
			dataType: "json",
			data: {
				communityId: communityId,
				tradetType: tradetType,
				token: token,
				shareUserId: shareUserId
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//查询入群订单状态
	function joinCommunityOrderQuery(no, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/pay/tokenMethod/joinCommunityOrderQuery?show=" + show,
			dataType: "json",
			data: {
				no: no
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//查看二维码详情
	function getQcCodeDetail(targetId, targetType, shareUserId, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/shareQrCode/getQcCodeDetail?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				targetId: targetId,
				targetType: targetType,
				shareUserId: shareUserId
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//获取微信js权限参数
	function getWX(reqUrl, show, callback) {
		$.ajax({
			type: "GET",
			url: webDoName + "/user/getWxSign?show=" + show,
			dataType: "json",
			data: {
				reqUrl: reqUrl
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//获取验证码
	function getVerificationCode(phone, doType, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/user/getVerificationCode?show=" + show,
			dataType: "json",
			data: {
				phone: phone,
				doType: doType
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//用户注册
	function userRegiste(phone, code, password, show, callback) {
		$.ajax({
			type: "GET",
			url: webDoName + "/user/userRegiste?show=" + show,
			dataType: "json",
			data: {
				phone: phone,
				code: code,
				password: password
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//用户登录
	function userLogin(loginType, phone, password, show, callback) {
		var data = {
			loginType: loginType,
			phone: phone,
			password: password
		}
		var data = JSON.stringify(data);
		$.ajax({
			type: "POST",
			url: webDoName + "/user/userLogin?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: data,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//查看社群详情
	function getCommunityInfo(communityId, token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/community/tokenMethod/getCommunityInfo?show=" + show,
			dataType: "json",
			data: {
				communityId: communityId,
				token: token,
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//密码入群、直接入群、支付入群
	function joinCommunity(communityId, password, shareUserId, token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/community/tokenMethod/joinCommunity?show=" + show,
			dataType: "json",
			data: {
				communityId: communityId,
				password: password,
				shareUserId: shareUserId,
				token: token,
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//群主同意入群 imHxFriendUserId社群id  类型type 0,好友 1,社群 默认是0
	function addImRyNotice(imRyFriendUserId, type, token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/user/tokenMethod/addImRyNotice?show=" + show,
			dataType: "json",
			data: {
				imRyFriendUserId: imRyFriendUserId,
				type: type,
				token: token,
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//最新版本地址
	function getLastVersion(versionName, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/appVersion/getLastVersion?show=" + show,
			dataType: "json",
			data: {
				versionName: versionName
			},
			async: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//获取动态
	function getUserDynamicDetail(userDynamicId, pageNum, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/dynamic/getUserDynamicDetail?show=" + show,
			dataType: "json",
			data: {
				userDynamicId: userDynamicId,
				pageNum: pageNum
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//进入提现页面
	function getWithdeawPage(token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/getWithdeawPage?show=" + show,
			dataType: "json",
			data: {
				token: token,
			},
			async: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//我的钱包明细列表
	function getMyWalletInfos(token, pageNum, show, callback) {
		// var _url='';
		// if(show==null){
		// 	_url = doName + "/wallet/tokenMethod/getMyWalletInfos?token="+token;
		// }
		// else{
		// 	_url = doName + "/wallet/tokenMethod/getMyWalletInfos?token="+token+"&show="+show;
		// }

		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/getMyWalletInfos?show=" + show,
			// url: _url,
			dataType: "json",
			data: {
				token: token,
				pageNum: pageNum
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//查询钱包明细详情
	function getMyWalletDetail(token, orderId, walletDetailType, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/getMyWalletDetail?show=" + show,
			dataType: "json",
			data: {
				token: token,
				orderId: orderId,
				walletDetailType: walletDetailType
			},
			async: false,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//查询绑定支付账户信息
	function getOneWithdrawNumber(token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/getOneWithdrawNumber?show=" + show,
			dataType: "json",
			data: {
				token: token
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//提现申请
	function withdrawMoney(token, payPassword, money, tableId, show, callback) {
		console.log(payPassword);
		$.ajax({
			type: "GET",
			url: doName + "/wallet/tokenMethod/withdrawMoney?show=" + show,
			dataType: "json",
			data: {
				token: token,
				payPassword: payPassword,
				money: money,
				tableId: tableId
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//绑定支付宝账号
	function addWithdrawNumber(phone, name, cardNumber, token, show, callback) {
		var zfbdata = {
			phone: phone,
			name: name,
			cardNumber: cardNumber
		}
		var zfbdata = JSON.stringify(zfbdata);
		$.ajax({
			type: "POST",
			url: doName + "/wallet/tokenMethod/addWithdrawNumber?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: zfbdata,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}
	//修改支付宝账号
	function updateWithdrawNumber(phone, name, cardNumber, token, show, callback) {
		var zfbdata = {
			phone: phone,
			name: name,
			cardNumber: cardNumber
		}
		var zfbdata = JSON.stringify(zfbdata);
		$.ajax({
			type: "POST",
			url: doName + "/wallet/tokenMethod/updateWithdrawNumber?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: zfbdata,
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//消息记录
	function getOneMessage(id, token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/messageForward/tokenMethod/getOneMessage?show=" + show,
			dataType: "json",
			data: {
				id: id,
				token: token
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	// 验证支付密码（修改密码时，旧密码验证）
	function isCheckPayPassword(token, payPassWord, show, callback) {
		console.log(payPassWord);
		// console.log(reqs);
		var redZfbData = {
			payPassWord: payPassWord
		}
		var yzdata = JSON.stringify(redZfbData);
		$.ajax({
			type: "POST",
			url: doName + "/user/tokenMethod/isCheckPayPassword?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: yzdata,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		})
	}
	// 验证密码和验证码
	function forgetPayPassword(token, code, paypassword, show, callback) {
		// console.log(payPasswordInfo.payPassWord);
		var redZfbData = {
			code: code,
			payPassWord: paypassword
		}
		var yzdata = JSON.stringify(redZfbData);
		$.ajax({
			type: "POST",
			url: doName + "/user/tokenMethod/forgetPayPassword?token=" + token + "&show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: yzdata,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		})
	}
	// 判断是否设置支付密码
	function checkSetPayPassword(token, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/user/tokenMethod/checkSetPayPassword?show=" + show,
			dataType: "json",
			data: {
				token: token
			},
			// xhrFields: {
			// 	withCredentials: true
			// },
			// crossDomain: true,
			// beforeSend: function() {},
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//设置支付密码
	function setPayPassword(token, password, confirmPassword, type, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/user/tokenMethod/setPayPassword?show=" + show,
			dataType: "json",
			data: {
				token: token,
				password: password,
				type: type
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	// 获取验证码
	function getVerificationCodeByToken(token, doType, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/user/tokenMethod/getVerificationCodeByToken?show=" + show,
			dataType: "json",
			data: {
				token: token,
				doType: doType
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	// 营销模块--查看我的收益

	function getAppCommission(loginUserId, token, communityId, pageNum, pageSize, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/commission/tokenMethod/getAppCommission?show=" + show,
			dataType: "json",
			data: {
				token: token,
				communityId: communityId,
				pageNum: pageNum,
				pageSize: pageSize,
			},
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			beforeSend: function () { },
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		})
	}



	//查看营销二维码详情
	function getCommunitySellCode(token, loginUserId, shareUserId, communityId, show, callback) {
		console.log(token);
		console.log(communityId);
		console.log(shareUserId);
		$.ajax({
			type: "GET",
			url: doName + "/shareQrCode/getCommunitySellCode?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				token: token,
				loginUserId: loginUserId,
				shareUserId: shareUserId,
				communityId: communityId
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//查看我的一级铁杆
	function getAppMercenary(loginUserId, token, communityId, pageNum1, pageSize, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/commission/tokenMethod/getAppMercenary?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				loginUserId: loginUserId,
				token: token,
				communityId: communityId,
				pageNum: pageNum1,
				pageSize: pageSize
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//查看我的二级铁杆
	function getAppTwoMercenary(loginUserId, token, communityId, pageNum2, pageSize, show, callback) {
		$.ajax({
			type: "GET",
			url: doName + "/commission/tokenMethod/getAppTwoMercenary?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				loginUserId: loginUserId,
				token: token,
				communityId: communityId,
				pageNum: pageNum2,
				pageSize: pageSize
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}

	//铁杆的铁杆
	function getAppMercenaryMercenary(loginUserId, token,mercenaryId, communityId, pageNum, pageSize, show, callback) {
		console.log(loginUserId);
		// alert(token);
		console.log(mercenaryId);
		console.log(communityId);
		$.ajax({
			type: "GET",
			url: doName + "/commission/tokenMethod/getAppMercenaryMercenary?show=" + show,
			dataType: "json",
			contentType: "application/json",
			data: {
				loginUserId: loginUserId,
				token: token,
				mercenaryId:mercenaryId,
				communityId: communityId,
				pageNum: pageNum,
				pageSize: pageSize
			},
			async: false,
			crossDomain: true,
			success: function (reqs) {
				callback(reqs);
			},
			error: function (reqs) {
				$.dialog({
					content: reqs.msg,
					title: "alert",
					time: "2000"
				})
			}
		});
	}


	exports.getOpenid = getOpenid;
	exports.getQcCodeDetail = getQcCodeDetail;
	exports.getWX = getWX;
	exports.getVerificationCode = getVerificationCode;
	exports.userRegiste = userRegiste;
	exports.userLogin = userLogin;
	exports.getCommunityInfo = getCommunityInfo;
	exports.joinCommunity = joinCommunity;
	exports.addImRyNotice = addImRyNotice;
	exports.wxjoinCommunityUnifiedOrder = wxjoinCommunityUnifiedOrder;
	exports.wxRecharge = wxRecharge;
	exports.zfbjoinCommunityUnifiedOrder = zfbjoinCommunityUnifiedOrder;
	exports.joinCommunityOrderQuery = joinCommunityOrderQuery;
	exports.getLastVersion = getLastVersion;
	exports.getUserDynamicDetail = getUserDynamicDetail;
	exports.getWithdeawPage = getWithdeawPage;
	exports.getMyWalletInfos = getMyWalletInfos;
	exports.getMyWalletDetail = getMyWalletDetail;
	exports.getOneWithdrawNumber = getOneWithdrawNumber;
	exports.withdrawMoney = withdrawMoney;
	exports.addWithdrawNumber = addWithdrawNumber;
	exports.updateWithdrawNumber = updateWithdrawNumber;
	exports.getOneMessage = getOneMessage;
	exports.walletAddRedPacketOrder = walletAddRedPacketOrder;
	exports.wxAddRedPacketOrder = wxAddRedPacketOrder;
	exports.zfbAddRedPacketOrder = zfbAddRedPacketOrder;
	exports.setPayPassword = setPayPassword;
	exports.isCheckPayPassword = isCheckPayPassword;
	exports.forgetPayPassword = forgetPayPassword;
	exports.checkSetPayPassword = checkSetPayPassword;
	exports.getVerificationCodeByToken = getVerificationCodeByToken;
	exports.getAppCommission = getAppCommission;
	exports.getCommunitySellCode = getCommunitySellCode;
	exports.getAppMercenary = getAppMercenary;
	exports.getAppTwoMercenary = getAppTwoMercenary;
	exports.getAppMercenaryMercenary = getAppMercenaryMercenary;
});
