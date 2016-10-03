<template>
  <div v-show="tableData.length > 0">
    <table class="el-table">
      <thead>
        <tr>
          <th style="width: 65px;"><div>序号</div></th>
          <th style="width: 200px;"><div>航班</div></th>
          <th style="width: 65px;"><div>人数</div></th>
          <th style="width: 90px;"><div>导出</div></th>
          <th style="width: 90px;"><div>办理</div></th>
          <th><div>备注 <span style="color: #ff4949;">{{ noteEditing }}</span></div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData">
          <td><div class="cell">{{index + 1}}</div></td>
          <td>
            <div class="cell">
              {{item.sm.flight.flightDate | formartFlight}}
              <span style="color: #1D8CE0">{{item.sm.flight.flightNum}}</span>
            </div>
          </td>
          <td><div class="cell">{{item.sm.smRealNumber}}</div></td>
          <td>
            <el-button @click.native="downloadDjp(index, item)"
              :type="item.isDownload ? '' : 'primary'">
              {{item.isDownload ? '已导出' : '未导出'}}</el-button>
          </td>
          <td :class="item.isPrint ? 'success' : 'wanging'">
            <djp-select :djp="item" :index="index"></djp-select>
          </td>
          <td>
            <div class="el-input">
              <input
                placeholder="备注"
                v-model="item.djpNote"
                class="el-input__inner"
                @blur="noteEditing = ''"
                @input="onNoteInput(index, item)"
                @change="onNoteChange(index, item)"></input>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
'use strict'

import {
  Button,
  Message
} from 'element-ui'
import DjpSelect from './DjpSelect'
import moment from 'moment'
import { cloneObj } from '../utils'
import Api from '../store/api'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'filesaver.js'

export default {
  data () {
    return {
      noteEditing: '',
      tableData: [],
      singleSelection: {}
    }
  },
  computed: {
    list () {
      return cloneObj(this.$store.state.list)
    }
  },
  watch: {
    list (val) {
      this.tableData = val
    }
  },
  filters: {
    formartFlight (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  mounted () {
    let _self = this
    window.onbeforeunload = function checkLeave (e) {
      e = e || window.event

      if (_self.noteEditing) {
        // For IE and Firefox prior to version 4
        if (e) {
          e.returnValue = _self.noteEditing + '确定退出吗？ss'
        }

        // For Safari
        return _self.noteEditing + '确定退出吗？ss'
      }
    }
  },
  methods: {
    downloadDjp (index, item) {
      const loadFile = (fileName, callback) => {
        window.JSZipUtils.getBinaryContent('static/docx/' + fileName, callback)
      }

      Api.isDownload(this.$http, {
        city: this.$store.state.user.city,
        id: item._id,
        isDownload: item.isDownload
      }, result => {
        if (result.success === 1) {
          let setData = result.setData
          let docx
          let out

          loadFile('djpTable.docx', (err, content) => {
            if (err) { throw err }

            docx = new Docxtemplater(content)
            docx.setData(setData)
            docx.render()
            out = docx.getZip().generate({ type: 'blob' })

            let title = '阳光服务' + setData.smDate + setData.teamType +
              setData.smFlight + '航班' + setData.smRealNumber + '人.docx'
            saveAs(out, title)

            if (!item.isDownload) {
              item.isDownload = true
              this.$store.commit('SET_ITEM', { index: index, item: item })
            }
          })
        } else {
          Message({
            showClose: true,
            message: '服务器繁忙，请再试一次',
            type: 'error'
          })
        }
      })
    },
    onNoteInput (index, item) {
      if (this.$store.state.list[index].djpNote === item.djpNote) {
        this.noteEditing = ''
      } else {
        this.noteEditing = '第' + (index + 1) + '行备注已修改，尚未保存！'
      }
    },
    onNoteChange (index, item) {
      Api.djpNote(this.$http, {
        city: this.$store.state.user.city,
        id: item._id,
        djpNote: item.djpNote
      }, result => {
        if (result.success === 1) {
          this.$store.commit('SET_ITEM', { index: index, item: item })

          Message({
            showClose: true,
            message: '修改备注成功',
            type: 'success'
          })
        } else {
          item.djpNote = this.$store.state.list[index].djpNote
          Message({
            showClose: true,
            message: '服务器繁忙，请再试一次',
            type: 'error'
          })
        }
      })
    }
  },
  components: {
    elButton: Button,
    DjpSelect
  }
}
</script>

<style>
  .el-table, .el-table td {
    overflow: visible;
  }

  td.success .el-input__inner {
    background-color: #13ce66;
    border: 1px solid #13ce66;
    color: #fff;
  }

  td.wanging .el-input__inner {
    background-color: #f7ba2a;
    border: 1px solid #f7ba2a;
    color: #fff;
  }

  td .el-select .el-input .el-input__icon {
    color: #fff;
  }

  td > .el-input > input {
    border: none;
  }

  td > .el-input > input:focus {
    background-color: #fcf8e3;
  }
</style>
