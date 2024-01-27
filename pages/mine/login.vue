<template>
	<!-- 我的/登录 -->
	<view class="login">
		<!-- 登录logo：猫头鹰蒙眼睛 -->
		<blindfold :show.sync="showEye"></blindfold>
		<!-- 登录表单 -->
		<view class="login-form wrap-card">
			<u--input :placeholder="form.loginType === '1' ? '请输入手机号/邮箱' : codeType" border="bottom"
				v-model="form.userName" placeholderStyle="{color:'#808080'}" :customStyle="{height:'80rpx'}" clearable>
			</u--input>
			<!-- 密码登录 -->
			<u-input v-if="form.loginType === '1'" type="password" placeholder="请输入密码" border="bottom"
				v-model="form.passWord" placeholderStyle="{color:'#808080'}" :customStyle="{height:'80rpx'}" clearable
				@focus="hideEye(true)" @blur="hideEye(false)">
				<template slot="suffix">
					<text class="text-gray-400">
						忘记密码
					</text>
				</template>
			</u-input>
			<!-- 注册 -->
			
			<u-input v-if="form.loginType === '2'" type="text"  placeholder="请输入验证码" border="bottom" v-model="form.code"
				placeholderStyle="{color:'#808080'}" :customStyle="{height:'80rpx'}">
				<template slot="suffix">
					<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒后重新获取" keepRunning
						uniqueKey="login-form"></u-code>
					<u-button @tap="getCode" :text="tips" type="success"></u-button>
				</template>
			</u-input>
			<u-input v-if="form.loginType === '2'" type="password" placeholder="请输入密码" border="bottom"
				v-model="form.passWord" placeholderStyle="{color:'#808080'}" :customStyle="{height:'80rpx'}" clearable
				@focus="hideEye(true)" @blur="hideEye(false)">
			</u-input>
		</view>
		<!-- 登录按钮 -->
		<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit()">
			{{form.loginType === '1' ? '登录' : '注册并登录'}}
		</u-button>
		<!-- 登录切换 -->
		<view class="flex justify-center items-center mt-50 text-green-400">
			<view class="" @click="changeType()">
				{{form.loginType === '1' ? '注册并登录' : '密码登录'}}
			</view>
			<view class="mx-20">
				<u-line length="20rpx" color="#d6d7d9" direction="col"></u-line>
			</view>
			<view class="">
				登录遇到问题
			</view>
		</view>
		<!-- 社交账号登录 -->
		<other-login class="px-50"></other-login>
		<!-- 协议 -->
		<view class="text-center fixed bottom-0 left-0 right-0 mb-20">
			<text class="text-gray-400">注册即代表您同意</text><text
				class="text-green-400 underline underline-offset-2">《分享社区协议》</text>
		</view>
	</view>
</template>

<script>
	import { login,sendCode,getCodeType,mpWeChatLogin} from '@/utils/lib/api.js';  //引入需要的api
	import { data } from '../../uni_modules/uview-ui/libs/mixin/mixin';
	export default {
		data() {
			return {
				
				tips: '',
				showEye: false,
				codeType: '请输入手机号',
				form: {
					userName: '',
					loginType: '1', // 1:密码 2:验证码
					passWord: '',
					code: ''
				},
				btnStyle: {
					width: "90%",
					height: "100rpx",
					marginTop: '50rpx',
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
			}
		},
		onLoad(e) {
			
			// #ifdef H5
			//这里只有公众号环境会走 
			let querycode = this.querycodes()
			console.log(querycode)
			if(Object.keys(querycode).length != 0){
				// alert(querycode)
				uni.showLoading({
					title: '登录中...'
				});
				//说明code不为空  是回调回来的
				let param = {
					"code": querycode.code
				}
				
				mpWeChatLogin(param).then(data => {
					uni.hideLoading();
					uni.showToast({
					    icon: 'none',   
					    duration: 3000,
					    title: '登入成功'
					});
					uni.setStorageSync('token', data.token);
					uni.setStorageSync('user', data);
					let protocol = window.location.protocol;
					let url = window.location.host;
					
				
					setTimeout(function() {
						window.location.href=protocol+"//"+url;
					}, 1000);
				}).catch(e => {
					uni.hideLoading()
				})
				
			}
			 //#endif
		},
		created() {
			this.getCodeTypes()
		},
		methods: {
			// 隐藏眼睛
			hideEye(type) {
				this.showEye = type
			},
			// 切换类型
			changeType() {
				this.form.loginType = this.form.loginType === '1' ? '2' : '1'
			},
			// 验证码改变
			codeChange(text) {
				this.tips = text
			},
			getCodeTypes(){
				getCodeType().then(data => {
					if(data == 0){
						this.codeType = '请输入手机号'
					}else if(data == 1){
						this.codeType = '请输入邮箱'
					}else{
						this.codeType = '请输入手机号/邮箱'
					}
				});
			},
			querycodes(){
				let href = window.location.href;
				let url = href.split('?')[1], obj = {};
				if(!url){
					return obj;
				}
				let searchArray = url.split('&');
				searchArray.map(item=>{
					let array = item.split('=');
					obj[array[0]] = array[1]
				})
				return obj;
			},
			// 获取验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在发送验证码'
					})
					sendCode(this.form).then(data => {
					   uni.hideLoading();
					   // 这里此提示会被this.start()方法中的提示覆盖
					   uni.$u.toast('验证码已发送')
					   // 通知验证码组件内部开始倒计时
					   this.$refs.uCode.start()
					});
				} else {
					uni.$u.toast('请倒计时结束后再发送')
				}
			},
			// 提交登录
			submit() {
				uni.showLoading({
					title: '登入中...'
				})
				login(this.form).then(data => {
				   uni.hideLoading();
				   uni.showToast({
				       icon: 'none',   
				       duration: 3000,
				       title: '登入成功'
				   });
				   uni.setStorageSync('token', data.token);
				   uni.setStorageSync('user', data);
				   var _this = this
				   setTimeout(function() {
						
						uni.switchTab({
							url:'/pages/home/home'
						})
				   }, 1000);
				   
				});
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		padding-top: 150rpx;

		.login-form {}

	}
</style>
