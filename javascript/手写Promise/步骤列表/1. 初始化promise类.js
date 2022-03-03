class Yu {
    // 1. 定义三个状态的变量，使用静态声明，只在类里面才能使用。
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'reject';

    constructor (executor) {
        this.status = Yu.PENDING; // 一开始是等待状态
        this.value = null;
        executor(this.resolve.bind(this), this.reject.bind(this)) // 为什么要传this？
        // executor(this.resolve, this.reject) // 如果没有绑定this，则回调中使用的this指向的是在 回调函数所在的上下文！
    }

    // 2. 创建两个改变状态的方法。
    // 解决方法
    resolve (value) {
        this.status = Yu.FULFILLED;
        this.value = value;
    }
    //拒绝方法
    reject (value) {
        this.status = Yu.REJECTED;
        this.value = value;
    }

}

let promise = new Yu((resolve, reject) => {
    resolve('解决')
    reject('失败')
})
console.log(promise) // Yu {status: 'reject', value: '失败'}

// 存在一个问题：重复修改了状态！！！
/*
 *  在promise中，状态被修改后，就不可逆！
 **/
