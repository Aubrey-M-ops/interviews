## VUE

1. MVVM：我们知道`vue`基本不操作`dom`节点， 双向绑定使`dom`节点跟视图绑定后，通过修改变量的值控制`dom`节点的各类属性

2. 组件化：把图形、非图形的各种逻辑均抽象为一个统一的概念，减少代码冗余，方便维护

3. 指令系统：
   1. 条件渲染指令 `v-if`
   2. 列表渲染指令`v-for`
   3. 属性绑定指令`v-bind`
   4. 事件绑定指令`v-on`
   5. 双向数据绑定指令`v-model` 

## 响应式\数据双向绑定

### Object.defineProperty

Vue 会遍历 data 所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 `getter/setter`，每个组件实例都对应一个 watcher 实例。当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。渲染成新的虚拟dom树，与旧的虚拟dom树对比，局部修改真实dom树

> 数据劫持结合订阅者-发布者
>
> 1. Observe(观察者)遍历数据对象，使用 Object.defineProperty全部转为 `getter/setter`
> 2. compile解析模版指令，将模版中变量替换成数据，渲染页面，绑定订阅者
> 3. watcher(订阅者)是observer和compile之间通信的桥梁
>    1. 每个组件实例都对应一个 **watcher** 实例
>    2. 它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。
> 4. MVVM

- 对于对象

  - Vue 无法检测 property 的添加或移除

  - vm.$set增添property

  - 为已有对象赋值多个新 property，要混合原有对象和新property成新对象，再

    - ```js
      // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`(这样不会触发更新)
      this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
      ```

- 对于数组

  - 可以检测添加删除元素，但是以下不可以

  - 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`

    - ```js
      vm.$set(vm.items, indexOfItem, newValue)
      ```

  - 当你修改数组的长度时，例如：`vm.items.length = newLength` ()

    - ```js
      vm.items.splice(newLength)
      ```

- 异步更新队列
  - 只要侦听到数据变化，Vue 将开启一个队列，并缓冲在**同一事件循环**中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次，避免不必要的计算和 DOM 操作。
  - 想基于更新后的 DOM 状态来做点什么，用Vue.nextTick(callback)，callback将在 DOM 更新完成后被调用。

### VUE3 Proxy

1. 可以提升性能，Vue2是通过`层层递归`的方式对数据进行劫持,并且数据劫持`一开始`就要进行层层递归(一次性递归)如果对象的路径非常深将会非常影响性能。而Proxy可以在`用到数据的时候`再进行对下一层属性的劫持。
2. Proxy可以实现对`整个对象`的劫持，而Object.defineProperty()只能实现对`对象的属性`进行劫持。所以对于对象上的方法或者新增、删除的属性则无能为力。
3. 对于`数组`:而Vue3采用Proxy在数组长度变化时或者插值时能及时的响应。



```js
const reactive = (target) => {
  const handler = {
    get(target, key, receiver){
      console.log('正在读取的数据：',key);
      const result = Reflect.get(target, key, receiver);
      track(target, key);  // 自动调用 track 方法收集依赖
      return result;
    },
    set(target, key, value, receiver){
      console.log('正在修改的数据：', key, ',值为：', value);
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      if(oldValue != result){
         trigger(target, key);  // 自动调用 trigger 方法执行依赖
      }
      return result;
    }
  }
  
  return new Proxy(target, handler);
}
```

vue3新增了Map,Set, WeakMap,WeakSet等集合。在对target对象进行代理时要分开进行处理。在对目标对象进行拦截时 最重要的就是`collectionHandlers`和`baseHandlers`。

proxy中捕获器 has get set deleteProperty own keys

> **VUE3建立响应式**
>
> 1. Setup()
>
>    原来在data中声明的对象
>
>    ```js
>     const state = reactive({
>            count:0,
>            todoList:[]
>        })
>    ```
>
> 2. Options

## 生命周期

vue生命周期就是vue实例从创建到销毁的整个过程，即创建、初始化模版、编译模版、挂载DOM到渲染、更新到渲染、销毁等一系列过程。

分为八个阶段

beforeCreate 实例初始化之后，数据和事件配置之前 **初始化非响应式变量**

created 已经将data和method挂载到vue实例上	**初始化ajax请求**

beforeMount 已经完成模版编译，编译成虚拟dom, 还没挂载到页面上

Mounted 已经挂载到dom上，页面显示出来

beforeUpdate 转态更新之前执行此函数，此时data中数据的状态值已经更新为最新的，但是页面上显示的数据还是最原始的，还没有重新开始渲染DOM树。

