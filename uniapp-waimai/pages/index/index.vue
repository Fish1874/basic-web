<template>
	<view class="content">

		<view class="top-nav">
			<view class="location">
				<text class="iconfont icon-map"></text>	
				<view class="location-text">汇合东平大厦</view>
				<text class="iconfont icon-arrow-right"></text>
			</view>
			<view class="search" @click="onShowPopup">
				<text class="iconfont icon-search"></text>
				<text class="text">发现更多美食</text>
			</view>
		</view>
		
		<view class="banner-wrap"><!-- 轮播图 -->
			<swiper :indicator-dots="true" indicator-color="#999" indicator-active-color="#000" :autoplay="false" :interval="3000" :duration="1000" circular="true">
				<swiper-item v-for = "item of images" :key = "item.id">
					<image :src="item.img" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="area-wrap"><!-- 类型区域 -->
			<view class="area">
				<swiper :indicator-dots="true" indicator-active-color="#7452A3">
					<swiper-item v-for="(item,index) of pages" :key="index">
						<view class="box" v-for="(list,i) of item" :key="i">
							<image :src="list.icon"></image>
							<text>{{list.text}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="shop"><!-- 推荐区 -->
				<view class="shop__box" v-for="(item,index) of shops" :key="index">
					<image :src="item.img" mode="scaleToFill"></image>
				</view>
			</view>
		</view>
		

		<uni-popup ref="popup" type="right">
			<search-page @close="onClose"></search-page>
		</uni-popup>

	</view>
</template>

<script>
	import SearchPage from '@/components/search';
	export default {
		components: {
			SearchPage
		},
		data() {
			return {
				images: [
					{id:1 ,img: require('@/static/home/banner1.jpg')},
					{id:2 ,img: require('@/static/home/banner2.jpg')},
					{id:3 ,img: require('@/static/home/banner3.jpg')},
				],
				icons: [
					{icon:require('@/static/icon/ic_scan.png'), text: '扫一扫'},
					{icon:require('@/static/icon/ic_bulk.png'), text: '附近团购'},
					{icon:require('@/static/icon/ic_take_out.png'), text: '外卖自提'},
					{icon:require('@/static/icon/ic_eat_in.png'), text: '堂食点餐'},
					{icon:require('@/static/icon/ic_buying_agent.png'), text: '跑腿代购'},
					{icon:require('@/static/icon/ic_department.png'), text: '商品百货'},
					{icon:require('@/static/icon/ic_discount.png'), text: '折扣优惠'},
					{icon:require('@/static/icon/ic_lightning.png'), text: '闪电秒抢'},
					{icon:require('@/static/icon/ic_lightning.png'), text: '闪电秒抢'},
				],
				shops: [
					{img: require('@/static/home/banner1.jpg')},
					{img: require('@/static/home/banner2.jpg')},
					{img: require('@/static/home/banner3.jpg')},
					{img: require('@/static/home/banner4.png')},
					{img: require('@/static/home/banner4.png')},
					{img: require('@/static/home/banner4.png')},
				]
			}
		},
		onLoad() {//---- 监听页面加载
			console.log('onload')
		},
		onShow() {//----- 监听页面显示
			console.log('onShow')
		},
		onReady() {//---- 监听页面初次渲染完成
			console.log('onReady')
		},
		onHide() {//---- 监听页面隐藏
			console.log('onHide')
		},
		onUnload() {//---- 监听页面销毁
			console.log('onUnload')
		},
		onTabItemTap() {// 
			console.log('每次点击当前页的TAB时显示！')
		},

		methods: {
			
			onShowPopup() {
				this.$refs.popup.open('right');
			},
			onClose() {
				this.$refs.popup.close();
			}

		},
		computed: {
			pages() {
				const pages = [];
				this.icons.forEach((v,i)=>{
					const page = Math.floor(i / 8);
					if(!pages[page]) {
						pages[page] = []
					};
					pages[page].push(v);
				});
				console.log(pages,'pages')
				return pages
			}
		}
	}
</script>

<style lang="scss">
	$padding: 16px;

	.content {
		.top {
			&-nav {
				z-index: 2;
				position: fixed;
				@extend %flex-jc-sb, %flex-ai-c;
				padding: 0 $padding;
				width: 100%;
				height: 44px;
				box-sizing: border-box;

				.location {
					flex: 1;
					@extend %flex, %flex-ai-c;
					color: #fff;
					&-text {
						@extend %text-overflow;
						margin: 0 4px;
						width: 216rpx;
						font-size: 18px;
						font-weight: 600;
					}
					.icon-map {
						font-size: 16px;
					}
					.icon-arrow-right {
						font-size: 12px;
					}
					
				}
				.search {
					// flex: 1;
					@extend %flex-ai-c;
					padding: 2px 12px;
					border-radius: 14px;
					background-color: #eee;
					.icon-search {
						width: 34rpx;
						font-size: 16px;
						margin-right: 4px;
						letter-spacing: 1px;
						color: #999;
					}
					.icon-add {
						position: relative;
						top: 1px;
						left: 2px;
						transform: rotateZ(45deg);
						color: #000;
					}
					.text {
						padding: 2px 6px;
						color: #999;
						font-size: 14px;
					}
					.focus-text {
						max-width: 140px;
						transition: ease-in-out .4s;
					}
				}
			}
		}
		.banner-wrap {
			position: fixed;
			top: 0;
			width: 100%;
		
			swiper {
				height: 240px;
				image {
					width: 100%;
				}
			}
			// #ifdef H5
			.uni-swiper .uni-swiper-dots-horizontal {
				bottom: 30px;
			}
			// #endif		
		}
		
		.area-wrap {
			position: relative;
			top: 170px;
			height: 87vh;
			padding: 0 16px;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
			background-color: #fff;
			overflow-x: hidden;
			.area {
				z-index: 99;
				position: sticky;
				top: 0px;
				padding: 22px 0 0;
				height: 150px;
				background: #fff;
				swiper {
					width: 100%;
					height: 106%;
					swiper-item {
						@extend %flex;
						flex-wrap: wrap;
						box-sizing: border-box;
						height: 90%;
						.box {
							@extend %flex-ai-c;
							justify-content: space-around;
							flex-direction:column;
							width: 25%;
							height: 58px;
							image {
								width: 32px;
								height: 32px;
							}
							text {
								color: #7F8590;
								font-size: 14px;
								letter-spacing: 1px;
							}
						}
					}
				}
			}
			
			.shop {
				@extend %flex;
				flex-wrap: wrap;
				justify-content: space-around;
				margin-top: 28px;
				padding-bottom: 50px;
				width: 100%;
				// height: 200px;
				&__box {
					width: 168px;
					height: 108px;
					margin-bottom: 8px;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		

	}
</style>
