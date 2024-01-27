<script>
	import {getConfig} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		globalData: {
			qdAdResult: 0,
		},
		onLaunch: async function() {
			// #ifdef  APP-PLUS
			setTimeout(() => {
				uni.hideTabBar();
			}, 500);
			 // #endif
			 // #ifndef  APP-PLUS
				uni.hideTabBar();
			  // #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 每个页面公共css */
	/* uViewUI */
	@import "@/uni_modules/uview-ui/index.scss";
	/* uni-ui库 */
	// @import '/static/css/uni.css';
	/* 图标库 */
	@import "/static/css/iconfont.css";
	/* 动画库 */
	@import "/static/css/animate.css";
	/* 样式库 */
	@import '/static/css/thinco.scss';
	
	/* #ifdef H5 */
	/* 针对h5页面取消返回按钮 */
	uni-page[data-page="pages/paper/friend"] .uni-page-head-hd {
		display: none;
	}

	/* #endif */
	// 隐藏小程序滚动条（无用）
	/* #ifdef MP-WEIXIN */
	::-webkit-scrollbar {
		display: none;
	}

	/* #endif */
	/*每个页面公共css */
	.complaint_warp{
		width: 100vw;
		min-height: 100vh;
		background: #F5F6F9;
		padding: 24rpx 32rpx;
		padding-bottom: 60rpx;
		box-sizing: border-box;
	}
	.common_warp{
		width: 100%;
		border-radius: 12rpx;
		background-color: #fff;
		padding: 34rpx 24rpx 40rpx 24rpx;
		box-sizing: border-box;
		margin-bottom: 24rpx;
	}
	.common_title{
		color: #333;
		font-family: PingFang SC;
		font-size: 28rpx;
		font-style: normal;
		font-weight: bold;
		line-height: 28rpx;
		margin-bottom: 24rpx;
	}
	/* #ifndef APP-PLUS-NVUE */
	@import '@/common/cuixinyu.css';
	/* #endif */
</style>
