<template>
	<view class="food-list">
		<view
			 class="box"
			 v-for="(food, index) of foods"
			 :key="index"
		>
			<view class="box__left">
				<image :src="food.photo" mode="aspectFit"></image>
			</view>

			<view class="box__center">
				<view class="title">{{food.title}}</view>
				<view class="content">
					<text v-show="!food.select">{{food.describe}}</text>
					<!-- <text>分量：每份2件</text> -->
					<text v-show="food.select">已选：{{food.select}} X{{food.num}}</text>
				</view>
				<view class="bottom">
					<view v-show="food.tags.length" class="tag" v-for="(tag,i) of food.tags" :key="i">{{tag}}</view>
					<view class="money">
						<text class="p1" v-show="food.discount"><text class="unit">HK$ </text>{{food.discount}}</text>
						<text class="p2" v-show="food.original">HK$ {{food.original}}</text>
					</view>
				</view>
			</view>

			<view class="box__right">
				<slot name="operate" :row="food"></slot>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"FoodList",
		props: {
			foods: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				tags: ['外卖','减脂套餐', '营养消耗餐']
			};
		}
	}
</script>

<style lang="scss" scoped>


.food-list {
	background-color: $bgColor2;
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
			.title {
				@extend %text-overflow;
				font-size: 16px;
				font-weight: 600;
			}
			
			.content {
				flex: 1;
				@extend %text-wrap-overflow;
				margin: 6px 0 0;
				width: 160px;
				color: #A3A9B4;
				font-size: 12px;
			}
			
			.bottom {
				@extend %flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				.tag {
					padding: 0 4px;
					margin-right: 8rpx;
					height: 16px;
					font-size: 12px;
					color: $bgColor;
					background-color: rgba(116,82,163,.1);
				}
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
		}
	}
}
</style>
