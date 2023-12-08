<template>
	<el-container>
		<el-aside id="achievement-side">
			<el-menu v-if="isAdmin" default-active="1">
				<el-menu-item index="1"><i class="el-icon-files"></i><span>成果录入申请</span></el-menu-item>
				<button @click="isAdmin=false">去教师界面</button>
			</el-menu>
			<el-menu v-if="!isAdmin" ref="menu" default-active="2" @select="handleMenuSelect">
				<el-menu-item index="1" @click="addRecord"><i class="el-icon-position"></i><span>成果填写</span></el-menu-item>
				<el-menu-item index="2"><i class="el-icon-edit-outline"></i><span>全部成果</span></el-menu-item>
				<button @click="isAdmin=true">去管理界面</button>
			</el-menu>
		</el-aside>
		<el-main>
			<p v-if="isAdmin" class="contentTitle _title">成果申请表</p>
			<p v-else-if="!isAdmin&&(menuIndex === '2')" class="contentTitle _title">成果填写</p>
			<p v-else-if="!isAdmin&&(menuIndex === '1')" class="contentTitle _title">全部成果</p>
			<div class="flex-space-between" style="margin-bottom: 23px;">
			<span class="left">
				<span class="_filterSelect">审核状态</span>
				<el-select v-model="filterState" placeholder="请选择">
					<el-option label="全部" value=''></el-option>
					<el-option v-for="item in metaInfo.state" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
				</el-select>
				<span class="_filterSelect">分类</span>
				<el-select v-model="filterCategory" placeholder="请选择">
					<el-option label="全部" value=''></el-option>
					<el-option v-for="item in metaInfo.category" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
				</el-select>
				<span class="_filterSelect">申请日期</span>
				<el-date-picker
					v-model="filterDate" 
					type="daterange" 
					range-separator="-" 
					start-placeholder="开始" 
					end-placeholder="结束"
					clearable=''
					format="yyyy/M/d"
					value-format="yyyy-MM-dd HH:mm:ss"
					:default-time="['00:00:00', '23:59:59']">
				</el-date-picker>
				<button class="_button1 _button-blue _text-button-white" @click="handleQuery">确认</button>
			</span>
			<span class="right">
				<el-input v-model="filterSearch" name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"></el-input>
				<button class="_button1 _button-blue _text-button-white" name="search" @click="handleSearch"><img :src=imgSearch></button>
			</span>
			</div>
			<el-table v-if="isAdmin" :data="displayItems">
				<el-table-column type="selection" :width="30"></el-table-column>
				<el-table-column 
					v-for="(item,index) in recordTableMetaAdmin" 
					:prop="item[0]" 
					:key=index 
					:label="item[1]"
				></el-table-column>
				<el-table-column prop="uploadTime" label="提交日期">
					<template slot-scope="scope">
						<span :style="{'font-size': '14px', 'font-weight': '500', 'color': 'rgba(130, 145, 169, 1)'}">{{ scope.row.uploadTime }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<span style="display: flex;">
							<span style="position: relative;">
								<i v-if="scope.row.state === '通过'" class="circle circle-green"></i>
								<i v-else-if="scope.row.state === '驳回'" class="circle circle-orange"></i>
								<i v-else-if="scope.row.state === '未审核'" class="circle circle-red"></i>
							</span>
							<span style="position: relative;">{{scope.row.state}}</span>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<img :src=imgFile style="cursor: pointer;" @click="handleControl(scope.row)">
					</template>
				</el-table-column>
			</el-table>
			<el-table v-else-if="!isAdmin" :data="displayItems">
				<el-table-column type="selection" :width="30"></el-table-column>
				<el-table-column 
					v-for="(item,index) in recordTableMeta" 
					:prop="item[0]" 
					:key=index 
					:label="item[1]"
				></el-table-column>
				<el-table-column prop="submitDate" label="提交日期">
					<template slot-scope="scope">
						<span :style="{'font-size': '14px', 'font-weight': '500', 'color': 'rgba(130, 145, 169, 1)'}">{{ scope.row.submitDate }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="state" label="状态">
					<template slot-scope="scope">
						<span v-if="scope.row.state === 'pass'"><i class="circle circle-green"></i><span>通过</span></span>
						<span v-else-if="scope.row.state === 'waiting'"><i class="circle circle-orange"></i><span>驳回</span></span>
						<span v-else-if="scope.row.state === 'reject'"><i class="circle circle-red"></i><span>未审核</span></span>
					</template>
				</el-table-column>
				<el-table-column label="操作"><img :src=imgFile style="cursor: pointer;" @click="handleControl"></el-table-column>
			</el-table>
			<div class="flex-space-between" style="margin-top: 28px;">
				<span v-if="isAdmin" class="buttons-warper">
					<button name="upload" class="_button1 _button-blue _text-button-white" @click="handleUpload"><img :src=imgUpload><span>上传</span></button>
					<button name="delete" class="_button1 _button-black _text-button-white" @click="handleDel"><span>删除账号</span></button>
					<button name="download" class="_button1 _button-grey _text-button-grey" @click="handleDownload"><img :src=imgDownload></button>
				</span>
				<span v-else-if="!isAdmin" class="buttons-warper">
					<button name="upload" class="_button1 _button-blue _text-button-white" @click="handleUpload"><img :src=imgDownload><span>下载</span></button>
				</span>
				<el-pagination
					@current-change="handlePaginationChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="totalItem"
					layout="prev, pager, next">
				</el-pagination>
			</div>

		</el-main>
		<el-dialog title="表格上传" :visible.sync="showDialogUpload" width="30%" append-to-body>
		</el-dialog>
		<el-dialog :visible.sync="showDialogControl" width="70%" append-to-body>
			<span style="display:flex">
				<span><p>教师部门</p><el-input v-model="dialogControlItem.department"></el-input></span>
				<span><p>教师名称</p><el-input v-model="dialogControlItem.name"></el-input></span>
				<span><p>教师工号</p><el-input v-model="dialogControlItem.staffNum"></el-input></span>
				<span><p>指标</p><el-input v-model="dialogControlItem.index"></el-input></span>
			</span>
			<span style="display:flex">
				<span><p>人员类型</p><el-input v-model="dialogControlItem.achievementCategory"></el-input></span>
				<span><p>类别</p>
					<el-select v-model="dialogControlItem.achievementCategory">
						<el-option v-for="item in metaInfo.achievement_category" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
					</el-select>
				</span>
				<span><p>考核项</p>
					<el-select v-model="dialogControlItem.assessmentItems">
						<el-option v-for="item in metaInfo.assessment_item" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
					</el-select>
				</span>
				<span><p>成果名称</p><el-input v-model="dialogControlItem.awardGrade"></el-input></span>
			</span>
			<hr style="margin:20px 30px;background-color:rgba(220, 220, 220, 1);">
			<span style="display:flex">
				<span><p>成果属性</p>
					<el-select v-model="dialogControlItem.achievementAttribute">
						<el-option v-for="item in metaInfo.achievement_attribute" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
					</el-select>
				</span>
				<span><p>获奖等级</p>
					<el-select v-model="dialogControlItem.awardGrade">
						<el-option :label="'一等奖'" :value="1"></el-option>
						<el-option :label="'二等奖'" :value="2"></el-option>
					</el-select>
				</span>
				<span><p>是否标志性成果</p>
					<el-select v-model="dialogControlItem.isLandmark">
						<el-option v-for="item in metaInfo.is_landmark" :key="item.id" :label="item.dictValue" :value="item.dictValue"></el-option>
					</el-select>
				</span>
				<span><p>备注</p><el-input v-model="dialogControlItem.remark"></el-input></span>
			</span>
			<span style="display:flex">
				<span><p>输入标分</p><el-input v-model="dialogControlItem.isLandmarkScores"></el-input></span>
				<span><p>输入得分</p><el-input v-model="dialogControlItem.score"></el-input></span>
			</span>
		</el-dialog>
	</el-container>
</template>

<script>
import {getAchieveList,getAchieveByID} from "@/services/request.js"
import {getDict} from "@/services/dict.js"
export default {
	name: 'PrizeRecord',
	components: {},
	data() {
		return {
			imgFile: require('@/assets/icon/file.png'),
			imgUpload: require('@/assets/icon/upload-icon1.png'),
			imgDownload: require('@/assets/icon/download-white.png'),
			imgSearch: require('@/assets/icon/search.png'),
			recordTableMetaAdmin: [
				['index', '指标'],
				['name', '姓名'],
				['staffNum', '教师工号'],
				['achievementCategory', '类别'],
				['assessmentItem', '考核项'],
				['achievementName', '成果名称'],
				['awardGrade', '获奖等级'],
				['score', '得分'],
				['isLandmark', '标志性成果'],
				['staffCategory', '人员类别'],
				['achievementAttribute', '成果属性'],
				['isLandmarkScores', '下拨大盘非标分'],
				// ['uploadTime', '提交日期'],
				// ['state', '状态']
			],
			recordTableMeta: [
				['index', '指标'],
				['name', '姓名'],
				['staffNum', '教师工号'],
				['achievementCategory', '类别'],
				['assessmentItem', '考核项'],
				['achievementName', '成果名称'],
				['awardGrade', '获奖等级'],
				['score', '得分'],
				['isLandmark', '标志性成果'],
				['staffCategory', '人员类别'],
				['achievementAttribute', '成果属性'],
				['isLandmarkScores', '下拨大盘非标分'],
				['uploadTime', '提交日期'],
				['state', '状态']
			],
			metaInfo:{
				state:[],
				category:[],
				achievement_category:[],
				assessment_item:[],
				achievement_attribute:[],
				is_landmark:[],
			},
			menuIndex: '2',
			isAdmin: false,
			filterState: '',
			filterCategory: '',
			filterDate: '',
			filterSearch:'',
			queryParams:{
				"curPage": 1,
				"pageSize": 10,
				"startTime": null,
				"endTime": null,
				"state": null,
				"isLandmark": null,
				"input": null,
				"currentStaffNum": null
			},
			displayItems: [],
			dialogControlItem:{},
			currentPage: 1,
			pageSize: 10,
			totalItem: 0,
			showDialogControl:false,
			showDialogUpload:false,
		}
	},
	computed:{
	},
	mounted() {
		this.isAdmin = window.sessionStorage.role === 'super_admin' || window.sessionStorage.role === 'admin'
		if (this.isAdmin === false) {
			this.queryParams.currentStaffNum = window.sessionStorage.staffNum
			this.$nextTick(() => {
				this.menuIndex = this.$refs.menu.activeIndex
			});
		} else {
			this.queryParams.currentStaffNum = null
		}

		this.getRelatedDict()

		this.getList(this.queryParams)
		console.log(this.displayItems)

	},
	methods: {
		handleMenuSelect(val) {
			this.menuIndex = val
		},
		handleUpload() {
			console.log('item uploaded')
		},
		handleDel() {
			console.log('item deleted')
		},
		handleDownload() {
			console.log('item downloaded')
		},
		handleQuery() {
			this.queryParams.state = this.filterState
			this.queryParams.isLandmark = this.filterCategory
			this.queryParams.startTime = this.filterDate[0]
			this.queryParams.endTime = this.filterDate[1]

			this.getList(this.queryParams)
		},	
		handleSearch() {
			this.queryParams.input = this.filterSearch

			this.getList(this.queryParams)
		},
		async handleControl(row){
			console.log(row)
			const {data} = await getAchieveByID(row.id)
			this.dialogControlItem = data.data
			console.log(data.data)
			console.log(this.dialogControlItem)
			this.showDialogControl = true
		},
		addRecord() {
			this.showDialogUpload = true
		},
		handlePaginationChange(val) {
			this.currentPage = val
			this.queryParams.curPage = val
			this.getList(this.queryParams)
		},
		async getList(queryParams){
			try {
				const {data} = await getAchieveList(queryParams)
				// console.log('成果列表返回值：')
				// console.log(data)
				// if (data.code === 200){
				//   this.$message.success('登陆成功')
				//   window.sessionStorage[data.data.tokenName] = data.data.tokenValue;
				//   window.sessionStorage.role = data.data.role;
				//   window.sessionStorage.staffNum = data.data.staffNum;
				//   window.localStorage.isAuthenticated = true
				// } else {
				//   this.$message.error(data.msg)
				// }
				// console.log(data.data)
				this.displayItems = data.data
				this.totalItem = data.totalRows
			} catch (err) {console.log(err)}
			
		},
		async getRelatedDict(){
			try {
				const {data} = await getDict('state')
				this.metaInfo.state = data.data
			} catch (err) {console.log(err)}
			try {
				const {data} = await getDict('is_landmark')
				this.metaInfo.category = data.data
			} catch (err) {console.log(err)}
			try {
				const {data} = await getDict('achievement_category')
				this.metaInfo.achievement_category = data.data
			} catch (err) {console.log(err)}
			try {
				const {data} = await getDict('assessment_item')
				this.metaInfo.assessment_item = data.data
			} catch (err) {console.log(err)}
			try {
				const {data} = await getDict('achievement_attribute')
				this.metaInfo.achievement_attribute = data.data
			} catch (err) {console.log(err)}
			try {
				const {data} = await getDict('is_landmark')
				this.metaInfo.is_landmark = data.data
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
	}
}
</script>

<style scoped lang="less">
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
.flexInLine{
	display: flex;
	justify-content: space-between;
}
.flex-space-between{
	display: flex;
	justify-content: space-between;
}
/*html嵌套样式-------------------------------------------*/
.el-container {
	position: relative;
	height: 100%;
	width: 100%;
	.el-aside {
		width: 15% !important;
		min-width: 200px;
		max-width: 220px;
		height: 100%;
		min-height: 500px;
		background-color: white;
		.el-menu {
			.el-menu-item {
				height: 60px !important;
				&.is-active::before {
					content: '';
					height: 100%;
					width: 6px;
					left: 0px;
					position: absolute;
					border-radius: 0px 5px 5px 0px;
					background: rgba(0, 129, 255, 1);
				}
			}
		}
	}
	>.el-main{
		min-width: 1000px;
		padding: 0 2.75%;
		overflow: unset;
			p.contentTitle{
				margin-top: 25px;
				margin-bottom: 40px;
			}
			div.flex-space-between:nth-of-type(1){
				span.left{
					display: flex;
					span{display: flex;align-items: center;white-space: nowrap;}
					span:nth-of-type(1){margin:0 14px 0 13px;}
					span:nth-of-type(2){margin:0 13px 0 42px;}
					span:nth-of-type(3){margin:0 13px 0 22px;}
					/deep/input::placeholder{
						text-align: start;
						font-size: 13px;
						font-weight: 400;
						color: rgba(0, 0, 0, 1);
					}
					>button{margin-left:18px;width: 120px;}
					.el-date-editor{width: 200px;}
					.el-select:nth-of-type(1){/deep/.el-input{width: 100px;}}
					.el-select:nth-of-type(2){/deep/.el-input{width: 120px;}}
				}
				span.right{
					display: flex;
					/deep/.el-input{width: 280px;}
					button{width: 40px;margin-left: 10px;}
				}
			}
			>div.el-table{
				/deep/.el-table__header {
					height: 60px ;
					/deep/div.cell {
						display: flex;
						align-items: center;
						justify-content: center;
						padding: 0px!important;
					}
				}
				/deep/.el-table__body-wrapper {
					padding-bottom: 34px;

				.el-table__body {
					border: 1px solid #ddd;
					div.cell {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 60px;
						padding: 0px;
					}
				}

				}
			}
			div.flex-space-between:nth-last-of-type(1){
				span.buttons-warper{
					display: flex;
					position: relative;
					flex-direction: row;
					button{span{margin: 0 22px;}}
					button:nth-of-type(1){width: 140px;margin-right: 20px;}
					button:nth-of-type(2){width: 140px;margin-right: 20px;}
					button:nth-of-type(3){width: 40px;margin-right: 40px;}
				}	
			}
		
	}
}
//字体------------------------------------
._title{
	font-size: 30px;
	font-weight: 700;
	color: rgba(0, 0, 0, 1);
}
._filterSelect{	font-size: 13px;	font-weight: 400;}
._table-item-grey{color: rgba(130, 145, 169, 1); font-size: 14px;	font-weight: 500;	}
._text-button-white{color: white;font-size: 16px;font-weight: 700;}
._text-button-grey{color: rgba(130, 145, 169, 1);font-size: 16px;font-weight: 700;}

/*图标、颜色-------------------------------------------*/
.circle {
	display: block;
	width: 10px;
	height: 10px;
	border-radius: 5px;
}
.circle-green {background: rgba(9, 182, 109, 1);}
.circle-orange {background: rgba(255, 138, 72, 1);}
.circle-red {background: rgba(255, 61, 87, 1);}
._button-blue{background: rgb(0, 129, 255);}
._button-grey{background: rgb(237, 243, 247);}
._button-black{background: rgb(31, 41, 53);}
</style>
