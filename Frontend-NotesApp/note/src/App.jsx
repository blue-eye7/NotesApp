
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import './App.css'
import Auth from './Auth'
import Note from './Note'

function App() {
return(
<BrowserRouter>
<Routes>
  <Route path='/' element={<Auth/>}></Route>
  <Route path='/note' element={<Note/>}></Route>
</Routes>

</BrowserRouter>)
}

export default App
