(function ($) {
	$(function () {

		// 获取 登录账号 如果是财务只读 则 _onlylook = 1;
		var _onlylook = 0;
		var _name = $.cookie("usernameq");
		if (_name == "chaohuocw") {
			_onlylook = 1;
		}
		// alert(_onlylook);
		var pagerBox = document.getElementById('pager');

		var oTableTr = '', pageNum = 0, numTotal = 0, pageSize = 10;
		var searchWord;

		if (_onlylook == 0) {
			var oTableString = `<tr>
								<td>日期</td>
								<td>用户详情</td>
								<td>提现金额</td>
								<td>手续费</td>
								<td>实际打款</td>
								<td>状态</td>
								<td>操作</td>
							</tr>`;
		}
		else if (_onlylook == 1) {
			var oTableString = `<tr>
								<td>日期</td>
								<td>用户详情</td>
								<td>提现金额</td>
								<td>手续费</td>
								<td>实际打款</td>
								<td>状态</td>
							</tr>`;
		}


		var dataId;
		var isStatus;
		var isDetail;
		var searchWord;

		function doChangePage() {
			oTableTr = '';
			getAllWithdraw(searchWord, (this.__index) - 1, pageSize, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					var tableLength = reqs.content.list;
					for (var i = 0; i < tableLength.length; i++) {
						if (tableLength[i].phone == null) {
							tableLength[i].phone = "未知";
						}
						switch (tableLength[i].status) {
							case 0:
								isStatus = "待打款";
								isDetail = `<span class="agree" dataId="${tableLength[i].id}">打款</span>
											<span class="refuse" dataId="${tableLength[i].id}">拒绝</span>`;
								break;
							case 1:
								isStatus = "已打款";
								isDetail = `<i dataId="${tableLength[i].id}">已经打款了</i>`;
								break;
							case -1:
								isStatus = "已拒绝";
								isDetail = `<i>已经拒绝打款</i>`;
								break;
						};
						if (_onlylook == 0) {
							oTableTr += `<tr>
										<td>
											<p>${formatDate(new Date(tableLength[i].createTime))}</p>
										</td>
										<td>
											<p>姓名:${tableLength[i].name}</p>
											<p>电话:${tableLength[i].phone}</p>
											<p>账号:${tableLength[i].cardNum}</p>
										</td>
										<td>${tableLength[i].yuanmoney}元</td>
										<td>${tableLength[i].servicemoney}元</td>
										<td>${tableLength[i].realmoney}元</td>
										<td>${isStatus}</td>
										<td>${isDetail}</td>
									</tr>`;
						}
						else if(_onlylook == 1){
							oTableTr += `<tr>
										<td>
											<p>${formatDate(new Date(tableLength[i].createTime))}</p>
										</td>
										<td>
											<p>姓名:${tableLength[i].name}</p>
											<p>电话:${tableLength[i].phone}</p>
											<p>账号:${tableLength[i].cardNum}</p>
										</td>
										<td>${tableLength[i].yuanmoney}元</td>
										<td>${tableLength[i].servicemoney}元</td>
										<td>${tableLength[i].realmoney}元</td>
										<td>${isStatus}</td>
									</tr>`;
						}

					}

					$('.finance-main .index-table').html("");
					$('.finance-main .index-table').append(oTableString + oTableTr);
				} else {
					alert(reqs.msg);
				}

			})
		};


		getAllWithdraw(searchWord, 0, pageSize, function (reqs) {
			//console.log(reqs);
			pageNum = reqs.content.totalPages;
			numTotal = reqs.content.totalElements;
		});


		$('.index-total').html("共有数据：" + numTotal + "条");

		$(document).on('click', '.agree', function () {
			$('.through-wrap').show();
			dataId = $(this).attr("dataId");
			getOneWithdrawDetail(dataId, function (reqs) {
				//console.log(reqs);
				if (reqs.code == 1) {
					$('.through-wrap .serviceMoney').html("手续费：" + reqs.content.servicemoney + "元");
					$('.through-wrap .realMoney').html("实际打款：" + reqs.content.realmoney + "元");
					$('.through-wrap .name').html("姓名：" + reqs.content.name);
					$('.through-wrap .cardNum').html("账号：" + reqs.content.cardNum);
				} else {
					alert("错误信息" + reqs.msg);
				}
			})
		})
		$(document).on('click', '.refuse', function () {
			$('.nothrough-wrap').show();
			dataId = $(this).attr("dataId");
		})
		$(document).on('click', '.through-cancel', function () {
			$('.through-wrap').hide();
		})
		$(document).on('click', '.nothrough-cancel', function () {
			$('.nothrough-wrap').hide();
		})
		//同意打款
		$(document).on('click', '.through-confirm', function () {
			var id = dataId;
			var msg = $('.agree-reason').val();
			dealWithdrawOrder(id, 1, msg, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					alert("处理成功!");
					location.reload();
				} else {
					alert("错误信息" + reqs.msg);
				}

			})
		})
		//拒绝打款
		$(document).on('click', '.nothrough-confirm', function () {
			var id = dataId;
			var msg = $('.refuse-reason').val();
			dealWithdrawOrder(id, -1, msg, function (reqs) {
				console.log(reqs);
				if (reqs.code == 1) {
					alert("已拒绝打款!");
					location.reload();
				} else {
					alert("错误信息" + reqs.msg);
				}

			})
		})

		$(document).on('click', '.index-search', function () {
			searchWord = $('.search-word').val();
			oTableTr = '';
			getAllWithdraw(searchWord, 0, pageSize, function (reqs) {
				//console.log(reqs);
				pageNum = reqs.content.totalPages;
				numTotal = reqs.content.totalElements;
				$('.index-total').html("共有数据：" + numTotal + "条");
				if (reqs.code == 1) {
					$('.pager-box').remove();
					var tableLength = reqs.content.list;
					for (var i = 0; i < tableLength.length; i++) {
						if (tableLength[i].phone == null) {
							tableLength[i].phone = "未知";
						}
						switch (tableLength[i].status) {
							case 0:
								isStatus = "待打款";
								isDetail = `<span class="agree" dataId="${tableLength[i].id}">打款</span>
											<span class="refuse" dataId="${tableLength[i].id}">拒绝</span>`;
								break;
							case 1:
								isStatus = "已打款";
								isDetail = `<i class="agree" dataId="${tableLength[i].id}">已经打款了</i>`;
								break;
							case -1:
								isStatus = "已拒绝";
								isDetail = `<i>已经拒绝打款</i>`;
								break;
						};
						oTableTr += `<tr>
										<td>
											<p>${formatDate(new Date(tableLength[i].createTime))}</p>
										</td>
										<td>
											<p>姓名:${tableLength[i].name}</p>
											<p>电话:${tableLength[i].phone}</p>
											<p>账号:${tableLength[i].cardNum}</p>
										</td>
										<td>${tableLength[i].yuanmoney}元</td>
										<td>${tableLength[i].servicemoney}元</td>
										<td>${tableLength[i].realmoney}元</td>
										<td>${isStatus}</td>
										<td>${isDetail}</td>
									</tr>`;
					}

					$('.finance-main .index-table').html("");
					$('.finance-main .index-table').append(oTableString + oTableTr);

				} else {
					alert(reqs.msg);
				}
				var pager = new Pager({
					index: 1,
					total: pageNum,
					parent: pagerBox,
					onchange: doChangePage
				});

			})
		});

		var pager = new Pager({
			index: 1,
			total: pageNum,
			parent: pagerBox,
			onchange: doChangePage
		});


	})
})(jQuery)
