<template>
	<!-- 新鲜事页/话题详情 -->
	<view class="news-topic-detail bg-white">
		<!-- 模糊背景 -->
		<view class="topic-bg">
			<image :src="info.circleBackground" mode="aspectFill"></image>
		</view>
		<!-- 话题信息 -->
		<view class="topic-info px-20">
			<view class="">
				<image class="topic-info-image border" :src="info.circleSculpture" mode="aspectFill"></image>
				<view class="topic-info-title text-36">{{info.circleName}}</view>
				<view class="topic-info-title text-25" @click="copyID(info.id)">
					<text>圈子ID:  </text>
					<text class="cid">{{info.id}}</text>
				</view>
			</view>
			<view class="flex items-center text-gray-500 pt-50 sum">
				<view class="mr-20">加入人数: {{info.peopleCount}}</view>
				<view class="mr-20">发帖总数: {{info.postCount}}</view>
			</view>
			<u-gap :customStyle="{margin:'0 -20rpx'}" height="10" bgColor="#F3F4F6"></u-gap>
		</view>
		<!-- 置顶列表 -->
		<view class="mb-20" v-if="this.topList.length > 0">
			<view class="flex items-center px-20 py-20 border-b" v-for="(item,index) in topList" :key="index" @click="clickDynamic(item.id)">
				<image src="../../static/img/top.png" style="width: 20px;height: 20px;"></image>
				<text class="text-30 line-1">【{{item.title}}】{{item.content}}</text>
			</view>
		</view>
		<!-- 标签切换 -->
		<u-sticky bgColor="#fff" :offsetTop="offsetTop">
			<view class="nav-center">
				<u-tabs :list="tabList" :current='tabIndex' @click="changeTab($event)"></u-tabs>
			</view>
		</u-sticky>
		<hover-menu :role="circleUser.type" :circleId="info.id" :circleName="info.circleName"></hover-menu>
		<!-- 资讯列表 -->
		<template v-if="postList.length > 0">
			<qizai9527-dynamic v-for="(item,index) in postList" :key="item.id" 
				:imgList="JSON.parse(item.fileUrls)"
				:tid="item.id" 
				:avatar="item.avatar"
				:essence="item.essence"
				:essenceShow="true"
				:name="item.nickName"
				:payType="item.payType"
				:vipDate="item.vipDate"
				:payOk="item.payOk"
				:postClass="item.postClass"
				:redPkgOver="item.redPkgOver"
				:isDetail="false"
				:image="item.image"
				:voteContent="item.voteContent"
				:voteTime="item.voteTime"
				:ipLocate = "item.ipLocate"
				:discussId = "item.discussId"
				:circleName="item.circleName"
				:circleId="item.circleId"
				:payPrice="item.payPrice"
				:postRole="item.postRole"
				:isCircle = "true"
				:publishTime="item.createTime"
				:content="item.content"
				:isLike="item.isDz == 0 ? false : true"
				:fileType="item.fileType"
				:topping="item.topping"
				:userId="item.userId"
				:isGiveReward="item.isGiveReward"
				:likeNumber="parseInt(item.dzCount)"
				:giveRewardNumber="item.giveRewardNumber"
				:chatNumber="item.chatNumber"
				:role="circleUser.type"
				:showFocus="false"
				:index = "index"
				:sourceShow="true"
				:sendMsg="false"
				:plShow="true">
			</qizai9527-dynamic>
		</template>
		<!-- 空数据 -->
		<u-empty v-if="postList.length === 0" text="本来无一物,何处惹尘埃" icon="/static/img/demo/spring.svg" textSize="16"
			marginTop='25%' mode="list" height="700"></u-empty>
		<!-- 加载更多 -->
		<u-loadmore v-if="postList.length > 0" :status="loadStatus" color="#9CA3AF" @loadmore="loadMore">
		</u-loadmore>
	</view>
</template>

