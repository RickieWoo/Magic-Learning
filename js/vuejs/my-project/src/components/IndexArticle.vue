<template>
    <!-- newest article in blog-->
  <div>
      <div class="content " id="about " v-for="source in sourceList" v-bind:key="source.id">
        <div :data-id="source.id" class="post-box ">
            <div class="post-inner ">
                <div class="post-title ">
                    <h1>
                        <a :href="'./content#'+source.id">{{source.title}}</a>
                    </h1>
                    <b class="time-stamp">{{source.time}}</b>
                </div>
                <div class="post-content-view" v-html="source.content">
                    {{source.content}}
                </div>
            </div>
        </div>
    </div>
    <article-crud></article-crud>
  </div>
</template>
<script>
import ArticleCRUD from './ArticleCRUD'
export default {
  name: 'IndexArticle',
  components: [ArticleCRUD]
}
</script>
