import { useEffect } from "react"
import {
  Color,
  DoubleSide,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  LineBasicMaterial,
  LineSegments,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  Shape,
  ExtrudeGeometry,
  IcosahedronGeometry,
  Vector2,
  LatheGeometry,
  OctahedronGeometry,
  DirectionalLight,
  PlaneGeometry,
  PolyhedronGeometry,
  RingGeometry,
  SphereGeometry,
  TetrahedronGeometry,
  Object3D,
  TorusGeometry,
  TorusKnotGeometry,
  Curve,
  Vector3,
  TubeGeometry, EdgesGeometry, WireframeGeometry, ShapeGeometry,
} from "three"
import { randomColor } from "../support"

import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry"
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

export default function TWOdotONE() {

  const klein = (v, u, target) => {
    u *= Math.PI
    v *= 2 * Math.PI
    u = u * 2
    let x
    let z
    if (u < Math.PI) {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
      z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
    } else {
      x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
      z = -8 * Math.sin(u)
    }
    const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
    target.set(x, y, z).multiplyScalar(0.75);
  }

  useEffect(() => {
    const canvas = document.getElementById("c")
    const renderer = new WebGLRenderer({ canvas })
    const camera = new PerspectiveCamera(50, 2, 0.1, 1000)
    camera.position.z = 120
    const scene = new Scene()
    scene.background = new Color(0xAAAAAA)
    const light = new DirectionalLight(0xFFFFFF, 1)
    light.position.set(-1, 2, 4)
    scene.add(light)

    const objects = []
    const spread = 15

    const addObject = (x, y, obj) => {
      obj.position.x = x * spread
      obj.position.y = y * spread
      objects.push(obj)
      scene.add(obj)
    }

    const createMaterial = () =>
      new MeshPhongMaterial({ side: DoubleSide, color: randomColor() })

    const addSolidGeometry = (x, y, geometry) =>
      addObject(x, y, new Mesh(geometry, createMaterial()))

    const addLineGeometry = (x, y, geometry) =>
      addObject(x, y, new LineSegments(geometry, new LineBasicMaterial({ color: 0x000000 })))

    const resizeRendererToDisplay = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const needResize = canvas.width !== w || canvas.height !== h
      if (needResize) renderer.setSize(w, h, false)
      return needResize
    }

    const render = time => {
      time *= 0.001
      objects.forEach( (it, i) => {
        it.rotation.x = time + i
        it.rotation.y = time + i
      })
      if (resizeRendererToDisplay(renderer)) {
        renderer.setPixelRatio(window.devicePixelRatio)
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      }
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    };

    addSolidGeometry(-2, 2, new BoxGeometry(8, 8, 8))
    addSolidGeometry(-1, 2, new CircleGeometry(7, 24))
    addSolidGeometry(0, 2, new ConeGeometry(6, 8, 16))
    addSolidGeometry(1, 2, new CylinderGeometry(4, 4, 8, 12))
    addSolidGeometry(2, 2, new DodecahedronGeometry(7))

    const shape = new Shape()
    const x = -2.5
    const y = -5
    shape.moveTo(x + 2.5, y + 2.5)
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
    addSolidGeometry(-2, 1, new ExtrudeGeometry(shape, { steps: 2, depth: 2, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 2 }))

    addSolidGeometry(-1, 1, new IcosahedronGeometry(7))
    addSolidGeometry(0, 1, new LatheGeometry(Array
      .from(Array(10).keys())
      .map( it => new Vector2(Math.sin(it * 0.2) * 3 + 3, (it - 5) * .8) ))
    )
    addSolidGeometry(1, 1, new OctahedronGeometry(7))
    addSolidGeometry(2, 1, new ParametricGeometry(klein, 25, 25))
    addSolidGeometry(-2, 0, new PlaneGeometry(9, 9, 2, 2))

    const verticesOfCube = [
      -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
      -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
    ]
    const indicesOfFaces = [
      2, 1, 0,    0, 3, 2,
      0, 4, 7,    7, 3, 0,
      0, 1, 5,    5, 4, 0,
      1, 2, 6,    6, 5, 1,
      2, 3, 7,    7, 6, 2,
      4, 5, 6,    6, 7, 4,
    ]
    addSolidGeometry(-1, 0, new PolyhedronGeometry(verticesOfCube, indicesOfFaces, 7, 2))
    addSolidGeometry(0, 0, new RingGeometry(2, 7, 18))

    const heart = new Shape()
    heart.moveTo(x + 2.5, y + 2.5)
    heart.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
    heart.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
    heart.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
    heart.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
    heart.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
    heart.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
    addSolidGeometry(1, 0, new ShapeGeometry(heart))


    addSolidGeometry(2, 0, new SphereGeometry(7, 12, 8))
    addSolidGeometry(-2, -1, new TetrahedronGeometry(7))

    const doit = async () => {
      const loader = new FontLoader()
      const loadFont = async (url) => new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject))
      const font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json')
      const geometry = new TextGeometry('three.js', {
        font: font,
        size: 3.0,
        height: .2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: .3,
        bevelSegments: 5,
      })
      const mesh = new Mesh(geometry, createMaterial())
      geometry.computeBoundingBox()
      geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1)
      const parent = new Object3D()
      parent.add(mesh)
      addObject(-1, -1, parent)
    }
    doit()

    addSolidGeometry(0, -1, new TorusGeometry(5, 2, 8, 24))
    addSolidGeometry(1, -1, new TorusKnotGeometry(3.5, 1.5, 8, 64, 2, 3))

    class CustomSinCurve extends Curve {
      constructor(scale) {
        super()
        this.scale = scale
      }
      getPoint(t) {
        const tx = t * 3 - 1.5
        const ty = Math.sin(2 * Math.PI * t)
        const tz = 0
        return new Vector3(tx, ty, tz).multiplyScalar(this.scale)
      }
    }
    addSolidGeometry(2, -1, new TubeGeometry(new CustomSinCurve(4), 20, 1, 8, false))

    addLineGeometry(-1, -2, new EdgesGeometry(new BoxGeometry(8, 8, 8), 15))
    addLineGeometry(1, -2, new WireframeGeometry(new BoxGeometry(8, 8, 8)))


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