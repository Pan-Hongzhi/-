import {
    Base
} from '../../../utils/base.js'

class Collection extends Base {

    constructor() {
        super()
    }

    getUserCollections(callback) {
        var param = {
            url: 'useraction/collectionlist',
            sCallback: function (res) {
                callback && callback(res)
            }
        }
        this.request(param)
    }

    setCollectOrNot(id, callback) {
        var param = {
          url: 'useraction/collectionornot',
            type: 'POST',
            data: {
                goods_id: id
            },
            sCallback: function (data) {
                callback && callback(data)
            }
        }
        this.request(param)
    }


}

export {
    Collection
}
