<template>
	<!-- 首页/发布页 -->
	<view class="release">
		<!-- 自定义导航栏 -->
		<u-navbar :autoBack="true" placeholder>
			<view slot="center">
				<view class="flex justify-center items-center text-30 w-100">
					{{circleId ? "修改圈子":"创建圈子"}}
				</view>
			</view>
		</u-navbar>
		<view class="wrap-card">
			<view class="text-gray-500 my-20" v-if="!circleId">
				圈子分类
			</view>
			<!-- 搜索框 -->
			<view @click="getFenlei()" v-if="!circleId">
				<button><u--input
				v-model="className"
				disabled="true"
					    placeholder="请选择圈子分类"
					    suffixIcon="arrow-right"
					    suffixIconStyle="color: #909399"
					></u--input></button>
				<u-picker :show="show" :columns="columns" @cancel="show = false" @confirm="pickerConfirm" keyName="name"></u-picker>
			</view>
			<view class="text-gray-500 my-20">
				圈子名称
			</view>
			<u--input v-model="params.circleName" placeholder="请输入圈子名称" suffixIconStyle="color: #909399"></u--input>
			<!-- 文本域 -->
			<view class="text-gray-500 my-20">
				圈子介绍
			</view>
			<u-textarea v-model="params.circleIntroduce" maxlength='100' height="100" placeholder="请输入圈子介绍" count
				confirmType="done">
			</u-textarea>
			
			<view class="text-gray-500 my-20">
				圈子头像
			</view>
			<u-upload ref="upload" :fileList="avatarList" @afterRead="handUpload" @delete="deletePic" name="1" multiple
				:maxCount="1" previewFullImage>
			</u-upload>
			<view class="text-gray-500 my-20">
				圈子背景
			</view>
			<u-upload ref="upload" :fileList="bjList" @afterRead="handUploadBj" @delete="deletePicBj" name="1" multiple
				:maxCount="1" previewFullImage width="350"height="150">
			</u-upload>
		</view>
		<!-- 底部操作栏 -->
		<view class="bottom-handle">
				<view class="ml-auto mr-20">
					<u-button :text="circleId ? '修改':'创建'" color="linear-gradient(to right, #dcc20b, #01906c)"
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
	</view>
</template>

<script>
	import {queryCircleClass,uplodaFiles,addCircle,queryCircleById,updateCircle} from '@/utils/lib/api.js';  //引入需要的api
	export default {
		data() {
			return {
				show: false,
				//圈子分类
				columns: [
				],
				circleId: null,
				//分类名字
				className: '',
				
				//提交参数
				params: {
					circleClassId: '',//圈子分类ID
					circleIntroduce: '',//圈子介绍
					circleSculpture: '',//圈子头像
					circleBackground: '',//圈子背景图
					circleName: ''//圈子名字
				},
				//头像
				avatarList: [],
				//背景
				bjList: [],
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
			let circleId = e.circleId
			if(circleId){
				this.circleId = circleId
				this.getCircleInfo()
			}
			uni.setNavigationBarTitle({
				title: circleId ? "修改圈子":"创建圈子"
			})
			this.getCircleClass()
		},
		
		methods: {
			//选择圈子分类
			getFenlei(){
				this.show = true
			},
			pickerConfirm(e) {
			  // 点击确定
			  if (e.value.length) {
				  this.params.circleClassId = e.value[0].id;//分类ID
				  this.className = e.value[0].name;//分类名字
				}
			  this.show = false;
			},
			
			getCircleClass(){
				queryCircleClass().then(data => {
					this.columns.push(data)
				});
			},
			
			getCircleInfo(){
				queryCircleById({"id":this.circleId}).then(data => {
					this.params = data
					this.avatarList.push({
						url:this.params.circleSculpture,
						status: '',
						message: ''
					})
					this.bjList.push({
						url:this.params.circleBackground,
						status: '',
						message: ''
					})
				});
			},
			updateCircles(){
				// console.log(this.params)
				updateCircle(this.params).then(data => {
					uni.showToast({
					    icon: 'success',   
					    duration: 1000,
					    title: '修改成功'
					});
					setTimeout(() => {
						uni.$emit('updataCircle',{msg:data})
						uni.navigateBack();
					}, 1100);
				});
			},
			// 提交
			submit() {
				if(this.avatarList.length == 0){
					uni.showToast({
					    icon: 'error',   
					    duration: 3000,
					    title: '请上传圈子头像'
					});
					return;
				}
				if(this.bjList.length == 0){
					uni.showToast({
					    icon: 'error',   
					    duration: 3000,
					    title: '请上传圈子背景'
					});
					return;
				}
				
				this.params.circleSculpture = this.avatarList[0].url
				this.params.circleBackground = this.bjList[0].url
				//创建圈子的接口
				if(this.circleId){
					this.updateCircles()
				}else{
					addCircle(this.params).then(data => {
						uni.showToast({
						    icon: 'success',   
						    duration: 1000,
						    title: '创建成功'
						});
						setTimeout(() => {
							this.$u.route('/pages/circle/circle', {
								id: data.id
							})
						}, 1100);
					});
				}
			},
			// 关闭公告
			closePopup() {
				this.popupShow = false
			},
			// 删除图片
			deletePic(event) {
				this.avatarList.splice(event.index, 1)
			},
			// 手动上传
			async handUpload(event){
				uplodaFiles(event.file[0].url).then(data => {
					let url = data.data.file;
					this.avatarList.push({
						url,
						status: '',
						message: ''
					})
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
	}
</style>
