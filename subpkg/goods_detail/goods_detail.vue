<template>
	<view class="goods-detail-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品基本信息 -->
		<!-- 添加v-if是为了防止，数据还没回来，页面显示“undefined” -->
		<view class="goods-info-container" v-if="goodsInfo.goods_name">
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<view class="goods-info-body">
				<view class="goods-title">{{goodsInfo.goods_name}}</view>
				<view class="goods-favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="express">快递：免运费</view>
		</view>
		<!-- 商品介绍详情 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品购物车 -->
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters,
	} from 'vuex'
	export default {
		data() {
			return {
				goodsInfo: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},

		computed: {
			...mapState('m_cart', []),
			...mapGetters('m_cart', ['total'])
		},
		onLoad(options) {
			this.queryGoodsDetail(options.goods_id)
			// 从缓存里拿商品详情页面的购物车上标数量
			this.options[2].info = this.total
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),

			async queryGoodsDetail(goods_id) {
				const res = await uni.$request('/api/public/v1/goods/detail', {
					goods_id
				})
				let {
					message
				} = res.data
				if (res.statusCode !== 200) uni.$showMsg()
				else {
					//这里把introduce里img标签加display:block，让图片之间没有间隙
					message.goods_introduce = message.goods_introduce.replace(/<img /g,
							'<img style="display:block"')
						.replace(/webp/g, 'jpg')
					this.goodsInfo = message
				}
			},

			//图片预览
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsInfo.pics.map((item) => item.pics_big)
				})
			},

			onClick(e) {
				const {
					text
				} = e.content
				if (text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				} else if (text === '客服') uni.$showMsg('俺们没有客服')
				else uni.$showMsg('俺们也没有店铺')
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const {
						goods_id,
						goods_name,
						goods_price,
						goods_small_logo
					} = this.goodsInfo
					const goods = {
						goods_id,
						goods_name,
						goods_price,
						goods_count: 1,
						goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
					this.options[2].info++
				}
			}
		},

		watch: {

		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		padding-bottom: 50px;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.goods-info-container {
			padding: 20rpx;
			padding-right: 0;

			.price {
				color: #C00000;
				font-size: 36rpx;
				margin: 20rpx 0;
			}

			.goods-info-body {
				display: flex;
				justify-content: space-between;

				.goods-title {
					font-size: 26rpx;
					margin-right: 20rpx;
				}

				.goods-favi {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 240rpx;
					font-size: 24rpx;
					border-left: 2rpx solid #efefef;
					color: gray
				}
			}

			.express {
				font-size: 24rpx;
				color: gray;
				margin: 20rpx 0;
			}
		}

		.goods-carts {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
		}
	}
</style>