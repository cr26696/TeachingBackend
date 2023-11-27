<template>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                        <template slot="title"><span>学评教排名</span></template>
                        <el-menu-item index="1-1" @click="goComponentSchool"><i id="iconblue" class="el-icon-folder" style="color: blue;"></i><span style="font-weight: 500;">学校排名</span></el-menu-item>
                        <el-menu-item index="1-2" @click="goComponentAcademy"><i id="iconred" class="el-icon-folder" style="color: red;"></i><span style="font-weight: 500;">学院排名</span></el-menu-item>
                    </el-submenu>
                <el-menu-item index="2"><span class="maintitle">教学业绩考核</span></el-menu-item>
                <el-menu-item index="3"><span class="maintitle">教学工作量统计</span></el-menu-item>
            </el-menu>
            <el-button @click="changeComponent">switch</el-button>
        </el-aside>
        <el-main id="achievement-main">
            <component :is="com"></component>
        </el-main>
    </el-container>
</template>

<script>
import AcademyRank from './subpage/AcademyRank.vue';
import SchoolRank from './subpage/SchoolRank.vue';
import SchoolRankuser from './subpage/SchoolRankuser.vue';
import AcademyRankuser from './subpage/AcademyRankuser.vue';
import experimentClassA from './subpage/experimentClassA.vue';

export default {
  name: 'QueryRank',
  data() {
    return {
      com: '',
      admin:true
    }
  },
  components: {
    AcademyRank,
    SchoolRank,
    SchoolRankuser,
    AcademyRankuser,
    experimentClassA

  },
  methods:{
    changeComponent(){
        this.admin=!this.admin
        console.log(this.admin)
    },
    goComponentSchool(){
        if(this.admin){
            this.com=experimentClassA
        }else{
            this.com=SchoolRankuser
        }
    },
    goComponentAcademy(){
        if(this.admin){
            this.com=AcademyRank
        }else{
            this.com=AcademyRankuser
        }
    }
  }
}
</script>

<style scoped lang="less">
.el-container{
    position: relative;
	height: 100%;
    #achievement-side{
    width: 15% !important;
    min-width: 200px;
    max-width: 220px;
    height: 100%;
    min-height: 500px;
    background-color: white;
    .el-menu-item{
    padding: 0px!important;
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
    
}
// #achievement-main{
//     left: 232px;
//     position: absolute;
//     padding: 0 !important;
//     height: 1000px;
//     width: 1448px;
// }
// #achievement-side{
//     width: 15% !important;
//     min-width: 200px;
//     max-width: 220px;
//     height: 100%;
//     min-height: 500px;
//     background-color: white;
//     .el-menu-item{
//     padding: 0px!important;
//     height: 60px!important;
//     i{
//         position: absolute;
//         left: 40px;
//         top: 21px;
//     }
//     span{
//       position: absolute;
//       left: 74px;
//       font-size: 14px;
//       font-weight: 400;
//       line-height: 20px;
//       top: 21px;
//     }
//     .maintitle{
//         position: absolute;
//         left: 20px;
//         font-weight: 400;
//         line-height: 20px;
//         top: 21px;
//         height: 21px;
//         opacity: 1;
//         font-size: 18px;
//         font-weight: 500;
//         letter-spacing: 0px;
//         line-height: 21px;
//         color: rgba(130, 145, 169, 1);
//         text-align: left;
//         vertical-align: top;
//     }
//     }
// }
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
