<template>
	<view class="search-wrap">
		<view class="search__top">
			<image src="../static/icon/ic_back_white.png" @click="onGoblack" mode=""></image>
			<input v-model="value" type="text" placeholder="发现更多美食" placeholder-style="color:#9499A2;" />
			<image src="../static/icon/ic_nav_search.png" @click="onSearch" mode=""></image>
		</view>
		<view class="search__content" v-show="false">
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

		<v-tabs v-model="activeTab" :scroll="false" :tabs="['商品', '选项卡']"  @change="changeTab" v-bind="options"></v-tabs>
		
		<view class="" value="商品">
			123
		</view>
		<view class="" value="选项卡">
			123
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			list: ['西餐','麻辣烫','粤菜','海底捞','小肥牛','家乡味'],
			activeTab: 0,
			options: {
				height: '44px',
				 lineHeight: '2px',
				 activeColor:"#7452A3",
				 lineColor:"#7452A3",
				 bold: false,
			}
		}
	},
	methods: {
		onGoblack() {
			this.$emit('close');
		},
		onSearch() {
			console.log('搜索：', this.value);
		},
		swipeChange(e,index){
		  console.log('当前状态：'+ open +'，下标：' + index)
		},
		changeTab(index) {
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
						color: #7F8590;
						background-color: #fff;
					}
				}
			}

		}
	}


}
</style>
