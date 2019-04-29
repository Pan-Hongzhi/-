//app.js

import {
  Token
} from "utils/token.js"

App({

  // 全局变量
  globalData: {
    userInfo: {},
    isAuthorization: false,
  },

  // 客户端令牌管理机制
  onLaunch: function() {
    var token = new Token()
    token.verify()
  }

})