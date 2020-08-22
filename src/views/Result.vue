<template lang="pug">
.home.container(v-show='!isloading')
  .home__header-link
    a(@click='goBack').back Домой | 
    a(@click='goHistory').back2 История
  .results
    .results-wrapper
      .results__info(:class="status")
        img(src='../assets/image/file.png').results__img
        .results__info-text {{ statusMessage }}

    .results-wrapper
      .results__diagram
        canvas#chartPie
</template>


<script>
import Chart from "chart.js";
import { mapState } from "vuex";
import api from "../assets/js/api";

export default {
  data: () => ({
    isloading: true,
    badtraffic: false,
    status: 'good',
    statusMessage: 'Угрозы обнаружены'
  }),
  computed: {
    ...mapState(["response"]),
  },
  mounted() {
    if (this.response === undefined || this.response.data === undefined) {
      api
        .getResultByKey(this.$http, this.$route.query.result)
        .then((data) => {
          this.$store.commit("setResponse", data.data.result);

          if (data.data.result.counterBad < 30) {
            this.status = 'good'
            this.statusMessage = 'Проверка пройдена успешно'
          } else if (data.data.result.counterBad < 60) {
            this.status = 'norm'
            this.statusMessage = 'Незначительное количество угроз'
          } else {
            this.status = 'bad'
            this.statusMessage = 'Обнаружены угрозы'
          }

          this.charts();
          this.isloading = false
        })
        .catch(() => {
          alert('Данного рассчета не существует')
          this.$router.push("/");
        });
    } else {
      console.log('Через стор')
      this.charts();
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    goHistory() {
      this.$router.push('/?history=true')
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
    charts() {
      const dataChartPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: [Math.round(this.response.counterGood), Math.round(this.response.counterBad)],
              backgroundColor: ["#00a1fa", "#5a5fa0"],
            },
          ],
          labels: ["Нормальный", "Потенциально опасный"],
        },

        options: {
          title: {
            display: true,
            text: "Сетевой трафик",
          },
          responsive: true,
          animation: {
            duration: 1.5,
            easing: "linear",
          },
        },
      };

      this.createChart("chartPie", dataChartPie);
    },
  },
};
</script>

<style lang="scss">
$redColor: #A60000;
$greenColor: #008500;
$greyColor: #212022;
$blueColor: #5a5fa0;
$yellowColor: #cd7003;

.home {
  max-width: 1280px;
  margin: auto;

  .home__header-link {
    margin-top: 30px;
  }
}

.results {
  font-family: Helvetica, sans-serif;
  display: block;

  .results-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  .results__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 200px;
    padding-left: 35px;
    padding-right: 35px;
    background: rgba($greenColor,0.5);
    border: 2px dashed $greenColor;
  }

  .bad {
    background: rgba($redColor,0.5);
    border: 2px dashed $redColor;
  }

  .norm {
    background: rgba($yellowColor,0.5);
    border: 2px dashed $yellowColor;
  }

  .good {
    background: rgba($greenColor,0.5);
    border: 2px dashed $greenColor;
  }

  .results__info-text {
    font-size: 32px;
    // color: #fff;
  }
  .results__img {
    width: 75px;
    height: 100px;
    margin-right: 35px;
  }
}
.results__diagram {
  width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back2 {
  font-size: 24px;
  color: $blueColor;
  text-decoration: none;
  position: relative;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: $greyColor
  }
}

.back {
  font-size: 24px;
  color: $blueColor;
  text-decoration: none;
  position: relative;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: $greyColor
  }

  &::before {
    position: absolute;
    content: '';
    width: 14px;
    height: 24px;
    background: url('../assets/image/back1600.png');
    top: 50%;
    transform: translateY(-50%);
    left: -24px;
  }
}
</style>