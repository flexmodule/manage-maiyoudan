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
        transition: all .4s;
        animation:theanimation 4s infinite alternate; 
      -webkit-animation:theanimation 4s infinite alternate ; 
      -moz-animation:theanimation 4s infinite alternate ; 
      -o-animation:theanimation 4s infinite alternate ; 
      -ms-animation:theanimation 4s infinite alternate ; 
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
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
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
      font-size: 14px!important;
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
  }
  @media (max-width: 750px) {
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
            <el-switch v-model="value1" active-text="开" inactive-text="关"></el-switch>
          </div>
        </div>
      </div>
      <div class="main" :style="{marginTop:clientheight/12+'px'}">
        <div class="main-l">
          <div class="title">Driver</div>
          <div class="process">
            <el-progress type="circle" :percentage="25" :color="colors" :strokeWidth="9" :format="format1"></el-progress>
          </div>
        </div>
        <div class="main-r">
          <div class="title">Passenger</div>
          <div class="process">
            <el-progress type="circle" :percentage="75" :color="colors" :strokeWidth="9" :format="format2"></el-progress>
          </div>
        </div>
      </div>
      <div class="body" :style="{marginTop:clientheight/20+'px'}">
        <div class="body-l">
          <div class="title">Context</div>
          <div class="context">
            <div class="context-l">
              <img src="@/assets/img/water.png" alt>
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
              <img src="@/assets/img/temperature.png" alt>
            </div>
            <div class="preferences-r">
              <div class="data" v-for="item,index in preferences">{{item.key}}:{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="arrow">
        <img src="@/assets/img/doublearrow.png" alt>
      </div>
    </div>
    <div class="card" :style="{height:clientheight+'px'}">
      <div class="header">
        <div class="header-l">Smart Schedule</div>
        <div class="header-r">
          <div class="header-rr">
            <el-switch v-model="value2" active-text="开" inactive-text="关"></el-switch>
          </div>
        </div>
      </div>
      <div class="inputmain">
        <div class="inputmain-l">
          <div class="inputmain-lbox">
          <img src="@/assets/img/position.png" alt>
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
        <div class="inputmain-r"><el-button type="primary">set meeting</el-button></div>
      </div>
      <div class="time"><transition name="bounce"><div class="timebox" v-if='isshow'>Time to leave………</div></transition></div>
      <div class="arrow">
        <img src="@/assets/img/doublearrow.png" alt>
      </div>
    </div>
    <div class="card" :style="{height:clientheight+'px'}">
      <div class="header">
        <div class="header-l">Designed by: </div>
        <div class="header-r">
          <div class="header-rr">
           
          </div>
        </div>
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
      isshow:true,
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
