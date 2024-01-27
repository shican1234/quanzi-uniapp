<template >
	<view>
		<view class="card" v-for="(item, index) in withdrawalOrderList" :key="index" :name="item">
			<view class="neirong"  @click="morebtn(item),toggle('bottom')">
				<view class="biaoti1">
					渠道:
					<text>银行卡</text>
					</view>
				<view class="biaoti2">
					审核状态:
					<text v-if="item.status == 0" class="daishenhe">待审核</text>
					<text v-if="item.status == 1" class="chenggong">通过</text>
					<text v-if="item.status == 2" class="jujue">拒绝</text>
					</view>
				<view class="biaoti3"><text>日期:{{item.createTime}}</text></view>
				<view class="biaoti4"><text>金币:{{item.withdrawalSpecies}}(个)</text></view>
				
				<view class="biaoti5"><text>金额:{{item.withdrawalMoney}}(元)</text></view>
			</view>
		</view>
		<u-loadmore v-if="withdrawalOrderList.length > 0" :status="loadStatus" color="#9CA3AF">
		</u-loadmore>
		<u-empty v-if="withdrawalOrderList.length === 0" text="本来无一物,何处惹尘埃" icon="/static/img/demo/spring.svg" textSize="16"
			marginTop='25%' mode="list" height="700"></u-empty>
		<!-- <button class="button" type="primary" @click="toggle('bottom')"><text class="button-text">底部</text></button> -->
		<!-- 普通弹窗 -->
		<view>
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content">
					<view >
						<!-- <view style="text-align: center">提现订单详情</view> -->
						<view style="margin-top:10px;fontSize:16px"><text>提现单号:{{withdrawalOrder.withdrawalCode}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>银行卡号:{{withdrawalOrder.bankNo}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>银行名称:{{withdrawalOrder.bankName}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>持卡人:{{withdrawalOrder.name}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>渠道:银行卡转账</text></view>
						<view style="margin-top:5px;fontSize:16px"><text>提现金币:{{withdrawalOrder.withdrawalSpecies}}个</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>换算金额:{{withdrawalOrder.withdrawalMoney}}元</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>实际到账:{{withdrawalOrder.actualAccount}}元</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>手续费:{{withdrawalOrder.serviceCharge}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>手续费比例:{{withdrawalOrder.serviceChargeScale}}%</text></view>
						<view style="margin-top:10px;fontSize:16px">
							审核状态:
							<text v-if="withdrawalOrder.status == 0" class="daishenhe">待审核</text>
							<text v-if="withdrawalOrder.status == 1" class="chenggong">通过</text>
							<text v-if="withdrawalOrder.status == 2" class="jujue">拒绝</text>
							</view>
						<view style="margin-top:10px;fontSize:16px"><text>备注:{{withdrawalOrder.content}}</text></view>
						<view style="margin-top:10px;fontSize:16px"><text>时间:{{withdrawalOrder.createTime}}</text></view>
						
					</view>
				</view>
			</uni-popup>
		</view>
		
		
	</view>
</template>

<script>
	import {getWithdrawalByUserId} from '@/utils/lib/api.js';  //引入需要的api
	/**
	 * billcard 自定义账单卡片
	 * @description 账单卡片组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=30
	 * @property {Number} title 标题，默认100px/秒
	 * @property {String} typename 分类名
	 * @property {String} time 账单时间
	 * @property {String} price 价格
	 * @property {String} value 点击返回值
	 * @event {Function} morebtn 点击 NoticeBar 触发事件
	 */
	export default {
		// name: "billcard",
		emits: ['morebtn'],
		
		// props: {
		// 	title: {
		// 		type: String,
		// 		default: '支付宝转入到余额宝' // view|canvas
		// 	},
		// 	typename: {
		// 		type: String,
		// 		default: '投资理财' // view|canvas
		// 	},
		// 	time: {
		// 		type: String,
		// 		default: '2022-01-02 04:07' // view|canvas
		// 	},
		// 	price: {
		// 		type: String,
		// 		default: '280.00' // view|canvas
		// 	},
		// 	value: {
		// 		type: String,
		// 		default: '1' // view|canvas
		// 	}
		// },
		data() {
			return {
				pageOk: true,
				page: 0,
				loadStatus: 'loadmore',
				withdrawalOrderList: [],
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				withdrawalOrder: {}
			};
		},
		onLoad(e) {
			this.getWithdrawalByUserId()
		},
		// 触底事件
		onReachBottom() {
			if(this.pageOk){
				this.getWithdrawalByUserId()
			}
		},
		onReady() {},
		methods: {
			// 请求充值数据
			getWithdrawalByUserId(){
				this.page = this.page + 1;
				getWithdrawalByUserId({"page":this.page}).then(data => {
					this.withdrawalOrderList = this.withdrawalOrderList.concat(data)
					console.log(data)
					if(data.length >=10){
						// this.page = this.page + 1;
						this.loadStatus = 'loadmore';
					}else{
						this.pageOk = false
						this.loadStatus = 'nomore';
					}
					
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
			morebtn(withdrawalOrder) {
				this.withdrawalOrder = withdrawalOrder
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
		margin-top: 36upx;
		text-align: right;
		margin-right: 30upx;
		/* margin-left: 400upx; */
		color: #000000;
	}
	.popup-content {
		display: flex;
		/* align-items: center;
		justify-content: center; */
		padding: 0px;
		height: 415px;
		background-color: #bbcdc5;
	}
	
	.daishenhe {
		color: #4b5cc4;
	}
	.chenggong {
		color: #00e500;
	}
	.jujue {
		color: #ff2121;
	}
</style>
