<style lang='scss' scoped>

</style>
<template>
  <div class="page container-fluid text-left">

    <b-row class="text-left">
      <b-col cols=12>
        <h4>Status: {{ status }}</h4>
      </b-col>
    </b-row>

    <b-row class="text-left">
      <b-col cols=6>
        Driver: {{ driver }}
        <b-progress :value=driverLogSize :max=100></b-progress>
      </b-col>
      <b-col cols=6>
        Passenger: {{ passenger }}
        <b-progress :value=passengerLogSize :max=100></b-progress>
      </b-col>
    </b-row>

    </br>
    <b-row class="text-left"> <b-col cols=12> Context: {{ context }} </b-col> </b-row>
    <b-row class="text-left"> <b-col cols=12> Preferences: {{ preferences }} </b-col> </b-row>

    <b-row>
    </br></br>
    </b-row>

    <h4>Smart Schedule</h4>
    <b-row>

      <b-col cols=2>
        <b-form-input v-model="currentLocation" placeholder="Current Location"></b-form-input>
      </b-col>
      <b-col cols=2>
        <b-form-input v-model="meetingLocation" placeholder="Meeting Location"></b-form-input>
      </b-col>
      <b-col cols=2>
        <b-form-input v-model="meetingDate" placeholder="Meeting Date"></b-form-input>
      </b-col>
      <b-col cols=2>
        <b-form-input v-model="meetingTime" placeholder="Meeting Time"></b-form-input>
      </b-col>
      <b-col>                                 
        <b-button @click=setMeeting>Set Meeting</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        {{ timeToLeave }}
      </b-col>
    </b-row>


  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'about',
  data() {
    return {
      status: 'Off',
      data: [],
      driver: 'None',
      passenger: 'None',
      driverLogSize: 50,
      passengerLogSize: 20,
      context: {},
      preferences: {},
      timer: '',
      meetingDate: [],
      meetingTime: [],
      currentLocation: [],
      meetingLocation: [],
      timeToLeave: '',
    }
  },
  components: {
  },
  methods: {
    getStatus() {
        const path = 'http://localhost:1234/scc/status'
        axios
          .get(path)
          .then((res) => {
            if (res.data) {
              this.status = 'On';
            }
            else {
              this.status = 'Off';
             }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
      getUsers() {
        const path = 'http://localhost:1234/scc/users'
        axios
          .get(path)
          .then((res) => {
            this.driver = res.data[0];
            this.passenger = res.data[1];
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
      getUserStatus() {
        console.log(this.driver, this.passenger)
        if (this.driver != 'None') {
          const path = 'http://localhost:1234/scc/users/status?user=' + this.driver;
          console.log(path);
          axios
            .get(path)
            .then((res) => {
              this.driverLogSize = res.data[1] * 100;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error(error);
            });
        }
        else {
          this.driverLogSize = 0
        }
        if (this.passenger != 'None') {
          const path = 'http://localhost:1234/scc/users/status?user=' + this.passenger;
          console.log(path);
          axios
            .get(path)
            .then((res) => {
              this.passengerLogSize = res.data[1] * 100;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error(error);
            });
        }
        else {
          this.passengerLogSize = 0
        }
      },
      getData() {
        const path = 'http://localhost:1234/scc/data'
        axios
          .get(path)
          .then((res) => {
            this.context = res.data['context'];
            this.preferences = res.data['preferences'];
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
      refresh() {
        console.log('refresh');
        this.getStatus();
        this.getUsers();
        this.getUserStatus();
        this.getData();
      },
      setMeeting() {
        const path = 'http://localhost:1234/schedule?origin=' + this.currentLocation + '&destination=' + this.meetingLocation + '&earliness=0&meeting_time=' + this.meetingTime;
        axios
          .get(path)
          .then((res) => {
            var date = new Date(res.data);
            this.timeToLeave = 'Time to leave is ' + date;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
  },
  created() {
    // this.refresh();
    // this.timer = setInterval(this.refresh, 5000);
  }
};
</script>
