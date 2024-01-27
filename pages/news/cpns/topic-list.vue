<template>
	<!-- 新鲜事/话题列表 -->
	<view class="topic-list flex" @click="goToCircle(item.id)">
		<image :src="item.circleBackground" lazy-load ></image>
		<view class="my-20 flex-1">
			<view class="text-black text-32">{{item.circleName}}</view>
			<view class="text-gray-400 text-26 my-10">{{item.circleIntroduce}}</view>
			<view class="text-gray-400 text-24 my-10 flex w-full">
				<view class="w-1-2 text-left">内容：{{item.postCount}}</view>
				<view class="w-1-2 text-left">圈友：{{item.peopleCount}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {isJoinCircle} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		props: {
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {

			}
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

<style lang="scss" scoped>
	.topic-list {
		image {
			width: 154px;
			height: 86px;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
</style>
