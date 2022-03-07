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
            setTimeout(() => {
                this.afterMethods.map(callback => {
                    callback.onAfterRejected(value)
                })
            })
        }
    }

    then (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            // 1. 将上一次的值返回出来，就行了！
            onFulfilled = () => this.value;
        }
        if (typeof onRejected !== 'function') {
            // 1. 同样
            onRejected = () => this.value;
        }

        return new Yu((resolve, reject) => {
            if (this.status === Yu.PENDING) {
                this.afterMethods.push({
                    onAfterFulfilled: (value) => {
                        try {
                            let result = onFulfilled(this.value)
                            resolve(result)
                        } catch (err) {
                            reject(err)
                        }
                    },
                    onAfterRejected: (value) => {
                        try {
                            let result = onFulfilled(this.value)
                            resolve(result)
                        } catch (err) {
                            reject(err)
                        }
                    }
                })
            }

            if (this.status === Yu.FULFILLED) {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(this.value)
                        resolve(result)
                    } catch (err) {
                        reject(err)
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
        })
    }

}
/* 添加then方法:
 *  1.接受resolve返回的数据
 *  2.只有改变了状态，才能执行then内的回调方法
 *  3.可以不传回调方法
 *  4.支持链式调用
 *    a.then返回的是一个promise
 *    b.每个then之间返回，互不影响
 *    c.每个then处理的成功/失败，都是基于上一次then的callback。
 *    d.支持穿透传递数据
 *
 * 注意：
 *  1.then里面的回调函数是要放在宏任务队列中的！它可不是同步任务！
 *  2. 如果 改变状态的方法 被放到了 setTimeout里，则延后再执行then内的方法！
 **/
new Yu((resolve, reject) => {
    setTimeout(() => {
        resolve('解决')
    }, 500)
})
    .then() // 当上一个then什么都没有写的时候，就将数据传到下一个then内。穿透传递
    .then((res) => {
        console.log('第二个then: ', res)
    })
console.log('我第一个打印')
