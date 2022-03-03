class Yu {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';

    constructor (executor) {
        this.status = Yu.PENDING;
        this.value = null;
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject(err)
        }

    }

    resolve (value) {
        if (this.status === Yu.PENDING) {
            this.status = Yu.FULFILLED;
            this.value = value;
        }
    }
    reject (value) {
        if (this.status === Yu.PENDING) {
            this.status = Yu.REJECTED;
            this.value = value;
        }
    }

    // 1.添加then方法
    then (onFulfilled, onRejected) {
        // 3.如果传递的不是一个方法，则我们就自己创建一个匿名函数
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => {}
        }
        // 没有写第二个参数也一样
        if (typeof onRejected !== 'function') {
            onRejected = () => {}
        }

        // 2. 只有改变了状态，才能执行回调方法
        if (this.status === Yu.FULFILLED) {
            // 2.2 要将内部处理的任务，放到宏任务队列中！异步处理的
            setTimeout(() => {
                // 2.1 记得也要添加错误判断，因为回调函数也是函数啊，在函数内报错了就要处理！
                try {
                    onFulfilled(this.value)
                } catch (err) {
                    onRejected(err)
                }
            })
        }
        if (this.status === Yu.REJECTED) {
            setTimeout(() => {
                try {
                    onRejected(this.value)
                } catch (err) {
                    onRejected(err)
                }
            })
        }
    }

}
/* 添加then方法:
 *  1.接受resolve返回的数据
 *  2.只有改变了状态，才能执行then内的回调方法
 *  3.可以不传回调方法
 *  4.支持链式调用
 *
 * 注意：
 *  1.then里面的回调函数是要放在宏任务队列中的！它可不是同步任务！
 **/
let promise = new Yu((resolve, reject) => {
    resolve('解决')
})
promise.then((res) => {
    console.log(res)
})
console.log('我李四要先打印出来！')

/*
 * 抛出一个问题：如果 resolve('解决') 放到了 setTimeout里：
 * setTimeout(() => resolve('解决')) 则 不会被打印出啦！
 **/
