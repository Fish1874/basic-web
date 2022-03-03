class Yu {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';

    constructor (executor) {
        this.status = Yu.PENDING;
        this.value = null;
        // 添加异常捕获
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            // 如果在回调里报错，则抛出来，并且设置为拒绝状态！
            this.reject(err)
        }

    }

    resolve (value) {
        // 1. 添加判断，只有当是等待状态时，才能改变为解决状态！
        if (this.status === Yu.PENDING) {
            this.status = Yu.FULFILLED;
            this.value = value;
        }
    }
    //拒绝方法
    reject (value) {
        if (this.status === Yu.PENDING) {
            this.status = Yu.REJECTED;
            this.value = value;
        }
    }

}

let promise = new Yu((resolve, reject) => {
    console.log(aaa) // 打印一个没有的变量，则跑出错误，并且状态改为rejected
    resolve('解决')
    reject('失败')
})
console.log(promise)
