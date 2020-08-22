<template lang="pug">
  #app
    HomePage(v-if='!$route.query.result')
    ResultPage(v-else)
</template>

<script>
import HomePage from "./views/Home";
import ResultPage from "./views/Result";

export default {
  components: {
    HomePage,
    ResultPage,
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

