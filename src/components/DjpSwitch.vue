<template>
  <el-switch
    v-model="djp.isPrint"
    on-text="已办"
    on-color="#13ce66"
    off-text="待办"
    off-color="#f7ba2a"
    @change="onSwitchChange">
  </el-switch>
</template>

<script>
'use strict'

import {
  Switch
} from 'element-ui'

export default {
  props: ['djp', 'index'],
  methods: {
    onSwitchChange (val) {
      console.log(val)
      console.log(this.djp._id)
      console.log(this.$store.state.list[this.index].isPrint)
      console.log(this.$store.state.list[this.index]._id)
    }
  },
  components: {
    elSwitch: Switch
  }
}
</script>
