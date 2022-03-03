class Yu {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';

    constructor (executor) {
        this.status = Yu.PENDING;
        this.value = null;
        // 1. 声明一个数组，保存将来要执行的方法
        this.afterMethods = []

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
            // 3. 执行存放到数组中的函数
            this.afterMethods.map(callback => {
                callback.onAfterFulfilled(value)
            })
        }
    }
    reject (value) {
        if (this.status === Yu.PENDING) {
            this.status = Yu.REJECTED;
            this.value = value;
            // 3. 这里同理
            this.afterMethods.map(callback => {
                callback.onAfterRejected(value)
            })
        }
    }

    then (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => {}
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => {}
        }

        // 2. 在等待状态的时候，我们就将 以后要执行的方法，添加到数组中。
        if (this.status === Yu.PENDING) {
            this.afterMethods.push({
                // 2.1 注意就算push回调函数进去，也要保护错误的处理！
                onAfterFulfilled: (value) => {
                    try {
                        onFulfilled(value)
                    } catch (err) {
                        onRejected(err) // 错误时，统一交给 onRejected处理
                    }
                },
                onAfterRejected: (value) => {
                    try {
                        onRejected(value)
                    } catch (err) {
                        onRejected(err)
                    }
                }
            })
        }

        if (this.status === Yu.FULFILLED) {
            setTimeout(() => {
                try {
                    onFulfilled(this.value)
                } catch (err) {
                    onFulfilled(err)
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
 *  2. 如果 改变状态的方法 被放到了 setTimeout里，则延后再执行then内的方法！
 **/
let promise = new Yu((resolve, reject) => {
    setTimeout(() => reject('拒绝'), 500)
})
promise.then((res) => {
    console.log(res)
}, (err) => {
    console.log(err)
})
console.log('我李四要先打印出来！')

/*
 * 抛出一个问题：如果在 setTimeout里有同步的代码，也要先被执行：
 **/
// 例如：
new Yu((resolve, reject) => {
    setTimeout(() => {
        resolve('解决')
        console.log('我要第二个打印')
    }, 500)
}).then((res) => {
    console.log(res)
})
console.log('我第一个打印')
// 现在输出： 是错误的！！
// >>> 我第一个打印
// >>> 解决
// >>> 我要第二个打印

// 正确应该要：
// >>> 我第一个打印
// >>> 我要第二个打印
// >>> 解决
