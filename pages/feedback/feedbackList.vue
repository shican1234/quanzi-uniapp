<template>
	<view class="page">


		<view v-for="(item,index) in feedbacks" :key="index" @click="feedbackClick(item)">
			<view class="list-box">
				<!-- <view class="text-title">{{item.id}}</view> -->
				
				<view class="text-title">{{item.title}}</view>
				<view v-if="item.state=='0'" class="text-tips">您的反馈我们已经收到，我们会尽快处理并给您回复。感谢您的支持。</view>
				<view v-if="item.state=='1'" class="text-tips">{{item.reply}}</view>
				<view class="text-time">{{item.createTime}}</view>
				<view :class="item.state=='0'?'state-grey':'state-green'  ">{{item.stateName}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {queryFeedbackByUserId} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				feedbacks: [],
			}
		},
		onLoad() {
			this.getUserFeedback();
		},
		methods: {
			//获取用户意见反馈列表
			getUserFeedback() {
				//演示数据  实际通过接口调用获得
				this.feedbacks = [{
						"createTime": "2022-03-07 11:31:51",
						"updateTime": "2022-03-07 11:31:51",
						"content": "界面显示错乱界面显示错乱...",
						"images": [{
							"name": "lady.png",
							"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6f9c65d5-9a15-4704-8fbc-886144e6f341.jpg"
						}, {
							"name": "man.png",
							"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6a0d765c-3a9a-462c-93f9-513ba0b03f57.jpg"
						}],

						"state": "1",
						"stateName": "已回复",
						"reply":"尊敬的用户您好，对于您反馈的问题我们深感抱歉，后期会做好各个页面的适配工作，让您用的舒心。感谢您的支持"
					},
					{
						"createTime": "2022-03-07 11:31:51",
						"updateTime": "2022-03-07 11:31:51",
						"content": "UI丑哭了",
						"images": [{
								"name": "lady.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6f9c65d5-9a15-4704-8fbc-886144e6f341.jpg"
							}, {
								"name": "man.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6a0d765c-3a9a-462c-93f9-513ba0b03f57.jpg"
							},
							{
								"name": "book.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/185097d3-afdc-4758-b710-308a3853f1cf.jpg"
							},
							{
								"name": "hana.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/a8539d8e-3aba-4fd4-a101-0261395e59d3.png"
							},

						],

						"state": "0",
						"stateName": "待回复",
						"reply":""
					},
					{
						"createTime": "2022-03-07 11:31:51",
						"updateTime": "2022-03-07 11:31:51",
						"content": "系统太卡了",
						"images": [{
							"name": "lady.png",
							"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6f9c65d5-9a15-4704-8fbc-886144e6f341.jpg"
						}, {
							"name": "man.png",
							"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6a0d765c-3a9a-462c-93f9-513ba0b03f57.jpg"
						}],

						"state": "0",
						"stateName": "待回复",
						"reply":""
					},
					{
						"createTime": "2022-03-07 11:31:51",
						"updateTime": "2022-03-07 11:31:51",
						"content": "UI丑哭了",
						"images": [{
								"name": "lady.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6f9c65d5-9a15-4704-8fbc-886144e6f341.jpg"
							}, {
								"name": "man.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/6a0d765c-3a9a-462c-93f9-513ba0b03f57.jpg"
							},
							{
								"name": "book.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/185097d3-afdc-4758-b710-308a3853f1cf.jpg"
							},
							{
								"name": "hana.png",
								"url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7357b34b-3ac3-489b-abd2-dfaf71fbb231/a8539d8e-3aba-4fd4-a101-0261395e59d3.png"
							},

						],

						"state": "1",
						"stateName": "已回复",
						"reply":"尊敬的用户您好，对于您反馈的问题我们深感抱歉，后期我们一定加大页面UI的优化力度，让您用的舒心。感谢您的支持"
					},
				];
			},
			feedbackClick(item) {

				uni.navigateTo({
					url: '/pages/feedback/feedbackDetail?' + 'feedback=' + JSON.stringify(item),
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			onLoad(e) {
				this.queryFeedbackByUserId()
			},
			//查询用户反馈数据
			queryFeedbackByUserId(){
				queryFeedbackByUserId().then(data => {
					
					this.feedbacks = data;
					console.log(this.feedbacks)
					
				});
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}

	.text-title {
		color: #303133;
		font-size: 30rpx;
		font-weight: bold;
		margin-right: 100rpx;
	}

	.text-time {
		color: #909193;
		font-size: 24rpx;
		margin-top: 24rpx;
	}

	.text-tips {
		color: #bcbcbc;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 22rpx;
	}

	.state-green {
		position: absolute;
		right: 0;
		top: 0;
		color: #07C160;
		font-size: 28rpx;
		padding: 30rpx;
	}

	.state-grey {
		position: absolute;
		right: 0;
		padding: 30rpx;
		top: 0;
		color: #606266;
		font-size: 28rpx;
	}



	.list-box {
		position: relative;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		padding: 30rpx;
	}



	.flex-col {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}
</style>
