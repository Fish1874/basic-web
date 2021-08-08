<template>
	<view class="shop-detail">
		<view class="header">
			<image @click="onBlack" src="~@/static/icon/ic_back_white.png" mode=""></image>
			<text>商家信息</text>
		</view>
		
		<view class="shop__top">
			<view class="shop__top--photo">
				<image :src="detail.photo" mode="aspectFit"></image>
			</view>

			<view class="shop__top__center">
				<view class="shop__top__center-title">{{detail.title}}</view>
				<view class="shop__top__center-content">
					<view class="tag" v-for="(tag,i) of tags" :key="i">{{tag}}</view>
				</view>
			</view>
		</view>
		
		<view class="shop__msg">
			<view class="shop__msg-title">基础信息</view>
			<view class="shop__msg-content">
				<view class="box">
					<view class="label">公司</view>
					<view class="text">{{ detail.basicMsg ? detail.basicMsg.company : '' }}</view>
				</view>
				<view class="box">
					<view class="label">开店时间</view>
					<view class="text">{{ detail.basicMsg ? detail.basicMsg.date : '' }}</view>
				</view>
				<view class="box">					
					<view class="label">所在地</view>
					<view class="text">{{ detail.basicMsg ? detail.basicMsg.address : '' }}</view>
				</view>
			</view>
		</view>
		
		<view class="shop__photo">
			<view class="shop__photo-title">店鋪相册</view>
			<scroll-view scroll-y style="height: 80%;">
				<view class="shop__photo-content">
					<view class="item">
						<image src="~@/static/shop/shop1.png" mode="widthFix"></image>
					</view>
					<view class="item">
						<image src="~@/static/shop/shop2.png" mode="widthFix"></image>
					</view>
					<view class="item">
						<image src="~@/static/shop/shop3.png" mode="widthFix"></image>
					</view>

				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'ShopDetail',
		data() {
			return {
				detail: {
					id:1,
					photo: require('@/static/home/logo2.png'),
					title: "MAKI HOUSE 日式料理",
					basicMsg: {
						company: '广州ABCD有限公司',
						date: '2020-10-10 12:00',
						address: '广州越秀区先烈中路80号'
					}
				},
				tags: ['日料', '铁板烧']
			};
		},
		methods: {
			onBlack() {
				this.$emit('close');
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss">

.shop-detail {
	width: 100vw;
	height: 100vh;
	background-color: $bgColor2;
	
	.header {
		@extend %flex-ai-c;
		padding: 0 16px;
		height: 44px;
		color: #fff;
		background-color: #222326;
		image {
			width: 20px;
			height: 20px;
		}
		text{
			width: calc(100vw - 72px);
			text-align: center;
		}
	}
	
	.shop__top {
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
			flex: 1;
			margin-right: 4px;
			// width: 190px;
			&-title {
				@extend %text-overflow;
				margin-bottom: 6px;
				font-size: 16px;
				font-weight: 600;
			}
			
			&-content {
				flex: 1;
				@extend %flex;
				margin: 12px 0 0;
				color: #A3A9B4;
				font-size: 12px;
				.tag {
					@extend %tag;
				}
			}

		}
	}

	.shop__msg {
		margin: 8px 0;
		padding: 12px 16px;
		background-color: #fff;
		&-title {
			margin-bottom: 12px;
			color: #222326;
			font-size: 16px;
		}
		&-content {
			.box {				
				@extend %flex;
				margin-bottom: 12px;
				font-size: 14px;
				.label {
					position: relative;
					margin-right: 12px;
					width: 70px;
					height: 20px;
					color: #A3A9B4;
					border-right: 1px solid #A3A9B4;
				}
				.text {
					font-weight: 600;
				}
			}
		}
		
	}
	
	.shop__photo {
		margin: 8px 0;
		padding: 12px 16px;
		height: 50vh;
		overflow: hidden;
		background-color: #fff;
		&-title {
			margin-bottom: 12px;
			color: #222326;
			font-size: 16px;
		}
		&-content {
			@extend %flex;
			flex-wrap: wrap;
			.item {
					width: 50%;
				image {
					width: 95%;
					height: auto;
				}				
			}
			
		}
	}
}
</style>

