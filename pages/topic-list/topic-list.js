//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		initData: [{
			difficulty: 1,   // 难度 接口回来的数据
			examId: 0,           // 试题id
		},{
			difficulty: 2,
			examId: 0, 
		},{
			difficulty: 3,
			examId: 0, 
		},{
			difficulty: 1,
			examId: 0, 
		}],
		examData: [],  // 处理过的数据
		type: ''       // 题库类型
	},
	onLoad: function(options) {
		var _this = this;
		_this.setData({ type: options.type })
		_this.showTypePage(options.type);

		// 接口拿数据
		// 放入initData中
		// 再执行_this.initExamData();
		_this.initExamData();
	},

	// 初始化试题
	initExamData: function() {
		var _this = this;
		console.log('_this.data.initData', _this.data.initData)
		var examData = [];
		for (var i = 0, len = _this.data.initData.length; i < len; i++) {
			var attr = {
				isExpand: false,  // 是否展开
				examNum: '',      // 试题序号
				difficulty: _this.data.initData[i].difficulty,  //难度
				examIconClass: 'expand',  // icon样式
				examType: '',      // 选中的试题类型
				examId: 0,        // 试题id
			}
			
			attr.examNum = '试题' + _this.changeNum(i);
			examData.push(attr);
		}
		_this.setData({ examData: examData });
		console.log(_this.data.examData);
	},

	// 将数字转化为汉字
	changeNum: function(i) {
		var chineseNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		var chineseNum;
		if (i <= 10) {
			return chineseNum[i];
		} else if (i > 10 && i < 20) {
			return chineseNum[i - 10];
		} //  后续继续...
	},

	// 显示相应的题库
	showTypePage: function(type) {
		var barTitle;
		switch (type) {
			case '0':
				barTitle = 'Word题库';
				break;
			case '1':
				barTitle = 'Power point题库';
				break;
			case '2':
				barTitle = 'Excel题库';
				break;
			case '3':
				barTitle = 'CAD题库';
				break;
			default:
				barTitle = '题库';
				break;
		};
		wx.setNavigationBarTitle({
		  title: barTitle
		})
	},

	// 收起、展开试题详情
	// toggleDesc: function(e) {
	// 	var index = e.target.dataset.index;
	// 	_this.data.examData[index].isExpand = !_this.data.examData[index].isExpand;
	// 	_this.data.examData[index].examIconClass = _this.data.examData[index].isExpand === true ? 'expand' : 'reconre';
	// },

	// 选择试题类型
	// selectedExamType: function(e) {
	// 	var _this = this;
	// 	var examData = _this.data.examData;
	// 	examData[e.target.dataset.index].examType = e.target.dataset.examtype;
	// 	console.log('e', e, examData)

	// 	_this.setData({ examData: examData })
	// },

	// 开始答题按钮
	// starExam: function(e) {
	// 	var _this = this;
	// 	if (!_this.data.examData[e.target.dataset.index].examType) {
	// 		wx.showToast({
	// 			title: '请选择试题类型',
	// 			icon: 'none',
	// 			duration: 2000
	// 		})
	// 		console.log('请选择该试题的答题类型');
	// 		return;
	// 	}
	// 	wx.navigateTo({
	//       url: '../question/question?examid=' + 
	//       		_this.data.examData[e.target.dataset.index].examId 
	//       		+ '&type=' + e.target.dataset.examtype
	//     })
	// },

	// 去到答题页
	toQuestionPage: function(e) {
		var _this = this;
		wx.navigateTo({
	      url: '../question/question?examid=' + 
	      		_this.data.initData[e.target.dataset.index].examId
	    })
	}
})
