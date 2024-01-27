<template>
	<!-- 新鲜事页/话题详情 -->
	<view class="news-topic-detail bg-white">
		<!-- 模糊背景 -->
		<view class="topic-bg">
			<image :src="info.circleBackground" mode="aspectFill"></image>
		</view>
		<!-- 圈子信息 -->
		<view class="topic-info px-20">
			<view class="">
				<image class="topic-info-image border" :src="info.circleSculpture" mode="aspectFill"></image>
				<view class="topic-info-title text-36">{{info.circleName}}</view>
				<view class="topic-info-title text-25" @click="copyID(info.id)">
					<text>圈子ID:  </text>
					<text class="cid">{{info.id}}</text>
				</view>
			</view>
			<view class="flex items-center text-gray-500 pt-50">
				<view class="mr-20">加入人数: {{info.peopleCount}}</view>
				<view class="mr-20">发帖总数: {{info.postCount}}</view>
			</view>
			<view class="text-gray-500 text-30 my-20">
				
			</view>
			<u-gap :customStyle="{margin:'0 -20rpx'}" height="10" bgColor="#F3F4F6"></u-gap>
		</view>
		<view class="mb-20">
			<view class="flex items-center px-20 py-20 border-b">
				<view class="avatar">
					<u-avatar :src="info.avatar"></u-avatar>
				</view>
				<view class="info">
					<view class="text-29 line-1">
						<text>圈主: {{info.nickName}}</text>
					</view>
					<view class="ruquanxuzhi">
						<text>创建于: {{info.time}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 简介-->
		<view class="mb-20">
			<view class="flex items-center px-20 py-20 border-b" >
				<text class="text-32 line-1">简介</text>
			</view>
			<view class="flex items-center px-20 py-20 border-b" >
				<text class="chatRoomLMessage">{{ info.circleIntroduce }}</text>
			</view>
		</view>
		
		<view class="operation">
			
			<view class="btns">
				<view class="dingjin" :style="'background:#009762;'" @tap="jion()">
					立 即 加 入
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {queryCircleById,jionCircle} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				show: false,
				content: '',
				info: {
					id:''
				}
				
			}
		},
		onLoad(e) {
			this.info.id = e.id
			this.queryCircleInfo()
			// 设置offsetTop
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// #ifdef APP-PLUS
					this.offsetTop = res.statusBarHeight + 44
					// #endif
					// #ifdef H5
					this.offsetTop = 0
					// #endif
				}
			})
		},
		methods: {
			queryCircleInfo(){
				queryCircleById({"id":this.info.id}).then(data => {
					this.info = data
				});
			},
			copyID(id){
				uni.setClipboardData({
				  data: id,
				  success: function() {
				    console.log('复制成功');
				  }
				})
			},
			jion(){
				jionCircle({"id":this.info.id}).then(data => {
					//加入成功以后跳转到这个圈子
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: '加入成功'
					});
					setTimeout(() => {
						this.show = false
						this.$u.route('/pages/circle/circle', {
							id: this.info.id
						})
					}, 1100);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.news-topic-detail {
		.topic-bg {
			width: 100%;
			height: 300rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				position: absolute;
			}
		}

		.topic-info {
			position: relative;
			width: 100%;

			.topic-info-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				position: absolute;
				top: -75rpx;
			}

			.topic-info-title {
				margin-left: 180rpx;
			}
		}

		.nav-center {
			height: 80rpx;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			background-color: #fff;

			.nav-title {
				height: 80rpx;
				line-height: 80rpx;
				width: 60rpx;
				font-size: 30rpx;
				padding: 0 15rpx;
				font-weight: bold;
				color: $uni-text-color-gray;
			}

			.active {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					color: $uni-color-green;
				}
			}

		}
	}
	.operation {
		height: 80upx;
		width: 100vw;
		line-height: 100upx;
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		background-color: #f8f8f9;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 6px 20upx;
		z-index: 90;
	}
	

	
	
	
	.operation .btns {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		margin-right: 20px !important;
		margin-top: -2px;
	}
	.operation .price {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-right: 10px !important;
		margin-top: -2px;
	}
	.operation .price text{
		font-size: 16px;
		color: #ff5a5f;
	}

	.time-left {
		font-size: 30rpx;
		color: #BE800A;
		line-height: 24rpx;
	}
	
	.join-time {
		 margin-top: 5px;
		font-size: 20rpx;
		color: #AEAEAE;
		line-height: 20rpx;
	}
	.operation .btns .dingjin {
		height: 36px !important;
		line-height: 70upx;
		text-align: center;
		padding: 0 40upx;
		border-radius: 40upx;
		border-left: none;
		font-size: 24upx;
		color: #fff;
		background-color: #A160F0;
		font-weight: bold;
	}
	.chatRoomLMessage {
		margin-top: 15rpx;
		font-size: 1em;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: pre-wrap;
	}
	.ruquanxuzhi {
		margin-top: 15rpx;
		color: #b0b0b0;
		font-size: 1em;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: pre-wrap;
	}
	.info {
		flex-direction: column;
		margin-left: 10px;
	}
	.cid{
		margin-left: 10px;
		color: mediumseagreen;
	}
</style>
