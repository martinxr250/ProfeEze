"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Removed "Inicio" from navigation links since logo will handle this
  const navLinks = [
    { name: "Sobre mí", to: "sobremi" },
    { name: "Clases", to: "clases" },
    { name: "Presupuesto", to: "presupuesto" },
    { name: "Contacto", to: "contacto" },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Brand Name - Now clickable to scroll to inicio */}
        <Link
          to="inicio"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="flex items-center cursor-pointer group"
        >
          <div className="relative h-16 w-16 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src="/logo-ezeprofe.png"
              alt="Eze Profe Logo"
              className="h-full w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=48&width=48"
              }}
            />
          </div>
          <span
            className={`ml-3 font-bold text-2xl transition-colors duration-300 ${
              isScrolled ? "text-[#2e5e35]" : "text-white"
            } group-hover:text-[#ca8149]`}
          >
            Eze Profe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`cursor-pointer font-medium text-lg relative py-2 transition-colors duration-300 ${
                isScrolled ? "text-[#2e5e35]" : "text-white"
              } hover:text-[#ca8149] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#ca8149] after:transition-all after:duration-300 hover:after:w-full`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm text-[#2e5e35] transition-colors duration-300 hover:bg-white/20"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-5 flex flex-col divide-y divide-gray-100">
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className={`text-[#2e5e35] font-medium text-lg py-4 transition-colors hover:text-[#ca8149] ${
                index === 0 ? "border-t border-gray-100" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
