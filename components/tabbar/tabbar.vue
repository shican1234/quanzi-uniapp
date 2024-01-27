<template>
	<view>
		<u-tabbar :value="current?current:1" @change="changeTab" :fixed="true"
				  :safeAreaInsetBottom="true" :border="true" :placeholder="true" activeColor="#4E94EC">
			<u-tabbar-item v-for="(item,index) in list" :key="index" :name="item.id" :text="item.text" :badge="item.id == 4 ? badge:''">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath" :style="'width:' + item.width + 'px!important;height:'+ item.height +'px!important'"></image>
				<image class="u-page__item__slot-icon-index" slot="inactive-icon" :src="item.iconPath" :style="'width:' + item.width + 'px!important;height:'+ item.height +'px!important'"></image>
			</u-tabbar-item>
		</u-tabbar>
		<u-popup :show="show" @close="close" @open="open" >
			<view class="tabbar-box-wrap">
				<view class="tabbar-box">
					<view class="tabbar-box-item" @click="goToPage('/pages/post/addpost')">
						<image class="box-image" src="/static/release.png" mode="aspectFit"></image>
						<text class="explain">发图文</text>
					</view>
					<view class="tabbar-box-item" @click="goToPage('/pages/post/addvideo')">
						<image class="box-image" src="/static/video.png" mode="aspectFit"></image>
						<text class="explain">发视频</text>
					</view>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	export default {
		name:"tabbar",
		data() {
			return {
				badge: uni.getStorageSync('badge'),
				show: false,
				list: [
					{
						id: 1,
						selectedIconPath: "/static/img/tabbar/home-ed.png",
						iconPath: "/static/img/tabbar/home.png",
						text: '首页',
						pagePath: "pages/home/home",
						width: 21,
						height: 21
					},
					{
						id: 2,
						selectedIconPath: "/static/fabu.png",
						iconPath: "/static/fabu.png",
						text: '',
						width: 40,
						height: 40
					},
					{
						id: 3,
						selectedIconPath: "/static/img/tabbar/mine-ed.png",
						iconPath: "/static/img/tabbar/mine.png",
						text: '我的',
						pagePath: "pages/mine/me",
						width: 21,
						height: 21
					}
				],
			};
		},
		props: {
			current: {
				type: Number,
				default: 1
			}
		},
		created() {
			let _this = this;
			uni.$on('updataBadge',function(data){
				uni.setStorageSync('badge', data.msg);
			   _this.badge = data.msg
			})
			uni.$on('unShowBadge',function(data){
				uni.removeStorageSync('badge')
			   _this.badge = ''
			})
		},
		methods: {
			changeTab(e) {
				this.badge = uni.getStorageSync('badge')
				console.log(this.badge)
				if(e == 2){
					this.show = true
				}else{
					uni.switchTab({
						url: '/' + this.list[e-1].pagePath,
					})
				}
				
				
			},
			close() {
			  this.show = false
			},
			open() {
				
			},
			goToPage(url){
				this.$u.route(url);
				this.show = false
			}
		}
	}
</script>

<style scoped>

</style>
<style lang="scss" scoped>
.tabbar-box-wrap {
	position: absolute;
	width: 100%;
	padding: 50upx;
	box-sizing: border-box;
	/*#ifndef MP-WEIXIN*/
	bottom: 30px;
	 /*#endif*/
	 /*#ifdef MP-WEIXIN*/
	 bottom: 60px;
	  /*#endif*/
	left: 0;
	.tabbar-box {
		position: relative;
		display: flex;
		width: 100%;
		background: #fff;
		border-radius: 20upx;
		padding: 15upx 20upx;
		box-sizing: border-box;
		z-index: 2;
		box-shadow: 0px 2px 5px 2px rgba(0, 0, 0, 0.1);
		&:after {
			content: '';
			position: absolute;
			bottom: -16upx;
			left: 0;
			right: 0;
			margin: auto;
			width: 50upx;
			height: 50upx;
			transform: rotate(45deg);
			background: #fff;
			z-index: 1;
			box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.1);
			border-radius: 2px;
		}
		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #ffffff;
			border-radius: 20upx;
			z-index: 2;
		}
		.tabbar-box-item {
			// position: relative;
			width: 100%;
			z-index: 3;
			margin: 10upx;
			color: $uni-color-subtitle;
			text-align: center;
			font-size: $uni-font-size-base;
			.box-image {
				width: 100%;
				height: $uni-img-size-lg;
			}
		}
	}
}
</style>
