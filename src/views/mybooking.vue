<style lang="scss" scope>
.mybooking {
  .header {
    position: relative;
    background: #d74d33;
    padding: 0.1rem 0 0.1rem 0;
    color: #fff;
    .header-l {
      position: absolute;
      left: 0.2rem;
      top: 0.35rem;
      font-size: 0;
      width: 0.3rem;
      height: 0.3rem;
      transform: rotate(180deg);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header-c {
      text-align: center;
      font: 0.3rem/0.8rem "";
    }
    .header-r {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      display: flex;
      align-items: center;
      .header-rl {
        font: 0.2rem/0.4rem "";
        margin-right: 0.1rem;
      }
      .header-rr {
        font-size: 0;
        width: 0.3rem;
        height: 0.3rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
	}
	.info {
		display: flex;
		justify-content: center;
		font: .32rem/.7rem "";
		.info-l {
			color: #999;
			margin-right: .2rem;
		}
		.info-r {
			color: #000;
		}
	}
	.body {
		padding: 0.4rem .8rem 0;
		.data {
			margin-bottom: .3rem;
			position: relative;
			.del {
				position: absolute;
				right: .3rem;
				top: 0;
				font: .24rem/.24rem "";
				color: #4fbbf0;
			}
			.data-t {
				font: .3rem/.5rem "";
			}
			.data-c {
				color: #999;
				font: .24rem/.5rem "";
			}
			.data-b {
				display: flex;
				justify-content: space-between;
				font: .22rem/.5rem "";
				color: #999;
			}
			&:before {
				position: absolute;
				width: .3rem;
				height: .3rem;
				content: "";
				background: #d74d33;
				left: -.5rem;
				border-radius: 50%;
				top: .1rem;
			}
		}
		.other {
			text-align: center;
			font: .3rem/.4rem "";
			color: #333;
		}
	}
}
</style>
<template>
  <div class="mybooking">
    <div class="header">
      <div class="header-l" @click="returnmeeting">
        <img src="@/assets/img/arrow.png" alt />
      </div>
      <div class="header-c">我的预订</div>
      <div class="header-r" @click="returnmeeting">
        <div class="header-rl">会议室预定</div>
        <div class="header-rr">
          <img src="@/assets/img/arrow.png" alt />
        </div>
      </div>
    </div>
		<div class="info">
			<div class="info-l">温馨提示</div>
			<div class="info-r">您最近提交了{{notes.length}}条预定记录</div>
		</div>
		<div class="body">
			<div v-if="notes.length!=0">
				<div class="data" v-for="item,index in notes">
				<div class="data-t">{{item.room}}</div>
				<div class="data-c">{{item.reasons}}</div>
				<div class="data-b">
					<div class="data-bl">{{item.time}}</div>
					<div class="data-br">{{item.date}}</div>
				</div>
				<div class="del" @click="del(index)">删除</div>
			</div>
			</div>
			<div class="other" v-else>对不起，目前没有任何记录</div>
		</div>
  </div>
</template>

<script>
export default {
  name: "mybooking",
  components: {},
  data() {
    return {
			notes:[{room:"9S-908",reasons:'项目组新方案设计推广介绍',time:'09:30-10:00',date:'2017-03-08'},
			{room:"9S-9087",reasons:'项目组新方案设计推广介绍',time:'09:30-10:00',date:'2017-03-08'},]
    };
  },
  methods: {
		del(index) {
			this.notes.splice(index,1);
			this.$forceUpdate()
		},
    returnmeeting() {
      this.$router.push("/");
    }
  },
  mounted() {}
};
</script>
