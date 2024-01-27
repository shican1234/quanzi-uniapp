//把配置项单独处理
import URL from './config.js'
const upload_url = URL.upload
function uploadFile(filePath) {
	console.log(filePath)
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: upload_url,
			filePath: filePath,
			name: 'file',
			success: function(res) {
				console.log(res)
				if (res.statusCode == 200) {
					var json = res.data?JSON.parse(res.data):{};
					if (json.code == 0) {
						resolve(json);
					} else {
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							duration:1000
						})
						reject(json);
					}
 
				} else {
					uni.showToast({
						title:res.data.msg,
						icon:'none',
						duration:1000
					})
					reject(res.data);
				}
			},
			fail: function(err) {
				if(err.errMsg!=null&&err.errMsg.indexOf("request:fail")>=0){
					uni.showToast({
						title:err.msg,
						icon:'none',
						duration:1000
					})
					reject(null)
				}else{
					uni.showToast({
						title:err.msg,
						icon:'none',
						duration:1000
					})
					reject(err)
				}
			}
		})
	});
}
export default uploadFile;