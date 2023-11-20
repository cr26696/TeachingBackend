<template>
	<el-container>
		<el-aside id="achievement-side">
			<el-menu v-if="isAdmin">
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
			<div v-if="menuIndex === '1'" class="form">
				<p>成果填写</p>
			</div>
			<!-- 上面为填写，下面为查看 -->
			<div v-if="menuIndex === '2' || isAdmin" class="table">
				<p class="contentTitle">全部成果</p>
				<div style="display: flex;justify-content: space-between;">
				<div>
					<el-select v-model="filterState" placeholder="请选择">
						<el-option v-for="item in censorStates" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select v-model="filterCategory" placeholder="请选择">
						<el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-date-picker v-model="filterDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					<button name="confirm" class="">确认</button>
				</div>
				<span>
					<input name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"><button name="search">🔍</button>
				</span>
				</div>
				<el-table v-if="isAdmin" :data="adminTestData">
					<el-table-column type="selection" :width="30"></el-table-column>
					<el-table-column v-for="(item, index) in recordAdminTableMeta" :prop="item[0]" :key="index" :label="item[1]" :min-width="flexColumnWidth(item[0], adminTestData)" :max-width="30">
					</el-table-column>
					<el-table-column prop="pass" label="状态"></el-table-column>
					<el-table-column label="操作"><button>1</button></el-table-column>
				</el-table>
				<el-table v-if="!isAdmin" :data="testData">
					<el-table-column type="selection" :width="30"></el-table-column>
					<el-table-column v-for="(item, index) in recordTableMeta" :prop="item[0]" :key="index" :label="item[1]" :min-width="flexColumnWidth(item[0], testData)" :max-width="30">
					</el-table-column>
					<el-table-column prop="pass" label="状态"></el-table-column>
					<el-table-column label="操作"><button>2</button></el-table-column>
				</el-table>
			</div>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'PrizeRecord',
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
			recordAdminTableMeta: [
				['aimIndex', '指标'],
				['name', '姓名'],
				['workerId', '工号'],
				['catagory', '级别'],
				['assesment', '考核项'],
				['recordName', '成果名称'],
				['level', '获奖等级'],
				['score', '得分'],
				['isSignal', '标志性成果'],
				['personelType', '人员类别'],
				['recordProperty', '成果属性'],
				['noneStandardScore', '下拨大盘非标分'],
				['submitDate', '提交日期'],
			],
			recordTableMeta: [
				['aimIndex', '指标'],
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
			],
			adminTestData: [
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
					state: 'pass'
				},
			],
			testData: [
				{
					aimIndex: 'J.4.11',
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
			]
		}
	},
	components: {
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
		addRecord() {
			console.log('record added')
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
		div.form{

		}
		div.table{
			div.left{

			}
			div.right{

			}
			>div.el-table{
				/deep/.el-table__header {
					height: 30px !important;
					div.cell {
						height: 20px;
					}
				}
				/deep/.el-table__body-wrapper {
					padding-bottom: 34px;

					.el-table__body {
						border: 1px solid #ddd;
						div.cell {
							height: 20px;
						}
					}

				}
			}
		}
	}
}
</style>
