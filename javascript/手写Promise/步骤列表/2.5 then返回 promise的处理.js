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
            onFulfilled = () => this.value;
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => this.value;
        }

        return new Yu((resolve, reject) => {
            if (this.status === Yu.PENDING) {
                this.afterMethods.push({
                    onAfterFulfilled: (value) => {
                        try {
                            // 等待状态这里同样的 「判断」！！！
                            let result = onFulfilled(this.value)
                            if (result instanceof Yu) {
                                result.then(resolve, reject) // 可以简写，因为then内一定会执行
                            } else {
                                resolve(result)
                            }
                        } catch (err) {
                            reject(err)
                        }
                    },
                    onAfterRejected: (value) => {
                        try {
                            // 等待状态这里同样的 「判断」！！！
                            let result = onRejected(this.value)
                            if (result instanceof Yu) {
                                result.then(resolve, reject) // 可以简写，因为then内一定会执行
                            } else {
                                resolve(result)
                            }
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
                        // 1. 判断 返回的值 是否由我们自定义的类实现的（是否是promise？）
                        if (result instanceof Yu) {
                            // 2. 如果返回的是一个promise，我们执行then方法 (目的就是将值传递出去)。
                            result.then(value => { // 2.1 成功状态的处理
                                resolve(value)
                            }, reason => { // 2.2 拒绝状态的处理
                                reject(reason)
                            })

                        } else {
                            resolve(result) // 3. 如果只是普通的返回，则直接改变状态，返回出去就行了！
                        }
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            if (this.status === Yu.REJECTED) {
                setTimeout(() => {
                    try {
                        // 拒绝状态这里同样的 「判断」！！！
                        let result = onRejected(this.value)
                        if (result instanceof Yu) {
                            result.then(resolve, reject) // 可以简写，因为then内一定会执行
                        } else {
                            resolve(result)
                        }
                    } catch (err) {
                        reject(err)
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
 *  4.then支持链式调用
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
}).then( value => {
    return new Yu( (resolve, reject) => {
        resolve('成功')
        // reject('拒绝')
    })
}).then(value => {
    console.log('第二个then内成功: ', value)
}, reason => {
    console.log('第二个then内拒绝:', reason)
})
console.log('我第一个打印')
