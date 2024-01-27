<template>
  <view class="focus">
    <view class="item" v-for="(item, index) in list" :key="index">
      <view class="image" @click="clickUser(item.id)">
        <image :src="item.avatar"></image>
      </view>
      <view class="cent" @click="clickUser(item.id)">
		<view class="name-item">
			<text class="nick">
				{{ item.nickName }}
			</text>
			<span style="color: #0000ff;" v-if="item.gender == 0">♂</span>
			<span style="color: #fc0107;" v-if="item.gender == 1">♀</span>
		</view>
        
        <text class="text">{{item.fansCount}}粉丝 / {{item.postCount}}帖子</text>
        <text class="text">{{ item.createTime }} 注册</text>
      </view>
      <view class="follow"  @click="click(item,index)">
        <text style="font-size: 12px;">操作</text>
      </view>
    </view>
	<u-action-sheet  round="20" :actions="actionList" :show="actionShow"
		:safeAreaInsetBottom="true" cancelText="取消" @select="selectAction" @close="actionShow = false">
	</u-action-sheet>
	<u-loadmore :status="loadStatus" color="#9CA3AF" >
	</u-loadmore>
  </view>
</template>

<script>
	import {hotBlogger,isFollow,follow} from '@/utils/lib/api.js';  //引入需要的api
export default {
  data() {
    return {
	  circleId: '',
	  page: 0,
	  pageOk: true,
	  isFollow: false,
	  circleUser: {},
	  loadStatus: 'loadmore',
	  actionShow: false,
	  selectUser: {},
	  selectIndex: '',
	  actionList: [
	  ],
      list: [
        
      ],
    };
  },
  onLoad(e) {
	  this.getUserList();
  },
  // 触底事件
  onReachBottom() {
	console.log(1)
  	this.loadMore()
  },
  onPullDownRefresh() {
  	this.page = 0;
  	this.pageOk = true;
  	this.loadStatus = 'loadmore';
  	this.getUserList();
  	uni.stopPullDownRefresh();
  },
  methods: {
    click(user,index) {
	  isFollow({'toUserId':user.id}).then(data => {
	  	this.isFollow = data
	  	this.actionList = [
	  		{
	  			name: data? '取消关注':'关注',
	  			type: 0
	  		}
	  	]
	  	this.selectUser = user
	  	this.selectIndex = index
	  	this.actionShow = true
	  });
	
	 
    },
	getUserList(){
		hotBlogger({"page":this.page}).then(data => {
			this.list = this.list.concat(data)
			if(data.length >=10){
				this.page = this.page + 1;
				this.loadStatus = 'loadmore';
			}else{
				this.pageOk = false
				this.loadStatus = 'nomore';
			}
		});
		
	},
	follows(){
		follow({'toUserId':this.selectUser.id}).then(data => {
			uni.showToast({
			    icon: 'success',   
			    duration: 1000,
			    title: this.isFollow ? '取消关注成功':'关注成功'
			});
			this.actionShow = false
		});
	},
	// 加载更多
	loadMore() {
		if(this.pageOk){
			this.getUserList()
		}
	},
	// 选中操作菜单
	selectAction(e) {
		console.log(e)
		if(e.type == 0){
			this.follows()
		}else if(e.type == 1){
		}
	},
	// 点击用户信息
	clickUser(userId){
		// 跳转用户个人中心 
		this.$u.route('pages/mine/userInfo', {
			id: userId
		})
		
	}
  },
};
</script>

<style lang="scss" scoped>
.focus {
  height: 100%;
  background-color: #ffffff;
  padding: 40rpx 32rpx;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 52rpx;
    .image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 60rpx;
      > image {
        width: 120rpx;
        height: 120rpx;
      }
    }
    .cent {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 32rpx;
      .nick {
        font-family: OpenSans-Bold;
        font-size: 28rpx;
        font-weight: bold;
        line-height: 40rpx;
        letter-spacing: 0rpx;
        color: #0d0e15;
      }
      .text {
        font-family: OpenSans;
        font-size: 24rpx;
        font-weight: normal;
        line-height: 38rpx;
        letter-spacing: 0rpx;
        color: #768196;
      }
    }
    .follow {
      width: 198rpx;
      height: 60rpx;
      text-align: center;
      border-radius: 12rpx;
      background: linear-gradient(287deg, #dc4dce 0%, #dc4dce 0%, #ff8b8b 100%, #ff8b8b 100%);
      > text {
        font-family: OpenSans-Bold;
        font-size: 12rpx;
        font-weight: bold;
        line-height: 56rpx;
        letter-spacing: 0rpx;
        color: #ffffff;
      }
      &:active {
        opacity: 0.7;
      }
    }
    .active {
      width: 198rpx;
      height: 60rpx;
      text-align: center;
      border-radius: 12rpx;
      background: #e0e2e7;
      > text {
        font-family: OpenSans-Bold;
        font-size: 12rpx;
        font-weight: bold;
        line-height: 56rpx;
        letter-spacing: 0rpx;
        color: #0d0e15;
      }
      &:active {
        opacity: 0.7;
      }
    }
  }
}
.name-item{
	display: flex;
}
.jb{
	width: 50px;
	display: flex;
	border:1px solid #f5f6f5;
	background-color: #1fcd7e;
	color: #FFFFFF;
	border-radius: 27px;
	font-size: 14px;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}
.gl{
	width: 50px;
	display: flex;
	border:1px solid #f5f6f5;
	background-color: #f40083;
	color: #FFFFFF;
	border-radius: 27px;
	font-size: 14px;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}
.qz{
	width: 50px;
	display: flex;
	border:1px solid #f5f6f5;
	background-color: #ff8b8b;
	color: #FFFFFF;
	border-radius: 27px;
	font-size: 14px;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
}
</style>
