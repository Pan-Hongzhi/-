import {
    Base
} from '../../../utils/base.js'

class Search extends Base {

    constructor() {
        super()
    }

    getSearchRst(keyword, pageIndex, callback) {
        if (keyword) {
            var param = {
                url: 'goods/search/' + keyword,
                data: {
                    page: pageIndex
                },
                sCallback: function (res) {
                    callback && callback(res.data)
                }
            }
            this.request(param)
        }
    }

}

export {
    Search
}
