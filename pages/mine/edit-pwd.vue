<template>
	<!-- 我的/设置/修改密码 -->
	<view class="edit-pwd wrap-card">
		<u--input prefixIcon="lock-open" class="mb-20" v-model="form.oldPwd" placeholder="请输入旧密码"></u--input>
		<u--input prefixIcon="lock" class="mb-20" v-model="form.newPwd" placeholder="请输入新密码"></u--input>
		<u--input prefixIcon="checkbox-mark"  class="mb-20" v-model="form.reNewPwd" placeholder="请输入确认密码"></u--input>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">确定</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {updatePwd} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data(){
			return {
				form:{
					oldPwd:'',
					newPwd:'',
					reNewPwd:''
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
		computed:{
			// 禁用按钮
			disabled() {
				return this.form.oldPwd === '' || this.form.newPwd === '' || this.form.reNewPwd === '' 
			}
		},
		methods:{
			// 提交
			submit() {
				// 验证
				if(this.form.oldPwd === '' || this.form.newPwd === '') return uni.$u.toast('请输入旧密码和新密码')
				if(this.form.newPwd !== this.form.reNewPwd){
					
					return uni.$u.toast('两次密码不一致!')
					
				} 
				
				updatePwd({
					oldPwd: this.form.oldPwd,
					newPwd: this.form.newPwd
				}).then(data => {
					
					uni.showToast({
					    icon: 'none',   
					    duration: 3000,
					    title: '修改成功',
					});
				});
				this.$u.route('/pages/mine/login')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-pwd {
		
	}
</style>