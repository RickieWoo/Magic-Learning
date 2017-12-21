<template>
 <!-- newest article in blog-->
    <div class="content " id="about " ng-repeat="source in sourceList ">
        <div :data-id="source.id" class="post-box ">
            <div class="post-inner ">
                <div class="post-title ">
                    <h1>
                        <a href="'./content#'+source.id">{{source.title}}</a>
                    </h1>
                    <b class="time-stamp">{{source.time}}</b>
                </div>
                <div class="post-content-view" ng-bind-html="source.content">
                    {{source.content}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Article',
    data () {
      return {

      }
    },
    methods: {
      fetchData () {
        class Point {
          constructor(x, y) {
            this.x = x
            this.y = y
          }
          toString() {
            return '(' + this.x + ',' + 'this.y' + ')'
          }
        }
      }
    }
  }
</script>
