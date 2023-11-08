<template>
  <el-menu>
    <div style="height: 80px;display: flex;align-items: center;">
      <img id="logo" :src=logo><span id="logo_text">评估助手</span><img id="logo_three_line" :src=logo_three_line>
    </div>
    <el-menu-item index="1">
      <router-link to="/mainview/deviceList" style="text-decoration: none">
        <div>
          <i class="el-icon-menu"></i>
          <span>教职工信息</span>
        </div>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/mainview/alarmInfo" style="text-decoration: none">
        <div>
        <i class="el-icon-folder"></i>
        <span>教师工作量核算</span>
      </div>
      </router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/mainview/deviceControl" style="text-decoration: none">
        <div>
        <i class="el-icon-date"></i>
        <span>奖项录入</span>
      </div>
      </router-link>
    </el-menu-item><el-menu-item index="4">
      <router-link to="/mainview/deviceList" style="text-decoration: none">
        <div>
        <i class="el-icon-message"></i>
        <span>结果查询</span>
      </div>
      </router-link>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      logo: require('@/assets/icon/Meher_icon.png'),
      logo_three_line: require('@/assets/icon/Three_line.png')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-menu{
  background-color: unset;
  #logo{
    position: absolute;
    left: 39px;
    top: 27px
  }
  #logo_text{
    position: absolute;
    left: 99px;

    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    }
  #logo_three_line{
    position: absolute;
    left: 191px;
    top: 34px
  }
  .el-menu-item{
    padding: 0!important;
    i{
      position: absolute;
      left: 40px;
    }
    span{
      position: absolute;
      left: 74px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
