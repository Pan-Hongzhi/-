import {
    Base
} from '../../../utils/base.js'

class BaseInfo extends Base {
    
    constructor() {
        super()
        this.SEXARRAY = [{
            sex: 0,
            value: '帅锅',
            checked: false,
        },
        {
            sex: 1,
            value: '美铝',
            checked: false,
        },
        {
            sex: 2,
            value: '保密',
            checked: false,
        },
        ]

        this.COLLEGES = ['物理与电子信息', '数学与计算机', '外语学院', 
        '鲁艺学院', '化工学院', '文学院', '经管学院']
    }

    // 从服务器获取用户的信息
    getBaseInfo(callback) {
        var param = {
            url: 'useraction/getselfinfo',
            sCallback: function (data) {
                callback && callback(data)
            }
        }
        this.request(param)
    }

    // 提交修改到服务器
    upReviseInfo(info, callback) {
        var param = {
            url: 'setselfinfo/setbaseinfo',
            type: 'POST',
            data: {
                info: info
            },
            sCallback: function (data) {
                callback && callback(data)
            }
        }
        this.request(param)
    }



}


export {
    BaseInfo
}
