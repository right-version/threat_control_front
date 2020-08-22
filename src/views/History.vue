<template lang="pug">
  .history-page
    a(@click='$router.go(-1)') <- Back

    .history-page__data(v-if='dataset')
    template(v-for='link in dataset' :keys="link")
      router-link(:to="'/?result='+link") 
        p {{ link }}
</template>

<script>
import api from "../assets/js/api";

export default {
  data: () => ({
    dataset: undefined
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

</style>