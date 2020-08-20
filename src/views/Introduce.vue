<template>
  <div id="Introduce" v-wechat-title="proname">
    <header>
      <img class="logo" src="../assets/logo.png" alt />
      <span>楼盘简介</span>
      <img class="list" src="../assets/list.png" alt @click="show=true" />
    </header>
    <img src="../assets/introimg.jpg" alt class="topimg" />
    <ul class="icons">
      <li>
        <img src="../assets/pro.png" alt />
        <p>臻品项目</p>
      </li>
      <li>
        <img src="../assets/face.png" alt />
        <p>一对一服务</p>
      </li>
      <li>
        <img src="../assets/cir.png" alt />
        <p>持续生态圈</p>
      </li>
      <li>
        <img src="../assets/ser.png" alt />
        <p>品牌管理</p>
      </li>
    </ul>
    <div class="info">
      <h4>开发商介绍</h4>
      <div class="swiper-info">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img :src="main_img" alt />
          </div>
          <!-- <div class="swiper-slide">
            <img src="../assets/img-1.png" alt />
          </div>-->
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <p v-for="(item,k) in ps" :key="k">
        <em>{{item.substr(0,55)}}...</em>
        <span @click="more($event)" v-if="item.length>55">[查看全文]</span>
        <em class="kk">{{item}}</em>
      </p>
      <div class="info-btns">
        <button class="b1" @click="golou">了解楼盘</button>
        <button @click="about">关于我们</button>
      </div>
    </div>
    <div class="intro">
      <h4>品牌介绍</h4>
      <div class="swiper-icon">
        <div class="swiper-wrapper">
          <div class="swiper-slide" @click="goto">
            <h6>精品房源</h6>
            <p>{{introduce}}</p>
            <div class="intro-img">
              <img src="../assets/feature.png" alt />
            </div>
          </div>
          <div class="swiper-slide" @click="goto">
            <h6>商业体系</h6>
            <p>{{bus}}</p>
            <div class="intro-img">
              <img src="../assets/tixi.png" alt />
            </div>
          </div>
          <div class="swiper-slide" @click="goto">
            <h6>物业管理</h6>
            <p>{{property}}</p>
            <div class="intro-img">
              <img src="../assets/manage.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="imgs">
      <h4>
        楼盘图册
        <router-link :to="'/photo/'+id">
          <span>
            更多图册
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="swiper-imgs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,key) in imgs" :key="key">
            <img :src="item.small" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="dynamic">
      <h4>
        楼盘动态
        <router-link :to="'/dynamic/'+id">
          <span>
            全部动态
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="dynamic-con">
        <div class="newdynamic">
          <p class="dynamictime">
            {{news.time}}
            <span>最新</span>
          </p>
          <h5>最新房源动态</h5>
          <p class="con">{{news.content}}</p>
        </div>
        <div class="newdynamic pushdynamic">
          <p class="dynamictime">
            {{tui.time}}
            <span>加推</span>
          </p>
          <h5>最新加推楼盘</h5>
          <p class="con">{{tui.content}}</p>
        </div>
        <div class="circle"></div>
        <div class="sline"></div>
        <div class="sline l1"></div>
        <div class="circle c1"></div>
      </div>
    </div>
    <footer>
      <ul>
        <li @click="go('/index/')">楼盘首页</li>
        <li @click="go('/intro/')" class="active">楼盘简介</li>
        <li @click="go('/dynamic/')">楼盘动态</li>
        <li @click="go('/image/')">楼盘图册</li>
        <li @click="go('/about/')">联系我们</li>
      </ul>
      <p class="foot-info">
        <img src="../assets/logo.png" alt />
        杭州易得房科技有限公司版权所有
      </p>
      <p class="foot-info">电话：{{tel}}</p>
      <p class="foot-web">
        网络经营许可证：
        <a href>浙ICP备18057005号</a>
      </p>
    </footer>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="1"></list>
    </van-popup>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { getdeve } from "../api/api";
