define(["require", "exports"], function (require, exports) {
    /// <reference path="../../../../typings/angularjs/angular.d.ts"/>
    /// <reference path="server.ts"/>
    /// <reference path="../model/webimModel.ts"/>
    exports.export1 = 'hello world';
    var mainCtr = angular.module("webim.main.controller", ["webim.main.server", "webim.conversation.server"]);
    var IMGDOMAIN = "http://7xogjk.com1.z0.glb.clouddn.com/";
    var FILEDOMAIN = "http://o83059m7d.bkt.clouddn.com/";
    mainCtr.controller("mainController", ["$scope", "$state", "$window", "$timeout", "$http",
        "mainDataServer", "conversationServer", "mainServer", "RongIMSDKServer", "appconfig",
        function ($scope, $state, $window, $timeout, $http, mainDataServer, conversationServer, mainServer, RongIMSDKServer, appconfig) {
            var isConnecting = false;
            mainDataServer.loginUser.nickName = webimutil.CookieHelper.getCookie("userselfname");
            mainDataServer.loginUser.firstchar = webimutil.CookieHelper.getCookie("userselfavater");
            mainDataServer.loginUser.portraitUri = webimutil.CookieHelper.getCookie("userselfavater");
            if (!mainDataServer.loginUser.id) {
                var userid = webimutil.CookieHelper.getCookie("loginuserid"), usertoken = webimutil.CookieHelper.getCookie("loginusertoken");
                if (userid) {
                    mainDataServer.loginUser.id = userid;
                    mainDataServer.loginUser.token = usertoken;
                }
                else {
                    mainServer.user.logout().success(function () {
                        webimutil.CookieHelper.removeCookie("loginuserid");
                        mainDataServer.loginUser = new webimmodel.UserInfo();
                        conversationServer.historyMessagesCache.length = 0;
                        if (window.Electron) {
                            window.Electron.webQuit();
                        }
                        $state.go("account.signin");
                    });
                    return;
                }
            }
            mainServer.user.getInfoS(mainDataServer.loginUser.id).success(function (rep) {
                // alert("5354" + rep.code);
                if (rep.code == 1) {
                    mainDataServer.loginUser.nickName = rep.content.userInfo.name;
                    mainDataServer.loginUser.firstchar = webimutil.ChineseCharacter.getPortraitChar(rep.content.userInfo.name);
                    mainDataServer.loginUser.portraitUri = rep.content.userInfo.avatar;
                }
                if (rep.code == 3) {
                    alert("需要重新登录！");
                    window.location.href = "/#/account/signin";
                }
                else {
                }
            }).error(function () {
            });
            $scope.mainData = mainDataServer;
            $scope.$on('refreshSelectCon', function (event, data) {
                $scope.unSelect(data);
            });
            $scope.showState = {
                isPhone: false,
                isChat: false
            };
            $scope.switchbtn = {
                isFriendList: 1,
                issearchList: false
            };
            $scope.curCon = "";
            $scope.unSelect = function (curConVal) {
                if ($scope.curCon) {
                    $('#' + $scope.curCon).removeClass("selected");
                }
                $('#' + curConVal).addClass("selected");
                $scope.curCon = curConVal;
            };
            $scope.selectGo = function (id, type) {
                if ($scope.switchbtn.isFriendList) {
                    $state.go("main.friendinfo", { userid: id, groupid: "0", targetid: "0", conversationtype: "0" });
                }
                else {
                    $state.go("main.chat", { targetId: id, targetType: type }, { location: "replace" });
                }
            };
            $scope.selectGoGroup = function (id, type) {
                if ($scope.switchbtn.isFriendList) {
                    $state.go("main.groupinfo", { groupid: id, conversationtype: "0" });
                }
                else {
                    $state.go("main.chat", { targetId: id, targetType: type }, { location: "replace" });
                }
            };
            $scope.selectMember = function (item) {
                $scope.atShow = false;
            };
            $scope.searchControl = {};
            $scope.$watch('switchbtn.isFriendList', function (newVal, oldVal) {
                if (newVal === oldVal)
                    return;
                $scope.searchControl.clear();
            });
            $scope.search = function (content) {
                if (content.trim()) {
                    var friendList = [].concat.apply([], mainDataServer.contactsList.subgroupList.map(function (item) { return item.list; }));
                    $scope.switchbtn.issearchList = true;
                    $scope.searchList = {};
                    $scope.searchList.friendList = mainDataServer.contactsList.find(content, friendList) || [];
                    $scope.searchList.groupList = mainDataServer.contactsList.find(content, mainDataServer.contactsList.groupList) || [];
                }
                else {
                    $scope.switchbtn.issearchList = false;
                }
            };
            $scope.tonotification = function () {
                mainDataServer.notification.hasNewNotification = false;
                $state.go("main.notification");
            };
            $scope.chuploadfile = function (e) {
                var image = document.getElementById('imgfile-id');
                var doName = "http://192.168.0.110:8082/app";
                var doName = "https://www.chaohuo.net:7090/app";
                var images = image.files;
                console.log(images);
                var buk, oSign, oPath, oSigns, sourceUrl;
                $.ajax({
                    type: "GET",
                    url: doName + "/cos/tokenMethod/getCosSign?token=" + webimutil.CookieHelper.getCookie("loginselftoken"),
                    data: {
                        fileName: images[0].name,
                        doType: "G"
                    },
                    async: false,
                    crossDomain: true,
                    success: function (reqs) {
                        console.log(reqs);
                        buk = reqs.content.bucket;
                        oSign = reqs.content.oneEffectiveSign;
                        oSigns = reqs.content.periodEffectiveSign;
                        oPath = reqs.content.cosPath;
                    },
                    error: function (reqs) {
                        console.log(reqs);
                    }
                });
                console.log(buk);
                var imgConfig = {
                    domain: 'http://superfireoss-1255482466.cossh.myqcloud.com',
                    data: $window.UploadFile.dataType.json,
                    file_data_name: 'Pic-Data',
                    multi_parmas: {},
                    refreshSign: function (cb) {
                        cb({ path: 'http://superfireoss-1255482466.cossh.myqcloud.com' + oPath, sign: oSign });
                    }
                };
                var imgUpload = $window.UploadFile.init(imgConfig);
                imgUpload.upload(image, function (e) {
                    console.log(e);
                });
            };
            $scope.getCommunityMemmbers = function (ida) {
                var aaa = this.item.ida;
                var bbb = this.item.id;
                var ccc = this.item.unSpeak;
                !function (groupid) {
                    mainServer.group.getGroupMember(aaa).success(function (rep) {
                        var members = rep.content;
                        for (var j = 0, len = members.length; j < len; j++) {
                            var member = new webimmodel.Member({
                                id: members[j].userId,
                                name: members[j].name,
                                imgSrc: members[j].avatar,
                                role: members[j].friendFlag,
                                displayName: members[j].name
                            });
                            mainDataServer.contactsList.addGroupMember(bbb, member);
                        }
                    });
                }(bbb);
            };
            $scope.showPasteDiv = function (visible) {
                $scope.$broadcast('showPasteDiv', visible);
            };
            $scope.uploadPasteImage = function () {
                $scope.$broadcast('uploadPasteImage');
            };
            $scope.checkSend = function (e) {
                var pic = document.getElementsByClassName("previewPic")[0];
                if (e.keyCode === 13 && pic.style.visibility == 'visible') {
                    $scope.uploadPasteImage();
                    e.preventDefault();
                }
            };
            function refreshconversationList() {
                $scope.mainData.conversation.updateConversations();
            }
            $scope.$on("conversationChange", function () {
                refreshconversationList();
            });
            $scope.$watch("mainData.conversation.totalUnreadCount", function (newVal, oldVal) {
                if (newVal == oldVal) {
                    return;
                }
                if (window.Electron) {
                    window.Electron.updateBadgeNumber(newVal);
                }
            });
            window.onfocus = function () {
            };
            $scope.$on("$viewContentLoaded", function () {
                if ($state.is("main")) {
                    $scope.showState.isChat = false;
                }
                else {
                    $scope.showState.isChat = true;
                }
                function pageLayout() {
                    if (document.documentElement.clientWidth < 600) {
                        $scope.showState.isPhone = true;
                        var ele = document.querySelector(".mainBox");
                        if (ele) {
                            ele.style.width = document.documentElement.clientWidth - parseFloat(getComputedStyle(document.querySelector(".toolbar")).width) + "px";
                        }
                    }
                    else {
                        $scope.showState.isPhone = false;
                        var ele = document.querySelector(".mainBox");
                        if (ele) {
                            ele.style.width = '314px';
                        }
                    }
                }
                function adjustNoNet() {
                    var ele = document.getElementById("Messages");
                    var err = document.getElementsByClassName("no_network");
                    if (!ele || !err[0])
                        return;
                    err[0].style.width = getComputedStyle(document.querySelector('#Messages')).width;
                }
                pageLayout();
                adjustNoNet();
                $window.onresize = function () {
                    pageLayout();
                    adjustNoNet();
                    $scope.$apply();
                };
            });
            $scope.$on('reconnect', function () {
                reconnectServer();
            });
            mainDataServer.notification.notificationList = [];
            mainDataServer.contactsList.subgroupList = [];
            mainServer.friend.getAll().success(function (rep) {
                var arr = rep.content;
                for (var i = 0, len = arr.length; i < len; i++) {
                    mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                        id: arr[i].ryUserId,
                        name: arr[i].name || arr[i].user.nickname,
                        imgSrc: arr[i].avatar,
                    }));
                }
                mainDataServer.notification._sort();
            }).error(function (e) {
                console.log(e);
            });
            mainDataServer.contactsList.groupList = [];
            mainServer.user.getMyGroups().success(function (rep) {
                var groups = rep.content;
                for (var i = 0, len = groups.length; i < len; i++) {
                    var group = new webimmodel.Group({
                        unSpeak: groups[i].unSpeak,
                        imtype: groups[i].imType,
                        ida: groups[i].id,
                        id: groups[i].imGroupId,
                        name: groups[i].name,
                        imgSrc: groups[i].picture,
                        upperlimit: 3000,
                        fact: 1,
                        creater: groups[i].createUser
                    });
                    mainDataServer.contactsList.addGroup(group);
                }
            }).error(function (err) {
            });
            RongIMSDKServer.init(appconfig.getAppKey());
            if (mainDataServer.loginUser.token) {
                RongIMSDKServer.connect(mainDataServer.loginUser.token).then(function (userId) {
                    console.log("connect success1:" + userId);
                    RongIMSDKServer.getConversationList().then(function (list) {
                        mainDataServer.conversation.updateConversations();
                    });
                    RongIMLib.RongUploadLib.init({ domain: IMGDOMAIN, drop_element: '', container: 'MessageForm', browse_button: 'upload-image' }, { domain: FILEDOMAIN, drop_element: 'chatMain', container: 'MessageForm', browse_button: 'upload-file' });
                }, function (error) {
                    if (error.tokenError) {
                        mainServer.user.getToken().success(function (data) {
                            if (data.code == "200") {
                                RongIMSDKServer.connect(data.result.token).then(function (userId) {
                                    RongIMSDKServer.getConversationList().then(function (list) {
                                        mainDataServer.conversation.updateConversations();
                                    });
                                    RongIMLib.RongUploadLib.init({ domain: IMGDOMAIN, drop_element: '', container: 'MessageForm', browse_button: 'upload-image' }, { domain: FILEDOMAIN, drop_element: 'chatMain', container: 'MessageForm', browse_button: 'upload-file' });
                                }, function (error) {
                                    if (error.tokenError) {
                                        console.log('token error');
                                    }
                                });
                            }
                            else {
                                $state.go("account.signin");
                            }
                        }).error(function (e) {
                            $state.go("account.signin");
                        });
                    }
                });
            }
            var isReconnect = true;
            RongIMSDKServer.setConnectionStatusListener({
                onChanged: function (status) {
                    var myDate = new Date();
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log('链接成功', myDate.toLocaleString());
                            mainDataServer.isConnected = true;
                            showDisconnectErr(false);
                            isConnecting = false;
                            break;
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log('正在链接');
                            break;
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log('断开连接');
                            if (!$state.is("account.signin")) {
                                $state.go("account.signin");
                            }
                            break;
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log('其他设备登录');
                            if (!$state.is("account.signin")) {
                                $state.go("account.signin");
                                webimutil.Helper.alertMessage.error("您的账号在其他地方登录!");
                                webimutil.NotificationHelper.showNotification({
                                    title: "超火",
                                    icon: "assets/img/SealTalk.ico",
                                    body: "您的账号在其他地方登录!"
                                });
                                if (window.Electron) {
                                    window.Electron.kickedOff();
                                }
                            }
                            break;
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log('网络不可用', myDate.toLocaleString(), 'isConnecting:' + isConnecting);
                            mainDataServer.isConnected = false;
                            showDisconnectErr(true);
                            isConnecting = true;
                            checkNetwork({
                                onSuccess: function () {
                                    reconnectServer();
                                }
                            });
                            break;
                    }
                }
            });
            webimutil.NotificationHelper.onclick = function (n) {
                if (n.data)
                    $state.go("main.chat", { targetId: n.data.targetId, targetType: n.data.targetType });
            };
            var typingTimeID;
            var timeOfflineMsg;
            RongIMSDKServer.setOnReceiveMessageListener({
                onReceived: function (data) {
                    var _str = JSON.stringify(data.content);
                    var _str2 = JSON.parse(_str);
                    console.log(_str2.user.id);
                    console.log(_str2.user.name);
                    console.log(_str2.user.portrait);
                    if ($scope.mainData.loginUser.hasSound) {
                        var eleplay = document.getElementById("playsound");
                        eleplay.play();
                    }
                    var msg = webimmodel.Message.convertMsg(data);
                    if (msg.targetId == "") {
                        msg.targetId = mainDataServer.loginUser.id;
                    }
                    if ($state.is("main.chat")) {
                        var urls = window.location.href;
                        urls = String(urls.substr(urls.length - 1, urls.length));
                        if (urls != "4") {
                            RongIMSDKServer.clearUnreadCount(mainDataServer.conversation.currentConversation.targetType, mainDataServer.conversation.currentConversation.targetId);
                        }
                    }
                    switch (data.messageType) {
                        case webimmodel.MessageType.ContactNotificationMessage:
                            RongIMSDKServer.clearUnreadCount(data.conversationType, data.targetId);
                            if (data.hasReceivedByOtherClient) {
                                break;
                            }
                            var contact = msg.content;
                            RongIMSDKServer.removeConversation(msg.conversationType, msg.targetId).then(function () {
                                refreshconversationList();
                            });
                            if (contact.operation == "Request") {
                                if (!$state.is("main.notification")) {
                                    $scope.mainData.notification.hasNewNotification = true;
                                }
                                var item = new webimmodel.NotificationFriend({
                                    id: contact.sourceUserId,
                                    name: contact.senderUserName,
                                    portraitUri: contact.senderUserImgSrc,
                                    content: contact.content,
                                    status: webimmodel.FriendStatus.Requested + "",
                                    timestamp: (msg.sentTime && msg.sentTime.getTime())
                                });
                                if (!item.name) {
                                    item.portraitUri = msg.userInfo.portrait;
                                    item.name = msg.userInfo.name;
                                    item.firstchar = webimutil.ChineseCharacter.getPortraitChar(item.name);
                                    mainDataServer.notification.addNotification(item);
                                    console.log("头像==" + msg.userInfo.portrait);
                                }
                                else {
                                    mainDataServer.notification.addNotification(item);
                                }
                            }
                            else if (contact.operation == "AcceptResponse") {
                                var friend = mainDataServer.contactsList.getFriendById(contact.sourceUserId);
                                if (!friend) {
                                    mainServer.user.getInfoS(contact.sourceUserId).success(function (rep) {
                                        var res = rep.content;
                                        mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                                            id: res.userInfo.userFriendUserId,
                                            name: res.userInfo.name,
                                            imgSrc: res.userInfo.avatar
                                        }));
                                        refreshconversationList();
                                    }).error(function () {
                                        mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                                            id: contact.sourceUserId,
                                            name: "网络原因暂未取到",
                                            imgSrc: ""
                                        }));
                                        refreshconversationList();
                                    });
                                }
                            }
                            break;
                        case webimmodel.MessageType.DiscussionNotificationMessage:
                            break;
                        case webimmodel.MessageType.VoiceMessage:
                            msg.isUnReade = true;
                        case webimmodel.MessageType.TextMessage:
                        case webimmodel.MessageType.LocationMessage:
                        case webimmodel.MessageType.ImageMessage:
                        case webimmodel.MessageType.ImageViewMessage:
                            addmessage(msg);
                        case webimmodel.MessageType.ImgMessage:
                            addmessage(msg);
                        case webimmodel.MessageType.VideoMessage:
                            addmessage(msg);
                        case webimmodel.MessageType.VideoMsg:
                            addmessage(msg);
                        case webimmodel.MessageType.RichContentMessage:
                        case webimmodel.MessageType.FileMessage:
                            if ($state.is("main.chat") && !document.hidden && msg.conversationType == webimmodel.conversationType.Private && msg.senderUserId == mainDataServer.conversation.currentConversation.targetId) {
                                mainDataServer.isTyping = false;
                            }
                            if ($state.is("main.chat") && !document.hidden && msg.senderUserId != mainDataServer.loginUser.id && msg.conversationType == webimmodel.conversationType.Private) {
                                if (data.offLineMessage) {
                                    mainDataServer.conversation.lastOfflineMsg = data;
                                    if (!timeOfflineMsg && mainDataServer.conversation.lastOfflineMsg) {
                                        timeOfflineMsg = setTimeout(function () {
                                            conversationServer.sendReadReceiptMessage(mainDataServer.conversation.currentConversation.targetId, mainDataServer.conversation.currentConversation.targetType, mainDataServer.conversation.lastOfflineMsg.messageUId, mainDataServer.conversation.lastOfflineMsg.sentTime);
                                            timeOfflineMsg = null;
                                        }, 1000);
                                    }
                                }
                                else {
                                    conversationServer.sendReadReceiptMessage(mainDataServer.conversation.currentConversation.targetId, mainDataServer.conversation.currentConversation.targetType, data.messageUId, data.sentTime);
                                }
                            }
                            addmessage(msg);
                            if (msg.mentionedInfo) {
                                var isAtMe = false;
                                if (msg.mentionedInfo.type == webimmodel.AtTarget.All) {
                                    isAtMe = true;
                                }
                                if (msg.mentionedInfo.type == webimmodel.AtTarget.Part) {
                                    for (var j = 0; j < msg.mentionedInfo.userIdList.length; j++) {
                                        if (msg.mentionedInfo.userIdList[j] == mainDataServer.loginUser.id) {
                                            isAtMe = true;
                                        }
                                    }
                                }
                                if (isAtMe) {
                                    conversationServer.addAtMessage(msg.targetId, msg.conversationType, msg);
                                }
                            }
                            var isself = mainDataServer.loginUser.id == msg.senderUserId;
                            if (isself || $state.is("main.chat") && !document.hidden && msg.conversationType == mainDataServer.conversation.currentConversation.targetType && msg.senderUserId == mainDataServer.conversation.currentConversation.targetId) {
                                RongIMSDKServer.clearUnreadCount(msg.conversationType, msg.targetId);
                                var curCon = mainDataServer.conversation.getConversation(msg.conversationType, msg.targetId);
                                if (curCon) {
                                    curCon.atStr = '';
                                    mainDataServer.conversation.totalUnreadCount = mainDataServer.conversation.totalUnreadCount - curCon.unReadNum;
                                    curCon.unReadNum = 0;
                                }
                            }
                            else {
                                if (msg.senderUserName) {
                                    webimutil.NotificationHelper.showNotification({
                                        title: msg.senderUserName,
                                        icon: "assets/img/SealTalk.ico",
                                        body: webimmodel.Message.messageToNotification(data, mainDataServer.loginUser.id, true), data: { targetId: msg.targetId, targetType: msg.conversationType }
                                    });
                                }
                                else {
                                }
                            }
                            break;
                        case webimmodel.MessageType.GroupNotificationMessage:
                            if (data.objectName == "RC:GrpNtf" && !data.hasReceivedByOtherClient) {
                                var groupNotification = data.content;
                                var isself = false;
                                if (groupNotification.operatorUserId == mainDataServer.loginUser.id) {
                                    isself = true;
                                }
                                switch (groupNotification.operation) {
                                    case "Add":
                                        var changemembers = groupNotification.data.data.targetUserIds.join().split(",");
                                        var groupid = data.targetId;
                                        var self = changemembers.indexOf(mainDataServer.loginUser.id + "");
                                        if (self == -1) {
                                            for (var a = 0, len = changemembers.length; a < len; a++) {
                                                mainServer.user.getInfoS(changemembers[a]).success(function (rep) {
                                                    mainDataServer.contactsList.addGroupMember(groupid, new webimmodel.Member({
                                                        id: rep.content.userInfo.userFriendUserId,
                                                        name: rep.content.userInfo.name,
                                                        imgSrc: rep.content.userInfo.avatar,
                                                        role: "1"
                                                    }));
                                                }).error(function () {
                                                });
                                            }
                                        }
                                        else {
                                            mainServer.group.getById(groupid).success(function (rep) {
                                                var temporarynotifi = new webimmodel.WarningNoticeMessage(groupNotification.data.data.operatorNickname + "邀请你加入了群组");
                                                mainDataServer.notification.addNotification(temporarynotifi);
                                                if (!$state.is("main.notification")) {
                                                    mainDataServer.notification.hasNewNotification = true;
                                                }
                                                mainServer.group.getGroupMember(groupid).success(function (rep) {
                                                    var members = rep.result;
                                                    for (var j = 0, len = members.length; j < len; j++) {
                                                        var member = new webimmodel.Member({
                                                            id: members[j].user.id,
                                                            name: members[j].user.nickname,
                                                            imgSrc: members[j].user.portraitUri,
                                                            role: members[j].role,
                                                            displayName: members[j].displayName
                                                        });
                                                        mainDataServer.contactsList.addGroupMember(groupid, member);
                                                    }
                                                });
                                                refreshconversationList();
                                            }).error(function () {
                                            });
                                        }
                                        break;
                                    case "Quit":
                                        var changemembers = groupNotification.data.data.targetUserIds.join().split(",");
                                        var groupid = data.targetId;
                                        var self = changemembers.indexOf(mainDataServer.loginUser.id + "");
                                        if (self == -1) {
                                            mainDataServer.contactsList.removeGroupMember(groupid, changemembers[0]);
                                        }
                                        else {
                                            mainDataServer.contactsList.removeGroup(groupid);
                                            RongIMSDKServer.removeConversation(webimmodel.conversationType.Group, groupid).then(function () {
                                                refreshconversationList();
                                            });
                                        }
                                        break;
                                    case "Kicked":
                                        var changemembers = groupNotification.data.data.targetUserIds.join().split(",");
                                        var groupid = data.targetId;
                                        var groupname = mainDataServer.contactsList.getGroupById(groupid) ? mainDataServer.contactsList.getGroupById(groupid).name : groupid;
                                        var self = changemembers.indexOf(mainDataServer.loginUser.id + "");
                                        if (self == -1) {
                                            for (var a = 0, len = changemembers.length; a < len; a++) {
                                                mainDataServer.contactsList.removeGroupMember(groupid, changemembers[a]);
                                            }
                                        }
                                        else {
                                            var temporarynotifi = new webimmodel.WarningNoticeMessage(groupNotification.data.data.operatorNickname + '将你移出了群组');
                                            mainDataServer.notification.addNotification(temporarynotifi);
                                            if (!$state.is("main.notification")) {
                                                mainDataServer.notification.hasNewNotification = true;
                                            }
                                            mainDataServer.contactsList.removeGroup(groupid);
                                            RongIMSDKServer.removeConversation(webimmodel.conversationType.Group, groupid).then(function () {
                                                refreshconversationList();
                                            });
                                            if ($state.is("main.chat") && $state.params["targetId"] == groupid && $state.params["targetType"] == webimmodel.conversationType.Group) {
                                                $state.go("main");
                                            }
                                        }
                                        break;
                                    case "Rename":
                                        var groupid = data.targetId;
                                        var groupname = mainDataServer.contactsList.getGroupById(groupid) ? mainDataServer.contactsList.getGroupById(groupid).name : groupid;
                                        var operator = isself ? "你" : groupNotification.data.data.operatorNickname;
                                        var temporarynotifi = new webimmodel.WarningNoticeMessage(operator + ' 修改群名称为' + groupNotification.data.data.targetGroupName);
                                        mainDataServer.notification.addNotification(temporarynotifi);
                                        if (!$state.is("main.notification")) {
                                            mainDataServer.notification.hasNewNotification = true;
                                        }
                                        mainDataServer.contactsList.updateGroupNameById(groupid, groupNotification.data.data.targetGroupName);
                                        mainDataServer.conversation.updateConversationTitle(webimmodel.conversationType.Group, groupid, groupNotification.data.data.targetGroupName);
                                        break;
                                    case "Create":
                                        var groupid = data.targetId;
                                        mainServer.group.getById(groupid).success(function (rep) {
                                            var operator = isself ? "你" : groupNotification.data.data.operatorNickname;
                                            var temporarynotifi = new webimmodel.WarningNoticeMessage(operator + "创建了群组");
                                            mainDataServer.notification.addNotification(temporarynotifi);
                                            if (!$state.is("main.notification")) {
                                                mainDataServer.notification.hasNewNotification = true;
                                            }
                                            mainServer.group.getGroupMember(groupid).success(function (rep) {
                                                var members = rep.result;
                                                for (var j = 0, len = members.length; j < len; j++) {
                                                    var member = new webimmodel.Member({
                                                        id: members[j].user.id,
                                                        name: members[j].user.nickname,
                                                        imgSrc: members[j].user.portraitUri,
                                                        role: members[j].role,
                                                        displayName: members[j].displayName
                                                    });
                                                    mainDataServer.contactsList.addGroupMember(groupid, member);
                                                }
                                            });
                                            refreshconversationList();
                                        }).error(function () {
                                        });
                                        break;
                                    case "Dismiss":
                                        var groupid = data.targetId;
                                        var groupname = mainDataServer.contactsList.getGroupById(groupid) ? mainDataServer.contactsList.getGroupById(groupid).name : groupid;
                                        var operator = isself ? "你" : groupNotification.data.data.operatorNickname;
                                        var temporarynotifi = new webimmodel.WarningNoticeMessage(operator + "解散了群组");
                                        mainDataServer.notification.addNotification(temporarynotifi);
                                        if (!$state.is("main.notification")) {
                                            mainDataServer.notification.hasNewNotification = true;
                                        }
                                        mainDataServer.contactsList.removeGroup(groupid);
                                        RongIMSDKServer.removeConversation(webimmodel.conversationType.Group, groupid).then(function () {
                                            refreshconversationList();
                                        });
                                        if ($state.is("main.chat") && $state.params["targetId"] == groupid && $state.params["targetType"] == webimmodel.conversationType.Group) {
                                            $state.go("main");
                                        }
                                        break;
                                    default:
                                        console.log("不支持操作类型" + groupNotification.operation);
                                }
                                conversationServer.asyncConverGroupNotifition(data, msg);
                                addmessage(msg);
                            }
                            break;
                        case webimmodel.MessageType.InformationNotificationMessage:
                            addmessage(msg);
                            break;
                        case webimmodel.MessageType.ReadReceiptMessage:
                            if (msg.objectName == 'RC:ReadNtf' && msg.senderUserId == mainDataServer.loginUser.id) {
                                RongIMSDKServer.clearUnreadCount(msg.conversationType, msg.targetId);
                                var curCon = mainDataServer.conversation.getConversation(msg.conversationType, msg.targetId);
                                if (curCon) {
                                    curCon.atStr = '';
                                    mainDataServer.conversation.totalUnreadCount = mainDataServer.conversation.totalUnreadCount - curCon.unReadNum;
                                    curCon.unReadNum = 0;
                                }
                            }
                            break;
                        case webimmodel.MessageType.RecallCommandMessage:
                            if (msg.objectName == 'RC:RcCmd') {
                            }
                            break;
                        case webimmodel.MessageType.TypingStatusMessage:
                            if ($state.is("main.chat") && !document.hidden && msg.conversationType == webimmodel.conversationType.Private && msg.senderUserId == mainDataServer.conversation.currentConversation.targetId) {
                                mainDataServer.isTyping = true;
                                if (typingTimeID) {
                                    clearTimeout(typingTimeID);
                                }
                                typingTimeID = setTimeout(function () {
                                    mainDataServer.isTyping = false;
                                    $scope.$apply();
                                }, 6000);
                            }
                            break;
                        case webimmodel.MessageType.InviteMessage:
                        case webimmodel.MessageType.HungupMessage:
                            addmessage(msg);
                            break;
                        case webimmodel.MessageType.ReadReceiptRequestMessage:
                            if ($state.is("main.chat") && !document.hidden && msg.conversationType == webimmodel.conversationType.Group && msg.targetId == mainDataServer.conversation.currentConversation.targetId) {
                                RongIMSDKServer.sendReceiptResponse(msg.conversationType, msg.targetId).then(function () {
                                    console.log('sendReadReceiptResponseMessage success');
                                }, function (error) {
                                    console.log('sendReadReceiptResponseMessage error', error.errorCode);
                                });
                            }
                            break;
                        case webimmodel.MessageType.ReadReceiptResponseMessage:
                            var receiptResponseItem = data.content;
                            var ids = receiptResponseItem.receiptMessageDic[mainDataServer.loginUser.id];
                            if (!ids) {
                                return;
                            }
                            for (var i = 0, len = ids.length; i < len; i++) {
                                var itemById = conversationServer.getMessageById(msg.targetId, msg.conversationType, ids[i]);
                                if (itemById && msg.receiptResponse && msg.receiptResponse[ids[i]]) {
                                    itemById.receiptResponse = msg.receiptResponse;
                                }
                            }
                            break;
                        case webimmodel.MessageType.SyncReadStatusMessage:
                            RongIMSDKServer.clearUnreadCount(msg.conversationType, msg.targetId);
                            var curCon = mainDataServer.conversation.getConversation(msg.conversationType, msg.targetId);
                            if (curCon) {
                                curCon.atStr = '';
                                mainDataServer.conversation.totalUnreadCount = mainDataServer.conversation.totalUnreadCount - curCon.unReadNum;
                                curCon.unReadNum = 0;
                            }
                            break;
                        default:
                            console.log(data.messageType + "：未处理");
                            break;
                    }
                    $scope.mainData.conversation.updateConStatic(msg, true, $state.is("main.chat") && !document.hidden);
                    $scope.$apply();
                }
            });
            function addmessage(msg) {
                var hislist = conversationServer.historyMessagesCache[msg.conversationType + "_" + msg.targetId] = conversationServer.historyMessagesCache[msg.conversationType + "_" + msg.targetId] || [];
                if (hislist.length == 0) {
                    hislist.push(new webimmodel.GetHistoryPanel());
                    if (msg.sentTime.toLocaleDateString() != (new Date()).toLocaleDateString())
                        hislist.push(new webimmodel.TimePanl(msg.sentTime));
                }
                conversationServer.addHistoryMessages(msg.targetId, msg.conversationType, msg);
                if (msg.messageType == webimmodel.MessageType.ImageViewMessage || msg.messageType == webimmodel.MessageType.ImageMessage) {
                    setTimeout(function () {
                        $scope.$broadcast("msglistchange");
                    }, 200);
                }
                else {
                    $scope.$broadcast("msglistchange");
                }
            }
            function showDisconnectErr(flag) {
                var ele = document.querySelector(".no_network");
                if (ele) {
                    ele.style.visibility = flag ? 'visible' : 'hidden';
                }
                var sendBtn = document.querySelector(".sendBtn");
                if (sendBtn) {
                    sendBtn.className = flag ? 'sendBtn disabled' : 'sendBtn';
                }
            }
            var reconnectTimes = 0, timeInterval = 20, timeID, reconnectTimeID;
            function reconnectServer() {
                if (reconnectTimeID) {
                    clearTimeout(reconnectTimeID);
                }
                reconnectTimeID = setTimeout(function () {
                    RongIMSDKServer.reconnect({
                        onSuccess: function () {
                            var myDate = new Date();
                            reconnectTimes = 0;
                            console.log("reconnectSuccess", myDate.toLocaleString());
                            if (reconnectTimeID) {
                                clearTimeout(reconnectTimeID);
                            }
                            showDisconnectErr(false);
                            isConnecting = false;
                            mainDataServer.isConnected = true;
                            RongIMSDKServer.getConversationList().then(function () {
                                mainDataServer.conversation.updateConversations();
                            });
                        },
                        onError: function () {
                            mainDataServer.isConnected = false;
                            isConnecting = false;
                            if (reconnectTimes <= 5) {
                                reconnectServer();
                                reconnectTimes += 1;
                            }
                            else {
                                reconnectTimes = 0;
                                var myDate = new Date();
                                console.log("网络正常重连失败！！！", myDate.toLocaleString());
                            }
                        }
                    });
                }, timeInterval * reconnectTimes * 1000);
            }
            function checkNetwork(callback) {
                var myDate = new Date();
                console.log('begin checkNetwork', myDate.toLocaleString());
                $http.get("index.html", {
                    params: { t: Math.random() }
                }).success(function () {
                    if (timeID) {
                        clearTimeout(timeID);
                    }
                    callback && callback.onSuccess && callback.onSuccess();
                }).error(function () {
                    showDisconnectErr(true);
                    if (timeID) {
                        clearTimeout(timeID);
                    }
                    timeID = setTimeout(function () {
                        checkNetwork(callback);
                    }, 5000);
                });
            }
        }]);
});
//# sourceMappingURL=controller.js.map