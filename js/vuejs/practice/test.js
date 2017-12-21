// // Vue.component('my-component',{
// //   template:'<div>hello</div>',
// // })
// let child = {
//   template:'<div>wow</div>',
// }

// new Vue({
//   el: '#app',
//   data: {
//     newTodo: '',
//     todos: [
//       { text: 'Add some todos' }
//     ]
//   },
//   methods: {
//     addTodo: function () {
//       let text = this.newTodo.trim()
//       if (text) {
//         this.todos.push({ text: text })
//         this.newTodo = ''
//       }
//     },
//     removeTodo: function (index) {
//       this.todos.splice(index, 1)
//     }
//   },
//   components:{
//     'my-component':child
//   }
// })


// Vue.component('button-counter', {
//   template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
//   data: function () {
//     return {
//       counter: 0
//     }
//   },
//   methods: {
//     incrementCounter: function () {
//       this.counter += 1
//       this.$emit('increment')
//     }
//   },
// })
// new Vue({
//   el: '#counter-event-example',
//   data: {
//     total: 0
//   },
//   methods: {
//     incrementTotal: function () {
//       this.total += 1
//     }
//   }
// })

// var debug = process.env.NODE_ENV;
// console.log('debug is ',debug);
// import Vue from 'vue'
// import App from './App'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

exports.rejectOrder = function (rejectParams) {
  return new Promise((resolve, reject) => {

      _validateOrderDeliverOrRejectParams(rejectParams)
          .then(rejectParams => {
              return _validateUserPermission(rejectParams);
          })
          .then(value => {
              debug(`[Reject] validated deliver params`);
              return OrderDB.getOrderRecord(value.user_id, value.order_id);
          })
          .then(order => {
              let orderItem = order.Item;
              debug(`[Reject] get order => ${JSON.stringify(orderItem, null, 2)}`);

              if (IsEmpty(orderItem)) {
                  return Promise.reject(ResponseErrorSet.createResponseError(ResponseErrorSet.OrderErrorSet.ORDER_NOT_EXISTS));
              }

              return _validateRejectOrderStatus(orderItem);
          })
          .then(orderItem => {
              orderItem.status = OrderSet.StatusSet.CANCELED;
              debug(`[Reject] Ready to change state`);
              return OrderDB.updateOrder(orderItem);
          })
          .then(orderData => {
              let orderItem = orderData.Attributes;
              orderItem.order_id = orderItem.timestamp;
              delete orderItem.timestamp;

              resolve({order: orderItem});
          })
          .catch(err => {
              reject(err);
          })
  });
};
