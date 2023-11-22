<template>
    <el-container>
        <span id="title-font">学校排名</span>
        <el-row>
          <el-button id="download-button" type="primary" @click="downloadfile"><img id="download" :src=download><span id="download-font">下载</span></el-button>
        </el-row>
        <div>
          <el-input
            placeholder="请输入教职工姓名"
            v-model="search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button id="plus"><img :src=plusicon></el-button>
        </div>
        <!-- <el-row>
          <el-button id="upload-button" type="primary" @click="uploadfile"><img id="upload" :src=upload><span id="download-font">上传</span></el-button>
          <el-button id="download-button1" type="info" plain @click="downloadfile"><img id="download1" :src=download1></el-button>
        </el-row> -->
        <el-main class="content-container">
          <div id="date">{{ date }}</div>
          <img :src=logo id="logo">
          <div id="rank-form"><span id="form-title">排名表格</span></div>
          <div class="facultyinfo">
          <div id="info-font1">{{ facultyName }}</div>
          <div id="info-font2">{{ facultyNumb }}</div>
          <div id="info-font2">{{ facultyOrg }}</div>
        </div>
          <!-- <el-button id="back-button" @click="goback"><span id="back-font">返回</span></el-button> -->
          <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          header-align="center"
          id="classTable"
          :header-cell-style="{padding:'18px 0px','text-align':'center',fontSize:'16px',fontWeight:'800',color:'rgba(0,0,0,1)'}"
          :cell-style="{'text-algin':'center',color:'rgba(36,42,56,1)',fontSize:'14px',fontWeight:'500'}"
          :row-style="{height:'60px'}" 
          >
          <el-table-column
            prop="course"
            label="课程名称"
            min-width="40%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="class"
            label="教学班名称"
            min-width="40%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="number"
            label="参评人数"
            min-width="24%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="attitude"
            label="教学态度"
            min-width="24%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="ability"
            label="教学能力"
            min-width="24%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="interact"
            label="师生交流"
            min-width="24%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="outcome"
            label="教学成果"
            min-width="24%"
            align="center">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="评分"
            min-width="24%"
            align="center">
          </el-table-column>
          </el-table>
          <div id="rank">全校排名 {{ rank }}</div>
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length"
          :background="enbackground"
          :pager-count="5"
          :hide-on-single-page="value"
          style="position: absolute; bottom: 30px; right: 25px;"
          layout="->,prev,pager,next">
        </el-pagination>
        </el-main>
   </el-container>
</template>

<script>

