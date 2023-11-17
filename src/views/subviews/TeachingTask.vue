<template>
	<el-container>
		<el-aside>
			<el-menu ref="subMenu1" :default-openeds="['1-1']" :default-active="menuIndex" @select="handleMenuSelect" @close="handleMenuClose">
				<el-menu-item index="0"><i class="circle circle-orange"></i><span>理论课</span></el-menu-item>
				<el-submenu index="1-1">
					<template slot="title"><i class="circle circle-red"></i><span>实验课</span></template>
				<el-menu-item index="1"><span>A类</span></el-menu-item>
				<el-menu-item index="2"><span>B类</span></el-menu-item>
			</el-submenu>
				<el-menu-item index="3" style="text-wrap"><i class="circle circle-blue"></i><span
						class="twoline">指导课程设计<br>集中性实习</span></el-menu-item>
				<el-menu-item index="4"><i class="circle circle-purple"></i><span>指导社会调查</span></el-menu-item>
				<el-menu-item index="5"><i class="circle circle-green"></i><span
				class="twoline">指导分散性实习<br>工程设计训练</span></el-menu-item>
				<el-menu-item index="6"><i class="circle circle-grey"></i><span>指导毕业设计</span></el-menu-item>
			</el-menu>
		</el-aside>
		<el-main class="subMainContainer" v-if="menuIndex">
			<p class="text_class_type" v-if="this.menuIndex !== ''">{{ this.classType[this.menuIndex][1] }}</p>
			<el-dropdown name="filterClassName" trigger="click">
				<span class="el-dropdown-link">下拉菜单<i class="el-icon-arrow-down el-icon--right"></i></span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="(item, index) in classList" :key="index" @click.native="handleDropdownClick(item)">
							{{ item }}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-date-picker name="filterDate" v-model="filterDate" type="datarange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			<button name="confirm" class="">确认</button><input name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"><button name="search">🔍</button>
			<DataListTable 
				:isDisplayed="this.menuIndex !== ''" 
				:selectWidth="30" 
				:itemsToDisplay="displayItems" 
				:fieldInfos="classMetaInfo" 
				:margin-left="scrollMargin[0]"
				:margin-right="scrollMargin[1]"
			></DataListTable>
			<div ref="scrollButtons" class="buttons-warper transform-leftcenter">
				<button name="upload" @click="handleUpload">上传</button>
				<button name="addLog" @click="handleAdd">添加</button>
				<button name="download" @click="handleDownload">下载</button>
			</div>
			<el-pagination ref="scrollPagination" class="transform-leftcenter"
				@current-change="handlePaginationChange"
				:current-page="currentPage"
				:page-size="pageSize"
				:total="totalItem"
				layout="prev, pager, next">
				<!-- :pager-count="3"这个属性需要为5-21 -->
			</el-pagination>
		</el-main>
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
	</el-container>
</template>
<script>
import DataListTable from '@/components/DataListTable.vue'
export default {
	name: 'TeachingTask',
	components:{
		DataListTable
	},
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
			//原始数据，分页
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
			pageSize: 5,
			//dialog显示控制
			showDialogUpload: false,
			showDialogAdd: false,
			//dialogAdd数据接受
			addDataForm: [],
			scrollMargin: [20,20],
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
		
	},
	created() {
	},
	beforeMount() {

	},
	mounted() {
		// const tempIndex = this.$router.currentRoute.query.subMenuIndex
		// if (tempIndex === undefined) this.menuIndex = '1'
		// else this.menuIndex = tempIndex 
		this.updateData()
		//this.addDataForm = new Array(this.classMetaInfoLength)
		this.addDataForm = new Array(15)

	},
	updated() {
		console.log('task组件updated')
		this.scrollMargin[0] = this.$refs.scrollButtons.clientWidth
		this.scrollMargin[1] = this.$refs.scrollPagination.$el.clientWidth
	},
	beforeRouteEnter(to, from, next) {
		/* 此处只是放行，不增加新跳转
		 * 触发：
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
				let query = JSON.parse(JSON.stringify(this.$route.query))
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
		}
	},
	
}
</script>

<style scoped lang="less">
.el-container {
	position: relative;
	height: 100%;
	.el-aside {
		width: 15% !important;
		min-width: 200px;
		max-width: 220px;
		height: 100%;
		min-height: 500px;
		background-color: white;
		>.el-menu{
			//最外层menu
			span{
				//字体，不含位置
				font-size: 14px;
				font-weight: 500;
				color: rgba(130, 145, 169, 1);
			}
			.twoline{
				line-height: 1;
			}
			//菜单项,子菜单内容项自适应flex排列
			/deep/.el-menu-item, .el-submenu__title {
				display: flex;
				align-items: center;
				padding: 0;
			}
			>.el-menu-item {
				padding: 15px 0px;
				height: auto;
				line-height: normal;
				>i {
					position: relative;
					margin-left: 40px;
					margin-right: 6px;
				}
			}
			>.el-submenu{
				position: relative;
				background: none;
				&.is-active{
					background-color:  rgba(237, 244, 251, 1);;
				}
				/deep/.el-submenu__title{
					display: flex;
					align-items: center;
					padding: 15px 0px;
					height: auto!important;
					line-height: normal;
					cursor: default;
					.el-submenu__icon-arrow::before{
						content: '';
					}
					>i {
						position: relative;
						margin-left: 40px;
						margin-right: 6px;
					}
					>span{
						position: relative;
						top: 0px!important;
						left: 0px!important;
					}
				}
				/deep/.el-menu{
					position: relative;
					background: none;
					>.el-menu-item{
						position: relative;
						display: flex;
						align-items: center;
						width: 100%;
						height: 30px;
						padding: 0 0!important;
						&.is-active>span{
								background-color: white;
								
						}
						>span{
							display: flex;
							align-items: center;
							background: none;
							padding-left: 15px;
						}
						&::before{
							content: "";
							position: relative;
							margin-right: 30%;
						}
					}
					span{
						position: relative;
						background-color: white;
						width: 100%;
						height: 30px;
						border-radius: 6px;
					}
				}
			}
			//选中指示条
			>.el-menu-item.is-active::before {
				content: '';
				position: absolute;
				height: 100%;
				width: 6px;
				left: 0px;
				border-radius: 0px 5px 5px 0px;
				background: rgba(0, 129, 255, 1);
			}
			>.el-submenu.is-active.is-opened::before {
				content: '';
				position: absolute;
				z-index: 1;
				height: 100%;
				width: 6px;
				left: 0px;
				border-radius: 0px 5px 5px 0px;
				background: rgba(0, 129, 255, 1);
			}
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
		div.buttons-warper{
			position: relative;
			top: -10px;
			float: left;
				button{
					position: relative;
				}
		}
		.el-pagination{
			top: -10px;
			float: right;
			position: relative;
		}
	}

}

/*样式-------------------------------------------*/
.flex-display{
	position: relative;
	display: flex;
	align-items: center;
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
</style>
