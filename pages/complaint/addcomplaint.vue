<template>
	<view class="complaint_warp">
		<view class="create_complaint">
			<view class="common_warp com_type">
				<view class="common_title com_type_title">
					<text style="color: #C82A29;">*</text>问题类型
				</view>
				<view class="type_select">
					<view class="sel_contents" :class="complaintForm.type==item.type?'sel_active':''"
						v-for="(item,index) in typeList" :key="item.type" @click="handlerSelectType(item.type,item.reasons)">
						{{item.reasons}}
					</view>
				</view>
			</view>
			<!-- <view class="common_warp">
				<view class="common_title">
					<text style="color: #C82A29;">*</text>联系方式
				</view>
				<view class="connact_tel">
					<input class="tel_input" placeholder-style="font-size:24rpx; font-weight:normal;color: #9FA1A8;" type="text" v-model="complaintForm.phone" placeholder="请输入手机号码">
				</view>
			</view> -->
			<view class="common_warp">
				<view class="common_title">
					<text style="color: #C82A29;">*</text>问题描述与凭证
				</view>
				<view class="connact_tel question_text">
					<textarea v-model="complaintForm.content"
						placeholder="请描述具体投诉反馈内容（包含但不限于投诉原因、预期解决方案等）并上传相关凭证图片（包含但不限于课程问题截图、对话截图等"
						 placeholder-style="font-size:24rpx; font-weight:normal;color: #9FA1A8; line-height:30rpx;"
						class="question_cons" :maxlength="200" />
					<view class="text_num">
						{{complaintForm.content.length}}/200
					</view>
				</view>
				<view class="upload_img">
					<u-upload ref="upload" :fileList="complaintForm.imgs" @afterRead="autoUpload" @delete="deletePic" name="1" multiple
						:maxCount="9" previewFullImage>
					</u-upload>
				</view>
			</view>
			
			<view class="btn_warp">
				<view class="btn_left" @click="gotoBack">
					返回
				</view>
				<view class="btn_left btn_right" @click="gotoSubmit">
					提交
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {uplodaFiles,addReport} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				complaintForm: {
					type:'',
					content:'',
					postId:'',
					fileUrls: [],
					imgs:[]
				},
				typeList:[
					{
						type: 2,
						reasons: '涉黄'
					},
					{
						type: 3,
						reasons: '涉政'
					},
					{
						type: 4,
						reasons: '涉恐'
					},
					{
						type: 5,
						reasons: '辱骂'
					},
					{
						type: 6,
						reasons: '其他问题'
					},
					
				]
			}
		},
		onLoad(e) {
			this.complaintForm.postId = e.id
		},
		methods: {
			handlerSelectType(id,name) {
				this.complaintForm.type = id
				this.complaintForm.reasons = name
				console.log(this.complaintForm, 'this.complaintForm')
			},
			// 自动上传
			async autoUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.complaintForm.imgs.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.complaintForm.imgs.push({
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
					let item = this.complaintForm.imgs[fileListLen]
					// 改变最后一个文件信息：状态、url
					this.complaintForm.imgs.splice(fileListLen, 1, Object.assign(item, {
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
				this.complaintForm.imgs.splice(event.index, 1)
			},
			gotoBack(){
				uni.navigateBack({
					delta:1
				})
			},
			async gotoSubmit(){
				console.log(this.complaintForm)
				if(this.complaintForm.imgs.length == 0){
					uni.showToast({
					    icon: 'error',   
					    duration: 3000,
					    title: '请上传至少一张图片'
					});
					return;
				}
				this.complaintForm.fileUrls = []
				this.complaintForm.imgs.forEach((i,index)=>{
					this.complaintForm.fileUrls.push(i.url)
				})
				addReport(this.complaintForm).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: '发布成功!'
					});
					
					setTimeout(() => {
						this.complaintForm = {}
						uni.navigateBack()
					}, 1000);
				});
			}
		}
	}
</script>

<style>
	.create_complaint {
		width: 100%;
	}

	.com_type {
		padding-bottom: 20rpx;
	}

	.type_select {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.sel_contents {
		display: inline-block;
		padding: 14rpx 20rpx;
		box-sizing: border-box;
		border-radius: 100rpx;
		background: #F5F6FA;
		margin-right: 12rpx;
		color: #9FA1A8;
		font-family: PingFang SC;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 24rpx;
		margin-bottom: 20rpx;
	}

	.sel_active {
		background: #5475FF;
		color: #FFF;
	}

	.connact_tel {
		width: 100%;
		height: 88rpx;
		padding: 0 24rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		background: #F5F6FA;
		overflow: hidden;
	}

	.tel_input {
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
	}

	.question_text {
		height: 500rpx;
		position: relative;
		padding: 24rpx;
		margin-bottom: 20rpx;
	}

	.text_num {
		position: absolute;
		bottom: 24rpx;
		right: 24rpx;
		color: #9FA1A8;
		font-family: PingFang SC;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 28rpx;
	}

	.upload_img {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.upload_img_cons {
		width: 144rpx;
		height: 144rpx;
		background: #F5F6FA;
		position: relative;
		margin-bottom: 20rpx;

	}
	.img_for{
		margin-right: 12rpx;
	}
	.img_for:last-child{
		margin-right: 0;
	}
	.cons_image{
		display: block;
		width: 144rpx;
		height: 144rpx;
		border-radius: 12rpx;
	}

	.add_icon {
		width: 36rpx;
		height: 44rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

	}

	.icon_1 {
		width: 36rpx;
		height: 4rpx;
		border-radius: 20rpx;
		background: #9FA1A8;
	}

	.icon_2 {
		transform: rotate(-90deg);

	}

	.pic_num {
		color: #9FA1A8;
		font-family: PingFang SC;
		font-size: 22rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 28rpx;
		/* 127.273% */
		padding-top: 24rpx;
	}
	.close_icon{
		width: 32rpx;
		height: 32rpx;
		display: block;
		position: absolute;
		top: -12rpx;
		right: -10rpx;
		z-index: 99;
	}
	.btn_warp{
		width: 100%;
		display: flex;
		justify-content: space-between;
		
	}
	.btn_left{
		width: 336rpx;
		height: 88rpx;
		border-radius: 12rpx;
		background: rgba(84, 117, 255, 0.10);
		color: #5475FF;
		text-align: center;
		font-family: PingFang SC;
		font-size: 30rpx;
		font-style: normal;
		font-weight: bold;
		line-height: 30rpx; /* 15px */
		display: flex;
		justify-content: center;
		align-items: center;

	}
	.btn_right{
		background: linear-gradient(-45deg,#01906c,#34D399);
		color: #FFF;
	}
</style>
