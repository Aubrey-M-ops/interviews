function jsonp(url, data = {}, callback){
    data.callback = callback
    let params = []
    for (let key in data){
        params.push(key + '=' + data[key])
    }

    let script = document.createElement('script')
    script.src = url + '?' + params.join('&')
    document.body.appendChild(script)

    return new Promise((resolve, reject) => {
        window[callback] = (data) => {
            try {
                resolve(data)
            } catch (error) {
                reject(error)
            }finally{
                script.parentNode.removeChild(script)
            }
        }
    }).then(console.log(data))
}