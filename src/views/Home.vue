<template lang='pug'>
  .home-page.container
    .header
      .header__logo
        router-link(to='/')
          img(src='../assets/image/logo.png').logo
      router-link(to="/?history=true").header__history  See History
        

    template(v-if='!isloading')
      .section
        .section__content-wrapper
          .section__input
            .section__drop
              label(for='file' :class="{ 'upload': isUpload }").drop
                .section__text Загрузите файлы
                input#file(type="file", ref="file" v-on:change="handleFileUpload()")
            .section__button-item  
              button(v-on:click="submitFile()").btn Отправить на проверку
              
      .info
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
      .loader
        .SPAN.loader__item
        .SPAN.loader__item
        .SPAN.loader__item
        .SPAN.loader__item
            
</template>

<script>
const url = "http://threat-vision-api.herokuapp.com/predict";
import api from "../assets/js/api";

export default {
  data: () => ({
    response: '',
    file: '',
    isloading: false,
    isUpload: false,
  }),
  methods: {
    handleFileUpload() {
      this.isUpload = true
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
  margin-top: 100px;
  margin-bottom: 100px;

  .section__button-item {
    margin-top: 40px; 
  }

  .section__content-wrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .section__drop {
    position: relative;

    &:hover {
      .section__text{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .section__input {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: $blueColor;
    font-size: 16px;
    z-index: 1;
  }
}

.logo {
  width: 300px;
}

.info {
  
  .info__title {
    color: $blueColor;
    font-size: 45px;
  }

  .info__text{
    color: $greyColor;
    font-size: 18px;
  }
}
.drop{
  position: relative;
  display: block;
  width: 400px;
  height: 100px;
  border: 2px dashed $blueColor;

  &:hover {
    cursor: pointer;
    background: rgba($blueColor,0.5);
  }
}

.upload {
  background: $greyColor;
}
#file {
  width: 400px;
  height: 100px;
  opacity: 0;
  // border: 1px solid black;

  &:hover {
    cursor: pointer;
    background: rgba($blueColor,0.5);
  }
}

.btn{
  position: relative;
  display: block;
  width: 250px;
  font-size: 20px;
  height: 50px;
  background: $blueColor;
  color: #fff;
  outline: none;
  border: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0 3px 10px 5px rgba($blueColor,0.3s);
  }
}

.loader {
  margin: 0 auto;
  margin-top: 250px;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
          
  &__item {
    position: absolute;
    display: block;

    &:nth-child(1) {
      top: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(90deg, transparent, $blueColor);
      animation: animate1 1s linear infinite;
      animation-delay: 0s;
    }
    &:nth-child(3) {
      bottom: 0;
      left: -100%;
      width: 100%;
      height: 40px;
      background: linear-gradient(90deg, transparent, $blueColor);
      animation: animate3 1s linear infinite;
      animation-delay: 0s;
    }
    &:nth-child(2) {
      right: 0;;
      top: -100%;
      width: 40px;
      height: 100%;
      background: linear-gradient(180deg, transparent, $blueColor);
      animation: animate2 1s linear infinite;
      animation-delay: 0s;
    }
    &:nth-child(4) {
      left: 0;
      top: 100%;
      width: 40px;
      height: 100%;
      background: linear-gradient(180deg, transparent, $blueColor);
      animation: animate4 1s linear infinite;
      animation-delay: 0s;
    }
  }
}
@keyframes animate1 {
   0% {
    left: -100%;
   }
  100% {
    left: 100%;
  }
 }
@keyframes animate3 {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}
@keyframes animate4 {
  0% {
    top: 100%;
  }
  100% {
    top: -100%;
  }
}
</style>
    