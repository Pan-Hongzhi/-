import {
    Base
} from '../../../utils/base.js'

class OnCategory extends Base {

    constructor() {
        super()
    }

    getCategoryData(id, callback) {
        var param = {
            url: 'category/' + id,
            sCallback: function (data) {
                callback && callback(data)
            }
        }
        this.request(param)
    }


}


export {
    OnCategory
}
