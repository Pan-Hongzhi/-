import {
    Base
} from '../../../utils/base.js'

class MyRelease extends Base {

    constructor() {
        super()
    }

    getUserReleaseList(callback) {
        var param = {
            url: 'releasegoods/getreleaselist',
            sCallback: function(res) {
                callback && callback(res)
            }
        }
        this.request(param)
    }



}

export {
    MyRelease
}