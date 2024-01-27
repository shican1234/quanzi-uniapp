<template>
	<!-- 我的/设置/关于社区 -->
	<view class="about">
		<!-- logo & version -->
		<view class="flex flex-col items-center">
			<image class="logo-img" src="/static/img/header/c.svg" mode="aspectFit"></image>
			<view class="text-gray-400">
				Version&nbsp;{{version}}
			</view>
		</view>
		<!-- 其他操作 -->
		<u-cell-group :border='false'>
			<u-cell v-for="(item,index) in setList" :key="index" :title="item.name" isLink size="large" :border='false'
				@click="goPage(item.url)">
			</u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				version:'2.0.1',
				setList: [
					{
						name: '用户协议',
						url: '/pages/rule/user_agreement'
					},
					{
						name: '隐私政策',
						url: '/pages/rule/user_privacy_policy'
					}
				]
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
	.about{
		.logo-img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 100%;
			margin-top: 60rpx;
			margin-bottom: 30rpx;
		}
	}
</style>