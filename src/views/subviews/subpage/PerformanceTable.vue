<template>
    <div class="my-component">
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="8"><span class="title-font">教师部门</span></el-col>
            <el-col :span="8"><span class="title-font">教师名称</span></el-col>
            <el-col :span="8"><span class="title-font">教师工号</span></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.department }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.name }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.staffNum }}</span></div></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="8"><span class="title-font">承担主讲课程学时数是否不低于64学时</span></el-col>
            <el-col :span="8"><span class="title-font">是否出现教学事故</span></el-col>
            <el-col :span="8"><span class="title-font">考核分数</span></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.lectureHoursNotLessThan64 }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.teachingAccidentOccurrence }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.assessmentScore }}</span></div></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px">
            <el-col :span="8"><span class="title-font">考核等级</span></el-col>
            <el-col :span="8"><span class="title-font">备注</span></el-col>
            <el-col :span="8"><span class="title-font">职称</span></el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px;">
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.assessmentLevel }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.remark }}</span></div></el-col>
            <el-col :span="8"><div class="content-style"><span class="content-font">{{ data.jobTitle }}</span></div></el-col>
        </el-row>
    </div>
</template>

<script>
export default{
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
    height: 60px;
    border-radius: 6px;
    background: rgba(174, 175, 176, 0.25);
    border: 1px solid rgba(130, 145, 169, 0.25);
}
.content-font{ 
    position: relative;
    color: rgba(0, 0, 0, 1);
    top: 16px;
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

}

/* 可以根据需要添加其他样式 */
</style>
