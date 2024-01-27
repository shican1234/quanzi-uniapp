<template>
	<view class="waterfall" :style="'background-color:'+bgColor">
		<view v-for="(item, index) in columnData" :key="index" class="column" :style="{ width: columnWidth + 'px' }">
			<view v-for="(childItem, childIndex) in item" :key="childIndex" style="width: 100%"
				:id="'item' + childItem.id" >
				<view class="item"
					:style="'background-color:'+cardBgColor+';margin:'+margin+'rpx;border-radius:'+radius+'rpx;'">
					<image :src="childItem.image" mode="widthFix" lazy-load
						:style="{height:childItem.height,width: '100%'}" @click.stop="click(childItem)">
					</image>
					<view class="title-info" @click.stop="click(childItem)">
						<view class="item-title">{{ childItem.title }}</view>
						<view class="item-desc">{{ childItem.content }}</view>
					</view>
					<view class="title">
						<view class="user" @click="toUserInfo(childItem)">
							<u-avatar :src="childItem.avatar" size="25" class="item-tital"></u-avatar>
							<text class="item-tital">{{childItem.nickName}}</text>
						</view>
						<view class="dianzan" @click="dianzan(childItem,childIndex,index)">
							<image class="item-tital" v-if="childItem.isDz > 0" src="/static/img/image/dz_on.png"
								mode=""></image>
							<image class="item-tital" v-else src="/static/img/image/dz_off.png" mode=""></image>
							<text class="item-tital">{{childItem.dzCount}}</text>
						</view>

					</view>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" color="#9CA3AF">
		</u-loadmore>
	</view>
	
</template>

<script>
	import {
		indexPost,
		like,
		gzPost,
		myCirList,
		myCirListPost,
		getNote
	} from '@/utils/lib/api.js'; //引入需要的api
	export default {
		props: {
			//数据源
			dataList: {
				type: Array,
				required: true,
				default: []
			},
			//显示列数
			column: {
				type: Number,
				required: true,
				default: 2
			},
			//卡片margin(rpx)
			margin: {
				type: Number,
				default: 10
			},
			//卡片圆角(rpx)
			radius: {
				type: Number,
				default: 8
			},
			//页面背景颜色
			bgColor: {
				type: String,
				default: '#edeef2'
			},
			
			//卡片背景颜色
			cardBgColor: {
				type: String,
				default: '#FFFFFF'
			},
			//更多
			status: {
				type: String,
				default: 'loadmore'
			},
		},
		data() {
			return {
				columnData: [],
				dataList: [],
				columnWidth: 0,
				loading: false,
			};
		},
		watch: {
			dataList: {
				immediate: true,
				deep: true,
				handler(newValue, oldValue) {
					this.$nextTick(()=>{
						this.setColumnWidth()
						this.setData()
					})
				},
			},
			column: {
				immediate: false,
				deep: true,
				handler(newValue) {
					this.$nextTick(()=>{
						this.setColumnWidth()
						this.setData()
					})
				},
			},
		},
		methods: {
			//计算每列的高度
			getElemHeight(index) {
				this.$nextTick(() => {
					var arr = [];
					this.dataList.map((item, index) => {
						uni.getImageInfo({
							src: item.picUrl,
							success: (e) => {
								item.height = (e.height * (this.columnWidth / e.width)) + 'px'
								this.createSelectorQuery().select('#item' + item.id)
									.boundingClientRect(res => {
										arr.push({
											...{
												itemHeight: res.height
											},
											...item
										});
										if (arr.length == this.dataList.length) {
											this.columnData = this.distributeToNArrays(arr,
												this.column);
										}
									}).exec();
							}
						})
					})
				})
			},
			distributeToNArrays(arr, n) {
				let sums = new Array(n).fill(0);
				return arr.reduce(
					(arrays, item) => {
						let minSum = Math.min(...sums);
						let minIndex = sums.indexOf(minSum);
						arrays[minIndex].push(item);
						sums[minIndex] += item.itemHeight;
						return arrays;
					},
					new Array(n).fill().map(() => []),
				)
			},
			setColumnWidth() {
				let width = uni.getSystemInfoSync().windowWidth
				this.columnWidth = Math.floor(width / this.column)
			},
			setData() {
				const resultArray = this.dataList.reduce(
					(acc, cur, index) => {
						const targetIndex = index % this.column;
						acc[targetIndex].push(cur);
						return acc;
					},
					Array.from(Array(this.column), () => []),
				);
				this.columnData = resultArray
				this.getElemHeight()
			},
			click(e) {
				this.$u.route('pages/home/detail', {
					id: e.id
				})
			},
			toUserInfo(e) {
				this.$u.route('pages/mine/userInfo', {
					id: e.userId
				})
			},
			dianzan(e,childIndex,index) {
				let xb ;
				if(index == 0){
					if(childIndex == 0){
						xb = 0
					}else{
						xb = childIndex*2
					}
				}else{
					if(childIndex == 0){
						xb = 1
					}else{
						xb = (2*(childIndex+index)) -1
					}
				}
				
				like({
					'tid': e.id
				}).then(data => {
					let dzCount = parseInt(this.dataList[xb].dzCount)
					var tid = this.dataList[xb].id;
					if (this.dataList[xb].isDz >= 1) {
						this.dataList[xb].isDz = 0
						this.dataList[xb].dzCount = dzCount - 1;
					} else {
						this.dataList[xb].isDz = 1
						this.dataList[xb].dzCount = dzCount + 1;
					}
				
				});
			
			
			},
		},
	};
</script>

<style scoped>
	.waterfall {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.item {
		overflow: hidden;
	}

	.title-info {
		padding: 0rpx 20rpx 20rpx 20rpx;
	}

	.item-title {
		font-size: 30rpx;
		color: #333333;
		line-height: 46rpx;
		text-align: justify;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.item-desc {
		margin-top: 4rpx;
		font-size: 26rpx;
		color: #666666;
		line-height: 34rpx;
		text-align: justify;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
<style lang="scss" scoped>
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
</style>