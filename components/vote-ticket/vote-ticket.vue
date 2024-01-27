<template>
	<view >
		<!-- #ifndef MP-WEIXIN -->
		<view class="tag-list" v-for="(item, index) in tagList" :key="item[tabValueName]" @click="handleSelectTag(item, index)">
			<view class="tag-item" :class="getStyle(item)">
				{{ item[tagShowName] }}
				<text class="text-26 my-10">({{item.ticketNum}}票)</text>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="tag-list" v-for="(item, index) in tagList" :key="item[tabValueName]" @click="handleSelectTag(item, index)">
			<view class="tag-item" :class="[getStyle(item)]">
				{{ item[tagShowName] }}
				<text class="text-26 my-10">({{item.ticketNum}}票)</text>
			</view>
		</view>
		<!-- #endif -->
		<u-button v-if="!voteOver && !isTicket" :customStyle="btnStyle" :ripple="true" shape="circle" @click="voteSubmit">投票</u-button>
	</view>
</template>

<script>
	export default {
		props: {
			//选中tag列表
			selectedTagList: {
				type: Array,
				default: [],
			},
			voteOver: {
				type: Boolean,
				default: false
			},
			tabValueName: {
				type: String,
				default: "_id",
			},
			//显示tag名称字段
			tagShowName: {
				type: String,
				default: "category",
			},
			//展示tag列表
			tagList: {
				type: Array,
				default: [],
			},
			//限制tag选中个数
			limit: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				//是否投票过 默认是没有投票过
				isTicket: false,
				// 按钮配置
				btnStyle: {
					width: "450rpx",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx"
				}
			}
		},
		methods: {
			/**
			 * 获取tag的样式
			 */
			getStyle(item) {
				console.log(item)
				if(item.isDz){
					this.isTicket = item.isDz
				}
				if(item.isDz || this.getIndexSeleted(item[this.tabValueName]) !== -1){
					return 'seleted';
				}
				return '';
			},
			/**
			 * @param {Object} item 点击tag的每一项
			 * @param {Object} index 索引
			 */
			handleSelectTag(item, index) {
				if(this.limit == 0){
					return
				}
				if(this.isTicket){
					uni.showToast({
						title: `您已经投过票啦!`,
						icon: "none",
					});
					return
				}
				if(this.voteOver){
					uni.showToast({
						title: `投票已过期了!`,
						icon: "none",
					});
					return
				}
				let selectedTagList = JSON.parse(JSON.stringify(this.selectedTagList));
				
				const indexSelected = this.getIndexSeleted(item[this.tabValueName]);
				if (indexSelected !== -1) {
					selectedTagList.splice(indexSelected, 1);
				} else if (this.limit == 1) {
					selectedTagList = [item];
				} else if (this.selectedTagList.length == this.limit) {
					uni.showToast({
						title: `最多能选择${this.limit}个标签`,
						icon: "none",
					});
				} else {
					selectedTagList.push(item);
				}
				console.log(selectedTagList)
				this.$emit("select", selectedTagList);
			},
			voteSubmit(){
				this.$emit('voteSubmit');
			},
			/**
			 * 获取tag的选中索引
			 */
			getIndexSeleted(_id) {
				return this.selectedTagList.findIndex((item) => item[this.tabValueName] == _id );
			},
		},
	};
</script>

<style lang="scss" scoped>
	.tag-list {
		display: flex;
		flex-wrap: wrap;

		.tag-item {
			width: 100%;
			background: rgba(247, 247, 247, 1);
			border-radius: 10rpx;
			border:1px solid #999;
			position: relative;
			text-align: center;
			padding: 10px;
			margin: 5px;

			&.seleted {
				background: linear-gradient(to right, #dcc20b, #01906c);
			}
		}
	}
</style>
