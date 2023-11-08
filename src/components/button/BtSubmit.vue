<template>
  <div>
    <button class="b_submit">
        <img :src=iSubmit>
        <span class="t_bSubmit">提交</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BtSubmit',
  data () {
    return {
      iSubmit: require('@/assets/icon/提交按钮.png')
    }
  }
}
</script>

<style scoped lang="less">
.b_submit{//提交
    position: relative;
    width: 232px;
    height: 60px;
    opacity: 1;
    margin: 0 auto;
    border-radius: 22px;
    background: rgba(30, 170, 231, 1);
  span{
    width: 42px;height: 31px;
  }
  img{
    position: absolute;
    height: 84px;
    width: 84px;
    left: 34px;
    top: 25px;
    transform: translate(-50%,-33%);
  }
  .t_bSubmit{//参数设置面板提交按钮所用字体
    font-size: 20.83px;
    font-weight: 500;
    line-height: 30.17px;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
