<template>
	<!-- 我的/设置/意见反馈 -->
	<view class="feedback">
		<u-collapse>
			<u-collapse-item v-for="(item,index) in list" :key="index" :title="item.name">
				<text class="u-collapse-content">{{item.content}}</text>
			</u-collapse-item>
		</u-collapse>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar"  @click="goTo('/pages/feedback/feedback')">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle">意见反馈
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	feedbackList
	// } from "@/utils/data/data.js"
	export default {
		data() {
			return {
				list: [
				{
					name: '昵称是什么？',
					content: '昵称（本规则简称“昵称”）区别于用户名，是您对外展示的账号身份标识；昵称具有唯一性，您可通过【修改资料】自行修改，修改一次昵称需消耗6个硬币；昵称遵循“先到先得”原则，除特殊情况外，不支持取回昵称。'
				},
				{
					name: '如果邮箱没有收到激活邮件怎么办？',
					content: '邮件发送具有一定的延迟请等待一段时间后再次查询；检查邮件垃圾箱中是否有激活邮件；可以在会员中心点击再次发送激活邮件；尝试更换邮箱再进行激活；'
				},
				{
					name: '客服什么时候在线？',
					content: '客服的工作时间：周一至周五，09:00 - 18:00，非工作时间的咨询反馈会自动转为留言，客服上班后会第一时间回复您~'
				},
				{
					name: '忘记账号/昵称/密码怎么办？',
					content: '可以通过手机号找回，在登录页面有找回的按钮'
				}
			],
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				}, 
			}
		},
		onLoad() {
		},
		methods: {
			goTo(url){
				console.log(123)
				this.$u.route(url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.feedback {}
</style>
