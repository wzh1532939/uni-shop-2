<template>
	<view>
		<!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="../../static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
  import { mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {

			};
		},
    methods:{
      ...mapMutations('m_user',['updateAddress']),
     async chooseAddress(){
        const [err,succ] = await uni.chooseAddress().catch(err => err)
        if(err === null && succ.errMsg === 'chooseAddress:ok'){
          this.updateAddress(succ)
        }
        if(err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
          this.reAuth()
        }
      },
     async reAuth(){
      const [err2,confirmResult] =await uni.showModal({
          content: '检查到您没有·打开地址权限，是否去设置打开',
          confirmText: '确认',
          cancelText: '取消'
        })
        if(err2) return
        if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
        if(confirmResult.confirm) return uni.openSetting({
          success(settingResult) {
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权！')
             if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择收货地址')
          }
        })
      }
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addstr'])
    }
	}
</script>

<style lang="scss">
.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  .btnChooseAddress{
    
  }
}
.address-info-box{
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      justify-content: space-between;
    }
  }
  .row2{
    margin-top: 10px;
    display: flex;
    align-items: center;
    .row2-left{
      white-space: nowrap;
    }
  }
}
</style>
