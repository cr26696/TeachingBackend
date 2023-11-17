<template>
    <el-container>
        <span id="title-font">学校排名</span>
        <!-- <el-row><el-button id="download-button" type="primary"><img id="download" :src=download><span id="download-font">下载</span></el-button></el-row> -->
        <el-row>
          <el-button id="upload-button" type="primary"><img id="upload" :src=upload><span id="download-font">上传</span></el-button>
          <el-button id="download-button1" type="info" plain><img id="download1" :src=download1></el-button>
        </el-row>
        <el-main class="content-container">
          <div id="rank-form"><span id="form-title">排名表格</span></div>
          <div class="facultyinfo"></div>
          <el-button id="back-button"><span id="back-font">返回</span></el-button>
        </el-main>
   </el-container>
</template>

<script>
export default {
  name: 'SchoolRank',
  data () {
    return {
      download: require('@/assets/icon/download-square.png'),
      upload: require('@/assets/icon/upload-icon1.png'),
      download1: require('@/assets/icon/download-icon-grey.png'),
      facultyInfo: [
      ]
    }
  }
}
</script>

<style>
#download-button{
    position: absolute;
    top: 115px;
    left: 38px;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: rgba(0, 129, 255, 1);
}
#download-button1{
    position: absolute;
    bottom: 29px;
    left: 199px;
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 1);
}
#upload-button{
    position: absolute;
    bottom: 29px;
    left: 38px;
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
    font-weight: 200;
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
#download1{
    position: absolute;
    left: 13px;
    top: 13px;
    width: 14px;
    height: 14px;
    opacity: 1
}
#upload{
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
#back-button{
  position: absolute;
  right: 58px;
  top: 58px;
  background: rgba(31,41,53,1);
  opacity: 1;
  border-radius: 6px;
  width: 100px;
  height: 40px;
}
#back-font{    
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
  }
  #rank-form{
    position: absolute;
    top: 0px;
    left: 34px;
    width: 173px;
    height: 171px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px ;
    background: linear-gradient(134.72deg, rgba(255, 61, 87, 1) 0%, rgba(255, 138, 72, 1) 100%);
  }
  #form-title{
    position: absolute;
    left: 55px;
    top: 41px;
    width: 64px;
    height: 90px;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: top;
  }
  .facultyinfo{
    position: absolute;
    left: 236px;
    top: 36px;
    width: 182px;
    height: 84px;
    background-color: black;
  }
</style>
