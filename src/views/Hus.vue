<template>
  <div id="Hus" v-wechat-title="proname">
    <header>
      <img src="../assets/leftgo.png" alt class="back" @click="back" />
      <img src="../assets/logo.png" alt class="logo" />
      <img src="../assets/list.png" alt class="list" @click="show=true" />
    </header>
    <div class="hus">
      <div class="hus-con" v-for="(item,key) in departments" :key="key">
        <router-link :to="'/hudeal/'+id+'/'+item.id">
        <img v-lazy="item.img" alt />
        <div class="con-right">
          <h5>
            {{item.title}}
            <span>{{item.status}}</span>
            <p>
              <i>{{item.price}}</i>万起
            </p>
          </h5>
          <p class="con">特点：{{item.feature}}</p>
          <p class="con">建面：{{item.area}}m²</p>
          <p class="con">户型分析：{{item.analysis}}</p>
        </div>
        </router-link>
      </div>
    </div>
    <foot :tel="tel" @fot="chang($event)"></foot>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="0"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}" @click-overlay="typebtn = 0">
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
import { gethus } from "../api/api";
import list from "../components/List";
import foot from "../components/Footer";
import popup from "../components/Popup";
export default {
  data() {
    return {
      departments: [],
      show: false,
      id:'',
      tel:'',
      name: "",
      typebtn: 1,
      typenum: 0,
      tan: false,
      proname:''
    };
  },
  components: {
    list,
    popup,
    foot
  },
  methods: {
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
      this.typebtn = 1
    },
    start() {
      let id = this.$route.params.id;
      this.id=Number(id)
      let token = this.$cookies.get('token');
      gethus({ id: id, token: token }).then((res) => {
        console.log(res);
        this.departments = res.data.departments;
        this.tel = res.data.common.phone
      });
    },
    back(){
      this.$router.go(-1)
    },
    cli(e) {
      this.tan = e;
    },
  },
  created() {
    this.proname = sessionStorage.getItem('buildname') ? sessionStorage.getItem('buildname') : '易得房'
    this.start();
  },
};
</script>
<style lang="less" scoped>
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
.hus {
  padding: 3.75rem 4% 4.375rem 4%;
  h4 {
    color: #101214;
    font-size: 1.0625rem;
    margin-bottom: 1.5rem;
  }
  .hus-con {
    margin-bottom: 1.125rem;
    a {
      width: 100%;
      display: flex;
    }
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
      .con {
        color: #626466;
        font-size: 0.8125rem;
        margin-bottom: 0.3125rem;
        height: 1.0625rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 15.625rem;
      }
    }
  }
}
</style>