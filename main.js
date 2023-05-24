// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import $request from './utils/utils.js'
import store from './store/store.js'

//给全局挂在一个自己封装的request
uni.$request = $request
//给全局挂在
uni.$showMsg = function(title = 'Request Error', icon = 'error') {
	uni.showToast({
		title,
		duration: 1500,
		icon
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif