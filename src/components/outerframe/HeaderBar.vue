<template>
  <div class="containerHeadbar">
    <span id="t_welcome">欢迎登陆教学评估小助手后台应用系统</span>
    <input type="text" name="" id="" placeholder='请输入想要查询内容...'>
    <div id="spliter"></div>
    <button id="avatar" style="float: right;">退出</button>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.containerHeadbar{
  @top_height: 80px;

  display: flex;
  height: 80px;
  align-items: center;
  justify-content: flex-end;
  background: rgba(255, 255, 255, 1);
  #t_welcome{
    position: absolute;
    left: 40px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(130, 145, 169, 1);
  }
  input{
    width: 280px;
    height: 40px;
    background-color: rgba(237, 244, 251, 1);
    border-radius: 10px;
    border: none;
  }
  #spliter{
    top: 30px;
    height: 20px;
    margin: 0 36px 0 40px;
    border: 1px solid rgba(130, 145, 169, 0.53);
  }
  button{
    width: 95px;
    height: 45px;
    margin-right: 39px;
    font-size: 18px;
    font-weight: 700;
    text-indent: 5px;
    letter-spacing: 5px;
    line-height: 16px;
    border-radius: 6px;
    border: none;
    color: white;
    background: linear-gradient(135deg, rgba(255, 68, 86, 1) 0%, rgba(255, 135, 73, 1) 100%);
  }
}
</style>
