const { api, config, path } = require('../../utils/config.js');
const { changeNum } = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
	data: {
		initData: [],  
<<<<<<< HEAD
    we: [],
=======
    we: false,
    isLike: true
>>>>>>> cf1085312990b5cb08233ca7621078deb3b02422
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
        token: config.token,
        user_id: app.globalData.user_id
      },
      success: function (res) {
        wx.hideLoading();
        // var we = [];
        // if (res.data.rank_list.we){
        //   we = res.data.rank_list.we
        // }
        console.log(res.data.rank_list.we);
        _this.setData({
          initData: res.data.rank_list,
          we: res.data.rank_list.we
        })
      }
    });
	},
})
