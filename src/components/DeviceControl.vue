<template>
<div id="main_container">
  <div id="container">
    <div id="backHeader">
        <span class="verticalCenter" style="width: 37px;"></span>
        <router-link to="/mainview/deviceList" class="verticalCenter" id="backlink">《 返回上一页</router-link>
        <span class="verticalCenter" style="width: 54px;"></span>
        <span class="verticalCenter textInfo" >设备控制</span>
    </div>

    <div id="infoPanel">
      <el-row :gutter="20" id="panelNav">
        <el-col :span="4" v-for="item in panelList" :key="item.id">
          <div class="grid-content">
            <div id="button"><img :src="'@/assets/icon/' + item[2] + 'png'" alt=""></div>
            <button class="b_header" @click="currentPanel = item[1]">{{item[0]}}</button>
          </div>
        </el-col>
      </el-row>
      <div id="deviceInfoTable">
        <el-row>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">设备id</p><br><p class="textInfoContent">861817066805433</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">灯杆号</p><br><p class="textInfoContent">-</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">经度</p><br><p class="textInfoContent">121.3825168185769</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">控制器状态</p><br><p class="textInfoContent">·离线</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">控制器模式</p><br><p class="textInfoContent">{{ chooseMode }}</p></div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">版本号</p><br><p class="textInfoContent">0x2e</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">lora模块信道</p><br><p class="textInfoContent">0-110</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">纬度</p><br><p class="textInfoContent">31.16577853732639</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">灯具状态</p><br><p class="textInfoContent">·亮</p></div></el-col>
            <el-col :span="4"><div class="grid-content"><p class="textCategory">lora地址</p><br><p class="textInfoContent">0-65535</p></div></el-col>
        </el-row>
      </div>
      <div id="line"></div>
      <keep-alive>
        <component :is="currentPanel" style="top:21px"></component>
      </keep-alive>
    </div>
  </div>
</div>
</template>

<script>
import ParamSetting from '@/components/device_control_detail/ParamSetting.vue'
import SwitchSetting from '@/components/device_control_detail/SwitchSetting.vue'
import TimerSetting from '@/components/device_control_detail/TimerSetting.vue'
import ModeSetting from '@/components/device_control_detail/ModeSetting.vue'
import RebootSetting from '@/components/device_control_detail/RebootSetting.vue'
import CarSetting from '@/components/device_control_detail/CarSetting.vue'
import axios from 'axios'

export default {
  name: 'DeviceControl',
  data: function () {
    return {
      deviceInfo: '',
      currentMode: '',
      modeList: [
        '正常模式',
        '调试模式',
        '远程升级模式',
        '亮灯状态模式',
        '报警状态模式',
        '特殊功能模式',
        '运输模式',
        '注销模式'
      ],
      panelList: [
        ['参数设置', ParamSetting, '参数'],
        ['开关调节', SwitchSetting, '开关'],
        ['定时调节', TimerSetting, '定时'],
        ['模式设置', ModeSetting, '模式'],
        ['重启设备', RebootSetting, '重启'],
        ['车辆设置', CarSetting, '记录']
      ],
      computed: {
        chooseMode () {
          return this.modeList[this.currentMode]
        }
      },
      currentPanel: ParamSetting
    }
  },
  methods: {
    async resetList () {
      const { data: resetL } = await axios.get('http://49.235.106.165:1020/equipmenContro/two/get/msg', { params: { deviceIdImei: this.getDeviceId } })
      console.log(resetL)
      if (resetL.code === 2000) {
        this.list = resetL.data
        console.log(this.list)
      }
    }
  },
  // created: {

  // }
  mounted () {
    this.getDeviceId = this.$route.query.deviceID
    console.log(this.getDeviceId)
  }
}
</script>

<style scoped lang="less">
#main_container{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: hsla(140, 100%, 92%, 0.85);
}
#container{
  position: absolute;
  width: 1531px;
  height: 936px;
  min-height: 936px;
  max-height: 1200px;
  top: 14px;
  left: 52px;
  background-color: hsl(139, 27%, 75%);
}
#backHeader{//返回导航栏，居中
  position: relative;
  height: 84px;
  line-height: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius:20px;
  background-color: hsla(140, 100%, 88%, 0.85);
}
#backlink{//返回链接
    text-decoration: none;
    font-size: 18.75px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 27.15px;
    color: rgba(30, 170, 231, 1);
}
#infoPanel{//控制界面主体
    position: relative;
    top: 12px;
    height: 85%;
    min-height: 600px;
    background-color: hsla(140, 100%, 84%, 0.85);
}
#panelNav {
  border-radius: 4px;
  top: 19px;
  width: 100%;
  height: 60px;
  margin: 0 !important;
  background-color: hsla(140, 100%, 71%, 0.85);
}
#deviceInfoTable{//设备信息2行
    position: relative;
    height: 135px;
    min-width: 1000px;
    max-width: 1461px;
    top: 37px;
    left: 105px;
}
#line{//分隔线
  position: relative;
  top: 14px;
  width: 93%;
  height:2px;
  border: 1px solid rgba(220, 220, 220, 1);
}
.verticalCenter{
    vertical-align:middle;
}
.el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
.grid-content {
  min-height: 50px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.b_header{//设置页导航按钮
  width: 200px;
  height: 50px;
  border-radius: 20px;
  border: 0;
  background: rgba(239, 239, 239, 1);
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
