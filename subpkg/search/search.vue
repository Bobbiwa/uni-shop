<template>
	<view>
		<view class="search-container">
			<uni-search-bar :radius="100" cancel-button="none" @input="input"></uni-search-bar>
		</view>

		<view class="sugg-container">
			<view class="sugg-item" v-for="(item,i) in searchResult" :key="i" @click="goDetail(item.goods_id)">
				<view class="good-name">{{item.goods_name}}</view>
				<uni-icons type="arrow-right" size="16"></uni-icons>
			</view>
		</view>

		<view class="history-container" v-if="searchResult.length === 0">
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-item">
				<uni-tag :text="item" v-for="(item,i) in historyList" :key="i" @click="tagToGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyValue: '',
				searchResult: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]') 
		},
		methods: {
			input(value) {
				// 防抖优化
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyValue = value
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.keyValue.length === 0) {
					return this.searchResult = []
				}
				const res = await uni.$request('/api/public/v1/goods/qsearch', {
					query: this.keyValue
				})
				if (res.statusCode === 200) {
					this.searchResult = res.data.message
				} else {
					uni.$showMsg()
				}
			},
			goDetail(id) {
				const index = this.historyList.indexOf(this.keyValue);
				if (index !== -1) {
					// keywords重复了，就把之前的删掉
					this.historyList.splice(index,1)
				}
				this.historyList.unshift(this.keyValue) //存状态
				uni.setStorageSync('kw',JSON.stringify(this.historyList))	//存缓存
				
				// 跳转到detail
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			},
			clearHistory() {
				this.historyList = []
				uni.removeStorageSync('kw')
			},
			tagToGoodsList(kw) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-container {
		padding: 0 10rpx;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 26rpx 0;
			border-bottom: 2rpx solid #efefef;

			.good-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 6rpx;
			}
		}
	}

	.history-container {
		padding: 0 10rpx;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			font-size: 26rpx;
			border-bottom: 2rpx solid #efefef;
		}

		.history-item {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>