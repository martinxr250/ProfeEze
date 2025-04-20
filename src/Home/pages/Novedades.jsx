"use client"

import { motion } from "framer-motion"
import { Clock, PhoneIcon as WhatsApp, Instagram, ArrowRight, Tag, Calendar, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function Novedades() {
  // Datos de ejemplo para novedades
  const novedades = [
  ]

  // Función para manejar el envío de mensajes de WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    const message = e.target.message.value
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/5493518153322?text=${encodedMessage}`, "_blank")
  }

  return (
    <div className="w-full bg-black text-white min-h-screen flex flex-col">
      {/* Sección de Novedades */}
      <div className="container mx-auto px-4 md:px-6 flex-grow py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Título principal con la tipografía urbana */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-center"
            style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            Novedades
          </h1>

          <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto mb-16">
            Mantente al día con las últimas novedades en nuestra nueva tienda web, ofertas exclusivas y expansión de Stone Market. Aquí encontrarás
            todo lo que necesitas saber sobre nuestros productos y promociones.
          </p>

          {/* Sección de novedades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {novedades.map((novedad) => (
              <motion.div
                key={novedad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: novedad.id * 0.1 }}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={novedad.imagen || "/StoneMarket.png"}
                    alt={novedad.titulo}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full flex items-center">
                    {novedad.tipo === "Oferta" ? (
                      <Tag className="w-4 h-4 mr-1" />
                    ) : novedad.tipo === "Expansión" ? (
                      <ArrowRight className="w-4 h-4 mr-1" />
                    ) : (
                      <Calendar className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm">{novedad.tipo}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-gray-400 text-sm mb-2">{novedad.fecha}</div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {novedad.titulo}
                  </h3>
                  <p className="text-gray-300 mb-4">{novedad.descripcion}</p>
                  <Link
                    href="/productos"
                    className="text-gray-300 hover:text-white flex items-center text-sm font-medium transition-colors"
                  >
                    Ver más detalles
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sección Nosotros */}
          <div className="mt-24 mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              Nosotros
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3
                  className="text-2xl md:text-3xl mb-6"
                  style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                >
                  Nuestra Esencia
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  En <span className="font-bold">STONE MARKET</span>, no solo vendemos productos; creamos experiencias.
                  
                </p>
                <p className="text-gray-300 mb-6 text-lg">
                  Nuestra cuidadosa selección de zapatillas importadas representa lo mejor del diseño internacional,
                  mientras que nuestra colección de gorras y dispositivos vapes refleja las últimas tendencias urbanas
                  con un toque distintivo cordobés.
                </p>
                <p className="text-gray-400 text-lg">
                  Para contacto directo, envíanos un mensaje por WhatsApp
                </p>
              </div>

              <div className="bg-zinc-900 p-8 rounded-lg">
                <h3
                  className="text-2xl md:text-3xl mb-6"
                  style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
                >
                  Encuéntranos
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Ubicación</h4>
                      <p className="text-gray-300">Córdoba, Argentina</p>
                      <p className="text-gray-400 text-sm mt-1">Envíos a todo el país</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Horarios</h4>
                      <p className="text-gray-300">Lunes a Domingo</p>
                      <p className="text-gray-300">13:00 a 04:00</p>
                      <p className="text-gray-400 text-sm mt-1">Siempre disponibles para vos</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <WhatsApp className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Contacto</h4>
                      <p className="text-gray-300">+54 9 351 815-3322</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Instagram className="h-6 w-6 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-xl mb-1">Instagram</h4>
                      <p className="text-gray-300">@stonemarket_cordoba</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nuestro Compromiso */}
          <div className="mt-16 text-center">
            <h2
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              Nuestro Compromiso
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              En STONE MARKET nos comprometemos a ofrecerte solo productos premium, cuidadosamente seleccionados para
              quienes no se conforman con lo simple. Cada zapatilla, cada gorra y cada dispositivo vape en nuestro
              catálogo representa nuestra pasión por la calidad.
            </p>
            
          </div>

          {/* Panel de WhatsApp */}
          <div className="mt-20 bg-zinc-900 p-8 rounded-lg">
            <h2
              className="text-3xl md:text-4xl mb-4 text-center"
              style={{ fontFamily: "'Permanent Marker', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              Contáctanos por WhatsApp
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Envíanos un mensaje directo a nuestro WhatsApp para consultas, pedidos o información.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-3 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-white resize-none h-32"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-600 rounded-md transition-colors text-white font-medium"
              >
                <WhatsApp className="w-5 h-5" />
                Enviar mensaje por WhatsApp
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <img src="/Iconos/StoneMarket.png" alt="Stone Market Logo" className="w-16 h-16" />
                <h3 className="text-2xl" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                  STONE MARKET
                </h3>
              </div>
              <p className="text-gray-400">Tu tienda online para zapatillas, vapes y gorras de calidad.</p>
            </div>
            <div>
              <h4 className="text-xl mb-4 flex items-center">
                <Clock className="mr-2" /> Horarios
              </h4>
              <p className="text-gray-400">Lunes a Domingo</p>
              <p className="text-gray-400">13:00PM a 04:00AM</p>
            </div>
            <div>
              <h4 className="text-xl mb-4">Contacto</h4>
              <a
                href="https://wa.me/5493518153322"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-2"
              >
                <WhatsApp className="mr-2" /> +5493518153322
              </a>
              <a
                href="https://instagram.com/stonemarket_cordoba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-200 transition-colors"
              >
                <Instagram className="mr-2" /> stonemarket_cordoba
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 SkartIt. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

