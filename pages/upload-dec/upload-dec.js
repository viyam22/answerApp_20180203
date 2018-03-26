const { api, config, path } = require('../../utils/config.js');

// directory.js
var address = require('../../utils/city.js')
var animation
var app = getApp();
Page({

  /**
   * @initData: 页面的初始数据
   */
  data: {
    initData: {
      type: [],   // 题目类型
    },

  	// 填写信息
    typeIndex: null,  // 选择题目类型的下标
    inputContent: '',   // 上传题目内容
  	
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    });
    //请求后台获取礼品
    var _this = this;
    wx.request({
      url: config.route + api.getPrize,
      data: {
        token: config.token
      },
      success: function (res) {
        console.log('gift',res)
        wx.hideLoading();
        _this.setData({
          prizeImg: res.data.imgUrl,
          prizeName: res.data.name,
          needIntegral: res.data.needIntegral,
          hasIntegral: app.globalData.sore,
          initData:{
            departmentArray: res.data.gdj
          }
        })
      }
    });
  },

 /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var _this = this;
    // _this.showExchangeBtn(); 
    // app.getUserInfo(function() {
    //   _this.initData();
    // })
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    _this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    _this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },


	/**
	* 页面代码
	*/

  // 题目类型选择
  typeChange: function(e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  // 获取表单信息
  getInputVal: function(e) {
    var _this = this;
    var content = '';
    
    if (e.target.dataset.type === 'content') {
      _this.setData({
        inputContent: e.detail.value,
      })
      console.log(this.data.inputContent)
    };
  },


  sendInfo: function() {
    var _this = this;

    if (!_this.data.isCanSubmit) return;
    var typeIndex=_this.data.typeIndex;  
   
    var postData = {
      inputContent: _this.data.inputContent.replace(/\s/g,""),
      from2: _this.data.initData.type[typeIndex]
    }

    var title;
    if (!typeIndex) {
      _this.showToast('请选择所属供电局');
      return;
    } else if (postData.inputContent.length < 0) {
      _this.showToast('请输入题目内容');
      return;
    }

    wx.showLoading({
      title: '提交中',
    })
    // 提交信息接口 提交个人信息
    console.log('postData', postData);
    wx.request({
      url: config.route + api.addUser,
      data: {
        user_info: postData,
        user_id: app.globalData.user_id,
        token: config.token,
        // 供电局data: _this.data.initData.departmentArray[typeIndex]
      },
      complete:function(){
        wx.hideLoading();
      },
      success: function (res) {
        if (res.data.code == 1) {
          //提交成功
          _this.showToast('登记成功');
          
        } else {
          //提交失败
          _this.showToast(res.data.msg);
        }
      }
    });
  },

  // post表单信息
  postUserData: function() {
    var _this = this;
   
    wx.request({
      url: '',
      method: 'POST',
      data: {
      },
      header: {
        Authorization: app.globalData.accessTokenData.token_type + ' ' + app.globalData.accessTokenData.access_token,
      },
      success: function(res) {
        
      }
    })
  },

  showToast(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      success:function(){
        wx.navigateBack({
          delta: 4
        })
      }
    })
  },

  // 关闭弹窗
  closePopup: function() {
    this.setData({ 
      isShowNoneGiftPopup: false,
      isShowGiftPopup: false
    })
  },  

  // 初始化信息
  initData: function() {
    var _this = this;
    wx.request({
      url: '',
      header: {
        Authorization: app.globalData.accessTokenData.token_type + ' ' + app.globalData.accessTokenData.access_token,
      },
      success: function({data}) {
        
      }
    })
  }
 
})