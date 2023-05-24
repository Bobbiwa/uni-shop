<template>
	<view>
		<view class="search-container">
			<search></search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<!-- Nav导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="handleNavClick(item.name)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层内容 -->
				<view class="floor-img-box">
					<!-- 左1 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}" mode="widthFix">
					</navigator>
					<!-- 右4 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2"
							v-if="index2 !== 0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width + 'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		mixins: [badgeMix],
		onLoad() {
			this.querySwiper()
			this.queryNavList()
			this.queryFloorList()
		},
		methods: {
			//请求轮播图
			async querySwiper() {
				const res = await uni.$request('/api/public/v1/home/swiperdata')
				if (res.statusCode === 200) {
					const {
						message
					} = res.data
					this.swiperList = message
				} else {
					//如果请求失败，发送一个失败图片
					return uni.$showMsg()
				}
			},
			async queryNavList() {
				const res = await uni.$request('/api/public/v1/home/catitems')
				if (res.statusCode === 200) {
					const {
						message
					} = res.data
					this.navList = message
				} else {
					return uni.$showMsg()
				}

			},
			handleNavClick(name) {
				if (name === '分类') {
					console.log(1)
				}
				if (name === '秒杀拍') {
					console.log(2)
				}
				if (name === '超市购') {
					console.log(3)
				}
				if (name === '母婴品') {
					console.log(4)
				}
			},
			async queryFloorList() {
				const res = await uni.$request('/api/public/v1/home/floordata')
				if (res.statusCode === 200) {
					const {
						message
					} = res.data
					//重构product list参数，之前请求回来的product list 的 navigator参数不对
					message.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split(
								'?')[1]
						})
					})
					this.floorList = message
				} else {
					return uni.$showMsg()
				}
			},
		}
	}
</script>

<style lang="scss">
	.search-container {
		// 设置吸顶
		position: sticky;
		// 设置吸顶位置 
		top: 0;
		z-index: 999;
	}

	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>