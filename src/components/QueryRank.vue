<template>
<div>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu :default-openeds="['1']">
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
</style>
