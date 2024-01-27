<template>
	<view class="l_waterfall">
		<view >
			<view class="water_col" v-for="(item,index) in group" :key="index" :id="`water_col_box_${index}`"
				:style="{'width':w,'marginLeft':mar}">
				<view class="water_col_block" v-for="(ite,ind) in optimize['column_'+index]" :key="ind">
					<image :src="ite.image" mode="widthFix" @load="emitHeight(ite,ind)" @error="emitHeight(ite,ind)">
					</image>
					<view class="t">
						{{ite.title}}
					</view>
					<view class="d">
						{{ite.desc}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "lj-waterfall",
		props: {
			group: {
				type: Number,
				default: 2,
			},
			list: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			pageSize:{
				type: Number,
				default: 10,
			}
		},
		watch: {
			group(newV, oldV) {
				this.handleFun()
				setTimeout(() => {
					this.init(0)
				}, 10)
			},
			list(newV, oldV) {
				setTimeout(() => {
					this.init(newV.length - this.pageSize)
				}, 10)
			}
		},
		data() {
			return {
				widthGroup: {
					2: 360,
					3: 360,
					4: 180,
					5: 140,
				},
				optimize: {
					list: {},
					proportion: 1,
				},
				temporaryArr: [],
				bool: false,
				lists: [
					
				]
			};
		},
		computed: {
			w() {
				const boxW = `${100 / this.group - this.optimize.proportion}%`
				return boxW
			},
			mar() {
				const c = `${(this.optimize.proportion*this.group/(this.group+1))}`;
				const m = `${(parseInt(c*1000)/1000).toFixed(3)}%`
				return m;
			}
		},
		methods: {
			emitHeight(ite, ind) {
				this.init(ite.index + 1)
				console.log(ite.index)
			},
			async init(index) {
				if (index >= this.list.length) return false;
				const boxHeight = await this.getBoxHeight();
				this.processingFun(boxHeight, index)
			},
			processingFun(boxHeight, index) {
				this.optimize[`column_${boxHeight.column}`].push({
					...this.list[index],
					index,
				})
				this.$forceUpdate()
			},
			async getBoxHeight() {
				return new Promise(resolve => {
					const heightArr = [];
					for (let i = 0; i < this.group; i++) {
						const query = uni.createSelectorQuery().in(this);
						query.select(`#water_col_box_${i}`).boundingClientRect(data => {
							heightArr.push({
								column: i,
								height: data.height
							});
						}).exec(() => {
							if (this.group <= heightArr.length) {
								resolve(this.compareHeight(heightArr,'height'));
							}
						});
					}
				})
			},
			compareHeight(arr, s) {
				let oh = arr[0][s]
				let mo = []
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i][s] <= oh) {
						oh = arr[i][s]
					}
				}
				mo = arr.filter(i => i[s] == oh);
				return mo[0]
			},
			handleFun() {
				for (let i = 0; i < this.group; i++) {
					this.optimize[`column_${i}`] = []
				}
			}
		},
		mounted() {
			this.handleFun()
		}
	}
</script>

<style lang="scss" scoped>
	.l_waterfall {
		position: relative;
		.water_col {
			float: left;
		}
	}
	.water_col_block{
		margin-bottom: 8rpx;
		.t{
			font-size: 34rpx;
			margin-bottom: 4rpx;
			width: 90%;
		}
		.d{
			width: 92%;
			font-size: 27rpx;
			color: #797979;
		}
		image {
			display: block;
			width: 100%;
			border-radius: 6rpx;
		}
	}
</style>
