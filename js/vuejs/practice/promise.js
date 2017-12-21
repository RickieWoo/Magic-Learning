// let p1 = Promise.resolve("foo")
// // 1. 接收 "foo" 并与 "bar" 拼接，并将其结果做为下一个resolve返回。
// .then(function(string) {
//   console.log(1)
//   return new Promise(function(resolve, reject) {
//     console.log(11)
//     setTimeout(function() {
//       console.log(12)
//       string += 'bar';
//       resolve(string);
//     }, 1);
//   });
// })
// // 2. 接收 "foobar", 放入一个异步函数中处理该字符串
// // 并将其打印到控制台中, 但是不将处理后的字符串返回到下一个。
// .then(function(string) {
//   console.log(2)
//   setTimeout(function() {
//     console.log(21)
//     string += 'baz';
//     console.log(string);
//   }, 1)
//   return string;
// })
// // 3. 打印本节中代码将如何运行的帮助消息，
// // 字符串实际上是由上一个回调函数之前的那块异步代码处理的。
// .then(function(string) {
//   console.log("Last Then:  oops... didn't bother to instantiate and return " +
//               "a promise in the prior then so the sequence may be a bit " +
//               "surprising");

//   // 注意 `string` 这时不会存在 'baz'。
//   // 因为这是发生在我们通过setTimeout模拟的异步函数中。
//   console.log('3 '+ string);
// });

// let p2 = Promise.resolve()
// .then( () => {
//   // 使 .then() 返回一个 rejected promise
//   throw 'Oh no!';
// })
// .catch( reason => {
//   console.error( 'onRejected function called: ', reason );
// })
// .then( () => {
//   console.log( "I am always called even if the prior then's promise rejects" );
// });


// let p3 = Promise.resolve('wooo')
// .then( (string) => {
//   console.log('[i am the 1st]')
//   string += '[add at 1st]'
//   return string
// })
// .then( (string) => {
//   string += ' [add at 2nd] '
//   console.log('[i am th 2nd ] '+string)
//   setTimeout(()=>{
//     string+=' [add at 1s later] '
//     console.log('[1s later] '+string)
//     return string
//     //useless
//   },1)
//   return string
// })
// .then((string)=>{
//   console.log(string)
// })

// Promise.all([p1 , p2, p3]).then(values => { 
//   console.log(values); 
//   // [3, 1337, "foo"] 
// });

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
      for(let j = i + 1 ; j<nums.length ;j++){
        if(nums[j]+nums[i]==target){
          console.log(i,j)
          return [i+1,j+1]
      }
    }
  }
};
twoSum([-3,1,3],0)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 * @argument {_1_9}
 */

  var findTarget = function(root, k) {
    let arr = arr.
    if(root) {
      if( root.left) {
        findTarget(root.left,k)
      }
      else if (root.right) {
        findTarget(root.right,k)
      }
    }
    return false
  };

// 链式存储结构
function BinaryTree(data, leftChild, rightChild) {
    this.val = data || null;
    console.log(this.val)
    // 左右孩子结点
    this.left = leftChild || null;
    this.right = rightChild || null;
}
var root = BinaryTree(2,1,3)
console.log(root.val)
console.log(findTarget(root,3))

const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
const makeRequestNew = () => {
  const data = await getJSON()
  if(data.needsAnotherRequest){
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  }else{
    console.log(data)
    return data
  }

}

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

exports.rejectOrder = function (rejectParams) {
  return new Promise((resolve, reject) => {
    try{
      const _rejectParams = await _validateOrderDeliverOrRejectParams(rejectParams)
      const value = await _validateUserPermission(rejectParams)
      debug(`[Reject] validated deliver params`)
      const order = await OrderDB.getOrderRecord(value.user_id,value.order_id)
      let orderItem = order.Item
      debug()
      if(IsEmpty(orderItem)){
          let orderItem = Promise.reject()
      }
      let orderItem = _validateRejectOrderStatus(orderItem)
      debug(`[Reject] get order => ${JSON.stringify(orderItem, null, 2)}`)
      orderItem.status = OrderSet.StatusSet.CANCELED
      debug(`[Reject] Ready to change state`)
      const orderData = await OrderDB.updateOrder(orderItem)
      let orderItem = orderData.Attributes
      orderItem.order_id = orderItem.timestamp
      delete orderItem.timestamp
      return {order: orderItem}
  
    }
    catch (err) {
      reject(err)
    }
  })
}