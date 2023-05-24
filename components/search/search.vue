<template>
	<view class="search-container" @click="handleClickSearch">
		<view class="my-search-box">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"search",
		data() {
			return {
				
			};
		},
		methods: {
			handleClickSearch() {
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search-container {
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	height: 100rpx;
	background-color: #c00000;
	.my-search-box {
		display: flex;
		align-items: center;
		justify-content:center;
		height: 72rpx;
		width: 100%;
		background-color: #fff;
		border-radius: 36rpx;
		.placeholder {
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}
}
</style>