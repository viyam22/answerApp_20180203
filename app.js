//app.js
const { api, config, path } = require('utils/config.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code;
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              var _this = this;
      
              //获取缓存user_id
              wx.getStorage({
                key: 'user_id',
                success: function (res) {
                  _this.globalData.user_id = res.data;
                
                },
                fail:function(res){
                  _this.get_openid();
                }
              })
       
            
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  get_openid:function(){
    var _this = this;
    wx.request({
      url: config.route + 'index/Weixin/index',
      data: {
        code: _this.globalData.code,
        open_name: _this.globalData.userInfo.nickName,
        open_face: _this.globalData.userInfo.avatarUrl,
        token: config.token
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //缓存user_id
        wx.setStorage({
          key: "user_id",
          data: res.data.id
        })
        _this.globalData.user_id = res.data.id;
      }
    })
  }
})