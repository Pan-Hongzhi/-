import {
  Base
} from '../../../utils/base.js'

class Feedback extends Base {

  constructor() {
    super()
  }

  saveFeedback(description, callback) {
    var param = {
      url: "useraction/setfeedback",
      data: {
        description: description
      },
      type: 'POST',
      sCallback: function(data) {
        callback && callback(data)
      },
    }
    this.request(param)
  }



}



export {
  Feedback
}