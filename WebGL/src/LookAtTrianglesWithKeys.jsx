import { useEffect } from "react"

export default () => {
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
    let u_ModelViewMatrix
    const modelMatrix = new window["Matrix4"]()
    const modelViewMatrix = viewMatrix.multiply(modelMatrix)

    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const gl = window["getWebGLContext"](canvas)
    await window['loadAndInitShaders']('LookAtRotatedTriangles', gl)
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
      u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix')
    }

    let eyeX = 0.20, eyeY = 0.25, eyeZ = 0.25
    const tick = () => {
      viewMatrix.setLookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0)
      gl.uniformMatrix4fv(u_ModelViewMatrix, false, modelViewMatrix.elements)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
    }

    document.onkeydown = e => {
      switch (e.key) {
        case 'ArrowLeft':
          eyeX += 0.01
          break
        case 'ArrowRight':
          eyeX -= 0.01
          break
        case 'ArrowUp':
          eyeY += 0.01
          break
        case 'ArrowDown':
          eyeY -= 0.01
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

  return <canvas id="c" className="w-full h-screen"/>
}
