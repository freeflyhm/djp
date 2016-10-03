<template>
  <el-select v-model="item.isPrint" @change="onChange">
    <el-option label="已办理" :value="true"></el-option>
    <el-option label="待办理" :value="false"></el-option>
  </el-select>
</template>

<script>
'use strict'

import {
  Select,
  Option,
  Message
} from 'element-ui'

import Api from '../store/api'

export default {
  props: ['djp', 'index'],
  data () {
    return {

    }
  },
  computed: {
    item () {
      return this.djp
    }
  },
  methods: {
    onChange (val) {
      if (this.$store.state.list[this.index].isPrint !== val) {
        // 向服务器提交修改请求
        Api.isPrint(this.$http, {
          city: this.$store.state.user.city,
          id: this.djp._id,
          isPrint: val
        }, result => {
          if (result.success === 1) {
            this.$store.commit('SET_ITEM', { index: this.index, item: this.item })

            let _m = val ? '已办理' : '待办理'
            Message({
              showClose: true,
              message: this.item.sm.flight.flightNum + ' 次航班登机牌改为' + _m,
              type: 'success'
            })
          } else {
            this.item.isPrint = !this.item.isPrint
            Message({
              showClose: true,
              message: '服务器繁忙，请再试一次',
              type: 'error'
            })
          }
        })
      }
    }
  },
  components: {
    elSelect: Select,
    elOption: Option
  }
}
</script>
