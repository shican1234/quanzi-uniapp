<template>
	<view class="homepage">
		<!-- #ifndef MP-WEIXIN -->
		<view class="bar">
			<u-navbar :placeholder="true" bgColor="#FFFFFF">
				<view slot="left"></view>
				<view slot="right" class="right">
					<view @click="goEdit('/pages/mine/edit-info')">
						<image src="../../static/image/travel/personal/edit.png"></image>
					</view>
					<view @click="goEdit('/pages/mine/set')">
						<image src="../../static/image/travel/personal/set.png"></image>
					</view>
				</view>
			</u-navbar>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="bar">
			<u-navbar :placeholder="true" bgColor="#FFFFFF">
				<view slot="left" class="right">
					<view @click="goEdit('/pages/mine/edit-info')">
						<image src="../../static/image/travel/personal/edit.png"></image>
					</view>
					<view @click="goEdit('/pages/mine/set')">
						<image src="../../static/image/travel/personal/set.png"></image>
					</view>
				</view>
				<view slot="right">

				</view>
			</u-navbar>
		</view>
		<!-- #endif -->
		<view class="people">
			<view class="headImg">
				<!-- 用户头像 -->
				<image :src="userInfo.avatar"></image>
			</view>
			<view class="info">
				<view class="nick">
					<!-- 昵称 -->
					<text>{{userInfo.nickName}}</text>
					<view class="sex">
						<u-icon v-if="userInfo.gender == 0" name="man" color="#1E90FF" size="24"></u-icon>
						<u-icon v-if="userInfo.gender == 1" name="man" color="#FF6EB4" size="24"></u-icon>
						<u-icon v-if="userInfo.gender == 2" name="man" color="#8B8989" size="24"></u-icon>
					</view>
				</view>
				<view class="grade">
					<!-- <view>
						<image src="../../static/image/travel/personal/shield.png">
							<text>0</text>
					</view> -->

					<!-- VIP -->
					<view>
						<image v-if="userInfo.vipType == 2" src="../../static/image/travel/personal/vip.png"></image>
						<image v-if="userInfo.vipType == 1" src="../../static/image/travel/personal/vip04.png"></image>
					</view>


				</view>

				<view class="userId">
					<image src="../../static/image/travel/personal/id.png"></image>
					<!-- 用户ID -->
					<view class="number">
						<text>{{userInfo.id}}</text>
					</view>
				</view>
			</view>
			<view class="space" @click="clickUser(userInfo.id)">
				<text>空间</text>
				<u-icon name="arrow-right" color="#000000" size="20"></u-icon>
			</view>
		</view>
		<view class="list">
			<view class="item" @click="goToInfo('/pages/userList/userList',2)">
				<view class="text">
					<text>{{detailsNumber[0]}}</text>
					<text>关注</text>
				</view>
				<u-line direction="col" color="#979797 " length="32rpx"></u-line>
			</view>
			<view class="item" @click="goToInfo('/pages/userList/userList',1)">
				<view class="text">
					<text>{{detailsNumber[4]}}</text>
					<text>粉丝</text>
				</view>
				<u-line direction="col" color="#979797 " length="32rpx"></u-line>
			</view>
			<view class="item" @click="goToInfo('/pages/circle/myCircle')">
				<view class="text">
					<text>{{detailsNumber[1]}}</text>
					<text>圈子</text>
				</view>
				<u-line direction="col" color="#979797 " length="32rpx"></u-line>
			</view>
			<view class="item" @click="goToInfo('/pages/post/postList',0)">
				<view class="text">
					<text>{{detailsNumber[2]}}</text>
					<text>帖子</text>
				</view>
				<u-line direction="col" color="#979797 " length="32rpx"></u-line>
			</view>
		</view>
		<view class="infos">

			<!-- 判断当前用户是否为VIP  对应显示内容 -->
			<view v-if="userInfo.vipType == 2" class="open-vip" @click="goToInfo('/pages/order/payVip')">
				<image src="../../static/image/travel/personal/vip.png"></image>
				<text class="text">未开通 至尊会员，尊享体验！</text>
				<text class="button">开通会员</text>
			</view>
			<view v-if="userInfo.vipType == 1" class="open-vip" @click="goToInfo('/pages/order/payVip')">
				<image src="../../static/image/travel/personal/vip01.png"></image>
				<text class="text">已开通 至尊会员，尊享体验！</text>
				<text class="button">续时会员</text>
			</view>



			<view class="tool">
				<view @click="goToInfo('/pages/order/paySpecies')">
					<image src="../../static/image/travel/personal/house.png"></image>
					<text style="text-align: center">充值</text>
				</view>
				<view @click="goToInfo('/pages/order/tx-info')">
					<image src="../../static/image/travel/personal/money.png"></image>
					<text style="text-align: center">提现</text>
				</view>
				<view @click="goToInfo('/pages/circle/add')">
					<image src="../../static/image/travel/personal/member.png"></image>
					<text>创建圈子</text>
				</view>
				<view @click="goToInfo('/pages/circle/list')">
					<image src="../../static/image/travel/personal/shop.png"></image>
					<text>所有圈子</text>
				</view>

			</view>
			<view class="set">
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic06.png"></image>
					<text @click="inputDialogToggle">卡密兑换</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<view @click="goToInfo('/pages/capitalflow/flowdirectory')">
					<image class="icon" src="../../static/image/travel/personal/pic03.png"></image>
					<text>资金流水</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<view @click="goToInfo('/pages/feedback/feedbackIndex')">
					<image class="icon" src="../../static/image/travel/personal/pic05.png"></image>
					<text>留言反馈</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<view @click="goToInfo('/pages/post/postList',1)">
					<image class="icon" src="../../static/image/travel/personal/pic04.png"></image>
					<text>点赞帖子</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>

				<view @click="goToInfo('/pages/mine/onlineservice')">
					<image class="icon" src="../../static/image/travel/personal/pic07.png"></image>
					<text>在线客服</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<!-- #ifdef H5 -->
				<view @click="downloadApp()">
					<image class="icon" src="../../static/image/travel/personal/dow.png"></image>
					<text>下载APP</text>
					<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<!-- #endif -->
			</view>
			<!-- <view class="service">
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic02.png"></image>
						<text>兑换奖励</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
				<view>
					<image class="icon" src="../../static/image/travel/personal/pic07.png"></image>
						<text>在线客服</text>
						<image class="right" src="../../static/image/travel/personal/Clipped.png"></image>
				</view>
			</view> -->

			<!-- 输入弹框 -->
			<view>
				<uni-popup ref="inputDialog" type="dialog">
					<uni-popup-dialog ref="inputClose" mode="input" title="卡密兑换" value="" placeholder="请输入您获取得卡密"
						@confirm="dialogInputConfirm">
					</uni-popup-dialog>
				</uni-popup>
			</view>

		</view>
		<tabbar :current="3"></tabbar>
	</view>
