<template>

<el-container id="container">
  <el-header height="9%">
    <div>
      <el-image :src="mscr">

      </el-image>
    </div>
  </el-header>
  <el-container>
    <el-aside width="12%"><SideBar></SideBar></el-aside>
    <el-main>
      <router-view/></el-main>
  </el-container>
</el-container>

</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/outerframe/SideBar.vue'
export default {
  name: 'MainView',
  components: {
    SideBar
  },
  data () {
    return {
      mscr: '../src/assets/icon/主logo.png'
    }
  }
}
</script>

<style>
 .el-header{
    background-color: hsla(183, 13%, 67%, 0.85);
    color: #333;
  }

  .el-aside {
    background-color: hsla(133, 30%, 58%, 0.85);
    color: #333;
  }

  .el-main {
    background-color: hsla(140, 100%, 98%, 0.85);
    color: #333;
    position: relative;
    padding: 0 !important;
  }

 #container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

</style>
