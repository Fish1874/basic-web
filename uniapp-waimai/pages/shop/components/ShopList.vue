<template>
	<view class="shop-list">
		<scroll-view class="sort-area" scroll-y>
			<view
				class="cell" 
				v-for="(item,index) of sort"
				:key="index + 'sort'"
				:style="{backgroundColor: current == index ? '#fff': ''}"
				@click="current = index"
			>{{item}}</view>
		</scroll-view>

		<scroll-view class="food-area" scroll-y><!-- 食品区域 -->
			<view class="title">推荐</view>
			<view
				 class="box"
				 v-for="(food, index) of foods"
				 :key="index"
			>
				<view class="box__left">
					<image :src="food.photo" mode="aspectFit"></image>
				</view>

				<view class="box__center">
					<view class="box__center-title">{{food.title}}</view>
					<view class="box__center-content">
						<text v-show="!food.select">{{food.describe}}</text>
					</view>
					<view class="box__center-bottom">
						<view class="money">
							<text class="p1" v-show="food.discount"><text class="unit">HK$ </text>{{food.discount}}</text>
							<text class="p2" v-show="food.original">HK$ {{food.original}}</text>
						</view>
					</view>
				</view>

				<view class="box__right">
					<image @click="onAddFood(food)" src="~@/static/icon/ic_add.png" mode=""></image>
				</view>
			</view>	
		</scroll-view>
	
		<view class="food-column"><!-- 商品栏 -->
			<view class="food-column__show" @click="onShopCart()">
				<view class="food-column__icon"><image src="~@/static/shop/bulka.png" mode=""></image></view>
				<view class="food-column__text">
					<view class="t1">HK$<text>0.00</text></view>
					<view class="t2">差HK$ 15.00 起送</view>
				</view>
			</view>
			<view class="food-column__pay">
				<button type="default">去结算</button>
			</view>
		</view>
	
	
		<uni-popup ref="popup" type="bottom"><!-- 购物车 -->
			<view class="shop-cart-wrap">
				<view class="shop-cart__top">
					<view class="text">已選商品</view>
					<view class="clear" @click="onClear()">
						<image src="../../../static/icon/ic_delete-white.png" mode=""></image>
						<text>清空購物車</text>
					</view>
				</view>
				<scroll-view class="shop-cart__list"  scroll-y>
					<view
						 class="box"
						 v-for="(cart, index) of shopCartList"
						 :key="index"
					>
						<view class="box__left">
							<image :src="cart.photo" mode="aspectFit"></image>
						</view>

						<view class="box__center">
							<view class="box__center-title">{{cart.title}}</view>
							<view class="box__center-bottom">
								<view class="money">
									<text class="p1"><text class="unit">HK$ </text>{{cart.discount}}</text>
								</view>
								<view class="calculator">
									<image src="../../../static/icon/ic_subtract.png" mode=""></image>
									<text>1</text>
									<image src="../../../static/icon/ic_add.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>	
				</scroll-view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>

	export default {
		name: 'ShopList',
		data() {
			return {
				current: 0,
				sort: ['推荐','进店必买','人气爆款','套餐','寿司','新鲜刺身','拉面','小食','酒水','元气饮料','新鲜蔬菜'],
				foods: [
					{
						photo: require('@/static/food/pic1.png'),
						title: "醋漬鮮鯖魚寿司",
						describe: '份量：每份2件',
						discount: 25,
						original: 28
					},
					{
						photo: require('@/static/food/pic2.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 38.8, // 优惠价
						original: 38    // 原价
					},
					{
						photo: require('@/static/food/pic2.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 38.8, // 优惠价
						original: 38    // 原价
					},
					{
						photo: require('@/static/food/pic2.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 38.8, // 优惠价
						original: 38    // 原价
					},
				],
				
				shopCartList: [
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
					{
						photo: require('@/static/food/pic1.png'),
						title: "MAKI HOUSE 招牌壽司：日本北海甜蝦壽司",
						discount: 25,
						num: 2
					},
				],
			}
		},
		methods: {
			onAddFood(v) {
				console.log(v)
			},
			// 显示购物车
			onShopCart() {
				this.$refs.popup.open('bottom')
			},
			// 清除购物车
			onClear() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>

$textColor:#A3A9B4;

.shop-list {
	@extend %flex;
	margin-top: 8px;
	height: calc(100vw - 11px);
	background-color: $bgColor2;
	overflow: hidden;
	.sort-area {
		width: 80px;
		overflow-y: auto;
		background-color: #F0F0F0;
		.cell {
			padding: 12px 16px;
			font-size: 12px;
			color: $textColor;			
			transition: ease-in-out .2s
		}
	}	
	.food-area {
		flex: 1;
		width: calc(375px - 80px);
		overflow-y: auto;
		.title {
			padding: 10px 8px;
			font-size: 14px;
			background-color: #fff;
		}

		.box {
			@extend %flex;
			padding: 8px 16px;
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
				// justify-content: space-between;
				margin-right: 4px;
				width: 190px;
				&-title {
					@extend %text-overflow;
					font-size: 16px;
					font-weight: 600;
				}
				
				&-content {
					flex: 1;
					@extend %text-wrap-overflow;
					margin: 6px 0 0;
					width: 140px;
					color: #A3A9B4;
					font-size: 12px;
				}
				
				&-bottom {
					@extend %flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.money {
						.p1 {
							margin-right: 8px;
							color: $prColor;
							font-size: 16px;
							font-weight: 600;
							.unit {
								font-size: 12px;
								font-weight: 500;
							}
						}
						.p2 {
							color: #A3A9B4;
							font-size: 12px;
							text-decoration: line-through;
						}
					}
				}
				
			}
			&__right {
				flex: 1;
				position: relative;
				image {
					position: absolute;
					top: 58px;
					right: 8px;
					width: 20px;
					height: 20px;
				}
			}
		}
	}	

	
	.food-column {
		@extend %flex;
		z-index: 999;
		position: fixed;
		left: 50%;
		bottom: 38px;
		width: 343px;
		height: 48px;
		transform: translateX(-50%);
		background: #222326;
		border-radius: 24px;
		box-shadow: 0px 4px 8px rgba(34, 35, 38, 0.16);
		
		&__show {
			@extend %flex;
			flex:1;
			.food-column__icon {
				position: relative;
				margin-left: 15px;
				width: 60px;
				image {
					position: absolute;
					top: -30px;
					width: 100%;
					height: 74px;
				}
			}
			.food-column__text {
				flex: 1;
				padding: 4px 11px;
				color: #fff;
				opacity: .5;
				.t1 {
					font-size: 14px;
					text {
						font-size: 17px;
					}
				}
				.t2 {
					font-size: 12px;
				}
			}
		}
		&__pay {
			width: 80px;
			button {
				width: 103%;
				height: 100%;
				line-height: 48px;
				font-size: 14px;
				color: #FFFFFF;
				background: #7F8590;
				border-radius: 0px 24px 24px 0px;
			}
		}
		
	}

	.shop-cart-wrap {
		width: 100%;
		height: 50vh;
		padding-bottom: 114px;
		background-color: #fff;
		.shop-cart {
			&__top {
				@extend %flex-jc-sb;
				align-items: center;
				padding: 12px 16px;
				font-size: 14px;
				background-color: #F9FAFC;
				.text {
					font-weight: 600;
				}
				.clear {
					color: $textColor;
					font-size: 14px;
					image {
						width: 20px;
						height: 20px;
					}
					text {
						position: relative;
						top: -4px;
					}
				}
			}
			
			&__list {
				height: 97%;
				// overflow-y: auto;
				.box {
					@extend %flex;
					padding: 8px 16px;
					margin-bottom: 8px;
					height: 86px;
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
						// justify-content: space-between;
						margin-right: 4px;
				
						&-title {
							@extend %text-wrap-overflow;
							margin-bottom: 4px;
							font-size: 16px;
							font-weight: 600;
						}
						&-bottom {
							@extend %flex-jc-sb;
							.money {
								.p1 {
									margin-right: 8px;
									color: $prColor;
									font-size: 16px;
									font-weight: 600;
									.unit {
										font-size: 12px;
										font-weight: 500;
									}
								}
							}
							
							.calculator {
								@extend %flex-ai-c;
								text {
									position: relative;
									top: -1px;
									margin: 0 12px;
								}
								image {
									width: 18px;
									height: 18px;
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
