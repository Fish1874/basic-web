<template>
	<view class="home">
		<view class="home__nav">
			<view class="home__nav-site" @click="selectCity">
				<image src="~@/static/ico/地址.png"/>
				<text>佛山市</text>
			</view>
			<view class="home__nav-search">
				<input placeholder="搜索领养中心、宠物店名称" type="String"/>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="home__swiper">
			<swiper class="swiper" indicator-dots="true" indicator-active-color="#F0B300">
				<swiper-item class="swiper__item1">
					<view class="swiper__item1-left" hover-class="btnStyle">
						<view class="swiper__item1-left-p">助力给猫咪一个家</view>
						<view class="swiper__item1-left-h2">猫之家社区</view>
						<text class="swiper__item1-left-btn">立即加入</text>
						
					</view>
					<view class="swiper__item1-right">
						<image src="~@/static/pic1.jpg" mode="aspectFill"/>
					</view>
				</swiper-item>
				<swiper-item class="swiper__item">
					<image src="~@/static/pic2.jpg" mode="scaleToFill"/>
				</swiper-item>
				<swiper-item class="swiper__item">
					<image src="~@/static/pic1.jpg" mode="widthFix"/>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航栏 -->
		<view class="home__bar">
			<view 
				class="home__bar__box"
				v-for="(item,index) of barList"
				:key="index + 'barList'"
				@click="aaa"
			>
				<image :src="item.img" :mode="item.mode"></image>
				<text>{{item.text}}</text>
			</view>
		</view>
	
		<!-- 列表 -->
		<view class="home__list">
			<view 
				v-for="(item,index) in componentList"
				:key="index+'componentList'"
				:class="{'currentStyle': nowComponent===index}"
				@click="cutover(index)"
			>
				{{item}}
			</view>
		</view>
		<view v-if="nowComponent===0">
			<adoption-center :listAdop="adoptionList"></adoption-center>
		</view>
		<view v-else>
			<pet-shop :listPet="newsList"></pet-shop>
		</view>
		<view class="loading">
			<uni-load-more :status="status"></uni-load-more>
			<!-- {{loadingText}} -->
		</view>

	</view>
</template>

<script>
	var that, page = 1,
		timer = null;
	import AdoptionCenter from './components/adoptionCenter.vue';
	import PetShop from './components/petShop.vue';
	import uniLoadMore from '../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue'
	export default {
		components:{
			AdoptionCenter,
			PetShop,
			uniLoadMore
		},
		data() {
			return {
				barList: [
					{text:'分享喵生活',img:'/static/猫1.png', mode:'aspectFit'},
					{text:'发布领养',img:'/static/猫3.png', mode:'aspectFit'},
					{text:'同城领宠',img:'/static/猫2.png', mode:'aspectFit'},
					{text:'求助咨询',img:'/static/猫4.png', mode:'aspectFit'},
				],

				// 切换选项卡
				componentList: ['领养中心','宠物店'],
				nowComponent: 0,
				adoptionList: [
					{
						title:'友爱领养中心',
						site:'佛山市禅城区普夏一路14号友爱宠物医院',
						tag: ['可领养','无偿领养'],
						img: '/static/pic1.jpg',
						ico: '/static/ico/收藏1.png',
						top: true,
						collect: false
					}
					,{
						title:'裕康宠物领养中心',
						site:'佛山市禅城区沈华路9号金地一期商铺P6',
						tag: ['可领养','疫苗体检'],
						img:'/static/pic3.jpg',
						ico: '/static/ico/收藏.png',
						top: false,
						collect: true
					},
				],
				petList: [
					{
						title: "咪咪送养",
						site: "佛山市禅城区佛山大道",
						tag: ["猫咪", "1-3岁", "妹妹"],
						img: "/static/我的送养1.jpg",
						look: 56,
						date: "2021-01-21"
					},
					{
						title: "小可爱一枚求领养",
						site: "广东省佛山市禅城区佛山大道",
						tag: ["猫咪", "6-9个月", "妹妹"],
						img: "/static/我的送养2.jpg",
						look: 88,
						date: "2020-08-28"
					},
					{
						title: "咪咪送养",
						site: "佛山市禅城区佛山大道",
						tag: ["猫咪", "1-3个月", "弟弟"],
						img: "/static/我的送养1.jpg",
						look: 152,
						date: "2021-01-12"
					}
				],
				newsList: [],
				loadingText: '',
				status: 'loading', // 加载状态
			}
		},

		// 页面一加载就请求一次数据
		onLoad() {
			that = this;
			// this.getNewList(); // 下拉刷新
			that.getmorenews(); // 上拉加载
		},

		//下拉刷新的时候请求一次数据
		onPullDownRefresh() {			
			this.getNewList();
		},

		//页面触底的时候请求数据，即为上拉加载更多
		onReachBottom() {			
			console.log('页面触底了');
			console.log('that.nowComponent',that.nowComponent)
			if(that.nowComponent === 1) {
				that.getmorenews();
			}
			// if (timer != null) {
			// 	clearTimeout(timer);
			// }
			// timer = setTimeout(function() {
			// }, 2000);
		},

		methods: {
			// 上拉加载
			async getmorenews() {
				if (that.loadingText != '' && that.loadingText != '加载更多') {
					return false;
				};
				that.loadingText = '加载中...';
				const a = await this.$api({
					url: '/toutiao/index?key=fc467bcad4663e7af65336128020fd21',
					data: {
						page: page,
						type: 'guoji'
					},
				})
				console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',a)
				// uni.request({
				// 	url: '/api/toutiao/index?key=fc467bcad4663e7af65336128020fd21',
				// 	data: {
				// 		page: page,
				// 		type: 'guoji'
				// 	},
				// 	method: 'POST',
				// 	success: (res) => {
				// 		let data = res.data.result.data;
				// 		that.loadingText = '';
				// 		if(data == null || page == 3) {
				// 			that.loadingText = '———— 列表到底啦~ ————';
				// 			return false;
				// 		}
				// 		page++;
				// 		that.newsList = that.newsList.concat(data);
				// 		console.log('总：',that.newsList)
				// 		that.loadingText = '加载更多';
				// 	}
				// })
			},
			
			// 下拉刷新
			getNewList() {
				page = 1;
				uni.showNavigationBarLoading(); // 显示加载动画
				uni.request({
					url: '',
					method: 'GET',
					success: (res) => {
						page++;
						// that.petList = res.data.petList;
						uni.hideNavigationBarLoading(); // 关闭加载动画
						uni.stopPullDownRefresh(); // 得到数据后停止下拉刷新
					}
				});

			},
			
			// 切换子组件
			cutover(val) {
				this.nowComponent = val;
			},
			aaa() {
				this.getmorenews()
			},
			
			selectCity() {
				uni.navigateTo({
					url: '/pages/city/city'
				})
			}
			
		}

	}
