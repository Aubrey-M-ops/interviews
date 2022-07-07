# React

## React v.s. Vue

大列表渲染，大量数据加载，react更快

**相同点**

- 使用虚拟 DOM
- 提供响应式和组件化的视图组件
- 将注意力集中保持在核心库，而将其他功能如路由、全局状态管理交给相关的库

**不同点**

- 视图更新

  - react在某个组件变化时，以该组件为根，重新渲染整个组件树
  - vue可以知晓对应的组件

- html和css

  - react全是js
  - vue按照html css js来构建模版

   vue 是在适应开发者，而 react 想要改变开发者

  - react 是使用的 css-in-js 的解决方案或者是 css modules。而 vue 使用 scoped 来控制 css

## React必须使用JSX吗

React不强制要求使用JSX，JSX只是调用`React.createElement(component, props, ...children)` 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成

## 类组件与函数组件

### 类组件

引入钩子之前，使用基于类的组件来创建需要**维护内部状态**或**利用生命周期方法**的组件（即`componentDidMount`和`shouldComponentUpdate`）。

基于类的组件是 ES6 类，它扩展了 React 的 Component 类，并且至少实现了`render()`方法。

**因为它们倾向于实现逻辑和状态。**

### 函数组件

函数组件是无状态的，并返回要呈现的输出。它们渲染 UI 的首选只依赖于属性，因为它们比基于类的组件更简单、更具性能。

**通常只具有表现形式（比如一个按钮）**

## 为什么调用setState而不是直接改变state

如果您尝试直接改变组件的状态，React 将无法得知它需要重新渲染组件。通过使用`setState()`方法，React 可以更新组件的UI。

## Vue 和 react 的虚拟dom

`react` 函数式组件思想 当你 `setstate` 就会遍历 `diff` 当前组件所有的子节点子组件, 这种方式开销是很大的, 所以 `react 16` 采用了 `fiber` **链表**代替之前的树，可以中断的，分片的在浏览器空闲时候执行

`vue` 组件响应式思想 采用代理监听数据，我在某个组件里修改数据，就会明确知道那个组件产生了变化，只用 `diff` 这个组件就可以了