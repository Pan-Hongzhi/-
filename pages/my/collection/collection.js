// pages/my/collection/collection.js
import {
  Collection
} from 'collection-model.js'

var collection = new Collection()

Page({

  data: {

  },

  onLoad: function(options) {
    this._loadData()
  },

  _loadData: function() {
    collection.getUserCollections((data) => {
      this.setData({
        collectionList: data
      })
      // console.log(data)
    })
  },

  gotoGoodsInfo: function(event) {
    var id = collection.getDataSet(event, 'id')
    wx.navigateTo({
      url: '../../goodsInfo/goodsInfo?id=' + id,
    })
  },

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {},
  
})