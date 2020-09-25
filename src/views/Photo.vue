<template>
  <div id="photo" v-wechat-title="proname">
    <nav>
      <img class="logo" src="../assets/logo.png" alt />
      <span>楼盘相册</span>
      <img class="list" src="../assets/list.png" alt @click="show=true" />
    </nav>
    <div class="imgs">
      <h4>效果图({{effect.length}})</h4>
      <div class="imgs-con">
        <img v-lazy="item.small" alt v-for="(item,key) in effect" :key="key" @click="big(effectbig,key)" />
      </div>
    </div>
    <div class="imgs">
      <h4>实景图({{real.length}})</h4>
      <div class="imgs-con">
        <img v-lazy="item.small" alt v-for="(item,key) in real" :key="key" @click="big(realbig,key)" />
      </div>
    </div>
    <div class="imgs">
      <h4>样板房({{example.length}})</h4>
      <div class="imgs-con">
        <img v-lazy="item.small" alt v-for="(item,key) in example" :key="key"
        @click="big(examplebig,key)" />
      </div>
    </div>
    <div class="imgs">
      <h4>配套({{matching.length}})</h4>
      <div class="imgs-con">
        <img v-lazy="item.small" alt v-for="(item,key) in matching" :key="key" @click="big(matchingbig,key)" />
      </div>
    </div>
    <div class="imgs">
      <h4>交通图({{traffic.length}})</h4>
      <div class="imgs-con">
        <img v-lazy="item.small" alt v-for="(item,key) in traffic" :key="key" @click="big(trafficbig,key)" />
      </div>
    </div>
    <div class="hu">
      <h4>户型图({{departments.length}})</h4>
      <div class="imgs-con">
        <div class="img" v-for="(item,key) in departments" :key="key">
          <img v-lazy="item.small" alt @click="big(departmentsbig,key)" />
        </div>
      </div>
    </div>
    <foot :tel="tel" @fot="chang($event)"></foot>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="3"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}" @click-overlay="typebtn = 0">
      <popup :typenum="typenum" :id="id" :name="name" @close="cli($event)" :typebtn="typebtn"></popup>
    </van-popup>
  </div>
</template>
<script>
import footer from "../components/Footer";
import { getimgs } from "../api/api";
import list from "../components/List";
import popup from "../components/Popup";
import { ImagePreview } from "vant";
export default {
  components: {
    foot: footer,
    list,
    popup,
  },
  data() {
    return {
      id: "",
      tel: "",
      name: "",
      tan: false,
      typenum: 0,
      show: false,
      id: 0,
      typebtn: 1,
      effect: [],
      effectbig:[],
      example: [],
      examplebig:[],
      real: [],
      realbig:[],
      traffic: [],
      trafficbig: [],
      matching: [],
      matchingbig: [],
      departments: [],
      departmentsbig: [],
      proname:''
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      let token = this.$cookies.get('token');
      this.id = Number(id);
      getimgs({ id: id, token: token }).then((res) => {
        console.log(res);
        this.effect = res.data.imgs.effect;
        this.effectbig = []
        for(let val of res.data.imgs.effect){
          this.effectbig.push(val.big)
        }
        this.example = res.data.imgs.example;
        for(let val of res.data.imgs.example){
          this.examplebig.push(val.big)
        }
        this.real = res.data.imgs.real;
        for(let val of res.data.imgs.real){
          this.realbig.push(val.big)
        }
        this.traffic = res.data.imgs.traffic;
        for(let val of res.data.imgs.traffic){
          this.trafficbig.push(val.big)
        }
        this.matching = res.data.imgs.matching;
        for(let val of res.data.imgs.matching){
          this.matchingbig.push(val.big)
        }
        this.departments = res.data.imgs.departments;
        for(let val of res.data.imgs.departments){
          this.departmentsbig.push(val.big)
        }
      });
    },
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
      this.typebtn = 1;
    },
    big(arr, k) {
      ImagePreview({
        images: arr,
        startPosition: k,
        onClose() {
          // do something
        },
      });
    },
    cli(e){
      this.tan = e
    }
  },
  created() {
    this.proname = sessionStorage.getItem('buildname') ? sessionStorage.getItem('buildname') : '易得房'
    this.start();
  },
};
</script>
<style lang="less" scoped>
nav {
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  position: relative;
  margin-bottom: 1.25rem;
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
}
.imgs {
  padding: 0 4%;
  margin-bottom: 1.875rem;
  h4 {
    color: #2f3133;
    font-size: 1rem;
    margin-bottom: 1.25rem;
    font-weight: bold;
  }
  .imgs-con {
    img {
      width: 6.75rem;
      height: 5rem;
      border-radius: 0.1875rem;
      margin-right: 0.625rem;
      margin-bottom: 0.625rem;
    }
    img:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
.imgs:nth-of-type(1) {
  padding-top: 3.75rem;
}
.hu {
  margin-bottom: 5rem;
  padding: 0 4%;
  h4 {
    color: #2e3033;
    font-size: 1rem;
    margin-bottom: 1.125rem;
    font-weight: bold;
  }
  .imgs-con {
    overflow: hidden;
    .img {
      float: left;
      width: 6.75rem;
      height: 5rem;
      border-radius: 0.1875rem;
      background-color: #fafafa;
      text-align: center;
      margin-right: 0.625rem;
      margin-bottom: 0.625rem;
      img {
        width: 3.28125rem;
        height: 5rem;
      }
    }
    .img:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>