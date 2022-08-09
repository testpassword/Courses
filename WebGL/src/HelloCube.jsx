import React, { useEffect, useState } from 'react'

export default () => {

  const [eyeX, setEyeX] = useState(5)
  const [eyeY, setEyeY] = useState(2)
  const [eyeZ, setEyeZ] = useState(4)

  useEffect(async () => {
    const VERTICES = new Float32Array([
       1, 1, 1,    1, 1, 1,
      -1, 1, 1,    1, 0, 1,
      -1,-1, 1,    1, 0, 0,
       1,-1, 1,    1, 1, 0,
       1,-1,-1,    0, 1, 0,
       1, 1,-1,    0, 1, 1,
      -1, 1,-1,    0, 0, 1,
      -1,-1,-1,    0, 0, 0,
    ])
    const edges = new Uint8Array([
      0, 1, 2, 0, 2, 3,
      0, 3, 4, 0, 4, 5,
      0, 5, 6, 0, 6, 1,
      1, 6, 7, 1, 7, 2,
      7, 4, 3, 7, 3, 2,
      4, 7, 6, 4, 6, 5
    ])
    const VERTICES_COUNT = edges.length
    const FSIZE = VERTICES.BYTES_PER_ELEMENT

    const [modelMatrix, viewMatrix, projMatrix, mvpMatrix] = Array(4).fill(new window["Matrix4"]())
    let u_MvpMatrix
    modelMatrix.setTranslate(0.5, 0, 0)
    mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix)

    const canvas = document.getElementById("c")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const gl = window["getWebGLContext"](canvas);
    [gl.DEPTH_TEST, gl.POLYGON_OFFSET_FILL].forEach( f => gl.enable(f) )
    gl.polygonOffset(1, 1)

    await window['loadAndInitShaders']('HelloCube', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initVertexBuf = () => {
      const vertexBuf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf)
      gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW)

      const edgesBuf = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgesBuf)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edges, gl.STATIC_DRAW)

      const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
      gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
      gl.enableVertexAttribArray(a_Position)

      const a_Color = gl.getAttribLocation(gl.program, 'a_Color')
      gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
      gl.enableVertexAttribArray(a_Color)
      u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')
    }

    const tick = () => {
      projMatrix.setPerspective(30, canvas.width/canvas.height, 0.01, 100)
      viewMatrix.lookAt(eyeX, eyeY, eyeZ, 0, 0, 0, 0, 1, 0)
      gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      gl.drawElements(gl.TRIANGLES, VERTICES_COUNT, gl.UNSIGNED_BYTE, 0)
    }

    document.onkeydown = e => {
      ({
        'ArrowLeft': () => setEyeX( prev => prev + .1 ),
        'ArrowRight': () => setEyeX( prev => prev - .1 ),
        'ArrowUp': () => setEyeY( prev => prev + .1 ),
        'ArrowDown': () => setEyeY( prev => prev - .1 )
      })[e.key]?.()
      tick()
    }

    initVertexBuf()
    tick()
  })

  return <div>
    <div className="absolute text-white">
      <span>eyeX: { eyeX }, eyeY: { eyeY }, eyeZ: { eyeZ }</span>
    </div>
    <canvas id="c" className="w-full h-screen"/>
  </div>
}
