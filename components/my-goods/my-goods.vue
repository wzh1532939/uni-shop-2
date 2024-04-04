<template>
	<view class="goods-item">
	  <!-- 左侧盒子 -->
	  <view class="goods-item-left">
      <radio :checked="item.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
	    <image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!-- 右侧盒子 -->
	  <view class="goods-item-right">
	    <!-- 商品名字 -->
	    <view class="goods-name">{{item.goods_name}}</view>
	    <view class="goods-info-box">
	      <!-- 商品价格 -->
	      <view class="goods-price">￥{{item.goods_price | tofixed}}</view>
        <uni-number-box :min="1" :value="item.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    props: {
      item: {
        type: Object,
        default: {}
      },
    showRadio: {
      type: Boolean,
      default: false
    },
    showNum: {
      type: Boolean,
      default: false
    }
    },
    filters: {
      tofixed(num){
       return Number(num).toFixed(2)
      }
    },
    methods:{
      //radio组件的点击事件处理函数
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id: this.item.goods_id,
          goods_state: !this.item.goods_state
        })
      },
      //监听NumberBox组件数量变化事件
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id: this.item.goods_id,
          goods_count: val-0
        })
      }
    }
	}
</script>

<style lang="scss">
.goods-item{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
      margin-right: 5px;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price{
        color: #C00000;
        font-size: 16px;
      }
    }
  }
}
</style>
