<template>
	<view class="shop-list">
		<view class="left-area">
			<view
				class="cell" 
				v-for="(item,index) of sort"
				:key="index + 'sort'"
				:style="{backgroundColor: current == index ? '#fff': ''}"
				@click="current = index"
			>{{item}}</view>
		</view>
		<view class="right-area">
			右侧区域
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ShopList',
		data() {
			return {
				current: 0,
				sort: ['推荐','进店必买'],
			};
		}
	}
</script>

<style lang="scss">

$textColor:#A3A9B4;

.shop-list {
	@extend %flex;
	margin-top: 8px;
	height: calc(100vw - 11px);
	background-color: #fff;
	overflow: hidden;
	.left-area {
		width: 80px;
		overflow-y: auto;
		background-color: #f0f0f0;
		.cell {
			padding: 12px 16px;
			font-size: 12px;
			color: $textColor;			
			transition: ease-in-out .2s
		}
	}
	.right-area {
		flex:1
	}
}
</style>
