//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		initData: [{
			title: '在Word 2003中，设定打印纸张大小时，应当使用的命令是',  //题目
			type: 0,  //题目类型 0是单项选择  1是多项 2是判断
			option: [{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: true,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			}] 
		},{
			title: '在Word 2003中，设定打印纸张大小时，应当使用的命令是',  //题目
			type: 0,  //题目类型 0是单项选择  1是多项 2是判断
			option: [{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: true,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			}] 
		}],
		showData: [],
		currentIndex: 0,    // 当前题目的下标
	},

	onLoad: function(options) {
		var _this = this;
		_this.showTypeExam(options.type);
	},

	initData: function() {
		var _this = this;
		var initData = _this.data.initData;
		// 接口获取数据
		for (var i = 0, len = initData.length; i < len; i++) {
			initData[i].num = changeNum(i);
			for (var j = 0; j < initData[i].option.length; j ++) {
				initData[i].option[j].itemType = 'item-default';
			}
		}
		_this.setData({ 
			showData: initData[currentIndex], 
			initData: initData
		})
	},

	selectAnswer: function(e) {
		var _this = this;
		var data = _this.data.showData;
		var index = parseInt(e.target.dataset.option);
		if (data.type === 1) {  // 多项选择时，不触发
			data.option[index].isSelected = true;
			return;
		}
		if (data.option[index].attr) {
			data.option[index].itemType = 'item-right';
			return;
		} 
		data.option[index].itemType = 'item-wrong';
		for (var i = 0, len = data.option.length; i < len; i++) {
			if (data.option[i].attr) {
				data.option[index].itemType = 'item-right',
			}
		}

		_this.setData({ showData: data })
	},

	selectMul: function() {
		var _this = this;
		var data = _this.data.showData;
		var index = parseInt(e.target.dataset.option);

		for (var i = 0, len = data.option.length; i < len; i++) {
			if (data.option[i].attr) {
				data.option[index].itemType = 'item-right',
			}
		}
	},

	// 下一题
	nextQuestion: function() {
		_this.setData({
			currentIndex: _this.data.currentIndex++,
			showData: _this.data.initData[_this.data.currentIndex + 1]
		})
	},


	// 数字改汉字1-99
	changeNum: function(i) {
		var chineseNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		var chineseNum;
		if (i <= 10) {
			return chineseNum[i];
		} else if (i > 10 && i < 100) {
			var decade = Math.floor(i / 10);
			var result;
			if (decade === 1) {
				return '十' + chineseNum[i - decade * 10];
			} else {
				return chineseNum[decade + 1] + '十' + chineseNum[i - decade * 10]
			}
		} 
	},


	// 显示相应的题库
	showTypeExam: function(type) {
		var barTitle;
		switch (type) {
			case '0':
				barTitle = '单项选择题';
				break;
			case '1':
				barTitle = '多项选择题';
				break;
			case '2':
				barTitle = '判断题';
				break;
			default:
				barTitle = ' ';
				break;
		};
		wx.setNavigationBarTitle({
		  title: barTitle
		})
	},


})
