<template>
    <div>
        <el-container>
            <el-aside id="workload-side">
                <el-menu :default-openeds="['2']">
                    <el-menu-item index="1">理论课</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">实验课</template>
                        <el-menu-item index="2-1">A类</el-menu-item>
                        <el-menu-item index="2-2">B类</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">指导课程设计集中性实习</el-menu-item>
                    <el-menu-item index="4">指导社会调查</el-menu-item>
                    <el-menu-item index="5">指导分散性实习工程设计训练</el-menu-item>
                    <el-menu-item index="6">指导毕业设计</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main></el-main>
        </el-container>
    </div>
</template>
<script>
export default {
  name: 'TeachingTask',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
#workload-side{
    position: absolute;
    background: rgba(255, 255, 255, 1);
    width: 233px!important;
    height: 100%;
}
.el-menu-item.is-active{
    background-color: rgba(237, 244, 251, 1);
}
</style>
