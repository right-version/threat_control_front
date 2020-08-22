<template lang='pug'>
  .home-page.container
    template(v-if='!isloading')
      .header
        .header__logo
          router-link(to='/')
            img(src='../assets/image/logo.png').logo
        router-link(to="/?history=true").header__history  See History
        

    
      .section
        .section__content-wrapper
          .section__input
            .section__drop
              label(for='file' :class="{ 'upload': isUpload }").drop
                .section__text {{ fileName ? fileName :'Загрузите данные сетевых пакетов' }}
                input#file(type="file", ref="file" v-on:change="handleFileUpload()")
            .section__button-item
              button.btn(v-on:click="submitFile()" :class="{'disabled': !isUpload }" :disabled='!isUpload') Отправить на проверку
              
      .info
        h1.info__title Что такое Threat Control ?
        p.info__text
          | Это демо работы нейросети, которая способна анализировать сетевой трафик и выявлять аномальное поведение.

        h1.info__title Какие данные можно загружать в Threat Control?
        p.info__text
          | Данные предобработанных сетевых пакетов. Примеры таких данных можно посмотреть 
          a(href='https://clck.ru/QTjrD' target="_blank") тут
          |.


    template(v-else)
      .loader
        .SPAN.loader__item
        .SPAN.loader__item
        .SPAN.loader__item
        .SPAN.loader__item
      .loader-subtext Дождитесь завершения обработки данных...
            
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
    fileName: ''
  }),
  methods: {
    handleFileUpload() {
      this.isUpload = true
      this.file = this.$refs.file.files[0];
      this.fileName = this.file.name
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

  .header__history {
    font-size: 24px;
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
  margin-bottom: 300px;

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
    text-align: center;
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
    font-size: 32px;
    margin-top: 40px;
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
  background: #c8c7df;
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

.disabled {
  background: #c8c7df;
  &:hover {
    cursor: default;
    box-shadow: none;
  }
}

.loader {
  margin: 0 auto;
  margin-top: 250px;
  position: relative;
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: block;
          
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
.loader-subtext {
  margin-top: 50px;
  text-align: center;
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
    