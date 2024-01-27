<template>
	<!-- 首页 -->
	<view class="home">
		<!-- 小程序导航栏 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar placeholder>
			<view slot="center" class="nav-center">
				<u-search placeholder="搜索新鲜事" @click="handleSearch()" :showAction="false" disabled></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- 标签 -->
		<u-tabs class="wrap-card" ref="tabs" @change="changeTab" :list="tablist" :current="tabIndex"
			lineColor="#01906c" :activeStyle="{color:'#01906c'}" :inactiveStyle="{color:'#909399'}" lineWidth="30"
			:scrollable="false">
		</u-tabs>
		<view v-if="tabIndex == 0">
			<template v-if="list2.length > 0">
				<qizai9527-dynamic v-for="(item,index) in list2" :key="item.id" :imgList="JSON.parse(item.fileUrls)"
					:tid="item.id" :avatar="item.avatar" :essence="item.essence" :name="item.nickName"
					:payOk="item.payOk" :payPrice="item.payPrice" :payType="item.payType" :postClass="item.postClass"
					:isDetail="false" :image="item.image" :essenceShow="false" :publishTime="item.createTime"
					:content="item.content" :isLike="item.isDz == 0 ? false : true" :fileType="item.fileType"
					:redPkgOver="item.redPkgOver" :userId="item.userId" :isGiveReward="item.isGiveReward" :topping="item.topping"
					:ipLocate = "item.ipLocate" :discussId = "item.discussId" :circleName="item.circleName" :voteTime="item.voteTime"
					:likeNumber="parseInt(item.dzCount)" :giveRewardNumber="item.giveRewardNumber" :voteContent="item.voteContent"
					:chatNumber="item.chatNumber" :showFocus="false" :sourceShow="true" :sendMsg="false" :plShow="true" :circleId="item.circleId" :vipDate="item.vipDate">
				</qizai9527-dynamic>
				<u-loadmore :status="loadStatusGz" color="#9CA3AF">
				</u-loadmore>
			</template>
			<template v-else>
				<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
					mode="list"></u-empty>
			</template>
		</view>
		<view v-if="tabIndex == 1">
			<template v-if="list.length > 0" class="pbl">
				<liu-waterfall :dataList="list" :column="2" :status="loadStatusFx"></liu-waterfall>
			</template>
			<template v-else>
				<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
					mode="list"></u-empty>
			</template>
		</view>
		<view v-if="tabIndex == 2">
			<view class="hot-nav">
				<view class="flex justify-between column-one">
					<view class="">我的圈子</view>
					<view class="flex justify-between items-center" @click="moreCircle()">
						更多<view class="iconfont iconqianjin"></view>
					</view>
				</view>
				<scroll-view scroll-x style="width: 100%">
					<view class="column-two">
						<view v-if="cirList.length > 0">
							<view v-for="(item,index) in cirList" :key="index" @click="goToCircle(item.id)" class="view-item">
								<!-- <image class="avatar" :src="item.circleSculpture" mode=""></image> -->
								<u-avatar :src="item.circleSculpture" size="80" shape="circle"></u-avatar>
								<view class="nickName">{{item.circleName}}</view>
							</view>
						</view>
						<view v-else>
							<view @click="addCircle()">
								<!-- <image class="avatar" src="/static/img/image/add.png" mode=""></image> -->
								<u-avatar src="/static/img/image/add.png" size="80" shape="circle"></u-avatar>
								<view class="nickName">加入圈子</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				<!-- 有内容 -->
				<template v-if="listQz.length > 0"> <!-- 然后每个标签下的瀑布流 -->
					<qizai9527-dynamic v-for="(item,index) in listQz" :key="item.id"
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
					<u-loadmore :status="loadStatusQz" color="#9CA3AF">
					</u-loadmore>
				</template>
				<!-- 无内容 -->
				<template v-else>
					<u-empty text="本来无一物,何处惹尘埃" icon="/static/img/demo/winter.svg" textSize="16" marginTop='25%'
						mode="list"></u-empty>
				</template>
			</view>
		</view>
		
		<!-- 中间弹出公告栏 -->
		<u-popup :show="popupShow" round="20" mode="center" :customStyle="{width:'80%'}">
			<view class="flex flex-col justify-center items-center m-20">
				<view class="flex flex-col my-20">
					{{noteContent}}
				</view>
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="closePopup">朕知道了</u-button>
			</view>
		</u-popup>
		<app-update ref="app_update" :force="true" :tabbar="true"></app-update>
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from "@/components/tabbar/tabbar.vue"
	import {
		indexPost,
		like,
		gzPost,
		myCirList,
		myCirListPost,
		getNote
	} from '@/utils/lib/api.js'; //引入需要的api
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				// 弹窗公告
				popupShow: false,
				// 按钮配置
				btnStyle: {
					width: "450rpx",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx"
				},
				noteContent: '',
				// 标签栏
				tabIndex: 1,
				//发现分页
				pageFx: 0,
				//发现是否还有下一页
				pageFxOk: true,
				//关注分页
				pageGz: 0,
				//关注是否还有下一页
				pageGxOk: true,
				//圈子分页
				pageQz: 0,
				//圈子是否还有下一页
				pageQzOk: true,
				//刷新状态
				loadStatusFz: 'loadmore',
				loadStatusGz: 'loadmore',
				loadStatusQz: 'loadmore',
				tablist: [{
						name: "关注"
					},
					{
						name: "发现"
					},
					{
						name: "圈子"
					}
				],
				list: [

				],
				list2: [

				],
				cirList: [],
				listQz: []
			}
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			// #ifdef APP-PLUS
			let isUpdateShow = uni.getStorageSync("isUpdateShow")
			if(isUpdateShow){
				return;
			}
			// #endif
			this.handleSearch()
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
			let isUpdateShow = uni.getStorageSync("isUpdateShow")
			if(isUpdateShow){
				return;
			}
			// #endif
		},
		mounted() {
			this.$refs.app_update.update(); //调用子组件检查更新方法
		},
		onLoad(e) {
			
			this.getIndexPost()
			this.getNoteContent()
			var _this = this;
			uni.$on('delPost',function(data){
			 _this.listQz.splice(data,1)
			})
			// uni.$on('loadIndex',function(data){
			// 	console.log("312321321321")
			//  _this.loadData()
			// })
		},
		onUnload() {
			uni.$off('delPost')
			// uni.$off('loadIndex')
		},
		methods: {
			//获取首页数据
			async getIndexPost() {
				indexPost({
					'page': this.pageFx
				}).then(data => {
					if (this.pageFx == 0) {
						this.list = data
					} else {
						this.list = this.list.concat(data)
					}
					if (data.length >= 10) {
						this.pageFx = this.pageFx + 1;
					} else {
						this.pageFxOk = false
						this.loadStatusFx = 'nomore'
					}
				});
			},
			//获取关注列表数据
			async getGzPostList() {
				gzPost({
					'page': this.pageGz
				}).then(data => {
					if (this.pageGz == 0) {
						this.list2 = data
					} else {
						this.list2 = this.list2.concat(data)
					}
					if (data.length >= 10) {
						this.pageGz = this.pageGz + 1;
					} else {
						this.pageGxOk = false
						this.loadStatusGz = 'nomore'
					}
				});
			},
			//获取我的圈子
			async getMyCirList() {
				myCirList({
					"page": 0
				}).then(data => {
					this.cirList = data
				});
			},
			async goToCircle(id) {
				this.$u.route('/pages/circle/circle', {
					id: id
				})
			},
			//获取我的圈子里面的帖子
			async getMyCirPost() {
				myCirListPost({
					'page': this.pageQz
				}).then(data => {
					if (this.pageQz == 0) {
						this.listQz = data
					} else {
						this.listQz = this.listQz.concat(data)
					}
					if (data.length >= 10) {
						this.pageQz = this.pageQz + 1;
					} else {
						this.pageQzOk = false
						this.loadStatusQz = 'nomore'
					}
				});
			},
			
			addCircle() {
				this.$u.route('/pages/circle/list')
			},
			moreCircle() {
				this.$u.route('/pages/circle/myCircle')
			},
			// 搜索
			handleSearch() {
				this.$u.route('/pages/home/search', {
					type: 'info'
				})
			},
			getNoteContent(){
				getNote().then(data => {
					if(data.noteShow){
						this.popupShow = true
						this.noteContent = data.noteContent
					}
				});
			},
			// 关闭公告
			closePopup() {
				this.popupShow = false
			},
			// tab栏切换
			changeTab(item) {
				this.tabIndex = item.index
				this.loadData()
			},
			loadData(){
				if (this.tabIndex == 0) { //关注
					this.list2 = []
					this.pageGz = 0
					this.pageGzOk = true
					this.getGzPostList()
				} else if (this.tabIndex == 1) { //发现
					this.list = []
					this.pageFx = 0
					this.pageFxOk = true
					this.getIndexPost()
				} else if (this.tabIndex == 2) { //圈子
					this.listQz = []
					this.pageQz = 0
					this.pageQzOk = true
					this.getMyCirList()
					this.getMyCirPost()
				}
			},
			onReachBottom() {
				if (this.tabIndex == 0) { //关注
					if (this.pageGxOk) {
						this.getGzPostList()
					}
				} else if (this.tabIndex == 1) { //发现
					if (this.pageFxOk) {
						this.getIndexPost()
					}
				} else if (this.tabIndex == 2) { //圈子
					if (this.pageQzOk) {
						this.getMyCirPost()
					}
				}

			},
			onPullDownRefresh() {
				this.loadData()
				// if (this.tabIndex == 0) { //关注
				// 	this.list2 = []
				// 	this.pageGz = 0
				// 	this.getGzPostList()
				// } else if (this.tabIndex == 1) { //发现
				// 	this.list = []
				// 	this.pageFx = 0
				// 	this.getIndexPost()
				// } else if (this.tabIndex == 2) { //圈子
				// 	this.listQz = []
				// 	this.pageQz = 0
				// 	this.getMyCirList()
				// 	this.getMyCirPost()
				// }
				uni.stopPullDownRefresh();
			},

			dianzan(e) {
				/*#ifdef MP-WEIXIN*/
				var tid = e.id;
				/*#endif*/
				/*#ifndef MP-WEIXIN*/
				var tid = this.list[e.index].id;
				/*#endif*/
				like({
					'tid': tid
				}).then(data => {
					/*#ifdef MP-WEIXIN*/
					let dzCount = parseInt(e.dzCount)
					var tid = e.id;
					if (e.isDz >= 1) {
						e.isDz = 0
						e.dzCount = dzCount - 1;
					} else {
						e.isDz = 1
						e.dzCount = dzCount + 1;
					}
					/*#endif*/
					/*#ifndef MP-WEIXIN*/
					let dzCount = parseInt(this.list[e.index].dzCount)
					var tid = this.list[e.index].id;
					if (this.list[e.index].isDz >= 1) {
						this.list[e.index].isDz = 0
						this.list[e.index].dzCount = dzCount - 1;
					} else {
						this.list[e.index].isDz = 1
						this.list[e.index].dzCount = dzCount + 1;
					}
					/*#endif*/
				});


			},
			//这里是关注的各种方法
			clickDynamic(e) {
				console.log(e);
				console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e) { //e是用户id
				console.log(e);
				console.log('childUser');
			},
			// 点击关注
			clickFocus(e) {
				this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
				console.log(e);
				console.log('childUser');
			},
			// 点击打赏
			clickGiveReward(e) {
				console.log(e);
				console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e) {
				console.log(e);
				console.log('clickChat');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top) - var(--window-bottom)); // 视高 - 内容区顶部 - 内容区底部
		width: 100%;

		// 小程序导航栏
		/* #ifdef MP-WEIXIN */
		/deep/ .u-navbar {
			.iconfont {
				font-size: 48rpx;
				color: $uni-color-green;
			}


			.u-navbar__content {
				margin-right: 180rpx !important; // 胶囊按钮
			}
		}

		/* #endif */
		.title {
			display: flex;
			font-size: 12px;

			.user {
				display: inline-flex;
				align-items: center;
				/* 垂直居中 */


			}

			.dianzan {
				display: inline-flex;
				align-items: center;
				/* 垂直居中 */

				margin-left: auto;

				image {
					width: 20px;
					height: 20px;
				}
			}
		}

		.item-tital {
			margin: 0 3px;
		}

		.hot-nav {
			border-top: 1rpx solid #EEEEEE;
			border-bottom: 1rpx solid #EEEEEE;
			padding: 20rpx;

			.column-one {
				margin-bottom: 20rpx;

				&>view:last-child {
					color: #9b9b9b;
				}

				&>view:first-child {
					font-size: 32rpx;
				}
			}

			.column-two>view {
				text-align: center;
				display: flex;
				flex: 1;
				flex-direction: row;
				background: #FFFFFF;
				color: #000000;
				margin: 0 10rpx;
			}
			.view-item {
				margin-right: 10px;
			}
			// .avatar {
			// 	width: 80px;
			// 	height: 80px;
			// 	border-radius: 80px;
			// 	border-color: #eee;
			// 	border-width: 1upx;
			// 	border-style: solid;
			// 	overflow: hidden;
			// }

			// .nickName {
			// 	font-weight: bold;
			// 	/* 设置昵称的字体粗细 */
			// }
		}
	}
</style>