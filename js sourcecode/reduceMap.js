Array.prototype.myMap = function(fn, thisValue){
    const res = []
    let _this = thisValue || []
    this.reduce(function(pre,cur,index,arr){
        return res.push(fn.call(_this,cur,index,arr))
    },null)
    return res
}