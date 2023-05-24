export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations: {
		addToCart(state, goods) {
			const res = state.cart.find((item) => item.goods_id === goods.goods_id)
			if (!res) {
				state.cart.push(goods)
			} else res.goods_count++

			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
			const res = state.cart.find((item) => item.goods_id === goods.goods_id)
			if (res) {
				res.goods_state = goods.goods_state
				uni.setStorageSync('cart', JSON.stringify(state.cart))
			}
		},
		updateGoodsCount(state, goods) {
			const res = state.cart.find((item) => item.goods_id === goods.goods_id)
			if (res) {
				res.goods_count = goods.goods_count
				uni.setStorageSync('cart', JSON.stringify(state.cart))
			}
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		}
	},
	getters: {
		total(state) {
			//拿到当前缓存里cart里的商品数量 
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	}

}