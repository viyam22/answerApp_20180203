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
      url: '../topic-list/topic-list?type=' + e.target.dataset.type
    })
  }
})
