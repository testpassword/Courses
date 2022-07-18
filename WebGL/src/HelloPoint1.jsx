import { useEffect } from "react"

export default () => {

  useEffect( async () => {
    const gl = window["getWebGLContext"](document.getElementById("c"))
    await window['loadShaders']('HelloPoint1', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  })

  return <canvas id="c" width="1000" height="1000"/>
}
