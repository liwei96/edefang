<template>
  <div id="index">
    <nav>
      <img class="logo" src="../assets/logo.png" alt />
      <span>楼盘详情</span>
      <img class="list" src="../assets/list.png" alt @click="show = true" />
    </nav>
    <div class="topimg">
      <div class="swiper-topimgs">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,key) in effect" :key="key">
            <img :src="item.small" alt />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="zhao"></div>
      <p class="topnum">共{{effect.length}}张</p>
    </div>
    <div class="info">
      <h2>
        {{basic.name}}
        <span>{{basic.status}}</span>
      </h2>
      <div class="icons">
        <span class="zhuang">{{basic.decorate}}</span>
        <span class="icon">{{basic.type}}</span>
        <span class="icon" v-for="(item,key) in basic.features" :key="key">{{item}}</span>
      </div>
      <div class="info-con">
        <div>
          <p>
            单价：
            <span class="red">
              <i>{{basic.single_price}}</i>元/m²起
            </span>
          </p>
          <p>
            面积：
            <span>{{basic.area}}m²</span>
          </p>
        </div>
        <div>
          <p>
            户型：
            <span>{{house}}</span>
          </p>
          <p>
            开盘：
            <span>{{basic.firstopentime}}</span>
          </p>
        </div>
      </div>
      <p class="info-address">
        地址：
        <span>{{basic.address}}</span>
        <img src="../assets/map-address.png" alt />
      </p>
      <p class="moreinfo" @click="godetail">更多楼盘详情</p>
      <div class="infobtn">
        <button class="btnicon" @click="showbox(60,'变价通知我')">
          <img src="../assets/tixing.png" />变价通知我
        </button>
        <button class="btnicon" @click="showbox(61,'开盘提醒我')">
          <img src="../assets/tixing.png" />开盘提醒我
        </button>
      </div>
    </div>
    <div class="line"></div>
    <div class="phone">
      <a :href="'tel:'+phone">
        <div class="phone-con">
          <div class="pho-left">
            <h2>400-718-6686</h2>
            <p>致电售楼处了解更多信息</p>
          </div>
          <div class="pho-right">
            <button>
              <img src="../assets/tel.png" alt />一键拨打
            </button>
          </div>
        </div>
      </a>
    </div>
    <div class="dynamic">
      <h4>
        楼盘动态
        <router-link :to="'/dynamic/'+basic.id">
          <span>
            全部动态
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="dynamic-con">
        <div class="newdynamic">
          <p class="dynamictime">
            {{newdynamic.time}}
            <span>最新</span>
          </p>
          <h5>最新房源动态</h5>
          <p class="con">{{newdynamic.content}}</p>
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
      <button class="btnicon" @click="showbox(63,'订阅最新动态')">
        <img src="../assets/ding.png" />订阅最新动态
      </button>
    </div>
    <div class="line"></div>
    <div class="house">
      <h4>
        主力户型
        <router-link :to="'/hus/'+basic.id">
          <span>
            更多户型
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="house-con" v-for="(item,val) in appart" :key="val">
        <router-link :to="'/hudeal/'+basic.id">
          <img :src="item.img" alt />
          <div class="house-right">
            <h5>
              {{item.title}}
              <span>{{item.status}}</span>
            </h5>
            <p class="house-price">
              <span>{{item.price}}</span>万起
            </p>
            <p class="house-msg">特点：{{item.feature}}</p>
            <p class="house-msg">建面：{{item.area}}m²</p>
            <p class="house-msg">户型分析：{{item.analysis}}</p>
          </div>
        </router-link>
      </div>
      <button class="btnicon" @click="showbox(59,'咨询详细户型')">
        <img src="../assets/zixun.png" />咨询详细户型
      </button>
    </div>
    <div class="line"></div>
    <div class="material">
      <h5>楼盘分析资料</h5>
      <div class="material-icon">
        <span :class="matenum == 1 ? 'active' : ''" @click="setmatenum(1)">投资分析</span>
        <span :class="matenum == 2 ? 'active' : ''" @click="setmatenum(2)">宜居分析</span>
      </div>
      <div class="material-con">
        <p v-for="(item,key) in analysises" :key="key" v-if="matenum == item.type">{{item.content}}</p>
      </div>
      <button class="btnicon" @click="showbox(68,'领取分析资料')">
        <img src="../assets/ling.png" />领取分析资料
      </button>
    </div>
    <div class="line"></div>
    <div class="analyze">
      <h5>楼盘分析师</h5>
      <p class="analyze-msg">
        <span>
          <img src="../assets/icon7.png" />专业服务
        </span>
        <span>
          <img src="../assets/icon7.png" />区域解读
        </span>
        <span>
          <img src="../assets/icon7.png" />户型分析
        </span>
      </p>

      <div class="analyze-peo" v-for="(item,key) in staff" :key="key">
        <img class="peo" :src="item.head_img" alt />
        <div class="analyze-con">
          <h6>
            {{item.name}}
            <span>满意度5分</span>
          </h6>
          <p v-if="key==0">了解房源特色，专业挑好房</p>
          <p v-if="key==1">为客户提供专业的购房建议</p>
        </div>
        <img class="analyze-talk" src="../assets/msg.png" alt />
        <img class="analyze-talk1" src="../assets/tel.png" alt />
      </div>
    </div>
    <div class="line"></div>
    <div class="newprice">
      <h3>
        最新成交价
        <p>
          已有
          <span>{{search_count}}</span>人查询
        </p>
      </h3>
      <div id="chart" style="width:100%;height:250px"></div>
      <p>2020年</p>
      <div class="tab">
        <table>
          <tbody>
            <tr>
              <th>日期</th>
              <th>成交套数</th>
              <th>成交金额</th>
            </tr>
            <tr v-for="(dd,key) in chengjiao" :key="key">
              <td>{{dd.date}}</td>
              <td>{{dd.num}}套</td>
              <td>***万</td>
            </tr>
          </tbody>
        </table>
        <div class="zhe" @click="showmore" v-if="morebtn">
          <img src="../assets/huo-down.png" alt />
        </div>
      </div>
      <button @click="showbox(40,'获取最新成交价')">
        <img src="../assets/icon2.png" />获取最新成交价
      </button>
    </div>
    <div class="line"></div>
    <div class="zhou">
      <h4>
        周边配套
        <router-link :to="'/zhou/'+basic.id">
          <span>
            详细配套
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div id="map"></div>
      <div id="panel" style="display:none"></div>
      <div class="swiper-map">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div :class="mapnum === 0 ? 'tegood active' : 'tegood'" @click="setmap(0, '地铁')">
              地铁
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 1 ? 'tegood active' : 'tegood'" @click="setmap(1 ,'公交')">
              公交
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 2 ? 'tegood active' : 'tegood'" @click="setmap(2, '教育')">
              教育
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 3 ? 'tegood active' : 'tegood'" @click="setmap(3, '医院')">
              医院
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 4 ? 'tegood active' : 'tegood'" @click="setmap(4, '购物')">
              购物
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 5 ? 'tegood active' : 'tegood'" @click="setmap(5, '美食')">
              美食
              <i></i>
            </div>
          </div>
          <div class="swiper-slide">
            <div :class="mapnum === 6 ? 'tegood active' : 'tegood'" @click="setmap(6, '娱乐')">
              娱乐
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <div class="map-msg">
        <ul class="map-msg-con">
          <li>
            <h6>武林广场</h6>
            <p>
              地铁1号线
              <span>
                <img src="../assets/dian.png" />800m
              </span>
            </p>
          </li>
          <li>
            <h6>武林广场</h6>
            <p>
              地铁1号线
              <span>
                <img src="../assets/dian.png" />800m
              </span>
            </p>
          </li>
        </ul>
        <p class="map-tishi" v-if="isnull">附近没有{{mapname}}，您可以看看其他信息</p>
      </div>
      <button class="btnicon" @click="showbox(69,'获取详细周边配套')">
        <img src="../assets/icon3.png" />获取详细周边配套
      </button>
    </div>
    <div class="line"></div>
    <div class="comment">
      <h4>
        用户点评
        <router-link :to="'/comments/'+basic.id">
          <span>
            更多点评
            <img src="../assets/go.png" alt />
          </span>
        </router-link>
      </h4>
      <div class="comment-con" v-for="(item,key) in comments" :key="key">
        <img src="../assets/jiapeo.png" alt />
        <div class="comment-right">
          <h5>{{item.mobile}}</h5>
          <p>{{item.content}}</p>
          <div>
            <span class="comment-time">{{item.time}}</span>
            <span class="comment-del" v-if="item.mine == 1" @click="del(item.id)">删除</span>
            <span class="comment-btn">
              <img
                :src="item.my_like == 0 ? before : after"
                @click="agree(item.my_like,item.id,key)"
              />
              {{item.like_num}}
            </span>
          </div>
        </div>
      </div>
      <button class="btnicon" @click="gocomment">
        <img src="../assets/icon4.png" />我要点评
      </button>
    </div>
    <foot :tel="phone" @fot="chang($event)"></foot>
    <van-popup v-model="show" position="right" :style="{ height: '100%',width:'61%' }">
      <list :num="1"></list>
    </van-popup>
    <van-popup v-model="tan" :style="{background:'rgba(0,0,0,0)'}" @click-overlay="setnew" position="center">
      <popup
        :typenum="typenum"
        :id="basic.id"
        :name="name"
        @close="cli($event)"
        :typebtn="typebtn"
      ></popup>
    </van-popup>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import footer from "../components/Footer";
