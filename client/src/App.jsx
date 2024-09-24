import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BlogList from './pages/BlogList'
import BlogEditor from './pages/BlogEditor'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<BlogList/>} />
      <Route path='/blog-editor' element={<BlogEditor/>} />

    </Routes>
    
    </>
  )
}

export default App