<template>
  <div class="app" v-wechat-title="proname">
    <header>
      <img class="logo" src="../assets/logo.png" alt />
      <span>楼盘动态</span>
      <img class="list" src="../assets/list.png" alt @click="show=true" />
    </header>
    <div class="con">
      <div class="box1" v-for="(item,key) in list" :key="key">
        <div class="quan1"></div>
        <div class="time">{{item.time}}</div>
        <h5>{{item.title}}</h5>
        <p>
          <em>
            {{item.introduce.substr(0,60)}}
            <em v-if="item.introduce.length>60">...</em>
          </em>
          <span v-if="item.introduce.length>60" @click="showmore($event)">[全文]</span>
          <em class="kk">{{item.introduce}}</em>
        </p>
      </div>
    </div>

    <foot :tel="tel" @fot="chang($event)"></foot>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="2"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}" @click-overlay="typebtn =0">
      <popup
        :typenum="typenum"
        :id="id"
        :name="name"
        @close="cli($event)"
        :typebtn="typebtn"
      ></popup>
    </van-popup>
  </div>
</template>
<script>
import footer from "../components/Footer";
import popup from "../components/Popup";
import list from "../components/List";
import { getdynamics } from "../api/api";
export default {
  components: {
    foot: footer,
    list,
    popup,
  },
  data() {
    return {
      list: [],
      tel: "",
      name: "",
      tan: false,
      typenum: 0,
      show: false,
      id: 0,
      typebtn: 1,
      num: -1,
      page: 2,
      isover: true,
      proname:''
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id = Number(id);
      let token = this.$cookies.get('token');
      getdynamics({ id: id, token: token, page: 1, limit: 10 }).then((res) => {
        console.log(res);
        this.list = res.data.data;
        this.tel = res.data.common.phone;
      });
    },
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
      this.typebtn =1
    },
    scroll() {
      var scrollTop = window.scrollY;
      var scrollHeight = window.screen.availHeight;
      var windowHeight = document.body.scrollHeight;
      // console.log(scrollTop, scrollHeight, windowHeight);
      if (scrollTop + scrollHeight >= windowHeight) {
        console.log(123);
        this.getmore();
      }
    },
    getmore() {
      let p = this.page;
      let that = this;
      if (this.isover) {
        this.isover = false;
        let id = this.$route.params.id;
        let token = this.$cookies.get('token');
        getdynamics({ id: id, token: token, page: p, limit: 10 }).then(
          (res) => {
            that.isover = true;
            that.page = that.page + 1;
            that.list = that.list.concat(res.data.data);
          }
        );
      }
    },
    showmore(e) {
      let now = e.target;
      now.nextElementSibling.style.display = "block";
      now.style.display = "none";
      now.previousElementSibling.style.display = "none";
    },
    cli(e) {
      this.tan = e;
    },
  },
  created() {
    this.proname = sessionStorage.getItem('buildname') ? sessionStorage.getItem('buildname') : '易得房'
    this.start();
    window.addEventListener("scroll", this.scroll);
  },
};
</script>

<style lang="less">
.app {
  header {
    text-align: center;
    height: 2.75rem;
    line-height: 2.75rem;
    position: relative;
    font-weight: bold;
    .logo {
      position: absolute;
      left: 4%;
      width: 4.0625rem;
      top: 0.625rem;
    }
    .list {
      width: 1.5rem;
      position: absolute;
      right: 4%;
      top: 0.625rem;
    }
  }
  .con {
    padding-bottom: 3.75rem;
  }
  .box1 {
    position: relative;
    margin: 0.9375rem 1.2625rem 0.9375rem 1.25rem;
    padding-left: 0.625rem;
    border-left: 0.0625rem solid rgba(223, 225, 230, 1);
    .quan1 {
      position: absolute;
      top: -0.2125rem;
      left: -0.325rem;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(223, 225, 230, 1);
      border-radius: 50%;
    }
    .time {
      //   margin-left: 0.625rem;
      font-size: 0.75rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(145, 148, 153, 1);
      position: relative;
      top: -0.5rem;
    }
    h5 {
      font-size: 1.0625rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(31, 31, 31, 1);
      margin-top: 0.6rem;
    }
    p {
      font-size: 0.875rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(92, 92, 92, 1);
      line-height: 1.25rem;
      margin-top: 0.6875rem;
      padding-bottom: 0.6875rem;
      span {
        color: skyblue;
      }
      em {
        font-style: normal;
      }
      .kk {
        display: none;
      }
    }
  }
}
</style>