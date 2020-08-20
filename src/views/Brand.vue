<template>
  <div id="Brand" v-wechat-title="proname">
    <nav>
      <img class="logo" src="../assets/logo.png" alt />
      <span>楼盘详情</span>
      <img class="list" src="../assets/list.png" alt @click="show = true" />
    </nav>
    <div class="con">
      <ul>
        <li>
          <img src="../assets/feature.png" alt class="liimg" />
          <div class="li-con">
            <h4 class="more" data-v="0">
              精品房源
              <img src="../assets/down.png" alt />
            </h4>
            <p>{{introduce}}</p>
          </div>
          <button @click="go">了解楼盘</button>
        </li>
        <li>
          <img src="../assets/tixi.png" alt class="liimg" />
          <div class="li-con">
            <h4 class="more" data-v="0">
              商业体系
              <img src="../assets/down.png" alt />
            </h4>
            <p>{{bus}}</p>
          </div>
          <button @click="go">了解楼盘</button>
        </li>
        <li>
          <img src="../assets/manage.png" alt class="liimg" />
          <div class="li-con">
            <h4 class="more" data-v="0">
              物业管理
              <img src="../assets/down.png" alt />
            </h4>
            <p>{{property}}</p>
          </div>
          <button @click="go">了解楼盘</button>
        </li>
      </ul>
    </div>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="1"></list>
    </van-popup>
  </div>
</template>
<script>
import list from "../components/List";
import { getdeve } from "../api/api";
export default {
  data() {
    return {
      real:
        "项目占地约7.6万平方米，总建规模近32万平方米，容积率2.4，由7栋9层部分13层的新现代主义建筑风格的商业综合楼和1栋3层的主形象商业中心构成",
      show: false,
      bus:'',
      property:'',
      introduce:'',
      proname:''
    };
  },
  components: {
    list,
  },
  methods: {
    start(){
      let id = this.$route.params.id
      let token = this.$cookies.get('token')
      getdeve({id:id,token:token}).then(res=>{
        console.log(res)
        this.bus = res.data.data.business
        this.property = res.data.data.property
        this.introduce = res.data.data.introduce
      })
    },
    getlist() {
      this.show = true;
    },
    go(){
      this.$router.push('/index/'+this.$route.params.id)
    }
  },
  mounted() {
    this.proname = sessionStorage.getItem('buildname') ? sessionStorage.getItem('buildname') : '易得房'
    this.start()
    $(".more").on("click", function () {
      let type = $(this).attr("data-v");
      if (type == 0) {
        $(this).attr("data-v", 1);
        let img = require("../assets/up.png");
        $(this).find("img").attr("src", img);
        $(this).next().css({ whiteSpace: "inherit", height: "auto" });
      } else {
        $(this).attr("data-v", 0);
        let img = require("../assets/down.png");
        $(this).find("img").attr("src", img);
        $(this).next().css({ whiteSpace: "nowrap", height: "1.1875rem" });
      }
    });
  },
};
</script>
<style lang="less" scoped>
nav {
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  position: relative;
  font-weight: bold;
  border-bottom: 0.5px solid #f5f5f5;
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
  padding: 0 4%;
  margin-top: 0.9375rem;
  ul {
    li {
      display: flex;
      padding: 0.875rem 0.9375rem 1.0625rem 0.9375rem;
      border: 1px solid rgba(240, 241, 245, 1);
      box-shadow: 0px 2.5px 6px 0px rgba(0, 0, 0, 0.05);
      margin-bottom: 0.9375rem;
      border-radius: 0.25rem;
      .liimg {
        width: 1.875rem;
        margin-right: 1rem;
        height: 1.875rem;
        margin-top: 0.625rem;
      }
      .li-con {
        margin-right: 1.375rem;
        h4 {
          color: #121212;
          font-size: 1.0625rem;
          margin-bottom: 0.8125rem;
          img {
            width: 0.875rem;
            margin-left: 0.9375rem;
          }
        }
        p {
          color: #626266;
          font-size: 0.875rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 1.1875rem;
          width: 11.5625rem;
        }
      }
      button {
        background: linear-gradient(
          0deg,
          rgba(247, 214, 126, 1),
          rgba(254, 233, 173, 1)
        );
        width: 3.75rem;
        height: 1.5rem;
        border-radius: 0.125rem;
        color: #ac8125;
        font-size: 0.75rem;
        text-align: center;
        line-height: 1.5rem;
        border: 0;
        margin-top: 1.25rem;
      }
    }
  }
}
</style>