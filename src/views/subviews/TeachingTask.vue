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
			<p class="_text-classtype" v-if="this.menuIndex !== ''">{{ this.classType[this.menuIndex][1] }}</p>
			<div class="flex-space-between" style="margin-bottom: 23px;">
				<span class="left">
					<span class="_filterSelect">课程名称</span>
					<el-select v-model="filterName" placeholder="请选择">
						<el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<span class="_filterSelect">上传日期</span>
					<el-date-picker
						v-model="filterDate" 
						type="daterange" 
						range-separator="-" 
						start-placeholder="开始" 
						end-placeholder="结束"
						clearable=''
						format="yyyy/M/d">
						<img slot="suffix" src=imgDownload>
					</el-date-picker>
					<button class="_button1 _button-blue _text-button-white">确认</button>
				</span>
				<span class="right">
					<el-input name="filterTeacher" type="text" placeholder="请输入教师姓名或工号"></el-input>
					<button name="search" class="_button1 _button-blue"><img :src=imgSearch></button>
				</span>
			</div>
			<el-table v-if="this.menuIndex !== ''" :data="displayItems" :style="cssVar">
				<el-table-column type="selection" fixed :width="40"></el-table-column>
				<el-table-column 
					v-for="(item, index) in classMetaInfo" :prop="item[0]" 
					:key="index" 
					:label="item[1]"
					:min-width="flexColumnWidth(item[0], displayItems)"
					:max-width="80"
				>
				</el-table-column>
				<el-table-column label="操作" :width="90"><img :src=imgFile style="cursor: pointer;" @click="handleControl"></el-table-column>
			</el-table>
			<div class="flex-space-between">
				<span ref="scrollButtons" class="buttons-warper transform-leftcenter">
					<button name="upload" class="_button1 _button-blue _text-button-white" @click="handleUpload"><img :src=imgUpload><span>上传</span></button>
					<button name="addLog" class="_button1 _button-grey _text-button-grey" @click="handleAdd"><img :src=imgAdd><span>添加</span></button>
					<button name="delete" class="_button1 _button-black _text-button-white" @click="handleAdd"><span>删除账号</span></button>
					<button name="download" class="_button1 _button-grey _text-button-grey" @click="handleDownload"><img :src=imgDownload></button>
				</span>
				<el-pagination ref="scrollPagination" class="transform-leftcenter"
					@current-change="handlePaginationChange"
					:current-page="currentPage"
					:page-size="pageSize"
					:total="totalItem"
					layout="prev, pager, next">
					<!-- :pager-count="3"这个属性需要为5-21 -->
				</el-pagination>
			</div>
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
export default {
	name: 'TeachingTask',
	components:{
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
			filterName: '',
			filterDate: '',
			classList: [{value:'嵌入式',label:'嵌入式'}, {value:'数集',label:'嵌入式'}, {value:'模集',label:'模集'}],
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
	.el-aside {
		width: 15% !important;
		min-width: 200px;
		max-width: 220px;
		height: 100%;
		min-height: 500px;
		background-color: white;
		>.el-menu{
			//侧栏菜单
			span{font-size: 14px;font-weight: 500;color: rgba(130, 145, 169, 1);}
			.twoline{line-height: 1.5em;}
			//菜单项,子菜单内容项自适应flex排列
			/deep/.el-menu-item, /deep/.el-submenu__title {
				display: flex;
				align-items: center;
				justify-content: start;
				padding-left: 0!important;
			}
			@iconLeftMargin: 14%;
			>.el-menu-item {
				padding: 15px 0px;
				height: auto;
				line-height: normal;
				>i {
					position: relative;
					margin-left: @iconLeftMargin;
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
						margin-left: @iconLeftMargin;
						margin-right: 6px;
					}
					>span{
						position: relative;
						top: 0px!important;
						left: 0px!important;
					}
				}
				//二级子菜单
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
							margin-left: @iconLeftMargin;
							margin-right: 20px;
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
		box-sizing: content-box;
    overflow-x: hidden;
    overflow-y: scroll;
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
				overflow: scroll;
				padding-bottom: 34px;
				.el-table__body {
					.el-table__row{height: 60px;}
					div.cell {display: flex;justify-content: center;height: 20px;}
				}
				&::-webkit-scrollbar {
					width: 0;
					/* 滚动条的宽高 必须项 */
					height: 18px;
					top: 50px;
				}
				&::-webkit-scrollbar-track {
					position: relative;
					background:none;
					width: 50px;
				}
				&::-webkit-scrollbar-track-piece{
					border-radius: 8px;
				}
				&::-webkit-scrollbar-track-piece:start {
						background: white;
						margin-left: var(--scroll-marginLeft);
				}
				&::-webkit-scrollbar-track-piece:end {
						background: white;
						margin-right: var(--scroll-marginRight);
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 10px;
					/*滚动条的圆角*/
					-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
					background-color: #409eff;
					/*滚动条的背景颜色*/
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
				top: -10px;
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
				top: -10px;
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
