<template>
  <div class="Hudeal" v-cloak v-wechat-title="proname">
    <header>
      <img src="../assets/leftgo.png" alt class="back" @click="back" />
      <img src="../assets/logo.png" alt class="logo" />
      <img src="../assets/list.png" alt class="list" @click="show=true" />
    </header>
    <div class="topimg">
      <img v-lazy="now.img" alt />
    </div>
    <div class="hu-con">
      <h3>
        {{now.title}}
        <span>{{now.status}}</span>
      </h3>
      <div class="hu-msg">
        <p>
          单价：
          <span class="price">
            <i>{{now.single}}</i>元/m²起
          </span>
        </p>
        <p>
          总价：
          <span class="nol">{{now.price}}万</span>
        </p>
      </div>
      <div class="hu-msg">
        <p>
          建面：
          <span class="nol">{{now.area}}m²</span>
        </p>
        <p>
          层高：
          <span class="nol">{{now.height}}米</span>
        </p>
      </div>
      <p class="hu-type">
        特色：
        <span>{{now.feature}}</span>
      </p>
      <div class="hu-btn">
        <button class="b1" @click="showbox(59,'咨询详细户型')">
          <img src="../assets/zixun.png" alt />咨询详细户型
        </button>
        <button @click="showbox(61,'开盘提醒我')">
          <img src="../assets/tixing.png" alt />开盘提醒我
        </button>
      </div>
    </div>
    <div class="line"></div>
    <div class="peo">
      <img class="peoimg" v-lazy="staff.head_img" alt />
      <div class="peo-msg">
        <h6>
          {{staff.name}}
          <span>满意度5分</span>
        </h6>
        <p>
          最近咨询人数
          <span>{{staff.ServeNum}}</span>人
        </p>
      </div>
      <img src="../assets/msg.png" alt class="zixun" @click="gotalk" />
      <a :href="'tel:'+tel">
        <img src="../assets/tel.png" alt class="tel" />
      </a>
    </div>
    <div class="analyze">
      <h4>户型分析</h4>
      <p>{{now.analysis}}</p>
      <!-- <p>2.有两个卫生间，可供三口之家同时洗漱。</p> -->
      <button @click="showbox(59,'咨询详细户型')">咨询详细户型分析</button>
    </div>
    <div class="line"></div>
    <div class="hus">
      <h4>本楼盘其它户型</h4>
      <div class="hus-con" v-for="(item,key) in other" :key="key">
        <img v-lazy="item.img" alt />
        <div class="con-right">
          <h5>
            {{item.title}}
            <span>{{item.status}}</span>
            <p>
              <i>{{item.price}}</i>万起
            </p>
          </h5>
          <p class="hus-cons">特点：{{item.feature}}</p>
          <p class="hus-cons">建面：{{item.area}}m²</p>
          <p class="hus-cons">户型分析：{{item.analysis}}</p>
        </div>
      </div>
    </div>
    <foot :tel="tel" @fot="chang($event)"></foot>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="0"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}" @click-overlay="typebtn = 0">
      <popup :typenum="typenum" :id="id" :name="name" @close="cli($event)" :typebtn="typebtn"></popup>
    </van-popup>
  </div>
