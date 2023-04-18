import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {Navbar, Footer, Sidebar, ThemeSettings} from './components'
import {Homepage, Prizes, Events, Calendar, Students, Stacked, Pyramid, Kanban, Area, Line, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor} from './pages'

import { useStateContext } from "./contexts/ContextProvider"

import { db } from './lib/firebase';

import './App.css';

const App = () => {
    const { activeMenu, currentColor } = useStateContext();
  return (
    <div>
    <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {}

                    <Routes>

                        {/* Dashboard */}
                        <Route path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Homepage />} />

                        {/* Pages */}
                        <Route path="/students" element={<Students />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/prizes" element={<Prizes />} />

                        { /* apps mostly unused */}
                        <Route path="/kanban" element={<Kanban />} />
                        <Route path="/editor" element={<Editor />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/color-picker" element={<ColorPicker />} />

                        {/* charts mostly unused */}
                        <Route path="/line" element={<Line />} />
                        <Route path="/area" element={<Area />} />
                        <Route path="/bar" element={<Bar />} />
                        <Route path="/pie" element={<Pie />} />
                        <Route path="/financial" element={<Financial />} />
                        <Route path="/color-mapping" element={<ColorMapping />} />
                        <Route path="/pyramid" element={<Pyramid />} />
                        <Route path="/stacked" element={<Stacked />} />


                    </Routes>
                </div>
                <Footer/>
            </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App