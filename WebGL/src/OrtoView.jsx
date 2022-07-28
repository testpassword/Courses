import React, { useEffect, useState } from 'react'

export default () => {
  const [near, setNear] = useState(0)
  const [far, setFar] = useState(1)

  const [eyeX, setEyeX] = useState(.2)
  const [eyeY, setEyeY] = useState(.25)
  const [eyeZ, setEyeZ] = useState(.25)

  useEffect(async () => {
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

    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('OrtoView', gl)
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
      viewMatrix.lookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0)
      gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
    }

    document.onkeydown = e => {
      if (e.shiftKey) switch (e.key) {
        case 'ArrowLeft':
          setNear(prev => prev - 0.01)
          break
        case 'ArrowRight':
          setNear(prev => prev + 0.01)
          break
        case 'ArrowUp':
          setFar(prev => prev + 0.01)
          break
        case 'ArrowDown':
          setFar(prev => prev - 0.01)
          break
        default:
          return
      }
      else switch (e.key) {
        case 'ArrowLeft':
          setEyeX( prev => prev + .01 )
          break
        case 'ArrowRight':
          setEyeX( prev => prev - .01 )
          break
        case 'ArrowUp':
          setEyeY( prev => prev + .01 )
          break
        case 'ArrowDown':
          setEyeY( prev => prev - .01 )
          break
        default:
          return
      }
      tick()
    }

    initVertexBuf()
    tick()
    setInterval(tick, 1000)
  })

  return <div>
    <div className="absolute text-white">
      <span>eyeX: { eyeX }, eyeY: { eyeY }, eyeZ: { eyeZ }</span>
      <br/>
      <span>near: { near }, far: { far }</span>
    </div>
    <canvas id="c" className="w-full h-screen"/>
  </div>
}
