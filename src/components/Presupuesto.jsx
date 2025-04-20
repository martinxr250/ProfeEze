"use client"

import { useState, useEffect } from "react"

const Presupuesto = () => {
  const [modalidad, setModalidad] = useState("presencial")
  const [materia, setMateria] = useState("algebra")
  const [duracion, setDuracion] = useState("1h")
  const [precio, setPrecio] = useState(0)

  const materias = [
    { id: "algebra", nombre: "Álgebra Lineal" },
    { id: "analisis1", nombre: "Análisis Matemático I" },
    { id: "analisis2", nombre: "Análisis Matemático II" },
    { id: "fisica1", nombre: "Física I" },
    { id: "fisica2", nombre: "Física II" },
    { id: "sistemas", nombre: "Sistemas Operativos" },
    { id: "programacion", nombre: "Programación" },
    { id: "estadistica", nombre: "Estadística" },
  ]

  // Calcular precio basado en selecciones
  useEffect(() => {
    let precioBase = 0

    // Precio base por modalidad
    if (modalidad === "presencial") {
      precioBase = 5000 // Precio base para clases presenciales
    } else {
      precioBase = 4500 // Precio base para clases virtuales
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
    setPrecio(precioFinal)
  }, [modalidad, materia, duracion])

  return (
    <section id="presupuesto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script">
          Solicitar Presupuesto
        </h2>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#2e5e35] mb-6">Personaliza tu clase</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Modalidad</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidad"
                        value="presencial"
                        checked={modalidad === "presencial"}
                        onChange={() => setModalidad("presencial")}
                        className="h-4 w-4 text-[#2e5e35] focus:ring-[#2e5e35]"
                      />
                      <span className="ml-2 text-gray-700">Presencial</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="modalidad"
                        value="virtual"
                        checked={modalidad === "virtual"}
                        onChange={() => setModalidad("virtual")}
                        className="h-4 w-4 text-[#2e5e35] focus:ring-[#2e5e35]"
                      />
                      <span className="ml-2 text-gray-700">Virtual</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="materia" className="block text-gray-700 font-medium mb-2">
                    Materia
                  </label>
                  <select
                    id="materia"
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2e5e35] focus:ring focus:ring-[#2e5e35] focus:ring-opacity-50"
                  >
                    {materias.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Duración</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duracion"
                        value="1h"
                        checked={duracion === "1h"}
                        onChange={() => setDuracion("1h")}
                        className="h-4 w-4 text-[#2e5e35] focus:ring-[#2e5e35]"
                      />
                      <span className="ml-2 text-gray-700">1 hora</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duracion"
                        value="2h"
                        checked={duracion === "2h"}
                        onChange={() => setDuracion("2h")}
                        className="h-4 w-4 text-[#2e5e35] focus:ring-[#2e5e35]"
                      />
                      <span className="ml-2 text-gray-700">2 horas</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="duracion"
                        value="mensual"
                        checked={duracion === "mensual"}
                        onChange={() => setDuracion("mensual")}
                        className="h-4 w-4 text-[#2e5e35] focus:ring-[#2e5e35]"
                      />
                      <span className="ml-2 text-gray-700">Mensual</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-[#2e5e35] mb-6">Tu Presupuesto</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Modalidad:</span>
                  <span className="font-medium">{modalidad === "presencial" ? "Presencial" : "Virtual"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Materia:</span>
                  <span className="font-medium">{materias.find((m) => m.id === materia)?.nombre}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-700">Duración:</span>
                  <span className="font-medium">
                    {duracion === "1h" ? "1 hora" : duracion === "2h" ? "2 horas" : "Mensual (8 horas)"}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-bold">Precio estimado:</span>
                    <span className="text-2xl font-bold text-[#2e5e35]">${precio.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    * Los precios pueden variar según necesidades específicas.
                  </p>
                </div>

                <button
                  className="w-full bg-[#ca8149] hover:bg-[#b06f3d] text-white font-bold py-3 px-6 rounded-lg transition-colors mt-4"
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Presupuesto
