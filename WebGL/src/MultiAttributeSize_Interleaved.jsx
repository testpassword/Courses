import { useEffect } from "react"

export default () => {
  useEffect(async () => {
    const VERTICES = new Float32Array([
      .0,  .5,     10,
      -.5, -.5,     20,
      .5, -.5,     30
    ])
    const VERTICES_COUNT = 3
    const FSIZE = VERTICES.BYTES_PER_ELEMENT

    const modelMatrix = new window["Matrix4"]().setScale(.5, .5, .5)

    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadAndInitShaders']('MultiAttributeSize_Interleaved', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0)
      gl.enableVertexAttribArray(a_Position)

      const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
      gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
      gl.enableVertexAttribArray(a_PointSize)

      const u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix')
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)

    }

    initVertexBuf()
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, VERTICES_COUNT)
  })

  return <canvas id="c" width="750" height="750"/>
}
