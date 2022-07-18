import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ONEdotONE from './guides/1.1'
import ONEdotTWO from "./guides/1.2"
import TWOdotONE from "./guides/2.1"
import THREEdotTWO from "./guides/3.1";
import FIVEdotONE from "./guides/5.1";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route path="/1.1" element={<ONEdotONE/>}/>
        <Route path="/1.2" element={<ONEdotTWO/>}/>
        <Route path="/2.1" element={<TWOdotONE/>}/>
        <Route path="/3.1" element={<THREEdotTWO/>}/>
        <Route path="/5.1" element={<FIVEdotONE/>}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)