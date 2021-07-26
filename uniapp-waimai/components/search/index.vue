<template>
	<view class="search-wrap">
		<view class="search__top">
			<image src="~@/static/icon/ic_back_white.png" @click="onGoblack" mode=""></image>
			<input v-model="value" @blur="onBlur" type="text" placeholder="发现更多美食" placeholder-style="color:#9499A2;" />
			<image src="~@/static/icon/ic_nav_search.png" @click="onSearch" mode=""></image>
		</view>
		<view class="search__content" v-show="isHistory">
			<view class="content-title">
				<text>历史搜索</text>
				<image src="~@/static/icon/ic_delete.png" mode=""></image>
			</view>
			
			<view class="content-history">
				<view class="box" v-for="(item,index) of list" :key="index">
					{{item}}
				</view>
			</view>
		</view>

		
		<view class="search-list" v-show="!isHistory">
			<v-tabs :value="currentTab" :scroll="false" :tabs="['商品', '店铺']"  @change="changeTab" height="44px" lineHeight="2px" activeColor="#7452A3" lineColor="#7452A3" :bold="false"></v-tabs>
			
			<view value="商品" v-show="!currentTab">
				<FoodList :foods="foodList">
					<template v-slot:operate>
						<view class="operate">
							<text class="iconfont icon-arrow-right"></text>
						</view>
					</template>
				</FoodList>
			</view>
			<view class="shop-wrap" value="店铺" v-show="currentTab" >
				<view
					 class="shop"
					 v-for="(shop, index) of shopsList"
					 :key="index"
				>
					<view class="shop__left">
						<image :src="shop.photo" mode="aspectFit"></image>
					</view>

					<view class="shop__center">
						<view class="title">{{shop.title}}</view>
						<view class="tag-box">
							<view v-show="shop.tags.length" class="tag" v-for="(tag,i) of shop.tags" :key="i">{{tag}}</view>
						</view>
					</view>

					<view class="shop__right">
						<button type="default" @click="goShop(shop)">进店看看</button>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>
	
<script>
import FoodList from '@/components/food-list';
export default {
	components: {
		FoodList
	},
	data() {
		return {
			isHistory: true, // 是否显示历史记录
			value: '',
			currentTab: 0,
			list: ['西餐','麻辣烫','粤菜','海底捞','小肥牛','家乡味'],
			foodList: [
				{
					photo: require('@/static/food/pic1.png'),
					title: "醋漬鮮鯖魚寿司",
					select: "三文鱼",
					num: 2,
					tags: ['外卖', '减脂套餐'],
					original: 28
				},
				{
					photo: require('@/static/food/pic2.png'),
					title: "黄金鲔鱼寿司",
					describe: '當天進貨 保證新鮮 口感細膩',
					discount: 38.8, // 优惠价
					original: 38    // 原价
				}
			],
			shopsList: [
				{
					photo: require('@/static/home/logo1.png'),
					title: "九宮庭川式火鍋",
					tags: ['火锅', '特色九宫格火锅'],
				},
				{
					photo: require('@/static/home/logo2.png'),
					title: "We Eat Fit 輕食沙拉",
					tags: ['沙拉', '减脂套餐'],
				}
			]
		}
	},
	methods: {
		onGoblack() {
			this.clearSearch();
			this.$emit('close');
		},
		goShop(v) {
			console.log(v)
		},
		/* 
		 *  输入框事件 
		 */
		onBlur(el) {
			this.isHistory = !el.detail.value.length ? true : false;
		},
		onSearch() {
			console.log('搜索：', this.value);
			this.isHistory = !this.value.length ? true : false;
		},
		clearSearch() {
			this.isHistory = true;
			this.value = '';
		},
 
		/*
		 *  搜索列表事件
		 */
		changeTab(index) {
			this.currentTab = index;
			console.log('当前选中的项：' + index)
		}
	}
}
</script>

<style lang="scss">

$iconSize: 20px;

.search-wrap {
	width: 100vw;
	height: 100%;
	background-color: #fff;
	.search {
		
		&__top {
			@extend %flex-jc-sb, %flex-ai-c;

			padding: 0 16px;
			height: 48px;
			background-color: #222326;
			image {
				width: $iconSize;
				height: $iconSize;
			}
			input {
				flex: 1;
				padding: 4px 12px;
				margin: 0 12px 0 8px;
				border-radius: 20px;
				color: #e5e5e5;
				background-color: rgba(225,225,225,.3);
			}
		}
		
		&__content {
			padding: 16px;
			height: 100%;
			background: #F9FAFC;
			
			.content {
				
				&-title {					
					@extend %flex-jc-sb, %flex-ai-c;
					margin-bottom: 18px;
					text {
						font-size: 14px;
						font-weight: 500;
						color: #222326;
					}
					image {
						width: $iconSize;
						height: $iconSize;
					}
				}
				
				&-history {
					@extend %flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.box {
						margin-right: 12px;
						margin-bottom: 12px;
						padding: 8px 16px;
						height: 36px;
						font-size: 14px;
						box-sizing: border-box;
						color: $grColor;
						background-color: #fff;
					}
				}
			}

		}
	}

	.operate {
		@extend %flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		.uni-icons {
			font-size: 20px !important;
		}
	}
	
	.shop-wrap {
		background-color: #F9FAFC;
		.shop {
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
				
				.tag-box {
					@extend %flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					.tag {
						padding: 0 4px;
						margin-top: 14px;
						margin-right: 8px;
						height: 16px;
						font-size: 12px;
						color: $bgColor;
						background-color: rgba(116,82,163,.1);
					}
				}
				
			}
			&__right {
				flex: 1;
				position: relative;
				top: 25px;
				width: 100%;
				height: 32px;
				button {
					width: 80px;
					height: 32px;
					line-height: 22px;
					padding: 6px 12px;
					font-size: 12px;
					color: #fff;
					background-color: $bgColor;
				}
			}
		}
	}

}
</style>
