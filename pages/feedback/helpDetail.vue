<template>
	<view>

		<view class="helpTitle">{{ resultData.title }}</view>
		<view class="helpCon">{{ resultData.content }}</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				resultData: {
					title: '',
					content: ''
				}
			};
		},
		onLoad(options) {
			this.resultData.title = options.title;
			this.resultData.content = options.content
			uni.setNavigationBarTitle({
				title: options.title
			});
		},
		methods: {}
	};
</script>

<style>
	page {
		background-color: #ffffff;
	}

	.helpTitle {
		font-size: 40rpx;
		font-weight: bold;
		margin: 50rpx 30rpx 30rpx;
		color: #303133;
	}

	.helpCon {
		font-size: 30rpx;
		margin: 30rpx 30rpx 50rpx;
		color: #303133;
		line-height: 2em;
	}
</style>
