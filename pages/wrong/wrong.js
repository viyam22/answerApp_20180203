const { api, config, path } = require('../../utils/config.js');
const app = getApp()

Page({
	/*** 跳转页面到题库列表
	 *   参数type：
	 *   0 word
	 *   1 ppt
	 *   2 excel
	 *   3 cad
	 ***/
  toTopicListPage: function(e) {
  	console.log('e', e);
    wx.navigateTo({
      url: path.topicListPage + '?type=' + e.target.dataset.type
    })
  }
})
