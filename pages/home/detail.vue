<template>
	<!-- 首页/详情页 -->
	<!-- h5 滚动穿透不需要处理，wx、app 需要 使用 page-meta 组件配合阻止滚动穿透 -->
	<page-meta :page-style="'overflow:'+(showShare?'hidden':'visible')"></page-meta>
	<view class="detail" v-if="info.fileUrls.length > 0">
		<!-- 详细信息 -->
		<qizai9527-dynamic 
		    :imgList="info.fileUrls.length > 0?JSON.parse(info.fileUrls):[]" 
		    :avatar="info.avatar"
			:tid="info.id"
			:essence="info.essence"
			:payPrice="info.payPrice"
			:payType="info.payType"
			:payOk="info.payOk"
			:vipDate="info.vipDate"
			:isDetail="true"
			:image="info.image"
			:voteContent="info.voteContent"
			:postClass="info.postClass"
			:redPkgOver="info.redPkgOver"
			:publishTime="info.createTime"
		    :name="info.nickName"
			:essenceShow="false"
		    :content="info.content"
		    :isLike="info.isDz"
		    :userId="info.userId"
			:topping="info.topping"
		    :fileType="info.fileType"
		    :isGiveReward="info.isGiveReward"
		    :voteType="info.voteType"
		    :likeNumber="parseInt(info.dzCount)"
		    :giveRewardNumber="info.giveRewardNumber"
		    :chatNumber="info.chatNumber"
			:ipLocate = "info.ipLocate"
			:discussId = "info.discussId"
			:circleName="info.circleName"
			:circleId="info.circleId"
			:voteOver="info.voteOver"
			:voteTime="info.voteTime"
			:voteTicketList="info.voteTicketList"
		    :showFocus="true"
			:sendMsg="true"
		    :sourceShow="true"
		    :plShow="false"
		>
		</qizai9527-dynamic>
		<!-- <u-gap height="10" bgColor="#F9FAFB"></u-gap> -->
		<circle-item :circleAvatar="circleInfoData.circleSculpture" :circleName="circleInfoData.circleName" :peopleCount="circleInfoData.peopleCount" :postCount="circleInfoData.postCount" :circleId="circleInfoData.id"></circle-item>
		<!-- <u-gap height="10" bgColor="#F9FAFB"></u-gap> -->
		<!-- <view class="p-20 text-30 font-bold">
			最新评论<text class="ml-10">3</text>
		</view> -->
		<!-- 评论列表 -->
		<view class="comment">
			<hb-comment ref="hbComment" @add="add" @del="del" @like="like" @focusOn="focusOn" :deleteTip="'确认删除？'"
			    :cmData="commentData" v-if="commentData"></hb-comment>
		</view>
		<!-- 分享功能 -->
		<popup-share :show.sync="showShare" :path="path" :config="config" :shareText="info.title"></popup-share>
		<!-- 底部操作栏 -->
		<view class="bottom-input">
		</view>
		<bottom-input v-if="showComment" @submit="submit"></bottom-input>
	</view>
</template>

<script>
	import {getCommentList,addComment,getPostInfo,commentLike,commentDel,queryCircleById,getConfig} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		components: {
		},
		data() {
			return {
				showComment: false, // 评论
				showShare: false, // 分享
				path: '',
				config: {},
				commentData: {
				},
				circleInfoData: {
					
				},
				info: {
					id:'',
					fileUrls:[],
					voteTicketList: []
				},
			}
		},
		onLoad(e) {
			
			this.init(e.id)
			this.path = '/pages/home/detail?id=' + this.info.id + '&pid='+uni.getStorageSync("user").id;
			let _this = this
			
			uni.$on('updateVote',function(data){
				_this.getPostInfos(_this.info.id)
			   
			})
			uni.$on('delPost',function(data){
				console.log(1)
				//帖子被删了 就去上一层
				uni.navigateBack()
			})
			this.getAppConfig()
		},
		onUnload() {
			uni.$off('updateVote')
			uni.$off('delPost')
		},
		// 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			switch (e.index) {
				case 0:
					// 分享
					this.showShare = true
					break;
			}
		},
		onBackPress() {
			this.showShare = false
		},
		// 监听：小程序中用户点击分享
		onShareAppMessage() {
			return {
				title: this.info.title,
				path: '/pages/home/detail?id=' + this.info.id
			}
		},
		methods: {
			// 初始化
			init(data) {
				this.info.id = data
				this.getPostInfos(this.info.id);
				
			},
			getAppConfig(){
				getConfig().then(data => {
					this.config = data	
				});
			},
			// 分享
			handleShare() {
				this.showShare = true
			},
			
			// 输入框聚焦
			focusOn() {
				
			},
			//获取帖子详情
			getPostInfos(tid){
				getPostInfo({'tid':tid}).then(data => {
					this.info = data
					uni.setNavigationBarTitle({
						title: this.info.title
					})
					this.getComment(this.info.id)
					this.circleInfo(this.info.circleId)
				});
			},
			circleInfo(circleId){
				queryCircleById({'id':circleId}).then(data => {
					this.circleInfoData = data
				});
			},
			// 获取评论
			getComment(tid) {
				getCommentList({'tid':tid}).then(data => {
					this.commentData = {
						"readNumer": this.info.readNumer,
						"commentSize": data.list.length,
						"comment": this.getTree(data.list),
						"deleOk":data.deleOk
					};
				});
			},
			// 新增评论
			add(req) {
				console.log(this.info)
				console.log(req)
				// TODO 接入真实接口
				let params = {
					"tid": this.info.id,
					"pid": req.pId,
					"content": req.content
				}
				console.log(params)
				addComment(params).then(data => {
					uni.showToast({
						title: '操作成功！',
						duration: 3000
					});
					this.$refs.hbComment.addComplete();
					this.getComment(this.info.id);
				});
			},
			// 点赞评论
			like(commentId) {
				commentLike({"commentId":commentId}).then(data => {
					this.$refs.hbComment.likeComplete(commentId);
				});
				
			},
			// 删除评论
			del(commentId) {
				commentDel({"commentId":commentId}).then(data => {
					this.$refs.hbComment.deleteComplete(commentId);
				});
			},
			
			getTree(data) {
			    let result = [];
			    let map = {};
			    data.forEach(item => {
			        map[item.id] = item;
			    });
			    data.forEach(item => {
			        let parent = map[item.parentId];
			        if (parent) {
			            (parent.children || (parent.children = [])).push(item);
			        } else {
			            result.push(item);
			        }
			    });
			    return result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		.comment {
			display: flex;
			margin: 20rpx;

			.comment-text {
				max-width: calc(100vw - 160rpx);
			}

			.comment-replay {
				height: 40rpx;
			}
		}

		.bottom-input {
			height: 100rpx;
		}
	}
</style>
