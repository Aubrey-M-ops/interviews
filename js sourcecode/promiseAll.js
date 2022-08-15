Promise.all = function (iterator) {  
    let count = 0//用于计数，当等于len时就resolve
    let len = iterator.length
    let res = []//用于存放结果
    return new Promise((resolve,reject) => {
        for(let fn in iterator){
            Promise.resolve(fn)//先转化为Promise对象
            .then((data) => {
                // res[i] = {status: 'fufilled', data}
                //resolve[res]
                res[i] = data;
                if(++count === len){
                    resolve(res)
                }
            })
            .catch(e => {
                // res[i] = {status: 'rejected', data}
                reject(e)
            })
        }
    })
}

var promise1 = Promise.resolve(3);
var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
var promise3 = 42;

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});

Promise.all = function(iterator){
    let count = 0
    const arr = []
    return new Promise((resolve, reject)=>{
        for(let fn of iterator){
            Promise.resolve(fn).then((res)=>{
                arr.push(res)
                count++
                if(count === iterator.length){
                    resolve(arr)
                }
            }).catch((e)=>{
                reject(e)
            })
        }
    })
}