<template>
<el-container>
		<p class="_text-classtype">用户管理</p>
		<div class="flex-space-between filter" style="margin-bottom: 23px;">
			<span class="left">
				<span class="_filterSelect">类别</span>
				<el-select v-model="filterName" placeholder="请选择">
					<el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<button class="_button1 _button-blue _text-button-white">确定</button>
			</span>
			<span class="right">
				<el-input name="filterTeacher" type="text" placeholder="请输入姓名或工号"></el-input>
				<button name="search" class="_button1 _button-blue"><img :src=imgSearch></button>
			</span>
		</div>
		<el-table :data="displayItems" :style="cssVar">
			<!-- <el-table-column type="selection" fixed :width="40"></el-table-column> -->
			<el-table-column 
				v-for="(item, index) in classMetaInfo" :prop="item[0]" 
				:key="index" 
				:label="item[1]"
				:min-width="flexColumnWidth(item[0], displayItems)"
				:max-width="80"
			>
			</el-table-column>
			<el-table-column label="操作" :width="90">
				<template slot-scope="scope">
					<el-button
					size="mini"
					type="primary"
					@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">冻结</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="flex-space-between">
			<span ref="scrollButtons" class="buttons-warper">
				<button name="upload" class="_button1 _button-blue _text-button-white" @click="handleUpload"><img :src=imgUpload><span>上传</span></button>
				<button name="addLog" class="_button1 _button-grey _text-button-grey" @click="handleAdd"><img :src=imgAdd><span>添加</span></button>
				<button name="download" class="_button1 _button-grey _text-button-grey" @click="handleDownload"><img :src=imgDownload></button>
			</span>
			<el-pagination ref="scrollPagination"
				@current-change="handlePaginationChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="totalItem"
				layout="prev, pager, next">
				<!-- :pager-count="3"这个属性需要为5-21 -->
			</el-pagination>
		</div>
	</el-container>
</template>

