function myinstanceof(left, right){
    while(left){
        if(left._proto_ === right.prototype){
            return true
        }
        left = left._proto_
    }
    return false
}