<template>
	<!-- 首页/发布页 -->
	<view class="release">
		<!-- 自定义导航栏 -->
		<u-navbar :autoBack="true" placeholder>
			<view slot="center">
				<view class="flex justify-center items-center text-30 w-100" @click="changeAction">
					{{actionCurrent}}
					<view class="iconfont iconxiala2"></view>
				</view>
			</view>
		</u-navbar>
		<view class="wrap-card">
			<view class="text-gray-500 my-20">
				标题
			</view>
			<u--textarea v-model="params.title" maxlength='10' height="20" placeholder="起个响亮的标题吧~" count
				confirmType="done">
			</u--textarea>
			<!-- 文本域 -->
			<view class="text-gray-500 my-20">
				想说点啥
			</view>
			<u--textarea v-model="params.content" maxlength='300' height="100" placeholder="随便说点儿什么吧..." count
				confirmType="return">
			</u--textarea>
			<view class="text-gray-500 my-20">
				所属圈子
			</view>
			<!-- 搜索框 -->
			<view @click="selectCircle()">
				<button><u--input
				v-model="circleName"
				disabled="true"
					    placeholder="请选择圈子"
					    suffixIcon="arrow-right"
					    suffixIconStyle="color: #909399"
					></u--input></button>
			</view>
			
			<!-- 上传多图 -->
			<view class="text-gray-500 my-20">
				分享图片
			</view>
			<u-upload ref="upload" :fileList="imgList" @afterRead="autoUpload" @delete="deletePic" name="1" multiple
				:maxCount="9" previewFullImage>
			</u-upload>
		</view>
		<!-- 底部操作栏 -->
		<view class="bottom-handle">
				<view class="ml-auto mr-20">
					<u-button text="发布" color="linear-gradient(to right, #dcc20b, #01906c)"
						:customStyle="{width:'150rpx',height:'60rpx'}" @click="submit"></u-button>
				</view>
		</view>
		<!-- 中间弹出公告栏 -->
		<u-popup :show="popupShow" round="20" mode="center" :customStyle="{width:'80%'}">
			<view class="flex flex-col justify-center items-center m-20">
				<view class="flex justify-center items-center">
					<image class="notice-img" src="/static/img/demo/summer.svg" mode="widthFix"></image>
				</view>
				<view class="flex flex-col my-20">
					<view>严禁发表以下信息：</view>
					<view>1、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的信息</view>
					<view>2、侮辱或者诽谤他人，侵害他人合法权益的信息</view>
					<view>3、煽动民族仇恨、民族歧视，破坏民族团结的信息</view>
				</view>
				<u-button :customStyle="btnStyle" :ripple="true" shape="circle" @click="closePopup">朕知道了</u-button>
			</view>
		</u-popup>
		<!-- 底部弹出操作菜单 -->
		<u-action-sheet :description="actionDesc" round="20" :actions="actionList" :show="actionShow"
			:safeAreaInsetBottom="true" cancelText="取消" @select="selectAction" @close="actionShow = false">
		</u-action-sheet>
	</view>
</template>

<script>
	import {uplodaFiles,addPostByImg} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				textContent: '',
				// 操作菜单
				actionCurrent: '所有人可见',
				actionDesc: '请设置您本条信息的访问权限',
				actionList: [{
						name: '所有人可见',
						type: 0
					},
					{
						name: '仅圈内',
						type: 1
					}
				],
				circleName: '',
				payName:'',
				
				params: {
					circleId:'',
					type: 0,
					title: '',
					fileUrls: [],
					content: ''
				},
				actionShow: false,
				// 图片列表
				imgList: [
					
				],
				// 弹窗公告
				popupShow: true,
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
		// 监听返回按钮
		onBackPress() {
			
		},
		onLoad(e) {
			var _this = this;
			let circleName = e.circleName
			
			let circleId = e.circleId
			if(circleId && circleId){
				this.params.circleId = circleId
				this.circleName = circleName
			}
			
		var _this = this;
			uni.$on("selectCircle",(data)=>{
				 _this.circleName = data.data.circleName
				 _this.params.circleId = data.data.id
				 
			 })
		},
		onUnload() {
			uni.$off('selectCircle')  
		},
		methods: {
			
			selectCircle(){
				this.$u.route('/pages/post/myCircleList/myCircleList')
			},
		
			
			// 提交
			submit() {
				if(this.imgList.length == 0){
					uni.showToast({
					    icon: 'error',   
					    duration: 3000,
					    title: '请上传至少一张图片'
					});
					return;
				}
				this.params.fileUrls = []
				this.imgList.forEach((i,index)=>{
					this.params.fileUrls.push(i.url)
				})
				addPostByImg(this.params).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: '发布成功!'
					});
					
					setTimeout(() => {
						this.params = {}
						this.$u.route('pages/home/detail', {
							id: data
						})
					}, 1000);
				});

				
			},
			// 选择访问
			changeAction() {
				this.actionShow = true
			},
			// 选中操作菜单
			selectAction(e) {
				this.params.type = e.type
				this.actionCurrent = e.name
				this.actionShow = false
			},
			// 关闭公告
			closePopup() {
				this.popupShow = false
			},
			// 删除图片
			deletePic(event) {
				this.imgList.splice(event.index, 1)
			},
			// 自动上传
			async autoUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.imgList.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.imgList.push({
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
					let item = this.imgList[fileListLen]
					// 改变最后一个文件信息：状态、url
					this.imgList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url
					}))
					// 文件索引后移一位
					fileListLen++
				}
			},
			// 手动上传
			async handUpload(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				let fileListLen = this.imgList.length // 原始文件列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.imgList.push({
						...item,
						status: '',
						message: ''
					})
				})
			},
			// 手动上传提交
			async handUploadSubmit() {
				if (!this.imgList.length) return uni.showToast({
					title: '请选择文件',
					icon: 'none'
				})
				let imgList = []
				for (let index of this.imgList) {
					let url = this.imgList[index].url
					// 上传本地文件
					if (url.startsWith('blob')) url = await this.uploadFilePromise(url)
					imgList[index] = url
				}
				this.form.imgs = imgList.join(',')
			},
			// 上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uplodaFiles(url).then(data => {
						resolve(data.data.file)
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release {
		.notice-img {
			height: 300rpx;
			width: 300rpx;
		}

		.bottom-handle {
			border-top: 1px solid $uni-border-color1;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			height: 85rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
		}
	}
	button{
		margin: 0;
		padding: 0;
		outline: none;
		border-radius: 0;
		background-color: transparent;
		line-height: inherit;
	}
	button::after{
		border: none;
	}
	.payOkText{
		display: inline-flex;
		align-items: center; /* 垂直居中 */
		
		
	}
	.payOkSw{
		display: inline-flex;
		align-items: center; /* 垂直居中 */
		
		margin-left: auto;
		image{
			width: 20px;
			height: 20px;
		}
	}
</style>
