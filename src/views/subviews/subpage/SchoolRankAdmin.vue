<template>
  <el-container>
    <p class="_text-classtype">学校排名</p>
			<div class="flex-space-between" style="margin-bottom: 23px;">
				<span class="left">
					<span>学年</span>
					<el-select v-model="filterYear" placeholder="请选择">
						<el-option v-for="item in filterList.Year" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
					<span>学期</span>
					<el-select v-model="filterSemester" placeholder="请选择">
						<el-option v-for="item in filterList.Semester" :key="item" :label="'第'+item+'学期'" :value="item">
						</el-option>
					</el-select>
					<button class="_button1 _button-blue _text-button-white" @click="handleFilter">确认</button>
				</span>
				<span class="right">
					<el-input v-model="filterQuery" name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"></el-input>
					<button name="search" class="_button1 _button-blue" @click="handleQuery"><img :src=imgSearch></button>
				</span>
			</div>
			<el-table :data="displayItems">
				<el-table-column type="selection" fixed :width="40"></el-table-column>
				<el-table-column 
					v-for="(item, index) in MetaRankInfo" :prop="item[0]" 
					:key="index" 
					:label="item[1]"
					
					:max-width="80"
				>
				</el-table-column>
				<el-table-column label="各科详情" :width="90"><img :src=imgFile style="cursor: pointer;" @click="handleDetail"></el-table-column>
			</el-table>
			<div class="flex-space-between">
				<span ref="scrollButtons" class="buttons-warper">
					<button name="upload" class="_button1 _button-blue _text-button-white" @click="handleUpload"><img :src=imgUpload><span>上传</span></button>
					<button name="download" class="_button1 _button-grey _text-button-grey" @click="handleDownload"><img :src=imgDownload></button>
				</span>
				<el-pagination
					@current-change="handlePaginationChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="totalItem"
					layout="prev, pager, next">
				</el-pagination>
			</div>
  </el-container>
</template>

<script>
import axios from 'axios'
import {
	getRankList
} from "@/services/request.js"

export default {
  name: 'SchoolRankAdmin',
  data () {
    return {
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
      MetaRankInfo:[
        // ["id","id"],
        // ["schoolYear","学年"],
        // ["semester","学期"],
        ["department","教师部门"],
        ["staffNum","教师工号"],
        ["name","教师姓名"],
        ["evaluatorCount","参评人数"],
        ["totalScore","总得分"],
        ["schoolRank","学校排名"],
        ["schoolRankRatio","学校排名比"],
        ["uploadTime","上传时间"],
        // ["collegeRank","学院排名"],
      ],
      rankList:[],
      displayItems:[],
      currentPage:1,
      pageSize:10,
      totalItem:0,
      queryParams:{
			// "curPage": 0,
			// "pageSize": 0,
			// "startTime": "string",
			// "endTime": "string",
			"schoolYear": "2022-2023",
			"semester": "1",
			// "department": "string",
			// "input": "string"
		  },
			imgUpload: require('@/assets/icon/upload-icon1.png'),
			imgDownload: require('@/assets/icon/download-grey.png'),
      imgSearch: require('@/assets/icon/search.png'),
			imgFile: require('@/assets/icon/file.png'),
    }
  },
  methods:{
    handleDetail() {
      //详情

    },
    handleUpload() {
      //上传内容
    },
    handleDownload() {
      //下载内容
    },
    handleFilter() {
      console.log('查询 页数：' + this.currentPage + ' 年份：' + this.filterYear + ' 学期：' + this.filterSemester)
      this.getList(this.currentPage,this.filterYear,this.filterSemester)
    },
    handleQuery() {
      this.getList(this.queryParams)
    },
    handlePaginationChange(val) {
			this.currentPage = val
			this.queryParams.curPage = val
			this.getList(this.queryParams)
		},
    // async initRankList () {
    //   // eslint-disable-next-line
    //   const { data: res } = await axios.post('http://49.235.106.165:8088/teaching-evaluation-system/rank/list', {
    //     "schoolYear":this.filterYear,
    //     "semester":this.filterSemester
    //   },{
    //     headers: {
    //       "satoken": "24eed2d1-13ff-4561-b70e-8621ef8e126c"
    //     }
    //   })
    //   if (res.code === 200) {
    //     this.rankList = res.data
    //     this.totalItem = res.totalRows
    //     this.displayItems = this.rankList
    //   }
    // },
    // async getRankList (page,year,semester,query) {
		// 	let name, num;
		// 	if (query) {
		// 		if (isNaN(query)) { name = query; num = '' }
		// 		else { name = ''; num = query }
		// 	} else { name = ''; num = '' }

		// 	// eslint-disable-next-line
		// 	const { data: res } = await axios.post('http://49.235.106.165:8088/teaching-evaluation-system/rank/list', {
		// 	"curPage":page,
		// 	"schoolYear":year,
		// 	"semester":semester,
		// 	"name":name,
		// 	"staffNum":num
		// 	},{
    //     headers: {
    //       "satoken": "24eed2d1-13ff-4561-b70e-8621ef8e126c"
    //     }
    //   })
    //   if (res.code === 200) {
    //     this.rankList = res.data
    //     this.totalItem = res.totalRows
    //     this.displayItems = this.rankList
    //   }
		// 	console.log(res)
    // },
    async getList(queryParams){
			try {
				const {data} = await getRankList(queryParams)
				console.log('成果列表返回值：',data)
				// console.log(data)
				this.displayItems = data.data
				this.totalItem = data.totalRows
			} catch (err) {console.log(err)}
		},
    flexColumnWidth(str, arr1, flag = 'max') {
			// str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
			// flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
			// flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
			str = str + ''
			let columnContent = ''
			if (!arr1 || !arr1.length || arr1.length === 0 || arr1 === undefined) return
			if (!str || !str.length || str.length === 0 || str === undefined) return
			if (flag === 'equal') {
				// 获取该列中第一个不为空的数据(内容)
				for (let i = 0; i < arr1.length; i++) {
					if (arr1[i][str].length > 0) {
						// console.log('该列数据[0]:', arr1[0][str])
						columnContent = arr1[i][str]
						break
					}
				}
			} else {
				// 获取该列中最长的数据(内容)
				let index = 0
				for (let i = 0; i < arr1.length; i++) {
					if (arr1[i][str] === null) {
						return
					}
					// eslint-disable-next-line
					const now_temp = arr1[i][str] + ''
					// eslint-disable-next-line
					const max_temp = arr1[index][str] + ''
					// eslint-disable-next-line
					if (now_temp.length > max_temp.length) {
						index = i
					}
				}
				columnContent = arr1[index][str]
			}
			// console.log('该列数据[i]:', columnContent)
			// 以下分配的单位长度可根据实际需求进行调整
			let flexWidth = 0
			for (const char of columnContent) {
				if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
					// 如果是英文字符，为字符分配8个单位宽度
					flexWidth += 8
				} else if (char >= '\u4e00' && char <= '\u9fa5') {
					// 如果是中文字符，为字符分配15个单位宽度
					flexWidth += 15
				} else {
					// 其他种类字符，为字符分配8个单位宽度
					flexWidth += 8
				}
			}
			if (flexWidth < 80) {
				// 设置最小宽度
				flexWidth = 80
			}
			// if (flexWidth > 250) {
			//   // 设置最大宽度
			//   flexWidth = 250
			// }
			return flexWidth + 'px'
		},
  },
  mounted() {
    this.getList(this.queryParams)
  }

}
</script>

