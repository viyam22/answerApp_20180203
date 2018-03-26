const { api, config, path } = require('../../utils/config.js');

//获取应用实例
const app = getApp();


Page({
  data: {
    userInfo: null,
    sore:'',

  },
  onShow: function () {
  
    // wx.showLoading({
    //   title: '加载中...',
    // });
    // var _this = this;
    // var has_open=setInterval(function(){
    //   if (app.globalData.user_id){
    //       clearInterval(has_open);
    //       wx.hideLoading();
    //       //请求后台获取个人积分
    //       wx.request({
    //         url: config.route + api.mySore,
    //         data: {
    //           user_id: app.globalData.user_id,
    //           token: config.token
    //         },
    //         success: function (res) {
    //           app.globalData.sore = res.data;
    //           _this.setData({
    //             sore: res.data
    //           });
    //         }
    //       });

    //     }else{
    //       return false;
    //     }
    // },1000);

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },

  // 跳转页面到题库
  toTopicPage: function() {
    wx.navigateTo({
      url: path.topicPage
    })
  },

  // 跳转页面到活动说明页
  toDescPage: function() {
    wx.navigateTo({
      url: path.descPage
    })
  },

  // 跳转页面到礼品中心页面
  toGiftPage: function() {
    wx.navigateTo({
      url: path.giftPage
    })
  },

  // 跳转页面到上传题库页面
  toGiftPage: function() {
    wx.navigateTo({
      url: path.uploadPage
    })
  },

  // 跳转页面到审查页面
  toGiftPage: function() {
    wx.navigateTo({
      url: path.reviewPage
    })
  },

  // 跳转页面到排行页面
  toGiftPage: function() {
    wx.navigateTo({
      url: path.rankPage
    })
  },

  // 跳转页面到我的错题库
  toWrongPage: function() {
    wx.navigateTo({
      url: path.wrongPage
    })
  },
  onShareAppMessage: function (res) {
    var _this = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: config.share_msg,
      imageUrl: config.share_image,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  orderSign: function (e) {
    wx.navigateTo({
      url: path.topicPage
    })
    var fId = e.detail.formId;
    //查看是否答过题提交过 formId
    wx.request({
      url: config.route + api.formId,
      data: {
        user_id: app.globalData.user_id,
        token: config.token,
        fId: fId
      },
      success: function (res) {
        
      }
    });

  
  }
})
