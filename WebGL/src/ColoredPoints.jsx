import { useEffect } from "react"
import { zip } from "underscore"

export default () => {
  useEffect(async () => {
    const g_points = []
    const g_colors = []

    const canvas = document.getElementById("c")
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('ColoredPoints', gl)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const getColor = (x, y) => {
      if (x >= 0 && y >= 0) return [1.0, 0.0, 0.0, 1.0]
      else if (x < 0 && y < 0) return [0.0, 1.0, 0.0, 1.0]
      else if (x > 0 && y < 0) return [1.0, 0.0, 1.0, 1.0]
      else return [1.0, 1.0, 1.0, 1.0]
    }

    canvas.onmousedown = e => {
      const coords = window['screenCoordsToWebGL'](e, canvas)
      g_points.push(coords)
      g_colors.push(getColor(...coords))
      gl.clear(gl.COLOR_BUFFER_BIT)
      zip(g_points, g_colors).forEach( it => {
        gl.vertexAttrib2fv(a_Position, it[0])
        gl.uniform4f(u_FragColor, ...it[1], 1.0)
        gl.drawArrays(gl.POINTS, 0, 1)
      })
    }
  })

  return <canvas id="c" width="1000" height="1000"/>
}
