<template>
	<view class="take-way">
		<view class="header">
			<image src="~@/static/icon/ic_back_white.png" @click="onBack" mode=""></image>
			<text>外卖自提</text>
			<image src="" mode=""></image>
		</view>
		<view class="top">
			<view class="address"><!-- 定位 -->
				<image src="~@/static/icon/ic_nav_location_in.png" mode=""></image>
				<text>送至：汇华商贸大厦</text>
				<image src="~@/static/icon/ic_more_in.png" mode=""></image>
			</view>
			
			<view class="drop-down-wrap">
				<HM-filterDropdown class="drop-down" :filterData="filterData" :defaultSelected="defaultSelected"
					:updateMenuName="true" @confirm="confirm" dataFormat="Object"></HM-filterDropdown>
			</view>			
		</view>
		
		<view class="box" v-for="(shop, index) of shops" :key="index" @click="goShop(shop)">
			<view class="box__left">
				<image :src="shop.photo" mode="aspectFit"></image>
			</view>

			<view class="box__center">
				<view class="title">{{shop.title}}</view>
				<view class="content">
					<view v-show="shop.tags.length" class="tag" v-for="(tag,i) of shop.tags" :key="i">{{tag}}</view>
				</view>
				<view class="bottom">
					<text>起送 HK${{shop.startPrice}}</text>
					<text class="line">销量{{shop.sell | filterNums}}</text>
					<text>评价{{shop.score | filterNums}}</text>
				</view>
			</view>

			<view class="box__right">
				<text>{{shop.distance | filterDis}}</text>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import data from '@/mixin/data';
	export default {
		name: 'takeWay',
		mixins: [ data ],
		data() {
			return {
				// 下拉菜单
				defaultSelected: [],
				shops: [
					{
						title:'和茶 WòoTea',
						photo: require('@/static/home/logo3.png'),
						tags: ['甜品', '小吃'],
						startPrice: '100',
						sell: '38000',
						score: '12000',
						distance: '500'
					},
					{
						title:'水清鴨白粵菜樓',
						photo: require('@/static/home/logo4.png'),
						tags: ['粤菜', '特色清水鸭'],
						startPrice: '100',
						sell: '11500',
						score: '2000',
						distance: '1200'
					}
				],
			};
		},
		onLoad() {
			console.log('页面onLoad')
		},
		methods: {
			goShop(shop) {
				uni.navigateTo({url: '/pages/shop/index'});
			},
			onBack() {
				// switchTab是跳转到pages.json有配置的页面 
				uni.switchTab({url: '/pages/home/index'});
			},
			// 分类选项确定
			confirm() {},
		},
		filters: {
			filterNums(val) {
			  let text = '';
			  if(val >= 10000) {
				text = `${val / 10000}w`
			  } else if (val >= 1000) {
				text =  `${val / 1000}k`
			  }
			  else {
				  text = val;
			  }
			  return text
			},
			filterDis(val) {
			  return val >= 1000 ? `${val / 1000}km` : val
			}
		},
	}
</script>

<style lang="scss">

$iconSize: 20px;

.take-way {
	/* #ifdef MP-WEIXIN */
	padding-top: 60px;
	/* #endif */
	.header {
		@extend %flex-jc-sb, %flex-ai-c;
		padding: 0 16px;
		height: 48px;
		color: #fff;
		background-color: #222326;
		image {
			width: $iconSize;
			height: $iconSize;
		}
	}
	
	.top {
		padding: 16px;
		height: 90px;
		box-sizing: border-box;
		background-color: #fff;
		
		// 头部地址
		.address {
			@extend %flex-ai-c;
			height: 22px;
			margin-bottom: 16px;
			image {
				&:first-child {
					width: 16px;
					height: 16px;
				}
				&:last-child {
					width: 12px;
					height: 12px;
				}
			}
			text {
				margin: 0 4px;
				font-size: 18px;
				font-weight: 600;
			}
		}
		// 下拉菜单
		.drop-down-wrap {
			position: relative;
			height: 50%;
			.drop-down {
				z-index: 1000;
				top:90px;
				/deep/ .mask {
					top: 90px;
					/* #ifdef MP-WEIXIN */
					top: 160px;
					/* #endif */
				}
				/deep/ .nav .first-menu.on,
				/deep/ .sub-menu-list.not-first .sub-menu.on,
				/deep/ .iconfont,
				/deep/ .menu-name > .iconfont,
				/deep/ .filter .btn-box .reset,
				/deep/ .sub-menu-list.alone .sub-menu.on {
					color: $bgColor;
				}
				/deep/ .filter .btn-box .reset,
				/deep/ .filter .btn-box .submit {
					border-color: $bgColor;
				}
				/deep/ .filter .btn-box .submit {
					background-color: $bgColor;
				}
				/deep/ .filter .menu-box .box .labels .on {
					border-color: $bgColor;
					background-color: $bgColor;
				}
			}
			/* #ifdef MP-WEIXIN */
			.HMfilterDropdown {
				top: 45px;
				/* #ifdef MP-WEIXIN */
				top: 154px;
				/* #endif */
			}
			/* #endif */
		}
	}
	.box {
		@extend %flex;
		padding: 8px 16px;
		margin-top: 8px;
		margin-bottom: 8px;
		height: 80px;
		background-color: #fff;
		&__left {
			margin-right: 8px;
			image {
				width: 80px;
				height: 80px;
			}
		}
		&__center {
			@extend %flex-fd-w;
			justify-content: space-around;
			margin-right: 4px;
			width: 210px;
			.title {
				@extend %text-overflow;
				font-size: 16px;
				font-weight: 600;
			}
						
			.content {
				@extend %flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				.tag {
					@extend %tag;
				}
			}
			
			.bottom {
				font-size: 11px;
				color: #A3A9B4;
				.line {
					&::after {
						content: '|';
						margin: 0 10rpx;
					}
					&::before {
						content: '|';
						margin: 0 10rpx;
					}
				}
			}
			
		}
		&__right {
			flex: 1;
			position: relative;
			text {
				position: absolute;
				right: 0px;
				bottom: 4px;
				color: #7F8590;
				font-size: 11px;
			}
		}
	}
}
</style>
