<style lang='scss' scoped>
.home {
  * {
    padding: 0;
    margin: 0;
    font-size: 22px;
  }
  @media (min-width: 750px) {
    .card {
      width: 100%;
      position: relative;
      .arrow {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 44px;
        height: 44px;
        img {
          widows: 100%;
          height: 100%;
        }
      }
    }
    .header {
      background: #eee;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      padding: 20px;
      .header-r {
        display: flex;
        display: -webkit-flex;
      }
    }
    .main {
      display: flex;
      justify-content: center;
      -webkit-justify-content: center;
      .main-l {
        margin-right: 280px;
      }
      .title {
        text-align: center;
        margin-bottom: 30px;
      }
    }
    .body {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      padding: 20px;
      .body-l,
      .body-r {
        width: 500px;
        .title {
          font: 20px/20px "";
          margin-bottom: 10px;
        }
        .context {
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 2px #999;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          .context-l {
            width: 64px;
            height: 64px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .context-r {
            .data {
              font: 12px/12px "";
              color: #666;
              margin: 8px;
              display: inline-block;
            }
          }
        }
        .preferences {
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 2px #999;
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          .preferences-l {
            width: 64px;
            height: 64px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .preferences-r {
            .data {
              font: 12px/12px "";
              color: #666;
              margin: 8px;
              display: inline-block;
            }
          }
        }
      }
    }
    .inputmain {
      display: flex;
      display: -webkit-flex;
      padding: 50px 100px;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      align-items: center;
      -webkit-align-items: center;
      .inputmain-l {
        width: 200px;
      }
      .inputmain-lbox {
        width: 64px;
        height: 64px;
        margin-right: 100px;
        transition: all 0.4s;
        animation: theanimation 4s infinite alternate;
        -webkit-animation: theanimation 4s infinite alternate;
        -moz-animation: theanimation 4s infinite alternate;
        -o-animation: theanimation 4s infinite alternate;
        -ms-animation: theanimation 4s infinite alternate;
        img {
          width: 100%;
          height: 100%;
        }
      }
      @keyframes theanimation {
        0% {
          transform: translateX(0);
        }
        50% {
          transform: translateX(50px);
        }
        100% {
          transform: translateX(100px);
        }
      }
      .inputmain-c {
        width: 800px;
      }
      .inputmain-rt,
      .inputmain-rb {
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        margin-bottom: 20px;
      }
      .inputmain-r {
      }
    }
    .time {
      padding: 20px;
      .bounce-enter-active {
        animation: bounce-in 0.5s;
      }
      .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
      }
      @keyframes bounce-in {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.5);
        }
        100% {
          transform: scale(1);
        }
      }
    }
    .el-input {
      width: 200px !important;
      font-size: 14px !important;
    }
    .el-progress-circle {
      width: 180px !important;
      height: 180px !important;
    }
    .el-button {
      width: 160px;
      font: 20px/30px "";
      height: 30px;
    }
    .el-carousel__item .img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  @media (max-width: 750px) {
    .card {
      width: 100%;
      position: relative;
      .arrow {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0.44rem;
        height: 0.44rem;
        img {
          widows: 100%;
          height: 100%;
        }
      }
      .header {
        display: flex;
        background: #eee;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        .header-l {
          font: 0.4rem/.4rem "";
        }
      }
      .main {
        display: flex;
        justify-content: space-around;
        .main-l,
        .main-r {
          .title {
            text-align: center;
          }
          .process {
            width: 2.52rem;
            height: 2.52rem;
            margin: 0 auto;
          }
        }
      }
      .body {
        padding: 0 0.2rem;
        .body-l,
        .body-r {
          .title {
            text-align: center;
            font: 0.36rem/.36rem "";
          }
          .context,
          .preferences {
            padding: 0.4rem;
            margin: 0.2rem 0;
            height: 3rem;
            overflow-y: scroll;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 0 0 2px #999;
            position: relative;
          }
          .context-l,
          .preferences-l {
            width: 0.64rem;
            height: 0.64rem;
            position: absolute;
            top: 0.02rem;
            left: 0.02rem;
            img {
              width: 100%;
              height: 100%；;
            }
          }
          .context-r,
          .preferences-r {
            .data {
              display: inline-block;
              font: 0.3rem/.3rem "";
              margin: 0 0.1rem 0.1rem 0;
            }
          }
        }
      }
      .inputmain {
        .inputmain-l {
          .inputmain-lbox {
            width: 0.6rem;
            height: 0.6rem;
            margin: 0.3rem auto;
            transition: all 0.4s;
            animation: theanimation 4s infinite alternate;
            -webkit-animation: theanimation 4s infinite alternate;
            -moz-animation: theanimation 4s infinite alternate;
            -o-animation: theanimation 4s infinite alternate;
            -ms-animation: theanimation 4s infinite alternate;
            img {
              width: 100%;
              height: 100%;
            }
          }
          @keyframes theanimation {
            0% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(50px);
            }
            100% {
              transform: translateX(100px);
            }
          }
        }
        .inputmain-r,
        .inputmain-c {
          padding: 0.3rem;
        }
        .inputmain-r {
          text-align: center;
          span {
            padding: 0.2rem;
          }
        }
      }
      .time {
        padding: 0.3rem;
        .timebox {
          font: 0.4rem/.4rem "";
        }
        .bounce-enter-active {
          animation: bounce-in 0.5s;
        }
        .bounce-leave-active {
          animation: bounce-in 0.5s reverse;
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    }
    .el-button {
      width: 2.4rem;
      font: 0.3rem/.5rem "";
      height: 0.5rem;
    }
    .el-input {
      font-size: 0.4rem !important;
      margin-bottom: 0.3rem;
    }
    
  }
}
</style>
<template>
  <div class="home">
    <div class="card" :style="{height:clientheight+'px'}">
      <div class="header">
        <div class="header-l">Smart Climate Control</div>
        <div class="header-r">
          <div class="header-rr">
            <el-switch v-model="value1" active-text="on" inactive-text="off"></el-switch>
          </div>
        </div>
      </div>
      <div class="main" :style="{marginTop:clientheight/20+'px'}">
        <div class="main-l">
          <div class="title">Driver</div>
          <div class="process">
            <el-progress
              type="circle"
              :percentage="25"
              :color="colors"
              :strokeWidth="9"
              :format="format1"
            ></el-progress>
          </div>
        </div>
        <div class="main-r">
          <div class="title">Passenger</div>
          <div class="process">
            <el-progress
              type="circle"
              :percentage="75"
              :color="colors"
              :strokeWidth="9"
              :format="format2"
            ></el-progress>
          </div>
        </div>
      </div>
      <div class="body" :style="{marginTop:clientheight/20+'px'}">
        <div class="body-l">
          <div class="title">Context</div>
          <div class="context">
            <div class="context-l">
              <img src="@/assets/img/water.png" alt />
            </div>
            <div class="context-r">
              <div class="data" v-for="item,index in context">{{item.key}}:{{item.value}}</div>
            </div>
          </div>
        </div>
        <div class="body-r">
          <div class="title">Preferences</div>
          <div class="preferences">
            <div class="preferences-l">
              <img src="@/assets/img/temperature.png" alt />
            </div>
            <div class="preferences-r">
              <div class="data" v-for="item,index in preferences">{{item.key}}:{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow">
        <img src="@/assets/img/doublearrow.png" alt />
      </div>
    </div>
    <div class="card" :style="{height:clientheight+'px'}">
      <div class="header">
        <div class="header-l">Smart Schedule</div>
        <div class="header-r">
          <div class="header-rr">
            <el-switch v-model="value2" active-text="on" inactive-text="off"></el-switch>
          </div>
        </div>
      </div>
      <div class="inputmain">
        <div class="inputmain-l">
          <div class="inputmain-lbox">
            <img src="@/assets/img/position.png" alt />
          </div>
        </div>
        <div class="inputmain-c">
          <div class="inputmain-rt">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="currentLocation"></el-input>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="meetingLocation"></el-input>
          </div>
          <div class="inputmain-rb">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-date" v-model="meetingDate"></el-input>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-date" v-model="meetingTime"></el-input>
          </div>
        </div>
        <div class="inputmain-r">
          <el-button type="primary" @click="submitinfo">set meeting</el-button>
        </div>
      </div>
      <div class="time">
        <transition name="bounce">
          <div class="timebox" v-if="isshow">Time to leave………</div>
        </transition>
      </div>
      <div class="arrow">
        <img src="@/assets/img/doublearrow.png" alt />
      </div>
    </div>
    <div class="card" :style="{height:clientheight+'px'}">
      <div class="header">
        <div class="header-l">Designed by:</div>
        <div class="header-r">
          <div class="header-rr">{{designer}}</div>
        </div>
      </div>
      <div class="swiper">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <div class="img">
              <img src="item" alt />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
      imglist: [],
      designer: "**",
      isshow: false,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      clientheight: "",
      value1: true,
      value2: true,
      status: "Off",
      data: [],
      driver: "None",
      passenger: "None",
      driverLogSize: 50,
      passengerLogSize: 20,
      context: [
        { key: "ambient_temperature", value: 2 },
        { key: "ambient_temperature", value: 2 },
        { key: "ambient_temperature", value: 2 }
      ],
      preferences: [
        { key: "ambient_temperature", value: 2 },
        { key: "ambient_temperature", value: 2 },
        { key: "ambient_temperature", value: 2 }
      ],
      timer: "",
      meetingDate: "meetingDate",
      meetingTime: "9:00",
      currentLocation: "san jose",
      meetingLocation: "san jose",
      timeToLeave: ""
    };
  },
  components: {},
  methods: {
    submitinfo() {
      this.isshow = true;
    },
    format1() {
      return this.driver;
    },
    format2() {
      return this.passenger;
    },
    isMobile() {
      if (!window.navigator || !window.navigator.userAgent) {
        return false;
      }
      return !!window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
    },
    getStatus() {
      const path = "http://localhost:1234/scc/status";
      axios
        .get(path)
        .then(res => {
          if (res.data) {
            this.status = "On";
          } else {
            this.status = "Off";
          }
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getUsers() {
      const path = "http://localhost:1234/scc/users";
      axios
        .get(path)
        .then(res => {
          this.driver = res.data[0];
          this.passenger = res.data[1];
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    getUserStatus() {
      console.log(this.driver, this.passenger);
      if (this.driver != "None") {
        const path =
          "http://localhost:1234/scc/users/status?user=" + this.driver;
        console.log(path);
        axios
          .get(path)
          .then(res => {
            this.driverLogSize = res.data[1] * 100;
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error(error);
          });
      } else {
        this.driverLogSize = 0;
      }
      if (this.passenger != "None") {
        const path =
          "http://localhost:1234/scc/users/status?user=" + this.passenger;
        console.log(path);
        axios
          .get(path)
          .then(res => {
            this.passengerLogSize = res.data[1] * 100;
          })
          .catch(error => {
            // eslint-disable-next-line
            console.error(error);
          });
      } else {
        this.passengerLogSize = 0;
      }
    },
    getData() {
      const path = "http://localhost:1234/scc/data";
      axios
        .get(path)
        .then(res => {
          this.context = res.data["context"];
          this.preferences = res.data["preferences"];
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    refresh() {
      console.log("refresh");
      this.getStatus();
      this.getUsers();
      this.getUserStatus();
      this.getData();
    },
    setMeeting() {
      const path =
        "http://localhost:1234/schedule?origin=" +
        this.currentLocation +
        "&destination=" +
        this.meetingLocation +
        "&earliness=0&meeting_time=" +
        this.meetingTime;
      axios
        .get(path)
        .then(res => {
          var date = new Date(res.data);
          this.timeToLeave = "Time to leave is " + date;
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error);
        });
    }
  },
  created() {
    this.clientheight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    // this.refresh();
    // this.timer = setInterval(this.refresh, 5000);
  }
};
</script>
