<template>
  <div class="greetings">
    <div class="flex pdlr1 pdt05 bg">
      <div :class="[{ drag: !isLock }, { noDrag: isLock }]"></div>
      <div class="pdlr05" v-if="isLock">
        <i
          style="cursor: pointer"
          @click="changeLock"
          class="blue iconfont icon-lock"
        ></i>
      </div>
      <div class="pdlr05" v-else>
        <i
          style="cursor: pointer"
          @click="changeLock"
          class="iconfont icon-unlock"
        ></i>
      </div>
      <div class="pdlr05" v-if="isBig">
        <i
          style="cursor: pointer"
          @click="changeBig"
          class="iconfont icon-zhankaishangxia"
        ></i>
      </div>
      <div class="pdlr05" v-else>
        <i
          style="cursor: pointer"
          @click="changeBig"
          class="blue iconfont icon-shouhuishangxia"
        ></i>
      </div>
      <div class="pdlr05">
        <i
          style="cursor: pointer"
          @click="changeToTop"
          :class="{ blue: isTop }"
          class="iconfont icon-zhiding"
        ></i>
      </div>
      <div class="pdlr05">
        <i
          style="cursor: pointer"
          @click="close"
          class="iconfont icon-guanbi"
        ></i>
      </div>
    </div>
    <span class="green"
      >宝贝呀，{{ userInfoMsg.city }}今天的天气是{{ nowWeather.text }}呀<span
        v-if="weatherInfo[0]"
      >,晚上可以看到{{ weatherInfo[0].moonPhase }}哟，</span
      ></span
    ><span class="green"
      ><span v-if="weatherInfo[0]"
        >最高温度是{{ weatherInfo[0].tempMax }}度</span
      ></span
    >
    <br/>
    <br/>
    <p style="text-indent:2;">{{ weatherComfort[7].text.replace("您", "你") }}</p>
    <p>{{ weatherComfort[8].text.replace("您", "你") }}</p>
    <span>{{ weatherComfort[15].text.replace("您", "你") }}</span
    ><br /><br />
    <center>下班倒计时</center>
    <center>
      <span id="todaydatetime">
        今日日期：{{nowYear + " 年 " + nowMonth + " 月 " + nowDay + " 日 "}} 
      </span>
      <br/>
      <span id="clock">
        下班倒计时：{{ xbmsg?xbmsg:o + "小时:" + m + "分:" + s + "秒" }}
      </span>
    </center>
    <!--    01066411166-->
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import moment from "moment";
import api from "../api/api";

export default {
  name: "helloWorld",
  created() {
    this.api = api;
    this.api.getIP().then((r) => {
      //获取花括号里面的内容
      r = r.match(/(?<=\{)[^}]*(?=\})/)[0];
      r = JSON.parse("{" + r + "}");
      // console.log('cid:',r.cid,'\ncip:',r.cip,'\ncname',r.cname);
      // console.log(moment().format("YYYY/MM/DD 星期d HH:mm:ss"))
      this.userInfoMsg = {
        ip: r.cip,
        date: moment().format("YYYY/MM/DD"),
        weekday: moment().format("d"),
        time: moment().format("HH:mm:ss"),
      };
      this.api
        .getUserIpInfo({
          key: "406812c6829086a8777d43ef0bc896d9",
          type: 4,
          ip: r.cip,
        })
        .then((r) => {
          this.userInfoMsg.city = r.city.split("市")[0];
          this.userInfoMsg.country = r.country;
          this.userInfoMsg.district = r.district;
          this.userInfoMsg.isp = r.isp;
          this.userInfoMsg.location = r.location;
          this.userInfoMsg.province = r.province;
          console.log("userInfoMsg:", this.userInfoMsg, r);
        });
    });
    this.api.getWeatherInfo().then((r) => {
      this.weatherInfo = r.daily;
      console.log("weatherInfo:", this.weatherInfo);
    });
    // 实时天气
    this.api.getNowWeather().then((r) => {
      this.nowWeather = r.now;
      console.log("now-weather:", this.nowWeather);
    });
    // 天气指数
    this.api.getWeatherComfort().then((r) => {
      this.weatherComfort = r.daily;
      console.log("weatherComfort:", this.weatherComfort);
    });
  },
  mounted() {
    this.displayTime();
  },
  data: function () {
    return {
      isLock: false,
      isBig: true,
      isTop: false,
      weatherInfo: [],
      nowYear:'',
      nowMonth:"",
      nowDay:'',
      o:'',
      d:'',
      m:'',
      s:'',
      leftTime:1,
      xbmsg:'',
      nowWeather: {},
      weatherComfort: [],
      userInfoMsg: {},
      changeLock: () => {
        this.isLock = !this.isLock;
      },
      changeBig: () => {
        this.isBig = !this.isBig;
        ipcRenderer.invoke("isBig", this.isBig);
      },
      changeToTop: () => {
        this.isTop = !this.isTop;
        ipcRenderer.invoke("isTop", this.isTop);
      },
      close: () => {
        ipcRenderer.invoke("close");
      },
    };
  },
  methods:{
    displayTime: function() {
      var now = new Date();
      this.nowYear = now.getFullYear();
      this.nowMonth = now.getMonth() + 1;
      this.nowDay = now.getDate();

      if (this.leftTime <= 0) {
        this.xbmsg = "宝子，现在下班啦，现在可以回家吃饭啦哈哈哈";
        alert('宝子，现在下班啦，现在可以回家吃饭啦哈哈哈')
      } else {
        var endTime = new Date(
          new Date().toLocaleDateString() + " " + "17:20:00"
        );

        this.leftTime = endTime.getTime() - now.getTime();

        this.leftTime = parseInt(this.leftTime / 1000);
        this.o = Math.floor(this.leftTime / 3600)>10?Math.floor(this.leftTime / 3600):'0'+Math.floor(this.leftTime / 3600);
        this.d = Math.floor(this.o / 24);
        this.m = Math.floor((this.leftTime / 60) % 60)>10?Math.floor((this.leftTime / 60) % 60):'0'+Math.floor((this.leftTime / 60) % 60);
        this.s = this.leftTime % 60>10?this.leftTime % 60:"0"+this.leftTime % 60;
        setTimeout(this.displayTime, 1000);
      }
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
}
.bg {
  background-color: var(--vt-c-black-opacity-dark);
}

.pdlr1 {
  padding: 0 10px;
}

.pdt05 {
  padding-top: 5px;
}

.pdlr05 {
  padding: 0 5px;
}

.drag {
  -webkit-app-region: drag;
  height: 20px;
  width: 100%;
}

.noDrag {
  -webkit-app-region: no-drag;
  height: 20px;
  width: 100%;
}

.blue {
  color: #51c4d3;
}

.iconfont {
  font-size: 20px;
}
</style>