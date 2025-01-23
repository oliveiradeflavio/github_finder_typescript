import styles from "./App.module.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./routes/Home"
import Project from "./routes/Project"

function App() {


  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repos/:login" element={<Project />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