import list from "../components/List";
export default {
  data() {
    return {
      ps: [],
      imgs: [],
      news: {},
      tui: {},
      id: "",
      show: false,
      tel: "",
      bus: "",
      introduce: "",
      property: "",
      main_img: "",
      isover: true,
      proname:''
    };
  },
  components: {
    list,
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id = id;
      let token = this.$cookies.get('token');
      getdeve({ id: id, token: token }).then((res) => {
        this.ps = res.data.data.builders.contents;
        this.imgs = res.data.data.imgs;
        this.news = res.data.data.dynamics[0];
        this.tui = res.data.data.dynamics[1];
        this.tel = res.data.common.phone;
        this.bus = res.data.data.business;
        this.property = res.data.data.property;
        this.introduce = res.data.data.introduce;
        this.main_img = res.data.data.main_img;
      });
    },
    about() {
      let id = this.$route.params.id;
      this.$router.push("/about/" + id);
    },
    golou() {
      let id = this.$route.params.id;
      this.$router.push("/index/" + id);
    },
    go(url) {
      this.$router.push(url + this.id);
    },
    goto() {
      this.$router.push("/brand/" + this.id);
    },
    more(e) {
      let now = e.target;
      now.nextElementSibling.style.display = "block";
      now.style.display = "none";
      now.previousElementSibling.style.display = "none";
    },
  },
  mounted() {
    this.proname = sessionStorage.getItem('buildname') ? sessionStorage.getItem('buildname') : '易得房'
    this.start();
  },
  updated() {
    var swiper05 = new Swiper(".swiper-icon", {
      slidesPerView: 2.5,
      spaceBetween: 10,
      slidesOffsetAfter: 12,
      slidesOffsetBefore: 14,
    });
    var ss = new Swiper(".swiper-imgs", {
      slidesPerView: 2.5,
      spaceBetween: 10,
      slidesOffsetAfter: 12,
      slidesOffsetBefore: 14,
    });
    var swiper06 = new Swiper(".swiper-info", {
      slidesPerView: 1,
      spaceBetween: 0,
      // autoplay:true,
      pagination: {
        el: ".swiper-pagination",
        // type:'custom',
        // currentClass : 'info-bar-active',
        // bulletClass : 'info-bar',
      },
    });
  },
};
</script>
<style lang="less" scoped>
header {
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  position: relative;
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
  span {
    color: #2f3133;
    font-size: 1rem;
    font-weight: bold;
  }
}
.topimg {
  width: 100%;
  height: 11.25rem;
}
.icons {
  padding: 0 4%;
  display: flex;
  margin-top: 1.875rem;
  margin-bottom: 2.1875rem;
  li {
    list-style: none;
    text-align: center;
    width: 25%;
    img {
      width: 1.875rem;
      height: 1.875rem;
      margin-bottom: 0.9375rem;
    }

    p {
      color: #2f3133;
      font-size: 0.8125rem;
    }
  }
}
.info {
  padding: 0 4%;
  margin-bottom: 2.5rem;
  h4 {
    color: #101214;
    font-size: 1.0625rem;
    font-weight: bold;
    margin-bottom: 1.125rem;
  }
  img {
    width: 100%;
    height: 9.375rem;
  }
  .swiper-info {
    margin-bottom: 1.125rem;
    position: relative;
    overflow: hidden;
    /deep/.swiper-pagination-bullet {
      width: 0.46875rem;
      height: 0.125rem;
      background-color: #999999;
    }
    /deep/.swiper-pagination-bullet-active {
      width: 0.9375rem;
      background-color: #fff;
    }
  }
  p {
    color: #626466;
    font-size: 0.875rem;
    line-height: 1.40625rem;
    text-indent: 1.75rem;
    margin-bottom: 1.125rem;
    span {
      color: #628bb9;
    }
    em {
      font-style: normal;
    }
    .kk {
      display: none;
    }
  }
  .info-btns {
    display: flex;
    justify-content: center;
    button {
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      width: 7.5rem;
      height: 1.875rem;
      border-radius: 0.125rem;
      text-align: center;
      line-height: 1.875rem;
      color: #ac8125;
      font-size: 0.875rem;
      border: 0;
      font-weight: bold;
    }
    .b1 {
      margin-right: 2.1875rem;
    }
  }
}
.intro {
  margin-bottom: 2.5rem;
  h4 {
    color: #101214;
    padding: 0 4%;
    font-size: 1.0625rem;
    margin-bottom: 1.0625rem;
  }
  .swiper-icon {
    overflow: hidden;
    padding: 5px 0;
    .swiper-slide {
      border: 0.03125rem solid rgba(240, 241, 245, 1);
      box-shadow: 0px 0.15625rem 0.375rem 0px rgba(0, 0, 0, 0.05);
      border-radius: 0.375rem;
      h6 {
        color: #2e3033;
        font-size: 0.9375rem;
        margin-bottom: 0.375rem;
        padding: 0.75rem 0 0 0.625rem;
      }
      p {
        color: #626466;
        font-size: 0.75rem;
        margin-bottom: 0.5625rem;
        padding-left: 0.625rem;
        overflow: hidden;
        height: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .intro-img {
        text-align: center;
        img {
          width: 2.625rem;
          height: 2.625rem;
          margin-bottom: 0.625rem;
        }
      }
    }
  }
}
.imgs {
  margin-bottom: 2.5rem;
  h4 {
    padding: 0 4%;
    font-size: 1.0625rem;
    color: #101214;
    line-height: 1.375rem;
    margin-bottom: 1.5rem;
    span {
      color: #628bb9;
      float: right;
      font-size: 0.875rem;
      font-weight: 400;
      img {
        width: 0.9375rem;
        margin-bottom: -0.125rem;
        margin-left: 0.125rem;
      }
    }
  }
  .swiper-imgs {
    overflow: hidden;
    .swiper-slide {
      img {
        width: 8.75rem;
        height: 6.25rem;
        border-radius: 0.375rem;
      }
    }
  }
}
.dynamic {
  padding: 0 4% 2.5rem 4%;
  h4 {
    font-size: 1.0625rem;
    color: #101214;
    line-height: 1.375rem;
    margin-bottom: 1.5rem;
    span {
      color: #628bb9;
      float: right;
      font-size: 0.875rem;
      font-weight: 400;
      img {
        width: 0.9375rem;
        margin-bottom: -0.125rem;
        margin-left: 0.125rem;
      }
    }
  }
  .dynamic-con {
    padding-left: 0.75rem;
    position: relative;
    .newdynamic {
      .dynamictime {
        color: #919499;
        font-size: 0.75rem;
        margin-bottom: 0.75rem;
        span {
          width: 2rem;
          height: 0.9375rem;
          border-radius: 0.375rem 0 0.375rem 0;
          background: linear-gradient(
            90deg,
            rgba(246, 67, 43, 0.96),
            rgba(255, 127, 114, 0.96)
          );
          color: #fff;
          font-size: 0.6875rem;
          text-align: center;
          line-height: 0.9375rem;
          display: inline-block;
          margin-left: 0.375rem;
        }
      }
      h5 {
        color: #1f1f1f;
        font-size: 1.0625rem;
        margin-bottom: 0.625rem;
      }
      .con {
        color: #5c5c5c;
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-bottom: 1.4375rem;
        height: 2.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .pushdynamic {
      .dynamictime {
        span {
          background: linear-gradient(
            270deg,
            rgba(209, 162, 61, 1),
            rgba(232, 187, 91, 1)
          );
        }
      }
    }
    .circle {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: #dfe1e6;
      position: absolute;
      left: 0;
      top: 0.25rem;
    }
    .c1 {
      top: 9.875rem;
    }
    .sline {
      background-color: #dfe1e6;
      width: 0.0625rem;
      height: 9.5rem;
      position: absolute;
      left: 0.21875rem;
      top: 0.375rem;
    }
    .l1 {
      top: 10rem;
      height: 3.75rem;
    }
  }
}
footer {
  padding: 0.625rem 0 0.625rem 4%;
  background-color: #ededed;
  ul {
    display: flex;
    margin-bottom: 0.6875rem;
    li {
      list-style: none;
      color: #969799;
      font-size: 0.75rem;
      padding-right: 0.8125rem;
      padding-left: 0.8125rem;
      border-right: 0.03125rem solid #999999;
    }
    .active {
      color: #626466;
    }
    li:nth-of-type(5) {
      border: 0;
      padding-right: 0;
    }
    li:nth-of-type(1) {
      padding-left: 0;
    }
  }
  .foot-info {
    color: #949699;
    font-size: 0.75rem;
    padding-bottom: 0.375rem;
    img {
      width: 2.625rem;
    }
  }
  .foot-web {
    color: #949699;
    font-size: 0.6875rem;
    a {
      color: #495568;
    }
  }
}
</style>