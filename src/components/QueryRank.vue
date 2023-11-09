<template>
<div>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                        <template slot="title">学评教排名</template>
                        <el-menu-item index="1-1"><i id="iconblue" class="el-icon-folder" style="color: blue;"></i>学校排名</el-menu-item>
                        <el-menu-item index="1-2"><i id="iconred" class="el-icon-folder" style="color: red;"></i>学院排名</el-menu-item>
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
  name: 'QueryRank'
}
</script>

<style scoped lang="less">
#achievement-side{
    position: absolute;
    width: 233px!important;
    background: rgba(255, 255, 255, 1);
    height: 100%;
}
.el-menu-item.is-active{
    background-color: rgba(237, 244, 251, 1);
}
#iconblue{
    // border: 2px solid rgba(0, 129, 255, 1);
    // box-shadow: 0px 4px 4px rgba(0, 129, 255, 0.53);
}
</style>
