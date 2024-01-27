<template>
	<view style="overflow-x: hidden;">
		<view class="bg">
			<image class="bg-img" src="/static/img/pay/bg.png" mode=""></image>
		</view>

		<view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<image class="nav-back" src="/static/img/pay/back.png" mode="" @click="back"></image>
			<text class="nav-title">会员充值</text>
			<view class="nav-space"></view>
		</view>

		<view class="info" :style="{marginTop: statusBarHeight + 44 + 'px'}">
			<image class="info-bg" src="/static/img/pay/info-bg.png" mode=""></image>

			<view class="info-content">
				<view class="headImg">
					<image class="info-avatar-pic" :src="userInfo.avatar" mode=""></image>
				</view>
				<view class="info-name" style="margin-left:10px">
					<text class="info-name">{{userInfo.nickName}}</text>
					<!-- <text class="info-level">升级至尊会员享额外特权</text> -->
				</view>
			</view>

			<view class="info-asset">
				<!-- <view class="info-asset-item">
					<text class="iai-title">积分</text>
					<text class="iai-value">0</text>
				</view> -->
				<view class="info-asset-item">
					<text class="iai-title">金币数量</text>
					<text class="iai-value">{{userInfo.cion}}</text>
				</view>
				<view class="info-asset-item" style="margin-left:80px">
					<text class="iai-title">VIP到期时间</text>
					<text class="iai-value" v-if="userInfo.vipType == 1">{{userInfo.become}}</text>
					<text class="iai-value" v-if="userInfo.vipType == 2">暂无会员</text>
				</view>
			</view>
		</view>

		<view class="main-title">
			<text>充值类型</text>
		</view>

		<scroll-view scroll-x>
			<view class="recharge">
				<view class="recharge-item" :class="current == index ? 'recharge-item-active': ''"
					v-for="(item, index) in goodsVipLists" :key="index" :style="{marginLeft: !index ? '30rpx': ''}"
					@click="rechargeChange(index)">
					<view class="recharge-tag" v-if="item.label == 0"> <!-- 标签显示 -->
						<text class="recharge-tag-text">限时特价 送豪礼</text>
					</view>
					<text class="recharge-item-duration">{{ item.duration }}</text> <!-- 商品名称 -->
					<view class="recharge-item-price">
						<text class="rmb">￥</text>
						<text class="recharge-item-price-text">{{ item.price }}</text> <!-- 商品价格 -->
					</view>
					<text class="recharge-item-des">{{ item.briefIntroduction }}</text>
				</view>
			</view>
		</scroll-view>

		<u-radio-group @change="checkboxChange" class="info-asset" style="margin-top:25px;" v-if="display == true">
			<u-radio v-for="(item, index) in radioList" :key="index" :name="item" v-if="item.peyType == 2"
				style="margin-left:5px">微信</u-radio>
			<u-radio v-for="(item, index) in radioList" :key="index" :name="item" v-if="item.peyType == 1"
				style="margin-left:5px">支付宝</u-radio>
		</u-radio-group>

		<view class="button update" hover-class="hover" @click="updateNow">
			<text class="button-text">立即充值</text>
		</view>

		<!-- <text class="tip">升级得800金币</text> -->

		<view class="main-title">
			<text>会员特权</text>
		</view>

		<view class="privilege">
			<view class="privilege-item" v-for="(item, index) in privilegeList" :key="index" hover-class="hover"
				@click="privilegeClick(index)">
				<image class="privilege-item-pic" :src="item.pic" mode=""></image>
				<text class="privilege-item-text">{{ item.text }}</text>
			</view>
		</view>

		<!-- 		<view class="level">
			<view class="level-rate">
				<text class="level-rate-text1">当前返利比例</text>
				<text class="level-rate-text2">25%</text>
			</view>
			
			<view class="level-info">
				<image class="level-info-icon" src="~@/static/img/pay/vip.png" mode=""></image>
				<text class="level-info-text">V1至尊会员</text>
				<text class="level-info-integral">0</text>
			</view>
			
			<view class="level-distance">
				<text class="level-distance-text">距V1会员还有1250点</text>
				<view class="button level-distance-button" hover-class="hover">
					<text class="button-text">查看详情</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		getUserById,
		getGoodsVipLists,
		gopay,
		getConfig
	} from '@/utils/lib/api.js'; //引入需要的api
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				statusBarHeight,
				current: 0,
				userInfo: {},
				goodsVipLists: [],
				radioList: [],
				type: 0,

				commodityId: null,
				payType: null,

				//当display为false时不显示支付选项
				display: true,

				privilegeList: [{
						pic: '/static/img/pay/zsbs.png',
						text: '专属标识'
					},
					{
						pic: '/static/img/pay/qzsl.png',
						text: '圈子数量'
					},
					{
						pic: '/static/img/pay/fft.png',
						text: '发布付费贴'
					},
					{
						pic: '/static/img/pay/ffq.png',
						text: '创建付费圈'
					}

				]
			}
		},
		onLoad(e) {
			this.getUserPost(),
				this.getGoodsVipLists(),
				this.getAppConfig()

			// #ifdef  MP-WEIXIN
			this.display = false;
			// #endif

			// #ifdef  H5
			var ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//当前为微信浏览器
				this.display = false;
			}
			// #endif
		},
		methods: {
			// 用户信息
			getUserPost() {
				getUserById().then(data => {

					this.userInfo = data;

				});
			},
			getAppConfig() {
				getConfig().then(data => {
					this.config = data
				});
			},
			//充值会员商品
			getGoodsVipLists() {
				var _this = this;
				// #ifdef  MP-WEIXIN
				var type = 3;
				// #endif

				// #ifdef  H5
				var ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					//当前为微信浏览器
					var type = 4;
				} else {
					//微信外浏览器
					var type = 2;
				}
				// #endif

				// #ifdef  APP-PLUS
				var type = 1;
				// #endif
				getGoodsVipLists({
					"type": type
				}).then(data => {

					this.goodsVipLists = data.optionList;
					this.radioList = data.payList;

					console.log(this.goodsVipLists)

				});
			},
			checkboxChange(index) {
				var _this = this;
				_this.payType = index.peyType;
				console.log('change', _this.payType);
			},

			rechargeChange(index) {
				this.current = index
			},
			updateNow() {
				uni.showLoading({
					title: '请求中...'
				})
				// this.commodityId = this.goodsVipLists[this.current].id;
				var _this = this;
				// #ifdef  MP-WEIXIN
				var type = 3;
				// #endif

				// #ifdef  H5
				var ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					//当前为微信浏览器
					var type = 4;
				} else {
					//微信外浏览器
					var type = 2;
				}
				// #endif

				// #ifdef  APP-PLUS
				var type = 1;
				// #endif

				if (type == 3) {
					_this.payType = 3;
				}

				if (type == 4) {
					_this.payType = 4;
				}

				gopay({
					commodityId: this.goodsVipLists[this.current].id,
					payType: _this.payType,
					type: type,
				}).then(data => {
					uni.hideLoading();
					console.log(data)

					if (data.payStatus == 1) { //APP拉起H5支付

						if (data.payType == 1) { //APP内拉起支付宝H5支付
							console.log("调用了支付宝H5支付链接为:" + data.payLink)
							plus.runtime.openURL(data.payLink, function(err) {
								uni.showToast({
									title: JSON.stringify(err),
									duration: 8000
								})
							});

						} else if (data.payType == 2) { //app内拉起微信H5支付
							// #ifdef  APP-PLUS
							// app创建webview访问服务端返回的h5支付链接
							const platform = uni.getSystemInfoSync().platform
							// 申请h5支付的域名，换成自己的
							const domain = this.config.appTui
							// 创建一个webview
							const webview = plus.webview.create('', domain);
							// 通过webview打开链接，后面加referer表示该链接是从哪里打开的，请填写申请h5支付的域名，比如：http://www.baidu.com,需要已备案
							switch (platform) {
								case 'android':
									webview.loadURL(data.payLink, {
										'Referer': domain
									});
									break;
								case 'ios':
									webview.loadURL(data.payLink, {
										'Referer': domain + '://'
									});
									break;
								default:
									break;
							}
							// #endif
						}

					} else if (data.payStatus == 2) { //H5拉起

						window.location.href = data.payLink

					} else if (data.payStatus == 3) { //小程序拉起

						wx.requestPayment({
							appId: data.appId,
							timeStamp: data.timestamp,
							nonceStr: data.nonceStr,
							package: data.package,
							signType: "MD5",
							paySign: data.paySign,
							success: function(res) {
								// 支付成功处理逻辑
								uni.navigateBack();
							},
							fail: function(res) {
								// 支付失败处理逻辑
								document.write("拉起支付错误,请联系管理人员!");
							}
						})

					} else if (data.payStatus == 4) {
						WeixinJSBridge.invoke(
							'getBrandWCPayRequest', {
								"appId": data.appId, //公众号名称，由商户传入
								"timeStamp": data.timestamp, //时间戳，自1970年以来的秒数
								"nonceStr": data.nonceStr, //随机串
								"package": data.package,
								"signType": data.signType, //微信签名方式：
								"paySign": data.paySign //微信签名
							},
							function(res) {
								if (res.err_msg === "get_brand_wcpay_request:ok") {
									// 使用以上方式判断前端返回,微信团队郑重提示：
									//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
									uni.showLoading({
										title: '支付成功'
									});
									setTimeout(function() {
										uni.hideLoading();
										uni.switchTab({
											url: '/pages/user/user'
										})
									}, 1000);
								} else {
									uni.hideLoading();
								}
								WeixinJSBridge.log(res.err_msg);
							}
						);
					}

				});
				// uni.showToast({
				// 	icon: "none",

				// 	title: `选择了「${this.commodityId}」`
				// 	// title: `选择了「${this.radioList[this.current].id}」`
				// })
			},
			privilegeClick(index) {
				uni.showToast({
					icon: "none",
					// title: `点击了「${this.privilegeList[index].text}」`
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/mine/me'
				})
			}
		}
	}
