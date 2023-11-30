<template>
    <el-container>
        <span id="title-font">实验课 A类</span>
        <el-button id="upload-button" type="primary" @click="downloadfile"><img id="download" :src=download><span id="download-font">下载</span></el-button>
        <!-- <el-select v-model="selected" id="selected">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select> -->
        <div id="lesson-font">课程</div>
        <el-container id="selected">
            <el-select v-model="selected" size="medium">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </el-container>
        <el-main class="content-container">
            <Workloaduser v-for="(data, index) in dataList" :key="index" :data="data"></Workloaduser>
        </el-main>
        
   </el-container>
  </template>
  
  <script>
import Workloaduser from './Workloaduser.vue';
  export default {
    name: 'SchoolRank',
    data() {
        return {
            download: require('@/assets/icon/download-white.png'),
            upload: require('@/assets/icon/upload-icon1.png'),
            download1: require('@/assets/icon/download-grey.png'),
            displayItems: [],
            dataList:[
                {
                    academy:'电子信息学院（微电子学院）',
                    class:'xxx',
                    number:'40768',
                    note1:'xxx',
                    coefficient1:'电子信息学院（微电子学院）',
                    coefficient2:'xxx',
                    classcoefficient:'40768',
                    classscalecoefficient:'40768',
                    score:'电子信息学院（微电子学院）',
                    total:'xxx',
                    standard:'xxx',
                    note2:'xxx',
                    good:'电子信息学院（微电子学院）',
                    head:'xxx'
                },
                {
                    academy:'电子信息学院（微电子学院）',
                    class:'xxx',
                    number:'40768',
                    note1:'xxx',
                    coefficient1:'电子信息学院（微电子学院）',
                    coefficient2:'xxx',
                    classcoefficient:'40768',
                    classscalecoefficient:'40768',
                    score:'电子信息学院（微电子学院）',
                    total:'xxx',
                    standard:'xxx',
                    note2:'xxx',
                    good:'电子信息学院（微电子学院）',
                    head:'xxx'
                },
                {
                    academy:'电子信息学院（微电子学院）',
                    class:'xxx',
                    number:'40768',
                    note1:'xxx',
                    coefficient1:'电子信息学院（微电子学院）',
                    coefficient2:'xxx',
                    classcoefficient:'40768',
                    classscalecoefficient:'40768',
                    score:'电子信息学院（微电子学院）',
                    total:'xxx',
                    standard:'xxx',
                    note2:'xxx',
                    good:'电子信息学院（微电子学院）',
                    head:'xxx'
                },
                
               ],
            value: true,
            options: [{
                value: '选项1',
                label: '电子信息学院（微电子学院）'
                }],
            selected:''
        };
    },
    methods: {
        downloadfile() {
            //下载内容
        }
    },
    components: { Workloaduser }
}
  </script>
  
  <style lang="less" scoped>
  #upload-button{
  position: absolute;
  bottom: 29px;
  right: 50px;
  width: 140px;
  height: 40px;
  border-radius: 6px;
  background: rgba(0, 129, 255, 1);
}
  #download-font{
    position: absolute;
    left: 66px;
    top: 10px;
    width: 32px;
    height: 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: top;
  }
  #download{
    position: absolute;
    left: 22px;
    top: 13px;
    width: 14px;
    height: 14px;
    opacity: 1
  }
  #title-font{
    position: absolute;
    top: 38px;
    left: 45px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 43.44px;
    color: rgba(0, 0, 0, 1);
  }
  .content-container{
  position: absolute;
  left: 38px;
  top: 110px;
  bottom: 92px;
  right: 36px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  
  }

  .facultyinfo{
    position: absolute;
    left: 236px;
    top: 36px;
    width: 182px;
    height: 84px;
    /* background-color: black; */
  }
  #info-font1{
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 30px;
    color: rgba(0, 0, 0, 1);
  }
  #info-font2{
    /** 文本3 */
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(130, 145, 169, 1);
  }
  #rank{
    position: absolute;
    left: 34px;
    bottom: 45px;
    width: 140px;
    height: 45px;
    border-radius: 6px;
    border: 2px solid rgba(255, 61, 87, 0.15);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(255, 0, 0, 1);
    text-align: center;
    vertical-align: top;
    padding: 12px;
  }
  #classTable{
    position: absolute;
    left: 31px;
    top: 209px;
    width: 97%;
  }
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background-color: white;
}		
::-webkit-scrollbar-thumb {
    background-color: rgba(174, 175, 176, 1);
    border-radius: 6px;
}  
#selected{
    position: absolute;
    right: 36px;
    top: 49px;
}
#lesson-font{
    position: absolute;
    font-size: 13px;
    top: 58px;
    right: 300px;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(0, 0, 0, 1);
    text-align: right;
    vertical-align: top;
}
.el-select{
    width: 247px;
    border-radius: 6px;
}
  </style>
<style>
.el-input--medium .el-input__inner {
    height: 40px;
    line-height: 40px;
}
</style>
