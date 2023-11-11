<template>
    <div>
        <el-container>
            <el-aside id="workload-side">
                <el-menu :default-openeds="['2']">
                    <el-menu-item index="1"><i class="circle-orange"></i><span>理论课</span></el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="circle-red"></i><span>实验课</span></template>
                        <el-menu-item index="2-1"><span>A类</span></el-menu-item>
                        <el-menu-item index="2-2"><span>B类</span></el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3" style="text-wrap"><i class="circle-blue"></i><span class="twoline">指导课程设计<br>集中性实习</span></el-menu-item>
                    <el-menu-item index="4"><i class="circle-purple"></i><span>指导社会调查</span></el-menu-item>
                    <el-menu-item index="5"><i class="circle-green"></i><span class="twoline">指导分散性实习<br>工程设计训练</span></el-menu-item>
                    <el-menu-item index="6"><i class="circle-grey"></i><span>指导毕业设计</span></el-menu-item>
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
    width: 232px!important;
    height: 100%;
    .el-menu-item{
    height: 60px!important;
    }
    span{
        position: absolute;
        left: 50px;
        top: 20px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0px;
        line-height: 20px;
        color: rgba(130, 145, 169, 1);
        text-align: left;
        vertical-align: top;
        white-space: pre-wrap;
    }
    .twoline{
        top: 11px !important;
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
.text-wrap{
    white-space: pre-wrap;
}
.circle-orange{
    position: absolute;
    top: 24px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(255, 138, 72, 1);
}
.circle-red{
    position: absolute;
    top: 24px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(255,61,87,1);
}
.circle-blue{
    position: absolute;
    top: 24px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(34,204,226,1);
}
.circle-purple{
    position: absolute;
    top: 24px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(240,12,225,1);
}
.circle-green{
    position: absolute;
    top: 24px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(9,182,109,1);
}
.circle-grey{
    position: absolute;
    top: 25px;
    left: 35px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 5px;
    opacity: 1;
    background: rgba(130,145,169,1);
}
</style>
<style lang="less">
.el-submenu__title{
height: 60px!important;
    span{
            position: absolute;
            left: 50px;
            top: 20px;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 20px;
            color: rgba(130, 145, 169, 1);
            text-align: left;
            vertical-align: top;

        }

}
</style>
