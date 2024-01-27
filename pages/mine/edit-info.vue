<template>
	<!-- 我的/设置/修改资料 -->
	<view class="edit-info wrap-card">
		<u-cell-group :border='false'>
			<u-cell title="头像" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleHeader">
				<image slot="value" class="header-img" :src="userInfo.avatar" mode="aspectFill"></image>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="昵称" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleName">
				<view slot="value">
					{{userInfo.nickName}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="个性签名" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleSignature">
				<view slot="value">
					{{userInfo.signature}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="性别" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleSex">
				<view slot="value">
					{{sexList[userInfo.gender]}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="生日" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}">
				<view slot="value">
					<uni-datetime-picker ref="birth" type="date" :clear-icon="false" v-model="userInfo.birth">{{userInfo.birth}}
					</uni-datetime-picker>
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF" @click="handleBirth"></u-icon>
			</u-cell>
			<u-cell title="情感" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleEmotion">
				<view slot="value">
					{{userInfo.emotion}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="职业" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="handleJob">
				<view slot="value">
					{{userInfo.job}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="家乡" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}"
				@click="showCity">
				<view slot="value">
					{{userInfo.city}}
				</view>
				<u-icon slot="right-icon" name="edit-pen" size="30" color="#9CA3AF"></u-icon>
			</u-cell>
			<u-cell title="个人中心背景" size="large" :border='false' :titleStyle="{fontSize:'32rpx',color:'#9CA3AF'}">
				
			</u-cell>
			<u-upload ref="upload" :fileList="bjList" @afterRead="handUploadBj" @delete="deletePicBj" name="1" multiple
				:maxCount="1" previewFullImage width="350"height="150" class="upload-item">
			</u-upload>
		</u-cell-group>
		<!-- 底部操作 -->
		<view class="wrap-bottom-bar">
			<view class="bar-placeholder"></view>
			<view class="bar-content">
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="submit">完成</u-button>
			</view>
		</view>
		<!-- 昵称 -->
		<uni-popup ref="inputDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="输入昵称" :value="userInfo.nickName" placeholder="请输入内容"
				@confirm="nameConfirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="signatureDialog" type="dialog">
			<uni-popup-dialog ref="inputClose" mode="input" title="个性签名" :value="userInfo.signature" placeholder="请输入内容"
				@confirm="signatureConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 城市选择 -->
		<city-picker themeColor="#007AFF" ref="cityPicker" :pickerValueDefault="cityDefault" @onConfirm="confirmCity">
		</city-picker>
	</view>
</template>

<script>
	import {getUserById,uplodaFiles,updateUserByUserId} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				form: {
					avatar: '/static/img/header/a.svg',
					username: 'MrThinco',
					sex: 0,
					emotion: 1,
					bgImg: '',
					job: 0,
					birth: '2005-10-01',
					city: '上海浦东区'
				},
				//背景
				bjList: [],
				sexList: ['男', '女', '保密'],
				emoList: ['未婚', '已婚', '离异', '保密'],
				jobList: ['行政类', '财务类', '销售类', '技术类', '设计类', '市场营销类', '其他'],
				cityDefault: [0, 0, 1],
				// 按钮配置
				btnStyle: {
					width: "90%",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx",
				},
				userInfo: {
					avatar: ''
				}
			}
		},
		onLoad(e) {
			this.getUserPost()
		},
		methods: {
			// 用户信息
			getUserPost(){
				getUserById().then(data => {
					
					this.userInfo = data;
					if(this.userInfo.bgImg){
						let url = this.userInfo.bgImg
						this.bjList.push({
							url,
							status: '',
							message: ''
						})
					}
				});
			},
			//文件上传
			
			// 修改头像
			handleHeader() {
				var _this =this;
				// 选择图片
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						//上传图片
						uplodaFiles(res.tempFilePaths[0]).then(data => {
							_this.userInfo.avatar = data.data.file
							// console.log(this.avatar)
						});
						
						
					}
				})
			},
			// 修改昵称
			handleName() {
				this.$refs.inputDialog.open()
			},
			
			nameConfirm(val) {
				this.userInfo.nickName = val
			},
			handleSignature() {
				this.$refs.signatureDialog.open()
			},
			signatureConfirm(val) {
				this.userInfo.signature = val
			},
			// 修改性别
			handleSex() {
				const _this = this
				uni.showActionSheet({
					itemList: this.sexList,
					success: function(res) {
						_this.userInfo.gender = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改生日
			handleBirth() {
				this.$refs.birth.show()
			},
			// 修改情感
			handleEmotion() {
				const _this = this
				uni.showActionSheet({
					itemList: _this.emoList,
					success: function(res) {
						_this.userInfo.emotion = _this.emoList[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				})
			},
			// 修改职业
			handleJob() {
				const _this = this
				uni.showActionSheet({
					itemList: _this.jobList,
					success: function(res) {
						_this.userInfo.job = _this.jobList[res.tapIndex]
					},
					fail: function(res) {
						console.log(res.errMsg)
					}
				})
			},
			// 修改城市
			confirmCity(e) {
				
				this.userInfo.city = e.label
			},
			showCity() {
				this.$refs.cityPicker.show()
			},
			// 提交
			submit() {
				if(this.bjList.length > 0){
					this.userInfo.bgImg = this.bjList[0].url
				}
				updateUserByUserId(this.userInfo).then(data => {
					// this.$refs.hbComment.deleteComplete(commentId);
					uni.showToast({
					    icon: 'none',   
					    duration: 3000,
					    title: '修改成功'
					});
				});
				
			},
			// 删除背景图片
			deletePicBj(event) {
				this.bjList.splice(event.index, 1)
			},
			// 手动上传
			async handUploadBj(event){
				uplodaFiles(event.file[0].url).then(data => {
					let url = data.data.file;
					this.bjList.push({
						url,
						status: '',
						message: ''
					})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-info {
		.header-img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			margin-right: 10rpx;
		}
	}
	.upload-item{
		align-items: center;
	}
</style>