<script>
	import {
		newsList
	} from '@/utils/data/data.js'
	import {queryCircleById,queryCirclePost,circleTopPost,getRoleInCircleByUser} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				topList: [
				],
				postList: [],
				info: {},
				triggered: false,
				circleUser: {},
				// 导航标签
				tabIndex: 0,
				tabList: [{
						name: "最新",
						type: '0'
					},
					
					{
						name: "圈主帖",
						type: '2'
					},
					{
						name: "图片",
						type: '3'
					},
					{
						name: "视频",
						type: '4'
					}
				],
				list1: [],
				list2: [],
				// 上拉加载
				loadStatus: 'loadmore',
				page: 0,
				pageOk: true
			}
		},
		computed: {
		},
		// 触底事件
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.page = 0;
			this.pageOk = true;
			this.loadStatus = 'loadmore';
			this.queryPost();
			uni.stopPullDownRefresh();
		},
		onLoad(e) {
			this.info.id = e.id
			this.getMyRole();
			this.queryCircleInfo()
			this.queryPost();
			this.queryTopPost();
			
			// 设置offsetTop
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// #ifdef APP-PLUS
					this.offsetTop = res.statusBarHeight + 44
					// #endif
					// #ifdef H5
					this.offsetTop = 0
					// #endif
				}
			})
			let _this = this
			uni.$on('updataCircle',function(data){
			   _this.queryCircleInfo()
			})
			uni.$on('delPost',function(data){
			 _this.postList.splice(data,1)
			})
			uni.$on('setTop',function(data){
			 _this.queryTopPost();
			})
		},
		onUnload() {
			uni.$off('updataCircle')
			uni.$off('setTop')
			uni.$off('delPost')
		},
		methods: {
			// tabbar点击
			changeTab(e) {
				this.tabIndex = e.index
				this.postList = [];
				this.page = 0;
				this.pageOk = true;
				this.queryPost()
			},
			queryCircleInfo(){
				queryCircleById({"id":this.info.id}).then(data => {
					this.info = data
					setTimeout(() => {
						this.triggered = false;
					}, 1000)
				});
			},
			//获取圈内全部帖子
			queryPost(){
				queryCirclePost({"id":this.info.id,"type":this.tabIndex,"page":this.page}).then(data => {
					this.postList = this.postList.concat(data)
					if(data.length >=10){
						this.page = this.page + 1;
						this.loadStatus = 'loadmore';
					}else{
						this.pageOk = false
						this.loadStatus = 'nomore';
					}
				});
			},
			//查询当前登入用户对于该圈子是什么角色
			getMyRole(){
				getRoleInCircleByUser({"id":this.info.id}).then(data => {
					this.circleUser = data
				});
			},
			clickDynamic(tid){
				// 跳转动态详情
				this.$u.route('pages/home/detail', {
					id: tid
				})
			},
			//获取圈内置顶的帖子
			queryTopPost(){
				circleTopPost({"id":this.info.id}).then(data => {
					this.topList = data
				});
			},
			// 加载更多
			loadMore() {
				if(this.pageOk){
					this.queryPost()
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.news-topic-detail {
		.topic-bg {
			width: 100%;
			height: 400rpx;
			position: relative;
			overflow: hidden;

			image {
				width: 100%;
				position: absolute;
			}
		}

		.topic-info {
			position: relative;
			width: 100%;
			.topic-info-image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
				position: absolute;
				top: -75rpx;
			}

			.topic-info-title {
				margin-left: 180rpx;
			}
		}

		.nav-center {
			height: 80rpx;
			width: 100%;
			// text-align: center;
			// display: flex;
			// justify-content: space-evenly;
			// align-items: center;
			background-color: #fff;

			.nav-title {
				height: 80rpx;
				line-height: 80rpx;
				width: 60rpx;
				font-size: 30rpx;
				padding: 0 15rpx;
				font-weight: bold;
				color: $uni-text-color-gray;
			}

			.active {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
					color: $uni-color-green;
				}
			}

		}
	}
	.cid{
		margin-left: 10px;
		color: mediumseagreen;
	}
	.sum {
		margin-bottom: 20px;
	}
</style>
