<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceIsPhone: false,
    };
  },
  methods: {
    // 添加判断方法
    isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      if (flag) return true
      else return false;
    },
  },
  beforeCreated() {
    window.localStorage.isAuthenticated = false;
    console.log("本地值以设置false");
  },
  mounted() {
    this.deviceIsPhone = this.isMobile();
    console.log("deviceIsPhone:" + this.deviceIsPhone);
  },
};
</script>

<style lang="less">
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
