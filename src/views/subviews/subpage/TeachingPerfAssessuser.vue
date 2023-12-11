<template>
    <el-container>
        <span id="title-font">教学业绩考核</span>
        <el-button id="upload-button" type="primary" @click="downloadfile"><img id="download" :src=download><span id="download-font">下载</span></el-button>
        <div id="year-font">学年</div>
        <el-container id="first-select">
            <el-select v-model="filterYear" placeholder="请选择" @change="yearChange">
						<el-option v-for="item in filterList.Year" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
          </el-container>
        <el-main class="content-container">
            <PerformanceTable v-for="(data, index) in displayItems" :key="index" :data="data"></PerformanceTable>
        </el-main>
        
   </el-container>
  </template>
  
  <script>
import PerformanceTable from './PerformanceTable.vue';
import {
	getAsseList
} from "@/services/request.js"

  export default {
    name: 'SchoolRank',
    data() {
        return {
            download: require('@/assets/icon/download-white.png'),
            upload: require('@/assets/icon/upload-icon1.png'),
            download1: require('@/assets/icon/download-grey.png'),
            displayItems: [],
            filterYear:"2022-2023",
            filterList:{
                          Year:[
                            "2017-2018",
                            "2018-2019",
                            "2019-2020",
                            "2020-2021",
                            "2021-2022",
                            "2022-2023",
                          ]
                        },
            dataList:[{
              Academy:'电子信息学院（微电子学院）',
              name:'xxx',
              number:'40768',
              lessthen64:'515.62',
              accident:'0',
              score:'316.123417721519',
              rank:'A',
              note:'S1封顶100,S3封顶',
              title:'S1封顶100,S3封顶'
            }],
            value: true,
            currentPage: 1,
            
                queryParams:{
                  "curPage": 0,
                  "pageSize": 0,
                  "startTime": null,
                  "endTime": null,
                  "schoolYear": "2022-2023",
                  "department": null,
                  "input": null,
                  "currentStaffNum": null
                  },
            selected:'',
            value0:''
        };
    },
    methods: {
        downloadfile() {
            //下载内容
        },
        yearChange(){
                      this.queryParams.curPage = this.currentPage
                      this.queryParams.schoolYear = this.filterYear
                      console.log('查询 页数：' + this.currentPage + ' 年份：' + this.filterYear)
                      this.getList(this.queryParams)
                    },
        async getList(queryParams){
			try {
				const {data} = await getAsseList(queryParams)
				console.log('成果列表返回值：',data)
				// console.log(data)
				this.displayItems = data.data
				this.totalItem = data.totalRows
			} catch (err) {console.log(err)}
		},
    },
    mounted(){
      this.queryParams.currentStaffNum = window.sessionStorage.getItem('staffNum')
      this.getList(this.queryParams)
    },
    components: { PerformanceTable }
}
  </script>
  
  <style lang="less" scoped>
  #upload-button{
  position: absolute;
  bottom: 29px;
  right: 50px;
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
    bottom: 45px;
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
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background-color: white;
}		
::-webkit-scrollbar-thumb {
    background-color: rgba(174, 175, 176, 1);
    border-radius: 6px;
}  
#selected{
    position: absolute;
    right: 36px;
    top: 49px;
}
#session-font{
    position: absolute;
    font-size: 13px;
    top: 58px;
    right: 200px;
    letter-spacing: 0px;
    line-height: 20px;
    color: rgba(0, 0, 0, 1);
    text-align: right;
    vertical-align: top;
}
#year-font{
  position: absolute;
    right: 210px;
    top: 65px;
}
#year-selected{
    position: absolute;
    right: 250px;
    top: 49px;
}
.el-select{
    width: 150px;
    border-radius: 6px;
}
  </style>
<style>
.el-input--medium .el-input__inner {
    height: 40px;
    line-height: 40px;
}
#first-select{
  position: absolute;
    right: 35px;
    top: 58px;
    width: 160px;
    height: 40;
}
</style>
