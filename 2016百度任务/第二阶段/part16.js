// task.js
/**
* aqiData，存储用户输入的空气指数数据
* 示例格式：
* aqiData = {
* "北京": 90,
* "上海": 40
* };
*/

const $ = function (val, type = 'single') {
  if (type == 'single') return document.querySelector(val);
  return document.querySelectorAll(val);
}
var aqiData = {};

/**
* 从用户输入中获取数据，向aqiData中增加一条数据
* 然后渲染aqi-list列表，增加新增的数据
*/

function addAqiData() {
  var cityInput = $('#aqi-city-input').value;
  var valueInput = $('#aqi-value-input').value;

  if (!cityInput.match(/^[a-zA-Z\s\u4E00-\u9FA5]+$/g)) {
    alert('城市名称必须为字母或中文！')
  } else if (!valueInput.match(/^\d+$/)) {
    alert('城市系数必须为整数！')
  } else {
    aqiData[cityInput] = valueInput
  }
}

/**
* 渲染aqi-table表格
*/
function renderAqiList() {
  let td = `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>`;
  for (var [k, v] of Object.entries(aqiData)) {
    console.log(k, v);
    td += `<tr><td>${k}</td> <td>${v}</td> <td><button data-city='${k}'>删除</button></td></tr>`;
  }
  $('#aqi-table').innerHTML = k ? td : '';
}

/**
* 点击add-btn时的处理逻辑
* 获取用户输入，更新数据，并进行页面呈现的更新
*/
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
* 点击各个删除按钮的时候的处理逻辑
* 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(v) {
  // do sth.
  console.log(aqiData[v]);
  delete aqiData[v]
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $('#add-btn').onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // 事件委托
  $('#aqi-table').addEventListener('click', function (e) {
    // console.log(e.target.dataset);
    delBtnHandle(e.target.dataset.city)
    /*
       dataset属性是Element的data-属性的实时、双向接口。
      设置或删除dataset的一个属性就等同于设置或移除对应元素的data-属性。
    */
  })

}

init();