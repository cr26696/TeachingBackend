<template>
<div>
    <el-container>
        <el-aside id="workload-side">
            <el-menu default-openeds="2">
                <el-menu-item index="1">理论课</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">实验课</template>
                    <el-menu-item index="2-1">A类</el-menu-item>
                    <el-menu-item index="2-2">B类</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">指导课程设计集中性实习</el-menu-item>
                <el-menu-item index="4">指导社会调查</el-menu-item>
                <el-menu-item index="5">指导分散性实习工程设计训练</el-menu-item>
                <el-menu-item index="6">指导毕业设计</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main></el-main>
    </el-container>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'PrizeRecord'
//   data: function () {
//     return {
//       deviceIdImei: '',
//       version: '',
//       alarmInterva: '',
//       temperatureWarning: '',
//       humidityWarning: '',
//       lightWarning: '',
//       signalStrengthWarning: '',
//       lightPoleTiltWarning: '',
//       leakageAlarm: '',
//       reportCycleSetting: '',
//       apn: '',
//       plmn: '',
//       controllerStatusInstruction: '',
//       ipOne: '192',
//       ipTwo: '168',
//       ipThree: '0',
//       ipFour: '32',
//       getdeviceID: ''
//     }
//   },
//   methods: {
//     async getAlarmInfo () {
//       const { data: get } = await axios.post('http://49.235.106.165:1020/equipmenContro/twelve/query/setting/parameter', { deviceIdImei: this.getdeviceID, commandWord: '179' })
//       console.log(get)
//       this.deviceIdImei = get.deviceIdImei
//       this.version = get.version
//       this.alarmInterva = get.alarmInterva
//       this.temperatureWarning = get.temperatureWarning
//       this.humidityWarning = get.humidityWarning
//       this.lightWarning = get.lightWarning
//       this.signalStrengthWarning = get.signalStrengthWarning
//       this.lightPoleTiltWarning = get.lightPoleTiltWarning
//       this.leakageAlarm = get.leakageAlarm
//       this.reportCycleSetting = get.reportCycleSetting
//       this.apn = get.apn
//       this.plmn = get.plmn
//       this.controllerStatusInstruction = get.controllerStatusInstruction
//       this.ipOne = get.ipOne
//       this.ipTwo = get.ipTwo
//       this.ipThree = get.ipThree
//       this.ipFour = get.ipFour
//     }
//   },
//   mounted () {
//     this.getdeviceID = this.$route.query.deviceID
//     console.log(this.getdeviceID)
//     this.getAlarmInfo()
//   }
}
</script>

<style scoped lang="less">
#workload-side{
    position: absolute;
    background-color: yellow!important;;
    width: 233px!important;
    height: 100%;
}
// #main_container{
//     position: absolute;
//     width: 100%;
//     height: 100%;
// }
// #backlink{//返回链接
//     text-decoration: none;
//     font-size: 18.75px;
//     font-weight: 500;
//     letter-spacing: 0px;
//     line-height: 27.15px;
//     color: rgba(30, 170, 231, 1);
// }
// #info{//报警信息主体
//     position: absolute;
//     top: 110px;
//     left: 52px;
//     height: 85%;
//     width: 90%;
//     min-height: 600px;
//     border-radius: 20px;
//     background-color: burlywood;
// }
// #infoHead{
//     min-height: 170px;
// }
// #line{//分隔线
//     border: 1px solid rgba(220, 220, 220, 1);
//     width: 93%;
//     margin: 0 auto;
// }
// #infoContent{
//     min-height: 840px;
// }
// #thrsTable{//阈值信息表
//     position: absolute;
//     height: 266px;
//     width: 95%;
//     min-width: 1000px;
//     max-width: 1461px;
//     top: 117px;
//     margin: 0 auto;
// }
// .contentHeader{//返回导航栏，居中
//     position: relative;
//     left: 52px;
//     top: 14px;
//     width: 90%;
//     height: 84px;
//     line-height: 0;
//     background-color: white;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     border-radius:20px
// }
// .verticalCenter{
//     vertical-align:middle;
// }
// .el-row {
//     margin-bottom: 20px;
//     &:last-child {
//       margin-bottom: 0;
//     }
//   }
//   .el-col {
//     border-radius: 4px;
//   }
//   .grid-content {
//     min-height: 55px;
//   }
//   .row-bg {
//     padding: 10px 0;
//     background-color: #f9fafc;
//   }

// .textInfo{//几种字体
//     font-size: 25px;
//     font-weight: 500;
//     letter-spacing: 0px;
//     line-height:36.2px;
//     color: rgba(66, 66, 66, 1);
// }
// .textCategory{
//     font-size: 16.67px;
//     font-weight: 500;
//     letter-spacing: 0px;
//     line-height: 24.13px;
//     color: rgba(102, 102, 102, 1);
// }
// .textInfoContent{
//     font-size: 18.75px;
//     font-weight: 700;
//     letter-spacing: 0px;
//     line-height: 27.15px;
//     color: rgba(40, 40, 40, 1);
// }
// p{
//     position: absolute;
//     height: auto;
// }
</style>
