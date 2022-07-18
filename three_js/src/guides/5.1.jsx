import { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

export default function FIVEdotONE() {

  useEffect(() => {
    const canvas = document.getElementById('c')
    const renderer = new THREE.WebGLRenderer({ canvas })
    const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 10)
    camera.position.set(0, -1.1, 0)
    const controls = new OrbitControls(camera, canvas)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('white')
    const objLoader = new GLTFLoader()
    objLoader.load('sphere.glb', model => {
      model.scene.traverse( child => {
        if (child.isMesh) {
          const wireframe = new THREE.LineSegments(
            new THREE.WireframeGeometry(child.geometry),
            new THREE.LineBasicMaterial({ color: 'black' })
          )
          child.add(wireframe)
          child.parent.attach(wireframe)
          child.parent.remove(child)
        }
      })
      scene.add(model.scene)

      const bsphere = new THREE.Sphere()
      new THREE.Box3().setFromObject(model.scene).getBoundingSphere(bsphere)
      controls.target = bsphere.center
      camera.position.y = this.camera.position.z = bsphere.radius * 1.5
      camera.far = bsphere.radius * 10
      controls.update()
      })

     const resizeRendererToDisplaySize = renderer => {
      const canvas = renderer.domElement
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const needResize = canvas.width !== width || canvas.height !== height
      if (needResize) renderer.setSize(width, height, false)
      return needResize
    }

    const render = () => {
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
      renderer.render(scene, camera)
      console.info(camera.position)
      requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
  })

  return (
    <canvas id="c" style={ {
      width: '100%',
      height: '100%',
      display: 'block'
    } }/>
  )
}