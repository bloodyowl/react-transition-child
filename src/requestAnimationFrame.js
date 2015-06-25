const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  ((callback) => window.setTimeout(callback, 1000 / 60))

export default (cb) => {
  return requestAnimationFrame.call(window, cb)
}
