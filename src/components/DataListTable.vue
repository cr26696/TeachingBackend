<template>
	<el-table :data="displayItems" v-if="this.menuIndex !== ''">
		<el-table-column type="selection" width="30">
		</el-table-column>
		<el-table-column v-for="(val, key, index) in displayItems[0]" :prop="key" :key="index" :label="classMetaInfo[index][1]"
			:width="flexColumnWidth(classMetaInfo[index][0],displayItems)"></el-table-column>
	</el-table>
</template>
<script>
export default {
	name: 'TeachingTask',
	/* */
	prop:{
		displayItems, olumnWidth
	},
	data() {
		return {
			//侧栏显示、选中
			menuIndex: '',
			classType: [
				['classTheory', '理论课'],
				['classExperimentA', '实验课 A类'],
				['classExperimentB', '实验课 B类'],
				['classGathered', '集中实习'],
				['classInvestigate', '社会调查'],
				['classSeparated', '分散实习'],
				['classGraduate', '毕业设计指导']
			],
			classMetaInfos:[
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
				[['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']]
			],
			//筛选条件
			filterDate: '',
			filterName: '',
			classList: ['嵌入式', '数集', '模集'],
			//各字段中文名
			KeywordExperimentA: [['classCode', '教学班'], ['className', '课程名称'], ['teacher', '教师名称'], ['teacherCode', '教师工号'], ['classSize', '班级人数'], ['note1', '备注1'], ['ratio1', '系数1'], ['ratio2', '系数2'], ['catagoryRatio', '类别系数'], ['classScaleRatio', '班级规模系数'], ['credits', '学分'], ['classHours', '课程总学时'], ['standardClassHours', '标准课时'], ['note2', '备注2'], ['goodCoursePay', '优课优酬'], ['personInCharge', '负责人'], ['date', '日期']],
			//原始数据与待显示数据，分页
			currentPage: 1,
			pageSize: 10,
			totalItems: 0,
			//dialog显示控制
			showDialogUpload: false,
			showDialogAdd: false,
			//dialogAdd数据接受
			dataInput: [],
		}
	},
	computed: {
		classMetaInfo() {
			return this.classMetaInfos[this.menuIndex]
		},
		classMetaInfoLength() { return this.classMetaInfo.length }
	},
	methods: {
		handleMenuSelect(key) {
			this.menuIndex = key
		},
		updateData() {
			//要求有menuIndex，进行axios读数据，准备数据
			this.totalItems = this.classListExperimentA.length;
		},
		handleUpload() {
			this.showDialogUpload = true
		},
		handleAdd() {
			this.showDialogAdd = true
		},
		querySearch(filedIndex) {
			return (queryString, cb) => {
				const field = this.classMetaInfo[this.menuIndex][filedIndex]
				const dataLogs = this.classListExperimentA.map((obj) => {
					return {
						value: obj[field]
					}
				})
				const datalogsUnique = this.getArrayUnique(dataLogs, 'value')
				let suggestions = null
				if (queryString) {
					const filter1 = this.createFilter(field, queryString)
					suggestions = datalogsUnique.filter(filter1)
				}
				else {
					suggestions = datalogsUnique
				}
				// 调用 callback 返回建议列表的数据
				cb(suggestions);
			}
		},
		createFilter(field, queryString) {
			return (str) => {
				return (str.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
			};
		},
		handleSelect(item) {
			console.log(item);
		},
		getArrayUnique(arr, field) {
			//重复值过滤，传入对象数组arr,去重目标field,返回无重复数组
			const res = new Map();
			return arr.filter((arr) => !res.has(arr[field]) && res.set(arr[field], 1))
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
	watch: {
		menuIndex() {
			this.updateData()
			this.dataInput = new Array(this.classMetaInfoLength)
		}
	},
	beforeCreated() { },
	created() {
		this.menuIndex = '0'
		this.updateData()
		this.dataInput = new Array(this.classMetaInfoLength)
	},
	mounted() { },
}
</script>

<style scoped lang="less">
.el-container {
	position: relative;
	height: 100%;

	#workload-side {
		width: 15% !important;
		min-width: 200px;
		max-width: 220px;
		height: 100%;
		min-height: 500px;
		background-color: white;

		.el-menu-item {
			padding: 0px !important;
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

		/deep/ .el-submenu__title {
			padding: 0px !important;
		}

		span {
			position: relative;
			left: 50px;
			top: 20px;
			font-size: 14px;
			font-weight: 500;
			line-height: 20px;
			color: rgba(130, 145, 169, 1);
			text-align: left;
			vertical-align: top;
			white-space: pre-wrap;
		}

		.twoline {
			top: 11px !important;
		}
	}

	.subMainContainer {
		>span {
			margin-top: 36px;
			margin-left: 40px;
		}

		.el-dropdown {
			box-sizing: content-box;
			position: relative;
			transform: translateX(-50%);
			margin-left: 120px;
			border-radius: 6px;
			background: rgba(255, 255, 255, 1);

			.el-dropdown-selfdefine {
				display: flex;
				align-items: center;
				width: 130px;
				height: 40px;
				padding-left: 8px;

				i:first-child {
					position: relative;
					left: 30px;
				}
			}
		}

		.el-table {
			width: 100%;

			/deep/.el-table__header {
				height: 30px !important;

				div.cell {
					height: 20px;
				}
			}

			/deep/.el-table__body-wrapper {
				.el-table__body {
					/* 滚动条整体高 必须项 */
					border-right: none;
					overflow-x: scroll;
					overflow-x: overlay;
					overflow-y: scroll;
					/* overflow-y为了不出现水平滚动条*/
					border: 1px solid #ddd;

					//padding-bottom: 150px;
					div.cell {
						height: 20px;
					}
				}

				&::after {
					content: '';
					position: absolute;
					z-index: -1;
					width: calc(100% - 80px);
					left: 40px;
					bottom: -30px;
					height: 20px;
					background: #666;
				}

				&::-webkit-scrollbar {
					width: 5px;
					/* 滚动条的宽高 必须项 */
					height: 20px;
					top: 50px;
				}

				&::-webkit-scrollbar-track {
					background-color: #409eff;
				}

				&::-webkit-scrollbar-track-piece {
					&:start {
						background: orange;
						margin-left: 40px;
					}

					&:end {
						background: orange;
						margin-right: 40px;
					}
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 10px;
					/*滚动条的圆角*/
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					background-color: #409eff;
					/*滚动条的背景颜色*/
				}
			}
		}
	}
}

/*字体-------------------------------------------*/
.text-wrap {
	white-space: pre-wrap;
}

.text_class_type {
	font-size: 30px;
	font-weight: 700;
	line-height: 43.44px;
	color: rgba(0, 0, 0, 1);
}

/*图标-------------------------------------------*/
.circle-orange {
	position: absolute;
	top: 24px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(255, 138, 72, 1);
}

.circle-red {
	position: absolute;
	top: 24px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(255, 61, 87, 1);
}

.circle-blue {
	position: absolute;
	top: 24px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(34, 204, 226, 1);
}

.circle-purple {
	position: absolute;
	top: 24px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(240, 12, 225, 1);
}

.circle-green {
	position: absolute;
	top: 24px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(9, 182, 109, 1);
}

.circle-grey {
	position: absolute;
	top: 25px;
	left: 35px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	margin-right: 5px;
	opacity: 1;
	background: rgba(130, 145, 169, 1);
}
</style>
<style lang="less">
.el-submenu__title {
	height: 60px !important;

	span {
		position: absolute;
		left: 50px;
		top: 20px;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 20px;
		color: rgba(130, 145, 169, 1);
		text-align: left;
		vertical-align: top;

	}

}</style>
