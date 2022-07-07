//bubble sort O(n)
function bubbleSort(arr){
    const len = arr.length
    for(let i=0; i<len; i++){
        let flag = false //标记是否交换
        for(let j=0; j<len-1-i; j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
                flag = true
            }
        }
        if(!flag) return arr //没交换说明有序，直接返回
    }
    return arr
}
//select sort O(n^2)
function selectSort(arr){
    const len = arr.length
    for(let i=0; i<len-1; i++){
        minIndex = i
        for(let j=0; j<len; j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j
            }
        }
        if(minIndex!==i){
            [arr[i],arr[minIndex]] =[arr[minIndex],arr[i]]
        }
    }
    return arr
}

//insert sort O(n^2)
function insertSort(arr){
    const len = arr.length
    for(let i=1; i<len; i++){
        let temp = arr[i], j=i
        while(j>0 && temp<arr[j-1]){
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
    return arr
}

//merge sort O(nlogn)
function mergeSort(arr){
    const len = arr.length
    if(len<=1) return arr
    const mid = Math.floor(len/2)
    const leftArr = mergeSort(arr.slice(0,mid))
    const rightArr = mergeSort(arr.slice(mid,len))
    arr = mergeArr(leftArr,rightArr)
    return arr
}
function mergeArr(arr1,arr2){
    let k1=0, k2 = 0,len1 = arr1.length, len2 = arr2.length;
    const res = []
    while(k1<len1 || k2<len2){
        if(arr1[k1]<arr2[k2] || k2 === len2){
            res.push(arr1[k1])
            k1++
        }else{
            res.push(arr2[k2])
            k2++
        }
    }
    return res
}

//quickSort
function quickSort(arr,left = 0, right = arr.length-1){
    if(arr.length>1){
        const partitionIndex = partition(arr,left,right)
        if(partitionIndex-left>1){
            quickSort(arr,left,partitionIndex-1)
        }
        if(right-partitionIndex>1){
            quickSort(arr,partitionIndex,right)
        }
    }
    return arr
}
function partition(arr,left,right){
    let pivot = arr[Math.floor((left+right)/2)]
    let i = left, j = right
    while(i<=j){
        while(arr[i]<pivot){
            i++
        }
        while(arr[j]>pivot){
            j--
        }
        if(i<=j){
            [arr[i],arr[j]] = [arr[j],arr[i]]
            i++
            j--
        }
    }
    return i

}