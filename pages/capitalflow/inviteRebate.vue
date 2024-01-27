<template >
	<view>
		<view class="card" v-for="(item, index) in inviteRebateList" :key="index" :name="item">
			<view class="neirong"  @click="morebtn(item),toggle('bottom')">
				<view class="biaoti1">
					订单号:
					<text>{{item.id}}</text>
					</view>
				<view class="biaoti2">
					返利类型:
					<text class="pay">充值返利</text>
					</view>
				<view class="biaoti3"><text>日期:{{item.time}}</text></view>
				<view class="biaoti4"><text>充值:{{item.totalAmount}}(元)</text></view>
				
				<view class="biaoti5"><text>返利:{{item.totalSpecies}}(个)</text></view>
				<view class="biaoti6">
					来源:
					<text class="yiji" v-if="item.lowerLevel === '下一级'">{{item.lowerLevel}}</text>
					<text class="erji" v-if="item.lowerLevel === '下二级'">{{item.lowerLevel}}</text>
					</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getInviteRebateByUserId} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		emits: ['morebtn'],
		
		data() {
			return {
				inviteRebateList: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: ''
			};
		},
		onLoad(e) {
			this.getInviteRebateByUserId()
		},
		onReady() {},
		methods: {
			// 请求用户邀请记录数据
			getInviteRebateByUserId(){
				getInviteRebateByUserId().then(data => {
					
					console.log(data)
					
					this.inviteRebateList = data;
					
				});
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			morebtn() {
				
			}
		}
	}
</script>

<style>
	.card {
		height: 180upx;
		background-color: #F8F8F8;
	}

	.neirong {
		margin-left: 50upx;
		width: 650upx;
		margin-right: 50upx;
	}

	.biaoti1 {
		font-size: 30upx;
		margin-top: 15upx;
	}
	
	.chenggong {
		color: #00e500;
	}

	.biaoti2 {
		font-size: 30upx;
		margin-top: 30upx;
		color: #666666;
	}

	.biaoti3 {
		font-size: 30upx;
		margin-top: 30upx;
		color: #666666;
	}

	.biaoti4 {
		width: 100%;
		font-size: 30upx;
		margin-top: -174upx;
		text-align: right;
		margin-right: 30upx;
		/* margin-left: 400upx; */
		color: #000000;
	}
	.biaoti5 {
		width: 100%;
		font-size: 30upx;
		margin-top: 28upx;
		text-align: right;
		margin-right: 30upx;
		/* margin-left: 400upx; */
		color: #000000;
	}
	
	.biaoti6 {
		width: 100%;
		font-size: 30upx;
		margin-top: 26upx;
		text-align: right;
		margin-right: 30upx;
		/* margin-left: 400upx; */
		color: #000000;
	}
	
	.yiji {
		color: #F4A460;
	}
	.pay {
		color: #00e500;
	}
	.erji {
		color: #FFD700;
	}
</style>