<script>
export default {
	name: 'UserManage',
	data() {
		return {
			//侧栏显示、选中
			menuIndex: '',
			pagerBackground: true,
			// classType: [
			// 	['classTheory', '理论课'],
			// 	['classExperimentA', '实验课 A类'],
			// 	['classExperimentB', '实验课 B类'],
			// 	['classGathered', '集中实习'],
			// 	['classInvestigate', '社会调查'],
			// 	['classSeparated', '分散实习'],
			// 	['classGraduate', '毕业设计指导']
			// ],
			classMetaInfos:[
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			[['department', '教师部门'], ['number', '教师工号'], ['name', '教师名称'], ['title', '职称'], ['account', '账号'], ['password', '密码'], ['email', '邮箱'], ['telephone', '联系电话'], ['authority', '权限'], ['entryTime', '入职时间']],
			
			],
			//筛选条件
			filterName: '',
			filterDate: '',
			classList: [{value:'嵌入式',label:'嵌入式'}, {value:'数集',label:'嵌入式'}, {value:'模集',label:'模集'}],
			//原始数据，分页
			classListExperimentA: [
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '管理员', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				{
					department: '电子信息学院（微电子学院）', number: '40193', name: '刘国华', title: '正高', account: '13455xxx648', password: 'jshadjas45a', email: '46155846.@qq.com', telephone: '16433497542',
					authority: '教师', entryTime: '2023年11月29日'
				},
				
			],
			currentPage: 1,
			pageSize: 10,
			//dialog显示控制
			showDialogUpload: false,
			showDialogAdd: false,
			//dialogAdd数据接受
			addDataForm: [],
			/*
			给子组件传的值如果使用数组，可能不会自动更新，
			使用this.$refs.childComponent.$forceUpdate();来强制更新子组件也同样可以解决
			*/
			scrollMarginL: 20,
			scrollMarginR: 20,
			imgUpload: require('@/assets/icon/upload-icon1.png'),
			imgAdd: require('@/assets/icon/plus-grey.png'),
			imgDownload: require('@/assets/icon/download-grey.png'),
			imgSearch: require('@/assets/icon/search.png'),
			imgFile: require('@/assets/icon/file.png'),
		}
	},
	computed: {
		displayItems () {
			const start = (this.currentPage - 1) * this.pageSize
			const end = start + this.pageSize
			return this.classListExperimentA.slice(start, end)
		},
		classMetaInfo() {
			return this.classMetaInfos[this.menuIndex]
		},
		classMetaInfoLength() { return this.classMetaInfo.length },
		totalItem() { return this.classListExperimentA.length },
		cssVar() {
			return {
				'--scroll-marginLeft': this.scrollMarginL + 'px',
				'--scroll-marginRight': this.scrollMarginR + 'px'
			}
		}
	},
	created() {
		console.log('task created, 给子组件传值scrollMargin:' + this.scrollMarginL + ',' + this.scrollMarginR)
	},
	mounted() {
		// const tempIndex = this.$router.currentRoute.query.subMenuIndex
		// if (tempIndex === undefined) this.menuIndex = '1'
		// else this.menuIndex = tempIndex 
		this.updateData()
		//this.addDataForm = new Array(this.classMetaInfoLength)
		this.addDataForm = new Array(15)
		this.$nextTick(() => {
			//console.log(this.$refs)
			this.scrollMarginL = this.$refs.scrollButtons.offsetWidth
			this.scrollMarginR = this.$refs.scrollPagination.$el.clientWidth
			console.log('task mounted的nextTick, 给子组件传值scrollMargin:' + this.scrollMarginL + ',' + this.scrollMarginR)
		});
	},
	updated() {
		console.log('task组件updated')
	},
	beforeRouteEnter(to, from, next) {
		/* 此处只是放行，不增加新跳转
		 * 逻辑条件：
		 * 1：手动刷新，读取query值
		 * 2：从其他任何地方而来, 给默认值'1'
		 * 3：兜底防error，现有逻辑下不触发
		 */
		if (from.path === '/') { 
			console.log('应该是点击了网页刷新');
			next(vm => {
				vm.menuIndex = to.query.subMenuIndex
				console.log('已从地址栏读取query值:' + to.query.subMenuIndex)
			})
		} else if (from.path !== '/mainview/teachingTask') {
			console.log('应该是从其他地方跳转到teachingTask');
			next(vm => {
				vm.menuIndex = '1'
			})
		} else console.log('teachingTask的beforeRouterEnter忽略了重复跳转避免报错')
	},
	watch: {
		menuIndex: function(newVal, oldVal) {
			//刷新会使menuIndex从无到有变化
			this.addDataForm = new Array(this.classMetaInfoLength)
			console.log('menuIndex值 => new: ' + newVal + ', old: ' + oldVal)
			if (!oldVal) console.log('task组件被创建/刷新,subMenuIndex从无到有,不做任何操作')
			else {
				console.log('subMenuIndex被更新,通过replace更改至query')
				const query = JSON.parse(JSON.stringify(this.$route.query))
				query.subMenuIndex = this.menuIndex
				//下面一行...写法很特殊，将对象的属性原封不动复制一份，再在后面追加
				this.$router.replace({ query: { ...this.$route.query, subMenuIndex: this.menuIndex } })
			}
		}
	},
	methods: {
		handleMenuSelect(val) {
			if (this.menuIndex !== val) this.menuIndex = val
		},
		handleMenuClose(key, keyPath) {
			this.$refs.subMenu1.open(keyPath);
		},
		updateData() {
			//要求有menuIndex，进行axios读数据，准备数据/暂无作用
		},
		handleUpload() {
			this.showDialogUpload = true
		},
		handleAdd() {
			this.showDialogAdd = true
		},
		handleDownload() {
			console.log('start download')
		},
		handleControl(val) {
			console.log('操作' + val)
		},
		getSuggestions(targetArr, field) {
			return (queryString, cb) => {
				const tempArr = targetArr.map((obj) => {
					return { value: obj[field] }
				})
				// 调用 callback 返回建议列表的数据
				const uniqueArr = this.getArrayUnique(tempArr, 'value')
				const suggestions = (queryString) ? uniqueArr.filter(this.createFilter(field, queryString)) : uniqueArr;
				cb(suggestions);
			}
		},
		createFilter(field, queryString) {
			return (str) => {
				return (str.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
			};//查询条件 .value字段存在queryString，无论位置
		},
		handleSelect(item) {
			console.log('已点击：' + item);
		},
		getArrayUnique(arr, field) {
			//重复值过滤，传入对象数组arr,去重目标field,返回无重复数组
			const res = new Map();
			return arr.filter((arr) => !res.has(arr[field]) && res.set(arr[field], 1))
		},
		handlePaginationChange(val) {
			this.currentPage = val
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
.flex-display{
	position: relative;
	display: flex;
	align-items: center;
}
.flex-space-between{
	display: flex;
	justify-content: space-between;
}
.transform-center{
	transform: translate(-50%,-50%);
}
.transform-topcenter{
	transform: translatex(-50%);
}
.transform-leftcenter{
	transform: translateY(-50%);
}
/*html嵌套样式-------------------------------------------*/
.el-container {
	position: relative;
	height: 100%;
	flex-direction: column;
	margin-left:33px;
	margin-right:33px;
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
				button:nth-of-type(2){width: 140px;margin-right: 20px;}
				button:nth-of-type(3){width: 120px;margin-right: 20px;}
				button:nth-of-type(4){width: 40px;margin-right: 40px;}
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
/*图标、颜色-------------------------------------------*/
.circle {
	display: block;
	width: 10px;
	height: 10px;
	border-radius: 5px;
}
.circle-orange {background: rgba(255, 138, 72, 1);}
.circle-red {background: rgba(255, 61, 87, 1);}
.circle-blue {background: rgba(34, 204, 226, 1);}
.circle-purple {background: rgba(240, 12, 225, 1);}
.circle-green {background: rgba(9, 182, 109, 1);}
.circle-grey {background: rgba(130, 145, 169, 1);}
._button-blue{background: rgb(0, 129, 255);}
._button-grey{background: rgb(237, 243, 247);}
._button-black{background: rgb(31, 41, 53);}
</style>
