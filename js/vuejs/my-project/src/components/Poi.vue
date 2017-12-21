<template >
  <div class="hello">
    <h1>{{ poimsg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Poi',
  data () {
    return {
      poimsg: 'nico poi duang'
    }
  }
}
</script>

<style scoped>
h1 {
  color:red;
}
</style>