updated页面已经被重新渲染

before destroy页面销毁之前,这个阶段vue实例还能用。

destroyed 解除绑定，事件监听器也都移除，子实例也被销毁。

## 项目实现过程

**Main.js** 

生成vue实例

Render: h=>h(App) 生成vnode（告诉 Vue 页面上需要渲染什么样的节点，及其子节点。）

$mount(#app) 将生成的vnode渲染进真正的dom

**app.vue**

根组件 router

## 打包

根据框架和自己的代码在dist生成js文件，放入html

## v-model双向绑定

@input 

Props :value

触发@input value通过emit接收来自父组件的value值



v-model 时一个语法糖，它做了：

1. 绑定数据value
2. 触发输入事件input
3. data 更新触发重新渲染

## v-show v-if

**v-if** 是动态添加，当值为 **false** 时，是完全移除该元素，即 **dom** 树中不存在该元素。

**v-show** 仅是隐藏 / 显示，值为 **false** 时，该元素依旧存在于 **dom** 树中。

**v-if** 有更高的切换消耗而 **v-show** 有更高的初始渲染消耗。因此，如果需要频繁切换 **v-show** 较好，如果在运行时条件不大可能改变 **v-if** 较好。

## 

## 

## 语法糖

简单的代码代替复杂的代码但是是等效的，编译器会把简单的代码转为复杂的形式

比如箭头函数 v-bind

## $router和$route

**`this.$route`**：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。

**`this.$router`**：全局的 router 实例。通过 vue 根实例中注入 router 实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其 push(), replace(), go() 等方法。

## Vue router

### 钩子

#### 全局

beforeEach **判断是否有token**

afterEach

#### 路由独享

beforeEnter

#### 组件内导航

beforeRouterEnter

beforeRouterUpdate

beforeRouterLeave



## v-if v-for不同时使用

V-for 优先级比v-if高，每一次都会先循环再进行条件判断，影响性能

可以用template包住，进行v-if判断，在里面v-for



## vue组件间通信

### 1. props emit

```js
  this.$emit('onEmitIndex',index)//第一个参数是父组件里的方法
```

props是只读，不可以被修改，所有被修改都会失效和被警告

### 2. $parent $children

```js
return this.$parent.msg;
```

```js
 this.$children[0].message = "hello"
```

### 3. Ref

ref用在dom元素上指向dom，用于子组件指向子组件实例

以上三组只能父子不能兄弟

### 4.vuex

Vuex就是用来管理组件之间通信的一个组件

State数据存储

Getters 类似计算属性，对state二次封装

mutations 改变states中数据唯一途径，不能异步

actions 用于提交`mutation`来改变状态，而不直接变更状态，可以包含任意异步操作

Modules 模块分开定义，便于维护

### 5.provide/inject

父组件通过provide提供变量，子组件通过inject注入变量

父provide之后，父的子，父的子的子都可以inject

### 6.event bus

所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

#### 初始化

```js
// event-bus.js

import Vue from 'vue'
export const EventBus = new Vue()
```

#### 发送事件

```js
additionHandle(){
      EventBus.$emit('addition', {
        num:this.num++
      })
```

#### 接收事件

```js
  EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
```

### 7.Storage

通信简单，不易维护因为混乱

### 8.$attrs与$listeners

attrs包含了没在props里面的父组件的**属性**

listeners包含了父组件里的v-on

多级组件嵌套需要传递数据时,仅仅传递数据

## Vue 虚拟dom

- Vue编译模版成渲染函数，生成虚拟节点Vnode，实际上是js对象

- Patch算法：比较新老节点，局部将vnode渲染成真实的DOM，在现有DOM上进行修改来实现更新视图的目的
  - patch函数是通过判断新老节点是否为同一节点：
    - 如果是同一节点，执行patchVnode进行子节点比较；
    - 如果不是同一节点，新节点直接替换老节点；
- diff算法：
  - 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档中
  - 当状态变更的时候，重新构造一棵vnode树。然后用新的树和旧的树进行比较(diff)，记录两棵树差异（patch)
  - 将差异应用到真实dom

同层进行比较，调用patch



## VUE key

用在虚拟dom算法上，新旧vnode对比

如果没有key，就地复用，直接patch或者replace当前的节点。

如[1,2,3,4,5] 加入0 1->0 2->1 ....

有key之后记录key的顺序，直接通过改变key顺序，在适当位置插入或删除节点

不能用index做key，因为删除一个节点的时候，后面的节点全部重新渲染



