<template>
	 <view class="content">
		<view class="left">
		  <!-- <u-icon name="star" class="icon"></u-icon> -->
		  <image name="star" class="icon" src="../../static/img/qb.png" style="width: 20px;height: 20px;"></image>
		  <view class="num"> ¥ {{payPrice}}</view>
		</view>
		<view class="right">
		  <view class="text-box">
			<view>{{payContent}}</view>
			<view>购买可见</view>
		  </view>
		  <u-icon name="arrow-right" size="19" color="#d3d2d2"></u-icon>
		</view>
	  </view>
</template>

<script>
	export default {
		props: {
			payContent: {
				type: String
			},
			payPrice: {
				type: String
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.content {
  width: 100%;
  height: 90px;
  background-color: rgb(255,247,239);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
}
.left {
  display: flex;
  align-items: center;
}
.icon {
  margin-right: 15px;
}
.num {
  color: rgb(247,129,51);
}
.right {
  display: flex;
}
.text-box{
  display: flex;
  flex-direction: column;
  color: rgb(143,141,139);
}
</style>