// pages/my/userInfo/userInfo.js
var app = getApp()

import {
  BaseInfo
} from 'baseInfo-model.js'

var baseInfo = new BaseInfo()

Page({

  data: {
    sexArray: baseInfo.SEXARRAY,
    colleges: baseInfo.COLLEGES,
    contentCount: 0,
    content: '',
    baseInfo: {},
    // button上的加载图标
    loading: false,
    // button是否禁用
    isModify: false,
  },

  onLoad: function() {
    this.loadBaseInfo()
  },

  loadBaseInfo: function() {
    baseInfo.getBaseInfo((res) => {
      console.log(res)
      if (res != []) {
        var checked = 'sexArray[' + res.sex + '].checked'
        this.setData({
          baseInfo: res,
          college: res.college,
          [checked]: true,
        })
      }
    })
  },

  formSubmit(event) {
    // console.log(event.detail.value)
    if (app.globalData.isAuthorization) {
      this.setData({
        loading: true,
      })
      var info = event.detail.value
      info['avatar'] = app.globalData.userInfo.avatarUrl
      info['nickname'] = app.globalData.userInfo.nickName
      this.submitInfo(info)
    }
  },

  submitInfo: function(info) {
    baseInfo.upReviseInfo(info, (res) => {
      // console.log(res.data);
      this.setData({
        loading: false,
        isModify: false,
      })
      wx.showToast({
        title: '修改成功',
      })
      this.onLoad()
    })
  },

  bindPickerChange(event) {
    var college = this.data.colleges[event.detail.value]
    this.setData({
      isModify: true,
      'baseInfo.college': college
    })
  },

  handleContentInput(event) {
    const value = event.detail.value
    this.setData({
      isModify: true,
      content: value,
      contentCount: value.length
    })
  },

  onBindChange: function() {
    this.setData({
      isModify: true,
    })
  },

  onBindInput: function() {
    this.setData({
      isModify: true,
    })
  },

  getUserInfoFromBtn: function(event) {
    if (!app.globalData.isAuthorization) {
      var detail = event.detail
      console.log(detail)
      if (detail['userInfo']) {
        app.globalData.userInfo.avatarUrl = detail.userInfo.avatarUrl
        app.globalData.userInfo.nickName = detail.userInfo.nickName
        app.globalData.isAuthorization = true
        this.setData({
          isAuthorization: true
        })
        wx.showModal({
          title: '授权成功',
          content: '请再次点击下方 “保存修改” 按钮',
          showCancel: false,
        })
      }
    }
  },

})