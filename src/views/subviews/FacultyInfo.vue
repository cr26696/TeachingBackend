<template><div id="ContainerFacultyInfo">
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
  <el-row :gutter="16">
    <el-col v-for="(item, index) in displayItems" :key="index" :span="4">
      <el-card>
        <div class="cardBody">
          <button><div></div><div></div><div></div></button>
          <el-image
            style="width: 100px; height: 100px"
            :src="imgurl"
            :preview-src-list="srcList">
          </el-image>
          <p>{{ item.name }}</p>
          <p>{{item.position}}</p>
        </div>
        <div class="cardFooter">
          <div><i class="el-icon-location"></i><span>{{item.number}}</span></div>
          <div><i class="el-icon-message"></i><span>{{item.mail}}</span></div>
          <div><i class="el-icon-phone"></i><span>{{item.phone}}</span></div>
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
</div></template>

<script>
export default {
  name: 'FacultyInfo',
  data: function () {
    return {
      enbackground: true,
      infoFields: ['优秀指导教师', '2级教师', '3级教师', '4级教师'],
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
      imgurl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      displayItems: [],
      currentPage: 1,
      pageSize: 12,
      total: 0
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
      this.currentPage = val
      this.getDisplayItems()
    },
    getDisplayItems() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      this.displayItems = this.items.slice(start, end)
    }
  },
  mounted () {
    this.total = this.items.length
    this.getDisplayItems()
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
    position: relative;
    height: 40px;
    margin-left: calc((100% - 1610px) / 2)!important;
    margin-right: calc((100% - 1610px) / 2)!important;
    margin-top: 32px;
    justify-content: flex-end;
    align-items: center;
    & > span{
      position: absolute;
      left: 0px;
      font-size: 18px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(0, 0, 0, 1);
    }
    .el-dropdown{
      box-sizing:content-box;
      position: absolute;
      transform: translateX(-50%);
      left: 120px;
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
