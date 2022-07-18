import { useEffect } from "react"
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  Mesh,
  DirectionalLight,
  MeshPhongMaterial
} from "three"

export default function ONEdotONE() {

  useEffect(() => {
    const canvas = document.getElementById("c")
    const renderer = new WebGLRenderer({ canvas })
    const camera = new PerspectiveCamera(75, 2, 0.1, 5)
    camera.position.z = 2.5
    const scene = new Scene()
    const geometry = new BoxGeometry(1, 1, 1)

    const cubeFactory = (x, color = "#" + ((1<<24)*Math.random() | 0).toString(16)) => {
      const material = new MeshPhongMaterial({ color: color })
      const cube = new Mesh(geometry, material)
      cube.position.x = x
      return cube
    }
    const cubes = [0, -2, 2].map( it => cubeFactory(it) )
    cubes.forEach( it => scene.add(it) )
    const light = new DirectionalLight(0xFFFFFF, 1)
    light.position.set(-1, 2, 4);
    scene.add(light)

    const render = time => {
      time *= 0.001
      cubes.forEach( (it, i) => {
        it.rotation.x = time + i
        it.rotation.y = time + i
      })
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }

    render()
  })

  return (
    <canvas id="c"/>
  )
}