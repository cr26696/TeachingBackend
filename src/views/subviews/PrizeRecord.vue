<template>
    <div>
      <el-container>
            <el-aside id="achievement-side">
                <el-menu>
                    <!-- <el-menu-item index="1"><i class="el-icon-files"></i><span>成果录入申请</span></el-menu-item> -->
                    <el-menu-item index="1" @click="com='Inputachi'"><i class="el-icon-position"></i><span>成果填写</span></el-menu-item>
                    <el-menu-item index="2" @click="com='Allachi'"><i class="el-icon-edit-outline"></i><span>全部成果</span></el-menu-item>
                </el-menu>
            </el-aside>
            <el-main id="submain">
              <component :is="com"></component>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Allachi from './subpage/Allachi.vue';
import Inputachi from './subpage/Inputachi.vue';


export default {
  name: 'PrizeRecord',
  data() {
    return {
      com:''
    }
  },
  components:{
    Allachi,
    Inputachi
  },
  methods: {
    routerGo (target) {
      this.$router.push(target)
    }
  }
}
</script>

<style scoped lang="less">
#achievement-side{
    position: absolute;
    background: rgba(255, 255, 255, 1);
    width: 232px!important;
    height: 100%;
 
  .submain{
    position: relative;
    padding: 0 !important;
}
    .el-menu-item{
        height: 60px!important;
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
