function flat(arr){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
    },[])
}
function flat2(arr, deep){
    let res = []
    if(deep === 0)return arr
    for(let i=0; i<arr.length; i++){
        if(Array.isArray(arr[i])){
            res = res.concat(flat2(arr[i],deep-1))
        }else{
            res.push(arr[i])
        }
    }
    return res
}

let arr = [1,[2,3,[4,5,[6]]]]
console.log(flat2(arr,1))