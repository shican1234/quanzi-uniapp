
#### 使用方法 
```使用方法
	

<!-- 提示框 -->
<cc-defineDialogBox ref="DialogBox"></cc-defineDialogBox>
			


			
		// 显示询问弹框
			showDialogBox() {
			    
				this.$refs['DialogBox'].confirm({
					title: '请确认您填写的手机号',
					content: '手机号码：13999999999?',
					DialogType: 'inquiry',
					animation: 0
				}).then((res)=>{
					
					console.log('res = ', JSON.stringify(res));
				})
			},
			
			// 显示输入弹框
			showDialogBoxInput() {
			    
				this.$refs['DialogBox'].confirm({
									title: '更改昵称',
									placeholder: '请输入修改的昵称',
									value: this.nickname,
									DialogType: 'input',
									animation: 0
								}).then((res)=>{
									// 输入框返回值res
									this.nickname = res.value;
								})
			},
						


```

#### HTML代码实现部分
```html


<template>
	<view class="content">

		<!-- 提示框 -->
		<cc-defineDialogBox ref="DialogBox"></cc-defineDialogBox>

		<!-- 显示询问弹框 -->
		<button @click="showDialogBox"
			style="width: 160px; height: 50px;background-color: antiquewhite; margin-top: 26px;">显示询问弹框</button>

		<!-- 显示输入弹框 -->
		<button @click="showDialogBoxInput"
			style="width: 160px; height: 50px;background-color: antiquewhite; margin-top: 26px;">显示输入弹框</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickname: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {


			// 显示询问弹框
			showDialogBox() {

				this.$refs['DialogBox'].confirm({
					title: '请确认您填写的手机号',
					content: '手机号码：13999999999?',
					DialogType: 'inquiry',
					animation: 0
				}).then((res) => {

					console.log('res = ', JSON.stringify(res));
				})
			},

			// 显示输入弹框
			showDialogBoxInput() {

				this.$refs['DialogBox'].confirm({
					title: '更改昵称',
					placeholder: '请输入修改的昵称',
					value: this.nickname,
					DialogType: 'input',
					animation: 0
				}).then((res) => {
					// 输入框返回值res
					this.nickname = res.value;
				})
			},


		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;

	}
</style>

```
