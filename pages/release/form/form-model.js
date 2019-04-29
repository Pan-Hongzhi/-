import {
    Base
} from '../../../utils/base.js'

class Form extends Base {

    constructor() {
        super()
        this.CATEGORYLIST = ['服装包箱', '数码电子', '旧书音像', '化妆日用', '宿舍用品', '杂七杂八']
    }

    getValue(event) {
        return event.detail.value
    }

    upLoadImg(imgArray, goodsId, callback) {
        var sFlag = imgArray.length
        for (var idx in imgArray) {
            idx = Number(idx)
            this.loadingToast(`正在上传第${idx+1}张图片`, 1500)
            // console.log(`正在上传第${idx + 1}张图片`)
            wx.uploadFile({
                url: this.baseRequestUrl + 'releasegoods/uploadimg',
                filePath: imgArray[idx],
                name: 'file',
                formData: {
                    order: idx,
                    goods_id: goodsId,
                },
                success: function(res) {
                    // console.log(res)
                    sFlag -= 1
                    if (sFlag == 0) {
                        callback && callback()
                    }
                }
            })
        }
    }

    releaseGoods(imgArray, goodsInfo, callback) {
        var that = this
        this.loadingToast('正在上传表单', 1500)
        var param = {
            url: 'releasegoods',
            type: 'POST',
            data: {
                goodsInfo: goodsInfo
            },
            sCallback: function(res) {
                // console.log(res)
                that.upLoadImg(imgArray, res.goodsId, callback)
            }
        }
        this.request(param)
    }

    // 验证表单必填参数
    checkValidity(imgArray, goodsInfo) {
        if (imgArray.length == 0) {
            return {
                'status': false,
                'msg': '图片未添加（必填）',
            }
        } else if (goodsInfo.title == "") {
            return {
                'status': false,
                'msg': '标题未填写（必填）',
            }
        } else if (goodsInfo.category == null) {
            return {
                'status': false,
                'msg': '分类未填写（必填）',
            }
        } else if (goodsInfo.price == "") {
            return {
                'status': false,
                'msg': '价格未填写（必填）',
            }
        } else {
            return {
                'status': true,
                'msg': 'pass',
            }
        }
    }

    loadingToast(msg, time) {
        wx.showToast({
            title: msg,
            icon: 'loading',
            duration: time
        })
    }



}

export {
    Form
}