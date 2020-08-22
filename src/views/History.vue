<template lang="pug">
.history-page.container
  .home__header-link
    a.back(@click="$router.go(-1)") Back
  .history-page__central
    .history-page__data(v-if="dataset")
      template(v-for="link in dataset.slice(0, 10)", :keys="link.key")
        .history-page__block.history-page__block_type_bad(v-if='link.info' @click="goTo(link.key)")
          .history-page__status {{ getStatus(link.info.counterBad) }}
          .history-page__date {{ link.info.date }}
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
$redColor: #A60000;
$greenColor: #008500;
$greyColor: #212022;
$blueColor: #5a5fa0;
$yellowColor: #cd7003;

.history-page {
  font-family: Helvetica, sans-serif;

  .history-page__central {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .home__header-link {
    margin-top: 30px;
  }

  .history-page__block {
    display: flex;
    padding-top: 20px;
    padding-bottom: 20px;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    border-bottom: 1px solid #212022;

    .history-page__icon {
      width: 20px;
      height: 40px;
    }
  }

  .history-page__block_type_good {
    position: relative;
    color: $greenColor;

    &::before {
      position: absolute;
      content: '';
      background: url('../assets/image/good.png') no-repeat center;
      width: 30px;
      height: 36px;
      top: 50%;
      transform: translateY(-50%);
      left: -40px;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .history-page__block_type_norm {
    position: relative;
    color: $yellowColor;

    &::before {
      position: absolute;
      content: '';
      background: url('../assets/image/normal.png') no-repeat center;
      width: 30px;
      height: 36px;
      top: 50%;
      transform: translateY(-50%);
      left: -40px;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .history-page__block_type_bad {
    position: relative;
    color: $redColor;

    &::before {
      position: absolute;
      content: '';
      background: url('../assets/image/bad.png') no-repeat center;
      width: 30px;
      height: 36px;
      top: 50%;
      transform: translateY(-50%);
      left: -40px;
    }

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    
  }

}

        
</style>