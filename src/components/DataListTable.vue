<template>
	<el-table v-if="isDisplayed" :data="itemsToDisplay" :style="cssVar">
		<el-table-column type="selection" :width="selectWidth"></el-table-column>
		<el-table-column v-for="(item, index) in fieldInfos" :prop="item[0]" :key="index" :label="item[1]"
			:width="flexColumnWidth(item[0], itemsToDisplay)">
		</el-table-column>
	</el-table>
</template>
<script>
export default {
	name: 'DataListTable',
	props: {
		isDisplayed: Boolean,
		selectWidth: Number,
		itemsToDisplay: Array,
		fieldInfos: Array,
		marginLeft: Number,
		marginRight: Number
	},
	methods: {
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
	computed:{
		cssVar() {
			return {
				'--scroll-marginLeft' : this.marginLeft + 'px',
				'--scroll-marginRight' : this.marginRight + 'px'
			}
		}
	}
}
</script>
<style scoped lang="less">
.el-table {
	position: relative;
	width: 100%;
	background: none;
	/deep/.el-table__header {
		height: 30px !important;
		div.cell {
			height: 20px;
		}
	}
	/deep/.el-table__body-wrapper {
		padding-bottom: 34px;
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
			height: 18px;
			top: 50px;
		}
		&::-webkit-scrollbar-track {
			position: relative;
			background:none;
			width: 100%;
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
}
</style>
