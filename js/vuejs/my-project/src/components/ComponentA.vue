<template>
  <div>
    <h1>{{ msg }}</h1>
    <h1>{{ msgfromfather }}</h1>
    <button :click="onClickMe">open mouse</button>
  </div>
</template>
 
<script>
  export default {
    data: function () {
      return {
        msg: 'hello from component A!'
      }
    },
    props: ['msgfromfather'],
    methods: {
      onClickMe: function () {
        console.log(this.msgfromfather)
        this.$emit('child-tell-me-sth', this.msg)
      }
    }
  }
</script>
