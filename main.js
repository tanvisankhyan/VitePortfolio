import * as THREE from "three"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"
//SCENE
const scene= new THREE.Scene()
const geometry = new THREE.SphereGeometry( 0.5, 50, 50 )
const material = new THREE.MeshStandardMaterial( { 
  color: "rgb(45, 91, 143)",
  roughness: 0.2,
 } )
 const mesh= new THREE.Mesh(geometry, material)
 scene.add(mesh)

 // LIGHTS
 const light = new THREE.PointLight(0xffffff,1 ,100)
 light.position.set(10,10,10)
 scene.add(light)
 //SIZES
 const sizes={
  width: window.innerWidth,
  height:window.innerHeight,

 }

 //CAMERA
 const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1,100)
 camera.position.z=10
 scene.add(camera)

 //RENDER
 const canvas= document.querySelector(".webgl");
 const renderer = new THREE.WebGLRenderer({ canvas })
 renderer.setSize(sizes.width, sizes.height)
 renderer.setPixelRatio(2)
 renderer.render(scene, camera)

 //CONTROLS
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 controls.enablePan = false
 controls.enableZoom=false
 controls.autoRotate = true
 controls.autoRotateSpeed = 5

//Resize
window.addEventListener("resize", () => {
  sizes.width= window.innerWidth
  sizes.height= window.innerHeight
//update 

camera.aspect= sizes.width/ sizes.height;
camera.updateProjectionMatrix()
renderer.setSize(sizes.width, sizes.height)

})
const loop = () => {
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)

}

loop()

const tl= gsap.timeline({ defaults: {duration: 1}})
tl.fromTo(mesh.scale, {z:0, x:0,y:0}, {z:1, x:1,y:1})
tl.fromTo('nav', {y:"-60%"}, {y:"0%"})
tl.fromTo(".title", {opacity:0}, {opacity:1})
//Mouse ANIMtion color
let mouseDown= false
let rgb = [12,23,55]
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))
window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150,
    ]
      
//Lets animate
    let newColor = new THREE.Color('rgb(${rgb.join(",")})')
    gsap.to(mesh.material.color, {
      r:newColor.r, 
      g:newColor.g, 
      b:newColor.b
})
} 
})
