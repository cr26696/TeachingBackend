<template>
<div id="main_container">
    <div class="contentHeader">
        <span class="verticalCenter" style="width: 37px;"></span>
        <router-link to="/mainview/deviceList" class="verticalCenter" id="backlink">《 返回上一页</router-link>
        <span class="verticalCenter" style="width: 54px;"></span>
        <span class="verticalCenter textInfo" >预警信息</span>
    </div>
    <div id="info">
        <div id="infoHead">
            <p class="textInfo" style="top:46px;left:45px">报警信息：</p>
            <p class="textInfoContent" style="top:90px;left:45px">无电源电压报警</p>
        </div>
        <div id="line"></div>
        <div id="infoContent">
            <p class="textInfo" style="top:218px;left:45px">阈值信息：</p>
            <div id="thrsTable" style="top:291px;left:45px;background-color: rgb(234, 234, 253);">
                <el-row>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">设备id</p><br><p class="textInfoContent">{{ deviceIdImei }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">版本号</p><br><p class="textInfoContent">{{ version }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">灯杆号</p><br><p class="textInfoContent">{{ '0' }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">控制器状态指令</p><br><p class="textInfoContent">{{ controllerStatusInstruction }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">报警间隔时间：</p><br><p class="textInfoContent">{{ alarmInterva }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">温度传感器报警阙值：</p><br><p class="textInfoContent">{{ temperatureWarning }}</p></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">湿度传感器报警阙值：</p><br><p class="textInfoContent">{{ humidityWarning }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">光照传感器报警阙值：</p><br><p class="textInfoContent">{{ lightWarning }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">信号强度报警阙值：</p><br><p class="textInfoContent">{{ signalStrengthWarning }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">灯杆倾斜角度报警阙值：</p><br><p class="textInfoContent">{{ lightPoleTiltWarning }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">漏电报警阙值：</p><br><p class="textInfoContent">{{ leakageAlarm }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">上报周期设定：</p><br><p class="textInfoContent">{{ reportCycleSetting }}</p></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">南向地址修改：</p><br><p class="textInfoContent">{{ ipOne+'.'+ipTwo+'.'+ipThree+'.'+ipFour }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">修改APN：</p><br><p class="textInfoContent">{{ apn }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">修改PLMN：</p><br><p class="textInfoContent">{{ plmn }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"><p class="textCategory">更新时间：</p><br><p class="textInfoContent">{{  }}</p></div></el-col>
                    <el-col :span="4"><div class="grid-content"></div></el-col>
                    <el-col :span="4"><div class="grid-content"></div></el-col>
                </el-row>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AlarmInfo',
  data: function () {
    return {
      deviceIdImei: '',
      version: '',
      alarmInterva: '',
      temperatureWarning: '',
      humidityWarning: '',
      lightWarning: '',
      signalStrengthWarning: '',
      lightPoleTiltWarning: '',
      leakageAlarm: '',
      reportCycleSetting: '',
      apn: '',
      plmn: '',
      controllerStatusInstruction: '',
      ipOne: '192',
      ipTwo: '168',
      ipThree: '0',
      ipFour: '32',
      getdeviceID: ''
    }
  },
  methods: {
    async getAlarmInfo () {
      const { data: get } = await axios.post('http://49.235.106.165:1020/equipmenContro/twelve/query/setting/parameter', { deviceIdImei: this.getdeviceID, commandWord: '179' })
      console.log(get)
      this.deviceIdImei = get.deviceIdImei
      this.version = get.version
      this.alarmInterva = get.alarmInterva
      this.temperatureWarning = get.temperatureWarning
      this.humidityWarning = get.humidityWarning
      this.lightWarning = get.lightWarning
      this.signalStrengthWarning = get.signalStrengthWarning
      this.lightPoleTiltWarning = get.lightPoleTiltWarning
      this.leakageAlarm = get.leakageAlarm
      this.reportCycleSetting = get.reportCycleSetting
      this.apn = get.apn
      this.plmn = get.plmn
      this.controllerStatusInstruction = get.controllerStatusInstruction
      this.ipOne = get.ipOne
      this.ipTwo = get.ipTwo
      this.ipThree = get.ipThree
      this.ipFour = get.ipFour
    }
  },
  mounted () {
    this.getdeviceID = this.$route.query.deviceID
    console.log(this.getdeviceID)
    this.getAlarmInfo()
  }
}
</script>

<style scoped lang="less">
#main_container{
    position: absolute;
    width: 100%;
    height: 100%;
}
#backlink{//返回链接
    text-decoration: none;
    font-size: 18.75px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 27.15px;
    color: rgba(30, 170, 231, 1);
}
#info{//报警信息主体
    position: absolute;
    top: 110px;
    left: 52px;
    height: 85%;
    width: 90%;
    min-height: 600px;
    border-radius: 20px;
    background-color: burlywood;
}
#infoHead{
    min-height: 170px;
}
#line{//分隔线
    border: 1px solid rgba(220, 220, 220, 1);
    width: 93%;
    margin: 0 auto;
}
#infoContent{
    min-height: 840px;
}
#thrsTable{//阈值信息表
    position: absolute;
    height: 266px;
    width: 95%;
    min-width: 1000px;
    max-width: 1461px;
    top: 117px;
    margin: 0 auto;
}
.contentHeader{//返回导航栏，居中
    position: relative;
    left: 52px;
    top: 14px;
    width: 90%;
    height: 84px;
    line-height: 0;
    background-color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius:20px
}
.verticalCenter{
    vertical-align:middle;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    min-height: 55px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.textInfo{//几种字体
    font-size: 25px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height:36.2px;
    color: rgba(66, 66, 66, 1);
}
.textCategory{
    font-size: 16.67px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24.13px;
    color: rgba(102, 102, 102, 1);
}
.textInfoContent{
    font-size: 18.75px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 27.15px;
    color: rgba(40, 40, 40, 1);
}
p{
    position: absolute;
    height: auto;
}
</style>
