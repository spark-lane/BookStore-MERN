import React from 'react'
import { Routes,Route } from 'react-router-dom'
import CreateBook from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBooks";
import Home from "./pages/Home";
import EditBook from "./pages/EditBooks";
import ShowBook from "./pages/ShowBooks";
const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={Home}/>
      <Route path='/books/create' element={CreateBook}/>
      <Route path='/books/delete/:id' element={DeleteBook}/>
      <Route path='/books/edit/:id' element={EditBook}/>
      <Route path='/books/details/:id' element={ShowBook}/>
      
    </Routes>
  )
}

export default App