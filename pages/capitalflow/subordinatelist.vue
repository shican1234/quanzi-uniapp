<template>
	<view>
		<view class="passenger-list">
			<view class="passenger-item"v-for="item in subordinateList" :key="item.id">
				<!-- <image class="icon" :src="item.avatar"></image> -->
				<image class="avatar" :src="item.avatar" mode=""></image>
				<view class="passenger-content">
					<view class="content">
						<view>昵称：{{item.nickName}}</view>
						<view>日期：{{item.createTime}}</view>
					</view>
					<!-- <image class="arrow-icon" src="./arrow.png"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {querySubordinateList} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				edit: false,
				 passengerList: [{
                    id: 1,
                    name: '张三',
                    phone: 13000000000,
                    isDefault: false
                }, {
                    id: 2,
                    name: '李四',
                    phone: 13000000000,
                    isDefault: true
                }],
				subordinateList: []
			}
		},
		onReady() {
			this.querySubordinateList();
		}, 
		methods: {
			// 请求用户邀请收益统计
			querySubordinateList(){
				querySubordinateList().then(data => {
					
					console.log(data)
					
					this.subordinateList = data;
					
				});
			}
		}
	}
</script>

<style lang="scss">
	.passenger-list {
		color: #333;
		font-size: 28rpx;
		padding-bottom: 80rpx;

		.passenger-item {
			display: flex;
			align-items: center;
			background: #e8e4e4;
			padding: 25rpx;
			margin-bottom: 8rpx;

			.icon {
				width: 50rpx;
				height: 50rpx;
				margin-right: 25rpx;
			}

			.passenger-content {
				flex: 1;
				display: flex;
				align-items: center;

				.content {
					flex: 1;
					line-height: 50rpx;
				}

				.arrow-icon {
					margin-right: 10rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
		.avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;
			
			&-pic {
				width: 83rpx;
				height: 83rpx;
			}
		}
</style>