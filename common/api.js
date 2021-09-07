import http from './forwardApi.js'
// 获取首页4个榜单歌单		http://localhost:3000/toplist/detail
export const topList = (data) => {
	return http.request({
		url: '/toplist/detail',
		method: 'GET',
		data
	})
}
// 获取详情歌单列表(热搜列表)		http://localhost:3000/playlist/detail?id=33
export const getDetailList = (data) => {
    return http.request({
        url: '/playlist/detail',
        method: 'GET',
		data
    })
}

// 获取歌曲详情(歌曲名-背景图)		http://localhost:3000/song/detail?ids=2
export const songDetail = (data) => {
    return http.request({
        url: '/song/detail',
        method: 'GET',
		data
    })
}

// 获取推荐歌曲详情信息(歌曲名，歌手头像) http://localhost:3000/simi/song?id=4
export const simiSong = (data) => {
    return http.request({
        url: '/simi/song',
        method: 'GET',
		data
    })
}

// 获取歌曲评论信息(评论者头像信息等) http://localhost:3000/comment/music?id=3
export const commentMusic = (data) => {
    return http.request({
        url: '/comment/music',
        method: 'GET',
		data
    })
}

// 获取歌曲歌词 http://localhost:3000/lyric?id=5
export const lyric = (data) => {
    return http.request({
        url: '/lyric',
        method: 'GET',
		data
    })
}

// 获取歌曲播放地址 http://localhost:3000/song/url?id=6
export const songUrl = (data) => {
    return http.request({
        url: '/song/url',
        method: 'GET',
		data
    })
}
// 热搜	http://localhost:3000/search/hot/detail
export const hotSearch = (data) => {
	return http.request({
		url: '/search/hot/detail',
		method: 'GET',
		data
	})
}
// 精准搜索 http://localhost:3000/search?keywords=少年
export const search = (data) => {
	return http.request({
		url: '/search',
		method: 'GET',
		data
	})
}
// 相关搜索 http://localhost:3000/search/suggest?keywords=少年&type=mobile
export const simiSearch = (data) => {
	return http.request({
		url: '/search/suggest',
		method: 'GET',
		data
	})
}
export default{
	topList,
	getDetailList,
	songDetail,
	simiSong,
	commentMusic,
	lyric,
	songUrl,
	hotSearch,
	simiSearch,
	search
}