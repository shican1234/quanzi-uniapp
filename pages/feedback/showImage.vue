<template>
	<view @click="back">
		<swiper class="swiper-img" :current="currentImg" :duration="300" @change="changeSwiper">
			<swiper-item class="swiper-item" v-for="(item, index) in imgs" :key="index">
				<view class="img-page">
					<movable-area scale-area>
						<movable-view direction="all" scale="true" scale-min="1" scale-max="4">
							<image :src="item.url" mode="widthFix" :lazy-load="true" />
						</movable-view>
					</movable-area>
				</view>
			</swiper-item>
		</swiper>
		<view class="item-bottom">
			<view class="small-list-page">
				<view class="small-list" v-if="imgs.length > 1">
					<view class="img-page" :class="currentImg == index ? 'img-page-checked' : ''"
						v-for="(item, index) in imgs" :key="index" @click.stop="toImg(index)">
						<image class="img" border-radius="10rpx" :src="item.url" mode="aspectFill" />
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs: [],
				currentImg: 0,
			};
		},
		onLoad(options) {
			let {
				imgs,
				current
			} = options;
			this.imgs = JSON.parse(imgs);
			this.currentImg = current;
		},
		methods: {
			changeSwiper(e) {
				this.currentImg = e.detail.current;
			},
			toImg(index) {
				this.currentImg = index;
			},
			back() {
				if (this.isPop) {
					this.isPop = false
					return
				}
				try {
					this.$Router.back(1);
				} catch (e) {
					uni.navigateBack();
				}
			},

		},
	};
</script>

<style lang="scss" scoped>
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	movable-area {
		height: 100%;
		width: 100%;
		position: fixed;
		overflow: hidden;
	}

	movable-view image {
		width: 100%;
	}

	uni-image>img {
		z-index: -1 !important;
	}

	.content {
		height: 60vh;
	}

	.swiper-img {
		width: 100vw;
		height: 100vh;
		background-color: #000000;

		&>.swiper-item {
			width: 100vw;
			height: 100vh;

			.img-page {
				height: 100vh;
				display: flex;
				align-items: center;
			}
		}
	}

	.item-bottom {
		width: 100vw;
		position: fixed;
		z-index: 9999;
		bottom: 0;
		left: 0rpx;
		padding: 30rpx;
		transition: ease-in-out 0.3s;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.small-list-page {
		min-height: 60rpx;
	}

	.small-list {
		display: flex;
		justify-content: center;
		align-items: center;

		.img-page {
			display: inline-block;
			margin-right: 20rpx;
			border: 2rpx solid #c2c2c2;
			transition: ease-in 0.1s;
			border-radius: 11rpx;
			background: #c2c2c2;
			overflow: hidden;

			&:last-child {
				margin-right: 0;
			}

			.img {
				width: 46rpx;
				height: 46rpx;
				display: block;
			}
		}

		.img-page-checked {
			transform: scale(1.2);
			border: 4rpx solid #c2c2c2;
		}
	}

	.pop {
		width: 500rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999999;

		.item {
			line-height: 100rpx;
			height: 100rpx;
			padding: 0 50rpx;
			transition: all .2s;
			border-radius: 20rpx;

			&:active {
				background-color: #eeeeee;
			}
		}
	}
</style>
