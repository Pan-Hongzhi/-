var util = require('../../utils/util.js')

Page({

    data: {
        categorys: util.CATEGORYS,

    },

    onLoad: function(options) {

    },

    onCategory: function(event) {
        // console.log(event.currentTarget.dataset)
        var id = event.currentTarget.dataset.id
        var title = event.currentTarget.dataset.title
        wx.navigateTo({
            url: 'onCategory/onCategory?id=' +
                id + '&title=' + title,
        })
    },





})