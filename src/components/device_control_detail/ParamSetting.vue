<!-- 参数设置页 -->
<template>
  <div id="paramContainer">

    <div id="paramHeader">
      <span class="t_paramSet" style="position: absolute;width: 100px;height: 37px;left: 46px;float: left;">参数设置</span>
      <button class="b_paramHeader t_b2" style="right:222px;" @click="GPS">获取终端GPS命令下发</button>
      <button class="b_paramHeader t_b2" style="right:56px">读取设备参数</button>
    </div>
    <div id="paramContent">
      <div class="paramColumn" style="left: 46px;">
        <div class="paramItem"><span class="t_paramCategory">版本号</span><input type="text" class="input_param" v-model="version"></div>
        <div class="paramItem"><span class="t_paramCategory">灭灯延时</span><input type="text" class="input_param" ></div>
        <div class="paramItem"><span class="t_paramCategory">温度传感器报警阀值 </span><input type="text" class="input_param" v-model="temperatureWarning"></div>
        <div class="paramItem"><span class="t_paramCategory">光照传感器报警阈值</span><input type="text" class="input_param" v-model="lightWarning"></div>
        <div class="paramItem"><span class="t_paramCategory">灯杆倾斜角度报警阀值</span><input type="text" class="input_param" v-model="lightPoleTiltWarning"></div>
        <div class="paramItem"><span class="t_paramCategory">控制器状态指令</span><input type="text" class="input_param" v-model="controllerStatusInstruction"></div>
      </div>
      <div class="paramColumn" style="left: 104px;">
        <div class="paramItem"><span class="t_paramCategory">灯柱号</span><input type="text" class="input_param" ></div>
        <div class="paramItem"><span class="t_paramCategory">报警时间间隔</span><input type="text" class="input_param" ></div>
        <div class="paramItem"><span class="t_paramCategory">湿度传感器报警阈值 </span><input type="text" class="input_param" v-model="humidityWarning"></div>
        <div class="paramItem"><span class="t_paramCategory">信号强度报警阀值</span><input type="text" class="input_param" v-model="signalStrengthWarning"></div>
        <div class="paramItem"><span class="t_paramCategory">灯高度</span><input type="text" class="input_param" v-model="modulationHeight"></div>
        <div class="paramItem"><span class="t_paramCategory">经度</span><input type="text" class="input_param"></div>
      </div>
      <div class="paramColumn" style="left: 162px;">
        <div class="paramItem"><span class="t_paramCategory">上报周期设定 </span><input type="text" class="input_param" v-model="reportCycleSetting"></div>
        <div class="paramItem"><span class="t_paramCategory">修改APN</span><input type="text" class="input_param" v-model="apn"></div>
        <div class="paramItem"><span class="t_paramCategory">修改PLMN </span><input type="text" class="input_param" v-model="plmn"></div>
        <div class="paramItem"><span class="t_paramCategory">漏电报警阀值</span><input type="text" class="input_param" v-model="leakageAlarm"></div>
        <div class="paramItem"><span class="t_paramCategory">南向地址修改</span><input type="text" class="input_param"></div>
        <div class="paramItem"><span class="t_paramCategory">纬度 </span><input type="text" class="input_param"></div>
      </div>
    </div>
    <div style="position:absolute;
    width:100%;
    text-align: center;
    bottom: 33px;"
    >
      <button class="b_submit" @click="setparameters"><i style="float: left;">图</i><span>提交</span></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ParamSetting',
  data () {
    return {
      version: '',
      // 灭灯延时
      temperatureWarning: '',
      lightWarning: '',
      lightPoleTiltWarning: '',
      controllerStatusInstruction: '',
      // 灯柱号
      // 报警时间间隔
      humidityWarning: '',
      signalStrengthWarning: '',
      modulationHeight: '',
      // 经度
      reportCycleSetting: '',
      apn: '',
      plmn: '',
      leakageAlarm: '',
      ipOne: '192',
      ipTwo: '168',
      ipThree: '0',
      ipFour: '32'
      // 纬度
    }
  },
  methods: {
    async GPS  () {
      const { data: res } = await axios.post('http://49.235.106.165:1020/equipmenContro/twentyTwo/send/read/GPS', { deviceIdImei: '15449288861881059628769', modulationHeight: 5, maximumWarningAngle: 15 })
      console.log(res)
      if (res.code === 2000) {
        this.list = res.data.list
      }
    },
    async setparameters () {
      const { data: res } = await axios.post('http://49.235.106.165:1020/equipmenContro/ten/set/parameters',
        {
          deviceIdImei: '15449288861881059628769',
          version: '17',
          temperatureWarning: '30',
          lightWarning: '33',
          lightPoleTiltWarning: '35',
          controllerStatusInstruction: '1',
          humidityWarning: '32',
          signalStrengthWarning: '17',
          // modulationHeight: '',
          reportCycleSetting: '30',
          apn: '21',
          plmn: '132',
          leakageAlarm: '40',
          ipOne: '192',
          ipTwo: '168',
          ipThree: '0',
          ipFour: '32'
        })
      console.log(res)
    },
    async queryparameters () {
      const { data: res } = await axios.post('http://49.235.106.165:1020/equipmenContro/twelve/query/setting/parameter', { deviceIdImei: '15449288861881059628769', commandWord: '179' })
      console.log(res)
    }
  },
  created () {
    this.queryparameters()
  }
}
</script>

<style scoped lang="less">
#paramContainer{
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 575px;
  background-color: hsla(140, 50%, 92%, 0.9);
}
#paramHeader{
  position: relative;
  height: 45px;
  margin: 0 auto;
  background-color: hsla(140, 50%, 80%, 0.9);
}
#paramContent{
  position: relative;
  width: 1147px;
  height: 358px;
  top: 34px;
  display: flex;
}
//--------------------------------------------
.paramColumn{
  position: relative;
  width: 452px;
  background-color: hsla(0, 0%, 100%, 0.9);
}
.paramItem{
  display: flex;
  margin: 10px 0 0 0;
}
.input_param{
  position: relative;
  width: 260px;
  height: 51px;
  opacity: 1;
  border-radius: 10px;
  background: rgba(239, 239, 239, 1);
}
//复用按钮样式--------------------------------------------
.b_paramHeader{//参数设置面板两按钮
  position: absolute;
  height: 45px;
  padding:0px 16px;
  border-radius: 50px;
  border: 0;
  background: rgba(30, 170, 231, 1);
  float: right;
  vertical-align: middle;
}
.b_submit{//提交
  position: relative;
  width: 232px;
  height: 60px;
  opacity: 1;
  margin: 0 auto;
  border-radius: 15px;
  background: rgba(30, 170, 231, 1);
}
//复用字体样式--------------------------------------------
.t_paramSet{
  font-size: 25px;
  font-weight: 500;
  line-height: 36.2px;
  color: rgba(66, 66, 66, 1);
}
.t_paramCategory{
  width: 208px;
  font-size: 18.77px;
  font-weight: 500;
  line-height: 27.17px;
  text-align: left;
  color: rgba(102, 102, 102, 1);
}
.t_b2{//参数设置面板两按钮所用字体
  font-size: 18.77px;
  font-weight: 500;
  line-height: 27.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}
.t_bSubmit{//参数设置面板提交按钮所用字体
  font-size: 20.83px;
  font-weight: 500;
  line-height: 30.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}
</style>
