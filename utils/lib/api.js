import request from '@/utils/lib/request.js'
import uploadFile from '@/utils/lib/upload.js'
//登入
export function login(data) {
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}
//发送验证码
export function sendCode(data) {
  return request({
    url: '/api/other/sendCode',
    method: 'POST',
    data
  })
}
//查询发送验证码类型是短信还是邮件
export function getCodeType(data) {
  return request({
    url: '/api/other/getCodeType',
    method: 'POST',
    data
  })
}
//获取首页发现的帖子列表
export function indexPost(data) {
  return request({
    url: '/api/post/index',
    method: 'POST',
    data
  })
}
//获取关注的用户的帖子列表 只查询非圈内贴
export function gzPost(data) {
  return request({
    url: '/api/post/queryGz',
    method: 'POST',
    data
  })
}
//点赞
export function like(data) {
  return request({
    url: '/api/post/like',
    method: 'POST',
    data
  })
}
//查看帖子详情
export function getPostInfo(data) {
  return request({
    url: '/api/post/getPostInfo',
    method: 'POST',
    data
  })
}
//查看评论列表
export function getCommentList(data) {
  return request({
    url: '/api/comment/getComment',
    method: 'POST',
    data
  })
}
//发布评论
export function addComment(data) {
  return request({
    url: '/api/comment/addComment',
    method: 'POST',
    data
  })
}

//点赞评论
export function commentLike(data) {
  return request({
    url: '/api/comment/commentLike',
    method: 'POST',
    data
  })
}
//删除评论
export function commentDel(data) {
  return request({
    url: '/api/comment/commentDel',
    method: 'POST',
    data
  })
}

//上传文件
export function uplodaFiles(filePath) {
  return uploadFile(filePath)
}
//获取用户详细信息
export function getUserById(data) {
  return request({
    url: '/api/member/getUserById',
    method: 'POST',
    data
})	
}

//获取我的页面关注,粉丝等数据
export function getDetailsNumber(data) {
  return request({
    url: '/api/member/getDetailsNumber',
    method: 'POST',
    data
})
}

//获取我的页面关注,粉丝等数据
export function updateUserByUserId(data) {
  return request({
    url: '/api/member/updateUserByUserId',
    method: 'POST',
    data
})
}
//拉取圈子分类
export function queryCircleClass(data) {
  return request({
    url: '/api/circle/queryCircleClass',
    method: 'POST',
    data
  })
}
//创建圈子
export function addCircle(data) {
  return request({
    url: '/api/circle/addCircle',
    method: 'POST',
    data
  })
}
//拉取圈子分类
export function queryCircleByClass(data) {
  return request({
    url: '/api/circle/queryCircleByClass',
    method: 'POST',
    data
  })
}
//根据ID获取圈子信息
export function queryCircleById(data) {
  return request({
    url: '/api/circle/queryCircleById',
    method: 'POST',
    data
  })
}
//查看用户是否加入这个圈子
export function isJoinCircle(data) {
  return request({
    url: '/api/circle/isJoinCircle',
    method: 'POST',
    data
  })
}
//加入圈子
export function jionCircle(data) {
  return request({
    url: '/api/circle/jionCircle',
    method: 'POST',
    data
  })
}
//获取圈内帖子
export function queryCirclePost(data) {
  return request({
    url: '/api/post/queryCirclePost',
    method: 'POST',
    data
  })
}
//获取圈内置顶帖子
export function circleTopPost(data) {
  return request({
    url: '/api/post/circleTopPost',
    method: 'POST',
    data
  })
}

//用户提现
export function userWithdrawal(data) {
  return request({
    url: '/api/member/userWithdrawal',
    method: 'POST',
    data
})
}
//获取当前登入用户加入的圈子列表
export function myCirList(data) {
  return request({
    url: '/api/circle/myCirList',
    method: 'POST',
    data
  })
}
//获取当前登入用户加入圈子的帖子
export function myCirListPost(data) {
  return request({
    url: '/api/post/myCirListPost',
    method: 'POST',
    data
  })
}


//获取充值的VIP商品
export function getGoodsVipLists(data) {
  return request({
    url: '/api/pay/getGoodsVipLists',
    method: 'POST',
    data
  })
}

//获取充值的金币商品
export function getGoodsLists(data) {
  return request({
    url: '/api/pay/getGoodsLists',
    method: 'POST',
    data
  })
}

//充值获取支付链接
export function gopay(data) {
  return request({
    url: '/api/pay/gopay',
    method: 'POST',
    data
  })
}
//发图片贴
export function addPostByImg(data) {
  return request({
    url: '/api/post/addPostByImg',
    method: 'POST',
    data
  })
}
//发视频帖
export function addPostByVideo(data) {
  return request({
    url: '/api/post/addPostByVideo',
    method: 'POST',
    data
  })
}

//是否关注这个用户
export function isFollow(data) {
  return request({
    url: '/api/member/isFollow',
    method: 'POST',
    data
  })
}
//是否关注这个用户
export function follow(data) {
  return request({
    url: '/api/member/follow',
    method: 'POST',
    data
  })
}


//获取用户充值记录
export function getUserPayOrderByUserIdList(data) {
  return request({
    url: '/api/payOrder/getUserPayOrderByUserIdList',
    method: 'POST',
    data
  })
}

//获取用户提现记录
export function getWithdrawalByUserId(data) {
  return request({
    url: '/api/member/getWithdrawalByUserId',
    method: 'POST',
    data
  })
}

//获取用户流水记录
export function getFlowRecordByUserId(data) {
  return request({
    url: '/api/member/getFlowRecordByUserId',
    method: 'POST',
    data
  })
}


