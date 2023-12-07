<template>
    <div class="my-component">
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="6"><span class="title-font">教学班</span></el-col>
            <el-col :span="6"><span class="title-font">课程名称</span></el-col>
            <el-col :span="6"><span class="title-font">班级人数</span></el-col>
            <el-col :span="6"><span class="title-font">备注1</span></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.academy }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.class }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.number }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.note1 }}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><span class="title-font">系数1</span></el-col>
            <el-col :span="6"><span class="title-font">系数2</span></el-col>
            <el-col :span="6"><span class="title-font">类别系数</span></el-col>
            <el-col :span="6"><span class="title-font">班级规模系数</span></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.coefficient1 }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.coefficient2 }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.classcoefficient }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.classscalecoefficient }}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><span class="title-font">学分</span></el-col>
            <el-col :span="6"><span class="title-font">课程总学时</span></el-col>
            <el-col :span="6"><span class="title-font">标准课时</span></el-col>
            <el-col :span="6"><span class="title-font">备注2</span></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.score }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.total }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.standard }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.note2 }}</span></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><span class="title-font">优课优酬</span></el-col>
            <el-col :span="6"><span class="title-font">负责人</span></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-bottom: 30px;">
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.good }}</span></div></el-col>
            <el-col :span="6"><div class="content-style"><span class="content-font">{{ data.head }}</span></div></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:'Workloaduser',
    props: {
    data: Object, // 接收父组件传递的数据
  },
  created(){
    console.log('created'+this.data)
  }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.content-style{
    height: 46px;
    border-radius: 6px;
    background: rgba(174, 175, 176, 0.25);
    border: 1px solid rgba(130, 145, 169, 0.25);
}
.content-font{ 
    position: relative;
    color: rgba(0, 0, 0, 1);
    top: 11px;
    left: 13px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20px;

    }
  .title-font{
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(0, 0, 0, 1);
    text-align: left;
    vertical-align: top;
    margin-left: 10px;
  }
</style>

<style scoped>
.my-component {
  border-bottom: 1px solid rgba(209, 205, 205, 1); /* 添加底部边框，用于模拟分割线 */
  padding: 10px; /* 可以根据需要设置 padding */
}

/* 可以根据需要添加其他样式 */
</style>
