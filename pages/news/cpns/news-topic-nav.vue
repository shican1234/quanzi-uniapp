<template>
	<view class="hot-nav">
		<view class="flex justify-between column-one">
			<view class="">热门博主</view>
			<view class="flex justify-between items-center" @click="goTopicNav()">
				更多<view class="iconfont iconqianjin"></view>
			</view>
		</view>
		<scroll-view scroll-x style="width: 100%">
		<view class="flex column-two">
			<view v-for="(item,index) in list" :key="index" @click="userInfo(item.id)">
				<view class="quanzi">
					<view class="avatar">
						<image :src="item.avatar" style="width: 100rpx;height: 100rpx;"></image> 
					</view>
					<view class="text-black text-22">
						{{item.nickName}}
					</view>
					<view class="fans">
						{{item.fansCount}}粉丝 / {{item.postCount}}帖子
					</view>
				</view>
			</view>
		</view>
		</scroll-view>
	</view>
</template>

<script>
	/*
	 * newsTopicNav 新鲜事页话题导航
	 * @description 用于首页图文列表信息
	 * @author MrThinco
	 * @property {Array} list 列表信息
	 */
	export default {
		props:{
			list: Array
		},
		data() {
			return {
				
			};
		},
		methods: {
			userInfo(userId){
				this.$u.route('pages/mine/userInfo', {
					id: userId
				})
			},
			goTopicNav(){
				this.$u.route('pages/news/hotBlogger')
			}
		}
	}
</script>

<style lang="scss" scoped>
.hot-nav {
	border-top: 1rpx solid #EEEEEE;
	border-bottom: 1rpx solid #EEEEEE;
	padding: 20rpx;
	.column-one {
		margin-bottom: 20rpx;
		& > view:last-child {
			color: #9b9b9b;
		}
		& > view:first-child {
			font-size: 32rpx;
		}
	}
	.column-two > view {
		text-align: center;
		flex: 1;
		height: 120px;
		background: #f9f9f9;
		color: #9b9b9b;
		border-radius: 10rpx;
		margin: 0 10rpx;
	}
}
.quanzi{
	display: flex;
	margin: 10rpx 10rpx;
	width: 80px;
	flex-direction: column;
}
.avatar{
	image{
		border-radius: 15px;
	}
}

.fans{
	font-size: 10px;
}
</style>
