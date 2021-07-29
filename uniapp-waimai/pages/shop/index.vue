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
	</view>
</template>

<script>
	export default {
		name: 'shop',
		data() {
			return {
				scrollTop: 0,
			};
		},
		methods: {
			onBlack() {
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">

.shop {

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
		image {
			width: 100%;
			height: 188px;
		}
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background-color: #000;
			opacity: 0.3;
		}
	}
}
</style>
