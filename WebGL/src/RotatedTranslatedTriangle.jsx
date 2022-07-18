import { useEffect } from "react"

export default () => {
  const VERTICES = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5,
  ])
  const VERTICES_COUNT = 3
  const ANGLE = 90

  const modelMatrix = new window["Matrix4"]()
  modelMatrix.setTranslate(.5, 0, 0).rotate(ANGLE, 0, 0, 1).scale(.5, .5, .5)

  useEffect(async () => {
    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('RotatedTranslatedTriangle', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuffers = () => {
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      const u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix')
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(a_Position)
    }

    initVertexBuffers()
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
  })

  return <canvas id="c" width="750" height="750"/>
}
