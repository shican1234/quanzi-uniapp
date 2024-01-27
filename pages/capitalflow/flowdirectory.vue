<template>
	<!-- 我的/资金流水目录页 -->
	<view class="set">
		<u-cell-group :border='false'>
			<u-cell v-for="(item,index) in setList" :key="index" :title="item.name" :value="item.value" isLink
				size="large" :border='false' @click="goPage(item.url)">
			</u-cell>
		</u-cell-group>
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				// 设置列表
				setList: [{
						name: '充值记录',
						url: '/pages/capitalflow/payOrder'
					},
					{
						name: '提现记录',
						url: '/pages/capitalflow/withdrawal'
					},
					{
						name: '流水记录',
						url: '/pages/capitalflow/capitalflow'
					},
					{
						name: '兑换记录',
						url: '/pages/capitalflow/camiExchange'
					}
				],
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
			}
		},
		methods: {
			goPage(url) {
				this.$u.route(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set {}
</style>
