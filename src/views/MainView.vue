<template>

<el-container id="container">
  <el-aside width="240px"><SideBar></SideBar></el-aside>
  <el-container>
    <el-header height="80px">
    <HeaderBar></HeaderBar>
   </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/outerframe/SideBar.vue'
import HeaderBar from '@/components/outerframe/HeaderBar.vue'

export default {
  name: 'MainView',
  components: {
    HeaderBar,
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
    position: relative;
    background-color: hsla(183, 13%, 67%, 0.85);
    color: #333;
    padding: 0!important;
}

.el-main {
  background-color: rgba(219,231,238,1);
  color: #333;
  position: relative;
  padding: 0 !important;
}

#container {
  position: absolute;
  height: 100%;
  width: 100%;
  > .el-aside {
    background: linear-gradient(180deg, rgba(31, 41, 53, 1) 0%, rgba(66, 83, 101, 1) 100%);
    color: #333;
  }
}

</style>
