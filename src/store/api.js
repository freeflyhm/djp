'use strict'

const _API_URL = 'http://120.76.232.12:8080/'
const LIST_URL = _API_URL + 'djp/list'
const DOWNLOAD_URL = _API_URL + 'djp/isdownload'
const IS_PRINT_URL = _API_URL + 'djp/isprint'
const NOTE_URL = _API_URL + 'djp/djpnote'

const OPTIONS = {
  emulateJSON: true
}

const _httpList = ($http, obj, callback) => {
  $http.post(LIST_URL, obj, OPTIONS).then((response) => {
    callback(response.body)
  }, (err) => {
    console.error(err)
    callback({ success: '80002' })
  })
}

const _isDownload = ($http, obj, callback) => {
  $http.post(DOWNLOAD_URL, obj, OPTIONS).then((response) => {
    callback(response.body)
  }, (err) => {
    console.error(err)
    callback({ success: '80003' })
  })
}

const _isPrint = ($http, obj, callback) => {
  $http.post(IS_PRINT_URL, obj, OPTIONS).then((response) => {
    callback(response.body)
  }, (err) => {
    console.error(err)
    callback({ success: '80004' })
  })
}

const _djpNote = ($http, obj, callback) => {
  $http.post(NOTE_URL, obj, OPTIONS).then((response) => {
    callback(response.body)
  }, (err) => {
    console.error(err)
    callback({ success: '80006' })
  })
}

export default {
  httpList: _httpList,
  isDownload: _isDownload,
  isPrint: _isPrint,
  djpNote: _djpNote
}
