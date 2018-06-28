/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/// <reference path="server.ts"/>
/// <reference path="../model/webimModel.ts"/>


var mainCtr = angular.module("webim.main.controller", ["webim.main.server", "webim.conversation.server"]);
var IMGDOMAIN = "http://7xogjk.com1.z0.glb.clouddn.com/";
var FILEDOMAIN = "http://o83059m7d.bkt.clouddn.com/";
//var FILEDOMAIN = "http://cos.chaohuo.net/";


mainCtr.controller("mainController", ["$scope", "$state", "$window", "$timeout", "$http",
    "mainDataServer", "conversationServer", "mainServer", "RongIMSDKServer", "appconfig",
    function ($scope: any, $state: angular.ui.IStateService, $window: any,
         $timeout: angular.ITimeoutService,
        $http: angular.IHttpService,
        mainDataServer: mainDataServer, conversationServer: conversationServer, 
        mainServer: mainServer, RongIMSDKServer: RongIMSDKServer, appconfig: any) {
        var isConnecting = false;
        mainDataServer.loginUser.nickName = webimutil.CookieHelper.getCookie("userselfname");
        mainDataServer.loginUser.firstchar = webimutil.CookieHelper.getCookie("userselfavater");
        mainDataServer.loginUser.portraitUri = webimutil.CookieHelper.getCookie("userselfavater");

        if (!mainDataServer.loginUser.id) {
            var userid = webimutil.CookieHelper.getCookie("loginuserid"), usertoken = webimutil.CookieHelper.getCookie("loginusertoken");
            if (userid) {
                mainDataServer.loginUser.id = userid;
                mainDataServer.loginUser.token = usertoken;
            } else {
                // $state.go("account.signin");
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
                mainDataServer.loginUser.portraitUri = rep.content.userInfo.avatar
                //angular.element(document.getElementById("loginuser")).css("background-color", webimutil.Helper.portraitColors[mainDataServer.loginUser.id.charCodeAt(0) % webimutil.Helper.portraitColors.length]);
            }
            if (rep.code == 3) {
                alert("需要重新登录！")
                window.location.href = "/#/account/signin";
            }

            else {
                // console.log("get user info error")
            }
            //          if (rep.code == 200) {
            //              mainDataServer.loginUser.nickName = rep.result.nickname
            //              mainDataServer.loginUser.firstchar = webimutil.ChineseCharacter.getPortraitChar(rep.result.nickname);
            //              mainDataServer.loginUser.portraitUri = rep.result.portraitUri
            //              angular.element(document.getElementById("loginuser")).css("background-color", webimutil.Helper.portraitColors[mainDataServer.loginUser.id.charCodeAt(0) % webimutil.Helper.portraitColors.length]);
            //          } else {
            //              console.log("get user info error")
            //          }

        }).error(function () {

        })

        $scope.mainData = <mainDataServer>mainDataServer;
        $scope.$on('refreshSelectCon', function (event: any, data: string) {
            $scope.unSelect(data);
        });
        //按钮、面板显示控制
        $scope.showState = {
            isPhone: false,
            isChat: false
        }
        $scope.switchbtn = {
            isFriendList: 1,
            issearchList: false
        }
        $scope.curCon = "";
        $scope.unSelect = function (curConVal: string) {
            if ($scope.curCon) {
                $('#' + $scope.curCon).removeClass("selected");
            }
            $('#' + curConVal).addClass("selected");
            $scope.curCon = curConVal;
        };

        $scope.selectGo = function (id: string, type: webimmodel.conversationType) {
            if ($scope.switchbtn.isFriendList) {
                $state.go("main.friendinfo", { userid: id, groupid: "0", targetid: "0", conversationtype: "0" });
            } else {
                $state.go("main.chat", { targetId: id, targetType: type }, { location: "replace" });
            }
        }
        $scope.selectGoGroup = function (id: string, type: webimmodel.conversationType) {
            if ($scope.switchbtn.isFriendList) {
                $state.go("main.groupinfo", { groupid: id, conversationtype: "0" });
            } else {
                $state.go("main.chat", { targetId: id, targetType: type }, { location: "replace" });
            }
        }
        $scope.selectMember = function (item: webimmodel.Member) {
            $scope.atShow = false;
        }

        //查找好友
        //
        $scope.searchControl = {};

        $scope.$watch('switchbtn.isFriendList', function (newVal: boolean, oldVal: boolean) {
            if (newVal === oldVal)
                return;
            $scope.searchControl.clear();
        });
        $scope.search = function (content: string) {
            if (content.trim()) {
                var friendList = [].concat.apply([], mainDataServer.contactsList.subgroupList.map(function (item) { return item.list }));
                $scope.switchbtn.issearchList = true;
                $scope.searchList = <any>{};
                $scope.searchList.friendList = mainDataServer.contactsList.find(content, friendList) || [];

                $scope.searchList.groupList = mainDataServer.contactsList.find(content, mainDataServer.contactsList.groupList) || [];
            } else {
                $scope.switchbtn.issearchList = false;
            }
        }

        $scope.tonotification = function () {
            mainDataServer.notification.hasNewNotification = false;
            $state.go("main.notification");
        }
        //       $scope.fileJSSDK = function(oSigns:string,oSign:string,oPath:string,filename:string,callback:any) {
        //				var cos = new CosCloud({
        //				    appid: '1255482466', // APPID 必填参数
        //				    bucket: 'superfireoss', // bucketName 必填参数
        //				    region: 'sh', // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
        //				    getAppSign: function (callback:any) {//获取签名 必填参数
        //				        callback(oSigns);
        //				    },
        //				    getAppSignOnce: function (callback:any) {//单次签名，参考上面的注释即可
        //						callback(oSign);
        //				    }
        //				});
        //				var successCallBack = function (result) {
        //					var sourceUrl = result.data.source_url;
        //					callback(sourceUrl);//返回图片地址回调出去
        //					//console.log(sourceUrl);
        //				    console.log('request success.'+ result);
        //				    return sourceUrl;
        //				};
        //				
        //				var errorCallBack = function (result) {
        //				    result = result || {};
        //				    console.log('request error:', result && result.message);
        //				};
        //				
        //				var progressCallBack = function (curr, sha1) {
        //				    var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%';
        //				    var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%';
        //				    var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.';//上传过程
        //				    //console.log(msg);
        //				};	
        //				cos.sliceUploadFile(successCallBack, errorCallBack, progressCallBack, 'superfireoss', oPath, filename, 0);

        //       } 
        $scope.chuploadfile = function (e: any) {

            var image = <HTMLInputElement>document.getElementById('imgfile-id');
            var doName = "http://192.168.0.110:8082/app";
            var doName = "https://www.chaohuo.net:7090/app";//线上地址

            var images: any = image.files;
            console.log(images);
            var buk: any, oSign: any, oPath: any, oSigns: any, sourceUrl: any;
            //获取签名等
            $.ajax({
                type: "GET",
                url: doName + "/cos/tokenMethod/getCosSign?token=" + webimutil.CookieHelper.getCookie("loginselftoken"),
                //	dataType: "json",
                data: {
                    fileName: images[0].name,
                    doType: "G"
                },
                async: false,
                crossDomain: true,
                success: function (reqs: any) {
                    console.log(reqs);
                    buk = reqs.content.bucket;
                    oSign = reqs.content.oneEffectiveSign;
                    oSigns = reqs.content.periodEffectiveSign;
                    oPath = reqs.content.cosPath;
                },
                error: function (reqs: any) {
                    console.log(reqs);
                }
            });
            console.log(buk);
            var imgConfig = {
                domain: 'http://superfireoss-1255482466.cossh.myqcloud.com',
                data: $window.UploadFile.dataType.json,
                file_data_name: 'Pic-Data',
                multi_parmas: {},
                refreshSign: function (cb: any) {
                    cb({ path: 'http://superfireoss-1255482466.cossh.myqcloud.com' + oPath, sign: oSign });
                }
            };

            var imgUpload = $window.UploadFile.init(imgConfig);
            imgUpload.upload(image, function (e: any) {
                console.log(e);
            });

        }

        //      $scope.chuploadfile = function() {
        //      	console.log(this)
        //      	 var file = <HTMLInputElement>document.getElementById('upload-file2');
        //       	
        //      	 //$scope.files = e.files;
        ////          $scope.$apply(); 
        //      	//console.log(this.currentConversation.targetId);
        //      	var files : any =file.files;
        //  // var filename = $scope.files[0].name;
        //      	console.log(file);
        //      	console.log(files[0].name);
        //      	mainServer.group.upLoad(files[0].name,this.currentConversation.targetId,"AA").success(function(rep) {
        //      		console.log(rep);
        //      		if(rep.code==1){
        //        			var oSign = rep.content.oneEffectiveSign;
        //					var oSigns = rep.content.periodEffectiveSign;
        //					var oPath = rep.content.cosPath;
        ////          //大于20M东西上传
        ////			function fileJSSDK(oSigns,oSign,oPath,files[0].name,callback:any){
        ////				var cos = new CosCloud({
        ////				    appid: '1255482466', // APPID 必填参数
        ////				    bucket: 'superfireoss', // bucketName 必填参数
        ////				    region: 'sh', // 地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
        ////				    getAppSign: function (callback) {//获取签名 必填参数
        ////				        callback(oSigns);
        ////				    },
        ////				    getAppSignOnce: function (callback) {//单次签名，参考上面的注释即可
        ////						callback(oSign);
        ////				    }
        ////				});
        ////				var successCallBack = function (result) {
        ////					sourceUrl = result.data.source_url;
        ////					callback(sourceUrl);//返回图片地址回调出去
        ////					//console.log(sourceUrl);
        ////				    console.log('request success.'+ result);
        ////				    return sourceUrl;
        ////				};
        ////				
        ////				var errorCallBack = function (result) {
        ////				    result = result || {};
        ////				    console.log('request error:', result && result.message);
        ////				};
        ////				
        ////				var progressCallBack = function (curr, sha1) {
        ////				    var sha1CheckProgress = ((sha1 * 100).toFixed(2) || 100) + '%';
        ////				    var uploadProgress = ((curr || 0) * 100).toFixed(2) + '%';
        ////				    var msg = 'upload progress:' + uploadProgress + '; sha1 check:' + sha1CheckProgress + '.';//上传过程
        ////				    //console.log(msg);
        ////				};	
        ////				cos.sliceUploadFile(successCallBack, errorCallBack, progressCallBack, 'superfireoss', oPath, files[0].name, 0);
        ////			}
        //      		}else if(rep.code==2){
        //      			alert("只能群内并且是群主发文件");
        //      		}
        //      	})



        //			files =this.files;
        //console.log(files[0].name);
        //			upLoad($.cookie("tokenid"),files[0].name,"AA",function(reqs){
        //				//console.log(reqs);
        //				oSign = reqs.content.oneEffectiveSign;
        //				oSigns = reqs.content.periodEffectiveSign;
        //				oPath = reqs.content.cosPath;
        //				
        //				fileJSSDK(oSigns,oSign,oPath,files[0],function(reqs){
        //					//console.log(reqs);
        //				    sourceUrl = reqs;	
        //				    $(document).on('click','.index-btn-con',function(){
        //				    	console.log(sourceUrl);
        //					    var appVersion = $('.version-num').val();
        //					    var des = $('.version-detail').val();
        //					    addAppVersion(appVersion,sourceUrl,des,function(reqs){
        //					    	console.log(reqs);
        //					    	if(reqs.code==1){
        //					    		alert("版本添加成功");
        //					    		location.reload();
        //					    	}else{
        //								alert("添加版本错误信息"+reqs.msg);
        //							}
        //					    })
        //				    })
        //				});
        //			});
        //			
        //
        //		    var reader =new FileReader();
        //		    reader.readAsDataURL(files[0]);
        //		    reader.onload =function(e){
        //		    	alert("上传成功");
        //				$('.appName').html(files[0].name);
        //		    }
        //       }
        $scope.getCommunityMemmbers = function (ida: string) {
            //点击群组获取成员
            var aaa = this.item.ida;
            var bbb = this.item.id;
            var ccc = this.item.unSpeak;
            //console.log(this.item);

            !function (groupid: string) {
                mainServer.group.getGroupMember(aaa).success(function (rep) {
                    //console.log(rep);
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


            //          mainServer.user.getMyGroups().success(function(rep) {
            //	        	//console.log(rep);
            //	            var groups = rep.content;
            //	            for (var i = 0, len = groups.length; i < len; i++) {
            //	            	var group = new webimmodel.Group({
            //	                    ida: groups[i].id,
            //	                    id: groups[i].imGroupId,
            //	                    name: groups[i].name,
            //	                    imgSrc: groups[i].picture,
            //	                    upperlimit: 500,
            //	                    fact: 1,
            //	                    creater: groups[i].createUser
            //	              });	
            //	                //获取群成员
            //	              !function(groupid: string) {
            //	                  mainServer.group.getGroupMember(group.ida).success(function(rep) {
            //	                  	console.log(rep);
            //	                  	var members = rep.content;
            //	                      for (var j = 0, len = members.length; j < len; j++) {
            //	                          var member = new webimmodel.Member({
            //	                              id: members[j].userId,
            //	                              name: members[j].name,
            //	                              imgSrc: members[j].avatar,
            //	                              role: members[j].friendFlag,
            //	                              displayName: members[j].name
            //	                          });
            //	                          mainDataServer.contactsList.addGroupMember(groupid, member);
            //	                      }
            //	                  });
            //	              } (group.id);
            //	            }
            //	        }).error(function(err) {
            //	
            //	        })
        }

        $scope.showPasteDiv = function (visible: boolean) {
            $scope.$broadcast('showPasteDiv', visible);
        }

        $scope.uploadPasteImage = function () {
            $scope.$broadcast('uploadPasteImage');
        }

        $scope.checkSend = function (e: any) {
            var pic = <any>document.getElementsByClassName("previewPic")[0];
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
        })

        $scope.$watch("mainData.conversation.totalUnreadCount", function (newVal: any, oldVal: any) {
            if (newVal == oldVal) {
                return;
            }
            if (window.Electron) {
                window.Electron.updateBadgeNumber(newVal);
            }
        });

        //窗口获得焦点时清除当前未读消息
        window.onfocus = function () {
            //             if ($state.is("main.chat")) {
            //                 RongIMSDKServer.clearUnreadCount(mainDataServer.conversation.currentConversation.targetType, mainDataServer.conversation.currentConversation.targetId);
            //                 mainDataServer.conversation.updateConversations();
            //             }
        }


        //页面加载时、控制页面的一些样式
        $scope.$on("$viewContentLoaded", function () {
            if ($state.is("main")) {
                $scope.showState.isChat = false;
            } else {
                $scope.showState.isChat = true;
            }

            function pageLayout() {
                if (document.documentElement.clientWidth < 600) {
                    $scope.showState.isPhone = true;
                    var ele = <any>document.querySelector(".mainBox");
                    if (ele) {
                        ele.style.width = document.documentElement.clientWidth - parseFloat(getComputedStyle(document.querySelector(".toolbar")).width) + "px";
                    }
                } else {
                    $scope.showState.isPhone = false;
                    var ele = <any>document.querySelector(".mainBox");
                    if (ele) {
                        ele.style.width = '314px';
                    }
                }
                // js控制了会话框的高度
                // var chat = document.getElementById("chatArea");
                // if (chat) {
                //     chat.style.height = document.documentElement.clientHeight - 54 + "px";
                // }
                // var arr = <any>document.getElementsByClassName("communicateList2");
                // for (let i = 0, len = arr.length; i < len; i++) {
                //     arr[i].style.height = document.documentElement.clientHeight - 54 + "px";
                // }
                // if (document.getElementById("Messages")) {
                //     // document.getElementById("Messages").style.height = document.documentElement.clientHeight -
                //     //     parseFloat(getComputedStyle(document.querySelector('.inputBox')).height) -
                //     //     parseFloat(getComputedStyle(document.querySelector('.box_hd')).height) + "px";
                // }
                // if (document.getElementById("functionBox")) {
                //     // document.getElementById("functionBox").style.height = document.documentElement.clientHeight -
                //     //     parseFloat(getComputedStyle(document.querySelector('.box_hd')).height) + "px";
                // }
            }

            function adjustNoNet() {
                var ele = document.getElementById("Messages");
                var err = <any>document.getElementsByClassName("no_network");
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
            }

        });
        $scope.$on('reconnect', function () {
            reconnectServer();
        });


        //初始化好友数据   邀请通知一起通过好友关系表获取解析
        mainDataServer.notification.notificationList = [];
        mainDataServer.contactsList.subgroupList = [];
        mainServer.friend.getAll().success(function (rep) {
            //console.log(rep);
            //var arr = rep.result;
            var arr = rep.content;
            for (let i = 0, len = arr.length; i < len; i++) {
                mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                    id: arr[i].ryUserId,
                    name: arr[i].name || arr[i].user.nickname,
                    imgSrc: arr[i].avatar,
                }));
                //              switch (arr[i].status) {
                //                  case webimmodel.FriendStatus.Agreed:
                //                      mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                //                          id: arr[i].user.id,
                //                          name: arr[i].displayName || arr[i].user.nickname,
                //                          imgSrc: arr[i].user.portraitUri,
                //                      }));
                //                      break;
                //                  case webimmodel.FriendStatus.Requested:
                //                      mainDataServer.notification.addNotification(new webimmodel.NotificationFriend({
                //                          id: arr[i].user.id,
                //                          name: arr[i].user.nickname,
                //                          portraitUri: arr[i].user.portraitUri,
                //                          status: arr[i].status,
                //                          content: arr[i].message,
                //                          timestamp: (new Date(arr[i].updatedAt)).getTime()
                //                      }));
                //                      break;
                //              }
            }

            mainDataServer.notification._sort();
        }).error(function (e) {
            console.log(e);
        })

        //初始化黑名单数据
        //      mainDataServer.blackList.list = [];
        //      mainServer.user.getBlackList().success(function(rep) {
        //          var blist = rep.result;
        //          for (var i = 0, len = blist.length; i < len; i++) {
        //              mainDataServer.blackList.add(new webimmodel.Friend({
        //                  id: blist[i].user.id,
        //                  name: blist[i].user.nickname,
        //                  imgSrc: blist[i].user.portraitUri
        //              }));
        //          }
        //      }).error(function() {
        //
        //      });

        //初始化群组数据
        mainDataServer.contactsList.groupList = [];
        mainServer.user.getMyGroups().success(function (rep) {
            //console.log(rep);
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
                // console.log(this);
                //          	if(groups[i].imType == 2){
                //          		console.log(groups[i].imType)
                //          	}
                //              var group = new webimmodel.Group({
                //                  id: groups[i].group.id,
                //                  name: groups[i].group.name,
                //                  imgSrc: groups[i].group.portraitUri,
                //                  upperlimit: 500,
                //                  fact: 1,
                //                  creater: groups[i].group.creatorId
                //              });

                mainDataServer.contactsList.addGroup(group);
                //获取群成员
                //              !function(groupid: string) {
                //                  mainServer.group.getGroupMember(group.ida).success(function(rep) {
                //                  	console.log(rep);
                //                  	var members = rep.content;
                //                      for (var j = 0, len = members.length; j < len; j++) {
                //                          var member = new webimmodel.Member({
                //                              id: members[j].userId,
                //                              name: members[j].name,
                //                              imgSrc: members[j].avatar,
                //                              role: members[j].friendFlag,
                //                              displayName: members[j].name
                //                          });
                //                          mainDataServer.contactsList.addGroupMember(groupid, member);
                //                      }
                ////                      var members = rep.result;
                ////                      for (var j = 0, len = members.length; j < len; j++) {
                ////                          var member = new webimmodel.Member({
                ////                              id: members[j].user.id,
                ////                              name: members[j].user.nickname,
                ////                              imgSrc: members[j].user.portraitUri,
                ////                              role: members[j].role,
                ////                              displayName: members[j].displayName
                ////                          });
                ////                          mainDataServer.contactsList.addGroupMember(groupid, member);
                ////                      }
                //                  });
                //              } (group.id);
            }
        }).error(function (err) {

        })

        RongIMSDKServer.init(appconfig.getAppKey());

        if (mainDataServer.loginUser.token) {
            RongIMSDKServer.connect(<string>mainDataServer.loginUser.token).then(function (userId) {
                console.log("connect success1:" + userId);
                RongIMSDKServer.getConversationList().then(function (list) {
                    mainDataServer.conversation.updateConversations();
                });
                RongIMLib.RongUploadLib.init(
                    { domain: IMGDOMAIN, drop_element: '', container: 'MessageForm', browse_button: 'upload-image' },
                    { domain: FILEDOMAIN, drop_element: 'chatMain', container: 'MessageForm', browse_button: 'upload-file' }
                );
            }, function (error) {
                if (error.tokenError) {
                    //token 错误。
                    mainServer.user.getToken().success(function (data: any) {
                        if (data.code == "200") {
                            RongIMSDKServer.connect(<string>data.result.token).then(function (userId) {
                                // console.log("connect success2:" + userId);
                                RongIMSDKServer.getConversationList().then(function (list) {
                                    mainDataServer.conversation.updateConversations();
                                });
                                RongIMLib.RongUploadLib.init(
                                    { domain: IMGDOMAIN, drop_element: '', container: 'MessageForm', browse_button: 'upload-image' },
                                    { domain: FILEDOMAIN, drop_element: 'chatMain', container: 'MessageForm', browse_button: 'upload-file' }
                                );
                            }, function (error) {
                                if (error.tokenError) {
                                    //token 错误。
                                    console.log('token error');
                                }
                                //其他错误
                                //TODO:逻辑未处理
                            });
                        } else {
                            $state.go("account.signin");
                        }
                    }).error(function (e) {
                        $state.go("account.signin");
                    });
                }
                //其他错误
                //TODO:逻辑未处理
            });
        }
        //xyy
        //      else{
        //        mainServer.user.getToken().success(function(data: any) {
        //            if (data.code == "200") {
        //                RongIMSDKServer.connect(<string>data.result.token).then(function(userId) {
        //                    console.log("connect success3:" + userId);
        //                    RongIMSDKServer.getConversationList().then(function(list) {
        //                        mainDataServer.conversation.updateConversations();
        //                    });
        //                    RongIMLib.RongUploadLib.init(
        //                      {domain:IMGDOMAIN,drop_element:'',container:'MessageForm',browse_button:'upload-image'},
        //                      {domain:FILEDOMAIN,drop_element:'chatMain',container:'MessageForm',browse_button:'upload-file'}
        //                    );
        //                }, function(error) {
        //                    if (error.tokenError) {
        //                        //token 错误。
        //                    }
        //                    //其他错误
        //                    //TODO:逻辑未处理
        //                });
        //            } else {
        //                $state.go("account.signin");
        //            }
        //        }).error(function(e) {
        //            $state.go("account.signin");
        //        });
        //      }



        var isReconnect = true;
        RongIMSDKServer.setConnectionStatusListener({
            onChanged: function (status: number) {
                var myDate = new Date();
                switch (status) {
                    //链接成功
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功', myDate.toLocaleString());
                        mainDataServer.isConnected = true;
                        showDisconnectErr(false);
                        isConnecting = false;
                        break;
                    //正在链接
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    //重新链接
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        if (!$state.is("account.signin")) {
                            $state.go("account.signin");
                        }
                        break;
                    //其他设备登陆
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        if (!$state.is("account.signin")) {
                            $state.go("account.signin");
                            webimutil.Helper.alertMessage.error("您的账号在其他地方登录!");
                            webimutil.NotificationHelper.showNotification({
                                title: "超火",
                                icon: "assets/img/SealTalk.ico",
                                body: "您的账号在其他地方登录!"
                            })
                            if (window.Electron) {
                                window.Electron.kickedOff();
                            }
                        }
                        break;
                    //网络不可用
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用', myDate.toLocaleString(), 'isConnecting:' + isConnecting);
                        mainDataServer.isConnected = false;
                        showDisconnectErr(true);
                        // if(!isConnecting){
                        isConnecting = true;
                        checkNetwork({
                            onSuccess: function () {
                                reconnectServer();
                            }
                        })
                        // }
                        break;
                }
            }
        })

        webimutil.NotificationHelper.onclick = function (n) {
            if (n.data)
                $state.go("main.chat", { targetId: n.data.targetId, targetType: n.data.targetType });
        }

        var typingTimeID: any;
        var timeOfflineMsg: any;
        RongIMSDKServer.setOnReceiveMessageListener({

            onReceived: function (data: RongIMLib.Message) {
                // console.log(data);
                // var _str = JSON.stringify(data.content);
                // console.log(_str);
                // window["data"] = _str;

                // var _str2 = JSON.parse(_str);
                // console.log(_str2.user.id);
                // console.log(_str2.user.name);
                // console.log(_str2.user.portrait);
             
                // return false; 
                // mainDataServer.loginUser.nickName = _str2.user.name;
                // mainDataServer.loginUser.firstchar = webimutil.ChineseCharacter.getPortraitChar(rep.content.userInfo.name);
                // mainDataServer.loginUser.portraitUri = _str2.user.portrait;
                if ($scope.mainData.loginUser.hasSound) {
                    var eleplay = <any>document.getElementById("playsound");
                    eleplay.play();
                }

                var msg = <any>webimmodel.Message.convertMsg(data);

                //同自己会话删除targetid为空
                // if (msg.targetId == "") {
                //     msg.targetId = mainDataServer.loginUser.id;
                //     RongIMSDKServer.removeConversation(webimmodel.conversationType.Private, "").then(function() {
                //         refreshconversationList();
                //     });
                //     return;
                // }
                //TODO 未来待修改
                if (msg.targetId == "") {
                    msg.targetId = mainDataServer.loginUser.id;
                }

                // if ($state.is("main.chat") && !document.hidden) {
                if ($state.is("main.chat")) {

                    var urls = window.location.href;
                    urls = String(urls.substr(urls.length - 1, urls.length));
                    //mainDataServer.conversation.currentConversation.targetType = urls;
                    //console.log(mainDataServer.conversation.currentConversation.targetType);
                    if (urls != "4") {
                        RongIMSDKServer.clearUnreadCount(mainDataServer.conversation.currentConversation.targetType, mainDataServer.conversation.currentConversation.targetId);
                    }

                }

                switch (data.messageType) {
                    case webimmodel.MessageType.ContactNotificationMessage:
                        RongIMSDKServer.clearUnreadCount(data.conversationType, data.targetId);
                        if (data.hasReceivedByOtherClient) {
                            //已在其他端接收过，不做处理。
                            break;
                        }
                        var contact = <webimmodel.ContactNotificationMessage>msg.content;
                        RongIMSDKServer.removeConversation(msg.conversationType, msg.targetId).then(function () {
                            refreshconversationList();
                        });

                        if (contact.operation == "Request") {
                            //好友请求
                            //添加到通知
                            //TODO:判断是否已经是好友防止离线消息补偿造成错误数据
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
                                //没获取到名称去服务器获取
                                item.portraitUri = msg.userInfo.portrait;
                                item.name = msg.userInfo.name;

                                item.firstchar = webimutil.ChineseCharacter.getPortraitChar(item.name);
                                mainDataServer.notification.addNotification(item);
                                console.log("头像==" + msg.userInfo.portrait);

                                // mainServer.user.getInfoS(contact.sourceUserId).success(function (rep) {
                                //     //console.log(rep)
                                //     item.name = rep.content.userInfo.name;
                                //     item.portraitUri = rep.content.userInfo.avatar;
                                //     //                                  item.name = rep.result.nickname;
                                //     //                                  item.portraitUri = rep.result.portraitUri;
                                //     item.firstchar = webimutil.ChineseCharacter.getPortraitChar(item.name);
                                //     mainDataServer.notification.addNotification(item);
                                // }).error(function () {
                                // })
                            } else {
                                mainDataServer.notification.addNotification(item);
                            }
                        } else if (contact.operation == "AcceptResponse") {
                            //对方已同意
                            //好友列表里添加好友or同步好友列表
                            var friend = mainDataServer.contactsList.getFriendById(contact.sourceUserId);
                            if (!friend) {
                                mainServer.user.getInfoS(contact.sourceUserId).success(function (rep) {
                                    var res = rep.content;
                                    mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                                        id: res.userInfo.userFriendUserId,
                                        name: res.userInfo.name,
                                        imgSrc: res.userInfo.avatar
                                    }));
                                    //                                  var res = rep.result;
                                    //                                  mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                                    //                                      id: res.id,
                                    //                                      name: res.nickname,
                                    //                                      imgSrc: res.portraitUri
                                    //                                  }));
                                    refreshconversationList();
                                }).error(function () {
                                    mainDataServer.contactsList.addFriend(new webimmodel.Friend({
                                        id: contact.sourceUserId,
                                        name: "网络原因暂未取到",
                                        imgSrc: ""
                                    }));
                                    refreshconversationList();
                                    // throw new Error("好友信息获取失败");
                                })
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
                        /*                      	  var withDrawMsg = <ImageViewMessage>data.content;
                                                       conversationServer.addWithDrawMessageCache(msg.senderUserId, msg.conversationType, withDrawMsg.messageUId);
                                                       conversationServer.delWithDrawMessage(msg.senderUserId, msg.conversationType, withDrawMsg.messageUId);
                                                       if(msg.senderUserId == mainDataServer.loginUser.id){
                                                         msg.imageViewUrl = msg.content.imageViewUrl;
                                                       }
                                                       else{
                                                         conversationServer.messageAddUserInfo(msg);
                                                         msg.content = msg.senderUserName + msg.content;
                                                       }*/
                        // console.log("0008");
                        addmessage(msg);
                    case webimmodel.MessageType.ImgMessage:
                        addmessage(msg);
                    case webimmodel.MessageType.VideoMessage:
                        addmessage(msg);
                    case webimmodel.MessageType.VideoMsg:
                        addmessage(msg);
                    case webimmodel.MessageType.RichContentMessage:
                    case webimmodel.MessageType.FileMessage:
                        //隐藏正在输入状态
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

                        // if ($state.is("main.chat") && !document.hidden && msg.senderUserId != mainDataServer.loginUser.id && msg.conversationType == webimmodel.conversationType.Group){
                        //   conversationServer.sendSyncReadStatusMessage(mainDataServer.conversation.currentConversation.targetId, mainDataServer.conversation.currentConversation.targetType, data.sentTime);
                        // }
                        addmessage(msg);
                        //TODO 判断是@消息时添加
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
                                //                             mainServer.user.getInfo(msg.senderUserId).then(function (rep) {
                                //                                msg.senderUserName = rep.content.name;
                                //                                webimutil.NotificationHelper.showNotification({
                                //                                    title: msg.senderUserName + "(非好友)",
                                //                                    icon: "assets/img/SealTalk.ico",
                                //                                    body: webimmodel.Message.messageToNotification(data, mainDataServer.loginUser.id, true), data: { targetId: msg.targetId, targetType: msg.conversationType }
                                //                                });
                                //                            });
                            }
                        }
                        break;
                    case webimmodel.MessageType.GroupNotificationMessage:
                        if (data.objectName == "RC:GrpNtf" && !data.hasReceivedByOtherClient) {
                            //群组信息更新，已经在其他端接收过不做处理。
                            var groupNotification = <any>data.content;
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
                                                //                                              mainDataServer.contactsList.addGroupMember(groupid, new webimmodel.Member({
                                                //                                                  id: rep.result.id,
                                                //                                                  name: rep.result.nickname,
                                                //                                                  imgSrc: rep.result.portraitUri,
                                                //                                                  role: "1"
                                                //                                              }));
                                            }).error(function () {

                                            });
                                        }
                                    } else {
                                        mainServer.group.getById(groupid).success(function (rep) {
                                            //console.log(rep);
                                            var temporarynotifi = new webimmodel.WarningNoticeMessage(groupNotification.data.data.operatorNickname + "邀请你加入了群组");
                                            mainDataServer.notification.addNotification(temporarynotifi);
                                            if (!$state.is("main.notification")) {
                                                mainDataServer.notification.hasNewNotification = true;
                                            }
                                            //3.19注释
                                            //                                          mainDataServer.contactsList.addGroup(new webimmodel.Group({
                                            //                                          	unSpeak:rep.result.unSpeak,
                                            //                                              ida: rep.result.id,
                                            //                                              id: rep.result.id,
                                            //                                              name: rep.result.name,
                                            //                                              imgSrc: rep.result.portraitUri,
                                            //                                              upperlimit: 3000,
                                            //                                              fact: 1,
                                            //                                              creater: rep.result.creatorId
                                            //                                          }));
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

                                        })
                                    }
                                    break;
                                case "Quit":
                                    var changemembers = groupNotification.data.data.targetUserIds.join().split(",");
                                    var groupid = data.targetId;
                                    var self = changemembers.indexOf(mainDataServer.loginUser.id + "");
                                    if (self == -1) {
                                        mainDataServer.contactsList.removeGroupMember(groupid, changemembers[0]);
                                    } else {
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
                                    } else {
                                        var temporarynotifi = new webimmodel.WarningNoticeMessage(groupNotification.data.data.operatorNickname + '将你移出了群组');
                                        mainDataServer.notification.addNotification(temporarynotifi);
                                        if (!$state.is("main.notification")) {
                                            mainDataServer.notification.hasNewNotification = true;
                                        }
                                        mainDataServer.contactsList.removeGroup(groupid);
                                        RongIMSDKServer.removeConversation(webimmodel.conversationType.Group, groupid).then(function () {
                                            refreshconversationList();
                                        });
                                        //退出会话状态
                                        if ($state.is("main.chat") && $state.params["targetId"] == groupid && $state.params["targetType"] == webimmodel.conversationType.Group) {
                                            $state.go("main");
                                        }
                                    }
                                    break;
                                case "Rename":
                                    // console.log("TODO:暂不做修改群组名称");

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
                                        //3.19注释
                                        //                                      mainDataServer.contactsList.addGroup(new webimmodel.Group({
                                        //                                      	unSpeak:rep.result.unSpeak,
                                        //                                          ida: rep.result.id,
                                        //                                          id: rep.result.id,
                                        //                                          name: rep.result.name,
                                        //                                          imgSrc: rep.result.portraitUri,
                                        //                                          upperlimit: 3000,
                                        //                                          fact: 1,
                                        //                                          creater: rep.result.creatorId
                                        //                                      }));
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
                                    //退出会话状态
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
                        //清除会话已读状态,改变消息总数
                        if (msg.objectName == 'RC:ReadNtf' && msg.senderUserId == mainDataServer.loginUser.id) {
                            RongIMSDKServer.clearUnreadCount(msg.conversationType, msg.targetId);
                            var curCon = mainDataServer.conversation.getConversation(msg.conversationType, msg.targetId);
                            if (curCon) {
                                curCon.atStr = '';
                                mainDataServer.conversation.totalUnreadCount = mainDataServer.conversation.totalUnreadCount - curCon.unReadNum;
                                curCon.unReadNum = 0;
                            }
                            //去除消息的未读状态
                        }
                        break;
                    case webimmodel.MessageType.RecallCommandMessage:
                        if (msg.objectName == 'RC:RcCmd') {
                            // var withDrawMsg = <any>data.content;
                            // conversationServer.addWithDrawMessageCache(msg.senderUserId, msg.conversationType, withDrawMsg.messageUId);
                            // conversationServer.delWithDrawMessage(msg.senderUserId, msg.conversationType, withDrawMsg.messageUId);
                            // if(msg.senderUserId == mainDataServer.loginUser.id){
                            //   msg.content = '你' + msg.content;
                            // }
                            // else{
                            //   conversationServer.messageAddUserInfo(msg);
                            //   msg.content = msg.senderUserName + msg.content;
                            // }
                            // addmessage(msg);
                        }
                        break;
                    case webimmodel.MessageType.TypingStatusMessage:
                        //判断如果为当前输入页面用户
                        if ($state.is("main.chat") && !document.hidden && msg.conversationType == webimmodel.conversationType.Private && msg.senderUserId == mainDataServer.conversation.currentConversation.targetId) {
                            mainDataServer.isTyping = true;
                            if (typingTimeID) { clearTimeout(typingTimeID); }
                            typingTimeID = setTimeout(function () {
                                mainDataServer.isTyping = false;
                                $scope.$apply();
                            }, 6000);
                        }

                        break;
                    case webimmodel.MessageType.InviteMessage:
                    case webimmodel.MessageType.HungupMessage:
                        //判断如果为当前输入页面用户
                        // msg.content = msg.senderUserName + msg.content;
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
                        // var ids = msg.content.receiptMessageDic[RongIMLib.Bridge._client.userId];
                        var receiptResponseItem = <any>data.content;
                        var ids = receiptResponseItem.receiptMessageDic[mainDataServer.loginUser.id];
                        if (!ids) {
                            return;
                        }
                        for (var i = 0, len = ids.length; i < len; i++) {
                            // console.log(ids[i], msg.receiptResponse[ids[i]]);
                            var itemById = conversationServer.getMessageById(msg.targetId, msg.conversationType, ids[i]);
                            if (itemById && msg.receiptResponse && msg.receiptResponse[ids[i]]) {
                                itemById.receiptResponse = msg.receiptResponse;
                                // $('#' + ids[i]).find('span.receiptResponse').text(msg.receiptResponse[ids[i]] + '人已读');
                            }

                            //遍历,更新缓存中消息的receiptResponse
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
                        console.log(data.messageType + "：未处理")
                        break;
                }

                // $scope.mainData.conversation.updateConversations();
                $scope.mainData.conversation.updateConStatic(msg, true, $state.is("main.chat") && !document.hidden);
                $scope.$apply();

            }
        })

        function addmessage(msg: webimmodel.Message) {
            var hislist = conversationServer.historyMessagesCache[msg.conversationType + "_" + msg.targetId] = conversationServer.historyMessagesCache[msg.conversationType + "_" + msg.targetId] || []
            if (hislist.length == 0) {
                hislist.push(new webimmodel.GetHistoryPanel());
                if (msg.sentTime.toLocaleDateString() != (new Date()).toLocaleDateString())
                    hislist.push(new webimmodel.TimePanl(msg.sentTime));
            }
            conversationServer.addHistoryMessages(msg.targetId, msg.conversationType, msg);
            //          if (msg.messageType == webimmodel.MessageType.ImageMessage) {
            //              setTimeout(function() {
            //                  $scope.$broadcast("msglistchange");
            //              }, 200)
            //          } else {
            //              $scope.$broadcast("msglistchange");
            //          }
            if (msg.messageType == webimmodel.MessageType.ImageViewMessage || msg.messageType == webimmodel.MessageType.ImageMessage) {
                //alert(1);
                setTimeout(function () {
                    $scope.$broadcast("msglistchange");
                }, 200)
            } else {
                $scope.$broadcast("msglistchange");
            }
        }


        function showDisconnectErr(flag: boolean) {
            var ele = <any>document.querySelector(".no_network");
            if (ele) {
                ele.style.visibility = flag ? 'visible' : 'hidden';
            }
            var sendBtn = document.querySelector(".sendBtn");
            if (sendBtn) {
                sendBtn.className = flag ? 'sendBtn disabled' : 'sendBtn';
            }
        }

        var reconnectTimes = 0, timeInterval = 20, timeID: any, reconnectTimeID: any;
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
                        } else {
                            reconnectTimes = 0;
                            var myDate = new Date();
                            console.log("网络正常重连失败！！！", myDate.toLocaleString());
                        }
                    }
                });
            }, timeInterval * reconnectTimes * 1000);
        }

        function checkNetwork(callback: any) {
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