import list from "../components/List";
import Popup from "@/components/Popup.vue";
import { getindex, agcomment, delcomment,getindexs } from "../api/api";
export default {
  data() {
    return {
      morebtn: true,
      chengjiao: [],
      mapname: "地铁",
      mapnum: 0,
      isnull: false,
      show: false,
      basic: {},
      newdynamic: {},
      tui: {},
      appart: [],
      matenum: 1,
      analysises: [],
      phone: "",
      staff: [],
      search_count: 564,
      lines: [],
      baidu: [],
      comments: [],
      isone: 0,
      tan: false,
      name: "",
      typenum: "",
      typebtn: 1,
      before: require("../assets/noclick.png"),
      after: require("../assets/clicked.png"),
      isover: true,
      effect:[
        {'small':require('../assets/default.jpg')}
      ],
      url:'',
      house:''
    };
  },
  components: {
    foot: footer,
    list,
    Popup,
  },
  methods: {
    drawline() {
      // 初始化图表标签
      var myChart = this.$echarts.init(document.getElementById("chart"));
      let that = this;
      var options = {
        //定义一个标题
        legend: {
          data: ["AI"],
        },
        color: ["rgba(77,181,255,1)"],
        grid: {
          top: "10%",
          left: "11%",
          right: 0,
          bottom: "10%",
        },
        //X轴设置
        xAxis: [
          {
            type: "category",
            data: that.times,
            axisLine: {
              lineStyle: {
                color: "#919499",
              },
            },
          },
        ],
        yAxis: [
          {
            min: that.min,
            max: that.max,
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#E4E4EB",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#919499",
              },
              show: false,
            },
          },
        ],
        series: [
          {
            data: that.lines,
            // smooth: 0.6,
            // symbol: "circle",
            lineStyle: {
              color: "#E4BA4B",
              width: 1,
            },
            // areaStyle: {},
            type: "bar",
            itemStyle: {
              // 转折点 控制
              color: '#F6D67D'
            },
            barWidth: 20,  // 柱形的宽度
            barCategoryGap: '10%',  // 柱形的间距
          },
        ],
      };
      myChart.setOption(options);
    },
    mmap() {
      this.over = false;
      let that = this;
      let baidu = this.baidu;
      let img = require("../assets/mappro.png");
      let pro = this.basic.name;
      let add = this.basic.address;
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
            <h5 style="color: #121212;font-size: 12px;margin:0;margin-bottom: 2px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">${pro}</h5>
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
          AMap.service(["AMap.PlaceSearch"], function () {
            // eslint-disable-line no-unused-vars
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 10, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "", // 兴趣点城市
              citylimit: false, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              panel: "panel", // 结果列表将在此容器中进行展示。
              autoFitView: false, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            var cpoint = that.pois;
            let name = that.mapname;
            placeSearch.searchNearBy(name, cpoint, 1200, function (
              // eslint-disable-line no-unused-vars
              status,
              result
            ) {
              var ht = "";
              // console.log(ht)
              let img = require("../assets/dian.png");
              if (JSON.stringify(result) == "{}") {
                that.isnull = true;
                // that.setzhou(name, 0);
              } else {
                that.isnull = false;
                // that.setzhou(name, result.poiList.pois.length);
                $.each(result.poiList.pois, function (i, e) {
                  if (i <= 2) {
                    var p2 = [e.location.lng, e.location.lat];
                    var s = AMap.GeometryUtil.distance(cpoint, p2) / 1000;
                    s = s.toFixed(1);
                    ht += `
                    <li>
                      <h5>${e.name}</h5>
                      <p>${e.address} <span><img src="${img}">${s}km</span></p>
                    </li>
                    `;
                  }
                });
              }
              $(".map-msg-con").html(ht);
            });
          });
        }
      });
    },
    setmap(id, name) {
      this.mapnum = id;
      this.mapname = name;
      this.mmap();
    },
    godetail() {
      this.$router.push("/deail/" + this.basic.id);
    },
    start() {
       let url = window.location.href;
      url = url.split("?")[1];
      if (url && url.indexOf("kid") !== -1) {
        url = url.split("&");
        let kid = url[0].split("=")[1];
        let other = url[1].split("=")[1];
        sessionStorage.setItem("kid", kid);
        sessionStorage.setItem("other", other);
      }
      let id = this.$route.params.id;
      let token = this.$cookies.get('token');
      getindexs(id,token).then(res=>{
        console.log(res)
      })
      getindex(id, token).then((res) => {
        this.basic = res.data.data.basic;
        this.newdynamic = res.data.data.dynamics[0];
        this.tui = res.data.data.dynamics[1];
        this.appart = res.data.data.appartments;
        this.analysises = res.data.data.analysises;
        this.phone = res.data.common.phone;
        this.staff = res.data.common.staffs;
        this.search_count = res.data.data.basic.count.search_count;
        this.chengjiao = res.data.data.deals;
        let line = [];
        for (let val of this.chengjiao) {
          let k = [val.date, val.money];
          line.push(k);
        }
        this.lines = line;
        this.baidu = [this.basic.longitude, this.basic.latitude];
        sessionStorage.setItem("baidu", this.baidu);
        sessionStorage.setItem("buildname", this.basic.name);
        sessionStorage.setItem("buildaddress", this.basic.address);
        this.comments = res.data.data.comments;
        this.effect = res.data.data.basic.imgs.effect
        this.house = res.data.data.basic.rooms.slice(0,2).join('/')
      });
    },
    setmatenum(num) {
      this.matenum = num;
    },
    showmore() {
      this.morebtn = false;
      $(".tab").css({ height: "auto" });
    },
    showbox(id, name) {
      this.typenum = id;
      this.name = name;
      this.tan = true;
      this.typebtn = 1
    },
    chang(data) {
      this.typenum = data.position;
      this.name = data.name;
      this.tan = true;
      this.typebtn = 1
    },
    cli(e) {
      this.tan = e;
    },
    setnew() {
      this.typebtn = 0;
    },
    agree(type, id, key) {
      let token = this.$cookies.get('token')
      if (token) {
        if (this.isover) {
          this.isover = false;
          agcomment({ token: token, id: id }).then(
            (res) => {
              this.isover = true;
              this.comments[key].like_num = res.data.like_num;
            }
          );
        }
      } else {
        sessionStorage.setItem("back", this.$route.path);
        this.$router.push("/login/"+this.$route.params.id);
      }
    },
    del(id) {
      let token = this.$cookies.get('token')
      delcomment({ token: token, id: id }).then(
        (res) => {
          this.$router.go(0);
        }
      );
    },
    gocomment() {
      let token = this.$cookies.get('token')
      if(token){
        this.$router.push("/comment/" + this.basic.id);
      }else{
        sessionStorage.setItem('back',this.$route.path)
        this.$router.push('/login/'+this.$route.params.id)
      }
    },
  },
  mounted() {
    this.start();
  },
  updated() {
    if (this.isone == 0) {
      this.isone = 1;
      this.drawline();
      this.mmap();
      var mySwiper1 = new Swiper(".swiper-topimgs", {
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: ".swiper-pagination",
        },
        autoplay: true,
      });
      var swiper08 = new Swiper(".swiper-map", {
        slidesPerView: 5.5,
        spaceBetween: 10,
        slidesOffsetAfter: 12,
        slidesOffsetBefore: 14,
        slidesOffsetAfter: 12,
      });
    }
  },
};
</script>
<style lang='less' scoped>
#index {
  nav {
    text-align: center;
    height: 2.75rem;
    line-height: 2.75rem;
    position: fixed;
    max-width: 540px;
    width:100%;
    background-color: #fff;
    z-index: 1111;
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
  .topimg {
    overflow: hidden;
    position: relative;
    height: 12.5rem;
    padding-top:2.75rem;
    img {
      width: 100%;
      height: 12.5rem;
    }
    .zhao {
      position: absolute;
      width: 100%;
      height: 12.5rem;
      background: rgba(0, 0, 0, 0.2);
      top: 2.75rem;
      left: 0;
      z-index: 10;
    }
    .topnum {
      width: 3.125rem;
      height: 1.25rem;
      border-radius: 0.625rem;
      background: rgba(0, 0, 0, 0.6);
      text-align: center;
      line-height: 1.25rem;
      color: #fff;
      font-size: 0.625rem;
      position: absolute;
      right: 0.9375rem;
      bottom: 0.625rem;
      z-index: 11;
    }
  }
  .info {
    padding: 0 4%;
    h2 {
      color: #1f1f1f;
      font-size: 1.25rem;
      margin-top: 1.4375rem;
      margin-bottom: 0.625rem;
      span {
        display: inline-block;
        width: 2.5rem;
        height: 1.125rem;
        text-align: center;
        line-height: 1.125rem;
        border-radius: 0.125rem;
        color: #fff;
        font-size: 0.75rem;
        background-color: #1cc363;
        margin-left: 0.625rem;
      }
    }
    .icons {
      margin-bottom: 1.4375rem;
      .zhuang {
        display: inline-block;
        background-color: #faf1df;
        width: 2.25rem;
        height: 1.125rem;
        text-align: center;
        line-height: 1.125rem;
        border-radius: 0.125rem;
        color: #bd8d27;
        font-size: 0.75rem;
        margin-right: 0.4375rem;
      }
      .icon {
        padding: 0.1875rem 0.375rem;
        border-radius: 0.125rem;
        background-color: #f5f5f5;
        color: #7d7d80;
        font-size: 0.75rem;
        margin-right: 0.4375rem;
      }
    }
    .info-con {
      margin-bottom: 1rem;
      div {
        display: flex;
        align-items: center;
        margin-bottom: 0.6875rem;
        p {
          color: #626466;
          font-size: 0.875rem;
          width: 50%;
          span {
            color: #2f3133;
            font-size: 0.9375rem;
            font-weight: bold;
          }
          .red {
            color: #ff5543;
            font-size: 0.75rem;
            i {
              font-style: normal;
              font-size: 1rem;
            }
          }
        }
      }
    }
    .info-address {
      color: #626466;
      font-size: 0.875rem;
      line-height: 2.25rem;
      margin-bottom: 0.6875rem;
      display: flex;
      span {
        color: #2e3033;
        font-weight: bold;
        height: 2.25rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 76%;
        display: inline-block;
        overflow: hidden;
      }
      img {
        width: 2.25rem;
        height: 2.25rem;
        float: right;
      }
    }
    .moreinfo {
      color: #bd8d27;
      font-size: 1rem;
      text-align: center;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .infobtn {
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
        text-align: center;
        line-height: 2.5rem;
        color: #ac8125;
        font-size: 0.9375rem;
        border: 0;
        margin-right: 0.6875rem;
        font-weight: bold;
      }
      button:nth-of-type(2) {
        margin: 0;
      }
    }
  }
  .line {
    width: 100%;
    height: 0.5rem;
    background-color: #f7f7f7;
  }
  .phone {
    padding: 1.25rem 4%;
    .phone-con {
      background: linear-gradient(
        270deg,
        rgba(255, 233, 205, 1),
        rgba(255, 243, 207, 1)
      );
      width: 100%;
      height: 3.75rem;
      border-radius: 0.25rem;
      display: flex;
      .pho-left {
        margin-right: 4.125rem;
        h2 {
          color: #bd8d27;
          font-size: 1.5rem;
          margin-left: 1.875rem;
          margin-top: 0.5625rem;
        }
        p {
          color: #c3a973;
          font-size: 0.75rem;
          margin-left: 1.875rem;
        }
      }
      .pho-right {
        button {
          width: 5.375rem;
          height: 1.9375rem;
          border-radius: 0.9375rem;
          text-align: center;
          line-height: 1.9375rem;
          background-color: #fff;
          border: 0;
          color: #b78f37;
          font-size: 0.8125rem;
          margin-top: 0.9375rem;
          img {
            width: 0.9375rem;
            margin-bottom: -0.125rem;
            margin-right: 0.125rem;
          }
        }
      }
    }
  }
  .dynamic {
    border-top: 0.03125rem solid #f5f5f5;
    padding: 1.125rem 4% 1.25rem 4%;
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
      font-size: 0.9375rem;
      font-weight: bold;
      border: 0;
    }
  }
  .material {
    padding: 0 4%;
    h5 {
      color: #1f1f1f;
      font-size: 1.0625rem;
      font-weight: bold;
      margin-bottom: 1.25rem;
      margin-top: 1.125rem;
    }
    .material-icon {
      margin-bottom: 1.375rem;
      span {
        display: inline-block;
        width: 4.375rem;
        height: 1.625rem;
        border: 0.03125rem solid rgba(242, 244, 247, 1);
        box-shadow: 0px 0.09375rem 0.3125rem 0px rgba(0, 0, 0, 0.05);
        border-radius: 0.1875rem;
        color: #626466;
        font-size: 0.875rem;
        text-align: center;
        line-height: 1.625rem;
        margin-right: 1rem;
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
    .material-con {
      padding: 0.75rem 0.9375rem 0.625rem 0.9375rem;
      background-color: #f7f7f7;
      border-radius: 0.375rem;
      margin-bottom: 1.25rem;
      p {
        color: #5c5c5c;
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-bottom: 0.625rem;
      }
    }
    button {
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      width: 100%;
      height: 2.5rem;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 2.5rem;
      color: #ac8125;
      font-size: 0.9375rem;
      border: 0;
      margin-bottom: 1.25rem;
      font-weight: bold;
    }
  }
  .house {
    padding: 0 4%;
    h4 {
      font-size: 1.0625rem;
      color: #101214;
      line-height: 1.375rem;
      margin-bottom: 1.375rem;
      margin-top: 1.125rem;
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
    .house-con {
      margin-bottom: 1.125rem;
      a {
        width: 100%;
        display: flex;
      }
      img {
        width: 4.6875rem;
        height: 5.9375rem;
        border-radius: 0.125rem;
        margin-right: 0.9375rem;
      }
      .house-right {
        position: relative;
        h5 {
          color: #2f3133;
          font-size: 1.0625rem;
          margin-bottom: 0.9375rem;
          span {
            background-color: #2cd264;
            width: 2.125rem;
            height: 1rem;
            text-align: center;
            line-height: 1rem;
            display: inline-block;
            border-radius: 0.125rem;
            font-size: 0.6875rem;
            color: #fff;
            margin-left: 0.375rem;
          }
        }
        .house-price {
          position: absolute;
          color: #ff5543;
          font-size: 0.75rem;
          right: 0;
          top: 0;
          span {
            font-size: 1.125rem;
            font-weight: bold;
          }
        }
        .house-msg {
          color: #626466;
          font-size: 0.8125rem;
          margin-bottom: 0.3125rem;
        }
        .house-msg:nth-of-type(4) {
          margin-bottom: 0;
          height: 1.0625rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 14.875rem;
        }
      }
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
      color: #ac8125;
      font-size: 0.9375rem;
      text-align: center;
      line-height: 2.5rem;
      border: 0;
      margin-top: 0.375rem;
      margin-bottom: 1.25rem;
      font-weight: bold;
    }
  }
  .analyze {
    padding: 0 4%;
    h5 {
      color: #1f1f1f;
      font-size: 1.0625rem;
      margin-top: 1.125rem;
      margin-bottom: 0.9375rem;
    }
    .analyze-msg {
      margin-bottom: 1.5625rem;
      span {
        color: #626466;
        font-size: 0.8125rem;
        margin-right: 0.75rem;
        img {
          width: 0.9375rem;
          margin-bottom: -0.0625rem;
        }
      }
    }
    .analyze-peo {
      display: flex;
      margin-bottom: 1.5625rem;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin-right: 0.75rem;
      }
      .analyze-con {
        margin-right: 2.5rem;
        h6 {
          color: #1f1f1f;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          span {
            background-color: #628bb9;
            font-size: 0.625rem;
            color: #fff;
            margin-left: 0.3125rem;
            font-weight: 400;
            padding: 0.0625rem 0.125rem 0.125rem 0.125rem;
          }
        }
        p {
          color: #8f8f8f;
          font-size: 0.75rem;
        }
      }
      .analyze-talk {
        margin-right: 1.5625rem;
      }
      .analyze-talk1 {
        margin-right: 0;
      }
    }
    .analyze-peo:nth-of-type(2) {
      margin-bottom: 1.25rem;
    }
  }
  .newprice {
    padding: 1.25rem 4%;
    position: relative;
    h3 {
      color: #121212;
      font-size: 1.0625rem;
      p {
        color: #919499;
        font-size: 0.875rem;
        float: right;
        font-weight: 400;
        span {
          color: #fe582f;
          font-size: 1.0625rem;
          font-weight: bold;
        }
      }
    }
    p {
      text-align: center;
      color: #5c5c5c;
      font-size: 0.625rem;
      margin-bottom: 0.875rem;
    }
    .tab {
      position: relative;
      height: 9.75rem;
      overflow: hidden;
      table {
        color: #5c5c5c;
        font-size: 0.75rem;
        width: 100%;
        border-top: 0.5px solid #e6e6ec;
        border-left: 0.5px solid #e6e6ec;
        tr {
          height: 1.9375rem;
          line-height: 1.9375rem;
          th {
            width: 33%;
            text-align: center;
            border-right: 0.5px solid #e6e6ec;
            border-bottom: 0.5px solid #e6e6ec;
          }
          td {
            width: 33%;
            text-align: center;
            border-right: 0.5px solid #e6e6ec;
            border-bottom: 0.5px solid #e6e6ec;
          }
        }
      }
      .zhe {
        position: absolute;
        width: 100%;
        height: 3.125rem;
        background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 1),
          rgba(255, 255, 255, 0)
        );
        bottom: 0;
        text-align: center;
        line-height: 3.125rem;
        img {
          width: 1.5rem;
        }
      }
    }
    button {
      width: 100%;
      height: 2.5rem;
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      text-align: center;
      line-height: 2.5rem;
      color: #ac8125;
      font-size: 0.9375rem;
      font-weight: bold;
      border: 0;
      margin-top: 1.25rem;
      img {
        width: 1.125rem;
        margin-bottom: -0.1875rem;
        margin-right: 0.125rem;
      }
    }
  }
  .zhou {
    // padding: 0 4%;
    h4 {
      padding: 0 4%;
      font-size: 1.0625rem;
      color: #101214;
      line-height: 1.375rem;
      margin-bottom: 1.375rem;
      margin-top: 1.125rem;
      span {
        color: #628bb9;
        float: right;
        font-weight: 400;
        font-size: 0.875rem;
        img {
          width: 0.9375rem;
          margin-bottom: -0.125rem;
          margin-left: 0.125rem;
        }
      }
    }
    #map {
      width: 92%;
      margin-left: 4%;
      height: 9.375rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
    }
    .swiper-map {
      overflow: hidden;
      padding-bottom: 1.125rem;
      .tegood {
        color: #4d4d4d;
        font-size: 0.875rem;
      }
      .active {
        color: #bd8d27;
        position: relative;
        i {
          width: 1.5625rem;
          height: 0.125rem;
          border-radius: 0.0625rem;
          background-color: #bd8d27;
          position: absolute;
          display: block;
          bottom: -0.375rem;
          left: 0;
        }
      }
    }
    .map-msg {
      padding-top: 1.125rem;
      border-top: 0.5px solid #f5f5f5;
      padding: 0 4%;
      /deep/ .map-msg-con {
        padding-top:.625rem;
        /deep/ li {
          list-style: none;
          margin-bottom: 1.125rem;
          /deep/ h5 {
            color: #1a1a1a;
            font-size: 0.9375rem;
            margin-bottom: 0.5rem;
          }
          /deep/ p {
            color: #999999;
            font-size: 0.8125rem;
            span {
              float: right;
              img {
                width: 0.75rem;
                margin-right: 0.125rem;
              }
            }
          }
        }
      }
      .map-tishi {
        height: 10.6875rem;
        text-align: center;
        line-height: 10.6875rem;
        font-size: 1rem;
      }
    }
    button {
      width: 92%;
      margin-left: 4%;
      height: 2.5rem;
      border-radius: 0.1875rem;
      background: linear-gradient(
        0deg,
        rgba(247, 214, 126, 1),
        rgba(254, 233, 173, 1)
      );
      color: #ac8125;
      font-size: 0.9375rem;
      text-align: center;
      line-height: 2.5rem;
      font-weight: bold;
      border: 0;
      margin-bottom: 1.25rem;
    }
  }
  .comment {
    padding: 0 4% 6.25rem 4%;
    h4 {
      font-size: 1.0625rem;
      color: #101214;
      line-height: 1.375rem;
      margin-bottom: 1.375rem;
      margin-top: 1.125rem;
      span {
        color: #628bb9;
        float: right;
        font-weight: 400;
        font-size: 0.875rem;
        img {
          width: 0.9375rem;
          margin-bottom: -0.125rem;
          margin-left: 0.125rem;
        }
      }
    }
    .comment-con {
      display: flex;
      img {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        margin-right: 0.625rem;
      }
      .comment-right {
        width: 100%;
        h5 {
          color: #121212;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        p {
          color: #3d3d3d;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        div {
          line-height: 1.3125rem;
          .comment-time {
            color: #999999;
            font-size: 0.8125rem;
          }
          .comment-del {
            color: #999999;
            font-size: 0.75rem;
            margin-left: 0.5rem;
          }
          .comment-btn {
            float: right;
            color: #2e3033;
            font-size: 0.75rem;
            img {
              width: 0.9375rem;
              height: 0.9375rem;
              margin-right: 0.3125rem;
              margin-bottom: -0.125rem;
            }
          }
        }
      }
      margin-bottom: 1.4375rem;
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
      font-size: 0.9375rem;
      font-weight: bold;
      border: 0;
    }
  }
  .btnicon {
    img {
      width: 1.125rem;
      margin-bottom: -0.1875rem;
      margin-right: 0.25rem;
    }
  }
}
</style>