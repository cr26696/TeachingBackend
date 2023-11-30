<template>
	<el-menu :default-active="activedMenu">
		<div style="height: 80px;display: flex;align-items: center;">
			<img id="logo" :src=logo><span id="logo_text">评估助手</span><img id="logo_three_line" :src=logo_three_line>
		</div>
		<el-menu-item index="1" @click="routerGo('/mainview/facultyInfo')">
			<div><i class="el-icon-menu"></i><span>教职工信息</span></div>
		</el-menu-item>
		<el-menu-item index="2" @click="routerGo('/mainview/teachingTask')">
			<div><i class="el-icon-folder"></i><span>教师工作量核算</span></div>
		</el-menu-item>
		<el-menu-item index="3" @click="routerGo('/mainview/prizeRecord')">
			<div><i class="el-icon-date"></i><span>奖项录入</span></div>
		</el-menu-item>
		<el-menu-item index="4" @click="routerGo('/mainview/queryRank')">
			<div><i class="el-icon-message"></i><span>结果查询</span></div>
		</el-menu-item>
		<el-menu-item index="5" @click="routerGo('/mainview/userManage')">
			<div><i class="el-icon-user"></i><span>用户管理</span></div>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	name: 'SideBar',
	data() {
		return {
			logo: require('@/assets/icon/Meher_icon.png'),
			logo_three_line: require('@/assets/icon/Three_line.png'),
			activedMenu: '0'
		}
	},
	methods: {
		routerGo(destinationPath) {
			if (destinationPath === this.$route.path) {
				console.log('sideBar中routerGO已拦截重复跳转');
			} else if (destinationPath === '/mainview/teachingTask') {
				this.$router.push({
					path: destinationPath,
					query: {
						subMenuIndex: '1'
					}
				})
			} else this.$router.push({path : destinationPath})
		},
	},
	mounted() {
		this.activedMenu = this.$router.currentRoute.meta.menuIndex
	}
}
</script>

<style scoped lang="less">
.el-menu {
	width: 100%;
	border: none;
	background-color: unset;

	div:nth-of-type(1) {
		justify-content: center;
	}

	#logo {
		position: relative;

	}

	#logo_text {
		position: relative;
		margin: 0px 8px;
		font-size: 20px;
		font-weight: 700;
		line-height: 20px;
		color: rgba(255, 255, 255, 1);
	}

	#logo_three_line {
		position: relative;
	}

	.el-menu-item {
		height: 60px !important;
		padding: 0 !important;

		>div {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
		}

		i {
			position: relative;
			margin-right: 20px;
			vertical-align: middle
		}

		i:before {
			position: absolute;
			top: 18px;
		}

		span {
			position: relative;
			width: 100px;
			font-size: 14px;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
		}

		//嵌套伪类选择器
		&:hover {
			background-color: rgb(29, 38, 49) !important;
		}

		&:focus {
			background-color: rgba(22, 29, 38, 1) !important;
		}

		&.is-active::before {
			//使用::before需要设置content否则不存在于dom
			content: '';
			height: 100%;
			width: 6px;
			position: absolute;
			border-radius: 0px 5px 5px 0px;
			background: rgba(0, 129, 255, 1);
		}
	}
}</style>
