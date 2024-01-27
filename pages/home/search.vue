<template>
	<!-- 首页/搜索页 -->
	<view class="search wrap-card">
		<!-- 小程序导航栏 -->
		<view style="margin-bottom: 20px;">
			<nx-search :selectList="selectList" class="sn-earch-input-box" button="inside" placeholder="请输入关键字"
				@search="doSearch" @confirm="doSearch" v-model="searchQuery.keyword" />
		</view>
		<template v-if="show">
			<view class="flex items-center">
				<text class="text-30">搜索历史</text>
				<u--text v-if="records.length > 0" prefixIcon="trash" align="right" iconStyle="font-size: 19px"
					text="清空" @click="delRecord('all')"></u--text>
			</view>
			<view class="flex flex-wrap mt-20">
				<view class="mr-20 my-10 p-10 border rounded text-24 text-gray-500 relative"
					v-for="(item,index) in records" :key="index">
					<text>{{item}}</text>
					<u-icon  class="close-tag" name="close-circle" @click="delRecord('single',index)">
					</u-icon>
				</view>
			</view>
		</template>
		<!-- 圈子列表 -->
		<template v-if="searchQuery.selectIndex  === 0 ">
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
			</view>
		</template>
		<!-- 帖子列表 -->
		<template v-else-if="searchQuery.selectIndex  === 1">
			<qizai9527-dynamic v-for="(item,index) in list" :key="item.id" :imgList="JSON.parse(item.fileUrls)"
				:tid="item.id" :avatar="item.avatar" :essence="item.essence" :name="item.nickName"
				:payOk="item.payOk" :payPrice="item.payPrice" :payType="item.payType" :postClass="item.postClass"
				:isDetail="false" :image="item.image" :essenceShow="false" :publishTime="item.createTime"
				:content="item.content" :isLike="item.isDz == 0 ? false : true" :fileType="item.fileType"
				:redPkgOver="item.redPkgOver" :userId="item.userId" :isGiveReward="item.isGiveReward" :topping="item.topping"
				:ipLocate = "item.ipLocate" :discussId = "item.discussId" :circleName="item.circleName" :voteTime="item.voteTime"
				:likeNumber="parseInt(item.dzCount)" :giveRewardNumber="item.giveRewardNumber" :voteContent="item.voteContent"
				:chatNumber="item.chatNumber" :showFocus="false" :sourceShow="true" :sendMsg="false" :plShow="true" :circleId="item.circleId" :vipDate="item.vipDate">
			</qizai9527-dynamic>
		</template>
		<!-- 用户列表 -->
		<template v-else-if="searchQuery.selectIndex  === 2">
			<view class="focus">
			  <view class="item" v-for="(item, index) in list" :key="index">
			    <view class="image" @click="clickUser(item.id)">
			      <image :src="item.avatar"></image>
			    </view>
			    <view class="cent" @click="clickUser(item.id)">
					<view class="name-item">
						<text class="nick">
							{{ item.nickName }}
						</text>
						<span style="color: #0000ff;" v-if="item.gender == 0">♂</span>
						<span style="color: #fc0107;" v-if="item.gender == 1">♀</span>
					</view>
			      
			      <text class="text">{{item.fansCount}}粉丝 / {{item.postCount}}帖子</text>
			      <text class="text">{{ item.createTime }} 注册</text>
			    </view>
			  </view>
			</view>
		</template>
		<u-loadmore v-if="list.length > 0" :status="loadStatus" color="#9CA3AF" >
		</u-loadmore>
		<u-empty v-if="list.length === 0 && !show" text="本来无一物,何处惹尘埃" icon="/static/img/demo/spring.svg" textSize="16"
			marginTop='25%' mode="list" height="700"></u-empty>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {search,isJoinCircle} from '@/utils/lib/api.js';  //引入需要的api

	export default {
		components: {
			
		},
		data() {
			return {
				show: true,
				records: [
					'JAY','JAY1','JAY2','JAY3'
				],
				loadStatus: 'loadmore',
				searchQuery: {
					keyword: '',
					page: 0,
					pageOk: false,
					selectIndex: 0
				},
				selectList: [
					{
						type: 0,
						name: '圈子'
					},
					{
						type: 1,
						name: '帖子'
					},
					{
						type: 2,
						name: '用户'
					},
				],
				list: [],
			}
		},
		onLoad() {
			this.records = uni.getStorageSync('records')
		},
		// 触底事件
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			// 搜索
			doSearch(searchQuery) {
				this.searchQuery.selectIndex = searchQuery.selectIndex 
				// 数据校验
				if (searchQuery.keyword === '') {
					return this.$refs.uToast.show({
						type: 'error',
						message: '请输入搜索内容'
					})
				}
				let records = uni.getStorageSync('records')
				if(!records){
					records = [
						searchQuery.keyword
					];
				}else{
					records.push(searchQuery.keyword)
				}
				let setArr = new Set(records);
				uni.setStorageSync('records',Array.from(setArr))
				// 收起键盘
				uni.hideKeyboard()
				// 加载中
				uni.showLoading({
					title: '搜索中',
				})
				this.list = []
				this.searchQuery.page = 0
				this.searchQuery.pageOk = true
				
				this.searchApi()
				
			},
			searchApi(){
				search(this.searchQuery).then(data => {
					this.list = this.list.concat(data)
					if(data.length >=10){
						this.searchQuery.page = this.searchQuery.page + 1;
						this.searchQuery.pageOk = true
						this.loadStatus = 'loadmore';
					}else{
						this.searchQuery.pageOk = false
						this.loadStatus = 'nomore';
					}
					this.show = false
				});
			},
			loadMore(){
				if(this.searchQuery.pageOk){
					this.searchApi()
				}
				
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
			// 点击用户信息
			clickUser(userId){
				// 跳转用户个人中心 
				this.$u.route('pages/mine/userInfo', {
					id: userId
				})
				
			},
			// 删除记录
			delRecord(type, index = 0) {
				if (type === 'all'){
					this.records = []
					uni.removeStorageSync('records')
				}else {
					this.records.splice(index, 1)
					uni.setStorageSync('records',this.records)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.search {

		// 小程序导航栏
		/* #ifdef MP-WEIXIN */
		/deep/ .u-navbar {

			.u-navbar__content {
				margin-right: 180rpx !important; // 胶囊按钮
			}

			.nav-center {
				width: 100%;
				margin-left: 80rpx; // 返回按钮
			}
		}

		/* #endif */

		.close-tag {
			position: absolute;
			top: -15rpx;
			right: -5px;
		}
		.sn-earch-input-box {
			width: 100%;
		}
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
	
	.focus {
	  height: 100%;
	  background-color: #ffffff;
	  padding: 40rpx 32rpx;
	  .item {
	    display: flex;
	    align-items: center;
	    margin-bottom: 52rpx;
	    .image {
	      width: 120rpx;
	      height: 120rpx;
	      border-radius: 60rpx;
	      > image {
	        width: 120rpx;
	        height: 120rpx;
	      }
	    }
	    .cent {
	      flex: 1;
	      display: flex;
	      flex-direction: column;
	      margin-left: 32rpx;
	      .nick {
	        font-family: OpenSans-Bold;
	        font-size: 28rpx;
	        font-weight: bold;
	        line-height: 40rpx;
	        letter-spacing: 0rpx;
	        color: #0d0e15;
	      }
	      .text {
	        font-family: OpenSans;
	        font-size: 24rpx;
	        font-weight: normal;
	        line-height: 38rpx;
	        letter-spacing: 0rpx;
	        color: #768196;
	      }
	    }
	    .follow {
	      width: 198rpx;
	      height: 60rpx;
	      text-align: center;
	      border-radius: 12rpx;
	      background: linear-gradient(287deg, #dc4dce 0%, #dc4dce 0%, #ff8b8b 100%, #ff8b8b 100%);
	      > text {
	        font-family: OpenSans-Bold;
	        font-size: 12rpx;
	        font-weight: bold;
	        line-height: 56rpx;
	        letter-spacing: 0rpx;
	        color: #ffffff;
	      }
	      &:active {
	        opacity: 0.7;
	      }
	    }
	    .active {
	      width: 198rpx;
	      height: 60rpx;
	      text-align: center;
	      border-radius: 12rpx;
	      background: #e0e2e7;
	      > text {
	        font-family: OpenSans-Bold;
	        font-size: 12rpx;
	        font-weight: bold;
	        line-height: 56rpx;
	        letter-spacing: 0rpx;
	        color: #0d0e15;
	      }
	      &:active {
	        opacity: 0.7;
	      }
	    }
	  }
	}
	.name-item{
		display: flex;
	}
	.jb{
		width: 50px;
		display: flex;
		border:1px solid #f5f6f5;
		background-color: #1fcd7e;
		color: #FFFFFF;
		border-radius: 27px;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}
	.gl{
		width: 50px;
		display: flex;
		border:1px solid #f5f6f5;
		background-color: #f40083;
		color: #FFFFFF;
		border-radius: 27px;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}
	.qz{
		width: 50px;
		display: flex;
		border:1px solid #f5f6f5;
		background-color: #ff8b8b;
		color: #FFFFFF;
		border-radius: 27px;
		font-size: 14px;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}
</style>
