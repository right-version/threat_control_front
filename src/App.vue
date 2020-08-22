<template lang="pug">
  #app
    HomePage(v-if='!$route.query.result && !$route.query.history')
    HistoryPage(v-else-if='$route.query.history')
    ResultPage(v-else)
</template>

<script>
import HomePage from "./views/Home";
import ResultPage from "./views/Result";
import HistoryPage from "./views/History";

export default {
  components: {
    HomePage,
    ResultPage,
    HistoryPage,
  },
};
</script>

<style lang="scss">
  .container {
    position: relative;
    padding: 0 10px;
    max-width: 1260px;
    margin: auto;
  }

</style>

