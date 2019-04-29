// pages/search/search.js
import {
    Search
} from 'search-model.js'

var search = new Search()

Page({

    data: {
        searchResList: [],
        loadmore: {
            isLoadedAll: false,
            pageIndex: 1,
            show: false,
        }
    },

    onLoad: function(options) {
        this.data.keyword = options.keyword
        this._loadData()
    },

    _loadData: function(keyword) {
        this.getSearchList()
    },

    getSearchList: function() {
        search.getSearchRst(this.data.keyword, this.data.loadmore.pageIndex, (data) => {
            if (data.length > 0) {
                this.data.searchResList.push.apply(this.data.searchResList, data)
                this.setData({
                    searchResList: this.data.searchResList,
                    ["loadmore.show"]: false
                })
            } else {
                this.setData({
                    ["loadmore.isLoadedAll"]: true
                })
            }
        })
    },

    gotoGoodsInfo: function(event) {
        var id = event.currentTarget.dataset.id
        wx.navigateTo({
            url: '../../goodsInfo/goodsInfo?id=' + id,
        })
    },

    onReachBottom: function() {
        this.setData({
            ["loadmore.show"]: true
        })
        if (!this.data.loadmore.isLoadedAll) {
            this.data.loadmore.pageIndex += 1
            this.getSearchList()
        }
    },

    onShareAppMessage: function() {}
})