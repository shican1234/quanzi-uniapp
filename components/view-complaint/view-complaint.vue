<template>
	<view class="view_com">
		<view class="common_warp">
			<view class="view_type">
				<view class="common_title type_title">
					<text style="color: #C82A29;">*</text>问题类型
				</view>
				<view class="type_cons">
					{{dataInfo.type_name}}
				</view>
				<view class="type_status" :class="dataInfo.status==2?'type_status_active':''">
					{{dataInfo.status==2?'已处理':'待回复'}}
				</view>
			</view>
			<view class="view_type tel_cons">
				<view class="common_title type_title">
					<text style="color: #C82A29;">*</text>联系方式
				</view>
				<view class="type_cons">
					{{dataInfo.phone}}
				</view>
			</view>
			<view class="view_type tel_cons none_border">
				<view class="common_title type_title">
					<text style="color: #C82A29;">*</text>问题描述与凭证
				</view>
				<view class="text_cons">
					{{dataInfo.desc}}
				</view>
			</view>
			<view class="upload_img">
				<view class="upload_img_cons img_for" v-for="(item,index) in dataInfo.imgs">
					<image class="cons_image" :src="item" mode="aspectFill"></image>
				</view>
			</view>
			
		</view>
		
		<view class="common_warp" v-if='dataInfo.a_remark'>
			<view class="common_title type_title">
				平台回复
			</view>
			<view class="text_cons">
				{{dataInfo.a_remark}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			dataInfo:{
				type: Object,
				default: {}
			}
		}
	}
</script>

<style scoped>
	.view_type{
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #EEE;
		padding-bottom: 32rpx;
	}
	.type_title{
		flex-shrink: 0;
		margin-right: 32rpx;
		margin-bottom: 0;
	}
	.type_cons{
		flex: 1;
		color: #999;
		font-family: PingFang SC;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 24rpx; /* 100% */
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tel_cons{
		padding-top: 32rpx;
	}
	.none_border{
		border-bottom: none;
		display: block;
		
	}
	.type_status{
		flex-shrink: 0;
		width: 106rpx;
		height: 44rpx;
		border-radius: 40rpx;
		background: #ECF0FF;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #2E45F3;
		font-family: PingFang SC;
		font-size: 20rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 24rpx; /* 120% */
		
	}
	.type_status_active	{
		background: #F5F6FA;
		color: rgba(159, 161, 168, 0.60);
	}
	.text_cons{
		width: 100%;
		color: #999;
		font-family: PingFang SC;
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height:42rpx; /* 100% */
		padding-top: 24rpx;
	}
	.upload_img {
		width: 100%;
		display: flex;
	
	}
	.upload_img_cons {
		width: 144rpx;
		height: 144rpx;
		border-radius: 12rpx;
		background: #F5F6FA;
		overflow: hidden;
		position: relative;
	
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
	}
	
</style>