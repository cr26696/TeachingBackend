<template>
  <div id="containerLoginView">
    <!-- 这里接受2种子组件emit的事件，根据参数切换 -->
    <transition :name="`${componentType}`">
    <component
      @subButtonClicked="changeLoginBox"
      :is="componentType"
    ></component>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import loginBox from "@/components/login/logBox.vue";
import registerBox from "@/components/login/regiBox.vue";
export default {
  name: "LoginView",
  components: {
    loginBox,
    registerBox
  },
  data() {
    return {
      componentType: loginBox,
    };
  },
  methods: {
    changeLoginBox(type) {
      this.componentType = `${type}`;
    },
  },
};
</script>

<style scoped lang="less">
#containerLoginView {
  position: absolute;
  width: 100%;
  height: 1080px;
  background-color: rgba(219, 231, 238, 1);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/background/login_background.png");
}
.loginBox-enter-active {
  transform: translate(-50%,-50%);
  transition: transform 1s ease-in-out;
}
.loginBox-leave-active {
  transform: translate(-50%,-50%);
  transition: transform 1s ease-in-out;
}
.loginBox-enter{
  transform: translate(-350%,-50%);
  transition: transform 1s ease-in-out;
}
.loginBox-leave-to {
  transform: translate(350%,-50%);
  transition: transform 1s ease-in-out;
}
.registerBox-enter-active {
  transform: translate(-50%,-50%);
  transition: transform 1s ease-in-out;
}
.registerBox-leave-active {
  transform: translate(-50%,-50%);
  transition: transform 1s ease-in-out;
}
.registerBox-enter{
  transform: translate(350%,-50%);
  transition: transform 1s ease-in-out;
}
.registerBox-leave-to {
  transform: translate(-350%,-50%);
  transition: transform 1s ease-in-out;
}
</style>
