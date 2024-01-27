<template>
	<view>
		<view  class="dynamic" >
			<view class="user__container" :style="'display: '+userDisplay+';'">
				<view class="user__header-warp">
					<!-- 头像组 -->
					<view class="user__header" @click.stop="clickUser(userId)">
						<image class="user__header-image" :src="avatar" mode="aspectFill"></image>
					</view>
				</view>
				<view class="user__content">
					<view class="user__content-main">
						<view class="name-item"  @click.stop="clickUser(userId)">
							<text class="user__content-title uni-ellipsis">{{ name }}</text>
							<!-- <span style="color: #0000ff;" v-if="gender == 0">♂</span>
							<span style="color: #fc0107;" v-if="gender == 1">♀</span> -->
							<image class="vip" v-if="isVip()" src="../../static/image/travel/personal/vip04.png"></image>
							<span class="jb" v-if="postRole == 1">嘉宾</span>
							<span class="gl" v-if="postRole == 2">管理</span>
							<span class="qz" v-if="postRole == 3">圈主</span>
						</view>
						<text class="user__content-note uni-ellipsis">{{ publishTime }}</text>
					</view>
					<view class="user__content-extra">
						<slot>
							<u-icon @click="showPopup(userId)" name="more-dot-fill"></u-icon>
						</slot>
					</view>
				</view>
			</view>
			<u-action-sheet  round="20" :actions="actionList" :show="actionShow"
				:safeAreaInsetBottom="true" cancelText="取消" @select="selectAction" @close="actionShow = false">
			</u-action-sheet>
			<!-- 帖子内容 -->
			<view class="postContent">
				<view  v-if="postClass == 0">
					<view class="text" @click="clickDynamic(tid)" v-if="payType != 1 || payOk">
						<image v-if="essenceShow && essence == 1" src="../../static/img/jiajing.png" style="width: 20px;height: 20px;"></image>
						<image v-if="isCircle && topping == 1" src="../../static/img/top.png" style="width: 20px;height: 20px;"></image>
						{{content}}
					</view>
					<view class="imgList" v-if="fileType == 0">
						<view class="images" v-for="(item,index) in imgList" :key="index">
							<image @click.stop="previewImg(index)"  :src="item" mode="aspectFill" :style="{width:imgWidth+'px','max-height':imgHeight+'px'}"></image>
						</view>
					</view>
					<view class="imgList" v-else>
						<view  class="images">
							<!-- #ifdef APP-PLUS -->
							<view v-if="isDetail">
								<view class="oneimg" :style="{width:imgWidth+'px','max-height':imgHeight+'px'}" @click="playVideo(imgList[0])">
									<ls-dom-video
									ref="domVideo"
									controls="true"
									autoplay="true"
									:src="imgList[0]"
									></ls-dom-video>
									<!-- <image :src="image" mode="aspectFill" :style="{width:imgWidth+'px','max-height':imgHeight+'px'}"></image>
									<view class="bofang">
										<image src="../../static/play1.png" style="width: 40px;height: 40px;" mode=""></image>
									</view> -->
								</view>
							</view>
							<view v-else>
								<!-- <video :src="imgList[0]"  mode="aspectFill" :style="{width:imgWidth+'px','max-height':imgHeight+'px'}" :poster="image"></video> -->
								<ls-dom-video
								ref="domVideo"
								controls="true"
								:src="imgList[0]"
								></ls-dom-video>
							</view>
							<!-- #endif -->
							<!-- #ifndef APP-PLUS -->
							<video :src="imgList[0]" mode="aspectFill" :style="{width:imgWidth+'px','max-height':imgHeight+'px'}" :poster="image"></video>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
			<view class="locateAndDiscuss">
				<view class="locate">
					<u-icon name="map-fill"></u-icon>
					<text>{{ipLocate}}</text>
				</view>
				<view class="discuss" v-if="discussId">
					<text>#{{discuss}}#</text>
				</view>
				<view class="circle" v-if="!isDetail" @click="goToCircle(circleId)">
					<u-icon name="moments"></u-icon>
					<text>{{circleName}}</text>
				</view>
			</view>
			<view class="operate"  :style="'display: '+operateDisplay+';'">
				<view class="operate-wap" @click="clickThumbsup(tid)">
					<image class="operate-icon" :src="isLike >= 1?thumbUpImg:thumbImg" mode="aspectFill"></image>
					<view  class="operate-text"  :style="'color:'+ (isLike >=1?operateUpColor:operateColor)">{{likeNumber?likeNumber:'点赞'}}</view>
				</view>
				<view class="operate-wap" v-if="plShow" @click="clickDynamic(tid)">
					<image class="operate-icon" :src="commentsImg" mode="aspectFill"></image>
					<view  class="operate-text" :style="'color:'+ operateColor">{{chatNumber?chatNumber:'评论'}}</view>
				</view>
				<view class="operate-wap" v-if="sendMsg" @click="sendToMsg()">
					<image class="operate-icon" :src="commentsImg" mode="aspectFill"></image>
					<view  class="operate-text" :style="'color:'+ operateColor">私聊</view>
				</view>
			</view>
		</view>
		<view class="bottom-line"></view>
		<u-modal :show="show" title="付费提醒" content='本次付费内容为虚拟内容服务，不支持退款，请再次确认是否付费付费?' confirmText="确认付费" :showConfirmButton="true" :showCancelButton="true" :closeOnClickOverlay="true" @confirm='buyPostPay()' @cancel='show=false' @close='show=false'></u-modal>
	</view>
