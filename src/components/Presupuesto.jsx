"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ChevronRight, Clock, MapPin, Monitor, School, ChevronDown, Users } from "lucide-react"

const Presupuesto = () => {
  const [modalidad, setModalidad] = useState("presencial")
  const [materia, setMateria] = useState("algebra_geometria")
  const [nivel, setNivel] = useState("universidad")
  const [duracion, setDuracion] = useState("1h")
  const [cantidadAlumnos, setCantidadAlumnos] = useState("1")
  const [precio, setPrecio] = useState(0)
  const [precioOriginal, setPrecioOriginal] = useState(0)
  const [animatePrice, setAnimatePrice] = useState(false)

  // Materias organizadas por nivel educativo
  const materiasPorNivel = {
    universidad: [
      { id: "algebra_geometria", nombre: "Álgebra y Geometría", icon: "📐" },
      { id: "analisis1", nombre: "Análisis Matemático 1", icon: "📈" },
      { id: "analisis2", nombre: "Análisis Matemático 2", icon: "📉" },
      { id: "fisica1", nombre: "Física 1", icon: "⚛️" },
      { id: "fisica2", nombre: "Física 2", icon: "🔋" },
      { id: "quimica_general", nombre: "Química General", icon: "🧪" },
      { id: "anyca", nombre: "ANYCA", icon: "🔢" },
      { id: "sistema_representacion", nombre: "Sistema de Representación", icon: "📝" },
      { id: "calculo_avanzado", nombre: "Cálculo Avanzado", icon: "🧮" },
      { id: "otras_afines", nombre: "Otras materias afines", icon: "📚" },
    ],
    secundario: [
      { id: "matematicas", nombre: "Matemáticas", icon: "🔢" },
      { id: "fisica", nombre: "Física", icon: "⚡" },
      { id: "quimica", nombre: "Química", icon: "🧪" },
    ],
  }

  // Obtener las materias según el nivel seleccionado
  const getMateriasByNivel = () => {
    return materiasPorNivel[nivel] || []
  }

  // Calcular precio basado en selecciones
  useEffect(() => {
    let precioBase = 0

    // Precio base por modalidad y nivel
    if (modalidad === "presencial") {
      precioBase = nivel === "universidad" ? 15000 : 15000 // Precio base para clases presenciales
    } else {
      precioBase = nivel === "universidad" ? 14500 : 14500 // Precio base para clases virtuales
    }

    // Multiplicador por duración
    let multiplicador = 1
    if (duracion === "2h") {
      multiplicador = 1.8 // Descuento por 2 horas
    } else if (duracion === "mensual") {
      multiplicador = 7 // Precio mensual (8 horas)
    }

    // Ajuste por materia (algunas materias pueden ser más caras)
    let ajusteMateria = 1
    const materiasAvanzadas = ["analisis2", "fisica2", "calculo_avanzado", "anyca"]
    if (materiasAvanzadas.includes(materia)) {
      ajusteMateria = 1.1 // 10% más para materias avanzadas
    }

    const precioCalculado = Math.round(precioBase * multiplicador * ajusteMateria)
    setPrecioOriginal(precioCalculado)

    // Aplicar descuento por cantidad de alumnos
    let descuentoGrupal = 1
    if (cantidadAlumnos === "2") {
      descuentoGrupal = 0.85 // 15% de descuento por alumno para 2 alumnos
    } else if (cantidadAlumnos === "3") {
      descuentoGrupal = 0.75 // 25% de descuento por alumno para 3 alumnos
    } else if (cantidadAlumnos === "4+") {
      descuentoGrupal = 0.7 // 30% de descuento por alumno para 4 o más alumnos
    }

    const precioFinal = Math.round(precioCalculado * descuentoGrupal)

    // Trigger animation when price changes
    setAnimatePrice(true)
    setTimeout(() => setAnimatePrice(false), 700)

    setPrecio(precioFinal)
  }, [modalidad, materia, duracion, nivel, cantidadAlumnos])

  // Cuando cambia el nivel, actualizar la materia seleccionada a la primera del nuevo nivel
  useEffect(() => {
    const materiasDisponibles = getMateriasByNivel()
    if (materiasDisponibles.length > 0) {
      setMateria(materiasDisponibles[0].id)
    }
  }, [nivel])

  // Función para obtener el nombre de la materia seleccionada
  const getMateriaName = () => {
    const materiasDisponibles = getMateriasByNivel()
    return materiasDisponibles.find((m) => m.id === materia)?.nombre || ""
  }

  // Función para obtener el icono de la materia seleccionada
  const getMateriaIcon = () => {
    const materiasDisponibles = getMateriasByNivel()
    return materiasDisponibles.find((m) => m.id === materia)?.icon || ""
  }

  // Función para obtener el texto de duración
  const getDuracionText = () => {
    if (duracion === "1h") return "1 hora"
    if (duracion === "2h") return "2 horas"
    return "Mensual (8 horas)"
  }

  // Función para obtener el texto de cantidad de alumnos
  const getAlumnosText = () => {
    if (cantidadAlumnos === "1") return "Individual"
    if (cantidadAlumnos === "2") return "2 alumnos (15% desc. c/u)"
    if (cantidadAlumnos === "3") return "3 alumnos (25% desc. c/u)"
    return "4 o más alumnos (30% desc. c/u)"
  }

  // Función para crear un mensaje personalizado para WhatsApp
  const createWhatsAppMessage = () => {
    const nivelText = nivel === "universidad" ? "Universidad" : "Secundario"
    const modalidadText = modalidad === "presencial" ? "Presencial" : "Virtual"
    const materiaText = getMateriaName()
    const duracionText = getDuracionText()
    const alumnosText =
      cantidadAlumnos === "1" ? "Individual" : `${cantidadAlumnos === "4+" ? "4 o más" : cantidadAlumnos} alumnos`
    const precioText = precio.toLocaleString()

    // Calcular descuento aplicado
    let descuentoText = ""
    if (cantidadAlumnos !== "1") {
      const descuentoPorcentaje = cantidadAlumnos === "2" ? "15%" : cantidadAlumnos === "3" ? "25%" : "30%"
      descuentoText = `\n💰 *Descuento grupal aplicado:* ${descuentoPorcentaje} por alumno`
    }

    // Crear mensaje personalizado
    const message = encodeURIComponent(
      `¡Hola Eze Profe! 👋\n\n` +
        `Me interesa tomar clases contigo y he armado el siguiente presupuesto:\n\n` +
        `📚 *Nivel:* ${nivelText}\n` +
        `🏫 *Modalidad:* ${modalidadText}\n` +
        `📖 *Materia:* ${materiaText}\n` +
        `⏱️ *Duración:* ${duracionText}\n` +
        `👥 *Cantidad de alumnos:* ${alumnosText}${descuentoText}\n` +
        `💵 *Precio por alumno:* $${precioText}\n\n` +
        `Me gustaría coordinar una clase. ¿Cuándo podrías comenzar? ¿Tienes disponibilidad en los próximos días?`,
    )

    return `https://wa.me/5493517394001?text=${message}`
  }

  // Calcular el porcentaje de descuento
  const getDiscountPercentage = () => {
    if (cantidadAlumnos === "1") return 0
    if (cantidadAlumnos === "2") return 15
    if (cantidadAlumnos === "3") return 25
    return 30 // para 4+
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
                  {/* Nivel educativo */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Nivel Educativo</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setNivel("universidad")}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          nivel === "universidad"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="mr-2 text-xl">🎓</span>
                        <span>Universidad</span>
                        {nivel === "universidad" && <Check className="ml-2 h-4 w-4 text-[#2e5e35]" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setNivel("secundario")}
                        className={`flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          nivel === "secundario"
                            ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        <span className="mr-2 text-xl">📚</span>
                        <span>Secundario</span>
                        {nivel === "secundario" && <Check className="ml-2 h-4 w-4 text-[#2e5e35]" />}
                      </button>
                    </div>
                  </div>

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
                        {getMateriasByNivel().map((mat) => (
                          <option key={mat.id} value={mat.id}>
                            {mat.icon} {mat.nombre}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <ChevronDown className="h-5 w-5" />
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

                  {/* Cantidad de alumnos - NUEVO */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-3">Cantidad de Alumnos</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["1", "2", "3", "4+"].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setCantidadAlumnos(num)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                            cantidadAlumnos === num
                              ? "border-[#2e5e35] bg-[#2e5e35]/5 text-[#2e5e35]"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          <Users className="mb-1 h-5 w-5" />
                          <span>{num}</span>
                          {num !== "1" && (
                            <span className="text-xs mt-1 text-[#ca8149]">
                              {num === "2" ? "-15%" : num === "3" ? "-25%" : "-30%"}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      * El precio mostrado es por alumno. Descuentos aplicados para grupos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resumen y precio - 2 columnas en desktop */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#2e5e35] to-[#1d3d22] text-white p-8 md:p-10 flex flex-col">
                <h3 className="text-2xl font-bold mb-8">Tu Presupuesto</h3>

                <div className="space-y-6 flex-grow">
                  <div className="flex items-center p-4 bg-white/10 rounded-lg">
                    <div className="mr-3 text-[#ca8149] text-xl">{nivel === "universidad" ? "🎓" : "📚"}</div>
                    <div>
                      <p className="text-sm text-white/70">Nivel</p>
                      <p className="font-medium">{nivel === "universidad" ? "Universidad" : "Secundario"}</p>
                    </div>
                  </div>

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

                  {/* Nuevo: Cantidad de alumnos */}
                  <div className="flex items-center p-4 bg-white/10 rounded-lg">
                    <Users className="h-5 w-5 mr-3 text-[#ca8149]" />
                    <div>
                      <p className="text-sm text-white/70">Alumnos</p>
                      <p className="font-medium">{getAlumnosText()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  {cantidadAlumnos !== "1" && (
                    <div className="mb-4 p-3 bg-[#ca8149]/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Precio original:</span>
                        <span className="text-lg line-through text-white/70">${precioOriginal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Descuento grupal:</span>
                        <span className="text-lg text-[#ca8149]">-{getDiscountPercentage()}%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Precio por alumno:</span>
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

                  <a
                    href={createWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#ca8149] hover:bg-[#ca8149]/90 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                  >
                    Solicitar Clase por WhatsApp
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
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
              <Users className="h-6 w-6 text-[#2e5e35]" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Descuentos Grupales</h4>
            <p className="text-gray-600">Ahorra hasta un 30% por alumno al tomar clases en grupo.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Presupuesto
