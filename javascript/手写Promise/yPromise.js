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

        let promise = new Yu((resolve, reject) => {
            if (this.status === Yu.PENDING) {
                this.afterMethods.push({
                    onAfterFulfilled: (value) => {
                        let result = onFulfilled(value)
                        this.isPromise(result, resolve, reject, promise)
                    },
                    onAfterRejected: (value) => {
                        let result = onRejected(value)
                        this.isPromise(result, resolve, reject, promise)
                    }
                })
            }

            if (this.status === Yu.FULFILLED) {
                setTimeout(() => {
                    let result = onFulfilled(this.value)
                    this.isPromise(result, resolve, reject, promise)
                })
            }
            if (this.status === Yu.REJECTED) {
                setTimeout(() => {
                    let result = onRejected(this.value)
                    this.isPromise(result, resolve, reject, promise)
                })
            }
        })

        return promise
    }

    isPromise(result, resolve, reject, currentPromise) {
        if (result == currentPromise) {
            throw new TypeError('不允许在后执行的代码中返回promise')
        }

        try {
            if (result instanceof Yu) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (err) {
            reject(err)
        }
    }
    static resolve(value) {
        return new Yu((resolve, reject) => {
            if (value instanceof Yu) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }
    static reject(value) {
        return new Yu((resolve, reject) => {
            reject(value)
        })
    }
    static all(promises) {
        const resolves = [];
        return new Yu((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(
                    value => {
                        resolves.push(value);
                        if (resolves.length == promises.length) {
                            resolve(resolves)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
    static race(promises) {
        return new Yu((resolve, reject) => {
            promises.map(promise => {
                promise.then(
                    value => {
                        resolve(value)
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
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
new Yu((resolve, reject) => resolve('解决')).then( value => console.log(value))
