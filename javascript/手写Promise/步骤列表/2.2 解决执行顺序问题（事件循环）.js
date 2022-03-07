class Yu {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';

    constructor (executor) {
        this.status = Yu.PENDING;
        this.value = null;
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
            // 1. 放到任务队列就行了，同步的任务依旧会立刻执行
            setTimeout(() => {
                this.afterMethods.map(callback => {
                    callback.onAfterFulfilled(value)
                })
            })
        }
    }
    reject (value) {
        if (this.status === Yu.PENDING) {
            this.status = Yu.REJECTED;
            this.value = value;
            // 1. 放到任务队列
            setTimeout(() => {
                this.afterMethods.map(callback => {
                    callback.onAfterRejected(value)
                })
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

        if (this.status === Yu.PENDING) {
            this.afterMethods.push({
                onAfterFulfilled: (value) => {
                    try {
                        onFulfilled(value)
                    } catch (err) {
                        onRejected(err)
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
 *  2. 如果 改变状态的方法 被放到了 setTimeout里，则延后再执行then内的方法！
 **/
new Yu((resolve, reject) => {
    setTimeout(() => {
        resolve('解决')
        console.log('我要第二个打印')
    }, 500)
}).then((res) => {
    console.log(res)
})
console.log('我第一个打印')
// 输出：
// >>> 我第一个打印
// >>> 我要第二个打印
// >>> 解决


