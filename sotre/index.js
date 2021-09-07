import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		topListIds: [],
		nextId: ''
	},
	mutations: {
		// 获取当前播放的歌曲id列表
		INIT_TOPLISTIDS(state, payload) {
			state.topListIds = payload
		},
		// 播放完让id加1
		NEXT_ID(state, payload) {
			for(var i=0; i<state.topListIds.length; i++) {
				if(state.topListIds[i].id == payload) {
					state.nextId = state.topListIds[i+1].id
				}
			}
		}
	} 
})