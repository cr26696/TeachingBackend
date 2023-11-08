<template>
  <div id="container">
    <div id="backHeader">
      <span id="textDeviceID" class="backHeaderItem" style="float:left;width:;">设备id:</span>
      <input type="text" class="backHeaderItem" style="float:left;left:24px;
        width: 240px;
        position:relative;
        border:0;
        border-radius: 25px;
        text-indent: 15px;"
        placeholder="请输入"
        v-model="deviceID">
      <button style="float: right;
        width: 120px;
        height: 50px;
        opacity: 1;
        border-radius: 24.5px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 8px 18px  rgba(0, 0, 0, 0.1)"
        @click="resetList">重置</button>
      <button style="float: right;
        width: 120px;
        height: 50px;
        opacity: 1;
        border-radius: 24.5px;
        background: rgba(30, 170, 231, 1);
        box-shadow: 0px 8px 18px  rgba(0, 0, 0, 0.1);
        margin-right: 20px;"
        @click="query()">查询</button>
    </div>
    <el-table id="content"
      :data="list"
      :header-cell-style="{height:'90px',padding:'0 !important'}"
      :row-style="{height: '90px',padding:'0 !important'}"
      style="border-radius: 20px;"
    >
      <el-table-column
        type="selection"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="设备ID"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="version"
        label="版本号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="lampNumb"
        label="灯柱号"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        label="灭灯延时"
        align="center"
        width="100"><template slot-scope="scope">{{scope.row.turnoffDelay}}分钟</template>
      </el-table-column>
      <el-table-column
        prop="showVo.voltage"
        label="电压"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.electricity"
        label="电流"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.power"
        label="功率"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.powers"
        label="功率因子"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.lampState"
        label="灯具状态"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.sensorState"
        label="传感器状态"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.temperature"
        label="温度"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.humidness"
        label="湿度"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.bright"
        label="亮度"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.a"
        label="电流标准"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.v"
        label="电压标准"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.lightIntensity"
        label="光照强度"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="lal"
        label="经纬度"
        width="240"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.adress"
        label="面向地址"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.controllerMode"
        label="控制器模式"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.controllerDuratioon"
        label="控制器在线时长"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.signalNoiseRatio"
        label="信噪比"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.signalCoverageStrength"
        label="信号覆盖强度"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.baseStationNumbe"
        label="基站号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.controllerOnlineStatus"
        label="控制器在线状态"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.msgSerialNumber"
        label="信息序号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.moduleInformation"
        label="模组信息"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.mainControlChip"
        label="主控芯片"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.carState"
        label="当前有无车辆"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.nineteenTime"
        label="有无车辆通行上传时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.channel"
        label="信道"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.groupNumnber"
        label="组号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.addressTwentyThree"
        label="地址"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.groupNumberOne"
        label="左组号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.groupNumberTwo"
        label="右组号"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="showVo.addressOne"
        label="灯柱地址"
        width="180"
        align="center">
      </el-table-column>
        <el-table-column
        header-align="center"
        fixed="right"
        label="操作"
        width="320">
        <template slot-scope="scope">
        <el-button type="text" size="small" @click="pushParamstoAlarm(scope.row)">预警信息</el-button>
        <el-button type="text" size="small">接受日志</el-button>
        <el-button type="text" size="small" @click="pushParamstoControl(scope.row)">指令设置</el-button>
        <el-button type="text" size="small">详情</el-button>
        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DeviceList',
  data: function () {
    return {
      list: [],
      deviceID: '',
      queryRes: '',
      getInfo: []
    }
  },
  methods: {
    async initDeviceList () {
      const { data: res } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
      console.log(res)
      if (res.code === 2000) {
        this.list = res.data.list.records
      }
    },
    async query () {
      const { data: query } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8, deviceIdImei: this.deviceID } })
      console.log(this.deviceID)
      console.log(query)
      if (query.code === 2000) {
        this.list = query.data.list.records
        console.log(this.list)
      }
    },
    async resetList () {
      const { data: resetL } = await axios.get('http://49.235.106.165:1020/device/getAllList', { params: { pageNum: 1, pageSize: 8 } })
      console.log(resetL)
      if (resetL.code === 2000) {
        this.list = resetL.data.list.records
        console.log(this.list)
      }
    },
    pushParamstoAlarm (n) {
      console.log(n.deviceIdImei)
      this.$router.push({ path: '/MainView/AlarmInfo', query: { deviceID: n.deviceIdImei } })
    },
    pushParamstoControl (n) {
      console.log(n.deviceIdImei)
      this.$router.push({ path: '/MainView/DeviceControl', query: { deviceID: n.deviceIdImei } })
    }
  },
  created () {
    this.initDeviceList()
  }
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
