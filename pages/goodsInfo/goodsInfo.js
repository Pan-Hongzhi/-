// pages/goodsInfo/goodsInfo.js
import {
  GoodsInfo
} from 'goodsInfo-model.js'
import {
  Collection
} from '../my/collection/collection-model.js'
import {
  Contact
} from '../my/contact/contact-model.js'

var goodsInfo = new GoodsInfo()
var collection = new Collection()
var contact = new Contact()

Page({

  data: {
    goodsDetail: null,
    isConllected: false,
  },

  onLoad: function(options) {
    this.data.goodsId = options.id
    if (options.myRelease) {
      this.setData({
        fromMyRelease: true
      })
    }
    this._loadData(options.id)
  },

  _loadData: function(id) {
    this.loadGoodsInfo(id)
    this.getCollectionsList()
  },

  loadGoodsInfo: function(id) {
    goodsInfo.getGoodsDetail(id, (goodsDetail) => {
      // console.log(goodsDetail)
      this.setData({
        goodsDetail: goodsDetail,
      })
      if (goodsDetail.delete_time) {
        this.setData({
          isDeleted: true,
        })
      }
      this.getContactList(goodsDetail.owner_id)
    })
  },

  getCollectionsList: function() {
    collection.getUserCollections((collections) => {
      // console.log(collections)
      var status = this.checkIsConllected(this.data.goodsId, collections)
      this.setData({
        isConllected: status
      })
    })
  },

  // 检查该商品是否在用户收藏列表，返回bool
  checkIsConllected: function(goodsId, collectionList) {
    for (var i = 0; i < collectionList.length; i++) {
      if (goodsId == collectionList[i].id) {
        return true
      }
    }
    return false
  },

  getContactList: function(uid) {
    contact.getTouch(uid, (data) => {
      // console.log(data)
      this.data.contactObj = contact.contactArrayToObj(data)
      this.data.itemList = contact.setItemList(this.data.contactObj)
      this.data.contactList = data
    })
  },

  // 点击“想要”
  tapWant: function(event) {
    if (this.data.isDeleted) {
      return
    }
    collection.setCollectOrNot(this.data.goodsId, (res) => {
      // console.log(res)
      this.setData({
        isConllected: !res.status
      })
      this.showToast(res.msg)
    })
  },

  // 点击“联系卖家”
  tapContact: function(event) {
    wx.showActionSheet({
      itemList: this.data.itemList,
      success: (res) => {
        if (!res.cancel) {
          var idx = res.tapIndex
          this.showSelectedContact(idx)
        }
      }
    })
  },

  showSelectedContact: function(idx) {
    var key = this.data.itemList[idx]
    var content = this.data.contactObj[key]
    wx.setClipboardData({
      data: content,
      success: () => {
        wx.hideToast();
        wx.showModal({
          title: `已复制卖家${key}`,
          content: content,
          showCancel: false,
        })
      }
    })
  },

  showToast: function(title) {
    wx.showToast({
      title: title,
    })
  },

  deleteGoods: function() {
    wx.showModal({
      title: '提示',
      content: '确定下架？',
      success: (res) => {
        if (res.confirm) {
          goodsInfo.deleteGoods(this.data.goodsId, () => {
            wx.showToast({
              title: '下架成功',
            })
            this.loadGoodsInfo(this.data.goodsId)
          })
        }
      }
    })
  },

  onShareAppMessage: function() {},


})