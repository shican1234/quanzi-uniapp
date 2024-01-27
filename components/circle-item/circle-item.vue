<template>
	 <view class="content" @click="goToCircle(circleId)">
		<view class="left">
		  <!-- <u-icon name="star" class="icon"></u-icon> -->
		  <!-- <image name="star" class="icon" :src="circleAvatar" style="width: 20px;height: 20px;"></image> -->
		  <u-avatar class="icon" :src="circleAvatar"></u-avatar>
		  <view >
			  <text class="num">{{circleName}}</text>
			  <view class="info">
			  	<view class="item">
			  		<text>{{peopleCount}}圈友</text>
			  	</view>
			  	<view class="item">
			  		<text>{{postCount}}篇帖子</text>
			  	</view>
			  </view>
		  </view>
		</view>
		<view class="right">
		  <view class="text-box">
			<view>去看看</view>
		  </view>
		  <u-icon name="arrow-right-double" size="19" color="#d3d2d2"></u-icon>
		</view>
	  </view>
</template>

<script>
import { methods } from '../../uni_modules/uview-ui/libs/mixin/mixin';
import {isJoinCircle} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		props: {
			circleName: {
				type: String
			},
			circleAvatar: {
				type: String
			},
			postCount: {
				type: String
			},
			peopleCount: {
				type: String
			},
			circleId: {
				type: String
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			goToCircle(id){
				isJoinCircle({"id":id}).then(data => {
					if(data){ // 在圈内
						this.$u.route('/pages/circle/circle', {
							id: id
						})
					}else{ //不在
						this.$u.route('/pages/circle/join-info', {
							id: id
						})
					}
				});
			},
		}
	}
</script>

<style>
.content {
  width: 100%;
  height: 60px;
  background-color: rgb(255,247,239);
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
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
  align-items: center;
}
.text-box{
  flex-direction: column;
  color: rgb(143,141,139);
}
.info{
	display: flex;
	color: rgb(143,141,139);
}
.item{
	margin-right: 10px;
}
</style>