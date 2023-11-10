<template>
  <div class="containerForgetBox">
    <p class="CN text_CN">请联系工作人员找回/重置密码 134xxx4613553</p>
    <p class="EN text_EN">
      Please contact staff to retrieve/reset your password 134xxx4613553
    </p>
    <button class="ReturnLogin text_returnLogin" @click="ToLogin">返回登录</button>
  </div>
</template>

<script>
// @ is an alias to /src
import imgIconWhite from "@/assets/icon/icon_white.png";
export default {
  name: "registerBox",
  components: {},
  data() {
    return {
      iconWhite: imgIconWhite,
    };
  },
  methods: {
    ToLogin() {
      this.$emit("subButtonClicked", "loginBox");
    },
  },
};
</script>

<style scoped lang="less">
.containerForgetBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1260px;
  height: 782px;
  margin-bottom: 141px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 20px rgba(219, 231, 238, 1);

  p.CN {
    margin-top: 292px;
  }
  p.EN {
    margin-top: 11px;
  }
  button.ReturnLogin {
    position: relative;
    width: 347.39px;
    height: 44.69px;
    margin-top: 167px;
    border-radius: 6px;
    background-color: rgba(0, 129, 255, 1);
    border: none;
  }
}
//字体--------------------------------------
.text_CN {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 47.6px;
  color: rgba(0, 0, 0, 1);
}
.text_EN {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 21px;
  color: rgba(130, 145, 169, 1);
}
.text_returnLogin{
    font-size: 16px;
    font-weight: 500;
    line-height: 23.17px;
    text-indent: 5px;
    letter-spacing: 5px;
    color: white;
}
</style>
