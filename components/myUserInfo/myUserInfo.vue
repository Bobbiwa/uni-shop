<template>
	<view class="my-userinfo-container">
		<!-- 头像昵称区域 -->
		<view class="top-box">
			<image src="/static/avatar.png" class="avatar"></image>
			<view class="nickname">野原新之助</view>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 面板上 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏商品</text>
					</view>
					<view class="panel-item">
						<text>12</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>91</text>
						<text>足迹</text>
					</view>
				</view>
			</view>

			<!-- 面板中 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 面板下 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: "myUserInfo",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async logout() {
				const [err, succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗？'
				}).catch(err => err)
				if (succ && succ.confirm) {
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		background-color: #f4f4f4;

		.top-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 400rpx;
			background-color: #C00000;

			.avatar {
				width: 180rpx;
				height: 180rpx;
				border-radius: 90rpx;
				border: 4rpx solid #fff;
				box-shadow: 0 2rpx 10rpx black;
			}

			.nickname {
				font-size: 32rpx;
				color: #fff;
				font-weight: bold;
				margin-top: 20rpx;
			}
		}

		.panel-list {
			position: relative;
			top: -20rpx;
			padding: 0 20rpx;

			.panel-title {
				line-height: 90rpx;
				padding-left: 20rpx;
				font-size: 30rpx;
				border-bottom: 2rpx solid #f4f4f4;
			}

			.panel {
				background-color: white;
				border-radius: 6rpx;
				margin-bottom: 16rpx;

				.panel-body {
					display: flex;
					justify-content: space-around;

					.panel-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-around;
						padding: 20rpx 0;
						font-size: 26rpx;

						.icon {
							width: 70rpx;
							height: 70rpx;
						}
					}
				}
			}


		}
	}

	.panel-list-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		padding: 0 20rpx;
		line-height: 90rpx;
	}
</style>