<style lang="less" scoped>
/*全局 按钮、输入框等 -------------------------------------------*/
._button1{
	position: relative;
	display:flex; 
	justify-content: center; 
	align-items: center;
	height: 40px;
	border: none;
	border-radius: 6px;
	cursor:pointer;
}
/deep/span.el-input__inner{border-radius: 6px}
/deep/input.el-input__inner{border-radius: 6px}
/*类样式-------------------------------------------*/
.flex-space-between{
	display: flex;
	justify-content: space-between;
}
/*html嵌套样式-------------------------------------------*/
.el-container {
  display: block;
  box-sizing: content-box;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  padding: 20px 40px;
  min-width: 1000px;
  color: #333;
  background-color: rgba(219, 231, 238, 1);
  >p{margin-top: 36px;margin-bottom: 27px;}
  div.flex-space-between:nth-of-type(1){
    span.left{
      display: flex;
      span{display: flex;align-items: center;white-space: nowrap;}
      span:nth-of-type(1){margin:0 13px 0 3px;}
      span:nth-of-type(2){margin:0 13px 0 35px;}
      /deep/input::placeholder{
        text-align: start;
        font-size: 13px;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      >button{margin-left:51px;width: 120px;}
      .el-date-editor{width: 200px;}
      .el-select{width: 200px;}
    }
    span.right{
      display: flex;
      /deep/.el-input{width: 280px;}
      button{width: 40px;margin-left: 10px;}
    }
  }
  .el-table {
    position: relative;
    width: 100%;
    background: none;
    &::before{content: unset;}
    /deep/.el-table__header {
      height: 60px;
      div.cell {display: flex;justify-content: center;height: 20px;}
    }
    /deep/.el-table__body-wrapper {
      overflow: auto;
      padding-bottom: 34px;
      .el-table__body {
        .el-table__row{height: 60px;}
        div.cell {display: flex;justify-content: center;height: 20px;}
      }
    }
    /deep/.el-table__fixed{
				&::before{content: unset;}
				box-shadow: none;
				.el-table__fixed-header-wrapper{
					.cell{display: none;}
				}
				.el-table__fixed-body-wrapper{	
					.el-table__row{height: 60px;color: rebeccapurple!important;}
					.el-checkbox__input{line-height: 0;}
					.cell{
						display: flex;
						justify-content: center;
						line-height: 0;
						padding: 0;
						.el-checkbox__inner{height:20px;width:20px;border-radius: 6px;}
						.el-checkbox__inner::after{height: 10.5px;width: 4.5px;left: 6px;top:1.5px;border: 2px solid #FFF;border-left: none;border-top: none;}
					}
				}
			}
  }
  div.flex-space-between:nth-last-of-type(1){
    span.buttons-warper{
      display: flex;
      position: relative;
      button{span{margin: 0 22px;}}
      button:nth-of-type(1){width: 140px;margin-right: 20px;}
      button:nth-of-type(2){width: 40px;margin-right: 40px;}
    }
    .el-pagination{
      display: flex;
      position: relative;
      align-items: center;
      padding-left: 40px;
      border-radius: 6px;
      /deep/.btn-prev{
        border-radius: 6px 0 0 6px;
      }
      /deep/.btn-next{
        border-radius: 0 6px 6px 0;
      }
    }
  }
}

/*字体-------------------------------------------*/
._text-classtype {color: rgb(0, 0, 0);font-size: 30px;font-weight: 700;line-height: 43.44px;}
._text-button-white{color: white;font-size: 16px;font-weight: 700;}
._text-button-grey{color: rgba(130, 145, 169, 1);font-size: 16px;font-weight: 700;}
._button-blue{background: rgb(0, 129, 255);}
._button-grey{background: rgb(237, 243, 247);}
._button-black{background: rgb(31, 41, 53);}
</style>
