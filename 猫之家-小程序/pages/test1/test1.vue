<template>
	<view class="test">
		<view class="uploadImg">
			<view class="uploadImg__title">上传图片</view>
			<view class="uploadImg-box">
				<view 
					class="uploadImg__imgs"
					v-for="(item,index) of imgList"
					:key="index + 'imgList'"
					@click="previewImg(index)"
				>
					<image :src="item" mode="aspectFit"></image>
				</view>
				<view class="uploadImg__btn" @click="uploadImgBtn">
					<image src="~@/static/ico/addImg.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		
		<!-- #ifdef MP-WEIXIN -->
		<view style="text-align: center;">只有在微信小程序才能看得到这一段话~</view>
		<!-- #endif -->
		
		<!-- 路由跳转 -->
		<view>
			<view>
				<text>导航式跳转:</text>
				<!-- 默认跳转方式是navigate  它只会跳到普通页面，不会跳到tabbar页面 -->
				<navigator url="/pages/index/index" open-type="switchTab">
					<view style="font-size: 50rpx;text-align: center;">跳至主页</view>
				</navigator>
				<text>编程式跳转：</text>
				<button type="default" @click="jump">跳至社区页</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
			}
		},
		methods: {
			uploadImgBtn() {
				uni.chooseImage({
					count: 9,
					success: (obj) => {
						console.log('图片：',obj)
						this.imgList.push(...obj.tempFilePaths);
					}
				})
			},
			// 预览图片
			previewImg(current) {
				uni.previewImage({
					current,
					urls:this.imgList
				})
			},
			//编程式跳转
			jump() {
				uni.switchTab({
					url: '/pages/community/community',
				})
			}
		}
	}
</script>

<style lang="scss">
@import '~@/uni.scss';

.test {
	padding: 25rpx 0;
}

.uploadImg {
	padding: 0 25rpx 25rpx;
	margin: 0 25rpx;
	border: 1px solid #fff;
	border-radius: 16rpx;
	box-shadow: 0 2px 8px 0 rgba(77,79,168,.12);
	&__title {
		margin-top: 25rpx;
	}

	&-box {
		@extend .flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		view {
			width: 150rpx;
			height: 150rpx;
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
	&__imgs {
		@extend .flex;
		margin-top: 25rpx;
		margin-right: 12rpx;
		&:last-child  {
			margin: 0;
			background-color: red;
			
		}
	}
	
	&__btn {
		margin-top: 25rpx;
		text-align: center;
		line-height: 200rpx;
		border: 1px dashed #bdc3c7;
		image {
			width: 80rpx;
			height: 80rpx;
		}
	}
}

</style>