export default {
  name: 'SchoolRankuser',
  data () {
    return {
      download: require('@/assets/icon/download-square.png'),
      upload: require('@/assets/icon/upload-icon1.png'),
      download1: require('@/assets/icon/download-icon-grey.png'),
      logo: require('@/assets/icon/logo-assistance.png'),
      plusicon: require('@/assets/icon/plus.png'),
      facultyName: '张显飞',
      facultyNumb: '40285',
      facultyOrg: '电子信息学院(微电子学院)',
      rank: '17',
      tableData:[
        {
          course:'智能系统设计及应用',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'现代数字电子技术基础',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'智能车设计综合实验',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'数字系统设计实践',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'现代数字电子技术基础实验',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'智能系统设计及应用',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'智能系统设计及应用',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'现代数字电子技术基础',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'智能车设计综合实验',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'数字系统设计实践',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'现代数字电子技术基础实验',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
        {
          course:'智能系统设计及应用',
          class:'(2022-2023-1)-YJ040110-1',
          number:'11',
          attitude:'95.000',
          ability:'91.816',
          interact:'92.273',
          outcome:'95.000',
          rate:'93.499'
        },
      ],
      enbackground: true,
      displayItems: [],
      currentPage: 1,
      pageSize: 8,
      value:true,
      date: '2023年2月-2023年11月6日',
      search: ''
    }
  },
  methods:{
    // goback(){
    //   //返回上一页
    // },
    // uploadfile(){
    //   //上传内容
    // },
    plus(){
      console.log('search complete')
    },
    downloadfile(){
      //下载内容
      console.log('开始下载')
    },
    handleCurrentChange (val) {
      this.currentPage = val
      // this.getDisplayItems()
    }
    // getDisplayItems() {
    //   const start = (this.currentPage - 1) * this.pageSize
    //   const end = start + this.pageSize
    //   this.displayItems = this.items.slice(start, end)
    // }
  }

}
</script>

<style lang="less" scoped>
#download-button{
    position: absolute;
    top: 115px;
    left: 38px;
    width: 140px;
    height: 40px;
    border-radius: 6px;
    background: rgba(0, 129, 255, 1);
}
// #download-button1{
//     position: absolute;
//     bottom: 29px;
//     left: 199px;
//     width: 40px;
//     height: 40px;
//     border-radius: 6px;
//     background: rgba(255, 255, 255, 1);
// }
// #upload-button{
//     position: absolute;
//     bottom: 29px;
//     left: 38px;
//     width: 140px;
//     height: 40px;
//     border-radius: 6px;
//     background: rgba(0, 129, 255, 1);
// }
#download-font{
    position: absolute;
    left: 66px;
    top: 10px;
    width: 32px;
    height: 20px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: top;
}
#download{
    position: absolute;
    left: 22px;
    top: 13px;
    width: 14px;
    height: 14px;
    opacity: 1
}
#download1{
    position: absolute;
    left: 13px;
    top: 13px;
    width: 14px;
    height: 14px;
    opacity: 1
}
#upload{
    position: absolute;
    left: 22px;
    top: 13px;
    width: 14px;
    height: 14px;
    opacity: 1
}
#title-font{
    position: absolute;
    top: 38px;
    left: 45px;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 43.44px;
    color: rgba(0, 0, 0, 1);
}
.content-container{
  position: absolute;
  left: 38px;
  top: 173px;
  bottom: 29px;
  right: 36px;
  opacity: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  
}
#back-button{
  position: absolute;
  right: 58px;
  top: 58px;
  background: rgba(31,41,53,1);
  opacity: 1;
  border-radius: 6px;
  width: 100px;
  height: 40px;
}
#back-font{    
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
  }
  #rank-form{
    position: absolute;
    top: 0px;
    left: 34px;
    width: 173px;
    height: 171px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px ;
    background: linear-gradient(134.72deg, rgba(255, 61, 87, 1) 0%, rgba(255, 138, 72, 1) 100%);
  }
  #form-title{
    position: absolute;
    left: 55px;
    top: 41px;
    width: 64px;
    height: 90px;
    font-size: 32px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 46.34px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    vertical-align: top;
  }
  .facultyinfo{
    position: absolute;
    left: 236px;
    top: 36px;
    width: 182px;
    height: 84px;
    /* background-color: black; */
  }
  #info-font1{
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 30px;
    color: rgba(0, 0, 0, 1);
  }
  #info-font2{
    /** 文本3 */
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 22px;
    color: rgba(130, 145, 169, 1);
  }
  #rank{
    position: absolute;
    left: 34px;
    bottom: 30px;
    width: 140px;
    height: 45px;
    border-radius: 6px;
    border: 2px solid rgba(255, 61, 87, 0.15);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(255, 0, 0, 1);
    text-align: center;
    vertical-align: top;
    padding: 12px;
  }
  #classTable{
    position: absolute;
    left: 31px;
    top: 209px;
    width: 97%;
  }
  #logo{
    position: absolute;
    top: 58px;
    right: 55px;
  }
#date{
  position: absolute;
  top: 20px;
  right: 55px;
  color: rgba(130, 145, 169, 1);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 30px;
}
.el-input{
  position: absolute;
  right: 95px;
  top: 115px;
  width: 280px;
  height: 40px;
  opacity: 1;
  // background: rgba(255, 255, 255, 1);
  // .input{
  //   text-indent: 0px!important;
  // }
}
#plus{
  position: absolute;
  top: 115px;
  right: 36px;
  height: 40px;
  width: 40px;
  padding: 12px;
  background: rgba(0, 129, 255, 1);
  border-radius: 6px;
}
</style>
<style>
.el-input--prefix .el-input__inner {
  padding: 15px;
}
</style>
