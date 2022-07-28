import { useEffect } from "react"

export default () => {
  useEffect(async () => {
    const VERTICES = new Float32Array([
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5,
    ])
    const VERTICES_COUNT = 3

    const ANGLE_STEP = 45
    let currentAngel = 0.0

    const modelMatrix = new window["Matrix4"]()
    let u_modelMatrix

    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('RotatingTriangle', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    let lastTickTime = Date.now()
    const calcCurrentAngle = () => {
      const now = Date.now()
      const elapsed = now - lastTickTime
      lastTickTime = now
      return (currentAngel + (ANGLE_STEP * elapsed) / 1000.0) % 360
    }

    const initVertexBuffers = () => {
      const vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)
      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix')
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(a_Position)
    }

    const tick = () => {
      currentAngel = calcCurrentAngle()
      modelMatrix.setScale(.5, .5, .5).rotate(currentAngel, 0, 0, 1)
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
      requestAnimationFrame(tick)
    }

    initVertexBuffers()
    tick()
  })

  return <canvas id="c" width="750" height="750"/>
}
