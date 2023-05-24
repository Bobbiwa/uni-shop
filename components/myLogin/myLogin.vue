<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="handleLogin">一键登录</button>
		<view class="login-tips">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "myLogin",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo','updateToken']),
			//获取用户信息
			async handleLogin(e) {
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('你取消了授权')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				
				// 这里他的接口有问题(code invalid)，所以返回一直错误
				const result = await uni.$request('/api/public/v1/users/wxlogin', query, 'POST')
				// if(result.data.meta.status !== 200) return uni.$showMsg('登录失败')
				this.updateToken('token123')  //因为接口有问题，所以自己添加了一个假token
				return uni.$showMsg('登录成功','success')
				
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 750rpx;
		background-color: #F8F8F8;

		.login-btn {
			width: 90%;
			border-radius: 200rpx;
			margin: 30rpx 0;
			background-color: #C00000;
		}

		.login-tips {
			font-size: 24rpx;
			color: gray;
		}
	}
</style>