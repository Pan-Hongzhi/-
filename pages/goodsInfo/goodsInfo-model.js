import {
    Base
} from '../../utils/base.js'

class GoodsInfo extends Base {

    constructor() {
        super()
    }

    getGoodsDetail(id, callback) {
        var param = {
            url: 'goods/' + id,
            sCallback: function(res) {
                callback && callback(res)
            }
        }
        this.request(param)
    }

    deleteGoods(id, callback) {
      var param = {
        url: "useraction/deletegoods",
        type: "POST",
        data: {
          goods_id: id
        },
        sCallback: function (res) {
          callback && callback(res)
        }
      }
      this.request(param)
    }
    
}

export {
    GoodsInfo
}