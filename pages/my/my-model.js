import {
  Base
} from '../../utils/base.js'

class My extends Base {

  constructor() {
    super()
  }

  getNoticeArr(callback) {
    var param = {
      url: 'notice',
      sCallback: function (res) {
        callback && callback(res)
      }
    }
    this.request(param)
  }



}



export {
  My
}
