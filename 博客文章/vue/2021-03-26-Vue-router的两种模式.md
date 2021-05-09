## Vue-router的两种路由模式

> Vue-router是Vue.js官方的路由管理器。
>
> >  主要用于构建单页面应用，改变视图层的时候不会向后端发送请求。
>
> 两种路由模式：
>
> - hash模式
> - history模式



## 单页应用 SPA

> - [Single-page-application](https://developer.mozilla.org/en-US/docs/Glossary/SPA) 单页应用程序。
>   - 指网站仅加载单个Web文档，通过 **JS渲染** 来更新文档中的内容，不需要向后端发送请求。
>   - 优点：更好的体验，页面切换快。
>   - 缺点：首屏时间慢，SEO差。



## hash模式

> 在请求HTTP的时候，hash的内容是不会出现在URL中。
>
> - location.hash：返回 URL 的锚部分
>
> - 通过 **`hashchange`** 事件监听URL的变化： 每次hash值变化时，触发这个事件！

案例：

```html
<style>
  a {
    color: blueviolet;
    cursor: pointer;
  }

  a:hover {
    color: coral;
  }
</style>

<body>
  <div>
    点击跳转：
    <a href="#/login">登录页</a>
    <a href="#/user">用户页</a>
  </div>
  <h2></h2>
</body>
<script>
  // location.pathname：返回 URL 路径名
  let baseUrl = window.location.pathname,
    h2 = document.getElementsByTagName('h2')[0];

  /** 
   * 监听路由的变化
   */
  window.onhashchange = function (event) {
    console.log('hashchange', event);
    console.log('oldURL', event.oldURL);
    onHashChange(event.oldURL);
  };

  // 跳转函数
  function onHashChange(oldUrl) {
    if (location.hash === '#/login') {
      h2.innerHTML = '登录页'
    }
    else if (location.hash === '#/user') {
      h2.innerHTML = '用户页'
    }
  }
</script>
```



## history模式

> `window.history`:  打印history对象
>
> - history.go(n)：跳转
> - history.back()：后退
> - history.forward()：前进
> - [history.pushState(data, title, url)](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)：往历史记录堆栈中 “添加一条历史记录”
>   - data: 用来描述新记录的一些特性
>   - title：代表新页面标题
>   - url：代表新页面对应地址
> - history.replaceState(data, title, url)：替换当前页的历史记录信息
>   - 参数和上述一样；如果你不想添加新的记录，可以用这个替换当前的记录。
> - 通过 **`popstate`** 事件监听: 当历史记录变化（ **go()**，**back()**, **forward()** ）, 才触发这个事件！

![history对象](C:\Users\wilson\Desktop\每日博客\images\vueImg\history对象.jpg)



案例：

```html
<style>
  a {
    color: blueviolet;
    cursor: pointer;
  }

  a:hover {
    color: coral;
  }
</style>

<body>

  <button onclick="history.back()">返回</button>

  <div id="divs">
    <a data-href="">主页</a> |
    <a data-href="/login">登录页</a> |
    <a data-href="/user">用户页</a>
  </div>

  <h2>主页</h2>
</body>
<script>

  const baseUrl = location.pathname,
    divs = document.querySelector('#divs'),
    h2 = document.getElementsByTagName('h2')[0];


  divs.addEventListener('click', function (e) {
    let dataSet = e.target.dataset;

    if (e.target.tagName.toLowerCase() === 'a') {
      // 1. 拦截a的默认事件
      e.preventDefault();

      // 2. 注册路由信息 进行匹配
      history.pushState({ path: dataSet.href }, '', `${baseUrl}${dataSet.href}`)

      // 3. 调用对应的方法
      onHistoryChange(dataSet.href)
    }
  })




  /** 
   * popstate监听路由的变化
   * 【注】 只有 go()、back()、forward() 才会触发这个事件！
   */
  window.onpopstate = function (event) {
    /* 
     * 1.通过pushstate把页面的状态保存在state对象中，
     * 2.当页面的url再变回这个url时，可以通过event.state取到这个state对象，
     * 从而可以对页面状态进行还原 
    */
    if (event.state) {
      alert('返回上一页');
    }
    console.log('event', event);
    console.log(("location: " + document.location));
    console.log("state:", JSON.stringify(event.state, null, 2));
  }

    
  function onHistoryChange(val) {
    if (val === '/login') {
      h2.innerHTML = '登录页'
    } else if (val === '/user') {
      h2.innerHTML = '用户页'
    } else {
      h2.innerHTML = '主页'
    }
  }
</script>
```



## 总结

- hash模式：
  - url有锚点 [ **#** ]
  - 通过监听hash值改变，触发**`hashchange`** 事件，来加载对应页面。
  - 支持低版本浏览器和IE浏览器

- history模式：

  - 通过调用 window.history对象的一系列方法处理url。
  - 通过HTML5新推出的API **`pushState`** 与 **`replaceState`** 进行无刷新跳转页面

  【注】如果刷新了页面（会发http请求），而服务器端没有这个地址，则会出现404错误！

  - 解决办法：

    > 通过后端配合， 配置apache或是nginx的url重定向，重定向到你的首页路由上。
    >
    > 或 服务器配置好地址！