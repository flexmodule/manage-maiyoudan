<template>
    <div class="home">
			<panel-group :base-data="userdata"/>
			<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
				<line-chart :chart-data="lineChartData"/>
			</el-row>
		</div>
</template>


<script>
import api from '@/api/api';
import LineChart from '@/components/echart/line';
import PanelGroup from '@/components/echart/PanelGroup';
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [1200, 823, 931, 334, 1462, 1440, 1545]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
const userData={
	user:234,
	merchant:344,
	distributor:23,
	ordernum:23,
	tradeMoney:233,
	profit:123
}
export default {
	name: "Home",
	components: {
		LineChart,
		PanelGroup
  },
  data() {
    return {
			userdata:userData,
			lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
		async ceshi() {
			let json=api.getPlanList({type:1});
		}
  },
  mounted () {
		this.ceshi();
      
  }
};
</script>
<style lang="scss" scoped>

</style>