<template lang="pug">
.history-page.container
  .home__header-link
    a.back(@click="$router.push('/')") Домой

  .history-page__data(v-if="dataset")
    template(v-for="link in dataset.slice(0, 10)", :keys="link.key")
      .history-page__block.history-page__block_type_good(v-if='link.info' @click="goTo(link.key)")
        .history-page__icon X
        .history-page__status {{ getStatus(link.info.counterBad) }}
        .history-page__data {{ link.info.date }}
</template>

<script>
import api from "../assets/js/api";

export default {
  data: () => ({
    dataset: undefined,
    badlinks: true,
  }),
  mounted() {
    api.getKeys(this.$http).then((data) => {
      this.dataset = Object.keys(data).map((values) => data[values].key).reverse();
    });
  },
  methods: {
    getStatus(value) {
      if (value < 30) {
        return 'Угроз не обнаружено'
      } else if (value < 60) {
        return 'Незначительное кол-во угроз'
      } else {
        return 'Угрозы обнаружены'
      }
    },
    goTo(value) {
      this.$router.push('/?result=' + value)
    }
  }
};
</script>

<style lang="scss" scoped>
.history-page {
  .home__header-link {
    margin-top: 30px;
  }

  .history-page__block {
    .history-page__icon {}
    .history-page__status {}
    .history-page__data {}
  }

  .history-page__block_type_good {}
  .history-page__block_type_norm {}
  .history-page__block_type_bad {}

}

        
</style>