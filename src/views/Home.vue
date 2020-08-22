<template lang='pug'>
.home-page.container
  template(v-if="!isloading")
    .home-page__buttons
      router-link(to="/") Threat vision

    .home-page__input
      input#file(type="file", ref="file", v-on:change="handleFileUpload()")
      button(v-on:click="submitFile()") Submit

  template(v-else)
    h1 Идет загрузка
</template>

<script>
const url = "http://threat-vision-api.herokuapp.com/predict";
import api from "../assets/js/api";

export default {
  data: () => ({
    response: "",
    file: "",
    isloading: false,
  }),
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);

      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.response = response.data;
          api.postResult(this.$http, this.response).then((key) => {
            api.postKey(this.$http, key);

            this.$store.commit("setResponse", this.response);
            this.isloading = false;
            this.$router.push({ query: { result: key } });
          });
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
      this.isloading = true;
    },
  },
};
</script>

<style lang="scss">
.home-page {
  .home-page__buttons {
    margin: 50px auto;
  }
  .home-page__input {
    display: flex;
    justify-content: center;
  }
}
</style>