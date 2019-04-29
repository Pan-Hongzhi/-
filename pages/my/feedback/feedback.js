// pages/my/feedback/feedback.js
import {
  Feedback
} from 'feedback-model.js'

var feedback = new Feedback()

Page({

  data: {

  },

  onLoad: function(options) {},

  formSubmit: function(event) {
    var textarea = event.detail.value.textarea
    this.saveFeedback(textarea)
  },

  saveFeedback: function(description) {
    this.setData({
      loading: true,
    })
    feedback.saveFeedback(description, () => {
      wx.showToast({
        title: '已反馈至管理员',
      })
      this.setData({
        value: "",
        loading: false,
        isModify: false,
      })
    })
  },

  bindInput: function() {
    this.setData({
      isModify: true,
    })
  },

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {}


})