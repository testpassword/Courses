import { useEffect } from "react"

export default () => {
  const VERTICES = new Float32Array([
     .0,  .5,     10.0,     1.0, 0.0, 0.0,
    -.5, -.5,     10.0,     0.0, 1.0, 0.0,
     .5, -.5,     10.0,     0.0, 0.0, 1.0
  ])
  const VERTICES_COUNT = 3
  const FSIZE = VERTICES.BYTES_PER_ELEMENT

  const modelMatrix = new window["Matrix4"]()

  useEffect(async () => {
    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('ColoredTriangle', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0)
      gl.enableVertexAttribArray(a_Position)

      const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
      gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2)
      gl.enableVertexAttribArray(a_PointSize)

      const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
      gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
      gl.enableVertexAttribArray(a_Color)

      const u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix')
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)

    }

    initVertexBuf()
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, VERTICES_COUNT)
  })

  return <canvas id="c" className="w-full h-screen"/>
}