</template>

<script>
	import {like,buyPost,openRed,isJoinCircle,isFollow,follow,vote,delPost,essenceapi,setTop,getRewardMoney,reward} from '@/utils/lib/api.js';  //引入需要的api
	
	export default {
		props: {
			avatar: {
				type: String
			},
			ipLocate: {
				type: String
			},
			name: {
				type: String
			},
			publishTime: {
				type: String
			},
			voteTime: {
				type: String
			},
			voteType: {
				type: String
			},
			discussId: {
				type: String
			},
			isFocusOn: {
				type: Boolean
			},
			payOk: {
				type: Boolean
			},
			postRole: {
				type: Number
			},
			isDetail: {
				type: Boolean
			},
			voteContent: {
				type: String
			},
			image: {
				type: String
			},
			content: {
				type: String
			},
			sendMsg: {
				type: Boolean
			},
			payPrice: {
				type: String
			},
			tid: {
				type: String
			},
			imgList: {
				type: Array
			},
			voteTicketList: {
				type: Array
			},
			isLike: {
				type: Number
			},
			postClass: {
				type: Number
			},
			isGiveReward: {
				type: Boolean
			},
			index: {
				type: Number
			},
			isCircle:{
				type: Boolean,
				default: false
			},
			showFocus: {
				type: Boolean
			},
			plShow: {
				type: Boolean
			},
			voteOver: {
				type: Boolean
			},
			likeNumber: {
				type: Number
			},
			payType: {
				type: Number
			},
			userId: {
				type: Number
			},
			fileType: {
				type: Number
			},
			giveRewardNumber: {
				type: Number
			},
			chatNumber: {
				type: Number
			},
			userNoShow: {
				type: Boolean
			},
			operateNoShow: {
				type: Boolean
			},
			sourceShow: {
				type: Boolean
			},
			essenceShow: {
				type: Boolean
			},
			essence: {
				type: Number
			},
			topping: {
				type: Number
			},
			sourceImg: {
				type: String
			},
			sourceTitle: {
				type: String
			},
			sourceAuthor: {
				type: String
			},
			circleName: {
				type: String
			},
			redPkgOver: {
				type: String
			},
			circleId: {
				type: String
			},
			role: {
				type: String
			},
			vipDate:{
				type: String
			}
		},
		data() {
			return {
				show: false,
				videoplay: false,
				actionShow: false,
				videoUrl:'',
				isFollow: false,
				postUserIsMe: false,
				actionList: [
					
				],
				money: '',//如果红包是用户抢的也就是红包当前状态是0和3 那么就显示金额 否则就显示过期了 已抢完
				
				//选中的投票
		
				windowsState: false,
				windowWidth:0,	//屏幕可用宽度
				windowHeight:0,	//屏幕可用高度
				imgWidth: 0,	//图片宽度
				imgHeight: 0,	//图片高度
				userDisplay: 'flex',
				operateDisplay: 'block',
				sourceDisplay: 'none',
				operateColor: 'gray',
				operateUpColor: '#e85142',
				thumbImg:'../../static/img/image/dz_off.png',
				thumbUpImg:'../../static/img/image/dz_on.png',
				rewordImg:'../../static/img/image/medal.png',
				rewordUpImg:'../../static/img/image/medal-hover.png',
				commentsImg:'../../static/img/image/comments.png',
				//小程序定一个 要不props里面的值修改不了
				isLike: '',
				likeNumber: '',
				payOk: false
			}
		},
		mounted() {
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight;
			this.windowWidth = res.windowWidth;
			
			if(this.userNoShow){
				this.userDisplay = 'none';
			}
			if(this.operateNoShow){
				this.operateDisplay = 'none';
			}
			if(this.sourceShow){
				this.sourceDisplay = 'flex';
			}
			this.judgeImg();
		}, 
		created() {
		  if(uni.getStorageSync("user").id === this.userId){
			  this.postUserIsMe = true
		  }
		},
		methods: {
			// 预览图片
			previewImg(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index,
					longPressActions: {
						itemList: ['保存图片'],

					}
				})
			},
			// 自适应判断
			judgeImg() {
				// console.log(this.imgList)
				if (this.imgList.length == 1) {
					this.imgWidth = this.windowWidth*0.90;
					this.imgHeight = this.windowHeight*3/5;
				}else if (this.imgList.length == 4) {
					this.imgWidth = this.windowWidth/3.3;
					this.imgHeight = this.imgWidth;
				}else{
					this.imgWidth = this.windowWidth/3.5;
					this.imgHeight = this.imgWidth;
				}
			},
			sendToMsg(){
				uni.showToast({
				    icon: 'success',   
				    duration: 1000,
				    title: '暂未开放该功能!'
				});
			},
			
			/** 触发父级事件 */
			//不触发了 触发个卵 麻烦的很 就在这里做事了
			// 点击动态
			clickDynamic(tid){
				// this.$emit('clickDynamic');   跳转动态详情
				if(!this.isDetail){
					this.$u.route('pages/home/detail', {
						id: tid
					})
				}
			},
			// 点击用户信息
			clickUser(userId){
				// this.$emit('clickUser');   跳转用户个人中心 
				this.$u.route('pages/mine/userInfo', {
					id: userId
				})
				
			},
			goToCircle(id){
				isJoinCircle({"id":id}).then(data => {
					if(data){ // 在圈内
						this.$u.route('/pages/circle/circle', {
							id: id
						})
					}else{ //不在
						this.$u.route('/pages/circle/join-info', {
							id: id
						})
					}
				});
			},
			toDetails(tid){
				this.$u.route('pages/post/hb-info/hb-info', {
					tid: tid
				})
			},
			
			showPopup(userId){
				isFollow({'toUserId':userId}).then(data => {
					this.isFollow = data
					let list = [
						{
							name: data? '取消关注':'关注',
							type: 0
						},
						{
							name: '举报',
							type: 1
						}
					]
					
					//判断是不是圈子里面  然后再判断当前用户是否为管理员 或者帖子是不是自己的 或者是不是圈主
					//圈主和管理员有加精 置顶 删除功能   个人就只有删除
					if(userId == uni.getStorageSync('user').id || (this.role >= 2 && this.isCircle)){
						list.push(
							{
								name: '删除',
								type: 2
							}
						)
					}
					this.actionList = list
					this.actionShow = true
				});
			},
			// 选中操作菜单
			selectAction(e) {
				if(e.type == 0){
					this.follows();
				}else if(e.type == 1){
					if(this.userId == uni.getStorageSync('user').id){
						uni.showToast({
						    icon: 'error',   
						    duration: 1000,
						    title: '自己不能举报自己'
						});
						return;
					}
					//举报 
					this.$u.route('/pages/complaint/addcomplaint', {
						id: this.tid
					})
				}else if(e.type == 2){
					//删帖
					this.delePost();
				}else if(e.type == 3){
					this.top()
				}else if(e.type == 4){
					this.setEssence()
				}
				
			},
			follows(){
				follow({'toUserId':this.userId}).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: this.isFollow ? '取消关注成功':'关注成功'
					});
					this.actionShow = false
				});
			},
			delePost(){
				delPost({'tid':this.tid}).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: '删除成功'
					});
					this.actionShow = false
					uni.$emit('delPost',this.index)
				});
			},
			isVip(){
				let vip = new Date(this.vipDate);
				let today = new Date();
				if(vip>=today){
					return true
				}else{
					return false
				}
			},
			
			// 点赞
			clickThumbsup(id){
				// this.$emit('clickThumbsup');
				like({'tid':id}).then(data => {
					if(this.isLike >= 1){
						this.isLike = 0
						this.likeNumber = this.likeNumber - 1;
					}else{
						this.isLike = 1
						this.likeNumber = this.likeNumber + 1;
					}
				});
			},
			
			playVideo(url){
				let domVideo = this.$refs.domVideo
				domVideo.play()
			},
			
			
		}
	}
</script>

<style>
	@import "@/static/css/qizai.css"; 
</style>
<style lang="scss">
	@import "@/static/css/chat.scss"; 
</style>
