const { api, config, path } = require('../../utils/config.js');
const { changeNum } = require('../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
	data: {
		initData: [{
			title: '在Word 2003中，设定打印纸张大小时，应当使用的命令是',  //题目
			label: '第一题 判断题',  
			type: 2,  //题目类型 0是单项选择  1是多项 2是判断
			option: [{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: true,       //选项是否正确
			}] 
		},{
			title: '在Word 2003中，设定打印纸张大小时，应当使用的命令是',  //题目
			label: '第二题 单项选择题',  
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
			label: '第三题 多项选择题',  
			type: 1,  //题目类型 0是单项选择  1是多项 2是判断
			option: [{
				text: '文件"菜单中的"页面设置"命令',   
				attr: false,       //选项是否正确
			},{
				text: '文件"菜单中的"页面设置"命令',   
				attr: true,       //选项是否正确
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
		time: 0,        //  倒计时
		isLessTime: false,    // 是否剩时不多
		timeInterval: null,    // 计时器
	},

	onLoad: function(options) {
		var _this = this;
		// _this.showTypeExam(options.type);
		_this.initData(options.examid);   // 从地址栏获取该试题的id传入参数
		_this.countDownTime();		
	},

	initData: function(id) {
		var _this = this;
		var initData = _this.data.initData;
		// 接口获取数据，传入initData
		for (var i = 0, len = initData.length; i < len; i++) {
			initData[i].num = '试题' + changeNum(i);
			for (var j = 0; j < initData[i].option.length; j ++) {
				initData[i].option[j].itemClass = 'item-default';
			}
		}
		_this.setData({ 
			showData: initData[_this.data.currentIndex], 
			initData: initData
		})
	},

	// 选择答案
	selectAnswer: function(e) {
		var _this = this;
		var data = _this.data.showData;
		var index = parseInt(e.target.dataset.option);

		// 多项选择时，标记答案
		if (data.type === 1) {  
			data.option[index].isSelected = true;
			data.option[index].itemClass = 'item-selected';
			_this.setData({ showData: data })
			return;
		}
		
		// 非多项选择答对时
		if (data.option[index].attr) {
			data.option[index].itemClass = 'item-right';
			_this.nextQuestion(data);
			return;
		} 

		// 非多项选择答错时
		data.option[index].itemClass = 'item-wrong';
		for (var i = 0, len = data.option.length; i < len; i++) {
			if (data.option[i].attr) {
				data.option[i].itemClass = 'item-right';
			}
		}
		_this.nextQuestion(data);
	},

	// 多选判断
	selectMul: function() {
		var _this = this;
		var data = _this.data.showData;
		console.log('_this.data.showData', _this.data.showData);

		for (var i = 0, len = data.option.length; i < len; i++) {
			if (data.option[i].attr) {  // 如果正确
				data.option[i].itemClass = 'item-right';
			}
			if (data.option[i].isSelected && !data.option[i].attr) {  // 如果错误
				data.option[i].itemClass = 'item-wrong';
			}
		}
		console.log('data', data)
		_this.nextQuestion(data);
	},

	// 下一题
	nextQuestion: function(data) {
		var _this = this;
		var currentIndex = _this.data.currentIndex + 1;
		_this.setData({ showData: data })
		
		// 完成答题
		if (currentIndex >= _this.data.initData.length) {
			clearInterval(_this.data.timeInterval);
			wx.showToast({
			  title: '完成答题',
			  icon: 'success',
			  duration: config.nextQuestionTime
			})
			setTimeout(() => {
				wx.navigateTo({
		      url: path.indexPage
		    })
			}, config.nextQuestionTime)
			return;
		}

		setTimeout(() => {
			_this.setData({
				currentIndex: currentIndex,
				showData: _this.data.initData[currentIndex]
			})
		}, config.nextQuestionTime)
	},

	// 时间倒计时
	countDownTime: function() {
		var _this = this;
		// 初始化时间
		_this.setData({ time: config.questionTime })

		// 倒计时
		var timeInterval = setInterval(function() {
			if (_this.data.time === config.lessTime + 1) {
				_this.setData({ isLessTime: true })
			}
			if (_this.data.time === 0) {
				clearInterval(_this.data.timeInterval);
				return;
			}
			_this.setData({ time: _this.data.time-1 })
		}, 1000)
		_this.setData({ timeInterval: timeInterval })
	}


	// 显示相应的题库
	// showTypeExam: function(type) {
	// 	var barTitle;
	// 	switch (type) {
	// 		case '0':
	// 			barTitle = '单项选择题';
	// 			break;
	// 		case '1':
	// 			barTitle = '多项选择题';
	// 			break;
	// 		case '2':
	// 			barTitle = '判断题';
	// 			break;
	// 		default:
	// 			barTitle = ' ';
	// 			break;
	// 	};
	// 	wx.setNavigationBarTitle({
	// 	  title: barTitle
	// 	})
	// },


})
