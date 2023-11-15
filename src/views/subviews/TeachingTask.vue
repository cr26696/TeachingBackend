<template>
	<el-container>
		<el-aside id="workload-side">
			<el-menu :default-openeds="['1-1']" :default-active="menuIndex" @select="handleMenuSelect">
				<el-menu-item index="0"><i class="circle-orange"></i><span>理论课</span></el-menu-item>
				<el-submenu index="1-1">
					<template slot="title"><i class="circle-red"></i><span>实验课</span></template>
					<el-menu-item index="1"><span>A类</span></el-menu-item>
					<el-menu-item index="2"><span>B类</span></el-menu-item>
				</el-submenu>
				<el-menu-item index="3" style="text-wrap"><i class="circle-blue"></i><span
						class="twoline">指导课程设计<br>集中性实习</span></el-menu-item>
				<el-menu-item index="4"><i class="circle-purple"></i><span>指导社会调查</span></el-menu-item>
				<el-menu-item index="5"><i class="circle-green"></i><span
						class="twoline">指导分散性实习<br>工程设计训练</span></el-menu-item>
				<el-menu-item index="6"><i class="circle-grey"></i><span>指导毕业设计</span></el-menu-item>
			</el-menu>
		</el-aside>
		<el-main class="subMainContainer" v-if="menuIndex">
			<p class="text_class_type" v-if="this.menuIndex !== ''">{{ this.classType[this.menuIndex][1] }}</p>
			<el-dropdown trigger="click">
				<span class="el-dropdown-link">
					下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item, index) in classList" :key="index"
						@click.native="handleDropdownClick(item)">
						{{ item }}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-date-picker v-model="filterDate" type="datarange" range-separator="至" start-placeholder="开始日期"
				end-placeholder="结束日期">
			</el-date-picker><button>确认</button><input type="text" placeholder="请输入教师姓名或工号"><button>🔍</button>
			<el-table :data="displayItems" v-if="this.menuIndex !== ''">
				<el-table-column type="selection" width="30">
				</el-table-column>
				<el-table-column v-for="(val, key, index) in displayItems[0]" :prop="key" :key="index" :label="classMetaInfo[index][1]"
					:width="flexColumnWidth(classMetaInfo[index][0], displayItems)"></el-table-column>
			</el-table>
			<button @click="handleUpload">上传</button><button @click="handleAdd">添加</button><button>👇</button>
			<el-pagination
				@current-change="handlePaginationChange"
				:current-page="currentPage"
				:pager-count="3"
				:page-size="pageSize"
				:total="totalItem"
				layout="prev, pager, next">
			</el-pagination>
			<!-- 两个对话框 -------------------------------->
			<el-dialog title="表格上传" :visible.sync="showDialogUpload" width="30%">
				<el-upload class="upload-demo" drag action="" multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
				<el-progress :percentage="50"></el-progress>
				<div class="dialog_footer"><button><span>↑</span>确认上传</button></div>
			</el-dialog>
			<el-dialog title="" :v-if="showDialogAdd" :visible.sync="showDialogAdd" width="70%">
				<el-row>
					<el-col v-for="(MetaInfoItem, index) in this.classMetaInfo" :key="index" :span="4">
						<p>{{ MetaInfoItem[1] }}</p>
						<el-autocomplete class="inline-input" v-model="addDataForm[index]"
							:fetch-suggestions="getSuggestions(classListExperimentA, MetaInfoItem[0])" placeholder="请输入内容"
							@select="handleSelect"><!-- 其实getSuggestions内部封装有两个参数 查询字段为输入值，cb回调-->
						</el-autocomplete>
					</el-col>
				</el-row>
			</el-dialog>
			<!-- 对话框结束 -->
		</el-main>
	</el-container>
</template>
<script>
export default {
	name: 'TeachingTask',
	data() {
		return {
			//侧栏显示、选中
			menuIndex: '',
			pagerBackground: true,
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
			classListExperimentA: [
				{
					classCode: '(2021-2022-2)-S0418053-3', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-4', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-5', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-6', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-7', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-8', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-9', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-10', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-13', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-23', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-33', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-43', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-53', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-63', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-73', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-83', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-93', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-113', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-123', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-133', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-143', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-153', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-163', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-173', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-183', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-193', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-203', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-213', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-223', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
				{
					classCode: '(2021-2022-2)-S0418053-233', className: '创新实践3', teacher: '张正民', teacherCode: '54xxxx5241', classSize: '14', note1: '无', ratio1: '0.3', ratio2: '0.4',
					catagoryRatio: '1.3', classScaleRatio: '1.1', credits: '1', classHours: '16', standardClassHours: '14.4', note2: '无', goodCoursePay: '无', personInCharge: 'XXX', date: '2023.11.6 15:33'
				},
			],
			currentPage: 1,
			pageSize: 10,
			totalItem: 0,
			//dialog显示控制
			showDialogUpload: false,
			showDialogAdd: false,
			//dialogAdd数据接受
			addDataForm: [],
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
		classMetaInfoLength() { return this.classMetaInfo.length }
	},
	methods: {
		handleMenuSelect(key) {
			this.menuIndex = key
		},
		updateData() {
			//要求有menuIndex，进行axios读数据，准备数据
			this.totalItem = this.classListExperimentA.length;
		},
		handleUpload() {
			this.showDialogUpload = true
		},
		handleAdd() {
			this.showDialogAdd = true
		},
		getSuggestions(targetArr, field) {
			return (queryString, cb) => {
				const tempArr = targetArr.map((obj) => {
					return { value: obj[field] }
				})
<<<<<<< HEAD
				const datalogsUnique = this.getArrayUnique(dataLogs, 'value')
				let suggestions = null
				if (queryString) {
					const filter1 = this.createFilter(field, queryString)
					suggestions = datalogsUnique.filter(filter1)
				} else {
					suggestions = datalogsUnique
				}
				// 调用 callback 返回建议列表的数据
=======
				const uniqueArr = this.getArrayUnique(tempArr, 'value')
				const suggestions = (queryString) ? uniqueArr.filter(this.createFilter(field, queryString)) : uniqueArr;
>>>>>>> 748abeeb805b1c2f23891679860ea7e693e49682
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
			this.addDataForm = new Array(this.classMetaInfoLength)
		}
	},
	beforeCreated() { },
	created() {
		this.menuIndex = '0'
		this.updateData()
		this.addDataForm = new Array(this.classMetaInfoLength)
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
		.el-pagination{
			float: right;
			margin-top: 24px!important;
			margin-right: calc((100% - 1610px) / 2)!important;
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