//查询当前登入用户对于该圈子是什么角色
export function getRoleInCircleByUser(data) {
  return request({
    url: '/api/circle/getRoleInCircleByUser',
    method: 'POST',
    data
  })
}
//查询当前圈子用户列表
export function queryUserListByCircle(data) {
  return request({
    url: '/api/circle/queryUserListByCircle',
    method: 'POST',
    data
  })
}
//移除圈子用户
export function removeCircleUser(data) {
  return request({
    url: '/api/circle/removeCircleUser',
    method: 'POST',
    data
  })
}
//设置圈子管理员/移除圈子管理员
export function setAdminCircleUser(data) {
  return request({
    url: '/api/circle/setAdminCircleUser',
    method: 'POST',
    data
  })
}
//修改圈子资料
export function updateCircle(data) {
  return request({
    url: '/api/circle/updateCircle',
    method: 'POST',
    data
  })
}
//删帖
export function delPost(data) {
  return request({
    url: '/api/post/delPost',
    method: 'POST',
    data
  })
}

//举报
export function addReport(data) {
  return request({
    url: '/api/report/addReport',
    method: 'POST',
    data
  })
}
//根据ID查看指定用户详情
export function getToUserInfo(data) {
  return request({
    url: '/api/member/getToUserInfo',
    method: 'POST',
    data
  })
}
//查看指定用户创建的圈子列表
export function getCreatCircleListByUserId(data) {
  return request({
    url: '/api/circle/getCreatCircleListByUserId',
    method: 'POST',
    data
  })
}
//查看指定用户加入的圈子列表
export function queryJoinCirclelistByUserId(data) {
  return request({
    url: '/api/circle/queryJoinCirclelistByUserId',
    method: 'POST',
    data
  })
}
//查看指定用户发布的公开帖子列表
export function queryPostListByUserId(data) {
  return request({
    url: '/api/post/queryPostListByUserId',
    method: 'POST',
    data
  })
}

//退出圈子
export function exitCircle(data) {
  return request({
    url: '/api/circle/exit',
    method: 'POST',
    data
  })
}

//修改密码
export function updatePwd(data) {
  return request({
    url: '/api/member/updatePwd',
    method: 'POST',
    data
  })
}

//用户反馈
export function saveFeedback(data) {
  return request({
    url: '/api/member/saveFeedback',
    method: 'POST',
    data
  })
}

//查询用户反馈数据
export function queryFeedbackByUserId(data) {
  return request({
    url: '/api/member/queryFeedbackByUserId',
    method: 'POST',
    data
  })
}

//修改用户反馈是否解决
export function updateFeedbackById(data) {
  return request({
    url: '/api/member/updateFeedbackById',
    method: 'POST',
    data
  })
}

//根据反馈ID查询详细反馈信息
export function queryFeedbackById(data) {
  return request({
    url: '/api/member/queryFeedbackById',
    method: 'POST',
    data
  })
}

//查询用户的账号绑定情况以及后台验证码发送类型
export function getUserBuUserId(data) {
  return request({
    url: '/api/accountBinDing/getUserBuUserId',
    method: 'POST',
    data
  })
}

//绑定发送验证码
export function binDingSendCode(data) {
  return request({
    url: '/api/accountBinDing/binDingSendCode',
    method: 'POST',
    data
  })
}

//绑定发送验证码
export function saveUserEmailOrMobileByUserId(data) {
  return request({
    url: '/api/accountBinDing/saveUserEmailOrMobileByUserId',
    method: 'POST',
    data
  })
}
//好友列表/粉丝列表/关注列表
export function userList(data) {
  return request({
    url: '/api/friend/userList',
    method: 'POST',
    data
  })
}
//我发的帖子列表/我点赞的帖子列表
export function getPostListByType(data) {
  return request({
    url: '/api/post/getPostListByType',
    method: 'POST',
    data
  })
}

//搜索
export function search(data) {
  return request({
    url: '/api/other/search',
    method: 'POST',
    data
  })
}
//小程序登入
export function mplogin(data) {
  return request({
    url: '/api/mplogin',
    method: 'POST',
    data
  })
}
//获取公众号APPID
export function getWxGZHAppid(data) {
  return request({
    url: '/api/getWxGZHAppid',
    method: 'GET',
    data
  })
}
//公众号授权登入
export function mpWeChatLogin(data) {
  return request({
    url: '/api/mpWeChatLogin',
    method: 'POST',
    data
  })
}
//获取首页弹框公告
export function getNote(data) {
  return request({
    url: '/api/other/getNote',
    method: 'POST',
    data
  })
}

//卡密兑换
export function cardExchange(data) {
  return request({
    url: '/api/cami/cardExchange',
    method: 'POST',
    data
  })
}

//卡密兑换记录
export function queryCamiExchangeList(data) {
  return request({
    url: '/api/cami/queryCamiExchangeList',
    method: 'POST',
    data
  })
}
//APP更新
export function updateInfo(data) {
  return request({
    url: '/api/other/updateInfo',
    method: 'POST',
    data
  })
}
//获取APP配置
export function getConfig(data) {
  return request({
    url: '/api/other/getConfig',
    method: 'POST',
    data
  })
}

//在线客服联系方式
export function queryCustomer(data) {
  return request({
    url: '/api/customer/queryCustomer',
    method: 'POST',
    data
  })
}
//微信APP授权登入
export function appWeChatLogin(data) {
  return request({
    url: '/api/wxApplogin',
    method: 'POST',
    data
  })
}