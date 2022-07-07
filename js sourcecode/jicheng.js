function Parent(name){
    this.name = name;
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child(name,age){
    Parent.call(this,name)
    this.age = age;
}
Child.prototype = new Parent();

// 原型继承
Parent = {
    name: 1
}
Child = Object.create(Parent,{name:2})
console.log(Child)

//寄生式继承
function createAnother(original){
    let clone = Object.create(original)
    clone.f1 = function(){ //增强这个对象
        console.log("f1")
    }
    return clone
}
//寄生组合继承
function parent(name){
    this.name = name
}
function child (name,age){
    parent.call(this,name)
}
child.prototype = new parent() 
child.constructor = child
console.log(new child())//有name
console.log(child.prototype)//有name
//解决方法
function inheritPrototype (parent,child){
    let copyProto = Object.create(parent.prototype)
    copyProto.constructor = child
    child.prototype = copyProto
}
