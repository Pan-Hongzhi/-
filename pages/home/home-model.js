import {
    Base
} from '../../utils/base.js'

class Home extends Base {

    constructor() {
        super()
    }

    getBannerData(id, callback) {
        var param = {
            url: 'banner/' + id,
            sCallback: function(res) {
                callback && callback(res.items)
            }
        }
        this.request(param)
    }

    /*获得最新商品，pageIndex从1开始*/
    getRecentList(pageIndex, callback) {
        var param = {
            url: 'goods/recent',
            data: {
                page: pageIndex
            },
            sCallback: function(res) {
                callback && callback(res)
            }
        }
        this.request(param)
    }

    getHotList(pageIndex, callback) {
        var param = {
            url: 'goods/hot',
            data: {
                page: pageIndex
            },
            sCallback: function (res) {
                callback && callback(res)
            }
        }
        this.request(param)
    }

    // getSearchRst(keyword, callback) {
    //     if (keyword) {
    //         var param = {
    //             url: 'goods/search/' + keyword,
    //             sCallback: function(res) {
    //                 callback && callback(res)
    //             }
    //         }
    //         this.request(param)
    //     }
    // }

}

export {
    Home
}
