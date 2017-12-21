<template>
  <div>
    <nav-bar-top></nav-bar-top>
    <index-header></index-header>
    <index-article></index-article>
  </div>
</template>
<script>
import IndexHeader from './IndexHeader'
import NavBarTop from './NavBarTop'
import IndexArticle from './IndexArticle'
export default {
  name: 'Index',
  components: {IndexHeader, NavBarTop, IndexArticle}
}
</script>
