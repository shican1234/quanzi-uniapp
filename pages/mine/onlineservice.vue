<template>
	<view class="container">
		<!-- <view class="status-bar"></view>
		<view class="header flex-row">
			<view class="left">
				<uni-icons type="closeempty" size="24" color="#777"></uni-icons>
			</view>
			<view class="center">发布闲置</view>
			<view class="right">发布</view>
		</view> -->
		<view class="body">
			<!-- <textarea v-model="content" placeholder="请输入内容" class="content" /> -->
			<view class="images" style="margin-left: 20px;">
				<view>
					<image :src="customer.customerQrCodeUrl" class="image"></image>
				</view>
			</view>
			<view class="items">
				<view class="item flex-row" @click="copyText(customer.customerWechat)">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18" style="font-size: 18px"></uni-icons>
						<text class="label" style="font-size: 15px">微信号</text>
					</view>
					<view class="flex-row">
						<text class="value" style="font-size: 15px" v-if="customer.customerWechat != null || customer.customerWechat != '' ">{{ customer.customerWechat }}</text>
						<text class="value" style="font-size: 15px" v-if="customer.customerWechat == null || customer.customerWechat == '' ">无</text>
					</view>
				</view>
				<view class="item flex-row" @click="copyText(customer.accountName)">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18" style="font-size: 18px"></uni-icons>
						<text class="label">微信公众号</text>
					</view>
					<view class="flex-row">
						<text class="value" style="font-size: 15px" v-if="customer.accountName != null || customer.accountName != '' " >{{ customer.accountName }}</text>
						<text class="value" style="font-size: 15px" v-if="customer.accountName == null || customer.accountName == '' ">无</text>
					</view>
				</view> 
				<view class="item flex-row" @click="copyText(customer.telePhone)">
					<view class="flex-row">
						<uni-icons type="settings" color="#666" size="18" style="font-size: 18px"></uni-icons>
						<text class="label">联系方式</text>
					</view>
					<view class="flex-row">
						<text class="value" style="font-size: 15px" v-if="customer.telePhone != null || customer.telePhone != '' " >{{ customer.telePhone }}</text>
						<text class="value" style="font-size: 15px" v-if="customer.telePhone == null || customer.telePhone == '' ">无</text>
					</view>
				</view>
			</view>
			<view class="protocol flex-row">
				<uni-icons type="checkbox" size="20" class="checkbox" style="font-size: 18px"></uni-icons>
				<view style="font-size: 15px" class="text">如您遇到什么无法解决问题或有什么疑问,请按照上方的联系方式联系我们,我们的客服会为您解答,客服在线时间:工作日9:00-22:00。</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
import {queryCustomer} from '@/utils/lib/api.js';  //引入需要的api
export default {
	components: {uniPopup},
	data() {
		return {
			content: '',
			customer: {}
		}
	},
	onLoad(e) {
		this.queryCustomer()
	},
	methods: {
		showModule(){
			this.$refs.module.open()
		},
		// 用户信息
		queryCustomer(){
			queryCustomer().then(data => {
				
				this.customer = data;
				console.log(data);
				
			});
		},
		copyText(value){
			uni.setClipboardData({
			  data: value,
			  success: function() {
			    console.log('复制成功');
			  }
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow: hidden;
}
.module{
	width: 80vw;
	height: 600rpx;
	padding: 30rpx;
	overflow-y: auto;
	margin: 25vh auto 0;
	background-color: #FFF;
	
	.item{
		height: 80rpx;
		justify-content: flex-start;
		
		.text{
			margin-left: 20rpx;
		}
	}
}

.body{
	padding: 30rpx;
	overflow-y: auto;
	height: calc(100vh - 88rpx - var(--status-bar-height));
	
	.protocol{
		align-items: flex-start;
		
		.text{
			color: #999;
			font-size: 28rpx;
			width: calc(100% - 60rpx);
		}
	}
	
	.items{
		padding: 20rpx 0;
		
		.item{
			height: 100rpx;
			border-bottom: 2rpx solid #F2F2F2;
			
			.label{
				color: #666;
				font-size: 30rpx;
				margin-left: 20rpx;
			}
			
			.value{
				color: #999;
				font-size: 28rpx;
			}
		}
	}
	
	.content{
		height: 200rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		border-radius: 10rpx;
		width: calc(100% - 60rpx);
		background-color: #F9F9F9;
	}
	
	.images{
		overflow: hidden;
		
		.item{
			float: left;
			margin: 20rpx 20rpx 0 0;
			width: calc((100vw - 100rpx) / 3);
			height: calc((100vw - 100rpx) / 3);
			position: relative;
			
			.image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.header{
	height: 88rpx;
	padding: 0 30rpx 0 20rpx;
	border-bottom: 2rpx solid #F2F2F2;
	
	.left,
	.right{
		width: 100rpx;
	}
	.center{
		text-align: center;
		width: calc(100% - 200rpx);
	}
	.right{
		text-align: right;
	}
}
text{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.status-bar{
	height: var(--status-bar-height);
}
.flex-row{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>
