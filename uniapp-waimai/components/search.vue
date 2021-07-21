<template>
	<view class="search-wrap" :style="[show ? tsf : '']">
		<view class="search__top">
			<image src="../static/icon/ic_back_white.png" @click="onGoblack" mode=""></image>
			<input type="text" :value="value" placeholder="发现更多美食" placeholder-style="color:#9499A2;" />
			<image src="../static/icon/ic_nav_search.png" mode=""></image>
		</view>
		<view class="search__content">
			<view class="content-title">
				<text>历史搜索</text>
				<image src="../static/icon/ic_delete.png" mode=""></image>
			</view>
			
			<view class="content-history">
				<view class="box" v-for="(item,index) of list" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			value: '',
			list: ['西餐','麻辣烫','粤菜','海底捞','小肥牛','家乡味'],
			tsf: {transform: 'translateX(0)'}
		}
	},
	methods: {
		onGoblack() {
			this.$emit('close');
		}
	}
}
</script>

<style lang="scss">

$iconSize: 20px;

.search-wrap {
	z-index: 999;
	position: fixed;
	top: 0px;
	// #ifdef H5
	top: 44px;
	// #endif
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	transform: translateX(100vh);
	transition: ease-in-out .5s;
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
						color: #7F8590;
						background-color: #fff;
					}
				}
			}

		}
	}
}
</style>
