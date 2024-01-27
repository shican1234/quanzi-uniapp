<template>
	<view>
		<button style="margin: 66px 36px;" @click="showModal"> 生成海报 </button>

		<view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog" v-if="goods && erweimapath && haibaoShow" @tap="hideModal">
				<view class="bg-img">

					<!-- 自定义生成海报组件 -->
					<!-- @success：成功事件  imgSrc：图片地址（微信小程序必须白名单iP） QrSrc：二维码图片地址  Title：标题 PriceTxt：价格 OriginalTxt：原始价格  Referrer:昵称 LineType -->
					<cc-poster @success="posterSuccess" :imgSrc="goods.itempic" :QrSrc="erweimapath"
						:Title="goods.itemtitle" :PriceTxt="goods.itemendprice" :OriginalTxt="goods.itemprice"
						:LineType="false" :Referrer="goods.name"></cc-poster>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	export default {
		data() {
			return {
				haibaoImg: null,
				modalName: '',
				haibaoShow: false,

				erweimapath: "https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg",
				goods: {
					// "itemid": "2nNozWXiotnRwxGUakBuXUD-0npyN5GSNmYDb0pgTxw",
					"itemtitle": "快来加入我的圈子吧,超多好玩的话题,海量红包等着你!",
					// "itemshorttitle": "开丽产妇卫生巾月子安睡裤计量卫生",
					// "itemdesc": "【开丽旗舰店】安心裤型亲肤面料，产后专用不勒刀口，免穿设计方便，超强吸收加长加大款，产妇的优质选择！【赠运费险】",
					"itemprice": "1",
					// "todaysale": "3",
					"itempic": "https://img.alicdn.com/imgextra/i1/2742920221/O1CN01nFqqJ41DVGNfjYMmu_!!2742920221.jpg",
					"itemendprice": "2",
					"name": "1234"
				}

			};
		},

		onLoad() {

		},
		methods: {
			posterSuccess(haibaoImg) {
				this.haibaoImg = haibaoImg;
				this.modalName = 'Image';
			},
			showModal() {
				if (!this.haibaoImg) {
					this.haibaoShow = true;

					uni.showLoading({
						title: '海报生成中...'
					});

				} else {
					this.modalName = 'Image';
				}
			},
			hideModal() {
				this.modalName = null;
			}

		}
	};
</script>
<style lang="scss">
	.cu-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.cu-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}
</style>