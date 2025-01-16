import styles from "./App.module.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Home from "./routes/Home"

function App() {


  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
