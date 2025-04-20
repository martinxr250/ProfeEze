"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Clock, MapPin, Monitor, School } from "lucide-react"

const Presupuesto = () => {
  const [modalidad, setModalidad] = useState("presencial")
  const [materia, setMateria] = useState("algebra")
  const [duracion, setDuracion] = useState("1h")
  const [precio, setPrecio] = useState(0)
  const [animatePrice, setAnimatePrice] = useState(false)

  const materias = [
    { id: "algebra", nombre: "Álgebra Lineal", icon: "📊" },
    { id: "analisis1", nombre: "Análisis Matemático I", icon: "📈" },
    { id: "analisis2", nombre: "Análisis Matemático II", icon: "📉" },
    { id: "fisica1", nombre: "Física I", icon: "⚛️" },
    { id: "fisica2", nombre: "Física II", icon: "🔋" },
    { id: "sistemas", nombre: "Sistemas Operativos", icon: "💻" },
    { id: "programacion", nombre: "Programación", icon: "👨‍💻" },
    { id: "estadistica", nombre: "Estadística", icon: "📊" },
  ]

  // Calcular precio basado en selecciones
  useEffect(() => {
    let precioBase = 0

    // Precio base por modalidad
    if (modalidad === "presencial") {
      precioBase = 12000 // Precio base para clases presenciales
    } else {
      precioBase = 10000 // Precio base para clases virtuales
    }

    // Multiplicador por duración
    let multiplicador = 1
    if (duracion === "2h") {
      multiplicador = 1.8 // Descuento por 2 horas
    } else if (duracion === "mensual") {
      multiplicador = 6 // Precio mensual (8 horas)
    }

    // Ajuste por materia (algunas materias pueden ser más caras)
    let ajusteMateria = 1
    if (["analisis2", "fisica2", "sistemas"].includes(materia)) {
      ajusteMateria = 1.1 // 10% más para materias avanzadas
    }

    const precioFinal = Math.round(precioBase * multiplicador * ajusteMateria)

    // Trigger animation when price changes
    setAnimatePrice(true)
    setTimeout(() => setAnimatePrice(false), 700)

    setPrecio(precioFinal)
  }, [modalidad, materia, duracion])

  // Función para obtener el nombre de la materia seleccionada
  const getMateriaName = () => {
    return materias.find((m) => m.id === materia)?.nombre || ""
  }

  // Función para obtener el icono de la materia seleccionada
  const getMateriaIcon = () => {
    return materias.find((m) => m.id === materia)?.icon || ""
  }

  // Función para obtener el texto de duración
  const getDuracionText = () => {
    if (duracion === "1h") return "1 hora"
    if (duracion === "2h") return "2 horas"
    return "Mensual (8 horas)"
  }

  return (
    <section id="presupuesto" className="py-24 bg-gradient-to-b from-[#f8faf8] to-[#edf5ed]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#2e5e35] mb-4">Solicitar Presupuesto</h2>
          <div className="h-1 w-24 bg-[#ca8149] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Personaliza tu clase según tus necesidades y obtén un presupuesto instantáneo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Opciones de personalización - 3 columnas en desktop */}
              <div className="md:col-span-3 p-8 md:p-10">
                <h3 className="text-2xl font-bold text-[#2e5e35] mb-8 flex items-center">
                  <School className="mr-3 h-6 w-6" />
                  Personaliza tu clase
                </h3>

                <div className="space-y-8">
                  {/* Modalidad */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Modalidad</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setModalidad("presencial")}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          modalidad === "presencial"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <MapPin className="mr-2 h-5 w-5" />
                        <span>Presencial</span>
                        {modalidad === "presencial" && <Check className="ml-2 h-4 w-4 text-[#2e5e35]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setModalidad("virtual")}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          modalidad === "virtual"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Monitor className="mr-2 h-5 w-5" />
                        <span>Virtual</span>
                        {modalidad === "virtual" && <Check className="ml-2 h-4 w-4 text-[#2e5e35]" />}
                      </button>
                    </div>
                  </div>

                  {/* Materia */}
                  <div>
                    <label htmlFor="materia" className="block text-gray-700 font-medium mb-3">
                      Materia
                    </label>
                    <div className="relative">
                      <select
                        id="materia"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        className="w-full p-4 pr-10 border-2 border-gray-200 rounded-xl appearance-none focus:border-[#2e5e35] focus:outline-none focus:ring-0 text-gray-700 bg-white transition-all duration-200 hover:border-gray-300"
                      >
                        {materias.map((mat) => (
                          <option key={mat.id} value={mat.id}>
                            {mat.icon} {mat.nombre}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <ChevronRight className="h-5 w-5 transform rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* Duración */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Duración</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setDuracion("1h")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          duracion === "1h"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Clock className="mb-1 h-5 w-5" />
                        <span>1 hora</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDuracion("2h")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          duracion === "2h"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Clock className="mb-1 h-5 w-5" />
                        <span>2 horas</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDuracion("mensual")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          duracion === "mensual"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <Clock className="mb-1 h-5 w-5" />
                        <span>Mensual</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumen y precio - 2 columnas en desktop */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#2e5e35] to-[#1d3d22] text-white p-8 md:p-10 flex flex-col">
                <h3 className="text-2xl font-bold mb-8">Tu Presupuesto</h3>

                <div className="space-y-6 flex-grow">
                  <div className="flex items-center p-4 bg-white/10 rounded-lg">
                    {modalidad === "presencial" ? (
                      <MapPin className="h-5 w-5 mr-3 text-[#ca8149]" />
                    ) : (
                      <Monitor className="h-5 w-5 mr-3 text-[#ca8149]" />
                    )}
                    <div>
                      <p className="text-sm text-white/70">Modalidad</p>
                      <p className="font-medium">{modalidad === "presencial" ? "Presencial" : "Virtual"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/10 rounded-lg">
                    <div className="mr-3 text-[#ca8149] text-xl">{getMateriaIcon()}</div>
                    <div>
                      <p className="text-sm text-white/70">Materia</p>
                      <p className="font-medium">{getMateriaName()}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white/10 rounded-lg">
                    <Clock className="h-5 w-5 mr-3 text-[#ca8149]" />
                    <div>
                      <p className="text-sm text-white/70">Duración</p>
                      <p className="font-medium">{getDuracionText()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Precio estimado:</span>
                    <motion.div
                      animate={{ scale: animatePrice ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 10 }}
                      className="text-3xl font-bold"
                    >
                      ${precio.toLocaleString()}
                    </motion.div>
                  </div>
                  <p className="text-sm text-white/60 mb-6">
                    * Los precios pueden variar según necesidades específicas.
                  </p>

                  <button
                    className="w-full bg-[#ca8149] hover:bg-[#ca8149]/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                    onClick={() => {
                      // Aquí se podría implementar lógica para enviar el presupuesto por email
                      // o redirigir al formulario de contacto
                      const contactoSection = document.getElementById("contacto")
                      if (contactoSection) {
                        contactoSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Solicitar Clase
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ventajas adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#2e5e35]/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-[#2e5e35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Flexibilidad Total</h4>
            <p className="text-gray-600">Adapta las clases a tu horario y necesidades específicas.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#2e5e35]/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-[#2e5e35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Material Incluido</h4>
            <p className="text-gray-600">Acceso a material didáctico y ejercicios personalizados.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-[#2e5e35]/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-[#2e5e35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Soporte Continuo</h4>
            <p className="text-gray-600">Consultas adicionales entre clases sin costo extra.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Presupuesto
