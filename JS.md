# JS

### addEventListener

addEventListener(event, function,userCapture)

- event:事件名

- function：事件触发时执行的函数

- useCapture: （**目标元素有祖先元素**并且**有同样的事件对应函数**时才有影响）

  - true：Capture 方式 从外往里执行
  - false（默认值）：bubbling 方式 从里往外执行

  常用场景：提交表单时，从input冒泡到form，就先触发了input的默认事件，再出发form绑定的回调函数

## 浅拷贝深拷贝

https://blog.csdn.net/qq_39207948/article/details/81067482#_label0_0 

浅拷贝：如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址，即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

浅：

- 一层遍历

- `Object.assign`
- `Array.prototype.slice()`
- `Array.prototype.concat()`
- ...扩展运算符

深：

手写递归

Json.parse(Json.Stringify()) 

​	_.cloneDeep()

​	

浅拷贝引用内存地址，改变原对象

深拷贝创建一个新的数组或对象***\*将原对象的各项属性的“值”（数组的所有元素）拷贝过来\********

## AJAX

异步JavaScript和XML

> 不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页

步骤

1. 创建XHR对象
2. 通过XHR的open()方法与服务器建立连接
3. 构建数据，send()发给服务端
4. onreadystatechange监听与服务端通信状态
5. 接受并处理服务端响应数据
6. 更新html页面

## Typeof instanceof

- `typeof`会返回一个变量的基本类型，`instanceof`返回的是一个布尔值
- `instanceof` 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型
  - `instanceof` 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上
    - A instanceof B  instanceof` 在查找的过程中会遍历A的原型链，直到找到B的prototype`
  - typeof判断引用类型除了function都是object

## new

`new`操作符用于创建一个给定构造函数的实例对象

可以访问`构造函数中的属性`、`构造函数原型链中的属性`

- 创建一个新的对象`obj`
- 将对象与构建函数通过原型链连接起来
- 将构建函数中的`this`绑定到新建的对象`obj`上
- 根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理



## 闭包

> **闭包是指有权访问另一个函数作用域中变量的函数**

### 作用

1. ​	在函数内部定义一个函数，并返回这个函数，这样可以<u>在函数外部读取函数局部变量</u>
2. <u>让变量始终保存在内存中</u>。函数执行完，但是函数的私有作用域内有内容被栈外的变量还在使用的，栈内存就不能释放里面的基本值也就不会被释放

### 注意

1. 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，可能内存泄漏。解决：在退出函数之前，将不使用的局部变量全部删除

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220227103302795.png" alt="image-20220227103302795" style="zoom: 33%;" />

var是全局下的i



<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220227103346430.png" alt="image-20220227103346430" style="zoom: 33%;" />

## this

this指向调用他对对象

new的时候指向实例

apply、call、bind改变this指向

箭头函数只会从自己的作用域链的上一层继承this

new和显式绑定优先于隐式绑定

## Bind call apply

- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`
- 三者都可以传参，但是`apply`是数组，而`call`是参数列表
- **`bind `新创建一个绑定函数用于回调执行，`apply `、`call`动态改变this，立即执行**

## 创建对象

### 工厂模式

没法说明新创建的对象是什么类型（比如Person）

### 构造函数

构造函数的主要问题在于，**其定义的方法会在每个实例上都创建一遍。**

可以在外部定义公共函数，但是全局作用域就乱了，因为这个函数实际上只有这两个对象可以使用

### 原型模式

> 实例只有指向原型的指针，没有指向构造函数的指针。

每个函数都会创建一个 **prototype** 属性，这个属性是一个对象（**原型对象**），上面定义的属性和方法可以被对象实例共享。

原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型，

有**原型对象**自动获得一个名为 **constructor** 的属性，指回与之关联的构造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。

 实例与构造函数没有直接联系，与原型对象有直接联系

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220304120408050.png" alt="image-20220304120408050" style="zoom: 50%;" />

- hasOwnProperty 和 in
  - hasOwnProperty()只找实例
  - in 操作符 实例原型都找
  - 组合使用可以判断在原型还是实例（只要 in 操作符返回 true 且 hasOwnProperty()返回 false，就说明该属性是一个原型属性。）

- Object.keys（）和 Object.getOwnPropertyNames()
  - 前者只包含实例的，后者包含所有的（实例+原型，包含constructor）

### 对象迭代

Object.values()返回对象值的数组，Object.entries()返回键/值对的数组。

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220304140640420.png" alt="image-20220304140640420" style="zoom:50%;" />

这时Person.prototype 的 constructor指向Object，因此要把`constructor: Person `加上

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220304140615409.png" alt="image-20220304140615409" style="zoom:50%;" />

但要注意，以这种方式恢复 constructor 属性会创建一个[[Enumerable]]为 true 的属性。而原生 constructor 属性默认是不可枚举的。

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220304140821377.png" alt="image-20220304140821377" style="zoom:50%;" />

重写整个原型会切断最初原型与构造函数的联系，但实例引用的仍然是最初的原型。

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220304141523993.png" alt="image-20220304141523993" style="zoom:50%;" />

## 继承

### 原型链继承

>  SubType.prototype = new SuperType(); 

1. SubType **创建 SuperType 的实例**
2. subType将自己的默认原型替换为SuperType的实例

判断

isPrototypeOf/instanceOf

#### 缺点

原型链上的属性方法实例间**共享**

子类型实例化时不能给父类型**传参**

### 构造函数继承

>function SubType() { 
>
>**//** **继承** **SuperType** 
>
>**SuperType.call(this);** 
>
>} 

1. 每个实例都会有自己的 colors 属性。
2. 可以传参

#### 缺点

每次创建实例都会创建一遍方法，**函数复用**就无从谈起了

子类也不能访问父类**原型**上定义的方法（子和父没有关系，只是子自己定义了一遍父构造函数有的方法）

### 组合继承

使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

### 原型式继承

> Object.create()//浅拷贝

引用值在对象间共享

### 寄生继承

与原型式继承类似，只是可以添加函数

通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

### 寄生组合继承

组合继承父类构造函数被调用两次,父类里的属性会添加两次（子类实例、子类原型，只是先看子类实例）

- 父类原型创建一个副本（里面没有父类构造函数里的属性）
- 副本的constructor指向子类构造函数
- 子类的原型=这个副本

## html语义化标签

header footer nav section aside img article table

## prototype如果没有constructor

constructor可以用于类型判断，实例通过constructor找到构造函数

## ==和===

==会先进行类型转换，undefined=null

**null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。**



## Promise

### 三个状态

Pending(待定)初始状态，没有被兑现也没有被拒绝

fufilled(已兑现)操作成功

rejected(已拒绝)操作失败

### 静态方法

#### Promise.all

这个方法返回一个`新的promise对象`，该promise对象在`iterable参数对象`里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。

这个新的promise对象在触发成功状态以后，会把一个`包含iterable里所有promise返回值的数组`作为成功回调的返回值，顺序跟iterable的顺序保持一致

如果这个新的promise对象触发了失败状态，它会把iterable里`第一个触发失败的promise对象的错误信息`作为它的失败错误信息。

Promise.all方法常被用于处理多个promise对象的状态集合.

#### promise.any

接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。

#### Promise.reject

返回一个状态为失败的Promise对象，参数传递失败原因

#### Promise.resolve

返回一个状态由给定value决定的Promise对象。



## 箭头函数和普通函数的区别

1. this指向（call()/.apply()/.bind()无法改变箭头函数中this的指向）（因为this是继承得来）
2. 箭头函数不能作为构造函数使用
3. 箭头函数没有原型prototype
4. 箭头函数不能用作Generator函数，不能使用yeild关键字



## es6新特性

let与const块级作用域

Symbol、Map与Set

filter、reduce、解构赋值、扩展运算符

箭头函数、promise

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值

```js
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: Array [30,40,50]

```



## 事件循环

### 浏览器事件循环

> 等待任务，执行任务和进入休眠状态等待更多任务这几个状态之间转换的无限循环。

Js : `单线程` `非阻塞`

一个方法执行会向执行栈中加入这个方法的执行环境（执行上下文），调用其他方法时，不过是在执行栈中再添加一个执行环境。

事件队列：

- js引擎遇到一个异步事件后并不会一直等待其返回结果，而是**会将这个事件挂起**，继续执行执行栈中的其他任务。
- **当一个异步事件返回结果后**，js会将这个事件加入与当前执行栈不同的另一个队列，**我们称之为事件队列**。
- 被放入事件队列不会立刻执行其回调，而是等待当前**执行栈中的所有任务都执行完毕， 主线程处于闲置状态**时，主线程会去查找事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个事件对应的回调放入执行栈中，然后执行其中的同步代码...，如此反复，这样就形成了一个无限的循环。这就是这个过程被称为“事件循环（Event Loop）”的原因。

异步任务执行优先级：

`微任务（micro task）和宏任务（macro task）。`

看事件队列时，同一层级先看微任务，后看宏任务，宏任务里先微后宏

以下事件属于宏任务：

- `setInterval()`
- `setTimeout()`
- `IO`

以下事件属于微任务

- `new Promise()`
- `new MutaionObserver()`

### 为什么区分宏任务微任务

有的任务需要紧急执行，在下一次 Event loop 之前进行**插队**，实现状态的同步

### UI渲染

本轮循环结束（清空微任务队列之后），执行下一个宏任务之前

事件冒泡时：inner执行同步任务->清空微任务队列->冒泡到outer执行同步任务->清空微任务队列->本次事件循环结束，ui渲染->下一个执行宏任务

## generator

- 调用生成器函数会产生一个**生成器对象**。
- 生成器对象一开始处于**暂停执行**（suspended）的状态。

#### next

- 与迭代器相似，生成器对象也实现了 **Iterator 接口**，因此具有 **next()**方法。调用这个方法会让生成器开始或恢复执行。
- next()方法的返回值类似于迭代器，有一个 done 属性和一个 value 属性

#### yield

- yield停止执行，函数作用域的状态会被保留，可以通过调用next继续，通过 yield 关键字退出的生成器函数会处在 done: false 状态

  - 生成器作为可迭代对象

  

> 所以说`async/await`就是`generator` + `promise`的语法糖

promise中如果遇到接口的调用参数依赖于上一个接口的返回值，就会嵌套then

所以放到generator里面，yield后面跟我们需要处理的promise函数，每次next之后会执行到下一个yield位置然后暂停，等当前promise执行完再next



## DOM事件模型

一个事件发生后，会在子元素和父元素之间传播s

- **第一阶段**：从`window`对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
- **第二阶段**：在目标节点上触发，称为“目标阶段”（target phase）。
- **第三阶段**：从目标节点传导回`window`对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。



## 防抖和节流

- 节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
- 防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220705234124984.png" alt="image-20220705234124984" style="zoom:50%;" />

## 数组去重复

1.set

```js
Array.from(new Set(arr))
```

2. Sort

```js
function unique(arr) {
    arr = arr.sort()
    var newArr= [arr[0]];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[i-1]) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
