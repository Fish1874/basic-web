<template>
	<view class="shop">
		<nav-bar :scrollTop="scrollTop" type="transparent" fontColor="#FFF">
			<view class="black" slot="left" @click="onBlack" style="color: red;">
				<image src="../../static/icon/ic_back_white.png" mode=""></image>
			</view>
		</nav-bar>
		<view class="top">
			<image src="~@/static/home/banner3.jpg" mode=""></image>
			<view class="mask"></view>
		</view>
		
		<view class="sticky" style="position: sticky;top:64px;">
			
			<view class="shop-area" @click="onShowDetail"><!-- 店铺名称 -->
				<view class="shop-title">MAKI HOUSE 日式料理</view>
				<view class="shop-photo">
					<image src="~@/static/home/logo2.png" mode=""></image>
				</view>
				<view class="shop-score">
					<view class="shop-score__fraction">
						<image src="~@/static/icon/star.png" mode=""></image>
						4.8分
					</view>
					<view class="shop-score__tag">日料</view>
				</view>
				<view class="shop-describe">
					<view class="shop-describe__left">
						<text>起送 HK$100</text>
						<text class="line">销量3.8w</text>
						<text>评价1.2w</text>
					</view>
					<view class="shop-describe__right">
						<text>距您2.6km</text>
					</view>
				</view>
			</view>
			
			<ShopList></ShopList>
			

		</view>
		
		<uni-popup ref="detailPopup" type="right">
			<ShopDetail @close="$refs.detailPopup.close()"></ShopDetail>
		</uni-popup>
	</view>
</template>

<script>
	import ShopList from "./components/ShopList.vue"
	import ShopDetail from "./components/ShopDetail.vue"
	export default {
		name: 'shop',
		components: {
			ShopList,
			ShopDetail
		},
		data() {
			return {
				scrollTop: 0,
			};
		},
		methods: {
			onBlack() {
				uni.navigateBack({}) // 返回上一页
			},
			onShowDetail() {
				this.$refs.detailPopup.open('right');
			}
		}
	}
</script>

<style lang="scss">

.shop {
	background-color: #F9FAFC;
	.black {
		padding: 0 16px;
		image {
			width: 20px;
			height: 20px;
		}
	}
	

	.top {
		position: relative;
		width: 100%;
		height: 180px;
		image {
			width: 100%;
			height: 100%;
		}
		.mask {
			position: absolute;
			top: 0px;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: 0.3;
		}
	}

	.sticky {
		position: sticky;
		top: 20px;
	}
	
	.shop-area {
		position: relative;
		padding: 16px;
		width: 100%;
		height: 114px;
		background-color: #fff;
		box-sizing: border-box;
		
		.shop {
			&-title {
				font-weight: 600;
				font-size: 18px;
			}
			&-photo {
				position: absolute;
				top: -48px;
				right: 16px;
				image {
					width: 80px;
					height: 80px;
				}
			}
			&-score {
				@extend %flex;
				justify-content: flex-start;
				align-items: center;
				margin: 10px 0;
				&__fraction {
					font-size: 14px;
					color: $yeColor;
					image {
						position: relative;
						top: 2px;
						left: -1px;
						width: 16px;
						height: 16px;
					}
				}
				&__tag {
					@extend %tag;
					margin-left: 8px;
				}
			}
		
			&-describe {
				&__left {
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
				&__right {
					flex: 1;
					position: relative;
					text {
						position: absolute;
						right: 0px;
						bottom: 0px;
						font-size: 12px;
						color: #7F8590;
					}
				}
			}
		}
		
	}
	

}
</style>
