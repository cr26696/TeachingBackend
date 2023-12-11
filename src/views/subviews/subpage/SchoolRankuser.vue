<template>
  <el-container>
      <span id="title-font">学校排名</span>
      
        <span id="schoolyearfont">学年</span>
        <span id="semesterfont">学期</span>
        <el-container id="first-select">
          <el-select v-model="filterYear" placeholder="请选择" @change="yearChange">
          <el-option v-for="item in filterList.Year" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        </el-container>
        <el-container id="second-select">
          <el-select v-model="filterSemester" placeholder="请选择" @change="semesterChange">
          <el-option v-for="item in filterList.Semester" :key="item" :label="'第'+item+'学期'" :value="item">
          </el-option>
        </el-select>
        </el-container>

      <el-row>
        <el-button id="upload-button" type="primary" @click="downloadfile"><img id="download1" :src=download><span id="download-font">下载</span></el-button>
      </el-row>
      <el-main class="content-container">
        <div id="date">{{ date }}</div>
        <img :src=logo id="logo">
        <div id="rank-form"><span id="form-title">排名表格</span></div>
        <div class="facultyinfo">
        <div id="info-font1">{{ staffLitter.name }}</div>
        <div id="info-font2">{{ staffLitter.staffNum }}</div>
        <div id="info-font2">{{ staffLitter.department }}</div>
      </div>
        <el-table
        :data="displayItems"
        header-align="center"
        id="classTable"
        :header-cell-style="{padding:'18px 0px','text-align':'center',fontSize:'16px',fontWeight:'800',color:'rgba(0,0,0,1)'}"
        :cell-style="{'text-algin':'center',color:'rgba(36,42,56,1)',fontSize:'14px',fontWeight:'500'}"
        :row-style="{height:'60px'}" 
        >
        <el-table-column
          prop="courseName"
          label="课程名称"
          min-width="40%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachingClass"
          label="教学班名称"
          min-width="40%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="evaluatorCount"
          label="参评人数"
          min-width="24%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachingAttitude"
          label="教学态度"
          min-width="24%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachingAbility"
          label="教学能力"
          min-width="24%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teacherStudentCommunication"
          label="师生交流"
          min-width="24%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teachingEffectiveness"
          label="教学成果"
          min-width="24%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="score"
          label="评分"
          min-width="24%"
          align="center">
        </el-table-column>
        </el-table>
        <div id="rank">全校排名 <span v-if="rankNum">{{ rankNum.schoolRank }}</span></div>
        <div id="ratio">全校排名比 <span v-if="rankNum">{{ rankNum.schoolRatio }}</span></div>
      </el-main>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalItem"
        :background="enbackground"
        :pager-count="5"
        :hide-on-single-page="value"
        style="position: absolute; bottom: 30px; right: 25px;"
        layout="->,prev,pager,next">
      </el-pagination>
 </el-container>
</template>

<script>
import {
  getCourseDetailList
} from "@/services/request.js"

