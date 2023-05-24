<template>
	<view class="goods-item">
		<!-- 左图片 -->
		<view class="goods-item-left">
			<radio :checked="item.goods_state" color="#C00000" v-if="isShowRadio" @click="handleRadioChange(item)">
			</radio>
			<image :src="item.goods_small_logo"></image>
		</view>
		<!-- 右信息 -->
		<view class="goods-item-right">
			<view class="goods-info">{{item.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{item.goods_price | tofixed}}</view>
				<uni-number-box :value="item.goods_count" v-if="isShowNum" @change="handleNumChange()"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "my-goods-list",
		props: {
			item: {
				type: Object,
				default: {}
			},
			isShowRadio: {
				type: Boolean,
				default: false
			},
			isShowNum: {
				type: Boolean,
				default: false
			}
		},
		// 过滤器
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount']),
			handleRadioChange(item) {
				// 修改缓存的商品状态
				this.updateGoodsState({
					goods_id: item.goods_id,
					goods_state: !item.goods_state
				})

			},
			handleNumChange(val) {
				//修改商品数量
				this.updateGoodsCount({
					goods_id: this.item.goods_id,
					goods_count: val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f0f0f0;
		width: 750rpx;
		box-sizing: border-box;

		.goods-item-left {
			margin-right: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;


			image {
				display: block; //防止图片底下有间隙
				width: 200rpx;
				height: 200rpx;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-info {
				font-size: 26rpx;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.goods-price {
				font-size: 32rpx;
				color: #C00000;
			}
		}
	}
</style>