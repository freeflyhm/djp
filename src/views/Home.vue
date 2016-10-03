<template>
  <div id="home">
    <djp-user></djp-user>
    <djp-nav></djp-nav>
    <el-row class="row-bg">
      <el-col :span="24">
        <djp-table></djp-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
'use strict'

import {
  Row,
  Col
} from 'element-ui'

import DjpUser from '../components/DjpUser'
import DjpNav from '../components/DjpNav'
import DjpTable from '../components/DjpTable'

export default {
  data () {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    elRow: Row,
    elCol: Col,
    DjpUser,
    DjpNav,
    DjpTable
  }
}
</script>

<style scoped>
  .row-bg {
    margin-top: 10px;
  }
</style>
