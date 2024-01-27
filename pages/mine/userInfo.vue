<!-- 我的 -->
<template>
	<view>
		<u-navbar title=" " @rightClick="rightClick" :autoBack="true" :bgColor="bgColor"
			:titleStyle="{ color: '#FFF', fontSize: '15px' }">
			<template #left>
				<view class="u-nav-slot">
					<u-icon name="arrow-left" size="17" color="#FFFFFF"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view class="top-bacg">
			<image :src="userinfo.bgImg ? userinfo.bgImg:userinfo.avatar " class="bac-image"></image>
			<!-- <view class="mode"></view> -->
			<view class="content-box">
				<view class="bg-line"></view>
				<view class="avatar-item">
					<u-avatar :src="userinfo.avatar" size="80" shape="circle" class="avatar"></u-avatar>
					<view class="msgAndFlow">
						<button class="right-btn" @click="sendMsg()">私信</button>
						<button @click="handleFollow" class="right-btn">
							<text v-if="userinfo.isFollow">取消关注</text>
							<text v-else>关注</text>
						</button>
					</view>
				</view>
				<view class="name-box">
					<view class="name">{{ userinfo.nickName }}</view>
					<image v-if="userinfo.vipType == 1" src="/static/image/travel/personal/vip04.png" class="vip"></image>
				</view>
				<view class="fans-box">
					<view class="follow text-gray-500">{{ userinfo.follow }} 关注</view>
					<view class="follow text-gray-500">{{ userinfo.fans }} 粉丝</view>
				</view>
				<view class="signature">{{ userinfo.signature }}</view>
			</view>
		</view>
		
		<view class="content">
			<u-tabs class="nav-center" :list="tabList" @click="changeTab"></u-tabs>
			<template v-if="tabIndex === 0">
				<view class="p-30 border-b info">
					<view class="text-30 mb-20">
						基本信息
					</view>
					<view class="text-28 my-10">
						账号ID：<text class="text-gray-500">{{userId}}</text>
					</view>
					<view class="text-28">
						圈龄：<text class="text-gray-500">{{userinfo.circleAge}}</text>
					</view>
				</view>
				<view class="p-30 border-b info">
					<view class="text-30 mb-20">
						个人信息
					</view>
					<view class="text-28 my-10" v-if="userinfo.constellation">
						性别：<text class="text-gray-500" v-if="userinfo.gender == 0">男</text><text class="text-gray-500" v-if="userinfo.gender == 1">女</text><text class="text-gray-500" v-if="userinfo.gender == 2">未知</text>
					</view>
					<view class="text-28 my-10" v-if="userinfo.constellation">
						星座：<text class="text-gray-500">{{userinfo.constellation}}</text>
					</view>
					<view class="text-28 my-10">
						职业：<text class="text-gray-500">{{userinfo.job}}</text>
					</view>
					<view class="text-28 my-10">
						故乡：<text class="text-gray-500">{{userinfo.city}}</text>
					</view>
					<view class="text-28">
						情感：<text class="text-gray-500">{{userinfo.emotion}}</text>
					</view>
					<view class="text-28">
						等级：<text class="text-gray-500">{{userinfo.level}}</text>
					</view>
					<view class="text-28">
						IP属地：<text class="text-gray-500">{{userinfo.ipLocate}}</text>
					</view>
				</view>
				<view class="p-30 info" v-if="createCircleList.length > 0">
					<view class="text-30 mb-20">
						创建的圈子
					</view>
					<view class="item">
						<view class="topic-list flex" v-for="(item, index) in createCircleList" :key="index" @click="goToCircle(item.id)">
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
				</view>
			</template>
			<template v-if="tabIndex === 1">
				<template v-if="postList.length > 0"> 
					<qizai9527-dynamic v-for="(item,index) in postList" :key="item.id"
						:imgList="JSON.parse(item.fileUrls)" :tid="item.id" :avatar="item.avatar"
						:essence="item.essence" :name="item.nickName" :payOk="item.payOk" :payPrice="item.payPrice"
						:payType="item.payType" :isDetail="false" :image="item.image" :essenceShow="false"
						:publishTime="item.createTime" :content="item.content" :isLike="item.isDz == 0 ? false : true"
						:fileType="item.fileType" :userId="item.userId" :postClass="item.postClass"
						:redPkgOver="item.redPkgOver" :isGiveReward="item.isGiveReward" :topping="item.topping"
						:likeNumber="parseInt(item.dzCount)" :giveRewardNumber="item.giveRewardNumber"
						:voteContent="item.voteContent" :voteTime="item.voteTime" :index="index"
						:chatNumber="item.chatNumber" :showFocus="false" :sourceShow="true" :sendMsg="false"
						:plShow="true" :ipLocate = "item.ipLocate" :discussId = "item.discussId" :circleName="item.circleName" :circleId="item.circleId" :vipDate="item.vipDate">
					</qizai9527-dynamic>
					<u-loadmore :status="loadStatus" color="#9CA3AF">
					</u-loadmore>
				</template>
				<!-- 无内容 -->
				<template v-else>
					<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
						mode="list"></u-empty>
				</template>
			</template>
			<template v-if="tabIndex === 2">
				<template v-if="joinCircleList.length > 0">
					<view class="item">
						<view class="topic-list flex" v-for="(item, index) in joinCircleList" :key="index" @click="goToCircle(item.id)">
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
				<!-- 无内容 -->
				<template v-else>
					<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
						mode="list"></u-empty>
				</template>
			</template>
		</view>
	</view>
