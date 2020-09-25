<template>
  <div id="deail">
    <nav>
      <img class="logo" src="../assets/logo.png" alt />
      <span>更多详情</span>
      <img class="list" src="../assets/list.png" alt @click="show = true" />
    </nav>
    <div class="con">
      <div class="title">
        <h3>{{build.name}}</h3>
        <p>
          <span class="status">{{build.status}}</span>
          <span class="zhuang">{{build.decorate}}</span>
          <span>地铁沿线</span>
        </p>
      </div>
      <div class="line"></div>
      <div class="basic">
        <h4>基本信息</h4>
        <p>
          参考单价：
          <span class="red">
            <i>{{build.single_price}}</i>元/m²
          </span>
        </p>
        <p>
          参考总价：
          <span class="red">
            <i>{{total}}</i>万起
          </span>
          <button @click="showbox(40,'获取最新成交价')"><img src="../assets/detail-msg.png">咨询最新底价</button>
        </p>
        <p>
          类 型：
          <span>{{build.type}}</span>
        </p>
        <p>
          户 型：
          <span>{{build.appartment}}</span>
          <em @click="go">更多户型<img src="../assets/detail-go.png"></em>
        </p>
        <p>
          楼盘地址：
          <span>{{build.address}}</span>
        </p>
      </div>
      <div class="line"></div>
      <div class="basic">
        <h4>销售信息</h4>
        <p>
          开盘时间：
          <span>{{build.opentime}}</span>
          <button @click="showbox(61,'开盘提醒我')"><img src="../assets/detail-news.png">最新开盘通知</button>
        </p>
        <p>
          加推时间：
          <span>2020-04-03</span>
        </p>
        <p>
          交房时间：
          <span>{{build.givetime}}</span>
        </p>
        <p>
          预 售 证：
          <span>{{build.presale}}</span>
        </p>
        <p>
          产权年限：
          <span>{{build.year}}年</span>
        </p>
        <p>
          开 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发 商：
          <span>{{build.builder}}</span>
        </p>
      </div>
      <div class="line"></div>
      <div class="basic">
        <h4>建筑信息</h4>
        <p>
          户型面积：
          <span>{{build.area}}m²</span>
        </p>
        <p>
          建筑面积：
          <span>{{build.build_area}}m²</span>
        </p>
        <p>
          容积率：
          <span>{{build.capicity_rate}}</span>
        </p>
        <p>
          绿化率：
          <span>{{build.green_rate}}%</span>
        </p>
        <p>
          层高：
          <span>{{build.height}}</span>
        </p>
        <p>
          车位情况：
          <span>{{build.parking}}</span>
        </p>
        <p>
          装修状况：
          <span>{{build.decorate}}</span>
        </p>
        <!-- <p>
          公交路线：
          <span>{{build.traffic.substr(0,18)}}</span>
        </p> -->
        <p>
          物业费用：
          <span>{{build.property_fee}}元/m²月</span>
        </p>
        <p>
          物业公司：
          <span>{{build.property}}</span>
        </p>
      </div>
      <div class="line"></div>
      <div class="ana">
        <h4>项目介绍</h4>
        <p>
          <em v-if="ismore">{{build.introduce.substr(0,60)}}..</em>
          <em v-if="!ismore">{{build.introduce}}</em>
          <span v-if="ismore" @click="ismore=false">展开</span>
        </p>
        <h4>项目优势</h4>
        <p>
            <i v-for="(item,key) in build.advantages" :key="key">{{item}}</i>
          <!-- <span>展开</span> -->
        </p>
      </div>
    </div>
    <food :tel="tel" @fot="chang($event)"></food>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="0"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}">
      <popup
        :typenum="typenum"
        :id="id"
        :name="name"
        @close="cli($event)"
        @click.native="setnew"
        :typebtn="typebtn"
      ></popup>
    </van-popup>
  </div>
