<template>
  <el-dialog
    title="收货地址"
    v-model="dialogFormVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="onCancel">取 消</el-button>
      <el-button type="primary" @click.native="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
'use strict'

import {
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button
} from 'element-ui'

export default {
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        name: '',
        region: ''
      }
    }
  },
  computed: {
    showDialog () {
      return !this.$store.state.show
    }
  },
  watch: {
    showDialog (val) {
      if (val) {
        this.dialogFormVisible = true
      }
    },
    dialogFormVisible (val) {
      if (!val) {
        this.$store.commit('SET_SHOW', true)
      }
    }
  },
  ready () {},
  attached () {},
  methods: {
    onCancel () {
      console.log('cancel')
      // this.$store.commit('SET_SHOW', true)
    },
    onSubmit () {
      console.log('submit')
      // this.$store.commit('SET_SHOW', true)
    }
  },
  components: {
    elDialog: Dialog,
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elSelect: Select,
    elOption: Option,
    elButton: Button
  }
}
</script>
