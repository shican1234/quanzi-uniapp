<template>
	<view class="feedback-body">

		<text class="text-black">问题反馈和意见建议
			<text style="color: red;">*</text></text>
		<textarea placeholder="请描述您遇到的问题或对本产品的建议..." v-model="sendData.feedbackContent" class="feedback-textare" maxlength="-1"/>

		<view class="image-title">
			<text class="text-black">上传问题截图<text class="text-grey"> (选填，最多可上传{{maxCount}}张)
				</text>
			</text>
			<view class="text-grey">{{ sendData.img.length }}/{{maxCount}}</view>
		</view>
		<view class="filepicker">
			<u-upload ref="upload" :fileList="sendData.img" @afterRead="autoUpload" @delete="deletePic" name="1" multiple
				:maxCount="maxCount" previewFullImage>
			</u-upload>
		</view>
		
		<text class="text-black">联系名称</text>
		<input class="feedback-input" v-model="sendData.userName" placeholder="请输入您的手机号" />

		<text class="text-black">联系方式</text>
		<text style="color: red;">*</text></text>
		<input class="feedback-input" v-model="sendData.contactInformation" placeholder="请输入您的手机号" />
		<view class="btn">
			<!-- <button :disabled="!sendData.feedbackContent" type="primary">
				
			</button>
			<button :disabled="!sendData.contactInformation" type="primary"  @click="submit">
			</button> -->
		
			<u-button :customStyle="btnStyle" :ripple="true" :disabled="!sendData.feedbackContent || !sendData.contactInformation" shape="circle" @click="submit">提交</u-button>
		</view>

	</view>
</template>

<script>
	import {saveFeedback,uplodaFiles} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				sendData: {
					feedbackContent: '', //反馈内容
					contactInformation: '', //联系方式
					img: [],//反馈图片集合
					fileUrls: [],
					userName: ''//反馈用户联系方式
				},
				// 按钮配置
				btnStyle: {
					width: "450rpx",
					height: "75rpx",
					background: "linear-gradient(-45deg,#01906c,#34D399)",
					color: "#FFFFFF",
					fontSize: "30rpx"
				},
				maxCount: 9,
				btnLoading: false
			};
		},
		onLoad() {

		},
		methods: {
			// 提交
			submit() {
				// if(this.sendData.img.length == 0){
				// 	uni.showToast({
				// 	    icon: 'error',   
				// 	    duration: 3000,
				// 	    title: '请上传至少一张图片'
				// 	});
				// 	return;
				// }
				this.sendData.fileUrls = []
				this.sendData.img.forEach((i,index)=>{
					this.sendData.fileUrls.push(i.url)
				})
				saveFeedback(this.sendData).then(data => {
					// this.$refs.hbComment.deleteComplete(commentId);
					console.log(this.sendData)
					uni.showToast({
					    icon: 'none',   
					    duration: 3000,
					    title: '反馈提交成功,请等待客服人员回复!'
					})
					setTimeout(() => {
						this.sendData = {}
						uni.navigateBack();
					}, 1000);
				});
			},
			// 自动上传
			async autoUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.sendData.img.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.sendData.img.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				// 遍历选中的文件依次上传
				for (let i = 0; i < chooseList.length; i++) {
					// 上传成功后返回数据
					const url = await this.uploadFilePromise(chooseList[i].url)
					// 获取当前文件信息：原始文件列表长度，就是当前新增开始的索引
					let item = this.sendData.img[fileListLen]
					// 改变最后一个文件信息：状态、url
					this.sendData.img.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url
					}))
					// 文件索引后移一位
					fileListLen++
				}
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uplodaFiles(url).then(data => {
						resolve(data.data.file)
					});
				})
			},
			// 删除图片
			deletePic(event) {
				this.sendData.img.splice(event.index, 1)
			},
			
		}
	};
</script>

<style>
	.text-black {
		color: #303133;
		font-size: 32rpx;
	}

	.text-grey {
		color: #BCBCBC;
		font-size: 24rpx;
		margin-left: 15rpx;
	}

	.feedback-quick {
		padding-right: 10rpx;
		color: #606266;
		font-size: 32rpx;
	}

	.feedback-body {
		padding: 30rpx;
	}

	.feedback-textare {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		height: 266rpx;
		color: #303133;
		font-size: 28rpx;
		line-height: 2em;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
		background-color: #F5F6F8;
	}

	.feedback-input {
		font-size: 28rpx;
		color: #303133;
		background-color: #F5F6F8;
		border-radius: 20rpx;
		height: 100rpx;
		min-height: 100rpx;
		padding: 0 30rpx;
		margin-top: 30rpx;
		margin-bottom: 60rpx;
	}



	.btn-submit {
		border-radius: 20rpx;
		color: #FFFFFF;
		margin-top: 100rpx;
		background-color: #007AFF;
		margin-bottom: 70rpx;
	}

	.image-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #606266;

	}

	.filepicker {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 0 ;
		right: 0;
		margin: 30rpx 30rpx 60rpx 30rpx;
	}
</style>
