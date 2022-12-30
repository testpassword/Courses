import React, { useEffect, useState } from 'react'

export default () => {

  const [eyeX, setEyeX] = useState(5)
  const [eyeY, setEyeY] = useState(2)
  const [eyeZ, setEyeZ] = useState(4)

  const [singleColor, setSingleColor] = useState(false)

/*  Create a cube
     v6----- v5
    /|      /|
   v1------v0|
   | |     | |
   | |v7---|-|v4
   |/      |/
   v2------v3
   */

  useEffect(async () => {
    const VERTICES = new Float32Array([
      1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0,-1.0, 1.0,   1.0,-1.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 1.0, 1.0,   1.0,-1.0, 1.0,   1.0,-1.0,-1.0,   1.0, 1.0,-1.0,  // v0-v3-v4-v5 right
      1.0, 1.0, 1.0,   1.0, 1.0,-1.0,  -1.0, 1.0,-1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
      -1.0, 1.0, 1.0,  -1.0, 1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0,-1.0, 1.0,  // v1-v6-v7-v2 left
      -1.0,-1.0,-1.0,   1.0,-1.0,-1.0,   1.0,-1.0, 1.0,  -1.0,-1.0, 1.0,  // v7-v4-v3-v2 down
      1.0,-1.0,-1.0,  -1.0,-1.0,-1.0,  -1.0, 1.0,-1.0,   1.0, 1.0,-1.0   // v4-v7-v6-v5 back
    ])
    const COLORS = new Float32Array([
      0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
      0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
      1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
      1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
      1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
      0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
    ])
    const NORMALS = new Float32Array([    // Normal
      0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
      0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
      -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
      0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
      0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
    ]);
    const SINGLE_COLOR = new Float32Array(new Array(COLORS.length).fill(1))
    const EDGES = new Uint8Array([
      0, 1, 2,   0, 2, 3,    // front
      4, 5, 6,   4, 6, 7,    // right
      8, 9,10,   8,10,11,    // up
      12,13,14,  12,14,15,    // left
      16,17,18,  16,18,19,    // down
      20,21,22,  20,22,23     // back
    ])
    const VERTICES_COUNT = EDGES.length
    const LIGHT = { COLOR: [1.0, 1.0, 1.0], DIRECTION: [0.5, 3.0, 4.0] }

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

    await window['loadAndInitShaders']('LightedCube', gl)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    const initBuf = (data, bufType, attribute, type = gl.FLOAT, num = 3) => {
      const buf = gl.createBuffer()
      gl.bindBuffer(bufType, buf)
      gl.bufferData(bufType, data, gl.STATIC_DRAW)
      if (bufType === gl.ARRAY_BUFFER) {
        const a_attribute = gl.getAttribLocation(gl.program, attribute)
        gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0)
        gl.enableVertexAttribArray(a_attribute)
      }
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
        'ArrowLeft': () => setEyeX( prev => prev + .5 ),
        'ArrowRight': () => setEyeX( prev => prev - .5 ),
        'ArrowUp': () => setEyeY( prev => prev + .5 ),
        'ArrowDown': () => setEyeY( prev => prev - .5 )
      })[e.key]?.()
      tick()
    }

    initBuf(VERTICES, gl.ARRAY_BUFFER, 'a_Position')
    initBuf(singleColor ? SINGLE_COLOR : COLORS, gl.ARRAY_BUFFER, 'a_Color')
    initBuf(NORMALS, gl.ARRAY_BUFFER, 'a_Normal')
    initBuf(EDGES, gl.ELEMENT_ARRAY_BUFFER)
    u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix')
    const u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor')
    const u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection')
    gl.uniform3fv(u_LightColor, LIGHT.COLOR)
    const lightDirection = new window["Vector3"](LIGHT.DIRECTION)
    lightDirection.normalize()
    gl.uniform3fv(u_LightDirection, lightDirection.elements)
    tick()
  })

  return <div>
    <div className="absolute text-white">
      <span>eyeX: { eyeX }, eyeY: { eyeY }, eyeZ: { eyeZ }</span>
      <div>
        <label>Single color: </label>
        <input type="checkbox"
               checked={ singleColor }
               onChange={ e => setSingleColor(e.target.checked) }
        />
      </div>
    </div>
    <canvas id="c" className="w-full h-screen"/>
  </div>
}
