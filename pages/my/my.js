import {
  My
} from 'my-model.js'

var my = new My()

var util = require('../../utils/util.js')
var app = getApp()

Page({

  data: {
    // grids列表
    grids: util.GRIDS,

    isAuthorization: false,
  },

  onLoad: function(options) {
    this._onLoadData()
  },

  onShow: function() {
    if (app.globalData.isAuthorization) {
      this.setData({
        isAuthorization: app.globalData.isAuthorization
      })
    }
  },

  _onLoadData: function() {
    this.getNotice()
    this.loadUserInfo()
  },

  getNotice: function() {
    my.getNoticeArr((res) => {
      // console.log(res)
      var noticeArr = []
      for (var item in res) {
        noticeArr.push(res[item].content)
      }
      // console.log(noticeArr)
      this.setData({
        noticeArr: noticeArr,
      })
    })
  },

  loadUserInfo: function() {
    var that = this
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        // 如果已经授权，直接getUserInfo
        if (res.authSetting['scope.userInfo']) {
          that.getUserInfo()
        }
      }
    })
  },

  getUserInfo: function() {
    var that = this
    wx.getUserInfo({
      success: function(res) {
        app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
        app.globalData.userInfo.nickName = res.userInfo.nickName
        app.globalData.isAuthorization = true
        that.setData({
          isAuthorization: true
        })
      }
    })
  },

  // “点击获取头像昵称” 进行授权并获取userInfo
  getUserInfoFromBtn: function(event) {
    var detail = event.detail
    if (detail['userInfo']) {
      app.globalData.userInfo.avatarUrl = detail.userInfo.avatarUrl
      app.globalData.userInfo.nickName = detail.userInfo.nickName
      app.globalData.isAuthorization = true
      this.setData({
        isAuthorization: true
      })
    }
  },

  onButton: function() {
    console.log("onButton")
  },

  gotoAbout: function() {
    wx.navigateTo({
      url: 'about/about',
    })
  },

  setContact: function() {
    wx.navigateTo({
      url: 'contact/contact',
    })
  },

})