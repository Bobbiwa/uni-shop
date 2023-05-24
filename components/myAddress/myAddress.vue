<template>
	<view>
		<!-- 选择收货地址 -->
		<view class="address-choose-container" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="choose-btn" @click="handleChooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收获信息的盒子 -->
		<view class="address-info-container" v-else @click="handleChooseAddress">
			<view class="row1">
				<view class="username">收件人：{{address.userName}}</view>
				<view class="phone-number-container">
					<view class="phone-number">电话：{{address.telNumber}}</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收获地址：</view>
				<view>{{addstr()}}</view>
			</view>
		</view>
		<!-- 底部边框 -->
		<image src="/static/address-border.png" class="address-border"></image>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		name: "myAddress",
		data() {
			return {
				// address:{}
			};
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			...mapGetters('m_user',['addstr']),
			async handleChooseAddress() {
				const [err, succ] = await uni.chooseAddress().catch(err => err)
				if (err === null && succ.errMsg === 'chooseAddress:ok') {
					// this.address = succ
					this.updateAddress(succ)
				}
			}
		},
		computed: {
			...mapState('m_user', ['address'])
		}
	}
</script>

<style lang="scss">
	.address-choose-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 180rpx;

		.choose-btn {}
	}

	.address-info-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 24rpx;
		height: 180rpx;
		padding: 0 10rpx;

		.row1 {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;

			.phone-number-container {
				display: flex;
			}
		}

		.row2 {
			display: flex;
			align-items: center;

			.row2-left {
				white-space: nowrap;
			}
		}
	}

	.address-border {
		display: block;
		width: 100%;
		height: 10rpx;
	}
</style>