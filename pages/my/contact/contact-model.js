import {
  Base
} from '../../../utils/base.js'

class Contact extends Base {

  constructor() {
    super()
    this.CONTACTS = [{
        way: 1,
        value: '微信',
      },
      {
        way: 2,
        value: 'QQ',
      },
      {
        way: 3,
        value: '电话',
      },
    ]
  }

  getUserContact(callback) {
    var param = {
      url: 'useraction/getselfcontact',
      sCallback: function(data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }

  getTouch(uid, callback) {
    var param = {
      url: 'useraction/gettouch/' + uid,
      sCallback: function (data) {
        callback && callback(data)
      }
    }
    this.request(param)
  }

  saveContact(contactArray, callback) {
    var param = {
      url: "setselfinfo/setcontact",
      data: {
        contacts: contactArray
      },
      type: 'POST',
      sCallback: function(data) {
        callback && callback(data)
      },
    }
    this.request(param)
  }

  contactObjToArray(contactObj) {
    var contactArray = []
    for (var way in contactObj) {
      if (contactObj[way]) {
        contactArray.push({
          way: way,
          content: contactObj[way]
        })
      }
    }
    return contactArray
  }

  contactArrayToObj(contactArray) {
    var contactObj = {}
    for (var i = 0; i < contactArray.length; i++) {
      if (!contactArray[i].delete_time) {
        switch (contactArray[i].way) {
          case 1:
            contactObj["微信"] = contactArray[i]['content']
            break
          case 2:
            contactObj["QQ"] = contactArray[i]['content']
            break
          case 3:
            contactObj["电话"] = contactArray[i]['content']
            break
        }
      }
    }
    return contactObj
  }

  setItemList(contactObj) {
    var itemList = []
    for (var item in contactObj) {
      itemList.push(item)
    }
    return itemList
  }

  deleteContact(way, callback) {
    var param = {
      url: "useraction/deletecontact",
      type: "POST",
      data: {
        way: way
      },
      sCallback: function(res) {
        callback && callback(res)
      }
    }
    this.request(param)
  }


}


export {
  Contact
}
