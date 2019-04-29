// pages/my/myRelease/myRelease.js
import {
  MyRelease
} from 'myRelease-model.js'

var myRelease = new MyRelease()

Page({

  data: {

  },

  onLoad: function(options) {
    this._loadData()
  },

  _loadData: function() {
    myRelease.getUserReleaseList((data) => {
      // console.log(data)
      this.setData({
        releaseList: data
      })
    })
  },

  gotoGoodsInfo: function(event) {
    var id = myRelease.getDataSet(event, 'id')
    wx.navigateTo({
      url: '../../goodsInfo/goodsInfo?id=' + id + '&myRelease=true',
    })
  },

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {},


})