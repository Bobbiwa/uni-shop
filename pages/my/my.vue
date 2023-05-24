<template>
	<view class="my-container">
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},
		mixins: [badgeMix],
		computed: {
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page, .my-container {
	height: 100%;
}
</style>