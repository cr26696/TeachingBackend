<template>
<div id="ContainerFacultyInfo">
  <p id="title">教职工信息</p>
  <div id="div_search_params">
    <div class="flex-left">
      <span id="field_Prompt">范围</span>
      <el-select v-model="filterJob" placeholder="请选择">
        <el-option v-for="item in infoFields" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="flex-right">
      <input v-model="filterName" type="text" placeholder="请输入教职工姓名">
      <button @click="handleSearch"><div></div><div></div></button>
    </div>
  </div>
  <el-row :gutter="16">
    <el-col v-for="(item, index) in facultyList" :key="index" :span="4">
      <el-card>
        <div class="cardBody">
          <button><div></div><div></div><div></div></button>
          <el-image
            style="width: 100px; height: 100px"
            @click="openDialogInfo(index)"
            :src="imgurl"
            >
          </el-image>
          <p>{{ item.name }}</p>
          <p>{{item.jobTitle}}</p>
        </div>
        <div class="cardFooter">
          <div><i class="el-icon-location"></i><span>{{item.staffNum}}</span></div>
          <div><i class="el-icon-message"></i><span>{{item.email}}</span></div>
          <div><i class="el-icon-phone"></i><span>{{item.telephone}}</span></div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-pagination
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
    :background="enbackground"
    layout="prev,pager,next">
  </el-pagination>
  <el-dialog title="设置" :visible.sync="ShowDialogInfo" width="30%">
		
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FacultyInfo',
  data: function () {
    return {
      enbackground: true,
      infoFields: ['初级', '中级', '副高', '高级'],
      listMetaFields:["id","staffNum","name","department","jobTitle","email","telephone","category","avatarPath"],
      listMetaLabels:["id","工号","姓名","部门","职称","邮箱","电话","人员类别","头像路径"],
      items: [{
        name: '张三',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '王五',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      },{
        name: '赵四',
        position: '院长',
        number: '1234',
        phone: '13811112222',
        mail: 'zhangsan@hdu.edu'
      }],
      filterJob:null,
      filterName:null,
      filterNumber:null,
      filteredItem:null,
      facultyList:null,
      imgurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      displayItems: [],
      currentPage: 1,
      pageSize: 12,
      total: 0,
      ShowDialogInfo: false,
    }
  },
  methods: {
    handleDropdownClick (item) {
      console.log(item)
    },
    computeSpan (index) {
      return (index + 1) % 6 === 0 ? 4 : 5
    },
    handleCurrentChange (val) {
      this.getFacultyList(val)
      this.currentPage = val
    },
    handleSearch() {
      this.getFacultyList(this.currentPage,this.filterJob,this.filterName)
    },
    getDisplayItems() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.displayItems = this.items.slice(start, end)
    },
    async initFacultyList () {
      const { data: res } = await axios.post('http://49.235.106.165:8088/teaching-evaluation-system/staff/list', {'curPage': this.currentPage,'pageSize':'12'})
      if (res.code === 200) {
        this.facultyList = res.data
        this.total = res.totalRows
      }
      console.log(this.facultyList)
    },
    async getFacultyList (page,job,name) {
      const { data: res } = await axios.post('http://49.235.106.165:8088/teaching-evaluation-system/staff/list', {'curPage': page,'pageSize':'12','jobTitle':job,'name':name})
      if (res.code === 200) {
        this.facultyList = res.data
      }
      console.log(this.facultyList)
    },
    openDialogInfo(index) {
      //this.ShowDialogInfo = true
      this.filteredItem = this.facultyList[index]
      console.log(this.filteredItem)
    }
  },
  mounted () {
    this.total = this.items.length
    this.getDisplayItems()
    this.initFacultyList()
  }
}
</script>

<style scoped lang="less">
#ContainerFacultyInfo{
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 1680px;
  background:none;
  #title{
    position: relative;
    margin-left: calc((100% - 1610px) / 2)!important;
    margin-right: calc((100% - 1610px) / 2)!important;
    margin-top: 35px;
    left: 0px;
    font-size: 30px;
    font-weight: 700;
    line-height: 43.44px;
    color: rgba(0, 0, 0, 1);
  }
  #div_search_params{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 40px;
    margin-left: calc((100% - 1610px) / 2)!important;
    margin-right: calc((100% - 1610px) / 2)!important;
    margin-top: 32px;
    >.flex-left{
      > span{
        margin-right: 19px;
        font-size: 18px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(0, 0, 0, 1);
      }
      .el-select{
        width: 130px;
        box-sizing:content-box;
        border-radius: 6px;
        background: rgba(255, 255, 255, 1);
        .el-input__suffix-inner>i:before {
          color: rgb(0, 129, 255, 1);
        }
      }
    }
    >.flex-right{
      display: flex;
      input{
        position: relative;
        width: 280px;
        height: 40px;
        margin-right: 10px;
        border: none;
        background: rgba(255, 255, 255, 1);
        &:hover{
          outline: 2px solid rgb(189, 189, 189);
        }
      }
      button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        border: none;
        background: rgba(0, 129, 255, 1);
        &:hover{
          outline: 1px solid rgb(18, 121, 225, 0.5);
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
  .el-row {
    margin-left: calc((100% - 1610px) / 2)!important;
    margin-right: calc((100% - 1610px) / 2)!important;
    margin-top: 23px!important;
    .el-col:nth-child(-n + 6){
      margin-bottom: 22px;
    }
    .el-col:nth-child(1) .el-col:nth-child(7){
      padding-left: 0!important;
    }
    .el-card {
      padding: 0!important;
      width: 255px;
      height: 350px;
      border-radius: 8px;
      background-color: white;
      /deep/ .el-card__body{
        padding: 0px!important;
      }
      &:hover{
        outline: 2px solid rgb(90, 90, 176);
      }
      //elementui自带类el-card__body样式在外层被定义,从内层修改加deep使用。
      .cardBody {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        height: 220px;
        button{
          position: absolute;
          right: 2px;
          top: 10px;
          padding: 4px 14px;
          background:none;
          border: none;
          cursor:pointer;
          div{
            box-sizing: border-box;
            position: relative;
            width: 2px;
            height: 2px;
            border-radius: 1px;
            background-color: rgba(130, 145, 169, 1);
            border: 2px solid rgba(130, 145, 169, 1);
          }
          >div:nth-child(2){
            margin-top: 5px;
            margin-bottom: 5px;
          }
        }
        /deep/ img{
          border-radius: 6px;
          background: rgba(130, 145, 169, 1);
        }
        p:nth-of-type(1){
          position: relative;
          width: 64px;
          height: 21px;
          margin-top: 14px;
          font-size: 16px;
          font-weight: 500;
          line-height: 21px;
          text-align:center;
        }
        p:nth-of-type(2){
          position: relative;
          width: 56px;
          height: 21px;
          margin-top: 3px;
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
          text-align:center;
          color: rgba(130, 145, 169, 1);
        }
      }
      .cardFooter{
        display: flex;
        height: 130px;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: rgba(237, 244, 251, 1);
        i{
          position: relative;
          height: 20px;
          margin-left: 27px;
        }
        span{
          position: relative;
          height: 20px;
          margin-left: 8px;
        }
      }
    }
  }
  .el-pagination{
    display: flex;
    justify-content: end;
    margin-top: 24px!important;
    margin-right: calc((100% - 1610px) / 2)!important;
    margin-bottom: 30px;
  }
}

</style>
