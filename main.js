import Vue from 'vue'
import App from './App'
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
import store from '@/store/store.js'
uni.$http = $http
//请求根路径
$http.baseUrl= 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...'
  })
  // 判断当前请求是否为有权限的接口
  if(options.url.indexOf('/my') !== -1){
    options.header = {
      Authorization: store.state.m_user.token
    }
  }
}
$http.afterRequest = function () {
  uni.hideLoading()
}
//封装弹框的方法
uni.$showMsg = function(title='数据请求失败！',duration=1500){
    uni.showToast({
      title: title,
      duration: duration,
      icon: 'none'
    })
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
  store
})
app.$mount()