</template>

<script>
	import {
		getUserById,
		getDetailsNumber,
		getConfig,
		cardExchange
	} from '@/utils/lib/api.js'; //引入需要的api
	import tabbar from "@/components/tabbar/tabbar.vue"
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				value: 1,
				value1: 0,
				userInfo: {},
				detailsNumber: []
			}
		},
		created() {},
		onLoad() {
			this.getUserPost()
			this.getDetails()
		},
		methods: {
			// 点击用户信息
			clickUser(userId) {
				// this.$emit('clickUser');   跳转用户个人中心 
				this.$u.route('pages/mine/userInfo', {
					id: userId
				})

			},
			goEdit(url) {
				this.$u.route(url, {
					userId: this.userInfo.id
				})
			},
			// 用户信息
			getUserPost() {
				getUserById().then(data => {

					this.userInfo = data;
					uni.setStorageSync('user', data);

				});
			},
			goToInfo(url, value) {
				this.$u.route(url, {
					type: value
				})
			},
			// 关注,粉丝等数据
			getDetails() {
				getDetailsNumber().then(data => {

					this.detailsNumber = data;

					console.log(this.detailsNumber)

				});
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogInputConfirm(val) {

				cardExchange({
					"camiCode": val
				}).then(data => {
					uni.showLoading({
						title: '兑换中,请稍后!'
					})
					setTimeout(() => {
						uni.hideLoading()
						console.log(val)
						this.value = val
						// 关闭窗口后，恢复默认内容
						this.$refs.inputDialog.close()
						location.reload();
					}, 3000)

				});

			},
			//下载APP
			downloadApp(){
				getConfig().then(data => {
					switch(uni.getSystemInfoSync().platform){
					
					    case 'android':
					
					       if(data.appAndroidUrl){
							   window.location.href = data.appAndroidUrl
						   }else{
							   uni.showToast({
							       icon: 'none',   
							       duration: 3000,
							       title: '暂未配置安卓客户端下载地址!'
							   });
						   }
					
					       break;
					
					    case 'ios':
					
					       if(data.appIosUrl){
					       	 window.location.href = data.appIosUrl
					       }else{
							   uni.showToast({
								   icon: 'none',   
								   duration: 3000,
								   title: '暂未配置IOS客户端下载地址!'
							   });
					       }
					
					       break;
					
					    default:
					
					       console.log('运行在开发者工具上')
					
					       break;
					
					}
				
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.homepage {
		width: 100%;
		height: 1624rpx;
		// background: linear-gradient(1deg, rgba(247, 240, 255, 0.1900) 0%, rgba(229, 232, 255, 0.2000) 68%, rgba(231, 228, 255, 0.6600) 100%);

		& text {
			color: #333333;
			font-family: PingFangSC-Semibold, PingFang SC;
		}

		.bar {
			.right {
				display: flex;

				& view {
					width: 52rpx;
					height: 52rpx;
					margin-left: 26rpx;
					border-radius: 26rpx;
					background: #F0EEFF;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0rpx -2rpx 2rpx 4rpx rgba(255, 255, 255, 0.5000), 0rpx 4rpx 4rpx 0rpx rgba(197, 183, 211, 0.5000), inset 0rpx 2rpx 6rpx 0rpx rgba(255, 255, 255, 0.5000);

					>image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
		}

		.people {
			padding: 0 42rpx 28rpx 32rpx;
			display: flex;
			align-items: center;

			.headImg {
				>image {
					width: 166rpx;
					height: 166rpx;
					border-radius: 83rpx;
				}
			}

			.info {
				flex: 1;

				.nick {
					display: flex;

					>text {
						font-size: 36rpx;
						font-weight: 600;
						line-height: 50rpx;
					}

					.sex {
						width: 24rpx;
						height: 24rpx;
						border-radius: 12rpx;
						background: #61C9FD;
					}
				}

				.grade {
					display: flex;
					align-items: center;

					>view {
						display: flex;
						align-items: center;
						margin-right: 12rpx;

						& text {
							font-size: 20rpx;
							font-weight: 600;
							color: #FFFFFF;
							line-height: 28rpx;
							text-shadow: 0rpx 2rpx 4rpx rgba(0, 0, 0, 0.5000);
						}

						& image {
							width: 28rpx;
							height: 30rpx;
						}

						&:last-child {
							>image {
								width: 40rpx;
								height: 40rpx;
							}

							>text {
								margin-left: -6rpx;
							}
						}
					}
				}

				.userId {
					width: 220rpx;
					display: flex;
					background: #F5F5FF;
					border-radius: 8rpx;
					box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.1400), 0rpx -4rpx 6rpx 0rpx #FFFFFF;

					>image {
						width: 36rpx;
						height: 40rpx;
					}

					.number {
						flex: 1;
						display: flex;
						justify-content: center;

						>text {
							font-size: 24rpx;
							font-weight: 600;
							line-height: 40rpx;

							&:last-child {
								font-weight: 500;
								font-size: 22rpx;
								margin-left: 8rpx;
							}
						}
					}
				}
			}

			.space {
				display: flex;
				align-items: center;

				>text {
					font-size: 28rpx;
					line-height: 40rpx;
				}
			}
		}

		.list {
			width: 100%;
			display: flex;
			padding: 0 44rpx;
			box-sizing: border-box;

			.item {
				width: 25%;
				display: flex;
				justify-content: space-evenly;
				align-items: center;

				.text {
					display: flex;
					flex-direction: column;
					align-items: center;

					>text:first-child {
						font-size: 36rpx;
						font-family: CloudHeiChaoGBK;
						line-height: 48rpx;
						font-weight: 600;
					}

					>text:last-child {
						font-size: 24rpx;
						color: #999999;
						line-height: 34rpx;
					}
				}
			}
		}

		.infos {
			padding: 0 40rpx;

			.open-vip {
				width: 100%;
				height: 72rpx;
				background: linear-gradient(180deg, #F7E5B4 0%, #FFE6AF 2%, #EBC075 100%);
				border-radius: 49rpx;
				display: flex;
				align-items: center;
				margin-top: 36rpx;
				padding: 0 24rpx 0 34rpx;
				box-sizing: border-box;

				>image {
					width: 48rpx;
					height: 48rpx;
				}

				.text {
					flex: 1;
					font-size: 24rpx;
					line-height: 34rpx;
					margin-left: 14rpx;
				}

				.button {
					width: 128rpx;
					height: 42rpx;
					background: linear-gradient(90deg, #4D4D4D 0%, #151515 100%);
					border-radius: 22rpx;
					font-size: 22rpx;
					color: #FFDFA9;
					line-height: 42rpx;
					text-align: center;
				}
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

			.set {
				width: 100%;
				padding: 34rpx 24rpx 44rpx 34rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				box-sizing: border-box;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					& text {
						flex: 1;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			.service {
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 28rpx 0rpx rgba(142, 146, 230, 0.2700);
				border-radius: 28rpx;
				margin-top: 26rpx;
				padding: 34rpx 24rpx 44rpx 34rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				>view {
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;

					& text {
						flex: 1;
						font-size: 28rpx;
						line-height: 40rpx;
						margin-left: 30rpx;
					}

					.icon {
						width: 36rpx;
						height: 36rpx;
					}

					.right {
						width: 40rpx;
						height: 40rpx;
					}

				}
			}
		}

	}
</style>