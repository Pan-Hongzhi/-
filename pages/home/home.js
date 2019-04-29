import {
  Home
} from 'home-model.js'

var home = new Home()

Page({

  data: {
    goodsRecentList: [],
    mostRecent: {
      isLoadedAll: false,
      pageIndex: 1,
      show: false,
    },

    goodsHotList: [],
    mostHot: {
      isLoadedAll: false,
      pageIndex: 1,
      show: false,
    },

    bannerArr: [],
    inputShowed: false,
    inputVal: "",
    currentTab: "mostRecent",
  },

  onLoad: function(options) {
    this._loadData()
  },

  _loadData: function() {
    this.getBanner(1)
    this.initRecentList()
    this.initHotList()
  },

  onShow: function() {
    // this.refresh()
  },

  getBanner: function(bannerId) {
    home.getBannerData(bannerId, (bannerArr) => {
      this.setData({
        bannerArr: bannerArr
      })
    })
  },

  initRecentList: function() {
    home.getRecentList(1, (data) => {
      this.setData({
        goodsRecentList: data
      })
    })
  },

  initHotList: function() {
    home.getHotList(1, (data) => {
      this.setData({
        goodsHotList: data
      })
    })
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    this.refresh()
  },

  refresh: function() {
    if (this.data.currentTab == "mostRecent") {
      this.setData({
        goodsRecentList: [],
        mostRecent: {
          isLoadedAll: false,
          pageIndex: 1,
          show: false,
        },
      })
      this.initRecentList()
    } else {
      this.setData({
        goodsHotList: [],
        mostHot: {
          isLoadedAll: false,
          pageIndex: 1,
          show: false,
        },
      })
      this.initHotList()
    }
  },

  // 触底加载更多
  onReachBottom: function() {
    var current = this.data.currentTab
    var show = current + ".show"
    this.setData({
      [show]: true
    })
    if (!this.data[current].isLoadedAll) {
      this.data[current].pageIndex += 1
      this.reGetGoodsList(this.data.currentTab)
    }
  },

  // current是字符串"mostXXX"
  reGetGoodsList: function(current) {
    var page = this.data[current].pageIndex
    if (current == "mostRecent") {
      home.getRecentList(page, (data) => {
        this.setGoodsList(data, current)
      })
    } else {
      home.getHotList(page, (data) => {
        this.setGoodsList(data, current)
      })
    }
  },

  // 作为reGetGoodsList的回调函数
  setGoodsList: function(data, current) {
    var isLoadedAll = current + ".isLoadedAll"
    var show = current + ".show"
    if (data.length > 0) {
      if (current == "mostRecent") {
        this.data.goodsRecentList.push.apply(this.data.goodsRecentList, data)
        this.setData({
          goodsRecentList: this.data.goodsRecentList,
          [show]: false
        })
      } else {
        this.data.goodsHotList.push.apply(this.data.goodsHotList, data)
        this.setData({
          goodsHotList: this.data.goodsHotList,
          [show]: false
        })
      }
    } else {
      this.setData({
        [isLoadedAll]: true
      })
    }
  },

  gotoGoodsInfo: function(event) {
    var id = home.getDataSet(event, 'id')
    wx.navigateTo({
      url: '../goodsInfo/goodsInfo?id=' + id,
    })
  },

  changeTabs: function(event) {
    this.setData({
      currentTab: event.detail.currentIndex == 0 ? "mostRecent" : "mostHot"
    })
  },

  // 搜索栏相关
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function(event) {
    this.setData({
      inputVal: event.detail.value
    });
  },

  bindSearch: function(event) {
    wx.navigateTo({
      url: 'search/search?keyword=' + this.data.inputVal,
    })
  },

  onShareAppMessage: function() {},
})