<template>
  <div class="container">
    <span id="t_welcome">欢迎登陆教学评估小助手后台应用系统</span>
    <input type="text" name="" id="">
    <button style="float: right;">mails</button>
    <button style="float: right;">notices</button>
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
  background-color: hsla(139, 100%, 94%, 0.85);
  #t_welcome{
    position: absolute;
    left: 272px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(130, 145, 169, 1);
  }
  input{
  }
  button{
  }
  #avatar{
    padding-right: 39px;
    width: 36px;
    height: 36px;
    line-height: @top_height;
    border-radius: 6px;
    background: rgba(130, 145, 169, 1);
  }
}
</style>
