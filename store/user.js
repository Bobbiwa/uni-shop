export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		updateUserInfo(state, userinfo) {
			state.userInfo = userinfo
			uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
		},
		updateToken(state, token) {
			state.token = token
			uni.setStorageSync('token', state.token)
		}
	},

	getters: {
		addstr(state) {
			const {
				provinceName,
				cityName,
				countyName,
				detailInfo
			} = state.address
			if (!state.address.provinceName) return ''
			return provinceName + cityName + countyName + detailInfo
		}
	}
}