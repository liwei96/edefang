<template>
  <div id="Comments">
    <header>
      <img src="../assets/leftgo.png" alt class="back" @click="back"/>
      更多点评
      <img src="../assets/list.png" alt class="list" @click="show=true"/>
    </header>
    <div class="comment">
      <div class="con" v-for="(item,key) in list" :key="key">
        <img class="nol" src="../assets/jiapeo.png" alt />
        <div class="con-right">
          <h4>{{item.mobile}}</h4>
          <p class="one">{{item.content}}</p>
          <p class="onetime">
            {{item.time.substr(0,10)}}
            <i @click="gocomment(item.id)">回复</i>
            <i @click="del(item.id)" v-if="item.mine == 1">删除</i>
            <span>
              <img
                :src="item.my_like == 0 ? before : after"
                @click="agrees(item.my_like,item.id,key)"
              />
              {{item.like_num}}
            </span>
          </p>
          <div class="two" v-if="item.children.length" v-for="(val,k) in item.children" :key="k">
            <p class="two-con">
              <span>{{val.moblie}}:</span>
              {{val.content}}
            </p>
            <p class="twotime">
              {{val.time.substr(0,10)}} &nbsp;
              <span @click="del(val.id)">删除</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <foot :tel="tel" @fot="chang($event)"></foot>
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
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }">
      <list :num="1"></list>
    </van-popup>
  </div>
</template>
<script>
import footer from "../components/Footer";
import popup from "../components/Popup";
import List from "../components/List";
import { getcomments, agcomment, delcomment } from "../api/api";
export default {
  components: {
    foot: footer,
    popup,
    List
  },
  data() {
    return {
      tel: "",
      typenum: 0,
      name: "",
      tan: false,
      id: "",
      typebtn: 0,
      list: [],
      before: require("../assets/noclick.png"),
      after: require("../assets/clicked.png"),
      show:false,
      isover:true
    };
  },
  methods: {
    start() {
      let id = this.$route.params.id;
      this.id = Number(id);
      getcomments({ id: id, page: 1, limit: 10 }).then((res) => {
        console.log(res);
        this.tel = res.data.common.phone;
        this.list = res.data.data;
      });
    },
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
    },
    agrees(type, id, key) {
      let token = this.$cookies.get('token')
      if (token) {
        if (this.isover) {
          this.isover = false;
          agcomment({ token: token, id: id }).then(
            (res) => {
              this.isover = true;
              this.list[key].like_num = res.data.like_num;
            }
          );
        }
      } else {
        sessionStorage.setItem("back", this.$route.path);
        this.$router.push("/login/"+this.$route.params.id);
      }
    },
    gocomment(id) {
      sessionStorage.setItem("pid", id);
      let l = this.$route.params.id;
      this.$router.push("/comment/" + l);
    },
    del(id) {
      let token = this.$cookies.get('token')
      if (token) {
        delcomment({ token: token, id: id }).then(
          (res) => {
            this.$router.go(0);
          }
        );
      } else {
        sessionStorage.setItem("back", this.$route.path);
        this.$router.push("/login/"+this.$route.params.id);
      }
    },
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.start();
  },
};
</script>
<style lang="less" scoped>
header {
  height: 2.5rem;
  top: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  box-shadow: 0px 0.5px 5px 0px rgba(38, 36, 37, 0.05);
  background-color: #fff;
  color: #2e3033;
  font-size: 1.125rem;
  line-height: 2.5rem;
  .back {
    width: 1rem;
    position: absolute;
    left: 4%;
    top: 0.875rem;
  }
  .list {
    width: 1.25rem;
    position: absolute;
    right: 4%;
    top: 0.875rem;
  }
}
.comment {
  padding: 3.75rem 4% 3.125rem 4%;
  .con {
    display: flex;
    margin-bottom: 1.875rem;
    .nol {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
      margin-right: 0.625rem;
    }
    .con-right {
      width: 100%;
      h4 {
        color: #121212;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
      .one {
        color: #3d3d3d;
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-bottom: 0.75rem;
      }
      .onetime {
        color: #999999;
        font-size: 0.8125rem;
        line-height: 1.0625rem;
        i {
          color: #628bb9;
          font-style: normal;
          font-size: 0.75rem;
          margin-left: 0.4375rem;
        }
        i:nth-of-type(2) {
          color: #808080;
        }
        span {
          color: #2e3033;
          font-size: 0.75rem;
          float: right;
          img {
            width: 0.9375rem;
            margin-right: 0.25rem;
            margin-bottom: -0.125rem;
          }
        }
      }
      .two {
        background-color: #f7f7f7;
        border-radius: 0.375rem;
        padding: 0.9375rem;
        margin-top: 1.125rem;
        .two-con {
          color: #626466;
          font-size: 0.875rem;
          line-height: 1.3125rem;
          margin-bottom: 0.625rem;
          span {
            color: #101214;
            font-weight: bold;
          }
        }
        .twotime {
          color: #808080;
          font-size: 0.75rem;
          span {
            margin-left: 0.375rem;
          }
        }
      }
    }
  }
}
</style>