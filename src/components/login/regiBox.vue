<template>
  <div class="containerRegisterBox">
    <div class="registerLeft">
      <span class="title">注册界面</span>
      <p>
        Teaching assessment assistant<br />
        register screen
      </p>
      <div class="divInput">
        <input type="text" placeholder="请输入工号" />
        <input type="text" placeholder="请输入账号" />
        <input type="text" placeholder="请输入密码" />
        <div>
          <input type="checkbox" />
          <span>记住密码</span>
          <button>忘记密码</button>
        </div>
      </div>
      <button class="register">立即注册</button>
    </div>
    <div class="registerRight">
      <div class="divIcon"><img :src="iconWhite" /><span>评估助手</span></div>
      <button class="b_register" @click="ToLogin">返回登录</button>
      <p class="welcomeText">
        <span>欢迎注册</span><br />
        <span>教学评估小助手</span><br />
        <span>后台应用系统!</span>
      </p>
      <p class="welcomeEN">
        Welcome to the register<br />
        Teaching assessment assistant Background<br />
        application system!
      </p>
    </div>
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
      iconWhite: imgIconWhite
    };
  },
  methods: {
    ToLogin() {
      this.$emit("subButtonClicked", "loginBox");
    }
  }
};
</script>

<style scoped lang="less">
.containerRegisterBox {
  display: flex;
  position: absolute;
  width: 1260px;
  height: 782px;
  margin-bottom: 141px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 20px rgba(219, 231, 238, 1);

  .registerLeft {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-align: center;
    width: 778px;
    height: 100%;
    & > span {
      position: relative;
      width: 271.44px;
      height: 43px;
      font-size: 30px;
      font-weight: 700;
      line-height: 43.44px;
      margin-top: 148px;
    }
    & > p {
      position: relative;
      margin-top: 23px;
      width: 431px;
      height: 47px;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: rgba(130, 145, 169, 1);
    }
    div.divInput {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: center;
      margin-top: 66px;
      & > input {
        width: 347.39px;
        height: 44.69px;
        opacity: 0.5;
        border-radius: 6px;
        border: 1px solid rgba(130, 145, 169, 1);
      }
      input:nth-of-type(2) {
        margin-top: 17px;
        margin-bottom: 17px;
      }
      & > div {
        position: relative;
        width: 347px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 15px;
        input {
          position: relative;
          width: 25px;
          height: 25px;
          cursor: pointer;
        }
        span {
          position: absolute;
          left: 45px;
          font-size: 16px;
          font-weight: 500;
          line-height: 23.17px;
          cursor: default;
          color: rgba(51, 51, 51, 1);
        }
        button {
          width: 64px;
          height: 24px;
          font-size: 16px;
          font-weight: 500;
          line-height: 23.17px;
          border: none;
          background: none;
          cursor: pointer;
          color: rgba(30, 135, 240, 1);
        }
      }
    }
    button.register {
      position: relative;
      width: 347.39px;
      height: 44.69px;
      margin-top: 94px;
      border-radius: 6px;
      border: none;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 5px;
      line-height: 16px;
      color: white;
      cursor: pointer;
      background: rgba(0, 129, 255, 1);
    }
  }
  .registerRight {
    position: relative;
    width: 482px;
    height: 100%;
    border-radius: 8px 0px 0px 8px;
    background: linear-gradient(
      134.72deg,
      rgba(255, 61, 87, 1) 0%,
      rgba(255, 138, 72, 1) 100%
    );

    .divIcon {
      display: flex;
      position: absolute;
      align-items: center;
      left: 36px;
      top: 35px;
      span {
        color: white;
        margin-left: 17px;
      }
    }
    button.b_register {
      position: absolute;
      right: 34px;
      top: 34px;
      height: 44.69px;
      padding: 10px;
      font-size: 20px;
      font-weight: 700;
      line-height: 20px;
      color: white;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 1);
      background: none;
    }
    p.welcomeText {
      position: absolute;
      width: 342px;
      height: 122px;
      left: 71px;
      top: 161px;
      text-align: center;
      color: white;
      font-weight: 700;
      span:nth-of-type(1) {
        font-size: 30px;
        line-height: 38px;
      }
      span:nth-of-type(2) {
        font-size: 35px;
        line-height: 50px;
      }
      span:nth-of-type(3) {
        font-size: 30px;
        line-height: 38px;
      }
    }
    p.welcomeEN {
      position: absolute;
      left: 77px;
      top: 304px;
      width: 328px;
      height: 79px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      color: white;
    }
  }
}
</style>
