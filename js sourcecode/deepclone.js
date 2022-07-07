function deepClone(origin, map = new Map()){
    if(typeof origin === 'object'){
    //如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象的属性执行深拷贝后依次添加到新对象上。
         let clone = Array.isArray(target) ? [] : {};
         //检查有无克隆过
         if(map.get(origin)){
             return map.get(origin)
         }
         map.set(origin, clone)
         for(const key in origin){
             clone[key] = deepClone(origin[key])
          }
          return clone
    }else{
        return origin //如果是原始类型直接返回
    }
       
    
}   