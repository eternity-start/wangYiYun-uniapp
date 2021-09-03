<template>
	<view class="content">
		<nav-top title="网易云音乐" :show="false" color="#000"></nav-top>
		<view class="container">
			<scroll-view scroll-y="true" >
				<!-- 搜索框 -->
				<view class="search">
					<text  class="iconfont icon-fangdajing text1"></text>
					<text>搜索歌曲</text>
				</view>
				<!-- 主体 -->
				<view class="music-list">
					<view class="music-item" v-for="(item, index) in topLists" :key="item.id" @click="musicDetail(item.id)">
						<view class="item-left">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="item-right">
							<view class="right-item"  v-for="(item, index) in item.tracks" :key="index">
								<text>{{index+1}}.{{item.first}} - {{item.second}}</text>
							</view>
						</view>
					</view>
					<!-- <view class="music-item">
						<view class="item-left">
							<image src="../../static/logo.png" mode=""></image>
							<text>每日更新</text>
						</view>
						<view class="item-right">
							<text>1.雨雾 - 阿冗</text>
							<text>1.雨雾 - 阿冗</text>
							<text>1.雨雾 - 阿冗</text>
						</view>
					</view> -->
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/static/iconfont/iconfont.css'
	export default {
		data() {
			return {
				topLists: []
			}
		},
		onLoad() {
			this.getTopList()
		},
		methods: {
			// 初始化获取数据
			getTopList() {
				this.$api.topList().then(res => {
					let result = res.list
					result.length = 4
					this.topLists = result
					// this.topLists = res.list
				})
			},
			// 进入歌曲详情
			musicDetail(e) {
				console.log(e)
				uni.navigateTo({
					url: '../list/list?id=' + e
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.search{
		/* width: 100%; */
		height: 60rpx;
		margin: 64rpx 30rpx 26rpx 30rpx;
		background: #f3f3f3;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20px;
		color: #818181;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.text1{
			margin: 0 10rpx 0 30rpx;
		}
	}
	.music-list{
		.music-item{
			display: flex;
			margin: 0 30rpx 36rpx;
			position: relative;
			.item-left{
				image{
					border-radius: 20rpx;
					width: 214rpx;
					height: 214rpx;
				}
				text{
					position: absolute;
					left: 10rpx;
					bottom: 20rpx;
					color: #fff;
				}
			}
			.item-right{
				margin-left: 24rpx;
				.right-item{
					width: 460rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text{
						width: 100%;
						color: #333333;
						line-height: 66rpx;
						
					}
				}
				
			}
		}
	}
</style>
