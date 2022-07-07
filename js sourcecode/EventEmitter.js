class EventEmitter{
    constructor(){
        this.events = {}
    }
    on(eventName, callback){
        if(!this.events[eventName]){
            this.events[eventName] = [callback]
        }else{
            this.events[eventName].push(callback)
        }
    }
    emit(eventName){
        this.events[eventName] && this.events[eventName].forEach(fn => fn());
    }
    removeListener(eventName, callback){
        if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter(fn => fn!=callback)
        }
    }
    once(eventName, callback){
        let fn = () =>{
            callback()
            this.removeListener(eventName,callback)
        }
        this.on(eventName, fn)
    }
}

let em = new EventEmitter()
em.on("e1", function(){console.log('hello')})
em.on("e1", function(){console.log('world')})
em.emit('e1')