<template>
	<view>
		<view class="goods-list">
			<view v-for="(item,i) in goodsList" :key="i" @click="goToDetail(item)">
				<my-goods-item :item="item"></my-goods-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [], //用来存储商品列表
				total: 0, //总数量，用来分页,
				isLoading: false,
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''

			this.queryGoodsList()
		},
		methods: {
			async queryGoodsList(cb) {
				this.isLoading = true  //用于节流
				uni.showLoading({title: '加载中哦~~'})  //用于开启spinner
				
				const res = await uni.$request('/api/public/v1/goods/search', this.queryObj)
				const {
					goods,
					pagenum,
					total
				} = res.data.message

				cb && cb() //数据请求完毕，立刻停止下拉刷新
				uni.hideLoading()
				
				if (res.statusCode !== 200) uni.$showMsg()
				else {
					this.goodsList = [...this.goodsList, ...goods]
					this.total = total
				}
				this.isLoading = false
			},
			
			goToDetail(item) {
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		onReachBottom() {
			//判断是否触底，防止触底后发送无效pagenum参数
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('已经触底了哦~', 'none')
			//判断节流阀
			if (this.isLoading) return

			this.queryObj.pagenum += 1
			this.queryGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1,
				this.total = 0,
				this.goodsList = []
			this.isLoading = false
			this.queryGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
</style>