</template>

<script>
	import {getToUserInfo,follow,getCreatCircleListByUserId,queryJoinCirclelistByUserId,queryPostListByUserId,isJoinCircle,isFriend,addFriend} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				tabIndex: 0,
				userId: '',
				createCircleList: [],
				joinCircleList: [],
				postList: [],	
				userinfo: {},
				show: false,
				friendContent: '',
				page: 0,
				pageOk: true,
				bgColor: 'transparent',
				loadStatus: 'loadmore',
				tabList: [{
						name: "主页",
					},
					{
						name: "帖子"
					},
					{
						name: "加入圈子"
					}
				]
			}
		},
		onLoad(e) {
			this.userId = e.id
			if(this.userId){
				this.getUserPost()
				this.getCreatCircleList()
			}
		},
		onShow() {

		},
		methods: {
			handleJump() {
				uni.navigateTo({
					url: "/pages/personalHomepage/index",
				});
			},
			getCreatCircleList(){
				getCreatCircleListByUserId({"userId":this.userId,"page":this.page}).then(data => {
					if (this.page == 0) {
						this.createCircleList = data
					} else {
						this.createCircleList = this.createCircleList.concat(data)
					}
					if (data.length >= 10) {
						this.page = this.page + 1;
					} else {
						this.pageOk = false
						this.loadStatus = 'nomore'
					}
				});
			},
			getPostListByUserId(){
				queryPostListByUserId({"userId":this.userId,"page":this.page}).then(data => {
					if (this.page == 0) {
						this.postList = data
					} else {
						this.postList = this.postList.concat(data)
					}
					if (data.length >= 10) {
						this.page = this.page + 1;
					} else {
						this.pageOk = false
						this.loadStatus = 'nomore'
					}
				});
			},
			getJoinCirclelistByUserId(){
				queryJoinCirclelistByUserId({"userId":this.userId,"page":this.page}).then(data => {
					if (this.page == 0) {
						this.joinCircleList = data
					} else {
						this.joinCircleList = this.joinCircleList.concat(data)
					}
					if (data.length >= 10) {
						this.page = this.page + 1;
					} else {
						this.pageOk = false
						this.loadStatus = 'nomore'
					}
				});
			},
			onReachBottom(){
				if (this.tabIndex == 0) { 
					if (this.pageOk) {
						this.getCreatCircleList()
					}
				} else if (this.tabIndex == 1) { 
					if (this.pageOk) {
						this.getPostListByUserId()
					}
				} else if (this.tabIndex == 2) { 
					if (this.pageOk) {
						this.getJoinCirclelistByUserId()
					}
				}
			},
			// 用户信息
			getUserPost(){
				getToUserInfo({"toUserId":this.userId}).then(data => {
					this.userinfo = data;
				});
			},
			sendMsg(){
				uni.showToast({
				    icon: 'success',   
				    duration: 1000,
				    title: '暂未开放该功能!'
				});
			},
			
			// tabbar点击
			changeTab(e) {
				this.tabIndex = e.index
				this.loadData()
			},
			loadData(){
				this.page = 0
				this.pageOk = true
				this.loadStatus = 'loadmore'
				if (this.tabIndex == 0) { //查询创建的圈子列表
					this.createCircleList = []
					this.getCreatCircleList()
				} else if (this.tabIndex == 1) { //查询这个人发布的公开帖子列表
					this.postList = []
					this.getPostListByUserId()
				} else if (this.tabIndex == 2) { //查询这个人加入的圈子列表
					this.joinCircleList = []
					this.getJoinCirclelistByUserId()
				}
			},
			rightClick() {
				console.log('rightClick')
			},
			open() {
				console.log('open')
			},
			close() {
				this.show = false;
				console.log('close')
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
			handleFollow() {
				follow({'toUserId':this.userId}).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: this.userinfo.isFollow ? '取消关注成功':'关注成功'
					});
					this.userinfo.isFollow = !this.userinfo.isFollow 
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		// background-color: #260848;
	}

	.top-bacg {
		width: 100%;
		position: relative;
		height: 280px;
		//background: linear-gradient(rgb(219, 219, 238), #260848);
		z-index: 4;
	}

	.content-box {
		width: 100%;
		height: 100%;
		// overflow-y: scroll;
		position: absolute;
		top: 15%;
		left: 0;
	}
	.info {
		margin: 0 10px;
	}
	.bac-image {
		width: 100%;
		height: 100%;
	}

	// .person-box {
	// 	z-index: 5;
	// 	padding: 0 10px;
	// 	margin-top: 22%;
	// }

	.home-page {
		color: #a89cb6;
		font-size: 12px;
	}

	.right-icon {
		margin-top: -8px;
	}

	.name-box {
		display: flex;
		position: absolute;
		display: flex;
		z-index: 6;
		margin-left: 10px;
		left: 0;
		top: 25%;
	}
	.fans-box {
		display: flex;
		position: absolute;
		display: flex;
		z-index: 6;
		margin-left: 10px;
		left: 0;
		top: 55%;
	}
	.signature {
		color: #999999;
		font-size: 14px;
		display: flex;
		position: absolute;
		display: flex;
		z-index: 6;
		margin-left: 10px;
		left: 0;
		top: 65%;
	}
	.name {
		color: #000000;
		font-size: 16px;
		margin-top: 66px;
	}

	.vip {
		width: 15px;
		height: 13px;
		margin-top: 70px;
		margin-left: 5px;
	}

	.popup {
		width: 100%;
		height: 180px;
		background-color: #16002e;
		border-radius: 20px 20px 0 0;
		flex-direction: column;
	}

	.btn {
		width: 80%;
		color: #8b8097;
		border: 1px solid #8b8097;
		background-color: transparent;
		// background-image: url("");
		border-radius: 20px;
		margin-top: 15px;
	}

	.btn:hover {
		background-color: #534761;
	}

	.follow {
		font-size: 14px;
		color: #fff;
		margin-right: 10px !important;
		margin: 8px 0;
	}

	.f-text {
		color: #999999;
		font-size: 12px;
	}

	

	.big-box {
		width: 100%;
		height: 400px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		overflow-y: auto !important;
		border-radius: 10px;
	}

	.ranking-box {
		width: 48%;
		height: 40%;
		background-color: #311a4b;
		border-radius: 10px;
		position: relative;
	}

	.image {
		width: 100%;
		height: 100px;
		border-radius: 15px 15px 0 0;
	}

	.content {
		height: 60%;
		// padding: 0 10px;
		margin-top: 40px;
		margin-bottom: 200px;
		// overflow-y: scroll;
	}

	.works {
		color: #fff;
		font-size: 15px;
	}

	.text-box {
		padding: 0 10px;
	}
	.right-btn {
		text-align: center;
		height: 25px;
		color: #000000;
		border: 1px solid #746a79;
		background-color: transparent;
		line-height: 25px;
		border-radius: 20px;
		font-size: 12px;
		margin-left: 10px;
	}

	.m-btn {
		width: 25%;
		height: 18px;
		background: linear-gradient(227deg, #ff1de1 0%, #6417fb 100%);
		border-radius: 10px;
		position: absolute;
		top: 5px;
		left: 5px;
	}

	.btn-image {
		width: 12px;
		height: 12px;
		margin-left: 3px;
		margin-top: 1px;
	}

	.bg-line {
		background: linear-gradient(0, #ffffff 0%, transparent 100%);
		//background: linear-gradient(0, red 0%, transparent 100%);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 250px;
	}

	.avatar-item {
		position: absolute;
		width: 95%;
		display: flex;
		z-index: 6;
		margin-left: 10px;
		margin-right: 10px;
		justify-content: space-between;
		left: 0;
		top: 20%;
	}

	.msgAndFlow {
		display: flex;
		align-items: center;
	}
	.nav-center {
		height: 80rpx;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: #fff;
		z-index: 8;
	
	}
	.showFriend{
		display: flex;
		flex-direction: column;
	}
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