
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Room from "./components/Room"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </>
  )
}

export default App
