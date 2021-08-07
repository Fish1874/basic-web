<template>
	<view class="shop-list">
		<scroll-view class="sort-area" scroll-y>
			<view
				class="cell" 
				v-for="(item,index) of sort"
				:key="index + 'sort'"
				:style="{backgroundColor: current == index ? '#fff': ''}"
				@click="onTabs(index)"
			>{{item}}</view>
		</scroll-view>

		<scroll-view class="food-area" scroll-y><!-- 食品区域 -->
			<view class="title">推荐</view>
			<view
				 class="box"
				 v-for="(food, index) of foods"
				 :key="index"
				 @click="onSelect(food)"
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
					<image :class="{'minus': food.num > 0 ? true : false}" @click.native.stop="onEditNum(food, 'minus', 'external')" src="~@/static/icon/ic_subtract.png" mode=""></image>
					<text v-show="food.num > 0">{{food.num}}</text>
					<image @click.native.stop="onEditNum(food, 'plus', 'external')" src="~@/static/icon/ic_add.png" mode=""></image>
				</view>
			</view>	
		</scroll-view>
	
		<view class="food-column" v-if="showFoodColumn"><!-- 结算栏 -->
			<view class="food-column__show" @click="onShopCart()">
				<view class="food-column__icon"><image :src="cartPhoto" mode=""></image></view>
				<view class="food-column__text">
					<view class="t1">HK$<text>0.00</text></view>
					<view class="t2">差HK$ 15.00 起送</view>
				</view>
			</view>
			<view class="food-column__pay">
				<button :style="{'backgroundColor': shopCartList.length ? '#7355BE' : '#7F8590'}" type="default">去结算</button>
			</view>
		</view>
	
		<uni-popup ref="singlePopup" type="bottom" @maskClick="onCloseSinglePup">
			<view class="select-food-wrap">
				<view class="select__top">
					<view class="select__top--photo">
						<image :src="selectFood.photo" mode="aspectFit"></image>
					</view>

					<view class="select__top__center">
						<view class="select__top__center-title">{{selectFood.title}}</view>
						<view class="select__top__center-content">
							<text>{{selectFood.describe}}</text>
						</view>
						<view class="select__top__center-bottom">
							<view class="money">
								<text class="p1" v-show="selectFood.discount"><text class="unit">HK$ </text>{{selectFood.discount}}</text>
								<text class="p2" v-show="selectFood.original">HK$ {{selectFood.original}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<scroll-view class="select__list" scroll-y>
					<view
						class="select__list--box"
						v-for="(item,index) of selectFood.options"
						:key="index + 'options'"
					>
						<view class="header">
							<text class="text">选项{{index | filterNum }}</text>
							<text class="line"></text>
						</view>
						<view class="content">
							<view class="content-box"
								v-for="(select,index) of item"
								:key="index + 'select'"
								:class="{active: selectcurrent === select.id}"
								@click="selectcurrent = select.id"
							>{{select.name}}</view>
						</view>
					</view>
				</scroll-view>
				
				<button class="select__btn" type="default" @click="onConfirm">確認選擇</button>
			</view>
		</uni-popup>
	
		<uni-popup ref="popup" type="bottom" @change="onPayPupChange"><!-- 购物车 -->
			<view class="shop-cart-wrap">
				<view class="shop-cart__top">
					<view class="text">已選商品</view>
					<view class="clear" @click="onClear()">
						<image src="~@/static/icon/ic_delete-white.png" mode=""></image>
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
									<image @click="onEditNum(cart, 'minus')" src="~@/static/icon/ic_subtract.png" mode=""></image>
									<text>{{cart.num}}</text>
									<image @click="onEditNum(cart, 'plus')" src="~@/static/icon/ic_add.png" mode=""></image>
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
				selectcurrent: 1,
				showFoodColumn: true,
				sort: ['推荐','进店必买','人气爆款','套餐','寿司','新鲜刺身','拉面','小食','酒水','元气饮料','新鲜蔬菜'],
				foods: [
					{
						id:1,
						photo: require('@/static/food/pic1.png'),
						title: "醋漬鮮鯖魚寿司",
						describe: '份量：每份2件',
						discount: 25,
						original: 28
					},
					{
						id:2,
						photo: require('@/static/food/pic2.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 18.8, // 优惠价
						original: 38    // 原价
					},
					{
						id:3,
						photo: require('@/static/food/pic3.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 138.8, // 优惠价
						original: 38    // 原价
					},
					{
						id:4,
						photo: require('@/static/food/pic4.png'),
						title: "黄金鲔鱼寿司",
						describe: '當天進貨 保證新鮮 口感細膩',
						discount: 55, // 优惠价
						original: 399    // 原价
					},
				],
				
				shopCartList: [],
				
				// 暂存选中的食品
				selectFood: {},
				isPayCart: false, // 监听结算车弹出层-显示隐藏
				cartPhoto: require('@/static/shop/bulka.png')
			}
		},
		methods: {
			// 切换类别
			onTabs(index) {
				this.current = index
				this.foods = this.shuffle(this.foods);
			},
			// 显示购物车
			onShopCart() {
				this.$refs.popup.open('bottom');
			},
			// 结算车监听事件
			onPayPupChange(e) {
				this.isPayCart = e.show;
			},
			// 清除购物车
			onClear() {
				this.shopCartList.forEach(v=> delete v.num);
				this.shopCartList = [];
				this.selectFood = {};
				this.$refs.popup.close('bottom');
			},
			// 单个商品-选择规格
			onSelect(row) {
				this.showFoodColumn = false;
				this.$refs.singlePopup.open('bottom');
				row.options = [
					[{id: 1, name:'龍蝦'},{id: 2, name:'臘味'},{id: 3, name:'牛腩'},{id: 4, name:'雞排'},{id: 5, name:'鸡蛋'}],
					[{id: 6, name:'龍蝦'},{id: 7, name:'臘味'},{id: 8, name:'牛腩'},{id: 9, name:'雞排'},{id: 10, name:'鸡蛋'}]
				]
				this.selectFood = row;
			},
			// 单个商品-遮罩层事件
			onCloseSinglePup() {
				this.$refs.singlePopup.close('bottom');
				setTimeout(()=>{this.showFoodColumn = true},200);
			},
			// 确认选择
			onConfirm() {
				this.selectFood.specification = this.selectcurrent; //商品规格
				this.onEditNum(this.selectFood, 'plus', 'external');
				this.onCloseSinglePup();
			},
			// 加-减商品
			onEditNum(row, type, area) {
				this.operateNum(row, type);
				let index = this.shopCartList.findIndex(v => v.id == row.id);
				// 判断是否是最外层点击事件
				if (area == 'external' && index == -1) {
					this.shopCartList.push(row);
				} else {					
					if(row.num == 0) {
						this.shopCartList.splice(index, 1);
					}
				}
			},
			// 添加 num 字段
			operateNum(row, type) {
				if(!row.hasOwnProperty('num')) { this.$set(row, 'num', 0) }
				if(type == 'minus' && row.num > 0) {
					row.num--;
				} else if(type == 'plus') {
					row.num++
				}
			},
			// 随机排序
			shuffle(arr) {
			    var len = arr.length;
			    for (var i = 0; i < len - 1; i++) {
			        var index = parseInt(Math.random() * (len - i));
			        var temp = arr[index];
			        arr[index] = arr[len - i - 1];
			        arr[len - i - 1] = temp;
			    }
			    return arr;
			}
		},
		filters: {
			filterNum(v) {
				let baseFont = ['一','二','三','四','五','六','七'];
				for (let s of baseFont) {
					return baseFont[v]
				};
			}
		},
		watch: {
			shopCartList: {
				deep: true,
				handler(data) {
					if(!data.length && !this.isPayCart) {
						this.cartPhoto = require('@/static/shop/bulka.png')
					} else if(data.length && !this.isPayCart)  {
						this.cartPhoto = require('@/static/shop/bulka-close.png')
					}
				}
			},
			isPayCart(v) {
				// 盒子图片的三种情况需要改善一下，可以写个fillter.js
				// 在里面处理一些逻辑！！！
				if(this.shopCartList.length && v) {
					this.cartPhoto = require('@/static/shop/bulka-open.png')
				} else if(this.shopCartList.length && !v) {
					this.cartPhoto = require('@/static/shop/bulka-close.png')
				} else if(!this.shopCartList.length && v) {
					this.cartPhoto = require('@/static/shop/bulka.png')
				} else if(!this.shopCartList.length && !v) {
					this.cartPhoto = require('@/static/shop/bulka.png')
				}
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
		width: 160rpx;
		padding-bottom: 85px;
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
		padding-bottom: 65px;
		overflow-y: auto;
		.title {
			padding: 10px 8px;
			font-size: 14rpx;
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
					width: 160rpx;
					height: 160rpx;
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
				@extend %flex;
				flex: 1;
				position: relative;
				image {
					position: absolute;
					top: 59px;
					right: 0px;
					width: 40rpx;
					height: 40rpx;
				}
				text {
					position: absolute;
					top: 58px;
					right: 50rpx;
				}
				.minus {
					transform: translateX(-190%);
					transition: ease-in-out .2s;
				}
			}
		}
	}	

	
	.food-column {
		@extend %flex;
		z-index: 999;
		position: fixed;
		left: 50%;
		bottom: 18px;
		width: 686rpx;
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
			width: 160rpx;
			button {
				width: 103%;
				height: 100%;
				line-height: 48px;
				font-size: 14px;
				color: #FFFFFF;
				background-color: #7F8590;
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
						justify-content: space-between;
						width: 100%;
						margin-right: 4px;
						&-title {
							@extend %text-wrap-overflow;
							margin-bottom: 4px;
							font-size: 16px;
							font-weight: 600;
						}
						&-bottom {
							@extend %flex-jc-sb;
							width: 100%;
							margin-bottom: 4px;
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
	
	// 商品规格
	.select-food-wrap {
		width: 100%;
		height: 50vh;
		padding-bottom: 100px;
		background-color: #fff;
		.select__top {
			@extend %flex;
			padding: 16px;
			margin-bottom: 8px;
			height: 192rpx;
			background-color: #fff;
			&--photo {
				margin-right: 12px;
				image {
					width: 80px;
					height: 80px;
				}
			}
			&__center {
				@extend %flex-fd-w;
				flex: 1;
				margin-right: 4px;
				width: 190px;
				&-title {
					@extend %text-overflow;
					margin-bottom: 6px;
					font-size: 16px;
					font-weight: 600;
				}
				
				&-content {
					flex: 1;
					@extend %text-wrap-overflow;
					margin: 6px 0 0;
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
		}
	
		.select__list {
			margin-top: 12px;
			padding: 0 16px;
			height: 33vh;
			box-sizing: border-box;
			&--box {
				.header {
					position: relative;
					padding: 0 16px;
					margin-bottom: 8px;
					box-sizing: border-box;
					text-align: center;
					.text {
						z-index: 2;
						position: relative;
						padding: 0 12px;
						color: #A3A9B4;
						background-color: #fff;
					}
					.line {
						z-index: 1;
						position: absolute;
						top: 50%;
						left: 0;
						display: inline-block;
						width: 100%;
						height: 1px;
						border-bottom: 1px dashed #E5E5E5;
					}
				}
				
				.content {
					@extend %flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					&-box {
						padding: 8px 24px;
						margin-right: 8px;
						margin-bottom: 8px;
						font-size: 14px;
						color: #7F8590;
						background-color: #F9FAFC;
					}
					.active {
						color: #F9FAFC;
						background: #222326;
					}
				}
			}
		}
		
		.select__btn {
			position: fixed;
			bottom: 8px;
			width: 90%;
			margin: 0 16px;
			padding: 8rpx 0;
			box-sizing: border-box;
			font-size: 14px;
			color: #FFFFFF;
			background: #7355BE;
		}
	}
}
</style>
