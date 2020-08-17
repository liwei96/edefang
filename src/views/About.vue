<template>
  <div class="about">
    <header>
      <img class="logo" src="../assets/logo.png" alt />
      <span>联系我们</span>
      <img class="list" src="../assets/list.png" alt @click="show=true" />
    </header>
    <img src="../assets/img-1.png" alt class="topimg" />
    <div class="serve">
      <h4>开发商介绍</h4>
      <p v-for="(item,key) in introduces" :key="key">
        <em>{{item.substr(0,50)}}...</em>
        <span v-if="item.length>50" @click="showmore($event)">[展开]</span>
        <em class="kk">{{item}}</em>  
      </p>
    </div>
    <div class="telserve">
      <h4>联系开发商</h4>
      <div id="map"></div>
      <div class="buildtel">    
        <p>售楼处电话</p>
        <h3>{{tel}}</h3>
      </div>
      <div class="time">
        <h6>营业时间</h6>
        <p>周一至周日上午8：00—晚上20：00</p>
      </div>
      <p class="tishi">您也可以留下您的电话号码，我们会第一时间与您取 得联系!</p>
      <div class="form">
        <p>电话</p>
        <input type="number" placeholder="输入您的手机号" v-model="baoming" />
        <p>留言</p>
        <textarea placeholder="输入您的留言" v-model="con"></textarea>
        <button @click="put">提交</button>
      </div>
    </div>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }">
      <list :num="5"></list>
    </van-popup>
  </div>