</template>
<script>
import { gethus } from "../api/api";
import footer from "../components/Footer";
import list from "../components/List";
import popup from "../components/Popup";
export default {
  components: {
    foot: footer,
    popup,
    list,
  },
  data() {
    return {
      show: false,
      id: 0,
      name: "",
      typebtn: 1,
      typenum: 0,
      tan: false,
      tel: "",
      now: {},
      other: [],
      staff: {},
      proname: "",
    };
  },
  methods: {
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
      this.typebtn = 1;
    },
    cli(e) {
      this.tan = e;
    },
    setnew() {
      alert("45646");
      this.typebtn = 0;
    },
    start() {
      let id = this.$route.params.id;
      let hid = this.$route.params.hid;
      this.id = Number(id);
      let token = this.$cookies.get("token");
      gethus({ id: id, token: token }).then((res) => {
        console.log(res);
        for (let key in res.data.departments) {
          if (res.data.departments[key].id == hid) {
            this.now = res.data.departments[key];
          }
        }
        res.data.departments.splice(
          res.data.departments.findIndex((item) => item.id == hid),
          1
        );
        this.other = res.data.departments;
        this.tel = res.data.common.phone;
        this.staff = res.data.common.staffs[0];
      });
    },
    back() {
      this.$router.go(-1);
    },
    showbox(id, name) {
      this.typenum = id;
      this.name = name;
      this.tan = true;
      this.typebtn = 1;
    },
    gotalk() {
      let url = window.location.href;
      let newurl = url.split("?")[0];
      let id = this.$route.params.id;
      let name = sessionStorage.getItem("buildname");
      newurl += `?proid=${id}&name=${name}`;
      newurl = encodeURIComponent(newurl);
      window.location.href =
        "http://www.jy1980.com:9191/hangzhou/talk?reconnect=" + newurl;
    },
  },
  created() {
    this.proname = sessionStorage.getItem("buildname")
      ? sessionStorage.getItem("buildname")
      : "易得房";
    this.start();
  },
};
</script>
<style lang="less" scoped>
[v-cloak] {
  display: none !important;
}
header {
  height: 2.5rem;
  position: fixed;
  width: 100%;
  text-align: center;
  box-shadow: 0px 0.5px 5px 0px rgba(38, 36, 37, 0.05);
  background-color: #fff;
  .back {
    width: 1rem;
    position: absolute;
    left: 4%;
    top: 0.875rem;
  }
  .logo {
    width: 3.875rem;
    margin-top: 0.5rem;
  }
  .list {
    width: 1.25rem;
    position: absolute;
    right: 4%;
    top: 0.875rem;
  }
}
.topimg {
  width: 100%;
  height: 12.5rem;
  background-color: #f7f7f7;
  text-align: center;
  padding-top: 2.5rem;
  img {
    width: 7.8125rem;
    height: 12.5rem;
  }
}
.hu-con {
  padding: 0 4%;
  h3 {
    color: #1f1f1f;
    font-size: 1.25rem;
    margin-top: 1.4375rem;
    margin-bottom: 1.4375rem;
    span {
      width: 2.375rem;
      height: 1.125rem;
      display: inline-block;
      border-radius: 0.125rem;
      background-color: #1cc363;
      text-align: center;
      line-height: 1.125rem;
      color: #fff;
      font-size: 0.75rem;
      margin-left: 0.5625rem;
    }
  }
  .hu-msg {
    margin-bottom: 0.75rem;
    display: flex;
    p {
      width: 50%;
      color: #626466;
      font-size: 0.875rem;
      .price {
        color: #ff5543;
        font-size: 0.75rem;
        i {
          font-style: normal;
          font-size: 1rem;
          font-weight: bold;
        }
      }
      .nol {
        color: #404040;
      }
    }
  }
  .hu-type {
    color: #626466;
    font-size: 0.875rem;
    margin-bottom: 1.875rem;
    span {
      color: #404040;
    }
  }
  .hu-btn {
    margin-bottom: 1.25rem;
    button {
      width: 10.4375rem;
      height: 2.5rem;
      border-radius: 0.25rem;
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      border: 0;
      text-align: center;
      line-height: 2.5rem;
      color: #ac8125;
      font-size: 0.9375rem;
      img {
        width: 1.125rem;
        margin-bottom: -0.25rem;
        margin-right: 0.25rem;
      }
    }
    .b1 {
      margin-right: 0.6875rem;
    }
  }
}
.line {
  width: 100%;
  height: 0.5rem;
  background-color: #f7f7f7;
}
.peo {
  padding: 1.25rem 4%;
  display: flex;
  border-bottom: 0.03125rem solid #f5f5f5;
  .peoimg {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin-right: 0.75rem;
  }
  .peo-msg {
    h6 {
      color: #2f3133;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 3.125rem;
        height: 0.875rem;
        border-radius: 0.125rem;
        text-align: center;
        line-height: 0.875rem;
        color: #fff;
        background-color: #628bb9;
        font-size: 0.625rem;
        margin-left: 0.375rem;
      }
    }
    p {
      font-size: 0.75rem;
      color: #8f8f8f;
      span {
        color: #ff5543;
      }
    }
  }
  .zixun {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1.5625rem;
    margin-left: 5rem;
  }
  .tel {
    width: 2.5rem;
    height: 2.5rem;
  }
}
.analyze {
  padding: 1.25rem 4%;
  h4 {
    color: #1f1f1f;
    font-size: 1.0625rem;
    margin-bottom: 1.125rem;
  }
  p {
    color: #626466;
    font-size: 0.875rem;
    line-height: 1.3125rem;
    margin-bottom: 1rem;
  }
  button {
    width: 100%;
    height: 2.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(
      0deg,
      rgba(247, 214, 126, 1),
      rgba(254, 233, 173, 1)
    );
    text-align: center;
    line-height: 2.5rem;
    color: #ac8125;
    font-size: 1rem;
    border: 0;
    margin-top: 0.625rem;
    font-weight: bold;
  }
}
.hus {
  padding: 1.125rem 4% 4.375rem 4%;
  h4 {
    color: #101214;
    font-size: 1.0625rem;
    margin-bottom: 1.5rem;
  }
  .hus-con {
    display: flex;
    margin-bottom: 1.125rem;
    img {
      width: 4.6875rem;
      height: 5.9375rem;
      border-radius: 0.125rem;
      margin-right: 0.875rem;
    }
    .con-right {
      h5 {
        color: #2f3133;
        font-size: 1.0625rem;
        margin-bottom: 0.875rem;
        span {
          width: 2.125rem;
          height: 1rem;
          text-align: center;
          line-height: 1rem;
          border-radius: 0.125rem;
          background-color: #2cd264;
          color: #fff;
          font-size: 0.6875rem;
          font-weight: 400;
          margin-left: 0.375rem;
          display: inline-block;
        }
        p {
          float: right;
          color: #ff5543;
          font-size: 0.75rem;
          font-weight: 400;
          i {
            font-style: normal;
            font-size: 1.125rem;
            font-weight: bold;
          }
        }
      }
      .hus-cons {
        color: #626466;
        font-size: 0.8125rem;
        margin-bottom: 0.3125rem;
        height: 1.0625rem;
        width: 16rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>