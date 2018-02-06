//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		initData:[{
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
	},

	// 数字改汉字
	changeNum: function(i) {
		var chineseNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		var chineseNum;
		if (i <= 10) {
			return chineseNum[i];
		} else if (i > 10 && i < 20) {
			return chineseNum[i - 10];
		} //  后续继续...
	},

	onLoad: function(options) {
		var _this = this;
		_this.showTypeExam(options.type);
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
