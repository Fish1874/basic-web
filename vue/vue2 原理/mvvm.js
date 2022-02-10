
function MyVue ( options = {} ) {
    this.$options = options; // 将所有的属性挂载到$options上。

    let data = this._data = this.$options.data; // 将$options.data拿到最外面来，用_data保存
    observe(data);

    for (let key in data) {
        // 将属性挂载到实例上。
        Object.defineProperty(this, key, {
            enumerable: true,
            get () {
                return this._data[key]; // 这样vue.a 就能直接获取了。不用再 vue._data.a
            },
            set (newVal) {
                this._data[key] = newVal;
            }
        });
    }

    new Compile(options.el, this)
}

/* 编译文档里的内容
 * el: 节点
 * vm: 数据
 */
function Compile(element, vm) { // 主要用于替换节点的内容
    let el = document.querySelector(element);

    let fragment = document.createDocumentFragment(); // 创建一个文档碎片
    while ( child = el.firstChild ) {
        fragment.appendChild(child) // 首先将节点的内容移动到内存中
    }
    replace(fragment, vm);

    el.appendChild(fragment) // 最后再将文档碎片添加回去
}
// 替换操作
function replace(fragment, vm) { // 循环node节点，替换数据内容
    Array.from(fragment.childNodes).forEach(function (node) {
        let reg = /\{\{(.*)\}\}/;
        let text = node.textContent // 获取节点内容
        // 如果当前节点还有子节点，就递归操作
        if (node.childNodes) {
            replace(node, vm)
        }

        if (node.nodeType === 3 && reg.test(text)) {
            // 先去除字符串内的所有空格，再分割为数组。
            let regexp = RegExp.$1.replace(/\s*/g,"")
            let regArr = regexp.split('.');
            let val = vm; // 表示当前实例
            regArr.forEach(function (key) {
                val = val[key]  // this.a = 数据值
                console.log(val)
            });

            /* 为了修改数据时，能够更新视图。
             * 所以我们要监听
             */
            new Watcher(vm, regexp, function (newVal) { // 在函数里需要接收一个新值
                node.textContent = text.replace(reg, newVal)
            })

            node.textContent = text.replace(reg, val) // 最后替换掉文本内容
        }
    })
}

// 观察对象，给对象的每个属性：设置属性特征 Object.defineproperty！
function Observe(data) { // 这里是主要数据劫持
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        observe(val); // 递归操作
        Object.defineProperty(data, key, {
            enumerable: true, // 允许枚举
            get () { // 一旦取值默认就会调用get方法
                Dep.target && dep.addSub(Dep.target) // 一旦Dep.target有值就添加到watcher里面
                return val;
            },
            set (newVal) {
                if (val === newVal) return; // 如果新值和旧值一样，就忽略。
                val = newVal;
                Observe(newVal) // 给新值也设置属性特征
                dep.notify(); // 执行所有被订阅的方法
            }
        });
    }
}

// 这个函数主要用于递归，这样写更美观
function observe(data) {
    if (typeof data !== 'object') return;
    return new Observe(data)
}

// vue的特点： 深度响应！ 每次赋予一个新对象时会给这个新对象增加数据劫持（设置属性特征）
// 不能新增不存在的属性！因为不存在的属性 没有get 和 set
// 发布订阅模式：
class Dep {
    constructor() {
        this.subs = []
    }
    addSub (sub) {
        this.subs.push(sub);
    }
    notify () {
        this.subs.forEach(sub => sub.update());
    }
}

/*
 * vm:实例， regexp: 表达式
 */
function Watcher(vm, regexp, fn) {
    this.vm = vm;
    this.regexp = regexp;
    this.fn = fn;
    // 添加到订阅中的 target属性，为了 当要改data的值时，我们就添加到订阅中
    Dep.target = this;

    // 这里是替换值的操作
    let val = vm;
    let regArr = regexp.split('.');
    regArr.forEach(function (k) {
        val = val[k];
    })
    Dep.target = null;
}

Watcher.prototype.update = function () { // 这个方法代表执行这个函数
    let val = this.vm;
    let regArr = this.regexp.split('.');
    regArr.forEach(function (k) {
        val = val[k];
    })
    this.fn(val);
};
