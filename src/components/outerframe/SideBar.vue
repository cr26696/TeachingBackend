<template>
  <el-menu>
    <el-menu-item index="1">
      <router-link to="/mainview/deviceList" style="text-decoration: none">
        <div>
          <i class="el-icon-menu"></i>
          <span>教职工信息</span>
        </div>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <div>
        <i class="el-icon-view"></i>
        <router-link to="/mainview/alarmInfo" style="text-decoration: none">教师工作量核算</router-link>
      </div>
    </el-menu-item>
    <el-menu-item index="3">
        <div>
        <i class="el-icon-view"></i>
        <router-link to="/mainview/deviceControl" style="text-decoration: none">奖项录入</router-link>
      </div>
    </el-menu-item>
    <el-menu-item index="4">
      <div>
        <i class="el-icon-view"></i>
        <router-link to="/mainview/deviceControl" style="text-decoration: none">结果查询</router-link>
      </div>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