</template>
<script>
import food from "../components/Footer";
import list from "../components/List";
import popup from "../components/Popup";
import { getdetail } from "../api/api";
export default {
  components: {
    food,
    list,
    popup,
  },
  data() {
    return {
      tel: "",
      id: 0,
      typebtn: 0,
      typenum: 0,
      show: false,
      tan: false,
      name: "",
      build:{},
      total:'',
      ismore:true
    };
  },
  methods: {
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
    },
    cli(e) {
      this.tan = e;
    },
    start(){
        let id = this.$route.params.id
        this.id = Number(id)
        let token = localStorage.getItem('token')
        getdetail({id:id,token:token}).then(res=>{
            console.log(res)
            this.build = res.data.data
            this.tel = res.data.common.phone
            this.total = this.build.total_price.split('-')[0]
        })
    },
    showbox(id, name) {
      this.typenum = id;
      this.name = name;
      this.tan = true;
    },
    go(){
        this.$router.push('/hus/'+this.id)
        
    }
  },
  created(){
      this.start()
  }
};
</script>
<style lang="less" scoped>
nav {
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  position: fixed;
  font-weight: bold;
  width: 100%;
  background-color: #fff;
  .logo {
    position: absolute;
    left: 4%;
    width: 4.0625rem;
    top: 0.625rem;
  }
  .list {
    width: 2.5rem;
    position: absolute;
    right: 4%;
    top: 0.625rem;
    height: 1.875rem;
  }
}
.con {
  padding-top: 2.75rem;
  .title {
    padding: 1.25rem 4% 0.9375rem 4%;
    h3 {
      color: #121212;
      font-size: 1.25rem;
      margin-bottom: 0.625rem;
    }
    p {
      span {
        color: #7d7d80;
        font-size: 0.6875rem;
        padding: 0.15625rem 0.3125rem;
        border-radius: 0.125rem;
        margin-right: 0.375rem;
        background-color: #f5f5f5;
      }
      .status {
        color: #2cd264;
        background-color: #e9f7ea;
      }
      .zhuang {
        color: #3eacf0;
        background-color: #ebf5fc;
      }
    }
  }
  .line {
    width: 100%;
    height: 0.625rem;
    background-color: #f7f7f7;
  }
  .basic {
    padding: 0 4%;
    h4 {
      color: #2f3133;
      font-size: 1rem;
      padding-top: 1.125rem;
      margin-bottom: 1.125rem;
    }
    p {
      color: #808080;
      font-size: 0.9375rem;
      border-top: 0.03125rem solid #f2f2f2;
      line-height: 2.8125rem;
      span {
        color: #2f3133;
      }
      .red {
        color: #fe582f;
        font-size: 0.5625rem;
        i {
          font-style: normal;
          font-size: 1.0625rem;
          font-weight: bold;
        }
      }
      button {
        width: 6.875rem;
        height: 2rem;
        border-radius: 0.1875rem;
        background-color: #f9f0d6;
        text-align: center;
        line-height: 2rem;
        color: #ac8125;
        font-size: 0.8125rem;
        border: 0;
        float: right;
        margin-top: 0.5rem;
        img {
            width: .9375rem;
            margin-bottom: -0.125rem;
            margin-right: .125rem;
        }
      }
      em {
        font-style: normal;
        color: #ac8125;
        font-style: 0.875rem;
        float: right;
        img {
            width: .9375rem;
            margin-bottom: -0.125rem;
            margin-left: .125rem;
        }
      }
    }
  }
  .ana {
    padding: 1.25rem 4%;
    margin-bottom: 1.25rem;
    h4 {
      color: #2f3133;
      font-style: 1rem;
      margin-bottom: 1.125rem;
    }
    p {
      color: #626466;
      font-style: 0.9375rem;
      line-height: 1.625rem;
      margin-bottom: 2rem;
      text-indent: 1.875rem;
      em {
          font-style: normal;
      }
      i {
          font-style: normal;
          display: block;
      }
      span {
        color: #628bb9;
      }
    }
  }
}
</style>