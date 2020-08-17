<template>
  <div id="Login">
    <header>
      <img src="../assets/leftgo.png" alt @click="back" />
      手机快捷登录
    </header>
    <img class="topimg" src="../assets/loginimg.jpg" alt />
    <div class="con">
      <div class="tel">
        <img src="../assets/loginpeo.png" alt />
        <input type="tel" placeholder="请输入您手机号" v-model="tel" />
        <span @click="send" class="t-b-scode">获取验证码</span>
      </div>
      <div class="tel">
        <img src="../assets/loginpass.png" alt />
        <input type="number" placeholder="请输入您验证码" v-model="pass" />
      </div>
      <p class="xiyi">
        <input type="checkbox" v-model="check" />我已阅读
        <router-link :to="'/'">《易得房用户协议》</router-link>
      </p>
      <button @click="log">登录</button>
    </div>
  </div>
</template>
<script>
import { sendmsg, logsure,putmsg } from "../api/api";
export default {
  data() {
    return {
      tel: "",
      pass: "",
      check: true,
    };
  },
  methods: {
    back() {
      if (sessionStorage.getItem("back")) {
        this.$router.push(sessionStorage.getItem("back"));
      } else {
        this.$router.go(-1);
      }
    },
    send() {
      var phone = this.tel;
      let check = this.check;
      if (!check) {
        this.$toast("请勾选用户协议");
        return;
      }
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.$toast("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.$toast("手机号码不合法");
        return;
      }
      let ip = ip_arr["ip"];
      sendmsg({ ip: ip, phone: phone, source: 3 }).then((res) => {
        console.log(res);
        if (res.data.code == 500) {
          this.$toast(res.data.msg);
        } else {
          var time = 60;
          var fn = function () {
            time--;
            if (time > 0) {
              $(".t-b-scode").html("重新发送" + time + "s");
              $(".t-b-scode").attr("disabled", true);
            } else {
              clearInterval(interval);
              $(".t-b-scode").html("获取验证码");
              $(".t-b-scode").attr("disabled", false);
            }
          };
          fn();
          var interval = setInterval(fn, 1000);
        }
      });
    },
    log() {
      var phone = this.tel;
      let check = this.check;
      if (!check) {
        this.$toast("请勾选用户协议");
        return;
      }
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.$toast("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.$toast("手机号码不合法");
        return;
      }
      let ip = ip_arr["ip"];
      if (!this.pass) {
        this.$toast("请输入验证码");
        return;
      }
      let pass = this.pass;
      let id = this.$route.params.id
      putmsg({
        tel: phone,
        page: 7,
        project: id,
        remark: "",
        source: "线上推广3",
        name: "未知",
        position: 80,
      }).then((res) => {});
      logsure({ phone: phone, code: pass, source: 3, ip: ip }).then((res) => {
        if (res.data.code == 200) {
          this.$cookies.set('token',res.data.token,21600)
          this.$cookies.set('tel',phone,21600)
          if (sessionStorage.getItem("back")) {
            this.$router.push(sessionStorage.getItem("back"));
          } else {
            this.$router.go(-1);
          }
        } else {
          this.$toast("登录失败");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
header {
  width: 100%;
  height: 2.75rem;
  text-align: center;
  line-height: 2.75rem;
  color: #333333;
  font-size: 1.125rem;
  position: relative;
  img {
    width: 1.125rem;
    position: absolute;
    left: 4%;
    top: 0.75rem;
  }
}
.topimg {
  width: 100%;
}
.con {
  width: 17.1875rem;
  height: 19.375rem;
  box-shadow: 0px 5px 20px 0px rgba(223, 223, 223, 0.91);
  background-color: #fff;
  position: absolute;
  left: 1.5625rem;
  top: 11.53125rem;
  padding: 0 1.5625rem;
  .tel {
    margin-top: 2.6rem;
    position: relative;
    img {
      width: 1.125rem;
      position: absolute;
      left: 0;
      top: 0.875rem;
    }
    input {
      height: 3.125rem;
      border: 0;
      outline: none;
      border-bottom: 0.03125rem solid #f2f3f5;
      padding-left: 1.875rem;
      width: 15.625rem;
    }
    span {
      position: absolute;
      color: #d1a23d;
      font-size: 0.9375rem;
      right: 0;
      top: 0.875rem;
    }
  }
  .tel:nth-of-type(2) {
    margin-top: 1.125rem;
  }
  .xiyi {
    color: #626466;
    font-size: 0.6875rem;
    margin-top: 0.625rem;
    margin-bottom: 2.5rem;
    input {
      width: 0.6875rem;
      height: 0.6875rem;
      -webkit-appearance: none;
      border: 0.03125rem solid #e6e6e6;
      margin-right: 0.3125rem;
    }
    input:checked {
      background: url("../assets/checkbox.png") no-repeat 50%;
      background-size: 90%;
    }
    a {
      color: #d1a23d;
    }
  }
  button {
    width: 17.1875rem;
    height: 2.75rem;
    border-radius: 1.375rem;
    font-size: 1rem;
    color: #fff;
    background: linear-gradient(
      270deg,
      rgba(209, 162, 61, 1),
      rgba(236, 194, 106, 1)
    );
    box-shadow: 0px 3px 7.5px 0px rgba(206, 153, 39, 0.28);
    border: 0;
  }
}
</style>