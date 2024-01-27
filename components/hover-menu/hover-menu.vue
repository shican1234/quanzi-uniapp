<template>
	<view>
		<!-- 遮罩 -->
		<view class="mask" v-if="show" @tap="openShow()" @touchmove.stop.prevent></view>
		<!-- 按钮 -->
		<view class="major-box" :class="{show: show}" :style="{'--hotbg':hotbg,top:top+'px'}">
			<view class="click-btn" @tap="openShow()" draggable="true" @touchstart="touchstart" @touchmove.stop.prevent="touchmove">
				<view>快捷</view>
				<view>导航</view>
			</view>
			<view class="nav-box">
				<view class="nav-btn" @tap="clickBtn('/pages/post/addpost')">
					<view class="nav-icon">
						<image class="box-image" src="/static/release.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">发图文</view>
				</view>
				<view class="nav-btn" @tap="clickBtn('/pages/post/addvideo')">
					<view class="nav-icon">
						<image class="box-image" src="/static/video.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">发视频</view>
				</view>
				
				<view class="nav-btn" @tap="clickBtn('/pages/circle/userList')">
					<view class="nav-icon">
						<image class="box-image" src="/static/chengyuan.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">成员列表</view>
				</view>
				<view class="nav-btn" @tap="clickBtn('/pages/circle/add')" v-if="role == 3">
					<view class="nav-icon">
						<image class="box-image" src="/static/info.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">圈子编辑</view>
				</view>
				<!-- <view class="nav-btn" @tap="clickBtn('/pages/post/addpost')" v-if="role == 3">
					<view class="nav-icon">
						<image class="box-image" src="/static/setting.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">圈子管理</view>
				</view> -->
				<view class="nav-btn" @tap="exit()" v-if="role <= 2">
					<view class="nav-icon">
						<image class="box-image" src="/static/exit.png" mode="aspectFit"></image>
					</view>
					<view class="nav-text">退出圈子</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {exitCircle} from '@/utils/lib/api.js';  //引入需要的api
export default {
	
	props: {
		role: {
			type: Number
		},
		circleId: {
			type: Number
		},
		circleName: {
			type: String
		}
	},
	data() {
		return {
			show: false ,// 是否显示
			hotbg: `35px`,
			top: 300,
			deviationTop: 0,	// 偏移量
			windowHeight: uni.getSystemInfoSync().windowHeight	// 视图高度 
			
		};
	},
	methods: {
		// 点击按钮 
		clickBtn: function(url) {
			// this.$u.route(url);
			this.$u.route(url, {
				circleId: this.circleId,
				circleName: this.circleName
			})
			this.show = false
		},
		// 拖动开始，记录一下偏移量
		touchstart: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			this.deviationTop = touch.clientY - this.top;
			// console.log(this.deviationTop);
		},
		openShow:function(){
			this.show = !this.show
			if(this.show){
				this.hotbg = `270px`
			}else{
				setTimeout(() => {
					this.hotbg = `35px`
				}, 500);
			}
		},
		exit:function(){
			exitCircle({"circleId":this.circleId}).then(data => {
				uni.showToast({
				    icon: 'success',   
				    duration: 1000,
				    title: '退出成功!'
				});
				setTimeout(function() {
					uni.switchTab({
						url:'/pages/home/home'
					})
				}, 1000);
			});
			
		},
		// 上下拖动时 
		touchmove: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			var top = touch.clientY;
			top = top - this.deviationTop;
			if (top < 0) {
				top = 0;
			}
			if (top > this.windowHeight - 40) {
				top = this.windowHeight - 40;
			}
			this.top = top;
			return false;
		}
	}
};
</script>

<style>
	/* 遮罩 */
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.4);
	}
	
	/* 总盒子 */
	.major-box {
		border: 1px 0 solid;
		/* z-index: var(--hotbg); */
		z-index: 10001;
		position: fixed;
		width: 100%;
		height: var(--hotbg);
		left: 650rpx;
		transition: left 0.5s;
		overflow: hidden;
	}
	/* 展开时 */
	.major-box.show{left: 110rpx;}
	
	.click-btn,
	.nav-box {
		float: left;
	}
	/* 按钮样式 */
	.nav-box{
		background-color: #FFF;
		border-radius: 0 0 0 5px;
	}
	.click-btn {
		width: 100rpx;
		background-color: #01906c;
		color: #fff;
		font-size: 10px;
		text-align: center;
		border-radius: 100rpx 0 0 100rpx;
		line-height: 12px;
		padding: 5px 0;
	}
	.click-btn view {
		padding-left: 15rpx;
	}

	/* 按钮盒子 */
	.nav-box {
		width: 600rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.nav-btn {
		min-width: 170rpx;
		padding: 12rpx 0;
		padding-bottom: 20rpx;
		text-align: center;
	}
	.nav-icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		font-size: 15px;
		border-radius: 50%;
		color: #fff;
	}
	.box-image{
		width: 100%;
		height: 100%;
	}
	.nav-text {
		font-size: 12px;
		font-weight: bold;
	}
</style>
