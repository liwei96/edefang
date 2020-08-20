<template>
  <div id="list">
    <ul>
      <li @click="login"><img src="../assets/login.png" alt="">{{msg}}<span @click.stop="logout" v-if="islog">退出</span></li>
      <li
        :class="num == key ? 'active' : ''"
        v-for="(item,key) in arr"
        :key="key"
        @click="go(item.url)"
      >
        <img :src="num == key ? item.active : item.img" alt />
        {{item.name}}
      </li>
    </ul>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [
        {
          name: "楼盘首页",
          img: require("../assets/home.png"),
          active: require("../assets/home-active.png"),
          url: "/index/",
        },
        {
          name: "楼盘简介",
          img: require("../assets/intro.png"),
          active: require("../assets/intro-active.png"),
          url: "/intro/",
        },
        {
          name: "楼盘动态",
          img: require("../assets/dynamic.png"),
          active: require("../assets/dynamic-active.png"),
          url: "/dynamic/",
        },
        {
          name: "楼盘图册",
          img: require("../assets/listimg.png"),
          active: require("../assets/listimg-active.png"),
          url: "/image/",
        },
        {
          name: "联系我们",
          img: require("../assets/contact.png"),
          active: require("../assets/contact-active.png"),
          url: "/about/",
        },
      ],
      id: "",
      msg:'登录',
      islog:false,
    };
  },
  props: {
    num: {
      type: Number,
      required: true,
    },
  },
  methods: {
    go(url) {
      this.$router.push(url + this.id);
    },
    login(){
      if(!this.$cookies.get('token')){
        this.$router.push('/login/' + this.id)
      }
    },
    logout(){
      this.$cookies.remove('token')
      this.$cookies.remove('tel')
      window.location.reload()
    }
  },
  created() {
    this.id = this.$route.params.id;
    if (this.$cookies.get("token")) {
      let tel =
        this.$cookies.get("tel").substr(0, 3) +
        "****" +
        this.$cookies.get("tel").substr(7);
        this.msg = tel
        this.islog = true
    }else{
      this.msg = '登录'
      this.islog=false
    }
  },
};
</script>
<style lang="less" scoped>
#list {
  ul {
    li {
      height: 3.4375rem;
      line-height: 3.4375rem;
      color: #616366;
      font-size: 1rem;
      padding-left: 1.5625rem;
      img {
        width: 1.375rem;
        margin-bottom: -0.3125rem;
        margin-right: 1rem;
      }
      span {
        font-size: .875rem;
        margin-left: .75rem;
        color: #4c5f8c
      }
    }
    .active {
      background-color: #d1a23d;
      color: #fff;
    }
  }
  
}
</style>