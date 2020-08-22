<template lang="pug">
.home
  router-link(to="/") <- Home
  canvas#chartPie
  canvas#chartScatter
</template>


<script>
import Chart from "chart.js";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["response"]),
  },
  mounted() {
    let counterGood = 0;
    let counterBad = 0;

    if (this.response === undefined || this.response.data === undefined) {
      this.$router.push("/");
    } else {
      const values = this.response.data;
      values.forEach((value) => (value > 0.5 ? counterBad++ : counterGood++));

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
  },
};
</script>

<style lang="scss">
.home {
  max-width: 800px;
  margin: auto;
}
</style>