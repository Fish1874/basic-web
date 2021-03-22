const $ = function (val, type = 'single') {
  if (type === 'single') return document.querySelector(val)
  return document.querySelectorAll(val)
}
function addEvent(elem, event, func) {
  if (elem.addEventListener) {
    elem.addEventListener(event, func)
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + event, func)
  }
  else {
    elem['on' + event] = func
  }
}

