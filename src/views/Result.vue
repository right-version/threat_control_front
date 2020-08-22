<template lang="pug">
  .home
    router-link(to='/') Home <->
    .h1 Конкретный рассчет
    p {{ this.response }}
</template>


<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['response']),
  }
}
</script>