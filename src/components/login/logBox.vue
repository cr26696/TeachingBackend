<template>
  <div class="containerLoginBox">
    <div class="loginLeft">
      <div class="divIcon"><img :src="iconWhite" /><span>评估助手</span></div>
      <div style="position: relative;display: flex;">
        <button @click="form.accountNo = 'Unicorn';form.password = 'liyueyue123'">预设Teacher</button>
        <button @click="form.accountNo = 'admin';form.password = '123456'">预设Admin</button>
        <button @click="form.accountNo = 'superAdmin';form.password = '123456'">预设SU</button>
      </div>
      <button @click="form.accountNo = 'Bear';form.password = 'wangdandan123'">预设Teacher2</button>
        <p class="welcomeText">
        <span>欢迎登陆</span><br />
        <span>教学评估小助手</span><br />
        <span>后台应用系统!</span>
      </p>
      <p class="welcomeEN">
        Welcome to the login<br />
        Teaching assessment assistant Background<br />
        application system!
      </p>
    </div>
    <div class="loginRight">
      <span class="title">登录界面</span>
      <p>
        Teaching assessment assistant<br />
        Login screen
      </p>
      <div class="divInput">
        <input v-model="form.accountNo" type="text" placeholder="请输入账号" />
        <input v-model="form.password" type="text" placeholder="请输入密码" />
        <div>
          <input type="checkbox" />
          <span>记住密码</span>
          <button @click="emitChangeTo('forgetBox')">忘记密码</button>
        </div>
      </div>
      <button class="login" @click="handleLogin">立即登录</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import imgIconWhite from "@/assets/icon/icon_white.png";
import router from "@/router";
import axios from 'axios'
import {login} from '@/services/login.js'
export default {
  name: "loginBox",
  components: {},
  data() {
    return {
      iconWhite: imgIconWhite,
      token:'',
      form:{
        accountNo:'',
        password:'',
      }
    };
  },
  methods: {
    emitChangeTo(type) {
      this.$emit('subButtonClicked', type);
    },
    login() {
      window.localStorage.isAuthenticated = true;
      router.push('/')
    },
    async handleLogin() {
      try {
        const {data} = await login(this.form)
        if (data.code === 200){
          // console.log("returned data:")
          // console.log(data.data)
          this.$message.success('登陆成功')
          window.sessionStorage[data.data.tokenName] = data.data.tokenValue;
          window.sessionStorage.role = data.data.role;
          window.sessionStorage.staffNum = data.data.staffNum;
          window.localStorage.isAuthenticated = true
          router.push('/')
        } else {
          this.$message.error(data.msg)
        }
      } catch (err) {console.log(err)}

      // const { data: res } = await axios.post('http://localhost:8080/apis/auth/login', {
      // "accountNo": "superAdmin",
      // "password": "123456"
      // },{headers:{"satoken":'f6b17510-f630-4233-9e8b-864b149b9e1e'}})
      // console.log("已登录");
      // console.log(res)
      // window.localStorage.isAuthenticated = true;
      // this.token = res.data.tokenValue;
      // //router.push('/')
    },
    async handleQuery() {
      const { data: res } = await axios.get('http://localhost:8080/apis/auth/user_token_info',{
        headers:{
          "satoken":this.token
        }
      })
      console.log("已查询");
      console.log(res)
    }
  }
};
</script>

<style scoped lang="less">
.containerLoginBox {
  display: flex;
  position: relative;
  margin: 0 20px 0 20px;
  width: 1260px;
  height: 782px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 20px rgba(219, 231, 238, 1);

  .loginLeft {
    position: relative;
    width: 482px;
    height: 100%;
    border-radius: 8px 0px 0px 8px;
    background: linear-gradient(134.72deg,
        rgba(255, 61, 87, 1) 0%,
        rgba(255, 138, 72, 1) 100%);

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
      width: 91.6px;
      height: 44.69px;
      font-size: 20px;
      font-weight: 700;
      text-indent: 8px;
      letter-spacing: 8px;
      line-height: 20px;
      color: white;
      text-align: center;
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

  .loginRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    text-align: center;
    width: 778px;
    height: 100%;

    &>span {
      position: relative;
      width: 271.44px;
      height: 43px;
      font-size: 30px;
      font-weight: 700;
      line-height: 43.44px;
      margin-top: 148px;
    }

    &>p {
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

      &>input {
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

      &>div {
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

    button.login {
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
}</style>
