import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用

// console.log(dayjs.to(dayjs('2015')))
// dayjs.to(dayjs('2015'))
// dayjs().to(dayjs('1990-01-01')) // 31 年前
// dayjs().toNow()

Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
