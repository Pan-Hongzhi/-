import {
    Config
} from 'config.js'

import {
    Token
} from 'token.js'

class Base {
    constructor() {
        this.baseRequestUrl = Config.restUrl
    }

    request(params, noRefetch) {
        var that = this
        var url = this.baseRequestUrl + params.url
        if (!params.type) {
            params.type = 'GET'
        }
        wx.request({
            url: url,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },
            method: params.type,
            success: function(res) {
                var code = res.statusCode.toString()
                var startChar = code.charAt(0)

                if (startChar == '2') {
                    params.sCallback && params.sCallback(res.data)
                } else {
                    if (code == '401') {
                        if (!noRefetch) {
                            that._refetch(params)
                        }
                    }
                    if (noRefetch) {
                        params.eCallback && params.eCallback(res.data)
                    }
                }
            },
            fail: function(err) {
                console.log(err)
            },
        })
    }

    _refetch(params) {
        var token = new Token()
        token.getTokenFromServer((token) => {
            this.request(params, true)
        })
    }

    // 获得元素上的绑定的值
    getDataSet(event, key) {
        return event.currentTarget.dataset[key]
    }

    // 返回成员在数组中的下标
    indexOf(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (value == array[i]) {
                return i
            }
        }
        return null
    }

    // 对象判空
    isEmptyObj(obj) {
        for (var key in obj) {
            return false
        }
        return true
    }


}



export {
    Base
}