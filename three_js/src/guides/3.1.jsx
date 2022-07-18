import { useEffect } from "react"
import {
  WebGLRenderer, PerspectiveCamera, Scene,
  BoxGeometry, Mesh, DirectionalLight,
  MeshPhongMaterial
} from "three"
import { ColorGUIController, randomColor } from "../support"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import GUI from "lil-gui"

export default function THREEdotTWO() {

  useEffect(() => {
    const canvas = document.getElementById("c")
    const renderer = new WebGLRenderer({ canvas })
    let renderRequested = false

    const render = () => {
      renderRequested = false
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const needResize = canvas.width !== w || canvas.height !== h
      if (needResize) {
        renderer.setSize(w, h, false)
        renderer.setPixelRatio(window.devicePixelRatio)
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
      controls.update()
      renderer.render(scene, camera)
    }

    const requestRender = () => {
      if (!renderRequested) {
        renderRequested = true
        requestAnimationFrame(render)
      }
    }

    const camera = new PerspectiveCamera(75, 2, 0.1, 5)
    camera.position.z = 2.5
    const scene = new Scene()
    const light = new DirectionalLight(0xFFFFFF, 1)
    light.position.set(-1, 2, 4);
    scene.add(light)
    const cube = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshPhongMaterial({ color: randomColor() })
    )
    scene.add(cube)
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0, 0)
    controls.enableDamping = true
    controls.addEventListener('change', requestRender)
    window.addEventListener('resize', requestRender)
    const gui = new GUI()
    gui.addColor(new ColorGUIController(cube.material, 'color'), 'value').name('color').onChange(requestRender)
    gui.add(cube.scale, 'x', .1).name('scale x').onChange(requestRender)

    render()
  })

  return (
    <canvas id="c" style={ {
      width: '100%',
      height: '100%',
      display: 'block'
    } }/>
  )
}