<template lang='pug'>
  .page.container
    template(v-if='!isloading')
      .header.container
        .header__logo
          router-link(to='/')
            img(src='../assets/image/logo.png').logo
      
        .header__history See History
      .section.container
        .section__content-wrapper
          .section__input
            input#file(type="file", ref="file", v-on:change="handleFileUpload()")
            button(class='btn' v-on:clsick="submitFile()") Submit
      
      .info.container
        H1.info__title Что такое ThreatVision
        P.info__text.
          Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее
          осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях.
          При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом
          от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
        P.info__text. 
          По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при
          попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст
          неповторимый колорит советских времен.


    template(v-else)
      h1 Идет загрузка
</template>

<script>
const url = "http://threat-vision-api.herokuapp.com/predict"

export default {
  data: () => ({
    response: '',
    file: '',
    isloading: false
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
        .then( response => {
          this.response = {data: response.data, token: Math.random()};
          console.log(this.response)
          this.$store.commit('setResponse', this.response)
          this.isloading = false
          this.$router.push(`result/${this.response.token}`)
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
      this.isloading = true
    },
  },
};
</script>

<style lang="scss">
$blueColor: #5a5fa0;
$greyColor: #212022;

.header {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__history {
    font-size: 16px;
    color: $blueColor;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      color: $greyColor
    }
  }
}

.section{
  max-width: 100%;
  height: 200px;
  margin-top: 250px;
  margin-bottom: 250px;

  &__content-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.logo {
  width: 300px;
}

.info {
  
  &__title {
    color: $blueColor;
  }

  &__text{
    color: $greyColor;
    font-size: 14px;
  }

}
</style>
    