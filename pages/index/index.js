//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('app:', app);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  // 跳转页面到题库
  toTopicPage: function() {
    wx.navigateTo({
      url: '../topic/topic'
    })
  },

  // 跳转页面到活动说明页
  toDescPage: function() {
    wx.navigateTo({
      url: '../desc/desc'
    })
  },

  // 跳转页面到礼品中心页面
  toGiftPage: function() {
    wx.navigateTo({
      url: '../gift/gift'
    })
  },

  // 跳转页面到我的错题库
  toWrongPage: function() {
    wx.navigateTo({
      url: '../wrong/wrong'
    })
  },
})
