// pages/my/contact/contact.js

import {
  Contact
} from 'contact-model.js'

var contact = new Contact()

Page({

  data: {
    contacts: contact.CONTACTS,
  },

  onLoad: function(options) {
    contact.getUserContact((data) => {
      // console.log(data)
      this.setContactData(data)
    })
  },

  setContactData: function(resArray) {
    for (var i = 0; i < resArray.length; i++) {
      var index = resArray[i].way - 1
      var unUse = resArray[i].delete_time ? true : false
      var content = unUse ? null : resArray[i].content
      this.setData({
        [`contacts[${index}].content`]: content,
        [`contacts[${index}].unUse`]: unUse
      })
    }
  },

  onModTap: function(event) {
    var idx = contact.getDataSet(event, 'idx')
    var thisWay = this.data.contacts[idx]
    if (!thisWay.unUse) {
      this.setData({
        [`contacts[${idx}].modify`]: true,
        isModify: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '点击“使用”才能进行添加/修改',
        showCancel: false,
      })
    }
  },

  onDeleteTap: function(event) {
    var idx = contact.getDataSet(event, 'idx')
    var thisWay = this.data.contacts[idx]
    // 避免不存在此方式却向服务器发起删除请求
    if (!thisWay.content && !thisWay.unUse) {
      return
    }
    var content = thisWay.unUse ?
      `将向买家提供 ${thisWay.value} 信息？` :
      `将不再向买家提供 ${thisWay.value} 信息？`
    wx.showModal({
      title: '提醒',
      content: content,
      success: (res) => {
        if (res.confirm) {
          if (thisWay.unUse) {
            this.useThisWay(idx, thisWay)
          } else {
            // 保证提供一种联系方式
            if (this.leastOneContact()) {
              this.unUseThisWay(idx, thisWay)
            } else {
              wx.showModal({
                title: '提示',
                content: '请至少提供一种联系方式',
                showCancel: false,
              })
            }
          }
        }
      },
    })
  },

  leastOneContact: function() {
    var contactArr = this.data.contacts
    var flag = 0
    for (var i = 0; i < contactArr.length; i++) {
      if (contactArr[i].unUse == false) {
        flag += 1
      }
    }
    return (flag >= 2) ? true : false
  },

  unUseThisWay: function(idx, thisWay) {
    contact.deleteContact(thisWay.way, () => {
      this.setData({
        [`contacts[${idx}].unUse`]: !thisWay.unUse,
        [`contacts[${idx}].modify`]: false,
        [`contacts[${idx}].content`]: "",
      })
    })
  },

  useThisWay: function(idx, thisWay) {
    contact.deleteContact(thisWay.way, () => {
      this.setData({
        [`contacts[${idx}].unUse`]: !thisWay.unUse,
        isModify: true,
      })
      this.onLoad()
    })
  },

  formSubmit: function(event) {
    this.setData({
      loading: true,
    })
    var contactObj = event.detail.value
    var contactArray = contact.contactObjToArray(contactObj)
    if (contactArray.length == 0) {
      wx.showModal({
        title: '修改失败',
        content: '未填写任何信息',
        showCancel: false,
      })
      this.setData({
        loading: false,
      })
    } else {
      contact.saveContact(contactArray, () => {
        wx.showToast({
          title: '修改成功',
        })
        this.setData({
          loading: false,
          isModify: false,
          ['contacts[0].modify']: false,
          ['contacts[1].modify']: false,
          ['contacts[2].modify']: false,
        })
      })
    }
  },

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {},


})