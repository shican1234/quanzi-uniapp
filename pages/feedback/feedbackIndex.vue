<!-- 帮助反馈页面 -->
<template>
	<view>
		<view class="text-top">常见问题</view>
		<view class="bg-list">
			<view v-for="(item,index) in problemBox" :key="index" :title="item.problemTitle" class="list-title">
				<view class="text-title">{{item.problemTitle}}</view>
				<view v-for="(problemItem,problemIndex) in item.problemList" :key="problemIndex" class="list-question"
					hover-class="hover" @click="onClick(problemItem)">
					<view class="text-item">{{problemItem.title}}</view>
					<view class="line" v-if="problemIndex!=item.problemList.length-1"></view>
				</view>

			</view>
		</view>
		<view class="bg-box">
			<view class="bg-white-box">
				<image src="/static/feedback/icon-letter.png" class="image"></image>
				<view class="text-feedback" hover-class="hover" @click="toFeedbackList">我的反馈</view>

				<view class="vertical-line"></view>

				<image src="/static/feedback/icon-edit.png" class="image"></image>
				<view class="text-feedback" hover-class="hover" @click="toFeedback">我要反馈</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problemBox: [{
						problemTitle: '疑问解答',
						problemList: [{
								title: '为什么提示不支持打开非业务域名',
								content: '微信小程序内部对网页链接进行了限制，遇到此情况可复制链接至手机浏览器中打开,也可以到官网下载APP使用。'
							},
							{
								title: '昵称是什么？',
								content: '昵称（本规则简称“昵称”）区别于用户名，是您对外展示的账号身份标识；您可通过【修改资料】自行修改，修改无时间限制；昵称不具有唯一性，除特殊情况外，支持多用户使用同一昵称。'
							},
							{
								title: '客服什么时候在线？',
								content: '客服的工作时间：周一至周五，09:00 - 18:00，非工作时间的咨询反馈会自动转为留言，客服上班后会第一时间回复您~'
							},
							{
								title: '如果邮箱没有收到激活邮件怎么办？',
								content: '验证码的发送由于短信平台或网络波动会存在一定的延迟请等待一段时间后再次查询；一:检查邮件垃圾箱中是否有激活邮件；可以倒计时结束后重新发送邮件；二:联系客服,向客服反馈情况,让客户联系技术人员检查是否程序出现异常。如果是手机验证码,请多发送几次或直接联系客服处理!；'
							}

						]
					},
					{
						problemTitle: '密码相关',
						problemList: [{
								title: '忘记账号/昵称/密码怎么办？',
								content: '可以通过手机号或邮箱找回，在登录页面有找回的按钮。如您使用微信或者其他三方登录,请在我的页面绑定邮箱或手机号用于接收验证码。温馨提示:手机或邮箱是您在忘记密码操作时唯一的验证方式!'
							}

						]
					},
					{
						problemTitle: '签到详情',
						problemList: [{
								title: '签到的规则是什么？签到获取的物品是否可以使用？',
								content: '签到作为平台对新老用户的长久活动，在签到活动中获取的所有物品都可以在平台内部使用。如获取的是实物奖品,平台将会联系用户邮寄发送给用户。虚拟产品只能在平台内部使用,使用规则与其他虚拟货品一致!'
							}

						]
					}, {
						problemTitle: '其他',
						problemList: [{
								title: '如何修改用户头像',
								content: '请点击[我的] - [账号管理] - [头像]即可更换用户头像',
							},
							{
								title: '如何修改登录密码',
								content: '请点击[我的] - [账号管理] - [修改密码]即可修改登录密码',
							},
							{
								title: '如何退出登录',
								content: '请点击[我的] - [账号管理] - [退出登录]即可退出登录',
							},
							{
								title: '系统反应迟钝',
								content: '如果出现系统反应迟钝、响应时间过长的问题，可查看本机的网络状态，或重启程序后再次尝试。'
							}
						]
					}
				]
			}
		},
		methods: {
			onClick(item) {

				uni.navigateTo({
					url: '/pages/feedback/helpDetail?title=' + item.title + '&content=' + item.content,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
			toFeedbackList() {
				uni.navigateTo({
					url: '/pages/feedback/feedbackList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toFeedback() {
				uni.navigateTo({
					url: '/pages/feedback/feedback',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		height: 100%;
	}



	.bg-box {
		background-color: #F8F8F8;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.bg-list {
		margin-bottom: 100rpx;
		background-color: #FFFFFF;
		padding: 30rpx
	}

	.bg-white-box {
		background-color: #FFFFFF;
		margin: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		border-radius: 20rpx;
		color: #303133;
		font-size: 32rpx;
	}

	.vertical-line {
		height: 20rpx;
		background-color: #cecece;
		width: 2rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}

	.line {
		width: 100%;
		height: 1rpx;
		background-color: #F5F5F5;
	}



	.text-title {
		color: #303133;
		font-size: 32rpx;
		font-weight: bold;
	}

	.text-item {
		color: #999999;
		font-size: 28rpx;
		padding: 24rpx;
	}

	.list-title {
		margin-bottom: 30rpx;
	}

	.list-question {
		color: #606266;
		font-size: 28rpx;
	}

	.hover {
		background-color: #eee;
		opacity: 0.6;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
	}

	.text-feedback {
		padding: 20rpx;
	}

	.text-top {
		margin: 30rpx;
		color: #999999;
		font-size: 28rpx;
	}
</style>
