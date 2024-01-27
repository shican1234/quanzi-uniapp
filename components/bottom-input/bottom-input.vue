<template>
	<!-- 底部输入框 -->
	<view class="bottom-handle">
		<u-input v-model="content" class="ml-20" type="text" placeholder="请来一个友善的问候吧(^_^)" confirmType="send"
			@confirm="submit"></u-input>
		<view class="send-btn iconfont icondizhitiao text-40 animate__animated"
			hover-class="text-gray-400 animate__heartBeat" @click="submit"></view>
	</view>
</template>

<script>
	/*
	 * BottomInpu 底部输入框
	 * @description 用于输入文字信息，如：回复消息，发送消息等
	 * @author MrThinco
	 */
	export default {
		data() {
			return {
				content: ''
			}
		},
		methods: {
			// 发送
			submit() {
				// 消息不能为空
				if (this.content === '') return uni.showToast({
					title: '消息不能为空',
					icon: 'none'
				})
				// 发送事件
				this.$emit('submit', this.content)
				// 清空输入框
				this.content = ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-handle {
		border-top: 2rpx solid $uni-border-color1;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 85rpx;
		background-color: #fff;
		display: flex;
		align-items: center;

		.send-btn {
			width: 80rpx;
			text-align: center;
		}
	}
</style>
