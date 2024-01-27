<template>
	<view class="edit-info wrap-card">
		
		<view class="tool">
			<view>
				<text style="font-size: 38rpx; line-height: 2rem; text-align: center">
				{{userInfo.balance}}
				待提余额
				</text>
				
				<!-- <text style="font-size: 32rpx; line-height: 1rem;text-align: right">待提余额</text> -->
			</view>
		</view>
		
		<u-cell-group :border='false'>
			<uni-section trim = "all" type="line" padding class="uni-mt-10">
				<text class="uni-subtitle" style="font-size: 32rpx;">银行名称:</text>
				<uni-easyinput class="uni-mt-5" trim="all" v-model="userWithdrawalEntity.bankName" placeholder="请输入银行名称" @input="input">
				</uni-easyinput>
			</uni-section>
			
			<uni-section type="line" padding class="uni-mt-10">
				<text class="uni-subtitle" style="font-size: 32rpx;">银行卡号:</text>
				<uni-easyinput class="uni-mt-5" trim="all" type = "digit" v-model="userWithdrawalEntity.bankNumber" placeholder="请输入您的银行卡号" @input="input">
				</uni-easyinput>
			</uni-section>
			
			<uni-section trim = "all" type="line" padding class="uni-mt-10">
				<text class="uni-subtitle" style="font-size: 32rpx;">持卡人姓名:</text>
				<uni-easyinput class="uni-mt-5" trim="all" v-model="userWithdrawalEntity.name" placeholder="请输入真实姓名" @input="input">
				</uni-easyinput>
			</uni-section>
			
			<uni-section trim = "all" type="line" padding class="uni-mt-10">
				<text class="uni-subtitle" style="font-size: 32rpx;">身份证号:</text>
				<uni-easyinput class="uni-mt-5" trim="all" v-model="userWithdrawalEntity.idno" placeholder="请输入身份证号" @input="input">
				</uni-easyinput>
			</uni-section>
			
			<uni-section trim = "all" type="line" padding class="uni-mt-10">
				<text class="uni-subtitle" style="font-size: 32rpx;">提现金额:</text>
				<uni-easyinput class="uni-mt-5" trim="all" type = "digit" v-model="userWithdrawalEntity.money" placeholder="请输入提现金额" @input="input">
				</uni-easyinput>
			</uni-section>
			
				<view>
					<text style="line-height: 6rem; text-align: center">
					当前提现手续费费率为:{{100-userInfo.withdrawalProportion}}%
					</text>
				</view>
				
				<!-- <view>
					<text style="line-height: 2rem; text-align: center; color: #FF0000;">
					为打击违法犯罪活动,自您提现日期后7个工作日平台将会审核打款,
					如发现资金异常或有违法乱纪现象,平台将冻结您账号所有资金。
					</text>
				</view> -->
			
			
		</u-cell-group>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserById,userWithdrawal} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				value: '',
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
				userInfo: {},
				userWithdrawalEntity:　{
					bankName: '',
					bankNumber: '',
					name: '',
					idno: '',
					money: ''
				}
				
			}
		},
		onLoad(e) {
			this.getUserPost()
		},
		methods: {
			
			// 用户信息
			getUserPost(){
				getUserById().then(data => {
					
					this.userInfo = data;
					
				});
			},
			input(e) {
				
			},
			// 提交
			submit() {
				userWithdrawal(this.userWithdrawalEntity).then(data => {
					// this.$refs.hbComment.deleteComplete(commentId);
					console.log(this.userWithdrawalEntity)
					uni.showToast({
					    icon: 'none',   
					    duration: 3000,
					    title: '提现成功,请等待审核!'
					})
					location.reload();
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-info {
		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			margin-right: 10rpx;
		}
	}
</style>
<style lang="scss">
	.uni-mt-5 {
		margin-top: 5px;
	}
	.uni-mt-10 {
		margin-top: 20px;
	}
	.tool {
		display: flex;
		width: 100%;
		height: 172rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 22rpx 0rpx rgba(114, 118, 206, 0.2700);
		border-radius: 28rpx;
		justify-content: space-evenly;
		margin: 22rpx 0;
	
		>view {
			display: flex;
			flex-direction: column;
	
			& text {
				font-size: 22rpx;
				font-weight: 600;
				color: #666666;
				line-height: 32rpx;
				text-shadow: 0rpx 4rpx 14rpx rgba(222, 148, 247, 0.6000);
			}
	
			& image {
				width: 98rpx;
				height: 96rpx;
				margin-top: 10rpx;
			}
		}
	}
</style>