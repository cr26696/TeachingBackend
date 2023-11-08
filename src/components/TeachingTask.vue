<template>
<div>
  <el-container>
        <el-aside id="achievement-side">
            <el-menu>
                <el-menu-item index="1">成果录入申请</el-menu-item>
                <el-menu-item index="2">成果填写</el-menu-item>
                <el-menu-item index="3">全部成果</el-menu-item>
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
  name: 'TeachingTask'
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
