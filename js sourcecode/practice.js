function sleep(i){
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log(i)
        }, i*1000)
    })
}
function step(){

}
console.log(step())