export default {
name: 'AcademyRankuser',
data () {
  return {
    download: require('@/assets/icon/download-white.png'),
    upload: require('@/assets/icon/upload-icon1.png'),
    download1: require('@/assets/icon/download-grey.png'),
    logo: require('@/assets/icon/logo-assistance.png'),
    date: '2023年2月-2023年11月6日',
    // facultyName: '张显飞',
    // facultyNumb: '40285',
    // facultyOrg: '电子信息学院(微电子学院)',
    // rank: '1',
    enbackground: true,
    displayItems: [],
    currentPage: 1,
    pageSize: 8,
    value:true,
    totalItem:0,
    filterYear:"2022-2023",
    filterSemester:"1",
    filterQuery:'',
    filterList:{
      Year:[
        "2017-2018",
        "2018-2019",
        "2019-2020",
        "2020-2021",
        "2021-2022",
        "2022-2023",
      ],
      Semester:[
        "1",
        "2",
      ]
    },
    rankNum:{
              id: 0,
              collegeRank: 0,
              schoolRank: 0,
              schoolRankRatio: 0,
              schoolYear: "",
              semester: ""
            },
    staffLitter:{
                  id: 0,
                  name: "",
                  staffNum: "",
                  department: ""
                },
    queryParams:{
                  "curPage": 1,
                  "pageSize": 10,
                  "staffNum": null,
                  "schoolYear": '2022-2023',
                  "semester": '1'
                }
  }
},
methods:{
  // goback(){
  //   //返回上一页
  // },
  // uploadfile(){
  //   //上传内容
  // },
  downloadfile() {
    //下载内容
    console.log('download complete')
  },
  semesterChange(){
    this.queryParams.curPage = this.currentPage
    this.queryParams.semester = this.filterSemester
    console.log('查询 页数：' + this.currentPage + ' 年份：' + this.filterYear + ' 学期：' + this.filterSemester)
    this.getList(this.queryParams)
    
  },
  yearChange(){
    this.queryParams.curPage = this.currentPage
    this.queryParams.schoolYear = this.filterYear
    console.log('查询 页数：' + this.currentPage + ' 年份：' + this.filterYear + ' 学期：' + this.filterSemester)
    this.getList(this.queryParams)
  },
  handleCurrentChange (val) {
    this.currentPage = val
    this.queryParams.curPage = val
    this.getList(this.queryParams)
    // this.getDisplayItems()
  },
  // getDisplayItems() {
  //   const start = (this.currentPage - 1) * this.pageSize
  //   const end = start + this.pageSize
  //   this.displayItems = this.items.slice(start, end)
  // }
  async getList(queryParams){
    try {
      const {data} = await getCourseDetailList(queryParams)
      console.log('成果列表返回值：',data)
      // console.log(data)
      this.displayItems = data.data.list
      this.staffLitter = data.data.staffLitter
      console.log(this.staffLitter)
      this.rankNum = data.data.rankNum
      this.totalItem = data.totalRows
    } catch (err) {console.log(err)}
  },
},
created(){
  this.queryParams.staffNum = window.sessionStorage.getItem('staffNum')
  this.getList(this.queryParams)
},
// mounted(){
//   this.queryParams.staffNum = window.sessionStorage.getItem('staffNum')
//   this.getList(this.queryParams)
// }

}
</script>

<style lang="less" scoped>
#download-button{
  position: absolute;
  top: 115px;
  left: 38px;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: rgba(0, 129, 255, 1);
}
#download-button1{
  position: absolute;
  bottom: 29px;
  left: 199px;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
}
#upload-button{
  position: absolute;
  bottom: 29px;
  left: 38px;
  width: 140px;
  height: 40px;
  border-radius: 6px;
  background: rgba(0, 129, 255, 1);
}
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
  left: 22px;
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
top: 110px;
bottom: 92px;
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
#logo{
  position: absolute;
  top: 58px;
  right: 55px;
}
#rank{
  position: absolute;
  left: 34px;
  bottom: 45px;
  width: 140px;
  height: 45px;
  border-radius: 6px;
  border: 2px solid rgba(255, 61, 87, 0.2);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20px;
  color: rgba(255, 61, 87, 1);
  text-align: center;
  vertical-align: top;
  padding: 12px;
}
#ratio{
  position: absolute;
  left: 234px;
  bottom: 45px;
  width: 140px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 20px;
  color: rgba(255, 61, 87, 1);
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
#schoolyearfont{
position: absolute;
  right: 425px;
  top: 65px;
}
#semesterfont{
position: absolute;
  right: 210px;
  top: 65px;
}
#first-select{
position: absolute;
  right: 255px;
  top: 58px;
  width: 160px;
  height: 40;
}
#second-select{
position: absolute;
  right: 35px;
  top: 58px;
  width: 160px;
  height: 40;
}
</style>
