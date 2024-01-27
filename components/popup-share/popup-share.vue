<template>
	<!-- 分享弹窗 -->
	<u-popup class="bottom-share" mode="bottom" :show="showShare" @close="showShare = false" @open="showShare = true">
		<!-- #ifdef APP-PLUS -->
		<view class="text-center py-20 text-32">
			分享到
		</view>
		<view class="flex justify-evenly items-center">
			<template v-for="(item,index) in providerList">
				<view v-if="isShow(item)" :key="index" class="share-item" hover-class="bg-gray-100" @tap="share(item)">
					<image :src="item.img" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
			</template>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP || QUICKAPP-WEBVIEW -->
		<view class="uni-btn-v uni-common-mt">
			<button type="primary" open-type="share">分享</button>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="flex justify-evenly items-center">
			<template>
				<view class="share-item" hover-class="bg-gray-100" @tap="copyUrl()">
					<image src="/static/img/share/copyurl.png" mode="aspectFill"></image>
					<text>复制链接</text>
				</view>
			</template>
		</view>
		<!-- #endif -->
		<view class="share-cancle" @click="showShare = false" hover-class="bg-gray-300">
			取消
		</view>
	</u-popup>
</template>

<script>
	/*
	 * PopupShare 分享弹窗
	 * @description 用于分享到：朋友圈、微信等
	 * @author MrThinco
	 * @property {Boolean} show 分享弹窗显隐性
	 */
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			path: {
				type: String
			},
			shareText: {
				type: String
			},
			config: {
				type: Object
			}
		},
		watch: {
			show(val) {
				this.showShare = val
			},
			showShare(val) {
				// #ifdef H5
				// h5 滚动穿透处理
				if(val) {
					document.body.style.overflow = "hidden"
				}else{
					document.body.style.overflow = "visible"
				}
				// #endif
				this.$emit('update:show', val)
			}
		},
		data() {
			return {
				showShare: false,
				providerList: [],
				shareType: 0, // 1文字 2图片 0图文 5小程序
				title: 'share',
				href: "https://uniapp.dcloud.io",
				image: '',
			}
		},
		computed: {
			// 是否禁用
			isShow() {
				return function(item) {
					// QQ 不支持图文
					if (this.shareType === 0 && item.id === 'qq') {
						return false
					}
					// 小程序仅支持微信好友
					if (this.shareType === 5 && item.name !== '微信好友') {
						return false
					}
					return true
				}
			}
		},
		// 监听微信小程序分享
		onShareAppMessage() {
			return {
				title: name,
				path: this.path,
				imageUrl: this.config.appLogo
			}
		},
		beforeDestroy: function() {
			// this.shareText = 'uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！',
			// this.href = 'https://uniapp.dcloud.io',
			// this.image = '';
		},
		mounted() {
			uni.getProvider({
				service: 'share',
				success: (e) => {
					console.log('success', e);
					let data = []
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									img: '/static/img/share/wx.svg',
									name: '微信好友',
									id: 'weixin',
									sort: 0
								})
								data.push({
									img: '/static/img/share/pyq.svg',
									name: '朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline',
									sort: 1
								})
								break;
							// case 'sinaweibo':
							// 	data.push({
							// 		img: '/static/img/share/wb.svg',
							// 		name: '新浪微博',
							// 		id: 'sinaweibo',
							// 		sort: 2
							// 	})
							// 	break;
							// case 'qq':
							// 	data.push({
							// 		img: '/static/img/share/qq.svg',
							// 		name: 'QQ好友',
							// 		id: 'qq',
							// 		sort: 3
							// 	})
							// 	break;
							default:
								break;
						}
					}
					this.providerList = data.sort((x, y) => {
						return x.sort - y.sort
					})
					console.log('providerList', this.providerList)
				},
				fail: (e) => {
					console.log('获取分享通道失败', e);
					uni.showModal({
						content: '获取分享通道失败',
						showCancel: false
					})
				}
			})
		},
		methods: {
			copyUrl(){
				//获取当前页面
				uni.setClipboardData({
				    data: this.config.appTui+"/#"+this.path,
				    success: function () {
						uni.showToast({
							icon: 'none',   
							duration: 3000,
							title: '复制成功'
						});
				    }
				});
			},
			// 分享
			async share(e) {
				console.log('分享通道:' + e.id + '； 分享类型:' + this.shareType);

				if (!this.shareText && (this.shareType === 1 || this.shareType === 0)) {
					uni.showModal({
						content: '分享内容不能为空',
						showCancel: false
					})
					return;
				}

				if (!this.config.appLogo && (this.shareType === 2 || this.shareType === 0)) {
					uni.showModal({
						content: '分享图片不能为空',
						showCancel: false
					})
					return;
				}

				let shareOPtions = {
					provider: e.id,
					scene: e.type && e.type === 'WXSenceTimeline' ? 'WXSenceTimeline' :
					'WXSceneSession', //WXSceneSession”分享到聊天界面，“WXSenceTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
					type: this.shareType,
					success: (e) => {
						console.log('success', e);
						uni.showModal({
							content: '已分享',
							showCancel: false
						})
					},
					fail: (e) => {
						console.log('fail', e)
						uni.showModal({
							content: e.errMsg,
							showCancel: false
						})
					},
					complete: function() {
						console.log('分享操作结束!')
					}
				}

				switch (this.shareType) {
					case 0:
						shareOPtions.summary =	this.config.shareTitle;
						shareOPtions.imageUrl = this.config.appLogo;
						shareOPtions.title = this.shareText;
						shareOPtions.href = this.config.appTui+"/#"+this.path;
						break;
					case 1://没用到 需要自己改
						shareOPtions.summary = this.shareText;
						break;
					case 2://没用到 需要自己改
						shareOPtions.imageUrl = this.image;
						break;
					case 5://没用到 需要自己改
						shareOPtions.imageUrl = this.image ? this.image :
							'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png'
						shareOPtions.title = '欢迎体验uniapp';
						shareOPtions.miniProgram = {
							id: 'gh_33446d7f7a26',
							path: '/pages/tabBar/component/component',
							webUrl: 'https://uniapp.dcloud.io',
							type: 0
						};
						break;
					default:
						break;
				}

				if (shareOPtions.type === 0 && plus.os.name === 'iOS') { //如果是图文分享，且是ios平台，则压缩图片 
					shareOPtions.imageUrl = await this.compress();
				}
				if (shareOPtions.type === 1 && shareOPtions.provider === 'qq') { //如果是分享文字到qq，则必须加上href和title
					shareOPtions.href = 'https://uniapp.dcloud.io';
					shareOPtions.title = '欢迎体验uniapp';
				}
				uni.share(shareOPtions);
			},
			// 压缩图片 图文分享要求分享图片大小不能超过20Kb
			compress(){
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-share {
		.share-item {
			height: 150rpx;
			width: 100rpx;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			text {
				margin-top: 10rpx;
			}
		}

		.share-cancle {
			text-align: center;
			margin: 20rpx 40rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			font-size: 32rpx;
			border-radius: 50rpx;
			border: 1rpx solid $uni-border-color1;
			background-color: $uni-bg-color-gray;
		}
	}
</style>
