<template>
	<view class="adoption">
		<view class="adoption__box"
			v-for="(item,index) of listAdop"
			:key="index + 'listAdop'"
		>
			<image :src="item.img" mode="aspectFill"></image>
			<view class="adoption__box__content">
				<view class="content-title">
					<text class="content-title-text">{{item.title}}</text>
					<text class="content-title-tag" v-if="item.top">置顶</text>
				</view>
				<view class="content-site">
					<view>地址：</view>
					<text>{{item.site}}</text>					
				</view>
				<view class="content__tag">
					<view class="content__tag-left">
						<text space="nbsp"
							v-for="(list,index) of item.tag"
							:key="list"
						>#  {{list}}</text>
						<!-- <text space="nbsp">#  无偿领养</text> -->
					</view>
					<view class="content__tag-right">
						<image :src="item.ico" mode="aspectFit"></image>
						<text :class="{'textStyle' : item.collect === false}">{{ item.collect ? '已收藏' : '收藏' }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['listAdop'],
		data() {
			return {
				
			}
		},

		methods: {
			
		}
	}
</script>

<style lang="scss">
@import '~@/uni.scss';
.adoption {
	margin-top: 35rpx;
	&__box {
		width: 718rpx;
		// height: 520rpx;
		margin: auto;
		margin-bottom: 32rpx;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 2px 8px 0 rgba(77,79,168,.12);
		
		
		image {
			width: 100%;
			height: 320rpx;
		}
		
		&__content {
			@extend .flex;
			justify-content: space-around;
			flex-direction: column;
			padding: 12rpx 25rpx;
			height: 200rpx;
			.content-title {
				margin-bottom: 12rpx;
				color: $bgColor2;
				&-text {
					margin-right: 30rpx;
					font-size: 40rpx;
				}
				&-tag {
					padding: 2rpx 18rpx;
					font-size: 22rpx;
					border-radius: 4px;
					color: #fff;
					background-color: $purple;
					
				}
			}
			.content-site {
				@extend .flex;				
				font-size: 30rpx;
				view {
					width: 100rpx;
				}
			}
			.content__tag {
				@extend .flex-sb;
				margin: 12rpx 0;
				&-left {
					text:first-child {
						margin-right: 17rpx;
					}
					text {						
						padding: 2rpx 26rpx;
						font-size: 26rpx;
						border-top-left-radius: 10px;
						border-bottom-right-radius: 10px;
						background-color: $bgColor;						
					}
				}
				&-right {
					@extend .flex;					
					width: 155rpx;
					height: 42rpx;
					image {				
						flex: 1;
						width: 100%;
						height: 100%;				
					}
					text {							
						color: $purple;	
						font-size: 32rpx;
					}
					.textStyle {
						color: #000;
					}
				}
			}
			
		}
	}
}
</style>
