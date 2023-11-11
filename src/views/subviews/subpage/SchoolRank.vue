<template>
    <div>
        <span id="title-font">学校总计</span>
        <el-row><el-button id="download-button" type="primary"><img id="download" :src=download><span id="download-font">下载</span></el-button></el-row>
    </div>
</template>

<script>
export default {
  name: 'SchoolRank',
  data () {
    return {
      download: require('@/assets/icon/download-square.png'),
    }
  }
}
</script>

<style>
#download-button{
    position: absolute;
    top: 115px;
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
</style>
