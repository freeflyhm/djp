<template>
  <div v-show="$store.state.showUser" style="text-align: center;">
    <el-form
       :inline="true"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      @submit.prevent="handleSubmit">
      <el-form-item prop="city">
        <el-select v-model="ruleForm.city" placeholder="请选择城市">
          <el-option label="深圳" value="sz"></el-option>
          <el-option label="广州" value="gz"></el-option>
          <el-option label="杭州" value="hz"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
'use strict'

import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Button
} from 'element-ui'

import { cloneObj } from '../utils'

export default {
  data () {
    const chinese = val => {
      return /^[\u4E00-\uFA29]*$/.test(val)
    }

    const checkName = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('用户 - 太短！'))
      } else if (!chinese(value)) {
        callback(new Error('用户 - 必须为中文！'))
      } else if (value.length > 4) {
        callback(new Error('用户 - 太长！'))
      } else {
        callback()
      }
    }

    const checkPass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码 - 太短！'))
      } else if (value.length > 20) {
        callback(new Error('密码 - 太长！'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        name: [
          { required: true, message: '用户名不能为空！', trigger: 'blur' },
          { validator: checkName }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { validator: checkPass }
        ]
      }
    }
  },
  computed: {
    ruleForm () {
      return cloneObj(this.$store.state.user)
    }
  },
  mounted () {
    let user = this.$store.state.user

    if (!(user.city && user.name && user.password)) {
      this.$store.commit('SET_SHOW', true)
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$store.commit('SET_USER', {
            city: this.ruleForm.city,
            name: this.ruleForm.name,
            password: this.ruleForm.password
          })

          this.$store.commit('SET_SHOW', false)
        } else {
          return false
        }
      })
    }
  },
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elSelect: Select,
    elOption: Option,
    elInput: Input,
    elButton: Button
  }
}
</script>
