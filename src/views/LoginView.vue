<template>
  <div id="containerLoginView" :style="cssVars">
    <!-- 这里接受3种子组件emit的事件，根据参数切换 -->
    <transition :name="transitionStyle">
      <component
        @subButtonClicked="changeLoginBox"
        :is="currentType"
      ></component>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import loginBox from "@/components/login/logBox.vue";
import registerBox from "@/components/login/regiBox.vue";
import forgetBox from "@/components/login/forgetBox.vue";

export default {
  name: "LoginView",
  components: {
    loginBox,
    registerBox,
    forgetBox,
  },
  data() {
    return {
      previousType: 'loginBox',
      currentType: 'loginBox',
    };
  },
  computed: {
    transitionStyle: function () {
      return this.previousType
    },
    cssVars() {
      return {
        '--trans': `${this.previousType}to${this.currentType}`
      }
    }
  },
  methods: {
    changeLoginBox(type) {
      this.previousType = this.currentType;
      this.currentType = `${type}`;
    }
  }
};
</script>

<style scoped lang="less">

#containerLoginView {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(219, 231, 238, 1);
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("@/assets/background/login_background.png");
}
//下方为过渡特效----------------------------
.tologinBox-enter-active {
  transform: translate(-50%, -50%);
}
.tologinBox-leave-active {
  transform: translate(-50%, -50%);
}
.tologinBox-enter {
  transform: translate(-250%, -50%);
}
.tologinBox-leave-to {
  transform: translate(350%, -50%);
}
.tologinBox-enter-active,
.tologinBox-leave-active {
  transition: transform 1s ease-in-out;
}
//toRegi
.toregisterBox-enter-active {
  transform: translate(-50%, -50%);
}
.toregisterBox-leave-active {
  transform: translate(-50%, -50%);
}
.toregisterBox-enter {
  transform: translate(250%, -50%);
}
.toregisterBox-leave-to {
  transform: translate(-350%, -50%);
}
.toregisterBox-enter-active,
.toregisterBox-leave-active {
  transition: transform 1s ease-in-out;
}
//toForget
.toforgetBox-leave {
  opacity: 1;
}
.toforgetBox-leave-to {
  opacity: 0;
}
.toforgetBox-enter {
  opacity: 0;
}
.toforgetBox-enter-to {
  opacity: 1;
}
.toforgetBox-leave-active,
.toforgetBox-enter-active {
  transition: opacity ease-in-out;
}
</style>
