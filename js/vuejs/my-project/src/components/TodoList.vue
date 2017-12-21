<template>
  <div class="todo-list">
    <input 
      v-model="newTodo" 
      @keyup.enter="addNew"
    >
    <ul>
        <li 
          v-for="todo in content" 
          :key ="todo.key"
          :class="{finshed: todo.isFinished}"
          @click="toggleFinish(todo)"
        >{{todo.content}}</li>
    </ul>
  </div>  
</template>
<script>
import Store from '../store'
export default {
  name: 'TodoList',
  data () {
    return {
      content: Store.fetch(),
      newTodo: ''
    }
  },
  // object.methods 中的函数不用箭头函数，因为可以调用有意义的this
  methods: {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished
    },
    addNew: function () {
      console.log(this.newTodo)
      this.content.push({
        content: this.newTodo,
        key: 1111,
        isFinished: false
      })
      this.newTodo = ''
    }
  },
  watch: {
    'content': {
      handler: function (item) {
        Store.save(item)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.finshed {
  color: blue;
}
</style>

