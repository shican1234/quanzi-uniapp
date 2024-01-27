<template>
	<!-- 新鲜事/话题列表 -->
	<view class="item">
		<view class="topic-list flex" v-for="(item, index) in list" :key="index" @click="goToCircle(item.id)">
			<image :src="item.circleSculpture" lazy-load></image>
			<view class="my-20 flex-1">
				<view class="text-black text-32">{{item.circleName}}</view>
				<view class="text-gray-400 text-26 my-10">{{item.circleIntroduce}}</view>
				<view class="text-gray-400 text-24 my-10 flex w-full">
					<view class="w-1-2 text-left">内容：{{item.postCount}}</view>
					<view class="w-1-2 text-left">圈友：{{item.peopleCount}}</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="loadStatus" color="#9CA3AF" @loadmore="loadMore">
		</u-loadmore>
	</view>
</template>

<script>
	import {
			myCirList
		} from '@/utils/lib/api.js'; //引入需要的api
	/*
	 * newsTopicList 新鲜事页话题列表
	 * @description 用于新鲜事页中话题栏下面的话题列表
	 * @author MrThinco
	 * @property {Object} item 信息
	 */
	export default {
		data() {
			return {
				pageOk: true,
				page: 0,
				loadStatus: 'loadmore',
				list: [
				
				],
			}
		},
		onLoad() {
			this.queryMyCircle();
		},
		methods: {
			onReachBottom() {
				if (this.pageOk) {
					this.queryMyCircle()
				}
			},
			queryMyCircle() {
				this.loadStatus = 'loading';
				//查询圈子列表
				myCirList({
					"page": this.page
				}).then(data => {
					this.list = this.list.concat(data)
					if (data.length >= 10) {
						this.page = this.page + 1;
						this.loadStatus = 'loadmore';
					} else {
						this.pageOk = false
						this.loadStatus = 'nomore';
					}


				});
			},
			goToCircle(id) {
				this.$u.route('/pages/circle/circle', {
					id: id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item{
		padding: 20rpx;
	}
	.topic-list {
		image {
			width: 154px;
			height: 86px;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
</style>
