//缓冲条样式
var KT_cl, KT_loadText, KT_loading, KT_cbox,title;
var lightLoader = function (c, cw, ch) { var _this = this; this.c = c; this.ctx = c.getContext("2d"); this.cw = cw; this.ch = ch; this.loaded = 0; this.loaderSpeed = 0.6; this.loaderHeight = 10; this.loaderWidth = 310; this.loader = { x: (this.cw / 2) - (this.loaderWidth / 2), y: (this.ch / 2) - (this.loaderHeight / 2) }; this.particles = []; this.particleLift = 180; this.hueStart = 0; this.hueEnd = 120; this.hue = 0; this.gravity = 0.15; this.particleRate = 4; this.init = function () { this.loop() }; this.rand = function (rMi, rMa) { return ~~((Math.random() * (rMa - rMi + 1)) + rMi) }; this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) { return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1) }; this.updateLoader = function () { if (this.loaded < 100) { this.loaded = this.loaderSpeed } else { } }; this.renderLoader = function () { this.ctx.fillStyle = "#000"; this.ctx.fillRect(this.loader.x, this.loader.y, this.loaderWidth, this.loaderHeight); this.hue = this.hueStart + (this.loaded / 100) * (this.hueEnd - this.hueStart); var newWidth = (this.loaded / 100) * this.loaderWidth; this.ctx.fillStyle = "hsla(" + this.hue + ", 100%, 40%, 1)"; this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight); this.ctx.fillStyle = "#222"; this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight / 2) }; this.Particle = function () { this.x = _this.loader.x + ((_this.loaded / 100) * _this.loaderWidth) - _this.rand(0, 1); this.y = _this.ch / 2 + _this.rand(0, _this.loaderHeight) - _this.loaderHeight / 2; this.vx = (_this.rand(0, 4) - 2) / 100; this.vy = (_this.rand(0, _this.particleLift) - _this.particleLift * 2) / 100; this.width = _this.rand(1, 4) / 2; this.height = _this.rand(1, 4) / 2; this.hue = _this.hue }; this.Particle.prototype.update = function (i) { this.vx += (_this.rand(0, 6) - 3) / 100; this.vy += _this.gravity; this.x += this.vx; this.y += this.vy; if (this.y > _this.ch) { _this.particles.splice(i, 1) } }; this.Particle.prototype.render = function () { _this.ctx.fillStyle = "hsla(" + this.hue + ", 100%, " + _this.rand(50, 70) + "%, " + _this.rand(20, 100) / 100 + ")"; _this.ctx.fillRect(this.x, this.y, this.width, this.height) }; this.createParticles = function () { var i = this.particleRate; while (i--) { this.particles.push(new this.Particle()) } }; this.updateParticles = function () { var i = this.particles.length; while (i--) { var p = this.particles[i]; p.update(i) } }; this.renderParticles = function () { var i = this.particles.length; while (i--) { var p = this.particles[i]; p.render() } }; this.clearCanvas = function () { this.ctx.globalCompositeOperation = "source-over"; this.ctx.clearRect(0, 0, this.cw, this.ch); this.ctx.globalCompositeOperation = "lighter" }; this.loop = function () { var loopIt = function () { requestAnimationFrame(loopIt, _this.c); _this.clearCanvas(); _this.createParticles(); _this.updateLoader(); _this.updateParticles(); _this.renderLoader(); _this.renderParticles() }; loopIt() } }; var isCanvasSupported = function () { var elem = document.createElement("canvas"); return !!(elem.getContext && elem.getContext("2d")) };
var setupRAF = function () { var lastTime = 0; var vendors = ["ms", "moz", "webkit", "o"]; for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) { window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"]; window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"] } if (!window.requestAnimationFrame) { window.requestAnimationFrame = function (callback, element) { var currTime = new Date().getTime(); var timeToCall = Math.max(0, 16 - (currTime - lastTime)); var id = window.setTimeout(function () { callback(currTime + timeToCall) }, timeToCall); lastTime = currTime + timeToCall; return id } } if (!window.cancelAnimationFrame) { window.cancelAnimationFrame = function (id) { clearTimeout(id) } } };


/**
 * 创建进度条 DOM 元素
 * @date 2023-02-28
 */
function create() {
    //背景底纹
    KT_loading = document.createElement('div');
    KT_loading.style.background = '#222 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAFVBMVEUqKiopKSkoKCgjIyMuLi4kJCQtLS0dJckpAAAAO0lEQVR42iXLAQoAUQhCQSvr/kfe910jHIikElsl5qVFa1iE5f0Pom/CNZdbNM6756lQ41NInMfuFPgAHVEAlGk4lvIAAAAASUVORK5CYII=")';
    KT_loading.style.position = "absolute";
    KT_loading.style.width = "100%";
    KT_loading.style.height = "100%";
    KT_loading.style.zIndex = "2";
    KT_loading.style.display = "block";
    KT_loading.style.top = "0px";
    KT_loading.style.left = "0px";
    document.body.appendChild(KT_loading);

    // title = document.createElement('p')
    // title.innerHTML = '数智商业数字孪生系统'
    // title.className = 'm-title-text'
    // document.body.appendChild(title);

    //进度文字
    KT_loadText = document.createElement('div');
    KT_loadText.style.zIndex = "100000";
    KT_loadText.style.position = "absolute";
    KT_loadText.style.width = "40px";
    KT_loadText.style.height = "20px";
    KT_loadText.style.top = "50%";
    KT_loadText.style.marginTop = "-30px";
    KT_loadText.style.left = "50%";
    KT_loadText.style.marginLeft = "-20px";
    KT_loadText.style.color = "#ff0000";
    KT_loadText.style.fontSize = "14px";
    KT_loadText.style.textAlign = "center";
    KT_loadText.innerHTML = "0%";
    KT_loading.appendChild(KT_loadText);

    //进度条
    KT_cbox = document.createElement('canvas');
    KT_cbox.style.position = "absolute";
    KT_cbox.style.width = "400px";
    KT_cbox.style.height = "150px";
    KT_cbox.style.zIndex = "99";
    KT_cbox.style.top = "50%";
    KT_cbox.style.marginTop = "-75px";
    KT_cbox.style.left = "50%";
    KT_cbox.style.marginLeft = "-230px";
    KT_loading.appendChild(KT_cbox);
    KT_cl = new lightLoader(KT_cbox, 400, 150);
}

let a = null 

/**
 * 进度条更新
 * @date 2023-02-28
 * @param {number} percentComplete // 进度值
 */
function update(percentComplete) {
    if(a === percentComplete) return
    KT_loadText.innerHTML = Math.round(percentComplete) + '%'; 
    a = percentComplete
    KT_cl.loaderSpeed = Math.round(percentComplete) * 0.85;                              //进度条
    KT_loadText.style.color = 'hsla(' + Math.round(percentComplete) + ', 100%, 40%, 1)';   //进度文字颜色
    if (percentComplete >= 100) remove()
}


/**
 * 删除进度条 DOM 元素
 * @date 2023-02-28
 */
function remove() {
    document.body.removeChild(KT_loading)
}

export default {
    // 初始化进度条
    init: () => {
        create()
        setupRAF()
        KT_cl.init()
    },
    update,
    remove,
}