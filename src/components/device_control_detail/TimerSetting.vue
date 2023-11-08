<!-- 定时调节页 -->
<template>
  <div id="panelContainer">

    <div id="panelHeader">
      <span class="t_paneltitle" id="panelTitle">定时调光</span>
    </div>
    <div id="timeraddTask">
      <button class="b_task" id="addTask" @click="addTask">+增加定时任务</button>
      <button class="b_task" id="readTask" style="background: rgba(239, 239, 239, 1);">读取定时调光任务</button>
    </div>
    <el-dialog id="taskDialog"
        title="定时调光"
        :visible.sync="addTaskDialogVisible"
        width="905px">
        <div><span>任务类型：</span><input type="text"></div>
        <div><span>亮度：</span><input type="text"></div>
        <div><span>执行时间：</span><input type="text"></div>
        <span id="dialogButtons">
          <el-button @click="addTaskDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTaskDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <div id="timerTable">
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="data1"
        label="版本号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="data2"
        label="任务类型"
        width="200">
      </el-table-column>
      <el-table-column
        prop="data3"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="data4"
        label="亮度值"
        width="200">
      </el-table-column>
      <el-table-column
        prop="data5"
        label="操作"
        width="200">
      </el-table-column>
    </el-table>
    </div>
    <div id="panelSubmit">
      <button class="b_submit" @click="dimmingBrightness"><i style="float: left;">图</i><span>提交</span></button>
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
      addTaskDialogVisible: false,
      tableData: [{
        data1: '0x2e',
        data2: '关灯指令',
        data3: '14:38:23',
        data4: '100',
        data5: '已完成'
      }, {
        data1: '0x2e',
        data2: '开灯指令',
        data3: '14:38:23',
        data4: '100',
        data5: '未完成'
      }, {
        data1: '0x2e',
        data2: '开灯指令',
        data3: '14:38:23',
        data4: '100',
        data5: '已完成'
      }]
    }
  },
  methods: {
    addTask () {
      this.addTaskDialogVisible = true
    },
    async dimmingBrightness () {
      const { data: result } = await axios.post('http://49.235.106.165:1020/equipmenContro/there/dimmingBrightness',
        {
          deviceIdImei: '15449288861881059628769',
          lightOnTimeS: '1',
          lightOnTimeF: '2',
          lightOn: '50',
          lightOnTimeOneS: '1',
          lightOnTimeOneF: '2',
          lightOnOne: '50',
          lightOnTimeTwoS: '1',
          lightOnTimeTwoF: '2',
          lightOnTwo: '50',
          lightOnTimeThreeS: '1',
          lightOnTimeThreeF: '2',
          lightOnThree: '50',
          lightOffTimeS: '8',
          lightOffTimeF: '9',
          lightOff: '10'
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
    height: 37px;
    top: 9px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 80%, 0.9);

    #panelTitle{
      position: absolute;
      width: 100px;
      height: 37px;
      left: @left;
      float: left;
    }
  }
  #timeraddTask{
    position: absolute;
    height: 45px;
    top: 98px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 65%, 0.9);

    #addTask{
      position: absolute;
      left: @left;
      border: 0;
    }
    #readTask{
      position: absolute;
      right: 54px;
      border: 0;
    }
  }
  #taskDialog{
    div{
      position: relative;
      height: 51px;
      margin-bottom: 15px;

      span{
        position: absolute;
        font-size: 20px;
        font-weight: 500;
        line-height: 28.96px;
        color: rgba(102, 102, 102, 1);
        left: 39px;
        top: 50%;
        transform: translateY(-50%);
      }
      input{
        position: absolute;
        right:43px;
        width: 665px;
        height: 51px;
        opacity: 1;
        border-radius: 20px;
        background: rgba(239, 239, 239, 1);
      }
      #dialogButtons{
        position: relative;
        left: 679px;
        top: 12px;
      }
    }
  }
  #timerTable{
    position: absolute;
    height: 45px;
    top: 184px;
    margin: 0 auto;
    background-color: hsla(140, 50%, 55%, 0.9);
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
.t_bSubmit{//参数设置面板提交按钮所用字体
  font-size: 20.83px;
  font-weight: 500;
  line-height: 30.17px;
  color: rgba(255, 255, 255, 1);
  text-align: left;
}
</style>
