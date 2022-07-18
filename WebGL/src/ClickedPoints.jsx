import { useEffect } from "react"

export default () => {

  const g_points = []

  useEffect(async () => {
    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('ClickedPoints', gl)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    canvas.onmousedown = e => {
      g_points.push(window['screenCoordsToWebGL'](e, canvas))
      gl.clear(gl.COLOR_BUFFER_BIT)
      g_points.forEach( p => {
        gl.vertexAttrib2fv(a_Position, p)
        gl.drawArrays(gl.POINTS, 0, 1)
      })
    }
  })

  return <canvas id="c" width="1000" height="1000"/>
}
