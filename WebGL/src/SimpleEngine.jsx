import React, { useEffect, useState } from 'react'

export default () => {
  const [near, setNear] = useState(-1)
  const [far, setFar] = useState(3)

  const [eyeX, setEyeX] = useState(.2)
  const [eyeY, setEyeY] = useState(.25)
  const [rotate, setRotate] = useState([0, 0, 0, 1])
  const [scale, setScale] = useState([1, 1, 1])

  const [vShaderCode, setVShaderCode] = useState('')
  const [fShaderCode, setFShaderCode] = useState('')

  const [renderModes, setRenderModes] = useState([])
  const [renderMode, setRenderMode] = useState(undefined) // gl.TRIANGLES but before gl isn't initialized
  const [lastPressedKey, setLastPressedKey] = useState('')

  let gl

  const VERTICES = new Float32Array([
    .0,  .5, -.4,   .4, 1, .4, // Дальний зеленый треугольник
    -.5, -.5, -.4,   .4, 1, .4,
    .5, -.5, -.4,   1, .4, .4,

    .5,  .4, -.2,   1, .4, .4, // Желтый треугольник в середине
    -.5,  .4, -.2,   1,  1, .4,
    0, -.6, -.2,   1,  1, .4,

    0,  .5,   0,  .4, .4,  1, // Ближний синий треугольник
    -.5, -.5,   0,  .4, .4,  1,
    .5, -.5,   0,   1, .4, .4
  ])
  const VERTICES_COUNT = 9
  const FSIZE = VERTICES.BYTES_PER_ELEMENT

  const viewMatrix = new window["Matrix4"]()
  let u_ProjMatrix
  const modelMatrix = new window["Matrix4"]()
  const projMatrix = viewMatrix.multiply(modelMatrix)

  const shiftActions = {
    '+': () => setScale(prev => prev.map(it => it + .05)),
    'ArrowLeft': () => setScale( prev => prev.map( it => it + .05 ) ),
    'ArrowRight': () => setNear(prev => prev - 0.05),
    'ArrowUp': () => setFar(prev => prev + 0.05),
    'ArrowDown': () => setFar(prev => prev - 0.05)
  }
  const action = {
    '-': () => setScale( prev => prev.map( it => it - .05 ) ),
    'q': () => setRotate(prev => [prev[0] + 10, 0, 0, 1]),
    'e': () => setRotate(prev => [prev[0] - 10, 0, 0, 1]),
    'w': () => setRotate(prev => [prev[0] + 10, 1, 0, 0]),
    's': () => setRotate(prev => [prev[0] - 10, 1, 0, 0]),
    'a': () => setRotate(prev => [prev[0] + 10, 0, 1, 0]),
    'd': () => setRotate(prev => [prev[0] - 10, 0, 1, 0]),
    'ArrowLeft': () => setEyeX(prev => prev + .05),
    'ArrowRight': () => setEyeX(prev => prev - .05),
    'ArrowUp': () => setEyeY(prev => prev + .05),
    'ArrowDown': () => setEyeY(prev => prev - .05)
  }

  const create = () => {
    window["initShaders"](gl, vShaderCode, fShaderCode)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
      gl.enableVertexAttribArray(a_Position)
      const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
      gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
      gl.enableVertexAttribArray(a_Color)
      u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix')
    }

    const tick = () => {
      projMatrix.setOrtho(-1, 1, -1, 1, near, far)
      projMatrix.rotate(...rotate)
      projMatrix.scale(...scale)
      viewMatrix.lookAt(eyeX, eyeY, .25, 0, 0, 0, 0, 1, 0)
      gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(renderMode.val, 0, VERTICES_COUNT)
    }

    document.onkeydown = e => {
      if (document.activeElement.tagName !== "input") {
        setLastPressedKey(`${ e.shiftKey ? 'Shift+' : '' }${e.key}`);
        (e.shiftKey ? shiftActions : action)[e.key]?.()
        tick()
      }
    }

    initVertexBuf()
    tick()
  }

  useEffect(async () => {
    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    gl = window["getWebGLContext"](canvas)
    const modes = [
      { name: 'TRIANGLES', val: gl.TRIANGLES },
      { name: 'TRIANGLE_STRIP', val: gl.TRIANGLE_STRIP },
      { name: 'TRIANGLE_FAN', val: gl.TRIANGLE_FAN },
      { name: 'POINTS', val: gl.POINTS },
      { name: 'LINES', val: gl.LINES },
      { name: 'LINE_STRIP', val: gl.LINE_STRIP },
      { name: 'LINE_LOOP', val: gl.LINE_LOOP },
    ]
    const shaders = await window['loadShaders']('OrtoView', gl)
    if (renderModes.length === 0) setRenderModes(modes)
    if (renderMode === undefined) setRenderMode(modes[0])
    if (vShaderCode === '') setVShaderCode(shaders.vShader)
    if (fShaderCode === '') setFShaderCode(shaders.fShader)
    create()
  })

  return <div>
    <div className="absolute text-white p-4 text-xs">
      <span className="text-rose-500 pb-4">ARROW KEYS NOT ROTATING TRIANGLES, IT'S MOVING CAMERA</span>
      <br/>
      <br/>
      <span>eyeX: { eyeX }, eyeY: { eyeY }</span>
      <br/>
      <span>rotate angle: { rotate }</span>
      <br/>
      <span>near: { near }, far: { far }</span>
      <br/>
      <span>scale: { scale[0] }</span>
      <br/>
      <span>last pressed key: { lastPressedKey }</span>
      <br/>
      <textarea className="p-2 text-black my-3" cols="33" rows="7" value={ vShaderCode } onChange={ e => { setVShaderCode(e.target.value) } }/>
      <br/>
      <textarea className="p-2 text-black my-3" cols="33" rows="7" value={ fShaderCode } onChange={ e => setFShaderCode(e.target.value) }/>
      <br/>
      <div>
        <label>Render mode:</label>
        <select className="text-black mx-2" onChange={ e => setRenderMode(JSON.parse(e.target.value)) }>
          { renderModes.map( m => <option key={ m.name } value={ JSON.stringify(m) }>{ m.name }</option> ) }
        </select>
      </div>
    </div>
    <canvas id="c" className="w-full h-screen"/>
  </div>
}
