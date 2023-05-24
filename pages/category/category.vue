<template>
	<view>
		<search></search>
		<view class="scroll-container">
			<!-- 左滚动 -->
			<scroll-view class="left-scroll" scroll-y="true" :style="{height:winHight + 'px'}">
				<view :class="['left-scroll-item', i === active? 'active':'']" v-for="(item,i) in categoryList"
					@click="handleActive(i)">{{item.cat_name}}</view>
			</scroll-view>
			<!-- 右滚动 -->
			<scroll-view class="right-scroll" scroll-y="true" :style="{height:winHight + 'px'}" :scroll-top="scrollTop">
				<view class="right-scroll-item" v-for="(item2,index2) in cateLevel2" :key="index2">
					<!-- 二级分类 -->
					<view class="right-l2-title">
						/ {{item2.cat_name}} /
					</view>
					<!-- 三级分类 -->
					<view class="cate-lv3-list">
						<view class="right-l3-item" v-for="(item3,index3) in item2.children" :key="index3"
							@click="goToGoodList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				winHight: 0,
				categoryList: [],
				active: 0,
				cateLevel2: [],
				scrollTop: 0
			};
		},
		mixins: [badgeMix],
		onLoad() {
			//getSystemInfoSync() 拿到机型信息
			const {
				windowHeight
			} = uni.getSystemInfoSync()
			this.winHight = windowHeight - 50

			this.queryCategoryList()
		},
		methods: {
			async queryCategoryList() {
				const res = await uni.$request('/api/public/v1/categories')
				if (res.statusCode === 200) {
					const {
						message
					} = res.data
					this.categoryList = message
					this.cateLevel2 = message[0].children
				} else {
					return uni.$showMsg()
				}
			},
			handleActive(i) {
				this.active = i
				this.cateLevel2 = this.categoryList[i].children
				// 切换一级分类重置滚动条。
				// 交替赋值0，1   是因为如果赋值和状态之前的值相同，那么底层不会复制
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			goToGoodList(item) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-container {
		display: flex;

		.left-scroll {
			width: 240rpx;

			.left-scroll-item {
				background-color: #F7F7F7;
				line-height: 120rpx;
				text-align: center;
				font-size: 24rpx;

				&.active {
					background-color: #FFF;
					position: relative;

					&::before {
						content: ' ';
						display: block;
						width: 6rpx;
						height: 60rpx;
						background-color: #C00;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
				}

			}
		}


		.right-scroll-item {
			.right-l2-title {
				font-size: 24rpx;
				font-weight: bold;
				text-align: center;
				padding: 30rpx 0;
			}

			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;

				.right-l3-item {
					width: 33.33%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin-bottom: 20rpx;

					image {
						width: 120rpx;
						height: 120rpx;
					}

					text {
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>