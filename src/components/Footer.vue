<template>
  <div class="nav">
    <div class="nav-peo" @click="gotalk">
      <img src="../assets/jiapeo.png" alt />
      <span v-if="btn"></span>
      <p>咨询</p>
    </div>
    <div class="nav-msg" >
      <h5>咨询师</h5>
      <p>在线分析</p>
    </div>
    <button @click="show(82,'预约看房')">
      <img src="../assets/time.png" />预约看房
    </button>
    <a :href="'tel:'+tel">
      <button class="nav-tel">
        <img src="../assets/bartel.png" />电话咨询
      </button>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    tel: {
      type: String,
      required: true,
      
    },
  },
  data(){
    return {
      url: "",
      btn:false
    }
  },
  methods: {
    show(id, name) {
      this.$emit("fot", { position: id, name: name });
    },
    gotalk() {
      window.location.href =
        "http://www.jy1980.com:9191/hangzhou/talk?reconnect=" + this.url;
    },
  },
  mounted() {
    let url = window.location.href;
    let newurl = url.split("?")[0];
    let id = this.$route.params.id;
    let name = sessionStorage.getItem("buildname");
    newurl += `?proid=${id}&name=${name}`;
    newurl = encodeURIComponent(newurl);
    this.url = newurl;
    setTimeout(()=>{
      this.btn = true
    },2000)
    url = url.split("?")[1];
    if (url && url.indexOf("token") != -1) {
      localStorage.setItem("wstoken", url.split("=")[1]);
    }
  },
};
</script>
<style lang="less" scoped>
.nav {
  position: fixed;
  width: 92%;
  height: 3.75rem;
  background-color: #fff;
  padding: 0 4%;
  bottom: 0;
  display: flex;
  z-index: 1000;
  align-items: center;
  .nav-peo {
    position: relative;
    margin-right: 0.3125rem;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
    span {
      display: block;
      width: 0.8125rem;
      height: 0.8125rem;
      border-radius: 50%;
      text-align: center;
      line-height: 0.8125rem;
      font-size: 0.625rem;
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      background-color: #f34f4f;
    }
    p {
      width: 2.25rem;
      height: 0.8125rem;
      border-radius: 0.40625rem;
      text-align: center;
      line-height: 0.8125rem;
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      color: #ac8125;
      font-size: 0.625rem;
      position: absolute;
      bottom: 0;
    }
  }
  .nav-msg {
    margin-right: 1.25rem;
    h5 {
      color: #222324;
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    p {
      color: #696a6d;
      font-size: 0.75rem;
    }
  }
  button {
    width: 6.875rem;
    height: 2.5rem;
    border-radius: 0.1875rem;
    background: linear-gradient(
      0deg,
      rgba(247, 214, 126, 1),
      rgba(254, 233, 173, 1)
    );
    text-align: center;
    line-height: 2.5rem;
    color: #ac8125;
    font-size: 0.9375rem;
    border: 0;
    img {
      width: 0.9375rem;
      margin-bottom: -0.125rem;
      margin-right: 0.25rem;
    }
  }
  .nav-tel {
    margin-left: 0.625rem;
    color: #fce5a0;
    background: linear-gradient(
      0deg,
      rgba(45, 47, 49, 1),
      rgba(153, 153, 153, 1)
    );
  }
}
</style>