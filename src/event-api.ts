
class Sub{
    bubbleQueue: any[];
    captureQueue: any[];
    constructor() {
        this.bubbleQueue = new Array<Event>()
        this.captureQueue = new Array<Event>()

    }

    addBubbleQueue(target:any, type:string, listener:object, priority:number=0): void  {
        let arr = this.bubbleQueue.filter(item=>{
            return item.target.id === target.id && item.type === type && item.listener == listener
        })
        if(!arr.length) {
            if(this.bubbleQueue.length <= priority) {
                this.bubbleQueue[priority]=({target, type, listener})
            }else {
                this.bubbleQueue.splice(priority, 0, {target, type, listener})
            }
        }
        
    };

    addCaptureQueue(target:any, type:string, listener:object, priority:number=0): void  {

        let arr = this.captureQueue.filter(item=>{
            return item.target.id === target.id && item.type === type && item.listener == listener
        })
        if(!arr.length) {
            if(this.captureQueue.length <= priority) {
                this.captureQueue[priority]=({target, type, listener})
            }else {
                this.captureQueue.splice(priority, 0, {target, type, listener})
            }
            
        }
    };

}

let sub = new Sub()


function addEventListener(target:any, type:string, listener: any, options: any = false, priority?:number) {
    let flag = false
    if( typeof options === 'boolean'){
        flag = options
    }else if(typeof options === 'object') {
        flag = !!options.capture
    }

    if(flag) { // 捕获阶段执行
        sub.addCaptureQueue(target,type,listener, priority)
     }else {
        sub.addBubbleQueue(target,type,listener, priority)
     }

}


function dispatchEvent(target: any, type: string): void {
    
    let parent = target.parentNode
    let parentCapEvent  = sub.captureQueue.filter(item => item.target.id === parent.id && item.type == type)
    let selfCapEvent = sub.captureQueue.filter(item => item.target.id === target.id && item.type == type)
    let parentBubbEvent = sub.bubbleQueue.filter(item => item.target.id === parent.id && item.type == type)
    let selfBubbEvent = sub.bubbleQueue.filter(item => item.target.id === target.id && item.type == type)

    let arr = parentCapEvent.concat(selfCapEvent,selfBubbEvent,parentBubbEvent)
    console.log(arr)

    arr.forEach(item => {
        item.listener()
    })

}


function removeEventListener(target:any, type:string, listener: object, options: any = false) {
    let flag = false
    if( typeof options === 'boolean'){
        flag = options
    }else if(typeof options === 'object') {
        flag = !!options.capture
    }
    
    if(flag) { // 捕获阶段执行
        sub.captureQueue = sub.captureQueue.filter(item =>{
            return !(item.target.id == target.id && item.type == type && item.listener == listener)
        })
    }else {
        sub.bubbleQueue = sub.bubbleQueue.filter(item =>{
            return !(item.target.id == target.id && item.type == type && item.listener == listener)
        })
    }
    
}


export {
    addEventListener,
    removeEventListener,
    dispatchEvent
}