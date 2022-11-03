/**
 * 创建地球
 */
function createEarth(scene){
    var loader = new Bol3D.TextureLoader()
    var group = new Bol3D.Group() 
  
    //创建本体
    var geometry = new Bol3D.SphereGeometry(2000,3000,3000)
    var earthMaterial = new Bol3D.MeshStandardMaterial({ 
      map: loader.load( '/assets/png/earth/Map.png'),
      specularMap: loader.load('/assets/png/earth/specular.png'),
      normalMap:  loader.load('/assets/png/earth/normal.png'),
      normalScale: new Bol3D.Vector2(3, 3),
      transparent: false,
      depthWrite: true,
      roughness: 0.6,
      metalness: 0.4
    })
    var sphere = new Bol3D.Mesh(geometry, earthMaterial)
    group.add(sphere)

    //创建流动的大气
    //顶点着色器
    var VSHADER_SOURCE = `
    varying vec2 vUv;
    void main () {
        vUv = uv;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );
    }
    `

    //片元着色器
    var FSHADER_SOURCE = `
    uniform float time;
    uniform sampler2D map;
    uniform sampler2D nTexture;
    varying vec2 vUv;
    void main () {
    vec2 newUv= vUv + vec2( 0, 0.02 ) * time;
    vec4 noiseRGBA = texture2D( nTexture, newUv );
    newUv.x += noiseRGBA.r * 0.2;
    newUv.y += noiseRGBA.g * 0.2;
    gl_FragColor = texture2D( map, newUv );
    }
    `

    // var flowTexture = loader.load('./static/img/flow.png')
    var flowTexture = loader.load('')
    flowTexture.wrapS = Bol3D.RepeatWrapping
    flowTexture.wrapT = Bol3D.RepeatWrapping

    var noiseTexture = loader.load('/assets/png/earth/noise.png')
    noiseTexture.wrapS = Bol3D.RepeatWrapping
    noiseTexture.wrapT = Bol3D.RepeatWrapping

    //着色器材质
    var flowMaterial = new Bol3D.ShaderMaterial({
    uniforms: {
        map: {
        value: flowTexture,
        },
        nTexture: {
        value: noiseTexture,
        },
        time: {
        value: 0.0
        },
    },
    // 顶点着色器
    vertexShader: VSHADER_SOURCE,
    // 片元着色器
    fragmentShader: FSHADER_SOURCE,
    transparent: true,
    })
    var fgeometry = new Bol3D.SphereGeometry(2000.01,3000,3000)
    var fsphere = new Bol3D.Mesh(fgeometry, flowMaterial)
    group.add(fsphere)

    //创建光环
    var ringMaterial = new Bol3D.SpriteMaterial( { 
        map: loader.load('/assets/png/earth/Halo.png')
    })
    var sprite = new Bol3D.Sprite( ringMaterial )
    sprite.scale.set(50000,50000, 1)
    // scene.add(sprite)
    scene.add(group)

    console.log('group====>',group)
    group.position.x = -23532.579972634845
    group.position.y = 6554.1379584932165
    group.position.z = 31453.287221261424

    return {group,flowMaterial}
}

export { createEarth }