</template>
<script>
import { aboutus, putmsg, checkmsg, sendmsg } from "../api/api";
import list from "../components/List";
export default {
  data() {
    return {
      id: 0,
      baidu: [],
      introduces: [],
      tel: "",
      show: false,
      isover: true,
      con: "",
      baoming: "",
    };
  },
  components: {
    list,
  },
  methods: {
    mmap() {
      this.over = false;
      let that = this;
      let baidu = this.baidu;
      let img = require("../assets/mappro.png");
      let pro = sessionStorage.getItem('buildname');
      let add = sessionStorage.getItem('buildaddress');
      AMap.convertFrom(baidu, "baidu", function (status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations; // Array.<LngLat>
          that.pois = [lnglats[0].lng, lnglats[0].lat];
          var map = new AMap.Map("map", {
            zoom: 14, //初始化地图层级
            center: that.pois, //初始化地图中心点
            zoomEnable: true,
            dragEnable: true,
          });
          let content = `<div
          style="width:140px;height: 36px;box-shadow:0px 0px 5px 0px rgba(6,0,1,0.1);border-radius:18px;padding-left: 17px;position: relative;background: #fff;">
          <div style="float: left;width:72%">
            <h5 style="color: #121212;font-size: 12px;margin:0;margin-top: .125rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${pro}</h5>
            <p style="color: #919499;font-size: 10px;margin:0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${add}</p>
          </div>
          <div style="float: left;"><img style="width: 29px;margin-top:3px" src="${img}" alt=""></div>
          <div
            style="position: absolute;border:8px solid transparent;border-top-color: #fff;bottom:-16px;left:50%;margin-left: -8px;">
          </div>
        </div>`;
          let marker = new AMap.Marker({
            content: content,
            position: that.pois,
            offset: new AMap.Pixel(-78, -44),
          });
          let con =
            '<div style="width: 24px;height: 24px;border-radius: 50%;background:rgba(228,186,75,0.3);position: relative;"><div style="width: 6px;height: 6px;border-radius: 50%;background:rgba(228,186,75,1);position: absolute;top:50%;left:50%;margin-top: -3px;margin-left: -3px;"></div></div>';
          let mark = new AMap.Marker({
            content: con,
            position: that.pois,
            offset: new AMap.Pixel(-12, -12),
          });
          mark.setMap(map);
          marker.setMap(map);
        }
      });
    },
    start() {
      let id = this.$route.params.id;
      this.id = Number(id);
      let token = this.$cookies.get('token');
      aboutus({ id: id, token: token }).then((res) => {
        this.baidu = [res.data.data.longitude, res.data.data.latitude];
        this.introduces = res.data.introduces;
        this.tel = res.data.common.phone;
      });
    },
    showmore(e) {
      let now = e.target;
      now.nextElementSibling.style.display = "block";
      now.style.display = "none";
      now.previousElementSibling.style.display = "none";
    },
    put() {
      let id = this.$route.params.id;
      let ip = ip_arr["ip"];
      var phone = this.baoming;
      var pattern_phone = /^1[3-9][0-9]{9}$/;
      if (phone == "") {
        this.$toast("手机号不能为空");
        return;
      } else if (!pattern_phone.test(phone)) {
        this.$toast("手机号码不合法");
        return;
      }
      let con = this.con
      if(!con) {
        this.$toast("留言不能为空");
        return;
      }
      putmsg({
        tel: phone,
        page: 7,
        project: id,
        remark: con,
        source: "线上推广3",
        name: "未知",
        position: 79,
      }).then((res) => {
        if(res.data.code == 200) {
          this.$toast('提交成功，我们会尽快与您联系')
        }
      });
    },
  },
  mounted() {
    this.start();
    // this.mmap();
  },
  updated() {
    if (this.isover) {
      this.mmap();
      this.isover = false;
    }
  },
};
</script>
<style lang="less" scoped>
header {
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  position: fixed;
  width: 100%;
  background-color: #fff;
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
  height: 9.375rem;
  padding-top: 2.75rem;
  margin-bottom: 1.5rem;
}
.serve {
  padding: 0 4%;
  margin-bottom: 2.125rem;
  h4 {
    color: #101214;
    font-size: 1.0625rem;
    font-weight: bold;
    margin-bottom: 1.125rem;
  }
  p {
    color: #626466;
    font-size: 0.875rem;
    line-height: 1.40625rem;
    margin-bottom: 1rem;
    text-indent: 1.75rem;
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
}
.telserve {
  padding: 0 4%;
  h4 {
    color: #101214;
    font-size: 1.0625rem;
    margin-bottom: 1.125rem;
  }
  #map {
    width: 100%;
    height: 9.375rem;
    border-radius: 0.375rem;
    margin-bottom: 1.1875rem;
  }
  .buildtel {
    p {
      color: #2f3133;
      font-size: 0.8125rem;
      margin-bottom: 0.25rem;
    }
    h3 {
      color: #e4ba4b;
      font-size: 1.875rem;
      font-weight: 400;
      margin-bottom: 1.125rem;
    }
  }
  .time {
    margin-bottom: 2.0625rem;
    h6 {
      color: #2f3133;
      font-size: 0.8125rem;
      margin-bottom: 0.625rem;
    }
    p {
      color: #626466;
      font-size: 0.875rem;
    }
  }
  .tishi {
    color: #2e3033;
    font-size: 0.9375rem;
    line-height: 1.375rem;
    margin-bottom: 1rem;
  }
  .form {
    p {
      color: #2e3033;
      font-size: 0.8125rem;
      margin-bottom: 0.625rem;
    }
    input {
      border: 0;
      outline: none;
      border-radius: 0.125rem;
      width: 98%;
      height: 2.25rem;
      margin-bottom: 1.25rem;
      background-color: #f7f8fa;
      padding-left: 2%;
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #626466;
      font-size: 0.875rem;
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #626466;
      font-size: 0.875rem;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #626466;
      font-size: 0.875rem;
    }
    textarea {
      width: 96%;
      height: 3.75rem;
      padding: 0.875rem 2%;
      background-color: #f7f8fa;
      border-radius: 0.125rem;
      border: 0;
      outline: none;
      margin-bottom: 1.875rem;
    }
    button {
      width: 100%;
      height: 2.5rem;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 2.5rem;
      color: #fff;
      font-size: 0.9375rem;
      background-color: #e4ba4b;
      border: 0;
      margin-bottom: 1.25rem;
    }
  }
}
</style>
