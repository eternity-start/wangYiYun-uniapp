<template>
	<view class="nav-top" :style="{color: color}">
		<view class="top-btn" v-if="show">
			<text class="iconfont icon-zuojiantou text1" @tap="gotoParent"></text> |
			<text class="iconfont icon-home_icon text2" @tap="gotoHomepage"></text>
		</view>
		<view class="top-text">
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"nav-top",
		props: {
			title: {
				type: String,
				default: ""
			},
			show: {
				type: Boolean,
				default: false
			},
			color: {
				type: String,
				default: ""
			}
		}, 
		data() {
			return {
				
			};
		},
		methods: {
			gotoParent() {
				uni.navigateBack()
			},
			gotoHomepage() {
				uni.navigateTo({
					url: '../../pages/index/index'
				})
			}
		}
	}
</script>

<style scoped>
	.nav-top{
		 
		width: 100%;
		height: 70px;
		text-align: center;
		font-size: 16px;
		line-height: 80px;
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.top-btn{
		position: absolute;
		left: 8px;
		top: 26px;
		width: 92px;
		height: 28px;
		border-radius: 30px;
		color: #FFFFFF;
		line-height: 28px;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background: rgba(0,0,0,.4);
	}
</style>
