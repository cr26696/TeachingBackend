<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  beforeCreated() {
    window.localStorage.isAuthenticated = false;
    console.log("本地值以设置false");
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
