import { useEffect } from "react"

export default () => {

  const VERTICES = new Float32Array([
    -.5, -.5,
    -.5, .5,
    .5, -.5,
    .5, .5
  ])
  const VERTICES_COUNT = 4

  useEffect(async () => {
    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadAndInitShaders']('HelloQuad', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuffers = () => {
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(a_Position)
    }

    initVertexBuffers()
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, VERTICES_COUNT)
  })

  return <canvas id="c" width="1000" height="1000"/>
}
