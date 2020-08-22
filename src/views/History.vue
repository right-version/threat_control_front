<template lang="pug">
  .history-page.container
    .home__header-link
      a(@click='$router.go(-1)').back Back

    .history-page__data(v-if='dataset')
    template(v-for='link in dataset' :keys="link")
      router-link(:to="'/?result='+link") 
        p {{ link }}
        
</template>

<script>
import api from "../assets/js/api";

export default {
  data: () => ({
    dataset: undefined,
    badlinks: true,
  }),
  mounted() {
    api
      .getKeys(this.$http)
      .then(data => {
        this.dataset = Object.keys(data).map(values => data[values].key)
        console.log(this.dataset)
      })
  }
}
</script>

<style lang="scss" scoped>
  .history-page {
    .home__header-link {
      margin-top: 30px;
    }
  }
</style>