function _new(Constructor, ...args){
    const obj = new Object()
    obj._proto_ = Constructor.prototype //连接到原型链
    let ret = Constructor.apply(obj, args) //可以访问构造函数的属性
    return typeof ret === 'object' ? ret : obj
}

function Person(name){
    this.name = name
}

let person = Person('foo')
console.log(person);