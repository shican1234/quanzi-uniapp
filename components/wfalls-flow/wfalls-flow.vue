<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
            <view class="item" v-for="(item,index) of list.list" :key="index">
                <image @load="handleViewRender(listIndex,index)" @error="handleViewRender(listIndex,index)" :src="item.image" mode="widthFix"></image>
                <view class="desc">id:{{item.id+','+item.content}}</view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
        props:{
            list:{
                type:Array, //实际请求获取的列表数据
            }
        },
		data() {
			return {
                viewList:[{list:[]},{list:[]}],  //展示到视图的列表数据
                everyNum:2
			}
		},
		methods: {
            init(){
                this.viewList = [{list:[]},{list:[]}];
                setTimeout(()=>{
                    this.handleViewRender(0,0)
                },0)
            },
			handleViewRender(x,y){
                // console.log(x,y);
                // const num = (x+1)*(y+1);
                // console.log(num%(this.everyNum));
                // console.log(num);
                // if((num%(this.everyNum))!==0&&num!==1)return;
                // console.log(num,'----');
                const index = this.viewList.reduce((total,current)=>total + current.list.length,0)
                if(index>this.list.length-1) {
                    // 加载完成触发事件并返回加载过的图片数
                    this.$emit('finishLoad',index)
                    return
                };
                const query = uni.createSelectorQuery().in(this);
                let listFlag = 0;
                query.selectAll('#wf-list').boundingClientRect(data => {
                    listFlag = data[0].bottom - data[1].bottom<=0?0:1;
                    this.viewList[listFlag].list.push(this.list[index])
                    // this.list.slice(index,index+this.everyNum).forEach((item,index)=>{
                    //     const flag = listFlag===0?index&1:Number(!(index&1))
                    //     this.viewList[flag].list.push(item)
                    // })
                }).exec()
            },
		},
        mounted() {
            if(this.list.length){
                this.init()
            }
        }
	}
</script>

<style lang="stylus" scoped>
    .list-container
        display flex
        justify-content space-between
        align-items:flex-start
        padding 0 24rpx
        padding-top 30rpx
        .list
            width calc(50% - 8rpx)
            display flex
            flex-direction column
            .item
                margin-bottom 18rpx
                border 1px solid red
                image
                    width 100%
                .desc
                    padding 16rpx
                    font-size 28rpx
</style>