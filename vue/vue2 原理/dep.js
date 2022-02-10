// 先订阅---再发布

function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
}
// 执行函数
Dep.prototype.notify = function () {
    this.subs.forEach(sub => sub.update());
}

function Watcher(fn) {
    this.fn = fn;
}

Watcher.prototype.update = function () { // 这个方法代表执行这个函数
    this.fn();
};

let watcher = new Watcher(function () {
    console.log('执行一次')
});
let dep = new Dep();
dep.addSub(watcher); // 将待执行的函数添加到一个数组中
dep.addSub(watcher); // 将待执行的函数添加到一个数组中
dep.notify();
console.log(dep.subs)
