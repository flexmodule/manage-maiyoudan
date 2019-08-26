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
      padding: 20px;
      .header-r {
        display: flex;
        display: -webkit-flex;
      }
    }
    .main {
      display: flex;
      justify-content: center;
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
					align-items: center;
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
					align-items: center;
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
            <el-progress type="circle" :percentage="25" :color="colors" :strokeWidth="9"></el-progress>
          </div>
        </div>
        <div class="main-r">
          <div class="title">Passenger</div>
          <div class="process">
            <el-progress type="circle" :percentage="75" :color="colors" :strokeWidth="9"></el-progress>
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
							<div class="data" v-for="item,index in arr">{{item.key}}:{{item.value}}</div>
						</div>
          </div>
        </div>
        <div class="body-r">
          <div class="title">Preferences</div>
          <div class="preferences">
            <div class="preferences-l">
              <img src="@/assets/img/temperature.png" alt />
            </div>
            <div class="preferences-r"><div class="data" v-for="item,index in arr">{{item.key}}:{{item.value}}</div></div>
          </div>
        </div>
      </div>
      <div class="arrow">
        <img src="@/assets/img/doublearrow.png" alt />
      </div>
    </div>
    <div class="card" :style="{height:clientheight+'px'}"></div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: "home",
  data() {
    return {
			arr:[{key:'ambient_temperature',value:2},{key:'ambient_temperature',value:2},{key:'ambient_temperature',value:2}],
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ],
      clientheight: "",
      value1: true,
      status: "Off",
      data: [],
      driver: "None",
      passenger: "None",
      driverLogSize: 50,
      passengerLogSize: 20,
      context: {},
      preferences: {},
      timer: "",
      meetingDate: [],
      meetingTime: [],
      currentLocation: [],
      meetingLocation: [],
      timeToLeave: ""
    };
  },
  components: {},
  methods: {
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
