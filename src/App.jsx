import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Inicio from "./components/Inicio"
import SobreMi from "./components/SobreMi"
import Clases from "./components/Clases"
import Presupuesto from "./components/Presupuesto"
import Contacto from "./components/Contacto"
import Footer from "./components/Footer"
import Tips from "./components/Tips"
import WhatsAppButton from "./components/WhatsAppButton"
import { useLocation } from "react-router-dom"

function MainContent() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  return (
    <>
      <Navbar />
      <main>
        <Inicio />
        <SobreMi />
        <Presupuesto />
        <Clases />
        <Tips />
        <Contacto />
      </main>
      <Footer />
      {isHomePage && <WhatsAppButton />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
      </Routes>
    </Router>
  )
}

export default App
