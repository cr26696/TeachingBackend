<template>
<div>
  <el-container>
        <el-aside id="result-side">
            <el-menu>
              <el-submenu index="1">
                    <template slot="title">学评教排名</template>
                    <el-menu-item index="1-1">学校排名</el-menu-item>
                    <el-menu-item index="1-2">学院排名</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">教学业绩考核</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main></el-main>
    </el-container>
</div>
</template>

<script>

export default {
  name: 'DeviceList'
}

</script>

<style scoped lang="less">
#result-side{
    position: absolute;
    background-color: yellow!important;;
    width: 233px!important;
    height: 100%;
}
// #container{
//   height: 100%;
// }
// #backHeader{
//   position: absolute;
//   top: 41px;
//   left: 53px;
//   width: 90%;
// }
// #content{
//   position: absolute;
//   top: 112px;
//   left: 53px;
//   width: 90%;
//   height: 775px;
// }
// #textDeviceID{
//   font-size: 20.83px;
//   font-weight: 700;
//   line-height: 30.17px;
//   color: rgba(40, 40, 40, 1);
//   text-align: left;
// }
// .backHeaderItem{
//   height: 50px;
// }
</style>
