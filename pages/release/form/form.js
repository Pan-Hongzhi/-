import {
  Form
} from 'form-model.js'

import {
  Contact
} from '../../my/contact/contact-model.js'

import {
  BaseInfo
} from '../../my/baseInfo/baseInfo-model.js'

var form = new Form()

var contact = new Contact()

var baseInfo = new BaseInfo()

Page({

  data: {
    imgArray: [],

    content: '',
    contentCount: 0,

    categorys: form.CATEGORYLIST,

  },

  onLoad: function(options) {},

  onShow: function() {
    this.checkUserInfo()
    // this.checkUserContact()
  },

  checkUserInfo: function() {
    baseInfo.getBaseInfo((data) => {
      // 未添加个人信息
      if (!data.college) {
        this.showModalToSet(0)
      } else {
        contact.getUserContact((data) => {
          // 未添加联系方式
          if (!this.checkContactUsed(data)) {
            this.showModalToSet(1)
          }
        })
      }
    })
  },

  checkContactUsed: function(contactArr) {
    for (var i = 0; i < contactArr.length; i++){
      if (contactArr[i].delete_time == null) {
        return true
      }
    }
    return false
  },

  showModalToSet: function(setting) {
    var title = (setting == 0) ? '个人信息' : '联系方式'
    wx.showModal({
      title: '您还未添加'+title,
      content: '请点击 “确定” \r\n跳转至 “我的” 页面进行添加',
      showCancel: false,
      success: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '../../my/my',
          })
        } else if (res.cancel) {
          wx.switchTab({
            url: '../release',
          })
        }
      }
    })
  },

  // bind: 选择图片
  chooseImage: function(event) {
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // console.log(res)
        that.setData({
          imgArray: that.data.imgArray.concat(res.tempFilePaths)
        });
      }
    })
  },

  // bind: 预览图片
  previewImage: function(event) {
    wx.previewImage({
      current: form.getDataSet(event, "id"), // 当前显示图片的http链接
      urls: this.data.imgArray // 需要预览的图片http链接列表
    })
  },

  // bind: 长按删除图片
  deleteImg: function(event) {
    // console.log(event)
    var that = this
    wx.showModal({
      title: "提示",
      content: "确定删除此图片吗?",
      confirmText: "删除它",
      cancelText: "点错了",
      success: function(res) {
        if (res.confirm) {
          // 删除图片
          var imgArray = that.data.imgArray
          var idx = form.indexOf(imgArray, form.getDataSet(event, "id"))
          imgArray.splice(idx, 1)
          that.setData({
            imgArray: imgArray
          })
        }
      }
    })
  },

  // bind: 输入“描述”
  handleContentInput(event) {
    const value = form.getValue(event)
    this.setData({
      content: value,
      contentCount: value.length
    })
  },

  // bind: 选择“分类”
  bindPickerChange(event) {
    this.setData({
      categoryIndex: form.getValue(event)
    })
  },

  // 点击按钮 “一键发布”
  formSubmit(event) {
    // console.log(form.getValue(event))
    var goodsInfo = form.getValue(event)
    // console.log(goodsInfo)
    this.openConfirm(goodsInfo, this.submitGoods)
  },

  // “确认发布”对话框
  openConfirm: function(goodsInfo, callback) {
    var that = this
    wx.showModal({
      // type: "confirm",
      title: '提示',
      content: `确定发布${goodsInfo.title}吗?`,
      confirmText: "我确定",
      cancelText: "再想想",
      success: function(res) {
        if (res.confirm) {
          callback && callback(goodsInfo)
        }
      }
    });
  },

  submitGoods: function(goodsInfo) {
    var status = form.checkValidity(this.data.imgArray, goodsInfo)
    if (status.status == false) {
      // console.log('error' + status.msg)
      // 弹出提示框
      this.openAlert(status.msg)
    } else {
      form.releaseGoods(this.data.imgArray, goodsInfo, this.uploadOver)
    }
  },

  openAlert: function(errmsg) {
    wx.showModal({
      title: "提示",
      content: errmsg,
      showCancel: false,
    })
  },

  // 全部上传成功后的回调函数
  uploadOver: function() {
    wx.lin.showMessage({
      content: '发布成功'
    })
    setTimeout(function() {
      wx.switchTab({
        url: '../../home/home',
      })
    }, 1500)
  },


})