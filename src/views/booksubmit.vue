<style lang="scss" scope>
.booksubmit {
	.header {
		position: relative;
		background: #d74d33;
		text-align: center;
		padding: .2rem 0;
		.header-l {
			position: absolute;
			left: .2rem;
			top: .3rem;
			font-size: 0;
        width: 0.3rem;
				height: 0.3rem;
				transform: rotate(180deg);
        img {
          width: 100%;
          height: 100%;
        }
		}
		.header-r {
			font: .3rem/.5rem "";
			color: #fff;
		}
	}
	.body {
		padding: .3rem .6rem;
		.data {
			.data-t {
				font: .3rem/.7rem "";
				color: #999;
			}
			.data-b {
				padding-left: 2rem;
				display: flex;
				justify-content: space-between;
				.data-bl {
					font: .3rem/.4rem "";
					color: #000;
					margin-right: .8rem;
				}
				.data-br {
					width: .4rem;
					height: .4rem;
					font-size: 0;
					img {
						width: 100%;
						height: 1005;
					}
				}
			}
			.te {
				padding: 0;
				textarea {
					width: 100%;
					border: none;
					height: 2rem;
					padding-left: .2rem;
					&:focus {
						border: none;
						outline: none;
					}
				}
			}
		}
	}
	.submit {
		width: 3.4rem;
		text-align: center;
		color: #fff;
		font: .3rem/.6rem "";
		margin: .2rem auto;
		background: #d74d33;
		border-radius: .3rem;
	}
}
</style>
<template>
  <div class="booksubmit">
    <div class="header">
			<div class="header-l" @click="returnmeeting"><img src="@/assets/img/arrow.png" alt=""></div>
			<div class="header-r">预定提交</div>
		</div>
		<div class="body">
			<div class="data">
				<div class="data-t">预定会议室</div>
				<div class="data-b">
					<div class="data-bl">9s-908</div>
					<div class="data-br"><img src="@/assets/img/selectarrow.png" alt=""></div>
				</div>
			</div>
			<div class="data">
				<div class="data-t">预定日期</div>
				<div class="data-b">
					<div class="data-bl">2017-03</div>
					<div class="data-br"><img src="@/assets/img/selectarrow.png" alt=""></div>
				</div>
			</div>
			<div class="data">
				<div class="data-t">开始时间</div>
				<div class="data-b">
					<div class="data-bl">08:30</div>
					<div class="data-br"><img src="@/assets/img/selectarrow.png" alt=""></div>
				</div>
			</div>
			<div class="data">
				<div class="data-t">结束时间</div>
				<div class="data-b">
					<div class="data-bl">12:00</div>
					<div class="data-br"><img src="@/assets/img/selectarrow.png" alt=""></div>
				</div>
			</div>
			<div class="data">
				<div class="data-t">预定会议室</div>
				<div class="data-b te"><textarea name="" id="" cols="30" rows="10">会议用途在此输入</textarea>	</div>
			</div>
		</div>
		<div class="submit">提交</div>
  </div>
</template>

<script>


export default {
  name: 'booksubmit',
  components: {},
  data() {
    return {
			roomnum: "9S-908",
		
    };
  },
  methods: {
		returnmeeting() {
			this.$router.push("/");
		}
  },
  mounted() {}
}
</script>
