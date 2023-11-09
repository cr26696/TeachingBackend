<template><div id="container">
  <p id="title">教职工信息</p>
  <div id="div_search_params">
    <span id="field_Prompt">范围</span>
    <el-dropdown trigger="click" >
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in infoFields" :key="index" @click.native="handleDropdownClick(item)">
        <!-- 这里.native接管了dropdown，elementui封装希望你使用command字段进行事件操作 -->
        {{ item }}
      </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <input type="text" placeholder="请输入教职工姓名">
    <button><div></div><div></div></button>
  </div>
  <el-row>
    <el-col v-for="(item, index) in displayItems" :key="index" :span="4">
      <el-card>
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div>
          <p>{{ item.name }}</p>
        </div>
        <div slot="footer" class="clearfix">
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total">
  </el-pagination>
</div></template>

<script>
export default {
  name: 'FacultyInfo',
  data: function () {
    return {
      infoFields: ['优秀指导教师', '2级教师', '3级教师', '4级教师'],
      items: [{
        name: '张三',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '王五',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phoone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      }],
      displayItems: [],
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    handleDropdownClick (item) {
      console.log(item)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getDisplayItems()
    },
    getDisplayItems() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.displayItems = this.items.slice(start, end)
    }
  },
  created () {
    this.total = this.items.length
  },
  mounted () {
    this.getDisplayItems()
  }
}
</script>

<style scoped lang="less">
#container{
  height: 100%;
  background-color: rgba(235, 236, 237, 1);
  #title{
    position: relative;
    margin-left: 30px;
    margin-top: 35px;
    font-size: 30px;
    font-weight: 700;
    line-height: 43.44px;
    color: rgba(0, 0, 0, 1);
  }
  #div_search_params{
    display: flex;
    position: relative;
    height: 40px;
    margin-top: 32px;
    justify-content: flex-end;
    align-items: center;
    #field_Prompt{
      position: absolute;
      left: 32px;
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(0, 0, 0, 1);
    }
    .el-dropdown{
      box-sizing:content-box;
      position: absolute;
      transform: translateX(-50%);
      left: 152px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 1);
      &:hover{
        border: 1px solid rgb(194, 194, 194);
      }
      .el-dropdown-selfdefine{
        display: flex;
        align-items: center;
        width: 130px;
        height: 40px;
        padding-left: 8px;
        i:first-child{
          position: relative;
          left: 30px;
      }
    }
    }
    input{
      position: relative;
      width: 280px;
      height: 40px;
      margin-right: 10px;
      border: none;
      background: rgba(255, 255, 255, 1);
      &:hover{
        border: 1px solid rgb(228, 228, 228);
      }
    }
    button{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 40px;
      height: 40px;
      margin-right: 36px;
      border-radius: 6px;
      border: none;
      background: rgba(0, 129, 255, 1);
      &:hover{
        border: 1px solid rgb(0, 79, 158);
      }
      div:nth-child(1){
        position: absolute;
        width: 14px;
        height: 0px;
        border: 1px solid rgba(255, 255, 255, 1);
      }div:nth-child(2){
        position: absolute;
        width: 14px;
        height: 0px;
        transform: rotate(90deg);
        border: 1px solid rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
