<template>
  <div id="Comment">
    <header>
      <img src="../assets/leftgo.png" alt class="back" @click="back"/>
      我要点评
      <img src="../assets/list.png" alt class="list" @click="show = true"/>
    </header>
    <div class="con">
      <h6 v-if="pid == 0">是否考虑购买该楼盘？</h6>
      <p class="type"  v-if="pid == 0">
        必填
        <span
          :class="btnnum == key ? 'active':''"
          v-for="(item,key) in btns"
          :key="key"
          @click="btnnum = key"
        >{{item}}</span>
      </p>
      <div class="rate"  v-if="pid == 0">
        <span class="ratemsg">
          综合评分
          <i>{{value}}.0</i>分
        </span>
        <van-rate v-model="value" :size="16" color="#D1A23D" void-color="#E8EBED" :gutter="12" />
        <span class="rate-type">{{tishi}}</span>
      </div>
      <textarea placeholder="输入您精彩评论" v-model="con"></textarea>
      <button @click="put">发表</button>
    </div>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }" duration="0.2">
      <list :num="0"></list>
    </van-popup>
  </div>
</template>
<script>
import { comment } from "../api/api";
import List from "../components/List";
export default {
  data() {
    return {
      value: 3,
      btns: ["有兴趣", "待对比", "不考虑"],
      btnnum: 0,
      con: "",
      show:false,
      tishi:'一般',
      pid:0
    };
  },
  components:{
      List
  },
  methods: {
    put() {
      let id = this.$route.params.id;
      let connum = this.btnnum + 1;
      let con = this.con;
      let star = this.value
      let token = this.$cookies.get('token')
      if (token) {
        if(!con){
            this.$toast('评论不能为空')
            return
        }
        var pid
        if(sessionStorage.getItem('pid')){
            pid = sessionStorage.getItem('pid')
        }
        comment({token:token,'bid':id,content:con,consider_buy:connum,score:star,pid:pid}).then((res) => {
          console.log(res);
          if(res.data.code == 200) {
              if(sessionStorage.getItem('pid')){
                sessionStorage.removeItem('pid')
                this.$router.push('/discusss/'+id)
              }else{
                this.$router.push('/index/'+id)
              }
          }
        });
      } else {
        alert(4)
        sessionStorage.setItem("back", this.$route.path);
        this.$router.push("/login/"+id);
      }
    },
    back(){
      this.$router.go(-1)
    }
  },
  mounted(){
    if(sessionStorage.getItem('pid')){
      this.pid =  sessionStorage.getItem('pid')
    }
    
  },
  watch:{
    value(val){
      if(val ==1){
        this.tishi = '非常差'
      }else if(val == 2){
        this.tishi ='差'
      }else if(val == 3){
        this.tishi = '一般'
      }else if(val == 4){
        this.tishi = '好'
      }else {
        this.tishi = '非常好'
      }
    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('pid')
  }
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
  font-weight: bold;
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
.con {
  padding: 3.75rem 4% 0 4%;
  h6 {
    color: #101214;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .type {
    color: #626466;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    span {
      display: inline-block;
      width: 3.75rem;
      height: 1.375rem;
      border-radius: 0.1875rem;
      text-align: center;
      line-height: 1.375rem;
      color: #626466;
      font-size: 0.875rem;
      margin-right: 0.625rem;
      background-color: #f2f2f2;
    }
    span:nth-of-type(1) {
      margin-left: 0.625rem;
    }
    .active {
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      color: #ac8125;
    }
  }
  .rate {
    margin-bottom: 2.1875rem;
    .ratemsg {
      color: v;
      font-size: 0.875rem;
      margin-right: 1.25rem;
      i {
        color: #ff6a48;
        font-size: 1.875rem;
        font-weight: bold;
        font-style: normal;
      }
    }
    /deep/.van-rate {
      margin-right: 1.25rem;
    }
    .rate-type {
      color: #d1a23d;
      font-style: 0.875rem;
    }
  }
  textarea {
    width: 91%;
    height: 7.5rem;
    border-radius: 0.25rem;
    padding: 0.9375rem 4.5%;
    background-color: #f2f2f2;
    border: 0;
    outline: none;
    margin-bottom: 2.5rem;
  }
  button {
    width: 100%;
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(
      0deg,
      rgba(247, 214, 126, 1),
      rgba(254, 233, 173, 1)
    );
    color: #ac8125;
    font-style: 1rem;
    font-weight: bold;
    border: 0;
  }
}
</style>