<template>
    <div>
      <el-container>
            <el-aside id="achievement-side">
                <el-menu>
                    <el-menu-item index="1">成果录入申请</el-menu-item>
                    <el-menu-item index="2">成果填写</el-menu-item>
                    <el-menu-item index="3">全部成果</el-menu-item>
                </el-menu>
            </el-aside>
            <el-main></el-main>
        </el-container>
    </div>
</template>
    
<script>
export default {
  name: 'PrizeRecord'
}
</script>

<style scoped lang="less">
#achievement-side{
    position: absolute;
    background: rgba(255, 255, 255, 1);
    width: 233px!important;
    height: 100%;
}
</style>
