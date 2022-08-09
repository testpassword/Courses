import React, { useEffect, useState } from 'react'

export default () => {
  const [near, setNear] = useState(-1)
  const [far, setFar] = useState(10)

  const [eyeX, setEyeX] = useState(.2)
  const [eyeY, setEyeY] = useState(.25)
  const [rotate, setRotate] = useState([0, 0, 0, 1])
  const [scale, setScale] = useState([1, 1, 1])

  const [vShaderCode, setVShaderCode] = useState('')
  const [fShaderCode, setFShaderCode] = useState('')

  const [renderModes, setRenderModes] = useState([])
  const [renderMode, setRenderMode] = useState(undefined) // gl.TRIANGLES but before gl isn't initialized
  const [lastPressedKey, setLastPressedKey] = useState('')

  const [depthTest, setDepthTest] = useState(true)

  let GL

  const VERTICES = new Float32Array([
    .0,  .5, -.4,   .4, 1, .4, // Дальний зеленый треугольник
    -.5, -.5, -.4,  .4, 1, .4,
    .5, -.5, -.4,   1, .4, .4,

    .5,  .4, -.2,   1, .4, .4, // Желтый треугольник в середине
    -.5,  .4, -.2,  1,  1, .4,
    0, -.6, -.2,    1,  1, .4,

    0,  .5,   0,   .4, .4,  1, // Ближний синий треугольник
    -.5, -.5, 0,    .4, .4,  1,
    .5, -.5,  0,    1, .4, .4
  ])
  const VERTICES_COUNT = 9
  const FSIZE = VERTICES.BYTES_PER_ELEMENT

  const viewMatrix = new window["Matrix4"]()
  let u_ProjMatrix
  const modelMatrix = new window["Matrix4"]()
  const projMatrix = viewMatrix.multiply(modelMatrix)

  const shiftActions = {
    '+': () => setScale(prev => prev.map(it => it + .05)),
    'ArrowLeft': () => setNear(prev => prev + 0.05),
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
    window["initShaders"](GL, vShaderCode, fShaderCode)
    GL.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = GL.createBuffer()
      GL.bindBuffer(GL.ARRAY_BUFFER, vertexBuf)
      GL.bufferData(GL.ARRAY_BUFFER, VERTICES, GL.STATIC_DRAW)
      const a_Position = GL.getAttribLocation(GL.program, 'a_Position')
      GL.vertexAttribPointer(a_Position, 3, GL.FLOAT, false, FSIZE * 6, 0)
      GL.enableVertexAttribArray(a_Position)
      const a_Color = GL.getAttribLocation(GL.program, 'a_Color')
      GL.vertexAttribPointer(a_Color, 3, GL.FLOAT, false, FSIZE * 6, FSIZE * 3)
      GL.enableVertexAttribArray(a_Color)
      u_ProjMatrix = GL.getUniformLocation(GL.program, 'u_ProjMatrix')
    }

    const tick = () => {
      projMatrix.setOrtho(-1, 1, -1, 1, near, far)
      projMatrix.rotate(...rotate)
      projMatrix.scale(...scale)
      viewMatrix.lookAt(eyeX, eyeY, .25, 0, 0, 0, 0, 1, 0)
      GL.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements)
      GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT)
      GL.drawArrays(renderMode.val, 0, VERTICES_COUNT)
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
    GL = window["getWebGLContext"](canvas)
    const modes = [
      { name: 'TRIANGLES', val: GL.TRIANGLES },
      { name: 'TRIANGLE_STRIP', val: GL.TRIANGLE_STRIP },
      { name: 'TRIANGLE_FAN', val: GL.TRIANGLE_FAN },
      { name: 'POINTS', val: GL.POINTS },
      { name: 'LINES', val: GL.LINES },
      { name: 'LINE_STRIP', val: GL.LINE_STRIP },
      { name: 'LINE_LOOP', val: GL.LINE_LOOP },
    ]
    const shaders = await window['loadShaders']('OrtoView', GL)
    if (renderModes.length === 0) setRenderModes(modes)
    if (renderMode === undefined) setRenderMode(modes[0])
    if (vShaderCode === '') setVShaderCode(shaders.vShader)
    if (fShaderCode === '') setFShaderCode(shaders.fShader)
    create()
  })

  // TODO: переключение режима проекций (orto, perspective) и функций через enable

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
      <textarea className="p-2 text-black my-3"
                cols="33"
                rows="7"
                value={ vShaderCode }
                onChange={ e => { setVShaderCode(e.target.value) } }
      />
      <br/>
      <textarea className="p-2 text-black my-3"
                cols="33"
                rows="7"
                value={ fShaderCode }
                onChange={ e => setFShaderCode(e.target.value) }
      />
      <br/>
      <div>
        <label>Render mode: </label>
        <select className="text-black mx-2"
                onChange={ e => setRenderMode(JSON.parse(e.target.value)) }
        >
          { renderModes.map( m =>
            <option key={ m.name }
                    value={ JSON.stringify(m) }>{ m.name }
            </option>
          )}
        </select>
      </div>
      <div>
        <label>Depth test: </label>
        <input type="checkbox"
               checked={ depthTest }
               onChange={ e => {
                 setDepthTest(!e.target.value)
                 if (e.target.value) GL?.enable(GL.DEPTH_TEST)
                 else GL?.disable(GL.DEPTH_TEST)
               }
        }/>
      </div>
    </div>
    <canvas id="c"
            className="w-full h-screen"
    />
  </div>
}
