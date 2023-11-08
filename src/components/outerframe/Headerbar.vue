<template>
  <div class="container">
    <span id="t_welcome">欢迎登陆教学评估小助手后台应用系统</span>
    <input type="text" name="" id="">
    <div id="spliter"></div>
    <button>m</button>
    <button>n</button>
    <div id="spliter"></div>
    <button id="avatar" style="float: right;">avatar</button>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
.container{
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
    margin-right: 15px;
  }
  button{
    margin-left: 12px;
    margin-right: 12px;
    height: 20px;
    width: 20px;
  }
  #spliter{
    top: 30px;
    width: 20px;
    height: 0px;
    transform: rotate(90deg);
    border: 1px solid rgba(130, 145, 169, 0.53);
  }
  #avatar{
    margin-right: 39px;
    margin-left: 15px;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: rgba(130, 145, 169, 1);
  }
}
</style>
