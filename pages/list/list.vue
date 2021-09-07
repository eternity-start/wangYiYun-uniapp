<template>
	<view class="list" v-show="isshow">
		<view class="fixbg" :style="{ 'backgroundImage': 'url('+playList.coverImgUrl+')'}"></view>
		<!-- 导航栏 -->
		<nav-top title="歌单" :show="true" color="#fff"></nav-top>
		<!-- 头部列表信息 -->
		<view class="container" >
			<scroll-view scroll-y="true" >
				<view class="list-detail">
					
					<view class="detail-left">
						<image :src="playList.coverImgUrl" mode=""></image>
						<text>{{playList.playCount | handleNumber}}</text>
					</view>
					<view class="detail-right">
						<view class="r-top">
							{{playList.name}}
						</view>
						<view class="r-center">
							<image :src="playList.creator.avatarUrl" mode=""></image>
							<text>{{playList.creator.nickname}}</text>
						</view>
						<view class="r-bottom">
							<text class="iconfont icon-zuojiantou">{{playList.description}}</text>
						</view>
					</view>
				</view>
				<!-- 分享 -->
				<button class="share" open-type="share">
					<text class="iconfont icon-fenxiang"></text>
					分享给微信好友
				</button>
				<!-- 歌单列表 -->
				<view class="music-list">
					<view class="list-top">
						<text class="iconfont icon-bofang1 bofang"></text>
						<text class="all">播放全部</text>
						<text class="total">（共{{playList.tracks.length}}首）</text>
					</view>
					<view class="list-item" v-for="(item,index) in playList.tracks" :key="item.id" @tap="gotoMusicDetail(item.id)">
						<view class="number">{{index + 1}}</view>
						<view class="music-name">
							<view class="name-name">{{item.name}}</view>
							<view class="music-author">
								<image v-if="privileges[index].flag>60 && privileges[index].flag<70"  src="../../static/dujia.png" ></image>
								<image  v-if="privileges[index].maxbr=='999000'"  src="../../static/sq.png" ></image>
								<text class="limit">{{item.ar[0].name}} - {{item.name}}</text>
							</view>
						</view>
						<text class="bf2 iconfont icon-bofang"></text>
					</view>
					<!-- <view class="list-item">
						<view class="number">1</view>
						<view class="music-name">
							<text class="name-name">雨雾</text>
							<view class="music-author">
								<image src="../../static/dujia.png" mode=""></image>
								<image src="../../static/sq.png" mode=""></image>
								<text>阿冗 - 雨雾</text>
							</view>
						</view>
						<text class="bf2 iconfont icon-bofang"></text>
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
				id: '',
				isshow: false,
				playList: {
					coverImgUrl: '',
					description: '',
					tracks: [],
					creator: {
						avatarUrl: ''
					}
				},
				privileges: []
			}
		},
		onLoad(e) {
			console.log(e)
			this.id = e.id
			this.getDetailLists()
		},
		methods: {
			// 请求歌单列表
			getDetailLists() {
				let _data = {
					id: this.id
				}
				
				this.$api.getDetailList(_data).then(res => {
					console.log(res)
					this.playList = res.playlist
					this.privileges = res.privileges
					this.isshow = true
					
					console.log('我的世界')
					console.log(res)
					this.$store.commit('INIT_TOPLISTIDS', res.playlist.trackIds)
					console.log(this.playList)
				})
			},
			// 点击歌单进入歌曲
			gotoMusicDetail(e) {
				console.log(e)
				uni.navigateTo({
					url: '../detail/detail?id='+e
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.list-detail {
	margin: 42rpx 30rpx;
	display: flex;
	.detail-left{
		position: relative;
		image{
			border-radius: 20rpx;
			width: 264rpx;
			height: 264rpx;
		}
		text{
			color: #FFFFFF;
			position: absolute;
			right: 8rpx;
			top: 6rpx;
		}
	}
	.detail-right{
		color: #fff;
		margin-left: 40rpx;
		.r-top{
			font-size: 38rpx;
		}
		.r-center{
			margin: 30rpx 0;
			
			image{
				margin-right: 8rpx;
				width: 54rpx;
				height: 54rpx;
				border-radius: 50%;
				vertical-align: middle;
			}
			text{
				font-size: 26rpx;
				// vertical-align: middle;
			}
		}
		.r-bottom{
			width: 420rpx;
			text{
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; 
			}
		}
	}
}
.share{
	display: flex;
	text-align: center;
	line-height: 76rpx;
	margin: 0 210rpx 40rpx 210rpx;
	height: 76rpx;
	border-radius: 40rpx;
	background: rgba(0,0,0,0.4);
	color: #fff;
	font-size: 36rpx;
}
.music-list{
	background-color: #fff;
	overflow: hidden;
	border-radius: 40rpx 40rpx 0 0;
	margin-bottom: -44rpx;
	.list-top{
		
		padding: 44rpx 0 50rpx; 
		.bofang{
			font-size: 50rpx;
			margin: 0 28rpx;
		}
		.all{
			font-size: 38rpx;
		}
		.total{
			color: #adadad;
			font-size: 26rpx;
		}
	}
	.list-item{
		
		display: flex;
		margin: 0 32rpx 44rpx 46rpx;
		align-items: center;
		.number{
			width: 58rpx;
			font-size: 30rpx;
			line-height: 50rpx;
			color: #adadad;
		}
		.music-name{
			flex: 1;
			.name-name{
				font-size: 30rpx;
				width: 520rpx;
				white-space: nowrap; // 文字强制一行显示
				text-overflow: ellipsis;// 超出文本用...
				overflow: hidden; 
			}
			.music-author{
				
				image{
					width: 30rpx;
					height: 20rpx;
					margin-right: 8rpx;
				}
				text{
					display: inline-block;
					width: 520rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 24rpx;
				}
				
			}
			
		}
		.bf2::before{
			font-size: 28px;
			color: #adadad;
		}
	}
	.list-item:last-child{
		// margin: 0 32rpx 0 46rpx;
	}
}
.list-container{
	// padding-bottom: -44rpx;
}
</style>
