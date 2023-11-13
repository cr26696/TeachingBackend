<template>
<div>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                        <template slot="title"><span>学评教排名</span></template>
                        <el-menu-item index="1-1" @click="com='SchoolRank'"><i id="iconblue" class="el-icon-folder" style="color: blue;"></i><span>学校排名</span></el-menu-item>
                        <el-menu-item index="1-2" @click="com='AcademyRank'"><i id="iconred" class="el-icon-folder" style="color: red;"></i><span>学院排名</span></el-menu-item>
                    </el-submenu>
                <el-menu-item index="2"><span class="maintitle">教学业绩考核</span></el-menu-item>
            </el-menu>
        </el-aside>
        <el-main id="achievement-main">
            <component :is="com"></component>
        </el-main>
    </el-container>
</div>
</template>

<script>
import AcademyRank from './subpage/AcademyRank.vue';
import SchoolRank from './subpage/SchoolRank.vue'
export default {
  name: 'QueryRank',
  data() {
    return {
      com: ''
    }
  },
  components: {
    AcademyRank,
    SchoolRank
  }
}
</script>

<style scoped lang="less">
#achievement-main{
    left: 232px;
    position: absolute;
    padding: 0 !important;
    height: 1000px;
    width: 1448px;
}
#achievement-side{
    position: absolute;
    width: 232px!important;
    background: rgba(255, 255, 255, 1);
    height: 100%;
    .el-menu-item{
    height: 60px!important;
    i{
        position: absolute;
        left: 40px;
        top: 21px;
    }
    span{
      position: absolute;
      left: 74px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      top: 21px;
    }
    .maintitle{
        position: absolute;
        left: 20px;
        font-weight: 400;
        line-height: 20px;
        top: 21px;
        height: 21px;
        opacity: 1;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 21px;
        color: rgba(130, 145, 169, 1);
        text-align: left;
        vertical-align: top;
    }
    }
}
.el-menu-item{
    &.is-active::before{
        content:'';
        height:100%;
        width:6px;
        left: 0px;
        position:absolute;
        border-radius: 0px 5px 5px 0px;
        background: rgba(0, 129, 255, 1);
    }
}
</style>
<style lang="less">
.el-submenu__title{
height: 60px!important;
    span{
        position: absolute;
        left: 20px;
        font-weight: 400;
        line-height: 20px;
        top: 21px;
        height: 21px;
        opacity: 1;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 21px;
        color: rgba(130, 145, 169, 1);
        text-align: left;
        vertical-align: top;
        }
}
</style>
