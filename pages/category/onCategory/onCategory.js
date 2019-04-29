// pages/category/onCategory/onCategory.js
import {
    OnCategory
} from 'onCategory-model.js'

var onCategory = new OnCategory()

Page({

    data: {

    },

    onLoad: function (options) {
        // console.log(options)
        this.data.id = parseInt(options.id)
        this.data.title = options.title
        this._loadData()
    },

    _loadData: function() {
        onCategory.getCategoryData(this.data.id, (data) => {
            this.setData({
                categoryData: data
            })
        })
    },

    onReady: function () {
        // 导航栏标题
        wx.setNavigationBarTitle({
            title: this.data.title,
        })
    },

    gotoGoodsInfo: function (event) {
        var id = onCategory.getDataSet(event, 'id')
        wx.navigateTo({
            url: '../../goodsInfo/goodsInfo?id=' + id,
        })
    },

    onPullDownRefresh: function () {},

    onReachBottom: function () {},

    onShareAppMessage: function () {},
})