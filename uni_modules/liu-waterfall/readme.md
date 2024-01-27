# liu-waterfall适用于uni-app项目的瀑布流组件
### 本组件目前兼容微信小程序、H5
### 本组件是超级好用的瀑布流，根据内容自动计算进行流式布局，简单参数配置，支持多列布局(走过路过不要错过)
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用示例
``` 
<template>
	<view>
		<view class="bar-list">
			<view @click="columns=2" :style="columns==2?'background-color:red':''">2列</view>
			<view @click="columns=3" :style="columns==3?'background-color:red':''">3列</view>
			<view @click="columns=4" :style="columns==4?'background-color:red':''">4列</view>
		</view>
		<liu-waterfall :dataList="data" :column="columns" @click="click"></liu-waterfall>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg',
					title: '思考',
					desc: '我是第1个图片',
					id: 1,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',
					title: '兔子',
					desc: '我是第2个图片',
					id: 2,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg',
					title: '雨天',
					desc: '我是第3个图片',
					id: 3,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png',
					title: '日落',
					desc: '我是第4个图片',
					id: 4,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/11/29/19/05/boho-7625140_1280.jpg',
					title: '植物',
					desc: '我是第5个图片',
					id: 5,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/08/25/23/06/woman-7411414_1280.png',
					title: '时尚',
					desc: '我是第6个图片',
					id: 6,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2023/03/07/12/45/child-7835677_1280.jpg',
					title: '生活',
					desc: '我是第7个图片',
					id: 7,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg',
					title: '思考',
					desc: '我是第8个图片',
					id: 8,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2021/07/22/11/25/rabbit-6485072_1280.jpg',
					title: '兔子',
					desc: '我是第9个图片',
					id: 9,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg',
					title: '雨天',
					desc: '我是第10个图片',
					id: 10,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/11/29/19/05/boho-7625140_1280.jpg',
					title: '植物',
					desc: '我是第11个图片',
					id: 11,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2022/08/25/23/06/woman-7411414_1280.png',
					title: '时尚',
					desc: '我是第12个图片',
					id: 12,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2023/03/07/12/45/child-7835677_1280.jpg',
					title: '生活',
					desc: '我是第13个图片',
					id: 13,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/35/cartoon-5190860_1280.jpg',
					title: '雨天',
					desc: '我是第14个图片',
					id: 14,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2023/03/07/12/45/child-7835677_1280.jpg',
					title: '生活',
					desc: '我是第15个图片',
					id: 15,
				}, {
					picUrl: 'https://cdn.pixabay.com/photo/2020/05/19/13/32/cartoon-5190837_1280.jpg',
					title: '思考',
					desc: '我是第16个图片',
					id: 16,
				}],
				columns: 2,
			};
		},
		methods: {
			click(e) {
				console.log('点击内容', e)
			}
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #edeef2;
	}

	.bar-list {
		margin: 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;

		view {
			width: 33%;
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #FFFFFF;
			background-color: #59a3f8;
			border-radius: 8rpx;
			margin-right: 20rpx;
		}
	}
</style>
```

### 属性说明
| 名称                         | 类型            | 默认值                 | 描述             |
| ----------------------------|--------------- | ---------------------- | ---------------|
| dataList                    | Array          | []                     | 数据源
| column                      | Number         | 2                      | 显示列数
| margin                      | Number         | 10                     | 卡片margin(rpx)
| radius                      | Number         | 8                      | 卡片圆角(rpx)
| bgColor                     | String         | #edeef2                | 页面背景颜色
| cardBgColor                 | String         | #FFFFFF                | 卡片背景颜色
| @click                      | Function       |                        | 点击卡片回调事件

