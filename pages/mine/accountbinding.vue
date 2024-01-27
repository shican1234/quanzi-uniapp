<template>
	<view>
		<view class="logintitle">
			<view class="logintitles" v-if="user_configuration.code_type == 0 || user_configuration.code_type == 2" @click="type=1" :class="[type==1?'logintitles_select':'']">手机号绑定</view>
			<view class="logintitles" v-if="user_configuration.code_type == 1 || user_configuration.code_type == 2" @click="type=2" :class="[type==2?'logintitles_select':'']">邮箱号绑定</view>
		</view>
		<view v-if="type==1">
			 <view class="phone" style="margin-top: 80rpx;">
			 	<image src="../../static/binding/loginicon01.png" class="loginicon"></image>
			 	<input type="number" :maxlength="11" v-model="loginform.phone" class="input_input" placeholder="请输入手机号码" placeholder-style="color:#adc9d8;" />
			 </view>
			 <view class="phone" style="margin-top: 30rpx;" v-if="mobileShow">
			 	<image src="../../static/binding/loginicon01.png" class="loginicon"></image>
			 	<input type="number" v-model="loginform.phone_code" class="input" placeholder="请输入验证码" placeholder-style="color:#adc9d8;" />
			     <!-- <image src="../../static/binding/loginicon03.png" class="guanbi" style="margin-left: auto;margin-right: 30rpx;" v-if="loginform.phone_code" @click="loginform.code=''"></image> -->
			 <view class="code" @click="getcode_phone()" :style="{color:loginform.phone?'#3578f5':''}" v-if="this.timer_phone == null">
			 	{{code_phone}}
			 </view>
			 <view class="code" :style="{color:loginform.phone?'#808080':''}" v-if="this.timer_phone != null">
			 	{{code_phone}}
			 </view>
			 </view>
		</view>
		
		<view v-if="type==2">
			 <view class="phone" style="margin-top: 80rpx;">
			 	<image src="../../static/binding/loginicon02.png" class="loginicon"></image>
			 	<input type="text" :maxlength="50" v-model="loginform.email" class="input_input" placeholder="请输入邮箱号" placeholder-style="color:#adc9d8;" />
			 </view>
			 <view class="phone" style="margin-top: 30rpx;" v-if="emailShow">
			 	<image src="../../static/binding/loginicon01.png" class="loginicon"></image>
			 	<input type="number" v-model="loginform.email_code" class="input" placeholder="请输入验证码" placeholder-style="color:#adc9d8;" />
			 <view class="code" @click="getcode_email()" :style="{color:loginform.email?'#3578f5':''}" v-if="this.timer_email == null">
			 	{{code_email}}
			 </view>
			 <view class="code" :style="{color:loginform.email?'#808080':''}" v-if="this.timer_email != null">
			 	{{code_email}}
			 </view>
			 </view>
		</view>
		<view class="success" @click="login()">提交</view>
	</view>
</template>

