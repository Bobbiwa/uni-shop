<template>
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 收货地址 -->
		<myAddress></myAddress>
		<!-- 购物车标题 -->
		<view class="cart-title">
			<uni-icons type="shop" size="30"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<!-- 商品列表 -->
		<uni-swipe-action>
			<block v-for="(item,i) in cart" :key="item">
				<uni-swipe-action-item :right-options="options" @click="handleClickSwipeItem(item.goods_id)">
					<my-goods-item :item="item" :isShowRadio="true" :isShowNum="true"></my-goods-item>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算 -->
		<mySettle></mySettle>
	</view>

	<!-- 空白购物车 -->
	<view class="empty-cart" v-else>
		<image src="@/static/E-Commerce 01.png" mode="aspectFill" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			}
		},
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations('m_cart', ['removeGoodsById']),
			handleClickSwipeItem(goods_id) {
				this.removeGoodsById(goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 100rpx;

		.cart-title {
			display: flex;
			height: 80rpx;
			align-items: center;
			font-size: 28rpx;
			padding-left: 10rpx;
			border-bottom: 1px solid #efefef;

			.cart-title-text {
				margin-left: 20rpx;
			}
		}
	}
	
	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 300rpx;
		.empty-img{
			width: 180rpx;
			height: 180rpx;
		}
		.tip-text{
			font-size: 24rpx;
			color: gray;
			margin-top: 30rpx;
		}
	}
</style>