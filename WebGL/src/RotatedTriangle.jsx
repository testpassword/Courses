import { useEffect } from "react"

export default () => {

  const VERTICES = new Float32Array([
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5,
  ])
  const VERTICES_COUNT = 3
  const ANGLE = 90

  const radian = Math.PI * ANGLE / 180
  const cosB = Math.cos(radian)
  const sinB = Math.sin(radian)

  useEffect(async () => {
    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('RotatedTriangle', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    const u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    const u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    gl.uniform1f(u_CosB, cosB)
    gl.uniform1f(u_SinB, sinB)

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
    gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
  })

  return <canvas id="c" width="1000" height="1000"/>
}