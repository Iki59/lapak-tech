import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./components/header/Header"
import ListProduct from './components/product/ListProduct'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListProduct/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
