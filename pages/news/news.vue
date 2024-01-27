<template>
	<!-- 新鲜事页 -->
	<view class="news">
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar placeholder>
			<view slot="left" class="iconfont iconqiandao" @click="goSign()"></view>
			<view slot="center" class="nav-center">
				<u-search placeholder="搜索新鲜事" @click="handleSearch()" :showAction="false" disabled></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
		<!-- 轮播图 -->
		<u-swiper :list="swiper" keyName="image" indicator indicatorMode="line" circular showTitle
			height="400rpx" previousMargin="30" nextMargin="30" bgColor="#ffffff" @click="swiperClick"></u-swiper>
		<!-- 热门博主 -->
		<news-topic-nav :list="hotBloggerList"></news-topic-nav>
		<!-- 热门圈子 -->
		<view class="last-update">
			<view class="last-update-name">热门圈子</view>
			<topic-list :item="item" v-for="(item,index) in hotCircleList" :key="index"></topic-list>
		</view>
		<tabbar :current="2"></tabbar>
	</view>
</template>

<script>
	import {swiper,hotCircle,hotBlogger} from '@/utils/lib/api.js';  //引入需要的api
	
	import tabbar from "@/components/tabbar/tabbar.vue"
	import NewsTopicNav from "@/pages/news/cpns/news-topic-nav.vue"
	import TopicList from "@/pages/news/cpns/topic-list.vue"
	export default {
		components: {
			tabbar,
			NewsTopicNav,
			TopicList
		},
		data() {
			return {
				swiper: [],
				hotCircleList: [],
				hotBloggerList: [],
				
			}
		},
		// 监听原生标题栏搜索输入框点击事件
		onNavigationBarSearchInputClicked() {
			this.handleSearch()
		},
		onLoad() {
			// 设置swiperHeight
			uni.getSystemInfo({
				success: (res) => {
					// 屏幕高度（screenHeight) = 手机状态栏的高度(statusBarHeight) + 导航栏高度(44px) + 可使用窗口高度(windowHeight)
					// 可使用窗口高度 = swiper高度 + 自定义导航栏高度
					this.swiperHeight = res.windowHeight - 44
				}
			})
			this.getSwiper()
			this.gethotCircle()
			this.getHotBlogger()
		},
		methods: {
			// 搜索
			goSearch() {
				this.$u.route('/pages/home/search', {
					type: 'topic'
				})
			},
			//获取热门圈子
			gethotCircle(){
				hotCircle().then(data => {
					this.hotCircleList = data
					
				});
			},
			//获取热门博主
			getHotBlogger(){
				hotBlogger({"page":0}).then(data => {
					console.log(data)
					this.hotBloggerList = data
				});
			},
			//获取轮播图
			getSwiper(){
				swiper().then(data => {
					this.swiper = data
					
				});
			},
			// 签到
			goSign() {
				this.$u.route('/pages/sign/sign')
			},
			// 搜索
			handleSearch() {
				this.$u.route('/pages/home/search', {
					type: 'info'
				})
			},
			swiperClick(e){
				if(this.swiper[e].type == 0){
					//跳转H5
					// #ifdef H5
						window.location.href = this.swiper[e].h5Url;
					// #endif
								
					// #ifndef H5
						plus.runtime.openURL(this.swiper[e].h5Url)
					// #endif
				}else{
					var to = this.swiper[e].h5Url.replace("amp;","");
					this.$u.route(to)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news {

		// 导航栏
		/deep/ .u-navbar {

			.iconfont {
				font-size: 48rpx;
				color: $uni-color-green;
			}

			.nav-center {
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-title {
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

					.active-line {
						border-bottom: 8rpx solid $uni-color-green;
						border-radius: 20rpx;
						width: 70rpx;
						position: absolute;
						bottom: -10rpx;
						left: 50%;
						margin-left: -35rpx;
					}
				}

			}
		}

		.search-input {
			margin: 20rpx;
			height: 70rpx;
			/deep/ .u-input {
				height: 100%;
			}
		}
		.inpu{
			border-radius: 40px;
		}
		.last-update {
			padding: 20rpx;
		
			.last-update-name {
				font-size: 32rpx;
				padding-bottom: 5rpx;
			}
		}
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
</style>
