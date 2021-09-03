<template>
	<view class="detail">
		<view class="fixbg" :style="{background: 'url('+songs[0].al.picUrl+')'}"></view>
		<nav-top :title="songs[0].name" :show="true" color="#fff"></nav-top>
		<view class="container" v-show="isshow">
			<scroll-view scroll-y="true" >
				<!-- 歌曲背景播放 --> 
				<view class="music-bgplay" @click="suspend">
					<!-- 图片重叠需要使用background-url :class="{'actions': suspends}"-->
					<image :src="songs[0].al.picUrl" :class="{'actions': suspends}"  mode=""></image>
					<!-- :class="[suspends?'icon-bofang1':'icon-zanting', 'iconfont']" -->
					<text class="iconfont" :class="iconPlay"></text>
					<view class=""></view>
				</view>
				<!-- 歌词 -->
				<view class="music-word">
					<view class="">我的世界</view>
					<view class="">我的世界</view>
					<view class="">我的世界</view>
				</view>
				<!-- share -->
				<view class="top-btn">
					<button size="mini" open-type="share">分享给微信好友</button>
				</view>
				<!-- 推荐歌曲 -->
				<view class="simile-music">
					<view class="simile-person">喜欢这首歌的人也喜欢</view>
					<view class="music-item" v-for="(item, index) in simiSongs" :key="item.id">
						<image :src="item.album.blurPicUrl" mode=""></image>
						<view class="music-name">
							<text>{{item.album.name}}</text>
							<view class="music-author">
								<image src="../../static/dujia.png" mode=""></image>
								<text>{{item.album.company}} - {{item.album.name}}</text>
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>
				</view>
				<!-- 精彩评论 -->
				<view class="comment-jc">
					精彩评论
				</view>
				<!-- 评论详情 -->
				<view class="comment" v-for="(item,index) in hotComment" :key="item.commentId">
					<view class="comment-left">
						<image :src="item.user.avatarUrl" mode=""></image>
					</view>
					<view class="comment-right">
						<view class="comment-r-top">
							<view class="comment-r-t-left">
								<view class="c-r-l-l-name">{{item.user.nickname}}</view>
								<view class="c-r-l-l-time">{{item.time | handleTime}}</view>
							</view>
							<view class="comment-r-t-right">
								<text>{{item.likedCount}}</text>
								<text class="iconfont icon-dianzan"></text>
							</view>
						</view>
						<view class="comment-r-bottom">
							<text>{{item.content}}</text>
						</view>
					</view>
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
				ids: 0,
				songs: [{
					al: {
						picUrl: ''
					}
				}],
				privileges: [],
				isshow: false,
				// 旋转
				suspends: false,
				// icon
				iconPlay: '',
				simiSongs: [],
				hotComment: []
			}
		},
		onLoad(e) {
			console.log(e)
			this.ids = e.id
			this.getsongDetail()
			this.getsongUrl()
			this.getsimiSong()
			this.getcommentMusic()
		},
		methods: {
			// 歌曲信息
			getsongDetail() {
				let _data = {
					ids: this.ids
				}
				this.$api.songDetail(_data).then( res => {
					this.songs = res.songs
					this.privileges = res.privileges
					this.isshow = true
				})
			},
			// 相似歌曲
			getsimiSong() {
				let _data = {
					id: this.ids
				}
				this.$api.simiSong(_data).then(res => {
					this.simiSongs = res.songs
				})
			},
			// 评论
			getcommentMusic() {
				let _data = {
					id: this.ids
				}
				this.$api.commentMusic(_data).then( res => {
					console.log(res)
					this.hotComment = res.hotComments
				})
			},
			// 暂停图片
			suspend() {
				if(this.bgAudioManager.paused) {
					this.bgAudioManager.play()
				}else if(!this.bgAudioManager.paused) {
					this.bgAudioManager.pause()
				}
				
			},
			// 歌曲地址
			getsongUrl() {
				let _data = {
					id: this.ids
				}
				this.$api.songUrl(_data).then(res => {
					this.bgAudioManager = uni.getBackgroundAudioManager()
					this.bgAudioManager.title = this.songs[0].name
					this.bgAudioManager.src = res.data[0].url
					
					// 播放回调事件
					this.bgAudioManager.onPlay(()=>{
						// 旋转
						this.suspends = false
						// icon
						this.iconPlay = 'icon-zanting'
					})
					// 暂停回调
					this.bgAudioManager.onPause(()=>{
						this.suspends = true
						this.iconPlay = 'icon-bofang1'
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		// padding: 0 30rpx;
		
	}
	@keyframes rotates {
		from {
		   transform: rotate(0deg);
		  }
		
		to {
		    transform: rotate(360deg);
		  }
	}
	
	.music-bgplay{
		width: 580rpx;
		height: 580rpx;
		margin: 214rpx auto 40rpx;
		background: url(~@/static/disc.png);
		background-size: cover;
		position: relative;
		
		image{
			width: 380rpx;
			height: 380rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			border-radius: 50%;
			animation-name: rotates;
			animation-duration: 10s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
			animation-play-state: static ;
		}
		.actions{
			animation-play-state: paused
		}
		text{
			color: #FFFFFF;
			width: 100rpx;
			height: 100rpx;
			font-size: 100rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		view{
			background: url(../../static/needle.png);
			background-size: cover;
			width: 230rpx;
			height: 356rpx;
			position: absolute;
			left: 248rpx;
			margin: auto;
			top: -110rpx;
		}
	}
	.music-word{
		text-align: center;
		color: #FFFFFF;
	}
	.top-btn{
		margin-top: 20rpx;
		
		button{
			margin: 0 230rpx;
			width: 300rpx;
			height: 70rpx;
			text-align: center;
			line-height: 70rpx;
			border-radius: 20rpx;
			font-size: 30rpx;
			background-color: rgba(0,0,0,.2);
			color: #f9e8f8;
		}
	}
	.simile-music{
		margin: 0 30rpx;
		.simile-person{
			margin: 50rpx 0;
		}
		.music-item{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 40rpx;
			image{
				width: 82rpx;
				height: 82rpx;
				border-radius: 20rpx;
			}
			.music-name{
				flex: 1;
				margin-left: 22rpx;
				text{
					font-size: 30rpx;
					color: #FFFFFF;
				}
				.music-author{
					image{
						width: 22rpx;
						
						height: 16rpx;
					}
					text{
						color: #adadad;
					}
				}
			}
			text{
				width: 50rpx;
				height: 50rpx;
				font-size: 50rpx;
				color: #efefef;
			}
		}
	}
	
	// 精彩评论
	.comment-jc{
		margin-left: 30rpx;
		margin-bottom: 40rpx;
	}
	
	// 评论
	.comment{
		margin: 0 30rpx;
		display: flex;
		.comment-left{
			margin-right: 20rpx;
			image{
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}
		}
		.comment-right{
			flex: 1;
			.comment-r-top{
				display: flex;
				justify-content: space-between;
				.comment-r-t-left{
					flex: 1;
					.c-r-l-l-name{
						color: #979799;
						font-size: 26rpx;
					}
					.c-r-l-l-time{
						font-size: 20rpx;
						color: #979799;
					}
				}
				.comment-r-t-right{
					color: #979799;
				}
			}
			.comment-r-bottom{
				margin-top: 26rpx;
				text{
					color: #fff;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
