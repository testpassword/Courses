import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HelloCanvas from './HelloCanvas'
import HelloPoint1 from "./HelloPoint1"
import HelloPoint2 from "./HelloPoint2"
import ClickedPoints from "./ClickedPoints"
import ColoredPoints from "./ColoredPoints"
import MultiPoint from "./MultiPoint"
import HelloTriangle from "./HelloTriangle"
import HelloQuad from "./HelloQuad"
import TranslatedTriangle from "./TranslatedTriangle"
import RotatedTriangle from "./RotatedTriangle"
import RotatedTriangleMatrix from "./RotatedTriangleMatrix"
import RotatedTriangleMatrix4 from "./RotatedTriangleMatrix4"
import RotatedTranslatedTriangle from "./RotatedTranslatedTriangle"
import RotatingTriangle from "./RotatingTriangle"
import MultiAttributeSize from "./MultiAttributeSize"
import MultiAttributeSize_Interleaved from "./MultiAttributeSize_Interleaved"
import MultiAttributeColor from "./MultiAttributeColor"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/hello_canvas" element={<HelloCanvas/>}/>
        <Route path="/hello_point_1" element={<HelloPoint1/>}/>
        <Route path="/hello_point_2" element={<HelloPoint2/>}/>
        <Route path="/clicked_points" element={<ClickedPoints/>}/>
        <Route path="/colored_points" element={<ColoredPoints/>}/>
        <Route path="/multi_point" element={<MultiPoint/>}/>
        <Route path="/hello_triangle" element={<HelloTriangle/>}/>
        <Route path="/hello_quad" element={<HelloQuad/>}/>
        <Route path="/translated_triangle" element={<TranslatedTriangle/>}/>
        <Route path="/rotated_triangle" element={<RotatedTriangle/>}/>
        <Route path="/rotated_triangle_matrix" element={<RotatedTriangleMatrix/>}/>
        <Route path="/rotated_triangle_matrix4" element={<RotatedTriangleMatrix4/>}/>
        <Route path="/rotated_translated_triangle" element={<RotatedTranslatedTriangle/>}/>
        <Route path="/rotating_triangle" element={<RotatingTriangle/>}/>
        <Route path="/multi_attribute_size" element={<MultiAttributeSize/>}/>
        <Route path="/multi_attribute_size_interleaved" element={<MultiAttributeSize_Interleaved/>}/>
        <Route path="/multi_attribute_color" element={<MultiAttributeColor/>}/>
      </Route>
    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
)