<script>
	import { isEmail, isMobile } from "@/utils/lib/rules.js"
	import {getUserBuUserId,binDingSendCode,saveUserEmailOrMobileByUserId} from '@/utils/lib/api.js';
	export default {
		data(){
			return{
				type:1,//1免密码登陆 2账号登陆
				loginform:{
					phone:'',
					phone_code:'',
					
					email:'',
					email_code:'',
				},
				mobileShow: true,
				emailShow: true,
				bType: '',
				timer_phone:null,
				timer_email:null,
				time_phone:60,
				time_email:60,
				code_phone:"获取验证码",
				code_email:"获取验证码",
				
				user_configuration: {
					email: '',
					mobile: '',
					code_type: ''
				}
				
			}
		},
		onReady() {
			
			this.getUserBuUserId();
		}, 
		onLoad(e) {
			this.bType = e.type
		},
		mounted(){
			
		},
		methods:{
			// 查询用户的账号绑定情况以及后台验证码发送类型
			getUserBuUserId(){
				getUserBuUserId().then(data => {
					
					console.log('data',data)
					if(data.mobile){
						this.mobileShow = false
					}
					if(data.email){
						this.emailShow = false
					}
					this.user_configuration = data;
					
					if(this.user_configuration.code_type == 0){//手机号绑定回显
						this.loginform.phone = this.user_configuration.mobile;
						if(this.loginform.phone != null && this.loginform.phone != ''){
							this.timer_phone = 1;
						}
						
						this.type = 1;
						
					}else if(this.user_configuration.code_type == 1){//邮箱号绑定回显
						this.loginform.email = this.user_configuration.email;
						if(this.loginform.email != null && this.loginform.email != ''){
							this.timer_email = 1;
						}
						
						this.type = 2;
						
					}else if(this.user_configuration.code_type == 2){//手机和邮箱号绑定一起回显
						this.loginform.phone = this.user_configuration.mobile;
						this.loginform.email = this.user_configuration.email;
						
						if(this.loginform.phone != null && this.loginform.phone != ''){
							this.timer_phone = 1;
						}
						if(this.loginform.email != null && this.loginform.email != ''){
							this.timer_email = 1;
						}
						
					}
					
					console.log(this.user_configuration)
					
				});
			},
			//提交
			login(){
				let that = this;
				if(this.type == 1){
					if(!isMobile(that.loginform.phone)){
						uni.showToast({
							title:"请输入正确的手机号码",
							icon:"none"
						})
						return;
					}

				if(!that.loginform.phone_code){
						uni.showToast({
							title:"请输入验证码",
							icon:"none"
						})
						return;
					}
				}else if(this.type == 2){
					if(!isEmail(that.loginform.email)){
						uni.showToast({
							title:"请输入正确的邮箱账号",
							icon:"none"
						})
						return;
					}
					if(!that.loginform.email_code){
							uni.showToast({
								title:"请输入验证码",
								icon:"none"
							})
							return;
						}
				}
				
				var accountNumber = '';
				var code = '';
				if(this.type == 1){
					this.accountNumber = that.loginform.phone;
					this.code = that.loginform.phone_code;
				}
				console.log(accountNumber,code)
				if(this.type == 2){
					this.accountNumber = that.loginform.email;
					this.code = that.loginform.email_code;
				}
				
				//提交账号
				saveUserEmailOrMobileByUserId({'type':this.type,'accountNumber':this.accountNumber,'code':this.code}).then(data => {
					let msg = '绑定成功!!'
					if(this.bType === 'wx'){
						msg = '绑定成功,初始密码为123456'
					}
					uni.showToast({
						icon: 'none',   
						duration: 3000,
						title: msg
					})
					setTimeout(function() {
						uni.switchTab({
							url:'/pages/home/home'
						})
					}, 1000);
					
				});
				
			},
			//手机获取验证码
			getcode_phone(){
				let that = this;
				if(!isMobile(that.loginform.phone)){
					uni.showToast({
						title:"请输入正确的手机号码",
						icon:"none"
					})
					return;
				}
				// 发送手机验证码
				binDingSendCode({'type':this.type,'accountNumber':this.loginform.phone}).then(data => {

					
				});
					that.timer_phone = setInterval(()=>{
						
						if(that.time_phone<=0){
							that.time_phone = 60
							clearInterval(that.timer_phone);
							that.code_phone = "重新获取";
							that.timer_phone = null;
						}else{
							that.time_phone --;
							that.code_phone = "重新获取(" + that.time_phone + ")";
						}
					},1000)
				
			},
			//邮箱获取验证码
			getcode_email(){  
				let that = this;
				if(!isEmail(that.loginform.email)){
					uni.showToast({
						title:"请输入正确的邮箱账号",
						icon:"none"
					})
					return;
				}
				// 发送手机验证码
				binDingSendCode({'type':this.type,'accountNumber':this.loginform.email}).then(data => {
				
					
				});
				//请求获取验证码接口，如果成功，则进行倒计时
				that.timer_email = setInterval(()=>{
					if(that.time_email<=0){
						that.time_email = 60
						clearInterval(that.timer_email);
						that.code_email = "重新获取";
						that.timer_email = null;
					}else{
						that.time_email --;
						that.code_email = "重新获取(" + that.time_email + ")";
					}
				},1000)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.success{
		width: 630rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 34rpx;
		font-weight: bold;
		background: #3578f5;
		border-radius: 10rpx;
	}
	.phone{
		width: 630rpx;
		margin: 0 auto;
		border: 1px solid #dae0e1;
		border-radius: 5rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		.code{
			color: #adc9d8;
			font-size: 34rpx;
			margin-left: auto;
			margin-right: 30rpx;
		}
		.guanbi{
			width: 40rpx;
			height: 40rpx;
		}
		.input{
			width: 250rpx;
			height: 100%;
			color: #333;
			font-size: 34rpx;
			margin-left: 30rpx;
		}
		.input_input{
			width: 500rpx;
			height: 100%;
			color: #333;
			font-size: 34rpx;
			margin-left: 30rpx;
		}
		.loginicon{
			width: 45rpx;
			height: 45rpx;
			margin-left: 35rpx;
		}
	}
	.logintitle{
		width: 630rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		display: flex;
		height: 70rpx;
		.logintitles_select{
			color: #3b76f3!important;
			position: relative;
		}
		.logintitles_select:after{
			content:"";
			position: absolute;
			width: 40rpx;
			height: 10rpx;
			border-radius: 10rpx;
			background: #3b76f3;
			left: 50%;
			margin-left: -20rpx;
			bottom: -25rpx;
		}
		.logintitles{
			width: 50%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #333;
			font-size: 38rpx;
		}
	}
</style>