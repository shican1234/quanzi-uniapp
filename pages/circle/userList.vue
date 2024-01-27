<template>
  <view class="focus">
    <view class="item" v-for="(item, index) in list" :key="index">
      <view class="image" @click="clickUser(item.userId)">
        <image :src="item.avatar"></image>
      </view>
      <view class="cent" @click="clickUser(item.userId)">
		<view class="name-item">
			<text class="nick">
				{{ item.nickName }}
			</text>
			<span style="color: #0000ff;" v-if="item.gender == 0">♂</span>
			<span style="color: #fc0107;" v-if="item.gender == 1">♀</span>
			<span class="jb" v-if="item.type == 1">嘉宾</span>
			<span class="gl" v-if="item.type == 2">管理</span>
			<span class="qz" v-if="item.type == 3">圈主</span>
		</view>
        
        <text class="text">{{ item.createTime }} 加入</text>
      </view>
      <view class="follow" v-if="circleUser.type >= 2 && index > 0" @click="click(item,index)">
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
	import {queryUserListByCircle,getRoleInCircleByUser,removeCircleUser,setAdminCircleUser} from '@/utils/lib/api.js';  //引入需要的api
export default {
  data() {
    return {
	  circleId: '',
	  page: 0,
	  pageOk: true,
	  circleUser: {},
	  loadStatus: 'loadmore',
	  actionShow: false,
	  selectUser: {},
	  selectIndex: '',
	  actionList: [
		  {
	  		name: '设为管理员',
	  		type: 0
		  },
	  	  {
	  		name: '移除圈子',
	  		type: 1
	  	  }
	  ],
      list: [
        
      ],
    };
  },
  onLoad(e) {
	  this.circleId = e.circleId
	  this.getMyRole();
	  this.getUserList();
  },
  // 触底事件
  onReachBottom() {
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
		if(this.actionList[0].type == 0){
			if(user.type == 2){
				this.actionList[0].name = '取消管理员'
			}else{
				this.actionList[0].name = '设为管理员'
			}
		}
	  
	  if(this.actionList[0].type == 0 && this.circleUser.type != 3){
		  this.actionList.splice(0,1)
	  }
	  this.selectUser = user
	  this.selectIndex = index
      this.actionShow = true
    },
	getUserList(){
		queryUserListByCircle({"circleId":this.circleId,"page":this.page}).then(data => {
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
	removeUser(){
		removeCircleUser(this.selectUser).then(data => {
			uni.showToast({
			    icon: 'success',   
			    duration: 1000,
			    title: '移除成功'
			});
			this.list.splice(this.selectIndex, 1);
		});
	},
	setAdmin(){
		setAdminCircleUser(this.selectUser).then(data => {
			uni.showToast({
			    icon: 'success',   
			    duration: 1000,
			    title: '设置成功'
			});
			this.list.splice(this.selectIndex, 1,data);
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
			this.setAdmin();
		}else if(e.type == 1){
			this.removeUser()
		}
	},
	// 点击用户信息
	clickUser(userId){
		// 跳转用户个人中心 
		this.$u.route('pages/mine/userInfo', {
			id: userId
		})
		
	},
	//查询当前登入用户对于该圈子是什么角色
	getMyRole(){
		getRoleInCircleByUser({"id":this.circleId}).then(data => {
			this.circleUser = data
		});
	},
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
