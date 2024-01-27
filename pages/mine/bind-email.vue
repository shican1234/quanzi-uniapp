<template>
	<!-- 我的/设置/绑定邮箱 -->
	<view class="bind-email wrap-card">
		<u-input prefixIcon="email" class="mb-20" v-model="form.email" placeholder="请输入你要绑定的邮箱">
			<template slot="suffix">
				<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒后重新获取" keepRunning
					uniqueKey="bind-email"></u-code>
				<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
			</template>
		</u-input>
		<u--input prefixIcon="warning" class="mb-20" v-model="form.code" placeholder="请输入验证码"></u--input>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">绑定
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: '',
				form: {
					email: '',
					code: ''
				},
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
		computed: {
			// 禁用按钮
			disabled() {
				return this.form.email === '' || this.form.code === ''
			}
		},
		methods: {
			// 验证码改变
			codeChange(text) {
				this.tips = text
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在发送验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送')
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start()
					}, 2000)
				} else {
					uni.$u.toast('请倒计时结束后再发送')
				}
			},
			// 提交
			submit() {
				// 验证
				if(this.form.email === '' || this.form.code === '') return uni.$u.toast('请输入邮箱和验证码')
				const rule = /[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
				if(!rule.test(this.form.email)) return uni.$u.toast('请输入合法的电子邮箱')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bind-email {}
</style>
