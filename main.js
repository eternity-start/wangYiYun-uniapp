import Vue from 'vue'
import App from './App'
import api from 'common/api.js'
Vue.config.productionTip = false
Vue.prototype.$api = api

App.mpType = 'app'
// 日期过滤器
Vue.filter('handleTime', value => {
	let dt = new Date(value)
	let year = dt.getFullYear()+''
	let month = dt.getMonth()+1+''
	let day = dt.getDay()+''
	return `${year}-${month}-${day}`
})
// 数字过滤器
Vue.filter('handleNumber', value => {
	if(value<10000){
		return value;
	}else if(value>10000 && value<100000000) {
		value = value / 10000;
		return value.toFixed(2)+'万';
	}else{
		value = value / 100000000;
		return value.toFixed(2)+'亿';
	}
})
const app = new Vue({
    ...App
})
app.$mount()
