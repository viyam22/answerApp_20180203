const { api, config, path } = require('../../utils/config.js');
const { changeNum } = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
	data: {
		initData: [],  
	},
	onLoad: function() {
    wx.showLoading({
      title: '加载中...',
    });
    //请求后台获取排行榜
    var _this = this;
    wx.request({
      url: config.route + api.score_rank,
      data: {
        token: config.token
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        _this.setData({
          initData: res.data
        })
      }
    });
	},
})
