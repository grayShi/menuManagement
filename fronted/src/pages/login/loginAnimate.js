import * as THREE from 'three'

const SEPARATION = 80
const AMOUNTX = 60
const AMOUNTY = 60

let container
let camera
let scene
let renderer

let particles
let particle
let count = 0

let mouseX = 0 - window.innerWidth / 2
const mouseY = 0 - window.innerHeight / 2 // 需要响应时间时, 默认为0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

export const init = () => {
  container = document.createElement('div')

  // container.style.position = 'absolute'
  // container.style.top = 0
  // container.style.left = 0

  document.getElementById('loginBody').appendChild(container)

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )
  camera.position.z = 1000

  scene = new THREE.Scene()

  particles = []

  const spriteMap = new THREE.TextureLoader().load('/login_point.png')

  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
    color: 0xffffff
  })

  let i = 0

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particles[i] = new THREE.Sprite(spriteMaterial)
      particle = particles[i]
      i += 1
      particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
      particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
      scene.add(particle)
    }
  }

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  // renderer.setClearColor('rgb(135,206,250)', 1.0)

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  // document.addEventListener('touchstart', onDocumentTouchStart, false)
  // document.addEventListener('touchmove', onDocumentTouchMove, false)

  window.addEventListener('resize', onWindowResize, false)
}

export const destroy = () => {
  document.removeEventListener('mousemove', onDocumentMouseMove)
  // document.removeEventListener('touchstart', onDocumentTouchStart)
  // document.removeEventListener('touchmove', onDocumentTouchMove)

  window.removeEventListener('resize', onWindowResize)
}

const onWindowResize = () => {
  // windowHalfX = window.innerWidth / 2
  // windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

//

const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX
  // mouseY = event.clientY - windowHalfY
}

// const onDocumentTouchStart = (event) => {
//   if (event.touches.length === 1) {
//     event.preventDefault()

//     mouseX = event.touches[0].pageX - windowHalfX
//     mouseY = event.touches[0].pageY - windowHalfY
//   }
// }

// const onDocumentTouchMove = (event) => {
//   if (event.touches.length === 1) {
//     event.preventDefault()

//     mouseX = event.touches[0].pageX - windowHalfX
//     mouseY = event.touches[0].pageY - windowHalfY
//   }
// }

//
export const animate = () => {
  requestAnimationFrame(animate)

  render()
}

export const render = () => {
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)

  let i = 0

  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i]
      i += 1
      particle.position.y =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
      const length =
        (Math.sin((ix + count) * 0.3) + 1) * 2 +
        (Math.sin((iy + count) * 0.5) + 1) * 2
      particle.scale.x = length
      particle.scale.y = length
    }
  }

  renderer.render(scene, camera)

  count += 0.1
}
