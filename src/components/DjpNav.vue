<template>
  <el-row v-show="!$store.state.showUser">
    <el-col :span="12">
      <el-date-picker
        v-model="searchDate"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" @click.native.prevent="onSubmit">查询</el-button>
    </el-col>
    <el-col :span="12"
      style="text-align: right;">
      <span>Hi, {{$store.state.user.name}}</span>
      <el-button type="text" @click.native.prevent="onLogout">安全退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
'use strict'

import {
  Row,
  Col,
  Form,
  FormItem,
  DatePicker,
  Button,
  Message
} from 'element-ui'

import Api from '../store/api'
import moment from 'moment'

export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '清空',
          onClick (picker) {
            picker.$emit('pick', '')
          }
        }]
      },
      searchDate: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.searchDate) {
        let user = this.$store.state.user
        Api.httpList(this.$http, {
          city: user.city,
          name: user.name,
          password: user.password,
          searchDate: moment(this.searchDate).format('YYYY-MM-DD')
        }, result => {
          if (result.success === 1) {
            if (result.djpArr.length === 0) {
              Message({
                showClose: true,
                message: '没有数据',
                type: 'info'
              })
              this.$store.commit('SET_LIST', [])
            } else {
              this.$store.commit('SET_LIST', result.djpArr)
            }
          } else if (result.success === '23002') {
            Message({
              showClose: true,
              message: '用户资料有误，请核对用户信息',
              type: 'error'
            })
            this.$store.commit('SET_SHOW', true)
          } else if (result.success === '23004') {
            Message({
              showClose: true,
              message: '日期格式不对',
              type: 'error'
            })
          } else {
            Message({
              showClose: true,
              message: '连接服务器失败',
              type: 'error'
            })
          }
        })
      }
    },
    onLogout () {
      this.$store.commit('SET_USER', {
        city: 'sz',
        name: '',
        password: ''
      })

      this.$store.commit('SET_SHOW', true)

      this.$store.commit('SET_LIST', [])
    }
  },
  components: {
    elRow: Row,
    elCol: Col,
    elForm: Form,
    elFormItem: FormItem,
    elDatePicker: DatePicker,
    elButton: Button
  }
}
</script>
