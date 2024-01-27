<template>
	<view class="u-wrap">
		<!-- <view class="u-search-box" @click="toSearch"><u-search placeholder="请输入名称搜索圈子" v-model="keyword" @search="search" :show-action="false"></u-search></view> -->
		<view class="u-search-box" @click="toSearch">
			<button>
				<u-search placeholder="请输入名称搜索圈子" v-model="keyword" @search="search" :show-action="false"></u-search>
			</button>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view
					v-for="(item, index) in classList"
					:key="index"
					class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']"
					:data-current="index"
					@tap.stop="swichMenu(index)"
				>
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>
			<scroll-view scroll-y class="right-box" @scrolltolower="reachBottom">
				<view class="page-view">
					<block v-for="(item, index) in circleList" :key="index">
						<view class="topic-item" @click="goToCircle(item.id)">
							<u-image width="100rpx" height="100rpx" shape="circle" :src="item.circleSculpture"></u-image>
							<view class="right">
								<view>{{ item.circleName }}</view>
								<view class="desc">{{ item.circleIntroduce.substring(0, 10) }}</view>
								<view class="num">
									<text>{{ item.peopleCount }}人已加入</text>
									<text>{{ item.postCount }}篇内容</text>
								</view>
							</view>
						</view>
					</block>
					<!-- 加载状态 -->
					<block v-if="loadStatus != 'none'">
						<block v-if="circleList.length > 0">
							<view style="margin: 30rpx;">
								<u-loadmore :status="loadStatus" />
							</view>
						</block>
						<block v-else>
							<u-empty margin-top="100" text="暂无相关圈子" mode="favor"></u-empty>
						</block>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import {queryCircleClass,queryCircleByClass,isJoinCircle} from '@/utils/lib/api.js';  //引入需要的api
export default {
	data() {
		return {
			scrollTop: 0, //tab标题的滚动条位置
			current: 0, // 预设当前项的值
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度
			classList: [
				{
					name: '全部',
					createTime:'',
					sorts:'',
					id: '-1'
				},
				{
					name: '热门',
					createTime:'',
					sorts:'',
					id: '0'
				}
			],
			cid: -1,
			pageOk: true,
			circleList: [],
			loadStatus: 'loadmore',
			keyword: '',
			page: 0
		};
	},
	onLoad(options) {
		this.getCircleClass()
		this.queryCircle(this.curryId);
	},
	methods: {
		getCircleClass(){
			queryCircleClass().then(data => {
				this.classList = this.classList.concat(data)
			});
		},
		toSearch() {
			this.$u.route('/pages/home/search', {
				type: 'info'
			})
		},
		reachBottom() {
			if(this.pageOk){
				this.queryCircle()
			}
		},
		search() {
			uni.navigateTo({
				url: '/pages/topic/list?keyword=' + this.keyword
			});
		},
		goToCircle(id){
			isJoinCircle({"id":id}).then(data => {
				if(data){ // 在圈内
					this.$u.route('/pages/circle/circle', {
						id: id
					})
				}else{ //不在
					this.$u.route('/pages/circle/join-info', {
						id: id
					})
				}
			});
		},
		queryCircle() {
			this.loadStatus = 'loading';
			//查询圈子列表
			queryCircleByClass({"cid":this.cid,"page":this.page}).then(data => {
			
				this.circleList = this.circleList.concat(data)
				if(data.length >=10){
					this.page = this.page + 1;
					this.loadStatus = 'loadmore';
				}else{
					this.pageOk = false
					this.loadStatus = 'nomore';
				}
				
				
			});
		},
		// 点击左边的栏目切换
		async swichMenu(index) {
			if (index == this.current) return;
			this.current = index;
			// 如果为0，意味着尚未初始化
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			// 将菜单菜单活动item垂直居中
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;

			this.cid = this.classList[index].id;
			this.circleList = [];
			this.page = 0;
			this.pageOk = true;
			this.queryCircle();
		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('.' + elClass)
					.fields(
						{
							size: true
						},
						res => {
							// 如果节点尚未生成，res值为null，循环调用执行
							if (!res) {
								setTimeout(() => {
									this.getElRect(elClass);
								}, 10);
								return;
							}
							this[dataVal] = res.height;
						}
					)
					.exec();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.u-wrap {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	/* #ifdef APP-PLUS */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}

.u-search-box {
	padding: 20rpx 30rpx;
}

.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}

.u-tab-view {
	width: 200rpx;
	height: 100%;
	border-right: 1px solid #F5F5F5;
	padding-left: 20rpx;
}

.u-tab-item {
	height: 110rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	color: #95acff;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.u-tab-item-active::before {
	content: "";
	position: absolute;
	border-left: 4px solid #95acff;
	height: 32rpx;
	left: 0;
	top: 39rpx;
}

.u-tab-view {
	height: 100%;
}
.page-view {
	padding: 16rpx;
}

button{
	margin: 0;
	padding: 0;
	outline: none;
	border-radius: 0;
	background-color: transparent;
	line-height: inherit;
}
button::after{
	border: none;
}
// 圈子列表
.topic-item {
	display: flex;
	background-color: #fff;
	padding: 20rpx;
	
	.right{
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		.desc{
			font-size: 22rpx;
			color: #999;
			margin: 10rpx 0;
		}
	}
	.num {
		display: flex;	
		margin-top: auto;
	}
	
	image {
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}
	
	.btn-gz {
		margin-left: auto;
		margin-right: 20rpx;
	}
	
	text {
		font-size: 10px;
		color: #999;
		margin: 0 10rpx;
	}
}
</style>