## 懒加载

### 路由懒加载

```js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>import("@/components/HelloWorld")
    }
  ]
})

```

### 组件懒加载

同理import

### 是否在视窗

**dom滚动高度（docScrollTop) <= 元素距离顶部高度（elOffsetTop) < （dom滚动高度(scrolltop) + 视窗高度(clientheight)）**

<img src="/Users/limohan/Library/Application Support/typora-user-images/image-20220419130433902.png" alt="image-20220419130433902" style="zoom: 25%;" />



## 前端路由

**不同的url地址对应到不同的内容或页面这个任务是由前端来完成的**， 不会刷新页面

### Hash

- hash虽然包含在url中但是不被包括在http请求中，只是用来指导浏览器动作（所以对于后端来说即便没有做到对路由的全覆盖也不会出现404）
- 改变hash不会加载页面

- 可以通过Onhashchange来监听路由改变从而改变相应的页面内容（可以去做ajax请求）

### history

- history.pushState()和history.replaceState()， 通过这两个 API 可以改变 url 地址且不会发送请求
- 当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求
- 在`vue-router`实例化过程中，执行对 HTML5History 的实例化



## iframe

它能够将另一个 HTML 页面嵌入到当前页面中。

每个嵌入的浏览上下文（embedded browsing context）都有自己的[会话历史记录 (session history)](https://developer.mozilla.org/zh-CN/docs/Web/API/History)和[DOM 树](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)	



## vue-cli

多个单独的包组成

### cli

全局安装的包，提供了终端里的 `vue` 命令 (vue create)

### Cli-service

npm包，开发环境依赖。

基于webpack

- 加载其它 CLI 插件的核心服务；
- 一个针对绝大部分应用优化过的内部的 webpack 配置；
- 项目内部的 `vue-cli-service` 命令，提供 `serve`、`build` 和 `inspect` 命令。

### Cli-plugin

@vue/cli-plugin-

向你的 Vue 项目提供可选功能的 npm 包，例如 Babel/TypeScript 转译、ESLint 集成

当你在项目内部运行 `vue-cli-service` 命令时，它会自动解析并加载 `package.json` 中列出的所有 CLI 插件。

## Yarn

**1、执行校验**

Yarn会在每个安装包被执行前校验其完整性。

**2、并行执行**

npm会等一个包完全安装完才跳到下一个包，但yarn会并行执行包，因此速度会快很多。

**3、离线模式**

离线的原理比较简单，安装过的包会被保存进缓存目录，以后安装就直接从缓存中复制过来，这样做的本质还是会提高安装下载的速度，避免不必要的网络请求。它还能并行化操作以最大化资源利用率。

**4、版本控制**

npm 缺点：当包的依赖层次比较深时，版本控制不够精确

yarn.lock文件内会描述包自身的版本号，还会锁定所有它依赖的包的版本号

## Eslint prettier

脚手架时

1. 选择Manually select features
2. 选择相关的Babel和Linter / Formatter
3. 选择 ESLint + Prettier



- `prettier` ：prettier 核心
- `eslint-config-prettier` ：提供 prettier 风格的 eslint 配置
- `eslint-plugin-prettier` ：防止 eslint 与 prettier 冲突，使两者统一化的插件



在eslintrc.js中设置规则，所有规则是默认禁用的，但是使用 `"extends": "eslint:recommended"` 会启用推荐的规则

## 前端发展方向

界面展现用户体验和可访问性方向、偏后的js/nodejs开发方向、audio/video音视频富媒体方向、SVG/canvas/webGL动效创意表现与数据可视化方向

## babel

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

## webpack

在[模块化编程](https://en.wikipedia.org/wiki/Modular_programming)中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为*模块*。

*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器(module bundler)*。

1. entry

2. output

   整个应用程序结构，都会被编译到你指定的输出路径的文件夹中，默认值为 `./dist`

3. loader

   ，在 webpack 的配置中 **loader** 有两个目标：test(识别) use(转换)

   loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://www.webpackjs.com/concepts/modules),比如：将A.less转换为A.css

4. Plugin

   plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它会监听webpack打包过程中的某些节点，执行广泛的任务

   想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建它的一个实例。

### 生产环境开发环境

Vue 源码会根据 `process.env.NODE_ENV` 决定是否启用生产环境模式，默认情况为开发环境模式。

**环境变量** ： .env.[mode]只在指定的模式下被载入

按照生产环境配置

### 热更新

它允许在运行时更新各种模块，而无需进行完全刷新



## 虚拟dom意义

这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。
