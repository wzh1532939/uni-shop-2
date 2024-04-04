export default{
  namespaced: true,
  state:{
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    //用户信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的object对象
    redirectInfo: null
  },
  mutations:{
    // 更新收货地址
    updateAddress(state,address){
      state.address=address
      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储收货地址
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
      
    },
    updateUserInfo(state,userinfo){
      state.userinfo=userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    updateToken(state, token){
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state){
      uni.setStorageSync('token',state.token)
    },
    updateRedirectInfo(state,info){
      state.redirectInfo = info
    }
  },
  getters:{
    //收货地址
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName +state.address.cityName+state.address.countyName+state.address.detailInfo
    }
  }
}