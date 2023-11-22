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
			<div v-if="menuIndex === '1'" class="vif-form">
				<p>成果填写</p>
			</div>
			<!-- 上面为填写分页div.form，下面为查看分页div.table -->
			<div v-if="menuIndex === '2' || isAdmin" class="vif-table">
				<p v-if="isAdmin" class="contentTitle _title">成果申请表</p>
				<p v-if="!isAdmin" class="contentTitle _title">全部成果</p>
				<div class="flex-space-between" style="margin-bottom: 23px;">
				<span class="left">
					<span class="_filterSelect">审核状态</span>
					<el-select v-model="filterState" placeholder="请选择">
						<el-option v-for="item in censorStates" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="_filterSelect">分类</span>
					<el-select v-model="filterCategory" placeholder="请选择">
						<el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="_filterSelect">申请日期</span>
					<el-date-picker
						v-model="filterDate" 
						type="daterange" 
						range-separator="-" 
						start-placeholder="开始" 
						end-placeholder="结束"
						clearable=''
						format="yyyy/M/d">
					</el-date-picker>
					<button class="_button1 _button-blue _text-button-white">确认</button>
				</span>
				<span class="right">
					<el-input name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"></el-input>
					<button class="_button1 _button-blue _text-button-white" name="search"><img :src=imgSearch></button>
				</span>
				</div>
				<el-table v-if="isAdmin" :data="testData">
					<el-table-column type="selection" :width="30"></el-table-column>
					<el-table-column v-for="(i,n) in 4" :prop="recordTableMeta[n][0]" :key="n" :label="recordTableMeta[n][1]"></el-table-column>
					<el-table-column v-for="(i,n) in 13" v-if="i>=6" :prop="recordTableMeta[n][0]" :key="n" :label="recordTableMeta[n][1]"></el-table-column>
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
					<el-table-column label="操作"><button class="_button1">1</button></el-table-column>
				</el-table>
				<el-table v-if="!isAdmin" :data="testData">
					<el-table-column type="selection" :width="30"></el-table-column>
					<el-table-column :prop="recordTableMeta[0][0]" :key="0" :label="recordTableMeta[0][1]"></el-table-column>
					<el-table-column v-for="(i,n) in 13" v-if="i>=5" :prop="recordTableMeta[n][0]" :key="n" :label="recordTableMeta[n][1]"></el-table-column>
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
					<el-table-column label="查看"><button class="_button1">1</button></el-table-column>
				</el-table>
				<div class="flex-space-between" style="margin-top: 28px;">
					<span class="buttons-warper">
						<button class="_button1 _button-blue _text-button-white"><img :src=imgDownload><span>下载</span></button>
						<button name="delete" class="_button1 _button-black _text-button-white" @click="handleDel"><span>删除账号</span></button>
					</span>
					<el-pagination
						@current-change="handlePaginationChange"
						:current-page="currentPage"
						:page-size="pageSize"
						:total="totalItem"
						layout="prev, pager, next">
					</el-pagination>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'PrizeRecord',
	components: {},
	data() {
		return {
			menuIndex: '2',
			isAdmin: true,
			displayItems: '',
			filterState: '',
			filterCategory: '',
			filterDate: '',
			censorStates: [{ value: 'pass', label: '通过' }, { value: 'waiting', label: '待审核' }, { value: 'reject', label: '驳回' }],
			categories: [{ value: 'nonStandard', label: '学校非标分' },{ value: 'standard', label: '学校标分' }] ,
			recordTableMeta: [
				['aimIndex', '指标'],
				['name', '姓名'],
				['workerId', '工号'],
				['catagory', '级别'],
				['catagory', '类别'],
				['assesment', '考核项'],
				['recordName', '成果名称'],
				['level', '获奖等级'],
				['score', '得分'],
				['isSignal', '标志性成果'],
				['personelType', '人员类别'],
				['recordProperty', '成果属性'],
				['noneStandardScore', '下拨大盘非标分'],
				['submitDate', '提交日期'],
				['state', '状态']
			],
			testData: [
				{
					aimIndex: 'J.4.11',
					name: '张三',
					workerId: '40768',
					catagory: '教学业绩',
					assesment: '国家级大学生创新创业项目/省新苗计划项目',
					recordName: '基于边缘计算神经网络的压力',
					level: '1',
					score: '0.6',
					isSignal: '非标志性',
					personelType: '在编',
					recordProperty: '其他类',
					noneStandardScore: '0.6',
					submitDate: '2023.11.6 15:33',
					state: 'pass'
				},
				{
					aimIndex: 'J.4.11',
					name: '李四',
					workerId: '40761',
					catagory: '教学业绩',
					assesment: '国家级大学生创新创业项目/省新苗计划项目',
					recordName: '基于边缘计算神经网络的压力',
					level: '1',
					score: '0.6',
					isSignal: '非标志性',
					personelType: '在编',
					recordProperty: '其他类',
					noneStandardScore: '0.6',
					submitDate: '2023.11.6 15:33',
					state: 'reject'
				},
				{
					aimIndex: 'J.4.11',
					name: '李四',
					workerId: '40761',
					catagory: '教学业绩',
					assesment: '国家级大学生创新创业项目/省新苗计划项目',
					recordName: '基于边缘计算神经网络的压力',
					level: '1',
					score: '0.6',
					isSignal: '非标志性',
					personelType: '在编',
					recordProperty: '其他类',
					noneStandardScore: '0.6',
					submitDate: '2023.11.6 15:33',
					state: 'waiting'
				},
				{
					aimIndex: 'J.4.11',
					name: '李四',
					workerId: '40761',
					catagory: '教学业绩',
					assesment: '国家级大学生创新创业项目/省新苗计划项目',
					recordName: '基于边缘计算神经网络的压力',
					level: '1',
					score: '0.6',
					isSignal: '非标志性',
					personelType: '在编',
					recordProperty: '其他类',
					noneStandardScore: '0.6',
					submitDate: '2023.11.6 15:33',
					state: 'waiting'
				},
			],
			currentPage: 1,
			pageSize: 5,
			imgDownload: require('@/assets/icon/download-icon-grey.png'),
			imgSearch: require('@/assets/icon/search.png'),
		}
	},
	computed:{
		totalItem() { return this.testData.length }
	},
	mounted() {
		if (this.isAdmin === false) {
			this.$nextTick(() => {
				this.menuIndex = this.$refs.menu.activeIndex
			});
		}
	},
	methods: {
		handleMenuSelect(val) {
			this.menuIndex = val
		},
		handleDel() {
			console.log('item deleted')
		},
		addRecord() {
			console.log('record added')
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
	.el-main{
		overflow: auto;
		min-width: 1000px;
		padding: 0 2.75%;
		
		div.vif-form{
			padding: 0;
		}
		//
		div.vif-table{
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
			.flex-space-between:nth-last-of-type(1){
				span.buttons-warper{
					display: flex;
					position: relative;
					flex-direction: row;
					button{span{margin: 0 22px;}}
					button:nth-of-type(1){width: 140px;margin-right: 20px;}
					button:nth-of-type(2){width: 140px;margin-right: 20px;}
				}	
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