</script>

<style lang="scss">
	.main-title {
		padding: 30rpx 30rpx;
		font-size: 34rpx;
		color: #1C1C1C;
	}

	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}

	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 400rpx;
		z-index: 0;

		&-img {
			width: 100%;
			height: 100%;
		}
	}

	.hover {
		opacity: 0.7;
	}

	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		background-image: url('~@/static/img/pay/nav-bg.png');
		background-size: 100%;
		z-index: 99;

		&-back {
			width: 20rpx;
			height: 40rpx;
		}

		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}

		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}

	.info {
		position: relative;
		padding: 0 15rpx;
		width: 730rpx;
		height: 360rpx;
		z-index: 0;

		.headImg {
			>image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 83rpx;
			}
		}

		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}

		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;

			&-pic {
				width: 83rpx;
				height: 83rpx;
			}
		}

		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}

		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}

		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}

		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}

	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-image: url('~@/static/img/pay/tag.png');
			background-size: 100%;

			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		&-item {
			position: relative;
			padding: 40rpx 0;
			margin-left: 15rpx;
			width: 200rpx;
			height: 230rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;

			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}

			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}

			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;

				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}

			&-des {
				font-size: 22rpx;
				color: #A5A3A2;
			}
		}
	}

	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		border-radius: 50rpx;
		background-image: linear-gradient(#EFCF9E, #E4BF85);

		&-text {
			font-size: 30rpx;
			color: #1C1C1C;
		}
	}

	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}

	.privilege {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;

		&-item {
			margin: 0 23rpx;
			margin-bottom: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-pic {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}

			&-text {
				font-size: 24rpx;
				color: #383738;
			}
		}
	}

	// .level {
	// 	position: relative;
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: center;
	// 	justify-content: center;
	// 	width: 750rpx;
	// 	height: 466rpx;
	// 	background-image: url('~@/static/img/pay/vip-bg.png');
	// 	background-size: 100%;

	// 	&-rate {
	// 		position: absolute;
	// 		top: 43rpx;
	// 		left: 33rpx;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;

	// 		&-text1 {
	// 			margin-right: 20rpx;
	// 			color: #1C1C1C;
	// 			font-size: 34rpx;
	// 		}

	// 		&-text2 {
	// 			font-size: 34rpx;
	// 			color: #C07C07;
	// 		}
	// 	}

	// 	&-info {
	// 		// position: absolute;
	// 		// top: 188rpx;
	// 		// left: 350rpx;
	// 		margin-top: 70rpx;
	// 		display: flex;
	// 		flex-direction: column;
	// 		align-items: center;

	// 		&-icon {
	// 			margin-bottom: 20rpx;
	// 			width: 48rpx;
	// 			height: 38rpx;
	// 		}

	// 		&-text {
	// 			margin-bottom: 20rpx;
	// 			font-size: 26rpx;
	// 			color: #292929;
	// 		}

	// 		&-integral {
	// 			font-size: 40rpx;
	// 			color: #C07C07;
	// 		}
	// 	}

	// 	&-distance {
	// 		position: absolute;
	// 		left: 30rpx;
	// 		right: 30rpx;
	// 		bottom: 35rpx;
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;
	// 		justify-content: space-between;

	// 		&-text {
	// 			font-size: 26rpx;
	// 			color: #292929;
	// 		}

	// 		&-button {
	// 			padding: 0 30rpx;
	// 			height: 60rpx;
	// 		}
	// 	}
	// }
</style>