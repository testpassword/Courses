import { useEffect } from "react"

export default () => {
  useEffect(async () => {
    const VERTICES = new Float32Array([
      -.5,  .5,     0,     1,
      -.5, -.5,     0,     0,
      .5,  .5,     1,     1,
      .5, -.5,     1,     0
    ])
    const VERTICES_COUNT = 4
    const FSIZE = VERTICES.BYTES_PER_ELEMENT

    const modelMatrix = new window["Matrix4"]()

    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const gl = window["getWebGLContext"](canvas)
    await window['loadShaders']('MultiTexture', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
      gl.enableVertexAttribArray(a_Position)

      const a_TextCoord = gl.getAttribLocation(gl.program, 'a_TextCoord')
      gl.vertexAttribPointer(a_TextCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
      gl.enableVertexAttribArray(a_TextCoord)

      const u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix')
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)
    }

    let usedTexSlotCounter = 0
    const initTexture = async (uniformName, texturePath) => {
      if (usedTexSlotCounter >= gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) throw Error('MAX TEXTURES LOADED')
      const texture = gl.createTexture()
      const u_Sampler = gl.getUniformLocation(gl.program, uniformName)
      const img = await window['loadTexture'](texturePath)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.activeTexture(gl[`TEXTURE${usedTexSlotCounter}`])
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      gl.uniform1i(u_Sampler, usedTexSlotCounter)
      usedTexSlotCounter++
    }

    initVertexBuf()
    await initTexture('u_Sampler0', './demo_tex0.jpeg')
    await initTexture('u_Sampler1', './demo_tex1.jpeg')
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, VERTICES_COUNT)
  })

  return <canvas id="c" className="w-full h-screen"/>
}
