(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"basic-project","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 121:
/*!*****************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/food/pic3.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 122:
/*!*****************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/food/pic4.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 123:
/*!******************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/shop/bulka.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 124:
/*!************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/shop/bulka-close.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 125:
/*!***********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/shop/bulka-open.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 140:
/*!********************************************************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/banner1.jpg ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/banner1.jpg";

/***/ }),

/***/ 18:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/banner2.jpg ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/banner2.jpg";

/***/ }),

/***/ 19:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/banner3.jpg ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/banner3.jpg";

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"basic-project","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"basic-project","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"basic-project","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"basic-project","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_scan.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 21:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_bulk.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 22:
/*!************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_take_out.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 23:
/*!**********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_eat_in.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 24:
/*!****************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_buying_agent.png ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAJnklEQVR4Xu1ca3RU1RX+9s2DBAK1CtWlkBiiVhZIgzxaDZWmFhai0My0JGWRmQgo0tUESSaArRUitCLLTCYF21WoApmJtIEyEyGASpdggSLIQ0SqFSE4akV5SlZIIDN3d53BhMlz7sw9kwfp+Tmz97f3+e455569zz6X0M4te6I9MSYS32fQPQAPBdHdYPQGEEtAT+EOA5cA1IBQBeYPAXpPBR+p82Dvi5vMle3pMoXbWI7xL/2j1R6pIPyIiFIBJOq0WcnM28HYoXr4TVtF1uc68dpUDwtB+ePsvdQ4fkSBkgFgvBgdYepEDZi2grnsovdSxcpNT4iRJ7VJJUgQgzg8DkYeiAZI9TQAGDN/yowijopZYVufXiPLthSCZg5fEdUnvmcegLkg3CTLuRBxvgKrhRfdtcUrDzxRFyJGg5pugizG0pEE9SWAhup1RqY+A4cBetzqzHxHD27IBBWgQKkyJC4GKfMJiNDjRLh0GfAS8/NxrhMLClCghmInJILmGUv7q+BXADwQitH21mHwdi9oarHT9EWwtoMmyDKxdCRF8UYAtwRrrIPlT3EdTbJuCm7KBUVQvrHUALADQK8O7myo5qsBMhU6M11aATQTZDGW5BCUYgCKVvBOKqcyKMfqzPyTFv80EWRJs5tAVEIETfJaDHekDDOYgUeLXCZ7ID8Cdjjvp/YJFIFyAkUFAutK/zO4DkwPW12mbW353SZBsx9ZfWdUVOR+IvTpSp3X6iszLtbVeUYsq5h2rDWdVgkSu+PeCT33EjBMq8GuKMeMd6rcl1Ja23W3SlC+0W4DaE5X7HSwPjPDZnWZRKjUrLVIUK7BPkYBbb9eFuVAhPkWbaL7i5yZbzeVbUbQ5MnrIuI9lw8R4Z5AwNfT/8w44o7sMWz9+nSvf7+aEWRJczxJCsR+p/s1FTmF5aYXWyUo976iWOWWfm4i9O1+7EBsjs6okT3i/fNJjUZQtx4934wIVtXZ1vKs5fUDpIGgyZMLohO8SccB9O+Oo+dan9m9/9yJpB07CjzitwaCLGmOKaRgrVZyXtiQqUn0uVkunD9drUm20wipyCgsN61rRFC+0bEZwAStTmolaMOKvXj7jVY3qlrNtbfclkKn6eEGgnIeWtWvR2zUZwCitXqilaB3d53EK7ZdWmE7i9yVyzV1/ZdvnX7aN8XyDPZfKUSNXm+BPNVKUE31FSww+0Zrl2oq1FlFzqwVPoIsRoeLgDQZPcjIvg8jUpNkQIWM8fXZS/jdTGfI+kKRgXKr02QggMlidJwh0I26EL9RHpE6EBnZ98uAChnjvT1uOAr/GbL+VYL4nNVp6ktz0lYnRyqRh3Sh+Sn3u60P5i2bJAsuJJyNq/Zj5+YPQ9L1V/KonmGUZyiZrpDysm40P4AFL/8MvW8I12lzYE+X//o1uD86E1gwgITK6gyyGOxLiOgp3Wh+AFNzRyN59O0yITVjqV4VT08tg6euUcypWd9fkJmfp3yDfQOIjCEhtKKU8tB3kfbYSJmQmrE+O34Wf5i3VbN8m4LMTso3OA6BkCwH8SrKrbd/G7lW3z6r3dvOig+wcfUBWXYPiilWSUTS58Miezpie2ned8rqEEqLduLw7k+k4DHzSbIYHOeJcIMURD+QrPljMGRUu1bA+KzLjP3Eq57yjY7LwYQYWolMNQzGhMz2zfdXXajBohkbtLqoRa5WECSKjWK0SAcjE39XX+QsEcVl7dfe3/cpSpa+JdNgLVmM9rOydtH+nikKYZEjHT1i2u+8cUvpIWx3HZVGkG+KhWuRFl7OenYskobcLM3hQEB/XrANx49+GUhM8/++RTrfaBeVWGGpDhubPhTjMsIC3ayTYoP4jHkdrtT6EoGy2sGwbBTrvUsafDNmLRory9k2cf5beQ62/C1ybYmNYjhCjXovo2MisdieDiUi/BUzu7f+B+Uv6SpHbEauL9QIR7Dqbyl7yXgk3HXtFOmU+wKsuRVyn3SY0HzBqux0R1NfxV5I7In82zPmMtRW667QDRMt12B96Q7ZCbOmXg8afhum/0bcQAhf++rzr/HC7E1SDTQkzASqzJRrUy9jekVhsV3cSAhf2/P6R3Cu3CfVgF/KNbSkfTDe5BZOwK2JUjK6LZpds3QHju4ThzLymsqcXeQy/9GXtBfHPtGxUV+EoyBcvMke++2PkTjoO/K8b4JUUXIAb238QCZ+42MfgZxvcGwF+W7mSGsi3BD7oJbI+cffj+D1vx4OypbAm7nwQSQNaV6ivd31PraUvhsUXhvCjQ8OhWCesSRDgfI3WRYETnJKAqbm/bBFSK9XRcG09UG9zQaPGoBH549pFW/xjA2orhLJCX1NhfqLImdWmUDxK15YF53grT0GULw++GvagUKNYGMn2Xgt95Pdn0TEDKwvpGpS/lKSQ4qyTBZB9z6QiClPprQIJ2KnhRJHkMB77pflEIeGulqTIqpGBOVOXhereC5LK6DyrUGLxyLx7uYLdMhrUMFPIGK8pk3GGsSML9VTpxNte/IaLuQ1K8HLT3NkQ0FDAZGupyFSlTGRGD8lGcmjE3xnZSKo3PPGsZArPgTeuPShvmOlb93UEyJ0EXGYlAqSQCV4goxuW8QJPuSOiBkZsIjz6hut9AfE/K/uVAbshZpS7Mra03TGtFpInpdmtylK9ygkB7i40GnObWk5afsqQnzsLiIapXcd6sz6zLyvyl0zOuirCKJTc9PWJKkUcfB6vcwCxnkPe+4tLp92srWHGPA6lMXgGAvizf+/DtXGPMgzOMwErLleFm1xN0NVOdP2qjlgVW/AEVTPmygyB8HW1UkS5BB4TqHLrCli0EyQIEpczSSiVSBEduaFtw3frqiqOqOoPKtUq/9BEeTbI/muaFIZAXFajXQSuWov4+c2l+m1YPwJmiABPsdgHxQJcoAwPBhjHSbLOMBqndn66vR/B+tDSAQJI1c/aBK7kImeCkcmMtiOtCQvPk0BxtIq96WCUD90EjJB9Q7NTVudrCqRInfbsbW/zRna7VE92cXl03SlGXUT9I1fZEmzZ0LBswTS+4UpvYOnklVeaC03i4WY9YLJIsjnh2/aDYg1s4KnO4CoSqj8+7gLA0oKdqRKq2CQSlD90xJExcX3nKIQ0gGMAxCuIiFxPLuNGGW9zvdfK5OY+r6EhSD/YW2ZuLYvlLp0UiIeZHAKEXQWDPEpgHazV33zyhXvenEjR+80aks/7AQ1NZ47yXEHKfieQrgDhDsZPBBMfUF8Y32lmzj2BdM5EIs7JCfAOKYyPmYVh20bTR+Hk5Cm2P8D1JJ7gIUiKT0AAAAASUVORK5CYII="

/***/ }),

