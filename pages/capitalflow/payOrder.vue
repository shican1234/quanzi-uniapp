<template >
	<view>
		<view class="card" v-for="(item, index) in payOrderList" :key="index" :name="item">
			<view class="neirong">
				<view class="biaoti1">
					渠道:
					<text v-if="item.peyType == 1">支付宝</text>
					<text v-if="item.peyType == 2">微信</text>
					<text v-if="item.peyType == 3">三方</text>
					</view>
				<view class="biaoti2">
					支付状态:
					<text class="chenggong">成功</text>
					</view>
				<view class="biaoti3"><text>日期:{{item.foundTime}}</text></view>
				<view class="biaoti4"><text>金额:{{item.rechargeAmount}}</text></view>
				
				<view class="biaoti5">
					商品:
					<text v-if="item.commodityType == 1">金币</text>
					<text v-if="item.commodityType == 2">会员</text>
					</view>
			</view>
		</view>
		<u-loadmore v-if="payOrderList.length > 0" :status="loadStatus" color="#9CA3AF">
		</u-loadmore>
		<u-empty v-if="payOrderList.length === 0" text="本来无一物,何处惹尘埃" icon="/static/img/demo/spring.svg" textSize="16"
			marginTop='25%' mode="list" height="700"></u-empty>
	</view>
</template>

<script>
	import {getUserPayOrderByUserIdList} from '@/utils/lib/api.js';  //引入需要的api
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
		// emits: ['morebtn'],
		
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
				payOrderList: []
			};
		},
		onLoad(e) {
			this.getUserPayOrderByUserIdList()
		},
		// 触底事件
		onReachBottom() {
			if(this.pageOk){
				this.getUserPayOrderByUserIdList()
			}
		},
		methods: {
			// 请求充值数据
			getUserPayOrderByUserIdList(){
				this.page = this.page + 1;
				getUserPayOrderByUserIdList({"page":this.page}).then(data => {
					
					this.payOrderList = this.payOrderList.concat(data)
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
			// morebtn() {
			// 	console.log("组件点击");
			// 	this.$emit("morebtn", this.value);
			// }
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
</style>
