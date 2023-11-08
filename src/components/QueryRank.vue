<template>
<div>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                        <template slot="title">学评教排名</template>
                        <el-menu-item index="1-1">学校排名</el-menu-item>
                        <el-menu-item index="1-2">学院排名</el-menu-item>
                    </el-submenu>
                <el-menu-item index="2">教学业绩考核</el-menu-item>
            </el-menu>
        </el-aside>
        <el-main></el-main>
    </el-container>
</div>
</template>

<script>
// import ParamSetting from '@/components/device_control_detail/ParamSetting.vue'
// import SwitchSetting from '@/components/device_control_detail/SwitchSetting.vue'
// import TimerSetting from '@/components/device_control_detail/TimerSetting.vue'
// import ModeSetting from '@/components/device_control_detail/ModeSetting.vue'
// import RebootSetting from '@/components/device_control_detail/RebootSetting.vue'
// import CarSetting from '@/components/device_control_detail/CarSetting.vue'
// import axios from 'axios'

export default {
  name: 'QueryRank'
}
</script>

<style scoped lang="less">
#achievement-side{
    position: absolute;
    background-color: yellow!important;;
    width: 233px!important;
    height: 100%;
}
</style>
