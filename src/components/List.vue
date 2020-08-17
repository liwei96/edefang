<template>
  <div id="list">
    <ul>
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
          name: "登录",
          img: require("../assets/login.png"),
          active: require("../assets/login-active.png"),
          url: "/login/",
        },
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
          url: "/introduce/",
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
  },
  created() {
    this.id = this.$route.params.id;
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
    }
    .active {
      background-color: #d1a23d;
      color: #fff;
    }
  }
}
</style>