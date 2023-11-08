<template><div id="container">
  <p id="title">教职工信息</p>
  <div id="div_search_params">
    <span id="field_Prompt">范围</span>
    <el-dropdown trigger="click" >
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in infoFields" :key="index" @click.native="handleDropdownClick(item)">
        <!-- 这里.native接管了dropdown，elementui封装希望你使用command字段进行事件操作 -->
        {{ item }}
      </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <input type="text">
    <button><div></div><div></div></button>
  </div>
</div></template>

<script>
// import axios from 'axios'

export default {
  name: 'FacultyInfo',
  data: function () {
    return {
      infoFields: ['优秀指导教师', '2级教师', '3级教师', '4级教师'],
      list: [],
      deviceID: '',
      queryRes: '',
      getInfo: []
    }
  },
  methods: {
    // async initDeviceList () {
    //   const { data: res } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
    //   console.log(res)
    //   if (res.code === 2000) {
    //     this.list = res.data.list.records
    //   }
    // },
    // async query () {
    //   const { data: query } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8, deviceIdImei: this.deviceID } })
    //   console.log(this.deviceID)
    //   console.log(query)
    //   if (query.code === 2000) {
    //     this.list = query.data.list.records
    //     console.log(this.list)
    //   }
    // },
    // async resetList () {
    //   const { data: resetL } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
    //   console.log(resetL)
    //   if (resetL.code === 2000) {
    //     this.list = resetL.data.list.records
    //     console.log(this.list)
    //   }
    // },
    // pushParamstoAlarm (n) {
    //   console.log(n.deviceIdImei)
    //   this.$router.push({ path: '/MainView/AlarmInfo', query: { deviceID: n.deviceIdImei } })
    // },
    // pushParamstoControl (n) {
    //   console.log(n.deviceIdImei)
    //   this.$router.push({ path: '/MainView/DeviceControl', query: { deviceID: n.deviceIdImei } })
    // }
    handleDropdownClick (item) {
      console.log(item)
    }
  },
  created () {
    // this.initDeviceList()
  }
}
</script>

<style scoped lang="less">
#container{
  height: 100%;
  background-color: rgba(235, 236, 237, 1);
  #title{
    position: relative;
    margin-left: 30px;
    margin-top: 35px;
    font-size: 30px;
    font-weight: 700;
    line-height: 43.44px;
    color: rgba(0, 0, 0, 1);
  }
  #div_search_params{
    display: flex;
    position: relative;
    height: 40px;
    margin-top: 32px;
    justify-content: flex-end;
    align-items: center;
    #field_Prompt{
      position: absolute;
      left: 32px;
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(0, 0, 0, 1);
    }
    
    .el-dropdown{
      box-sizing:content-box;
      position: absolute;
      transform: translateX(-50%);
      left: 152px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 1);
      &:hover{
        border: 1px solid rgb(194, 194, 194);
      }
      .el-dropdown-selfdefine{
        display: flex;
        align-items: center;
        width: 130px;
        height: 40px;
        padding-left: 8px;
        i:first-child{
          position: relative;
          left: 30px;
      } 
    }
    }
    input{
      position: relative;
      width: 280px;
      height: 40px;
      margin-right: 10px;
      border: none;
      background: rgba(255, 255, 255, 1);
      &:hover{
        border: 1px solid rgb(228, 228, 228);
      }
    }
    button{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 40px;
      height: 40px;
      margin-right: 36px;
      border-radius: 6px;
      border: none;
      background: rgba(0, 129, 255, 1);
      &:hover{
        border: 1px solid rgb(0, 79, 158);
      }
      div:nth-child(1){
        position: absolute;
        width: 14px;
        height: 0px;
        border: 1px solid rgba(255, 255, 255, 1);
      }div:nth-child(2){
        position: absolute;
        width: 14px;
        height: 0px;
        transform: rotate(90deg);
        border: 1px solid rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
