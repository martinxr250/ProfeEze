"use client"

import { useState } from "react"
import { Link } from "react-scroll"
import { Instagram, Youtube, MessageCircle, MapPin, Clock, ChevronUp, Send } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top button visibility
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500)
    })
  }

  return (
    <>
      {/* Floating WhatsApp button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://wa.me/5493517394001"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Contactar por WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Contactar por WhatsApp</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Scroll to top button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed bottom-6 left-6 z-50 bg-[#ca8149] hover:bg-[#b57341] text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
                showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
              }`}
              aria-label="Volver arriba"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Volver arriba</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <footer className="bg-gradient-to-br from-[#2e5e35] to-[#1a4020] text-white relative overflow-hidden">
        {/* Removed the wave divider as requested */}

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAyLjc5IDQgNCA0IDQtMS43OSA0LTR6bTI0IDBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')]"></div>

        {/* Math symbols (subtle background) */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 text-6xl font-bold text-white">∫</div>
          <div className="absolute bottom-20 right-10 text-7xl font-bold text-white">π</div>
          <div className="absolute top-1/3 right-1/4 text-6xl font-bold text-white">√</div>
          <div className="absolute bottom-1/3 left-1/4 text-5xl font-bold text-white">∑</div>
        </div>

        <div className="container mx-auto px-4 pt-12 pb-12 relative z-10">
          {/* Quick contact shortcuts - Removed email button as requested */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: <MessageCircle className="h-6 w-6" />,
                title: "WhatsApp",
                text: "Consulta por WhatsApp",
                action: "https://wa.me/5493517394001",
                color: "bg-green-600 hover:bg-green-700",
              },
              {
                icon: <Send className="h-6 w-6" />,
                title: "Formulario",
                text: "Completa el formulario",
                action: "contacto",
                color: "bg-[#ca8149] hover:bg-[#b57341]",
                isScroll: true,
              },
              {
                icon: <Youtube className="h-6 w-6" />,
                title: "YouTube",
                text: "Mira mis videos",
                action: "https://www.youtube.com/@ezeprofe3545",
                color: "bg-red-600 hover:bg-red-700",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                {item.isScroll ? (
                  <Link
                    to={item.action}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className={`flex items-center p-4 rounded-xl ${item.color} text-white transition-all duration-300 h-full cursor-pointer group-hover:shadow-lg`}
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.text}</p>
                    </div>
                  </Link>
                ) : (
                  <a
                    href={item.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center p-4 rounded-xl ${item.color} text-white transition-all duration-300 h-full group-hover:shadow-lg`}
                  >
                    <div className="bg-white/20 p-3 rounded-full mr-4">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.text}</p>
                    </div>
                  </a>
                )}
                <div className="absolute inset-0 border-2 border-white/0 rounded-xl group-hover:border-white/20 pointer-events-none transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <div className="flex items-center mb-4">
                <div className="bg-white p-2 rounded-lg shadow-md mr-3">
                  <img src="/logo-ezeprofe.png" alt="Eze Profe Logo" className="h-10 w-auto" />
                </div>
                <h2 className="text-xl font-bold">Eze Profe</h2>
              </div>
              <p className="text-white/80 mb-6">
                Clases particulares personalizadas para estudiantes de ingeniería. Apoyo académico de calidad para
                superar tus desafíos.
              </p>

              {/* Social media */}
              <div className="flex space-x-3">
                {[
                  { icon: <Instagram className="h-5 w-5" />, url: "https://www.instagram.com/profe_eze/" },
                  { icon: <Youtube className="h-5 w-5" />, url: "https://www.youtube.com/@ezeprofe3545" },
                  { icon: <MessageCircle className="h-5 w-5" />, url: "https://wa.me/5493517394001" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-[#ca8149] text-white p-2.5 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label={`Visitar ${social.url.includes("instagram") ? "Instagram" : social.url.includes("youtube") ? "YouTube" : "WhatsApp"}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links column */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Enlaces</h3>
              <ul className="space-y-2">
                {["inicio", "sobremi", "clases", "presupuesto", "contacto"].map((item) => (
                  <li key={item}>
                    <Link
                      to={item}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={800}
                      className="text-white/80 hover:text-[#ca8149] transition-colors flex items-center group cursor-pointer"
                    >
                      <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-[#ca8149] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info column - Styled like the Contacto component */}
            <div className="lg:col-span-6">
              <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Información de contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-600 p-3 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Ubicación</h4>
                    <p className="mt-1 text-white/80">Córdoba Capital, Argentina</p>
                    <p className="text-white/80">(Clases presenciales solo en Córdoba)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600 p-3 rounded-full mr-4 flex-shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">WhatsApp</h4>
                    <a
                      href="https://wa.me/5493517394001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-white/80 hover:text-white hover:underline transition-colors"
                    >
                      +54 9 351 739-4001
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600 p-3 rounded-full mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Horarios</h4>
                    <p className="mt-1 text-white/80">Lunes a Viernes: 9:00 - 20:00</p>
                    <p className="text-white/80">Sábados: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="mt-8 bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-lg">¿Necesitas ayuda con tus estudios?</h4>
                    <p className="text-white/80 text-sm">Agenda una clase de prueba y experimenta la diferencia.</p>
                  </div>
                  <Link
                    to="contacto"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    className="bg-[#ca8149] hover:bg-[#b57341] text-white px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center whitespace-nowrap"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Contactar ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70">&copy; {currentYear} Eze Profe. Todos los derechos reservados.  Desarrollado por SkarIT </p>
            <p className="text-sm text-white/70 mt-2 md:mt-0">
              Desarrollado por{" "}
              <a
                href="http://skarit.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ca8149] hover:underline"
              >
                SkarTech
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
