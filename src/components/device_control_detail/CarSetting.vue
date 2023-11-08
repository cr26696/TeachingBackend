<!-- 车辆设置页 -->
<template>
  <div id="panelContainer">

    <div id="panelHeader">
      <span class="t_panelTitle" id="panelTitle">车辆设置</span>
    </div>
    <div id="carMonitor">
      <span id="span1" class="pos_leftCenter">车辆监测：</span>
      <span id="span2"><el-Switch style="zoom:1.8;" active-color="#rgba(30, 170, 231, 1);" v-model="monitorSwitch"></el-Switch></span>
    </div>
    <div id="carMaxCountTime">
      <span>最大计算无车计时间（S）</span>
      <input type="text">
    </div>
    <div id="panelSubmit">
      <BtSubmit></BtSubmit>
    </div>
  </div>
</template>

<script>
import BtSubmit from '@/components/button/BtSubmit.vue'
export default {
  name: 'CarSetting',
  components: {
    BtSubmit
  },
  data () {
    return {
      monitorSwitch: 'true'
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
    top: 19px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 80%, 0.9);

    #panelTitle{
      display: block;
      position: relative;
      float: left;
      width: 100px;
      height: 37px;
      top: 50%;
      left: @left;
      transform: translateY(-50%);
    }
  }
  #carMonitor{
    position: relative;
    height: 40px;
    top: 19px+20px;
    div{
      width: auto!important;
    }

    #span1{
      position: relative;
      width: 94px;
      height: 28px;
      left: @left;
      top: 50%;
      line-height: 28px;
      float: left;
    }
    #span2{
      position: relative;
      width: 95px;
      height: 40px;
      left: 29px+@left;
      float: left;
      border: 1px solid black;
    }
  }
  #carMaxCountTime{
    position: relative;
    height: 51px;
    top: 19px+20px+28px;
    span{
      position: relative;
      width: 218px;
      height: 28px;
      left: @left;
      font-size: 18.77px;
      font-weight: 500;
      line-height: 27.17px;
      color: rgba(102, 102, 102, 1);
    }
    input{
      position: relative;
      width: 432px;
      height: 51px;
      left: @left;
      border-radius: 20px;
      border:0;
      background: rgba(239, 239, 239, 1);
    };
  }
  #panelSubmit{
    position:absolute;
    width:100%;
    text-align: center;
    bottom: 33px;
  }
}
//--------------------------------------------
.pos_center{
  transform: translate(-50%,-50%);
}.pos_leftCenter{
  transform: translateY(-50%);
}.pos_topCenter{
  transform: translateX(-50%);
}

//字体样式--------------------------------------------
.t_panelTitle{
  font-size: 25px;
  font-weight: 500;
  line-height: 36.2px;
  color: rgba(66, 66, 66, 1);
}
.t_rebootButton{
  font-size: 25px;
  font-weight: 500;
  line-height: 36.2px;
  color: rgba(255, 255, 255, 1);
}
.t_bSubmit{//参数设置面板提交按钮所用字体
  font-size: 20.83px;
  font-weight: 500;
  line-height: 30.17px;
  color: rgba(255, 255, 255, 1);
}
</style>
