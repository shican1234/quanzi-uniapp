//把配置项单独处理
import URL from './config.js'
const server_url = URL.request

function service(options = {}) {
       options.url = `${server_url}${options.url}`;
          //配置请求头
        options.header = {
        'content-type': 'application/json;charset=UTF-8',
        'token': uni.getStorageSync('token')
    };
    return new Promise((resolved, rejected) => {
                //成功
        options.success = (res) => {
            uni.hideLoading();
            if (Number(res.data.code) == 0) {  //请求成功
                resolved(res.data.data);
            }else if (Number(res.data.code) == 8000) {  //token失效了
				uni.redirectTo({
					//关闭当前页面，跳转到应用内的某个页面。
					url:'/pages/mine/login'
				});
				uni.showToast({
					icon: 'none',   
					duration: 3000,
					title: '未登入或已掉线,请登入!'
				});
				
            }else if (Number(res.data.code) == 10030) {  //token失效了
				uni.showModal({
				    title: '提示',
				    content: '余额不足!',
					confirmText: "去充值", // 确认按钮的文字  
					//showCancel: false,
				    success: function (res) {
				        if (res.confirm) {
							uni.redirectTo({
								//关闭当前页面，跳转到应用内的某个页面。
								url:'/pages/order/paySpecies'
							});
				        }
				    }
				});
            }else if (Number(res.data.code) == 10031) {  //token失效了
				uni.showModal({
				    title: '提示',
				    content: res.data.msg,
					confirmText: "去开通", // 确认按钮的文字  
					//showCancel: false,
				    success: function (res) {
				        if (res.confirm) {
							uni.redirectTo({
								//关闭当前页面，跳转到应用内的某个页面。
								url:'/pages/order/payVip'
							});
				        }
				    }
				});
            } else {
                uni.showToast({
                    icon: 'none',   
                    duration: 3000,
                    title: `${res.data.msg}`
                });
                rejected(res.data.msg);//错误
            }
        }
              //错误
        options.fail = (err) => {
            rejected(err); //错误
        }
        uni.request(options);
    });
}
export default service;