</script>

<style lang="scss">
@import '~@/uni.scss';


.home {
	&__nav {
		@extend .flex-sb;
		align-items: center;
		padding: 0 15rpx;
		height: 85rpx;
		background-color: $bgColor;
		&-site {
			width: 180rpx;
			height: 60%;
			image {
				position: relative;
				top: 2px;
				width: 35rpx;
				height: 35rpx;
			}
			text {
				font-size: 28rpx;
				margin-left: 20rpx;
			}			
		}
		&-search {
			flex: 1;
			padding: 10rpx 24rpx;
			border-radius: 20px;
			background-color: #fff;
			input {
				font-size: 14px;
			}
		}
	}
	
	&__swiper {
		.swiper {
			// width: 96%;
			width: 718rpx;
			height: 315rpx;
			margin: 36rpx auto;

			swiper-item {
				border-radius: 8px;
			}

			&__item1 {
				@extend .flex;
				justify-content: space-between;	
				// 点击第一个轮播图按钮变色
				.btnStyle {
					.swiper__item1-left-btn {
						color: #fff;
						background-color: $bgColor;
					}
				}
				&-left {
					width: 50%;
					text-align: center;
					background-color: $grey;	
					&-p {
						margin: 50rpx 0 15rpx;
						font-size: 24rpx;
					}
					&-h2 {
						position: relative;
						margin-bottom: 55rpx;
						font-size: 42rpx;
						letter-spacing: 6rpx;
						&::after {
							content: '';
							position: absolute;
							width: 100rpx;
							height: 6rpx;
							left: 50%;
							bottom: -30rpx;
							transform: translateX(-50%);
							background-color: $bgColor;
						}
					}
					&-btn {
						padding: 8rpx 80rpx;					
						font-size: 20rpx;
						border: 1px solid $bgColor;
						border-radius: 20px;
					}
				}
				&-right {
					width: 50%;				
					image {
						width: 100%;
						height: 100%;
						
					}

				}
			}
			&__item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	&__bar {
		@extend .flex;
		justify-content: space-around;
		width: 660rpx;
		height: 180rpx;
		margin: 0 auto 55rpx;

		&__box {
			@extend .flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
			text {
				position: relative;
				top: 14rpx;
				font-size: 28rpx;
				color: $fontColor;
			}
			image {	
				position: relative;
				width: 100%;
				height: 100%;
				&::before {
					z-index: -1;
					content: '';
					position: absolute;
					top: 50%;
					left: 42%;
					transform: translate(-50%, -42%);
					border: 50rpx solid $grey;
					border-radius: 100%;
				}
			}
		}
	}
	
	&__list {
		@extend .flex;
		align-items: center;
		padding: 0 15rpx;
		view:first-child {
			margin-right: 35rpx;
		}
		.currentStyle {
			position: relative;
			font-size: 42rpx;			
			&::before {
				z-index: -1;
				content: '';
				position: absolute;
				bottom: 10rpx;
				width: 80%;
				height: 20rpx;
				transform: rotate(-5deg);
				background-color: $bgColor;
				
			}
		}
	}

	.loading {
		text-align: center;
		line-height: 80rpx;
	}
}
</style>
