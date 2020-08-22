<template lang="pug">
.home(v-show='!isloading')
  a(@click='$router.go(-1)') <- Back
  .results
    .results__info(:class="{ 'badTraffic': !badTraffic }")
      img(src='../assets/image/file.png').results__img
      template(v-if='!badTraffic')
        .results__info-text Проверка пройдена успешно
      template(v-else)
        .results__info-text Обнаружена угроза

    .results__diagram
      canvas#chartPie
      canvas#chartScatter
</template>


<script>
import Chart from "chart.js";
import { mapState } from "vuex";
import api from "../assets/js/api";

export default {
  data: () => ({
    isloading: true,
    badTraffic: false,
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

.home {
  max-width: 1000px;
  margin: auto;
}

.results {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .results__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 100px;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    background: $greenColor;
    box-shadow: inset 0 -1px 2px 3px rgba($greyColor,0.3);
  }

  .results__info-text {
    font-size: 18px;
    color: #fff;
  }
  .results__img {
    width: 40px;
    height: 60px;
  }
}
.results__diagram {
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>