```

3. Map 
4. inlcudes

```js
function unique(arr) {
    var array =[];
    for(var i = 0; i < arr.length; i++) {
            if( !array.includes(arr[i]) ) {//includes 检测数组是否有某个值
                    array.push(arr[i]);
              }
    }
    return array
}
```



## Map set weakmap weakset

### map vs weakmap

map的key可以是任意类型，w m必须是对象

w m不可遍历（不算垃圾回收机制，不可预测），不能清空

wm的key没有被引用时，key value都被自动回收（弱引用，不考虑wm对这个key的引用，或者说不算在垃圾回收机制里）

### Set vs weakset

WeakSet成员只能是对象

不可遍历

弱引用



## 闭包

**当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行的**

- 闭包是指有权访问另一个函数作用域中变量的函数。
- 闭包通常用来创建内部变量，使得这些变量不能被外部随意修改，同时又可以通过指定的接口来操作。

```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(new Date, i);
    }, 1000);
}

console.log(new Date, i);
```

- var是局部变量，每次for后不会销毁
  - 每次for都会执行settimeout，5个计时器几乎同时在1s后执行函数并把执行结果依次放到宏任务队列里
- for循环完再执行宏任务队列**，for循环5次用时小于1s，函数执行前i已经是5**
- 所以先直接打印5，1秒后连续打印55555

1. **var 换成 let**

   let虽然是块级作用域，for每次循环内部引用i，就回赋值到settimeout里

2. **立即执行函数**

```js
for (var i = 0; i < 5; i++) {
    (function(j) {  // j = i 循环的时候就把i存下来，不用等到1s后for遍历完
        setTimeout(function() {
            console.log(new Date, j);
        }, 1000);
    })(i);
}

console.log(new Date, i);
```

3. 1->2->3->4->5

用promise

```js
const tasks = []; // 这里存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(new Date, i);
        resolve();
    }, 1000 * i);
});

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
    tasks.push(output(i));
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks)
```

用async await



## 事件委托

ul中有很多li要绑定click，可以吧click绑定（委托）到ul上，点击li时事件冒泡向上传播到ul触发事件

event.target就是点击的元素，`event.currentTarget` 指向事件侦听器直接附加到的元素，这里是ul

- 不需要给所有元素(li)都绑定事件，减少内存空间占用，提升性能
- 动态新增的元素无需重新绑定事件





## 类数组

```js
var a = {'1':'gg','2':'love','4':'meimei',length:5};
Array.prototype.join.call(a,'+');//'+gg+love++meimei'
```



## JS最大安全整数

双精度浮点数64位，一个符号位，十一个指数位，剩下52位 只能有52位表示整数

表示范围：-2^53 ------ 2^53 

- 2^53 我们尝试把它表示成二进制：1 53个0 
- 那2^53+1呢？我们尝试把它表示成二进制：1 52个0 1

问题来了，尾数都有53位，但只要52个空！ 它的处理办法是 **忽略第53位** ,因此这两个数在计算机中表示的结果一样！

```js
2**53===2**53+1    //true
```

## Array.sort底层实现

数组长度小于等于 22 的用插入排序 InsertionSort，比22大的数组则使用快速排序 QuickSort

## Function和class

1. Class必须用new，function 不用new this就指向全局
2. class不可以用call、apply、bind改变执行上下文
3. Class声明不能提升

## promise

- `Promise`的状态一经改变就不能再改变。

- .then`和`.catch`都会返回一个新的`Promise

- `.then`函数中的两个参数。

  第一个参数是用来处理`Promise`成功的函数，第二个则是处理失败的函数
