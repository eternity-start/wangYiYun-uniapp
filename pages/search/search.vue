<template>
	<view class="search">
		<nav-top title="搜索" color="#000" :show="true"></nav-top>
		<view class="container">
			<scroll-view scroll-y="true" >
				<!-- 搜索框 -->
				<view class="search-box">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" v-model="putText" placeholder="搜索歌曲" @input="inputText" @confirm="gotoSimiSearch"/>
					<text class="iconfont icon-guanbi" @tap="deletes" v-if="showType!=='1'"></text>
				</view>
				<!-- 历史记录 -->
				<block v-if="showType=='1'">
					<view class="history">
						<text>历史记录</text>
						<text class="iconfont icon-lajitongshanchu"></text>
					</view>
					<!-- 记录小块 -->
					<view class="record">
						<view class="record-item" @tap="historySh(item)" v-for="(item, index) in historySearch" :key="index">
							<text>{{item}}</text>
						</view>
						
					</view>
					<!-- 热搜榜 -->
					<view class="host">
						<text>热搜榜</text>
					</view>
					<view class="host-item" v-for="(item, index) in hotSearchList" :key="index" @click="gotoSearch(item.searchWord)">
						<view class="item-num">{{index+1}}</view>
						<view class="item-detail">
							<view class="detail-top">{{item.searchWord}}</view>
							<view class="detail-bottom">{{item.content}}</view>
						</view>
						<view class="item-tatal">{{item.score | handleNumber}}</view>
					</view>
					<!-- <view class="host-item">
						<view class="item-num">1</view>
						<view class="item-detail">
							<view class="detail-top">stay</view>
							<view class="detail-bottom">'stay'非常好听</view>
						</view>
						<view class="item-tatal">299851</view>
					</view> -->
				</block>
				<!-- simisearch -->
				<block v-if="showType == '2'">
					<view class="border-bot"></view>
					<view class="tips">搜索“{{putText}}”</view>
					<view class="simi-item" v-for="(item, index) in simiSearchList" @tap="gotoSearch(item.keyword)" :key="index">
						<text class="iconfont icon-fangdajing"></text>
						<text class="item-word">{{item.keyword}}</text>
					</view>
				</block>
				<!-- searchList -->
				<block v-if="showType == '3'">
					<view class="border-bot"></view>
					<view class="search-item" v-for="(item, index) in songList" :key="index" @tap="lisionMusic(item.id)">
						<view class="item-left">
							<view class="item-name">{{item.name}}</view>
							<view class="item-bot">{{item.artists[0].name}} - {{item.name}}</view>
						</view>
						<view class="item-right">
							<text class="iconfont icon-bofang"></text> 
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/static/iconfont/iconfont.css'
	export default {
		data() {
			return {
				guanBi:false,
				hotSearchList: [],
				simiSearchList: [],
				songList: [],
				historySearch: [],
				putText: '',
				showType: '1'
			}
		},
		onLoad() {
			this.getHostSearch()
			this.historySearch = JSON.parse(uni.getStorageSync("historySearch"))
			
		},
		methods: {
			// 热搜
			getHostSearch() {
				this.$api.hotSearch().then(res => {
					console.log(res)
					if(res.code = '200') {
						this.hotSearchList = res.data
					}
				})
			},
			// 输入
			inputText(e) {
				this.showType = '2'
				this.songList.length = 0
				this.putText = e.detail.value
				let _data = {
					keywords: this.putText,
					type: 'mobile'
				}
				if(this.putText.length>0) {
					this.$api.simiSearch(_data).then(res => {
						if(res.data = '200') {
							this.simiSearchList = res.result.allMatch
						}
					})
				}else{
					this.simiSearchList.length =0
				}
				
			}, 
			// 历史记录
			historySh(value) {
				this.putText = value
			},
			gotoSimiSearch() {
				this.showType = '3'
				let _data = {
					keywords: this.putText
				}
				this.$api.search(_data).then( res => {
					console.log(res)
					this.songList = res.result.songs
					if(this.historySearch.length > 9){
						this.historySearch.length=9
					}
					this.historySearch.unshift(this.putText)
					this.historySearch = [...new Set(this.historySearch)]
					uni.setStorageSync('historySearch', JSON.stringify(this.historySearch))
				})
			},
			gotoSearch(word) {
				this.putText = word
			},
			gotoSearch(value) {
				this.putText = value
			},
			deletes() {
				this.putText = ''
				this.showType = '1'
				this.songList.length=0
				if(this.simiSearchList.length>0) {
					this.simiSearchList.length = 0
				}
			},
			lisionMusic(id) {
				uni.navigateTo({
					url: '../detail/detail?id='+id
				})
			}
		}
	}
</script> 

<style lang="less" scoped>
	.search-box{
		display: flex;
		align-items: center;
		height: 78rpx;
		background-color: #f7f7f7;
		border-radius: 30rpx;
		margin: 28rpx 30rpx 48rpx 30rpx;
		
		text{
			margin: 0 32rpx;
			font-size: 32rpx;
		}
		input{
			flex: 1;
			color: #8a8a8a;
		}
	}
	
	.history{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 30rpx;
		text:nth-child(1) {
			font-size: 28rpx;
			color: #2c2c2c;
		}
		text:nth-child(2) {
			font-size: 36rpx;
			color: #bfbfbf;
			vertical-align: middle; 
		}
	}
	
	.record{
		display: flex;
		margin: 20rpx 30rpx;
		flex-wrap: wrap;
		.record-item{
			min-width: 100rpx;
			height: 64rpx;
			padding: 10rpx 20rpx;
			text-align: center;
			line-height: 64rpx;
			border-radius: 50rpx;
			background-color: #f7f7f7;
			margin: 10rpx 10rpx;
			text{
				
			}
		}
	}
	
	.host{
		margin: 0 30rpx;
		font-size: 30rpx;
	}
	
	.host-item{
		margin: 30rpx;
		display: flex;
		align-items: center;
		.item-num{
			color: #f05051;
		}
		.item-detail{
			flex: 1;
			margin-left: 48rpx;
			
			.detail-top{
				color: #1d1d1d;
				font-size: 30rpx;
			}
			.detail-bottom{
				width: 480rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				font-size: 26rpx;
				color: #909090;
			}
		}
		.item-tatal{
			color: #c7c7c7;
		}
	}
	.border-bot{
		border-top: 1px solid #adadad;
	}
	.tips{
		color: #7fa1c4;
		font-size: 30rpx;
		margin: 0 30rpx 76rpx;
		padding-top: 40rpx;
		
	}
	
	.simi-item{
		margin: 74rpx 30rpx;
		font-size: 28rpx;
		color: #616161;
		.item-word{
			margin-left: 20rpx;
		}
	}
	
	.search-item{
		margin: 36rpx 30rpx;
		display: flex;
		align-items: center;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #adadad;
		.item-left{
			flex: 1;
			.item-name{
				color: #4b78aa;
				font-size: 30rpx;
				margin-bottom: 16rpx;
			}
			.item-bot{
				font-size: 24rpx;
			}
		}
		.item-right{
			text{
				font-size: 50rpx;
			}
		}
	}
</style>
