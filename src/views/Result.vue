<template lang="pug">
.home
  router-link(to="/") <- Home
  canvas#chartPie
  canvas#chartScatter
  button(@click="postNewResult") Чёрт
</template>


<script>
import Chart from "chart.js";
import { mapState } from "vuex";
import api from "../assets/js/api";

export default {
  computed: {
    ...mapState(["response"]),
  },
  mounted() {
    if (this.response === undefined || this.response.data === undefined) {
      api
        .getResultByKey(this.$http, this.$route.params.id)
        .then((data) => {
          this.$store.commit("setResponse", data.data.result);
          this.charts();
        })
        // .catch(() => {
        //   // this.$router.push("/");
        // });
    } else {
      this.charts();
    }
  },
  methods: {
    postNewResult() {
      // api.postKey(this.$http, '-MFKcBKc-mVhYamDlYh7')
      api.getResultByKey(this.$http, "-MFKpYpE257WWTsU8xs4");
      // api.deleteAll().then(dat => {
      //   console.log(data)
      //   return data
      // })
      // api.postNewResult(this.$http, this.response).then(data => {
      //   console.log(data)
      //   return data
      // })
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
      let counterBad = 0
      let counterGood = 0

      const values = this.response;
      
      values.forEach((value) => (value > 0.5 ? counterBad++ : counterGood++));

      console.log(counterGood, counterBad)
      // const scatter = values.map((value) => ({ x: value[1], y: value[2] }));

      const dataChartPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: [counterGood, counterBad],
              backgroundColor: ["#3e95cd", "#8e5ea2"],
            },
          ],
          labels: ["Good", "Bad"],
        },

        options: {
          title: {
            display: true,
            text: "Нейросеть графики",
          },
          responsive: true,
          animation: {
            duration: 1.5,
            easing: "linear",
          },
        },
      };

      // const dataChartScatter = {
      //   type: "scatter",
      //   data: {
      //     datasets: [
      //       {
      //         label: "Scatter Dataset",
      //         data: scatter,
      //         pointBorderColor: new Color("pink"),
      //         pointBackgroundColor: new Color("#ff0000"),
      //       },
      //     ],
      //   },
      //   options: {
      //     scales: {
      //       xAxes: [
      //         {
      //           type: "linear",
      //           position: "bottom",
      //         },
      //       ],
      //     },
      //   },
      // };
      // console.log(this.response.data)

      this.createChart("chartPie", dataChartPie);
      // this.createChart("chartScatter", dataChartScatter);
    },
  },
};
</script>

<style lang="scss">
.home {
  max-width: 800px;
  margin: auto;
}
</style>