<template>
	<view>
		<view v-if="postList.length > 0">
			<qizai9527-dynamic v-for="(item,index) in postList" :key="item.id" :imgList="JSON.parse(item.fileUrls)"
				:tid="item.id" :avatar="item.avatar" :essence="item.essence" :name="item.nickName"
				:payOk="item.payOk" :payPrice="item.payPrice" :payType="item.payType" :postClass="item.postClass"
				:isDetail="false" :image="item.image" :essenceShow="false" :publishTime="item.createTime"
				:content="item.content" :isLike="item.isDz == 0 ? false : true" :fileType="item.fileType"
				:redPkgOver="item.redPkgOver" :userId="item.userId" :isGiveReward="item.isGiveReward" :topping="item.topping"
				:ipLocate = "item.ipLocate" :discussId = "item.discussId" :circleName="item.circleName" :voteTime="item.voteTime"
				:likeNumber="parseInt(item.dzCount)" :giveRewardNumber="item.giveRewardNumber" :voteContent="item.voteContent"
				:chatNumber="item.chatNumber" :showFocus="false" :sourceShow="true" :sendMsg="false" :plShow="true" :circleId="item.circleId" :vipDate="item.vipDate">
			</qizai9527-dynamic>
		</view>
		<!-- 空数据 -->
		<u-empty v-if="postList.length === 0" text="本来无一物,何处惹尘埃" icon="/static/img/demo/summer.svg" textSize="16"
			marginTop='25%' mode="list" height="700"></u-empty>
		<!-- 加载更多 -->
		<u-loadmore v-if="postList.length > 0" :status="loadStatus" color="#9CA3AF">
		</u-loadmore>
	</view>
</template>

<script>
	import {getPostListByType} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				postList: [],
				loadStatus: 'loadmore',
				page: 0,
				pageOk: false,
				type: ''
			}
		},
		onLoad(e) {
			this.type = e.type
			if(e.type == 0){
				uni.setNavigationBarTitle({
					title: '我的帖子'
				})
				
			}if(e.type == 1){
				uni.setNavigationBarTitle({
					title: '点赞的帖子'
				})
			}
			this.getMyPostList()
		},
		// 触底事件
		onReachBottom() {
			this.loadMore()
		},
		methods: {
			getMyPostList(){
				getPostListByType({"page":this.page,"type":this.type}).then(data => {
					this.postList = this.postList.concat(data)
					if(data.length >=10){
						this.page = this.page + 1;
						this.loadStatus = 'loadmore';
						this.pageOk = true;
					}else{
						this.pageOk = false
						this.loadStatus = 'nomore';
					}
				});
			},
			// 加载更多
			loadMore() {
				if(this.pageOk){
					this.getMyPostList()
				}
			},
		}
	}
</script>

<style>

</style>
