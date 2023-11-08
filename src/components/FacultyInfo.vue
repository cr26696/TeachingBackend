<template>
  <div id="container">
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'FacultyInfo',
  data: function () {
    return {
      list: [],
      deviceID: '',
      queryRes: '',
      getInfo: []
    }
  }
  // methods: {
  //   async initDeviceList () {
  //     const { data: res } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
  //     console.log(res)
  //     if (res.code === 2000) {
  //       this.list = res.data.list.records
  //     }
  //   },
  //   async query () {
  //     const { data: query } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8, deviceIdImei: this.deviceID } })
  //     console.log(this.deviceID)
  //     console.log(query)
  //     if (query.code === 2000) {
  //       this.list = query.data.list.records
  //       console.log(this.list)
  //     }
  //   },
  //   async resetList () {
  //     const { data: resetL } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
  //     console.log(resetL)
  //     if (resetL.code === 2000) {
  //       this.list = resetL.data.list.records
  //       console.log(this.list)
  //     }
  //   },
  //   pushParamstoAlarm (n) {
  //     console.log(n.deviceIdImei)
  //     this.$router.push({ path: '/MainView/AlarmInfo', query: { deviceID: n.deviceIdImei } })
  //   },
  //   pushParamstoControl (n) {
  //     console.log(n.deviceIdImei)
  //     this.$router.push({ path: '/MainView/DeviceControl', query: { deviceID: n.deviceIdImei } })
  //   }
  // },
  // created () {
  //   this.initDeviceList()
  // }
}
</script>

<style scoped lang="less">
#container{
  height: 100%;
}
#backHeader{
  position: absolute;
  top: 41px;
  left: 53px;
  width: 90%;
}
#content{
  position: absolute;
  top: 112px;
  left: 53px;
  width: 90%;
  height: 775px;
}
#textDeviceID{
  font-size: 20.83px;
  font-weight: 700;
  line-height: 30.17px;
  color: rgba(40, 40, 40, 1);
  text-align: left;
}
.backHeaderItem{
  height: 50px;
}
</style>
