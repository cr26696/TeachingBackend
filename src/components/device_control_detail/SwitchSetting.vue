<!-- 开关调节页 -->
<template>
  <div id="panelContainer">

    <div id="panelHeader">
      <span class="t_switchSet" id="panelTitle">开关调节</span>
    </div>
    <div id="lightName">
      <p class="t_lightName" style="left:45px">主灯1：</p>
    </div>
    <div id="lightStatus">
      <span class="t_lightStatus text" style="left:45px;">开关状态：</span>
      <span style="left: 168px;"><el-Switch v-model=lightOn active-color="#rgba(30, 170, 231, 1);" id="switch" style="zoom: 1.8;"></el-Switch></span>
      <span class="t_lightStatus text" style="right: 88px;">{{ lightOn?"开":"关" }}</span>
    </div>
    <div id="lightBrightness">
      <span class="t_lightStatus" style="left:45px;">亮度调节：</span>
      <span id="slider" style="left: 157px;"><el-slider v-model="hostLight" :disabled="!lightOn"></el-slider></span>
      <span id="brightPercent">亮度{{hostLight}}%</span>
      <input type="text" v-model="hostLight" class="input_bright" style="position: absolute;float: right;right: 53px;">
    </div>
    <!-- 提交按钮 -->
    <div id="panelSubmit">
      <button class="b_submit" @click="Switchdimming"><i style="float: left;">图</i><span>提交</span></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SwitchSetting',
  data: function () {
    return {
      lightOn: true,
      hostLight: 80,
      copyLight: 30

    }
  },
  methods: {
    async Switchdimming () {
      const { data: result } = await axios.post('http://49.235.106.165:1020/equipmenContro/four/dimming',
        {
          deviceIdImei: '15449288861881059628769',
          hostLight: this.hostLight,
          copyLight: this.copyLight
        })
      console.log(result)
    }
  }
}
</script>

<style scoped lang="less">
@left : 45px;

#panelContainer{
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 575px;
  background-color: hsla(140, 50%, 92%, 0.9);

  div{
    width: 100%;
  }

  #panelHeader{
    position: relative;
    height: 45px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 80%, 0.9);

    #panelTitle{
      position: absolute;
      width: 100px;
      height: 37px;
      left: 46px;
      float: left;
    }
  }
  #lightName{
    position: absolute;
    top: 93px;
    p{
      position: absolute;
    }
  }
  #lightStatus{
    position: absolute;
    height: 40px;
    top: 132px;

    span{
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
    }
    .text{
      position: absolute;
      height: 28px;
    }
  }
  #lightBrightness{
    position: absolute;
    top: 183px;
    span{
      position: absolute;
    }
    #slider{
      position: absolute;
      left: 112px;
      width: calc((1000/1531)*100%);
    }
    #brightPercent{
      position: absolute;
      right: 251px;
      width:88px;
      height:28px;
      font-size: 18.77px;
      font-weight: 500;
      line-height: 27.17px;
      color: rgba(153, 153, 153, 1);
    }
  }

  #panelSubmit{
    position:absolute;
    width:100%;
    text-align: center;
    bottom: 33px;
  }
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
//输入框样式--------------------------------------------
.input_bright{
  width: 90px;
  height: 40px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(102, 102, 102, 1);
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
.t_switchSet{
  font-size: 25px;
  font-weight: 500;
  line-height: 36.2px;
  color: rgba(66, 66, 66, 1);
}
.t_lightName{
  font-size: 20px;
  font-weight: 500;
  line-height: 28.96px;
  color: rgba(30, 170, 231, 1);
}
.t_lightStatus{//亮度调节字样共用
  font-size: 18.77px;
  font-weight: 500;
  line-height: 27.17px;
  color: rgba(102, 102, 102, 1);
}
.t_bSubmit{//参数设置面板提交按钮所用字体
  font-size: 20.83px;
  font-weight: 500;
  line-height: 30.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}
</style>
<style lang="less">
//开关样式--------------------------------------------
// .el-switch__core{
//     width:95px!important;
//     height:40px!important;
//     /*color:#409EFF;*/
//   }
//   /*设置圆*/
// .el-switch__core::after{
//     width:35px!important;
//     height:35px!important;
//     margin-top:-1px;
//     margin-bottom: 2px;
//   }
</style>
