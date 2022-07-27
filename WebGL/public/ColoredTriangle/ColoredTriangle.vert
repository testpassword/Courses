attribute vec4 a_Position;
attribute float a_PointSize;
attribute vec4 a_Color;
varying vec4 v_Color;
uniform mat4 u_modelMatrix;
void main() {
    gl_Position = u_modelMatrix * a_Position;
    gl_PointSize = a_PointSize;
    v_Color = a_Color;
}
