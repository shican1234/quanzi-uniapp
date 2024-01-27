// 工具函数

export default {
	// 网络状态获取
	getNetwork(){
		uni.getNetworkType({
			success(res) {
				if (res.networkType === 'none') {
					uni.$u.toast('网络连接不可用,请检查网络')
				}
			}
		})
	},
	// 网络状态监听
	onNetwork() {
		uni.onNetworkStatusChange(res => {
			// 当前是否有网络连接
			if (!res.isConnected) {
				uni.$u.toast('网络连接不可用,请检查网络')
				return uni.$u.route('/pages/mine/login')
			}
			// 网络类型
			switch (res.networkType) {
				case 'unknown':
					uni.$u.toast('未知的网络状态')
					break;
				case 'wifi':
					uni.$u.toast('已切换至wifi网络')
					break;
				case '4g':
					uni.$u.toast('已切换至蜂窝移动网络,请注意流量消耗')
					break;
				case '3g':
					uni.$u.toast('已切换至蜂窝移动网络,请注意流量消耗')
					break;
				case '2g':
					uni.$u.toast('已切换至蜂窝移动网络,请注意流量消耗')
					break;
				case 'none':
					uni.$u.toast('当前无网络连接,请检查网络')
					break;
			}
		})
	},
	// 热更新
	update(){
		// #ifdef APP-PLUS  
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		    uni.request({
		        url: 'http://www.example.com/update/',
		        data: {
		            version: widgetInfo.version,  
		            name: widgetInfo.name  
		        },
		        success: (result) => {
		            var data = result.data;  
		            if (data.update && data.wgtUrl) {
		                uni.downloadFile({
		                    url: data.wgtUrl,  
		                    success: (downloadResult) => {  
		                        if (downloadResult.statusCode === 200) {  
		                            plus.runtime.install(downloadResult.tempFilePath, {  
		                                force: false  
		                            }, function() {  
		                                console.log('install success...');  
		                                plus.runtime.restart();  
		                            }, function(e) {  
		                                console.error('install fail...');  
		                            });  
		                        }  
		                    }  
		                });  
		            }  
		        }  
		    });  
		});  
		// #endif
	}
}
