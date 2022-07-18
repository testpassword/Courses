import { useEffect } from "react"

export default () => {

  useEffect(() => {
    const gl = window["getWebGLContext"](document.getElementById("c"))
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  })

  return <canvas id="c" width="1000" height="1000"/>
}
