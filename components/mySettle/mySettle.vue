<template>
	<view class="settle-container">
		<!-- 全选 -->
		<label class="radio" @click="handleChangeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="settle-btn" @click="handleClickSettle">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "mySettle",
		data() {
			return {
				seconds: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			isFullCheck() {
				return this.total === this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			handleChangeAllState() {
				this.updateAllGoodsState(!this.isFullCheck)
			},
			handleClickSettle() {
				// 是否勾选商品
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				// 是否选择了收货地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址')
				// 是否登录
				// if (!this.token) return uni.$showMsg('请先登录')
				if (!this.token) return this.delayNavigate()

				// 支付功能
				this.payOrder()
			},
			delayNavigate() {
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					// 判断秒数是否 <= 0
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my'
						})
						this.seconds = 3
						return
					}
					this.showTips(this.seconds)
				}, 1000)
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请登录后再结算！' + n + '秒后自动跳转至登录页面',
					mask: true,
					duration: 1500
				})
			},
			async payOrder() {
				// 一、创建订单
				// 1.组织订单对象
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.addstr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				// 2.发起创建订单请求
				const res = await uni.$request('/api/public/v1/my/orders/create', orderInfo, 'POST')
				if (res.statusCode !== 200) return uni.$showMsg('创建订单失败！')
				// 3.获取订单号
				const orderNum = 123456 //因为服务器的问题，这里模拟了一个假订单号

				// 二、订单预支付
				// 1.发起获取订单的支付信息
				const res2 = await uni.$request('/api/public/v1/my/orders/req_unifiedorder', {
					order_number: orderNum
				}, 'POST')
				// 2.预订单失败
				if (res2.statusCode !== 200) return uni.$showMsg('预付订单生成失败！')
				// 3.得到订单相关必要参数
				const payInfo = {
					noceStr: 'diwandioa',
					package: 'wadaw',
					paySign: 'dawjdbaiwujbd',
					signType: 'MD5',
					timeStamp: '124534534'
				}

				// 三、发起支付
				// 3.1调用uni.requestPayment发起微信支付
				const [err, succ] = await uni.requestPayment(payInfo)
				// 3.2未完成支付
				// if(err) return uni.$showMsg('订单未支付！')   这里会一直报错，因为后端有问题，会一直返回err 不会succ

				// 3.3完成支付，进一步查询支付结果
				const res3 = await uni.$request('/api/public/v1/my/orders/chkOrder', {
					order_number: orderNum
				})
				// 3.4 检测到订单未支付
				if (res3.statusCode !== 200) return uni.$showMsg('订单未支付')
				// 3.5 检测到订单支付完成
				uni.showToast({
					title: '支付完成',
					icon: 'success'
				})
			}
		}
	}
</script>

<style lang="scss">
	.settle-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: white;
		font-size: 28rpx;
		padding-left: 10rpx;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #C00000;
				font-weight: bold;
			}
		}

		.settle-btn {
			background-color: #C00000;
			height: 100rpx;
			color: white;
			line-height: 100rpx;
			padding: 0 20rpx;
			min-width: 200rpx;
			text-align: center;
		}
	}
</style>