<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <p>child tells me : {{childWords}}</p>
    <component-a :child-tell-me-sth="listenToMyChild" msgfromfather="you die "></component-a> -->
    <router-view/>
  </div>
</template>

<script>
import componentA from './components/ComponentA'
export default {
  data: function () {
    return {
      childWords: ''
    }
  },
  name: 'app',
  components: {componentA},
  methods: {
    listenToMyChild: function (msg) {
      this.childWords = msg
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
