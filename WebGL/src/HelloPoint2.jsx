import { useEffect } from "react"

export default () => {
  useEffect(async () => {
    const gl = window["getWebGLContext"](document.getElementById("c"))
    await window['loadAndInitShaders']('HelloPoint2', gl)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 5.0)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  })

  return <canvas id="c" width="1000" height="1000"/>
}
