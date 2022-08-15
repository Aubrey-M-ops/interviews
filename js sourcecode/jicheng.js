function Parent(name) {
  this.name = name;
  this.names = []
}
Parent.prototype.getName = function () {
  console.log(this.name);
};
//原型链继承
function Child() {}
Child.prototype = new Parent();
//引用类型属性被所有实例共享
let child1 = new Child();
child1.names.push(1);
let child2 = new Child();
console.log(child2.names);//1

//构造函数继承
//每次创建实例都会创建一遍构造方法
function Child(name,age){
    Parent.call(this,name)
    this.age = age;
}

// // 原型继承
// Parent = {
//     name: 1
// }
// Child = Object.create(Parent,{name:2})
// console.log(Child)

// //寄生式继承
// function createAnother(original){
//     let clone = Object.create(original)
//     clone.f1 = function(){ //增强这个对象
//         console.log("f1")
//     }
//     return clone
// }
// //寄生组合继承
// function parent(name){
//     this.name = name
// }
function child (name,age){
    parent.call(this,name)
}
// child.prototype = new parent()
// child.constructor = child
// console.log(new child())//有name
// console.log(child.prototype)//有name
// //解决方法
function inheritPrototype (parent,child){
    let copyProto = Object.create(parent.prototype)
    copyProto.constructor = child
    child.prototype = copyProto
}

// function foo() {
//   a = 1;
// }
// foo.prototype.func = function () {
//   console.log(this.a);
// };

// const bar = {
//   a: 2,
// };
// const child = new foo();
// const newFun = child.func.bind(bar);
// newFun()
