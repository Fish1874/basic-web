<template>
	<view class="petShop">

		<view class="petShop-box" v-for="(item,index) of listPet" :key="index + 'listPet'">
			<view class="petShop-box__img">
				<image :src="item.img" mode="widthFix"></image>
			</view>
			<view class="petShop-box-content">
				<view class="petShop-box-content__title">{{item.title}}</view>
				<view class="petShop-box-content__site">
					<view>地址：</view>
					<text>{{item.site}}</text>
				</view>
				<view class="petShop-box-tag">
					<text space="nbsp" v-for="(list,index) of item.tag" :key="list"># {{list}}</text>

				</view>
				<view class="petShop-box-date">
					<view class="petShop-box-date__look">浏览：{{item.look}}</view>
					<view class="petShop-box-date__day">发布：{{item.date}}</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props:['listPet'],
		data() {
			return {
				loadingText: '',
			}
		},
		mounted() {

		},

		methods: {
		}
	}
</script>

<style lang="scss">
	@import '~@/uni.scss';

	.petShop {
		margin-top: 30rpx;

		&-box {
			@extend .flex;
			width: 718rpx;
			// height: 238px;
			margin: auto;
			margin-bottom: 32rpx;
			padding: 24rpx 0;
			border-radius: 10px;
			overflow: hidden;
			box-shadow: 0 2px 8px 0 rgba(77, 79, 168, .12);

			&__img {
				padding: 0 24rpx;

				image {
					width: 192rpx;
				}
			}

			&-content {
				flex: 1;
				@extend .flex;
				flex-direction: column;
				justify-content: space-around;


				&__title {
					font-size: 38rpx;
				}

				&__site {
					@extend .flex;
					font-size: 28rpx;
					color: $fontColor;

					view {
						width: 100rpx;
					}
				}
			}

			&-tag {
				text {
					margin-right: 17rpx;
					padding: 2rpx 26rpx;
					font-size: 26rpx;
					border-top-left-radius: 10px;
					border-bottom-right-radius: 10px;
					background-color: $bgColor;
				}
			}

			&-date {
				@extend .flex;
				color: $fontColor;

				&__look {
					margin-right: 40rpx;
					font-size: 28rpx;
				}

				&__day {
					font-size: 28rpx;
				}
			}
		}

		.loading {
			text-align: center;
			line-height: 80rpx;
		}
	}
</style>