/***/ 25:
/*!**************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_department.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 26:
/*!************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_discount.png ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 27:
/*!*************************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/icon/ic_lightning.png ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 28:
/*!********************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/banner4.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/home/banner4.png";

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*******************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/pages.json ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 42:
/*!*****************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/food/pic1.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 43:
/*!*****************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/food/pic2.png ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 44:
/*!******************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/logo1.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAIABJREFUeF7tvQeUlFW2hv18qWJX50BochTJIGJGxzHnBIogBhRQFBUdHcdRRx0zYkBRBBRURB3TqJgGdRwzSJQcm9y5u7ryF/61TzXjzP3XvbN+/bmAl2+tXp2qurq+9+xzdnj3u7VpCws9Dly/2jugHQD4V4utemMHAP5143sA4F85vgcAPgDwr/0O/Mrf34Ez+ADAv/I78Ct/ewcs+ADAv/I78Ct/ewcs+ADAv/I78Ct/ewcs+ADAv/I78Ct/e78qC/bYXRjTwNPQ/gU8+Z2nu2jyc/U7eYxk47PPcTGaH+2C5iK//Odf8DT+7Y/tR4tiPwRYb769/wqfACKQZD8jYO0GUf3MxdNcMoaH4RiYronhCnwenpbB0xwyWii7PLQ0upbJAuzp4Jnyw38uhP0IW/Wv7ocAi6UJFLutNWttu79vhu2f3wuw2d/paE4YXb72xEptXPkwHBzdw3DdrJGqhSELRF7HbP7sNVv1/gbvfgvwbtCc7B1vNmZdrNLTlUUKpK4mNmri4VMYm16qGaisRbsaOJqBi47fddBdgV8s1hDbzj5Wk9dQe/n+h+7+a8ECsKMA0DQdV1mfDo4Pw/PhkARTLFSg8WE7PjTNn4VJQPMy4KawDF2ds57rKljFeh1ZJLqhgPW0tLL0LMDWAYD/d+6AbJ0CroPnZS3Lc+RnBoKLRxJPtl51wobJpPOo2qnz4/I66hr96nzNy9Xo3auYshIX06jH1OM4RlIZqWN7aJqpFkzWEWs+87XdZ///zrv8/+tV9sMzWLbKrKcrAHuugaGH8Bw/ti7OUhJDN3GdIHayiI/fq+D7L2vBzqUov0iMlJrGHbh6jCOOLuHY35YTCNbhyLmMg2llwEug46B7Opori0dTHvj+eO2nAIsFe4gBa/jxnCDxJo2vv3FYvS6Optu0KS8mHtX47svNHDHoHC6/cBwHlZeSwWRdxRZmvPYcn37zFoce04JwnsuOjTHcjE2nLiEOPSyX3EgCXYujK+AlxNo/uYn7H8CuiafbeJ6FS4AMLolELrOe3cSWVSGK84vRfLCzahcGBoccNJBZU2ZTGMjDp2tq63Y0qE80Mmr8SL5a+jWepVOS0wrdaGJn3Xrad8nl4ku7kJO/EYuMOts1I6086qyr5aDLLiKetufH1eWc3jev/Q5g3XNwlZds4BDC9Yp48/VtfPO5w/WjbufSoUPxTJ2vf/iWu++5h3tvvYsTDj8OHxY+y6fOWReXtJfhk6/mM/EPN/O739/G8YNPxtMzPPvK0zz69J854vhCzjw3jE+vx/B09ZpyzmcBttHE+ZIjQpy7ffh83u8ANh1NhTjiFNmeRX1Na6Y+uoE2ZUfxzvR3CdrgmpDBYdWqlXRq14lcfyh7nlpZgOTDdmwSmRQbtmyiU6cu+G0dV9eJah4XXj2c5Zve5rqJHSku2InhiUcdUA6X5LeysbUcE2n1te759k3z3R/DJNMOKKuxzSgOGls2tGDGExsZPeL3TBx1PREvB0e2Tz1rqcoX9kDXdGzdQ9eyqUrXdrLhlWzbHvi0FI6n02T4eXTWFB6fPZEx13SiQ7udmHoCzwviup4KoTzJbmmy3dsKZMPbd0Oo/c6CdS9DxpFzz8L28lizPMyr0zdw/JBzeequyYTlTPQESF19eJ6Lp7ZUnfpEFEEzL5yrLNr1XFwHdF1D0+I4+GgyLCbcfQNv/W0GF4/sTa9eSQxji0ppahJKeWLDIXD92fhYS/+Us94H7Xi/A9jR4thuKXV1+Xz2+Q6WLqwnXhskoBXzp9/dwfmnnI7f8GN6BqYuSUeNjJ3GMA2WrVpFKplkQN9+eBkHzcien7LhZrBJeTqvf/g2f3hgIgknSjDk0W9AEUcfU0pJSRxX345hNKF5fjQnqHYCAXhfTnLtdwAn7BYsW5bgvXerqKoy8bwk/kCGoB4GO4dO5V1oU9KGbq27cOv1NxGtb2DjhnUMGDCAeZ98gmM7nHLCSSxbtoTSli0oKinhocce4YfNy6mLNrBqw0Iwm3Acj3g8hGckKC2D007sSK8BFrpRgSQ3NcevEpoaaRzJsOyj1z4HcLYiJKerhub61JlneylcL4CdKWDuO1G+/6YBJ+nHZ5gc3BeOPaEVkZwQf/tkGauXZWiqtDj60JOZ9cjTbFq3gc++mM81o8cz67XZ2BmH4RcOZ/bs2Qw8ZCCdunXlsvGj+XTZB/hzUvTrE+Q3x/YiFvP4+ON1LPmxEdfR0HWdQw/TOOPMtgQD9Zik0TwHTZMTX87g3QkYCZnkPUgWbO9XovZBgMUqpG4ruQwDW5JWZi51DQW88vIalqzWMT2dghyPs85oQ99+LrpVgyuJZ18eqVgx05/aiK51492nZrN53XpeffdVHvz9Y0x/9SnStsclIy7jgfvu44Tf/JauPXtwwZXDadBWMXpMbwLmenxaE7Yj3ngBi5c7vPHmZmrrNPyGR7fOfi4Y2obCoip0LYVnyyJsBlRl2Hbnrw1wm73r5prz3jDyfQ5gCUV0x68qQq7ylAPUVLZjzkvr2bgpAZkIHTqFOef87hQWV+LzVaK7Sfy6j4yhYWfymD29jl2VxXww7S/U7azh0ekPMvPRl3lx7gukPZcRw0Zxww3Xc+klo2jZrg0nXXwmRW3qGH5ZCZq+gqBlYjshUgSJpnJoaCjgzVfXsmmVrRZehy5RLhrRirKiJgzHAyOhypHZD1W1aP689/PX+xzAmqujuz4cPYNtONRHi3jp+UrWrfRhuz78fo22HXPI6DU4RMkJ+RnQN0LfPkEsfzVGIsTbb7p8/73G/FkfYXk+/vDABGY9/iLzPvyYZMbmjNPO4pqxY7n1tltx/TrHnn8KAw9PcOo5fgzfDuxkGcuXanz7fRVNUmEkhN8oYu2GapxMGE1P0KlTkktGtKMwrwLNaC5bqsKE1VxDztacs9feA3qfAxhV+rNxDINYqg2vvLSdpQsdPCdHxZ+Sv7L1BLplYGeC6uTz51Ry4SWt6XlwI2Hb5KMPfbw3r47PX/ySTq07ccMdV/L0fU+xeMlyEuk0gwYO4ve33Mzd9/yJ9VVbOfKc4znlNI/jTwngaGlWLs1hzvPbScZy8TwDQ7Pw9DhpsxHXCOGl8rC0JP0HOAwbnoffagA93VyKlEqUbM1yxiSbAd57Ttg+B3DWaUljU8bHH8IHb4uTE8LUMrRp0YbDex5Gt+4d6di+MwUF7Zj/+edMff4OWnZJMHZCF/zU8eWXObzy6mbeenIeR/Y7ijlvz+TSs4ZTUx/FcV0KC/L569tvccqZJ/PligWcccVQLhquc8hhOaTdHKY+tort6wu4asT1/PaY42isj7Jy3XJ+3PQ93y9fREVFA7rm4fPXMOQ3bTn1BBPTH8X26lW8LWGUslotfgDg/+p4uJ6DQ5j16wp5+sk1OMkWdCzvxJ03X8+hffqQ6y/EtROETEt4GNTFGzlj5AmsrVrKrXcOpiB3J0uWFfLczCXMvOtFzjluKI2JKor9eaRVWV8qvR7pZAwjZPDOVx9x8U2jufwKjZ6982hoLOb+O7+nPL8v8156m+JwDhomMVcWnae2+O+Wfs+9k+9mzYY16H6LiWNLadPRwzO3qUqW5gazdB8t1exR/1+zYJWk381UFI6U3PZsGt/TDRpjJUx5bBM7dwQoyGnFrCkv0at9FyZcexn/WPYDvbsezJypL6NrBgmSDL9uGPOXfsjE3w2gQ0klazaU8eTT3/LQ+Ie57Kzx6EYCn23h6D6VllTpSklsuElmzpvD9ff9nmuuhy5dImzdUsoTDyxhQJcTeXvGy+R4fhw7w/Bxw1i+fCMHHdyLac89y+INyxg9cQJbKqvo0XoHV40/CF94M+gJ8IIg6UvNVhHB/7kz2HIyZDQ/SVMDPUYgreN38kmQwDbCfDwvyLufVBMycpj6u4c595gzWLRtMadfO4LB3fpx9ahRHNJrIKaby9aqai4efw5rar/l9j8OIDdUybqKEqY8sZTubQdwcPv+BI0wVkA83iC2JgVAD89xiCUaWLttFUs2LGXCNQE6dzGINZVw323LaZ0/iDnPvkx5UakqFn21ajHPvDCb77/5iLdmzuSgdgOZ9/lXXP3HsVSbtZx+YgGnHiNbdQMJK4mrp/GlAxiesVdryXvlDDYcDUfYF4ajYl0r42DofpIUsGhpkldniyfbgoljbuKGEVeiuwZ/fOwennjjKUqDhQw54nBMXaehLqEqRtuiazj40FxGDmuJnyrWbG3BE08uIehrSV6wJamU0K3qCKZMMroJuomhgWF6NKTrqLcbuGlsLu3bZ0i7Rcx9cSeLvo1TWtSOXt37kJ8TwdOTzP/6HzTUN3D5uSO568a7sV2PF157ntueuAufP8bw4W05uK+NbtbjOR6G56KLA70Xy4l7BWCEBqOnVKyrC1FOg7RrUbGrBc/P2EhdhcaFJ1zCpDsfRtMz/LhpExddfTlpfwUHdy9j6fKlZFxP3by8/By6HZTLMccVEfFVYnqwaUsbpk5eyqXnjeOS8y5XaUWXBsWWzcjN1gwsqQqRYe67rzBl1lQmXJtP206N2KZFbV0rvvqyhlWra2moj0PSIGx5dOrTjbUr69ETRcx+fCZ9u3bFtT1uuvc25rz/FsFW9Yy6opyOLWP4PRtXT+Cq0qKi9O2Va68A7HgOpmYoRqpwn2wsmlIteG5GBetWmQzoeCivT55GWW4L6r1arvrTzbz7yXuccHIxvz0hh4Z4lLRwsnSdoE8nN5jC9HZh6jYpO5ctWzrx9KQlHH/kqZx74vmEQ4WKaxX2BSTBSCqTwc1kiEbreO+z93jnb/O47roy2nXcBb5GHCcf1y4klYFEwsBNhTBNBzM3zOef1vLx27s47/jzmPzHe8jV86muq+H8CVexoOILuvZ0uGxoK4pz6rCNVHPS9f9YHOzqKbRMENP14+kp4k4B8+Zl+OyTSorDHXlx8iwGd++C53rM/exNxt15E6a/ngkTDqZ1q824mqfOUuEw656H5aXxeUnl5Sb0It57X+PjeU2YrtSSTEwzgu3FCUjeQbJUrpiyjWlqJL0MKd3mtBNzOeHEMKavQqVCdcfIsjZcPzY+Mr4EGU9nx45WPDV5BV5TKY/8/iFGnDIMLW2zaOsKzrl6GA3JrRx3jJ/TT8tBN1KqXKnpzYmQvWDDe8WCpVAuRXLJWCXcHJavDjB7xiqsVBn33XI3I08bjqel+LFiOeePGc2uxhq693C47PJcQv4qlXzIEtQl5pTyv4ekgzOmS0M6h6mP78Kf7M3g3v3o3bkzqYQULBLYtkfalTPSIOwP4PdZLF39IwtWLiXBWsaO70YwsImA7qpOB08V+k1sKe5bcVxHJ+N04NlpW1m5VKdVpCOvT59Jv/KuJEnxyvvvcsv9t5ExtzHi0nJ6HywskBoMY+9xtvYKwJ5rouvCfjTZXtmGx6asJVoT4eKTLuShiXeSa4TZEq/lwusvYMGPW9BdjxNPcTj1DGFqxNBdS3UwyPaOlsERhqV0MLg6yUQhTz22nY6lZzDj8SdYv3opn/9jAZG8EKf+9kx21lTy7fdfE482cuyRx9Cpe3cuvW4Mm2o/4vJx7QgHtmIpQr2maEEZOehdP2bGw0+AlJPDX+fH+HBeAi1dSP+DW/Haw7MoyW1J2vG4ZdKfmP7X58gtaWT8mM60blGP50mueu9cewjg3b1CyoVsLp3tbv2QBjAd13BpcoqY/tw21i0xGdB9IC88Oo2S/NZs3FXBjbdew9rtGzBCJWytXs0VV7am18EVYMZVGVGsX/3F5nyvsCw9wyGdLmDW1Abi1R2ZO+Mv5AR1Zs2eRU4olzNOPoXxN91Ir549yQ/4uHTkSJo8l5NGDSOvdCsjRpYSDm4Fr06xPGzNxNGC4Jj4pWQoW7XmZ8kaP9OmbqJFwQAy8SZ6lhfx2H2P07akHVXROi69/goWrvmKTj1zuHRUCUHfJnVUyJLEsxXHOtsJZWTZmXvw2oMAq7v/7xWW5jZMqcCktVy++N7hzblbKTQ688KjzzCoxwAWLl7OnZP/RHFBhFGXXcnN993OrqblXDu+C62KVyvGJEJy8yTnKxmSbGuJENQdI006nc+Xn/r48O1dHHPoGUy+52FKwhG1hVc21HDF1Vfx8AMP06VNe5piDVxz+3W898NHnHSKxXG/KcFnRNG8pOJcq81f1S1tddZLSCe9TNur85j6+CaKAn25//b7eWH6VOor67l94h8Z2H8gC1f+wEXjh1OdqWbYsGIOP1S6JWK4joelmbiGROLy9yUbt2fP5z0E8G5w5fPuRrGflqnUbusaWzHt2Y1s36BzzcXj+cM1v6d6WzXvvvs2/Q/pQ9fuvamM13PkOf1o09Vh7Oj2RMwNpLUIniYLR25MtoXln52Fnobn5VLTUMarr2xizZIUbz73AUf27CcdSjS6HleNv4xbb76Nrh168u2C7zh/3Am07BNixMUWeZGEim19eg6eHAPCf9aasi2m+DGkOU1zSWVaMnPqVrb8CJ++8zkFkSI2rtnIou8Xc+KJJ1HStiV/fuYBnpj9JCWlaa65tgO5+dvVglRpTC2JJ46XJ6+xZwn1exBgyb8KuMI8/Jc9yIM0OXz2qc57r8VoU9SZ+a++QUGgAN32KYfEdVOkzAjPv/sKtzx8KSeeUcZvjw4S1mrICFFGz6izV3UcNDtbKsdsy9lpEDdzWbEmwIvPrOWWUY9w/cVX4fNS/LBqDVOmPcStt9xOSXFXZr86h7ueHMOF47vQq2sdBo04hnCuLTTXwvBkY5WKkIRyAUzHp+LaDCV8/onDx29t444b/8zl516M4ZpY+BXzUpy9ereJY889nh1V6znpjFyOOVFCw6RqYdUEYCEGyOvswe1ZmdkekRNWi1I69LI10WyTWHNd1DOoiZXwzJMVVK0v45HbH+SSM07CEnqLdAZqaRwvTZ3j44zR57Ou8m+MHtuPti0kWEmDXqccLek0cB0LnAieKzdNw/JSaEaMmGWwq76IZyetZmCbM5j7+GyMdBPV8Rh1dRW0Lm+P6yth1DVXsmjdW4y5qTctCmtw7SY0U1cdhnJeGloKXWtAN5I4bhDNzlGhmG0WsWVrC5576jtal3Tm02c+JNcfRnPkOSau7hHXMsx5/3VuvOMWits2Mvb6luRG6tQukD1aBODme7IHQd6DAEs1RbZQsUgXQ2iutlBZfXy7OI9XZq+nU9ERvDfzDVqE/MrZsHWLjOaS9JJMemEWjz77KOH8KH17l6pVHwh7tG6t0bpNmLw84WwFqViXZM3KepKJDCXFBl17FJAJGCxYXM+3n9fi1hby4cvvkqyvYfacF9G0FEOHDSenpB0nXngmmn8XRw9pSZ/+YSXisHpZFTU7MuTkmHQ5OEzrjmk8M0O0roBt62LsqopTm9BwtWKWLa4l3mjz+5HXcv2V1+J3DUzxDXRNJWIqG2s4ZdQFbKz+gQtHltN3QBxTj2I4AVXskDAMVTvec9f/CsCq79YxsMww6aTGtBkJVixLMOGSa7n9yj8ScDQ0I0EKjcaMyyvvzuGORx7A8Bnkhyx8XpoUSWqSMVJph2A4Tc9eJeSFcimN9KJrh77s3LaFz7+az9bqTeAzSKZ0WpV1pmprI0f2P4QnH3wEv9x811UdDOPu+B3zvvmMVq0LqN++BTcQw/A8WkXacPzg39K2bVt+3LiInall1MSqWb4oih7LxdI8IgV+0HIUizPeKNu6y8SxExh97ghyzaDYPhnPwdY87p89mfufvp/+A0JcODJMILgFI1Oo4nfPrAcvsOfQ3VNbdNZDlCRENhhQMaXcWDeHpmgeDz68k3TMx3vT5zCo42CMjIZnpdhSvZ2nZr7A519+yqAjBnPumeeSF4gQsoLEMmm2NVWzeMlGPvj0NRat/IL2bdrz7EOzOKjNwRge7KjaysPTHuP1t96gVdty/nzvfbzx2qt88P5fGXLEEZx7xvmqi//d99/l7fnzOPGc0xg5dCS/u+kmNm3bztmnns4tV42nbWm56olYt2szl0y4hHXb1tK3+0DOOPoCBvfqTV6RZMckUaOTbKjl+ff/yoIvv+G4QUdxzWVjaVFcpkCTfqZF25Zw8sVD8QfquPqmMopLKzAzRdm+Y7Nm/wVYkg+GC4Z0AEjDmC9Oyilk/doypjy1gn6dD+WNx1+kzF+SDT+kspNopLJqByFfgNKiYvyGhSHEdGk7UTdMR7NdqhJ1PDRrCtNfnM4VQy/hnutuJ+j6VCtJXbqByc89xdQXZtCzX2/uvv1PzJ79PG+9+SZJn4Q64NdNTj3hFEZfPprb/vgHlv64jCuGXsrEK6+lwC8pRoO47vCHSX9i5qsvMHLoCG6+bAKtI4Wq/Gd7LmmpWUjzqqOR0uLU1FXTFItRWtyKSCgPQ17IS1OV2Mm5V41l6boFXHpdMd177MRnZ8M8zGi2brwHrz2yRWf1MVAZKAFY0zwyRhTbzWPxQj+zZ9Zz8pGnMe3+yYSE86TOIT9CuHN1l69XfEO7Vm0oKSjG0DTV3WdKG4rwtdKSkrTZ1FjJWSPPIz83n9eenUNRMB9L00l7aWJuinsee4jZr75Ej149mDL5SRpra1n+7QI006Bnn74UFJUy9oarWbp0KUOHDuOua2+hyJ+LnpZVqVOdauTsS4dRl6hn7ow5dC5qQ1CyZY74CvIhSQoP04WKxh1UbFnLwJ79MDy/akYzdZOMkyKmO1wx8VY+/uZVzhyhccQRKXyOnm2dMeKq/XRPXnsM4KyujYumLNjDM+K4Rg7rVweZ9lQMn1PAjWOu4YLTzyIcyiFgWgQdQ/X7rqjYwLU3TmDijTdx2MBDifhCmJ6LpRk46YxqIotpaa68eTzfLfyBt198g24tOuBXOWpPEk/UJhqZ8Icb+OCzj+jVtzdPPzyFLgXFZHSNbTXVXPO7G1i0cDFDjjqGSfc9RKk/FyPj4TN92J7NppodnDD0dPoM6MuzjzxNnuZXyRJ0KTJmc9quneGbb77kwSmP8+C9f6Jbhw5YegCdMImMQ2O8kdc/eYsHn3ycOJu4dFwZB3Wrxq9Cd0l4SKF6P3SyskGRbGAZlVZU3XhGTLVNO+ly3nizgR8W1GDHDAry2nDE4CEMPLgXhx7UhfKiFui+PP6x4Fv+dP+9tO/UiaOPOJKB/fvTuqQl+ExMXZpHXB6d8SQvzXmFuc+9xHF9DiXoZYVWJEyR9tGdjVVMvONmPvjsY7p268J1l4/B0XSmPPs06zdVcMzgo3jiz5Moyolgadm4V5yfjO7wxbIFnD1qGBcMG8pNV1yHz9VUFSpuJ6mqqWTxooXM//QTNm/ayF0T7+HwwQNIpJqoqmlg0YqVLFq9nI+++oC6xk0YgQz9Bxdz6lmFhH2bsGxZiD61W+2XcXA27NVVaCPsfiWzoMdUgR+7iEZCVFQkWb8izbJFTezcaRE28hlyyBEMPqg3xx82hE7duqje3WdnzeSL775iW9UuIVNh5IcJejpB00c0maAxFuOmq8Zzy8hx+CVxIIyN5ibvlJumNtbA/U8+zJvz3qEqLWxIg/xghLNPOINbrr6RknAequdYnCZdIlSbpOcwZc507p38EJGcHCJWADftkNAcYqkETjpFeWEJQ448iktHXkKflj1ZunIJXyz8iq+WLODvP3xB3KkmtyX07ZXHQT3yaFGuEwrV4nMbVFJE1AnET9H/yZ3eMxv1Htmis9k3HfTmM0al5+JZQpqbQ9KUOqmBaZezpSLAzFkriTYEOG7wmVx98dUM7N5NyS2ozkDPZkvlTua89xcmT3uK0vJWDOraEzeeoclO882SH/jN4Ucz455JhA15HcnvKtkU0nYKz9CIuRm+XvQdl98xHtPVePyuhzi2/xGEsLB0SyXcXEMSM9niRZOT5uo/3sBH8//GIf0GKoB1v8nCtT+yeccOtaAuPPks2pSUKQKf8N4Tms33q5cx9ZVnmP/lO+TkJhk1qiflLW00swFXi0vwhE+KFp5GxtCVlITsRXvy2sMAx7JOhBsGLYYmGSjXj6tlz2XDsXAoYOPOAG+8tZFNa10iZmsO7zuY8086jaMGDKSssEglP75ZsYiLxl1OUX4B8197j4gVpCGT4ZKJ41i5bDlfv/khLfPLVOrSUn1NIomUUQ5TRvOojNZx0ugzVdH/redeplVuqeJ6CV9KM6SpW9AVyqXDjmgVx515Eu06dOSFp2YQ9PmIunGGnH8GNfX1vPrk8xzdox+m7VFbW8v8pZ/y+kcf8NnCL2lw62jfzseFZ7enY4sqND1KWlKrsgpsE7/qK3ZIWxnlD1junmV77EGAFRe2uQ7Q/MXu71WXfbMAoebheEESyUJWLUszb14l26ulNdMl4iumfesO9OvfgZZlBTw/+3W21TtMmngz4845R2lTTn/rdW554M9cf90NXHPh5YQwqK+tozBSgGUKdVU1e1Ibb+D4cScRTFm8MXUuLSOlaI6Ga3jEnQQNTY0U5ZbguDD9L3O47ZG7uPMPtzHm9IsUz2vWvLlMvPd3hHNDXDXiKmp31bFg+VJWbd1AkzBlvUpatUhx8kkl9OyZJBgUHS8JgZqF1/6plddMD85yhfd48/ieAfg/7TnqvUmQIWKgtvJKDT2fTCqfRYtjzH6pApx8igtyyMtvAC+K3/QRCRazYHkD7fLbMm/GW7QsLqMqWs+FYy5hw9bNvPT8S+hpm0uGX8yfbr2D4ecNa67BatQ1NXDUmBPJcfy8/sxcWgnAmk4iHeeN99/i1vv+yIznXiDoC3Hx5SMoLi3mtRdeoVVOMVW1dRx/8clsb1rDwX2KsBPVpOI2BArZXu9QX52DYWzj4ot6MKCfh2XuQlM5dVUBVl0Qe+vaSwCLTYknKeW3DK6eUTwr3ACxZAFTpmxnx8YwpcV+xkzoSU7ODnzidab8zHhxDSuXNDDslPE8fMt9BHSPL777lLG33YQbMJlw7TUs/uZ7Rg8bRd+uvfBCO9VuAAAgAElEQVRJvOppVNXXcvhlJ+K3Td6Z8TqtCkuzYiyazYr1q5j62ix69+vHE08+Bk1Jpv55MsccOoS0o3Pbw/cw/e3H6dE/wCWXHoypbcVxw0STHXnkyb8R3emnRXmCMWM7kx+pQXOT2dKgZHqU5MOe3Yb/p8WzdwCWqpBiN0geVkTGUjhSc/Vk081l4YIQc1/YoUprR58U5KTTDCVn5PfCbK9swZRnVhCrbcGU26dx3pBj0Ujw168+4w+P3M2Omh0cPuBQTjj6N/Tt3ptIMIJpWWyv2sX511+MzzWZ9vAUOrVsh21niMajLFmzlI8/+4KvF35DSWk+d1//e8454lQ818cbf/+YcXeNxZe/i3Fj+1BWuhVNq8Nxy3nn3RR/+1udkkIcelEHBgxKY2q16I5QiqRvuJl0p+3ZbNW+B7AWy5YT3ZxmZdds1Uk2bpEFTWVKmfHMZtat8GOFkoy6qowunWvxq76lMpauMpj9wiba5/bjlcdn0basjDVb1lPvxhlx5SUU5hWwpWIrpmERCOVgBAJKMqkmVY34O8XBXEKGD9d2icaiSk64XWkH6hqqmDHjGUpCRXQp60xF5Q6GTriIdQ3LuGREOQd3dzG0XbhuhNVrIjw/Yz2pWAu6HVzHqMu74Auux0AoReEswIjMkmzP/9d6kzQpkwnA0qTVLC6qdJxNVbBPOw7bd5by1JNraGwI0badx2WXtaW0qB6XGI5Xxj/+0cT7b27l/JPGcNfEe5k2dRIjR43k/FEX89gjk4nF4ixfvopdtTXEEylcQ+PDBR9jORonHDYE0g4hK0CLFq3oflAPciP53HDT1bzy/PPMmD6L8eNv4rYHb2HOh89w3CktOOk3YXB3omthKmvaM2PmSnZuTRIyfVw7sYCSMg3drMWQFeSYaKq+3ayptaezGf+DCe+lLTqrGpfVsBA9DunCk0tiWJE3skl4hXy9EF57ZRtGOp+DunlcPLKESO4uNGFNpIqY+5daFi02efzPM3h35jQefeghzho+nDtu+QPHHX6sKlRkzz+N+ngjp4w7H79nMWvKc5TlFCt+lOSEbcfjvQWfcM+9v+f9l1/j2om/Y/iVVzJ64jB69Qlx3rmiy7EZXYvRlGzN1Om7WL1WJB0aufD8DhwyuA7DEDaHeM4pjObRAbobzKry7UWpw70EsGojzGKqOFW7NZnFqqVM4+FaHkm7iDdfa+Dbv3s4rk2fQQFGDI0Q8kt8DdV1LXn22Y3o6XaUBUt5a/Zcxt94PY1NUZ6a9CTFufmKFCPPXbtxA8dedqZ6uddmzGVg9z4Y0v6CQU20gdF3XoflOUx76FHOveJCdjaJs7SJ0Vd2oaikSjlNdU0+5r5ZxZIl0sVvctggh2Hn52BYDbiOga7I+CLMIjKH8jZ8WVU81b6yd669B/B/837llit5bzmnXT/JZEdmv7SBH1ekSLs++nd3OfuCDuQXV+LZAVYtyeHlWesIBTvy9btf891XXzDm5gl06t6FE4/7Da2LS6ipreWtee/ww/rlGJrBQV17cu4JZ1EcyaWyrpJ5n33MyjVrmHLXI/z2uN8w4IxBVMfWcuXwXvTo1YRtNtBY14K5r29jyfK02nz69rK4ZFhbcnwVONIluY9e+yDA2Qko2SyTq1iOTclC/vL6Tpb8kEFLF9CyfT3nXFhEm7Y+7EQLZj23kk1rM6z6+zpV7rvo2sv5btliHEe2f08l9eUMtnyiDq+RSTiENJ8SUEmLBJpf57CD+vHq488T8udRfmQnWnRvYOzozvhNmw2bPV5/tYId20ylN92zv8s55xVTlBvFtIUgLwTAffPaBwEWVqPwraSz3gGzEdsziEXb8+G7u/j71zaOGyc3P8PRx7Zm0CGdWPhtDR+8uYnPX/0HbYoKuWDMKMrataFH9x6sXrkSTI32ndqzbv1q1X7Ss3tP1i1bhd/no13XTizesILa9Zt5/cmXqKtPMvC8wRx+ZhFDDivkh28rmP9ZHdFGE9OIM+jQCKed1pqcSBWG1iTVQ8WV3levfRBgodk6aG5AMT2yY29E/DuHdDrE3xe6vPvGejKJMLru0K59mLycQlYsaWTGQ9M5un9/ho2+hLZtO/DovQ8S0IRQIAGLzc13/x7P0bjvzvsIajLLQZR8NK7+441UVKxm7hNzWbRkOUNvPZ92vQpJ18fZUVFPRvPhDyQ49dQiDh/sI2ylFF1HqLuqf0nbe+2h/2lh7XMAZ7nU4niJGJpUemSeka7KjRhNxO327NgW4O2/bGbzBk9J90vK0bFTDD/9Im6+5iZuufN2tm3ZyuvTXqR1XqHypjOOzfAbr1SUm2cfn6oIePLz7Y3VnH3FcArLC5j8x8eY/NQknv/gWTS/jh61sKw0LTt6nHt+R1q3ihOwdqE5NrorWtWS65YCxW4K7H+63f/7v9/3AHZ1RdERy5D0paeK+HIjheyeyDZza2HiqXy+/a6J+X/bTlOjSTqtEdRysAhi5YZpqKvj2kvHMvbCywgYJg1NDZw+5iJEiGnW08/TKlKiJIWf+8ts7ps6mXBhLkZTmnSqiXgorvjVrSIGxxzVmoGHFxMI7JTmVJVj/reWHKEmqUrUvnntgwDLVDKRC47jSX+t4m5I0kBKjCZBVzJPOkkMbCNCQ1Me33+dYOG3ddTtglTGxrOkoG6qjsCQEaC8RSvkZF+9a4PaWju26oDf0anatYuGTJSMT7oWAwTtNH4jg7/EYtARJRwzwCUv3IRLCl2yUoZQdTwMK0dxvaUEqku3o5O/b6K7p2ize/bd/rMGqRrEso1oFpkMrNlg8OPqFOvW1NPYICIrfuzmkTuKAiBxqRpZJ9u/hDspDCuFLwglkSBdOgv7IkSHjmkCAXGgpOlMEjKyo+y9WPaX3M99z4L/47vZDXDz1BXNUp6xJBlskfpHJ5MKUldrUlWpUV2ToL4uSixuk06ZioHhszRCQYO8fD+FxWGKi/0UFloEAqIpIbSeKLqWVB6ySjmqvMye7QL8j2/7Zz5g/wa4eeScJ9PKRPND1ZlFesHCVhPMdGw3o9Rglaq7EyL7WFkQHradwDBtxYuyRRpYOFnCABV1HKWltbu/uZki8jNv8t582n4I8O7bpegCinMtl3T1GbrIMolqv8Slsh3L2a0Y6uokN1Sn4O6JZlla7+42VCHbqW4MPXvWZ7szds8ulFfYd2Pd/2kB7YcA/1ep3uz4WDUoKztS8l+kfXfTY4Qb01zUUDnw7Pzg7NpofobMRFK86t0fYrUZVH1RPWTv1XR/yQ6wHwIsZ6GQBcSiBCwBItsMnmWIyM+aQd/dIK7mHIoZR5rBbeZCNdPGfoI5eyuzsxh2Fwl2C6gcsOBfstD+Pzx3N8DZMbDZK7uVZvuQd1t4VhvkXwdMSuku25ub7VHaDaZSrtRl5KxS0Pzpd6pm3dzI/n/Oi5b8q+tgaGnVjCVxp5xyIsBtSTJCDa4K4epJDCnwOw6Gz1YjcTSp+6pmaZlk4uC4ubhGDIOUioEldS9OjnKIhMiubntWUUfoMMriZEsWN1cAUHodIokQwPMcdFN0NqSjQsj3MtTKUtL70mGftoQwkKMGUAY0IbSLeEs6O9lMABYZfqESSUJD8bqzWzaiIivbuxrJJFRgOeNtMNJZ9qRRlz277YJs2VCPKrVZzZMdwFB/X44AM12MZqTImA04mg9T4mldGgRkBmMuhiVJ1SbV2J4dn/vLCHs/f4uWN+4JpGnVDmLrPhlAhGan8ImkqwFJx6eSAz7dVtRTkQpOuWEMw0TP6Fh6AkeXMmCBkjQQYrhhh3GthEok6Mr7FTEysVoz2yUhcxLks+nHdrMDMLI6FzIbSSiyMqI9gS65bDeMqzWBYePZ+ar2m9Yb0YxcNLcBn1oQokIrVdxENjWqmsEkHy6Zs2zdWjxzVxaobqPr6SxTU1Q/1DwJD8cOgRHNkhe83GYmRxOeE/6nGKkjE9JE008WmildEklsLQfTNhRfXDl4bp5KezrUqw4MyZApOZJfcP1sgIWwZhk+1UmXcsLUNJpoZhiNOnL8UXwBm6QdoLFJpyASxm8kSTT5SaTFWusJWC5+UVDX4zQmCvBcUcIxMLwgnuZTcggSk+YW1KEb1ehCGLcL8Py71FyGhvp8XC+CJqtfFOBdQ3nP0qAQCjfgM5vQnVw0X4MSQSPTlbqoiW6myAmlCRjVeGlpADOpT4bUEA6cYNZajfrsGWznKdBFyqFQ4VYLNKn2UtsN0tgYxJHFKYwUkRDWo2oRIdMeIlX4jRbUV8suJhYsu0k9eZFaZcnReDEpJ6SI70IdVgO2RHBN7UZxQvnVMn6r+e/9fIR/NsCywtX5lilixUqPaTM3kbFNLMvm9NPbcOgRQT77vIaPPqjhgvO6028AfPjuTj77TFZnEOw0Y8b0oT5WzSuvVGCn81SeV7SdZfeXHdNnwuirO9GuY70KcXQnQkp32bolyJTHNpNOBdTWKVaujkhHJpJqjLysAz37Vis9TN3fRNo2WLmoNdNfXEUwCNeM60SbFjux3DAx18/0F6pYvXy3dFKzOqxi5ntojklZkcENE9sRijTi2AkcN0AilccTT25i5zbZxW10O4Am7aC2oSaLD7ssnw6dinjk/lVEhYAiHGnT5bobysnEgkx9er0qg8rAajmKZPeXI0cGekmmbfhl7ejfK66s/pdcPxtgTbYSmZZtF1LXWMg779Xy3bd1HDKoA0cd66OspcPz07azekUThx1eypnDNCrWW3z8QYr1qxs46uhWDDnexfaaWLqkkHf+UkWkMMmgIyOYusWmVY1s21TDmHG9aNtR5ADr0F2TtLSOJvL57pswH76/DcPn0G9gKTl+i51bbX5cupWRl3ahd/9qJdfgGDEydh6vvqDx3Q+y7TZw5tlF/PZYR/X2pt0Snnl2Bzu3Z+g7sC2JDHz5WQX5hSEGDGrJmmWbcJIpJv6uHaEcGd8jzpyImkZYuNDHZx8m2VG7kUGDetK6rUtlRZLv/rGRUVeV0Km7xfffhPn8iy00NXoMOb4bhx3eQO0OH089vobOPbrSqq3H8iU1bN9eQ99D2hGywnz/5Y+MHN2R/r0bf3Fz2s8GWLhGUlvVsZRY56p1ucx4bhWDBrXnjHNMolGdSfetI5UOUlyS5NqbWqJpRTz/7A62batl/Pg+FJesxvSn2LmzGw/cvZqW7UKMuaEdhuuwfkWSdSu3c+yQVhQWNSm9KjmTbFc0n6Eh2pnHJi1BeseunjCQnFCUndvifPf1Vo48rIjyVnF0UarTNapq83nkvnXkFXQhkWogN6eRa69tT9CswXFymTuninjS5tzhPampM3n0/u9p2y6fcdf3Y947X1O5tZHLr+yM37cDn27hOC5pUxyzzjz79DZWra5j5BV96NYjya7NDgv+vpMjjsqlTVs/8WRbpj6znPq6BOOuHURRwWaqturMnrWe408dRLeDg7zy4kqWL4ky8sqBFBdZvDztb5x7QWu6dkv+4q6Inw+w5HnEAdRSavxNNNaNxx9aR9CfZsLNXVi5MqYsuOtB7Vm7aj0Tb+mDPxji4Qe+oUXrIKMv70TYqlZOUGVNC/5852ZalBdywYhysn50nOJiqcdGMWhS3vDukesZXwO1DeU8+tBWdD2XoRd1IZJTDY5HYWGQoK8Oq7ld1dYjfP53nbdfr+Lsob3ZVFHH4gUbGTuuK11kZ/BcmhpzcEXFJ9dg86YwT09eQ+u2QcZd1410aiteJkgkT5zsSiw7gqaZ2P4GUm4LZkyrZtVKmwtHdqNrdxnapRHQwbJ2odNIPNWKZ6Zupa4uxrgJHSgtjGLHfERTDlbEwjIsXn5hO0t/yDD8yg4c1DNFskanILcBQwUMv6wr4mcDrOigqvdGOE9pMpl2vPx8E0sXb+G2e49g/t+28uOiek4/tyevv/Qdp5x+EKUtinhmyucc+9swp5zcAkskAzWdnTWF3H/HOnQ9j3CkEs1xMQI2Y8e3prhEcsVJFaKIXKFIEGX8NdQ2tuPR+yuprw0TCtfgM1JYpseZ57amTy8PQ0viGClSXhmPT9pK7a4CrrqxJzt32rz6wnccdnguZ58nodM2DFfG54Dj5rFtexGTHlpIeZsgV0/oTci3E9uO41ppLC2BkSxGJ0jK2IWtlTN9aiUrVhQRjOwiGJKowuXwwyIcM0RTsoixRBnPTqmkoSnOuOvbUxyJqYXqmDKlRXS+Spn9wmaWLoKLrxTfYQd+O4DuSbn0X6Ugf95J/AsAtlXsK2GNhC7CS/rmywhzX1/DWRf34x+fbaE44nDRiC5MnbycvLI82rVvx0dvL+TKMW046OAYnluHq4fYWd2OB+9cT0FuhMFHhrKj7YwERxydj99fj6EnFbji0WoZDTcYp0Ys+MF1ZDIWgw8vIeQThwV69IGWJbVKBMUxIqxdl8dTk1aiewX485qUPIOTtAj6XW65oye5eSvw4rlqQXhaHuu3GDw+aSOt2/gZP6ETQb1OLTDbkJktKYx0icpx274qUnZLZj5dw7LVPjp09cgr0NXx0rOHj4EDRIAmRtotZsrju6itT3P1jW0py09guClcPYrjFZNK5/PSnE0sWmQzanRPevfeiuVIJUvCzl9eovzZAGezvsKdys4IEtmEii3FTJ68ki49urP6x7WcdXYHDjsiwluvVfPD4h2Ut+3Ejm1buemmcgoijaoLIKVH2VXTggfvrqBV61yuubE9GA24qSDRaoOCgmQWZKXrmMK0w2S0JLXRljw2+Ud8AYNx1/UiGKghlckh3mSRF6hVYYrwqt96XWPBNztp3z6PvFwLz/TYts1l29YGho9qz4ABdVhuElOXse8mW3fmMem+bbRu6+eaG4sI6lVgZ7v/RQJZt3PVrmNbUZKZ1syaVs3KtXWMvKwLPQ7S8IuGi9SbtUY8V9S9Snlyyjai0TRXje9IaV4c023C1SXhkk+GPGbO2srKH5NcPKInfXvvwi+UYaW7aanK1y+5fjbAasagzAWShjGZuq2lSbllPHDPWuqqC7GsesZdX055ucHyxUFmzlyBpkfo0DXN1WOL1U3VRX8Zj+2VLXngz8to16aQS67qgubbxYaVKd6cvYHzLmjLwMEZRePR9Bo8iXf1ILsqy3n6yR8xfTqjRvciN1JPXb2fKZOWc/yQIo492UdDUzGT7l+Lbtpcd8PhlOZWk9QCrF6fy/RnvqJjx1wuvaQ1ecGdylrSnp8NG/OZ8uhGdQaPnVBC0NqGT+YFy66iGtglTrcQfflUsj2zpm9hzdo0wy9uT79eUSK+RqXEI2kNx/BT2ZDPrJnbqamLcdW4g2hVFCNkRPEMse4IjclSXpqzgeVLo1wysh99ezcQMIVoL36INOftJYBFrFPI6ZKBct1ClZrMEGTu7BSLv3UpLk1w7U0tCAVsqiqLmTRpFdFGl5PPKeTE48F0BLQ8VqxyeOe9Oiq2OJiGTmGR0FDjOCmTVL3F2UNLOPSoJgxRfzXqsfUwO3bqzJ0TY+sGyYBaFBSlMIyk2jprKzP8dkgb+g7KY87La9i+JR/D18AxQwo56/QMSS3Cc8/X8ONS4Xd59OwRYuRF5YrVsWp1gjff3EHlTh9mIE237nDBBeXk5aQxtMbsIBEvQMbxkXFDvDBzB1s2pKlryqe0MMPxx/gYcowPTxaikUdTsoBnp25i2+bsGIGylh6XXtSR8jLhacsOkMOrr9azZLn0T/koK4ZTTizmkIEyGSYrWLr3UpWif6U3KSKc5xbiSK3VMFi3soQlC2KUlac55mgRCm3A04p5b141sajBoCMt2pWLpH9W43njRp2vv09jN9dyRXFWhL0lkSR01wGDDTp2aUBzhCedIW36qan2Mf/jGE5GuhPFsiUh0Nwx77j07BGkResc/v55JalURE3t7tjOZPBgybr5+Gh+A/V1lrK0SE6Ck04qxPK5VGzW+PrLGLYQAgybvIjHkCH5BGXmkrrh2QY5W+Y42LnM/6ieaINF0koqIZceXS36DXRwtWpcp4BkshUfvb+VZNKvBFcsM81Jx+ZTVJAAM0EyE+IfnxrsqJIJLeDTMvTt6aN7z+x4P5Um3VupSk/OXhFVkYS8k6dGujmSM7ZLFc3F9SfVbMaAFVVCKhlPOuqDGHodrlBiHBka5eBoJhmKcMy4+l7LFCiulMoiedKxVwdaU5YnLVlnI4GtgC3IypfoklGTHLAU90N4nq28V9dLk9GkUBBEd1NYej2uG1RiqMLNckU13pCSf1SR67NN2wJcOY4pZDob3fEwRd22mUCQPQuFJmuAE0Jzc3HSfjIhGeRRhpNJoPu2Y5quGmCpEVEVapn54CD8bBklLRm2bMuqI45UphRby8XRY0oH03RiSuJQjgE5Dn5p8/jPPoNdobPK9BRN+mEjeF62MO7TfThUkzJNgolO6MiomiZsccRcSYtYpGVRZEow3Ax6sFHNQRDFGUuU7NwAmEn1t6T8J1UhNViqeQ6gz5HwLEedcZ7eoKo5miO56wi2pK99KUlPqe4Ix0rgOcXo6Qg+axdJQ4Z3mPhkOLeTBM1Hxguqqo7E3p5Wg0shtuS3PWnmFpqPzCIsxDWzFqX+D1XwEGdKVwURSbHadmFzurERjSCGHcLQ6lW1LCNxsxdCd8OYzQ5dSprVDFHcacAx8nCsRvR0AJ8TJINIJgtTM44uFbNfcP1sgH/Ba/6PT3XUwCtpIc1keVRqVPrupzjomQJcM4Yr1R9dBnHI+FeROZSmchFAzcORGcRmFE+TbFY+dkaUdMRCJVMtNiGlSNnaLVwlIZHGU8Q98VxFPFVKkNlq2W7hcd2QodEeuhFUC1WSKjKnSSpgYqGSPHelWOAI81o8fmkWF79Aal17r/NhnwNYtlovE8YyAwhH0vEawRAulZi0hWnnKDKdY9TjKCW9CIYbwnCL1Hadpqa5ltugasV+rb2i2zhePWmtUcXHQp63KMW1/UpiMcUOLMtVZUipywr5zpUKlFQ8PAOfESKTdPEFfSScBjVL2NA9dCcMdghTzyftirVGJfjNLiHlEkiVSAD+ZZ7wLzGmfQ5gbD8lwZ50btufjJvix42fkPS2qNhTCuLt8o6kvOxgvl/1ChmzAs0JEvLl07v9BfjMQtbXfM6W7YsxTSkRlnJ4j5E4aY2djYtZVzdfSLWYTj79O5+LpbeiKbWJFZvfxJGz1i2gVXEvNDPNtsolWet18hjQ7SRqd9gUlERYsflTNWNJ+qIMpz29Op6N3wmwofIbdkUXgV92juzCUIu1mUHyS0D6Jc/d5wDW7TB9251BrDHErpptNLnLcAMV2bK+U8Lx3e7G8MpYumU6lYkP1dRtcZXKco6nTesBfLPiZTRzB57bhJ7swCmDb6G6tpYtVV9TkfoHupyBdjHH9rmGaH2EcE4jny+drEba4ZTRrmwQuplm3bbPMSwbL13EcX2vIJjpAlaK+YtmkrSWqBpwSeRoOhadRTJWhW1UsGLrX3H9u3CFpCAaHW4gC/aBBvCf1qhmB2hfeDgdWg8gbSdZtO6vJLwNSughP6cTA1tdTazJj+NbxIINL4AnXnSGkvDhlLfsw8I176AZNSq9aGTa8pv+1xJPxNlev5A1tR+juQksp4BDDx5BJlaEZ1SxaPWLeL44TrqILm0OUwX79du/VHGv5hZzZK+h7Fhn0+2gDsz/YTZJYwW2kyBk9ObQ7qPQHYe61AqWbHgX16pqnqgi6vL+Ax3+/3X7UfnmdC4+Mw+JBlN2JbpPRqWLaxTG75SRThoYoRrSWlV2OoqccelCrIBFzN6OoTkYZgbPjuD3OqtRr7a+i7RVjWU6uCmNkNGBdDKEJ2Nz/LvI2DJPIVcxL8Vzzbh1mIqO4ydkFZGKelhBYY1VYevVmCIxnynAdFthSBRg1pHWKtEsSYaoDmcV5mW36F8YzP6CPXqf26LVDdktZiqulYROuqQ8RNZBV7Gm5ZewI60oOiqs8lx8povjybg8H3ZGHCVhaEgyJV85ZSreRegwIpIipT9pebFU579YoylhdLMCX1aFT74XvQ03OyTLA9PnJ20LQV6oYDImRwg6Go5UhXQRMM6oUqKcvQKtUH2yXvTeo9zuewCr0OSnYVqKGaluoxJjUHGniKoIfylLRhemoywCob5ITBrIDrUS2QZpHhMyoAAk49YViU2+cRQBMDu4OculzoZQUuN20CX8aia8CR1PTVYTQp9qa5Gqlfw+e/YLQU9F3RIpyUxiJS4qoZ38bHc/03/yorN03590trPhWrazQgWKzU06/74T/Osz/t9Gnn3sPgfwL9iN9uOnZqFVMKv0XLZ/SrrfZCEJ2ErLWi2anz5nOyazgzT/u+sAwPvMstD/eUSo2FlkLpUkk2wNnpqlrKBXcXX2UokZdZRkCfv/dknLzQEL3lfQVZRKxZCxbUnFuhhKw1qOI+l01LGkqV0dQVkLFgUh5ReYwquW5wv4/5LWbFaSP2DBexXjbI+zpD7tjJy1Mo5AIxjwk0pLHt0lHM4hlUpi21m/I5VKYVkWPp9PiazGmpoUCVAWhBh7dpxC1mdQPskemV24V2/a/vPiqhdZNuKMQSadzY9nz1UJ86RZLhtiiQWbZnZkXiIex+f3K7FzATkWi2E7tvradcTZzObuZTdQOmEHAN57C0IVMyTMsk0MPUwm7ZKTk0ss1ogh9QnlROsYIv1v+YjH4yppE8mRGnd2hJBs6XYmowCWIo10XWQyEq55pFOpAwDvPXizzpFcmYyGpUuN24dl+YnHG/H5DexkRlmubM8CoDw+kUiQkxNR4ZyAL+eyWLXlk+GfDnl5uVRVVeMPGNkz+4AF7z2IVZwr0a5jYqdNAv6IslSZTG6aWYdLzlsBNRSSTiVoamoiNzdXedUSr8s2nAU9R1m4/K6mpob8/Hyi0egBgPcevLsjX7FgHcsI49g6Pp+faLRencHiVIVCYQWc3y9yxa46c/Py8hT4Ini+G+BwOKyAFoCrq6spKBltbK0AAAE+SURBVMgj2tR0AOC9C7CKZkmnPIKBPKKNYoF5JJJNKiwSjznrOacpLCxQIucCcjgcwrZdTOMnCxaAf7LgagoKcw9Y8N4HV85hDRnvZJoBEnEJgXxqloRsyZlMGsM0iMdi+AOBbKgkwZQlifNsatSxHXUeS8+149gEAgEFbE4koCz6wBm8l1EWgOVD+IoqIyVTYoRYb2cUcOJkiXesctXNeQwJi+Qx2WFe2cuQSWr/TH6IY5ZSC+EAwHsV4OYctCosSHJCMlLNvLDm4sp/l2bOcseEVrtb2yubxlQnuxRCVA3mgBe9l+HNtv/8y4i4ZpCbS5cqZ5EtNijoJC2tQMyCmh2L8NMEtX+tLolumDz2gAXvRYh/AuSnf2L3Nvxv/9ZP8pz/XAv/1bLV89SovN2Lo7nqdCAO3osI/y+89P8Dr4uRZYybDCwAAAAASUVORK5CYII="

/***/ }),

/***/ 45:
/*!******************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/logo2.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 69:
/*!******************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/logo3.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 70:
/*!******************************************************************************!*\
  !*** C:/Users/wilson/Desktop/每天必做JS巩固上传/uniapp-waimai/static/home/logo4.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map