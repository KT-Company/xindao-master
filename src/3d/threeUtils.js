import { CACHE } from '@/3d/CACHE'

/** 模型聚焦
 * @param  {array}   point      // 点坐标
 * @param  {array}   look       // 视角坐标
 * @param  {number}  times      // 聚焦动画时间 默认 1000 毫秒
 * @param  {funtion} doit       // 方法
*/
export function focus(point, look, times = 1000, doit) {
  new Bol3D.TWEEN.Tween(CACHE.container.orbitCamera)
    .to({
      position: new Bol3D.Vector3(...look)
    }, times)
    .start();
  new Bol3D.TWEEN.Tween(CACHE.container.orbitControls)
    .to({
      target: new Bol3D.Vector3(...point)
    }, times)
    .start()
    .onComplete(function () {
      doit?.()
    });
}

/** 切换模型
 * @param  {array | string}   names   // 要显示的模型名字（除此模型以外都隐藏或显示）
 * @param  {boolean}          isShow // true 显示模型，false 隐藏模型，（默认隐藏）
*/
export function toggleModel(names, isShow = true) {
  names = Array.isArray(names) ? names : [names]
  CACHE.models.forEach(model => {
    if (names.includes(model.name)) model.visible = isShow
    else model.visible = !isShow
  })
}

/** 显示隐藏模型
 *  @param  {string | array}     names   // 要显示的模型名字
 *  @param  {boolean}            isShow  // true 显示模型，false 隐藏模型，（默认隐藏）
*/
export function showModel(names, isShow = true) {
  names = Array.isArray(names) ? names : [names]
  names.forEach(name => CACHE.models[name].visible = isShow)
}

// 获取 visible 为 true 的模型
export function getShowModel() {
  return CACHE.models.filter(item => item.visible)
}

// 获取 visible 为 false 的模型
export function getHideModel() {
  return CACHE.models.filter(item => !item.visible)
}

/** 设置透明度
 * @param  {any}       meshs      // mesh 的类型数组
 * @param  {number}    num        // 透明度 0~1
 * @param  {boolean}   isShow     // 可选：true 透明，false 不透明，（默认透明）
*/
export function setOpacity(meshs, num, isTran = true) {
  getMesh(meshs).forEach(mesh => {
    mesh.material.transparent = isTran;
    mesh.material.opacity = num
  })
}

// 还原模型初始化的透明度（加载时需手动在 userData 添加 _transparent）
export function reductionOpacity(meshs) {
  getMesh(meshs).forEach(mesh => {
    mesh.material.transparent = mesh.userData._transparent
    mesh.material.opacity = mesh.userData._opacity
  })
}

/** 设置颜色
 * @param  { any }   meshs   // 要查找的元素
 * @param  {color}   color   // 颜色 16 进制
*/
export function setColor(meshs, color) {
  getMesh(meshs).forEach(item => item.material.color.set(color))
}

// 还原模型初始化的颜色（加载时需手动在 userData 添加 _color）
export function reductionColor(meshs, color) {
  getMesh(meshs).forEach(item => item.material.color.set(item.userData._color))
}


/**
 * 查找 mesh 元素
 * @date 2023-01-16
 * @param {any} data // 要查找的元素
 * @returns {array} // 返回查找结果
 */
export function getMesh(data) {
  const meshList = []
  function _getMesh(list) {
    list.forEach(a => {
      if (a.isMesh) meshList.push(a)
      else {
        a.children?.forEach(a => _getMesh([a]))
      }
    })
  }
  data = Array.isArray(data) ? data : [data]
  _getMesh(data)
  return meshList
}

/**
 * 创建镜面物体
 * @date 2023-01-16
 * @param {any}   option          // 配置
 * @param {array} [option.size]   // 镜面大小
 * @param {any}   [option.color]  // 镜面颜色
 * @returns {any} 镜面物体
 */
export const createMirror = (option) => {
  const size = option?.size || [10000, 10000]
  const color = option?.color || 0xffffff
  const geometry = new Bol3D.PlaneGeometry(...size);
  const verticalMirror = new Bol3D.Reflector(geometry, {
    clipBias: 0.0003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color
  });
  verticalMirror.material.transparent = false
  return verticalMirror
}
