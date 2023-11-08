<!-- 模式设置页 -->
<template>
  <div id="panelContainer">

    <div id="panelHeader">
      <span class="t_paneltitle" id="panelTitle">设备模式</span>
      <span class="t_paneltitle" id="modeCurrent" >{{ chooseMode }}</span>
    </div>
    <div id="modeRow1">
      <span class="modeName" style="left: 46px;">正常模式：</span>
      <span class="switchWarpper" style="left: 149px"><el-Switch v-model="currentMode" data-modeid=0 :active-value=0 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 321px;">调试模式：</span>
      <span class="switchWarpper" style="left: 424px;"><el-Switch v-model="currentMode" data-modeid=1 :active-value=1 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 600px;">远程升级模式：</span>
      <span class="switchWarpper" style="left: 748px;"><el-Switch v-model="currentMode" data-modeid=2 :active-value=2 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 921px;">亮灯状态模式：</span>
      <span class="switchWarpper" style="left: 1064px;"><el-Switch v-model="currentMode" data-modeid=3 :active-value=3 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 1236px;">报警状态模式：</span>
      <span class="switchWarpper" style="left: 1379px;"><el-Switch v-model="currentMode" data-modeid=4 :active-value=4 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
    </div>
    <div id="modeRow2">
      <span class="modeName" style="left: 46px;">特殊功能模式：</span>
      <span class="switchWarpper" style="left: 187px"><el-Switch v-model="currentMode" data-modeid=5 :active-value=5 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 321px;">运输模式：</span>
      <span class="switchWarpper" style="left: 424px;"><el-Switch v-model="currentMode" data-modeid=6 active-value=6 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
      <span class="modeName" style="left: 600px;">注销模式：</span>
      <span class="switchWarpper" style="left: 816px;"><el-Switch v-model="currentMode" data-modeid=7 active-value=7 active-color="#rgba(30, 170, 231, 1);" @change="switchStatusUpdate($event)" style="zoom: 1.8;"></el-Switch></span>
    </div>
    <div id="panelSubmit">
      <button class="b_submit"><i style="float: left;">图</i><span>提交</span></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TimerSetting',
  data: function () {
    return {
      lightOn: true,
      brightness: 80,
      currentMode: 0,
      lastMode: 0,
      modeList: [
        '正常模式',
        '调试模式',
        '远程升级模式',
        '亮灯状态模式',
        '报警状态模式',
        '特殊功能模式',
        '运输模式',
        '注销模式'
      ]
    }
  },
  methods: {
    async settings () {
      const { data: result } = await axios.post('http://49.235.106.165:1020/equipmenContro/six/activation/settings', { deviceIdImei: '15449288861881059628769', mode: '0' })
      console.log(result)
    },
    switchStatusUpdate (status) { // 开关状态改变
      // const target = event.target.parentNode
      // const modeId = target.dataset.modeid
      if (this.currentMode === false) {
        this.currentMode = this.lastMode
      } else {
        console.log('上次值' + this.lastMode + ', 当前值' + this.currentMode)
        this.lastMode = this.currentMode
      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted阶段currentMode：' + this.currentMode)
    this.currentMode = 0
  },
  computed: {
    chooseMode () {
      return this.modeList[this.currentMode]
    }
  }
}
</script>

<style scoped lang="less">
@left : 46px;
//id嵌套样式-----------------------------------------
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
    height: 37px;
    top: 28px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 80%, 0.9);

    #panelTitle{
      position: absolute;
      width: 100px;
      height: 37px;
      left: @left;
    }
    #modeCurrent{
      position: absolute;
      width: 150px;
      height: 37px;
      left: 296px;
      float: left;
      color: rgba(30, 170, 231, 1);
    }
  }
  #modeRow1{
    position: absolute;
    height: 40px;
    top: 116px;
    background-color: hsla(140, 50%, 65%, 0.9);

    .modeName{
      position: absolute;
      height: 28px;
      transform: translateY(-50%);
      top: 50%;
    }
    .switchWarpper{
      position: absolute;
      width: 95px;
      height: 40px;
    }
  }
  #modeRow2{
    position: absolute;
    height: 40px;
    top: 180px;
    background-color: hsla(140, 50%, 55%, 0.9);
    .modeName{
      position: absolute;
      height: 28px;
      transform: translateY(-50%);
      top: 50%;
    }
    .switchWarpper{
      position: absolute;
      width: 95px;
      height: 40px;
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
.b_task{//参数设置面板两按钮
  position: absolute;
  width: 150px;
  height: 45px;
  opacity: 1;
  border-radius: 50px;
  background: rgba(30, 170, 231, 1);
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
.t_paneltitle{
  font-size: 25px;
  font-weight: 500;
  line-height: 36.2px;
  color: rgba(66, 66, 66, 1);
}
.t_mode{
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
