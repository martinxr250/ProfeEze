const Clases = () => {
  const clasesInfo = [
    {
      tipo: "Presenciales",
      descripcion: "Clases cara a cara en Córdoba Capital",
      ventajas: [
        "Atención personalizada directa",
        "Resolución de ejercicios en tiempo real",
        "Explicaciones detalladas con pizarra",
        "Material de estudio impreso",
      ],
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#2e5e35]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      tipo: "Virtuales",
      descripcion: "Clases online para todo el país",
      ventajas: [
        "Flexibilidad horaria y geográfica",
        "Grabación de la clase para repaso",
        "Compartir pantalla para mejor visualización",
        "Material digital completo",
      ],
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#2e5e35]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  const materiasUniversitarias = [
    "Álgebra y Geometría",
    "Análisis Matemático 1 y 2",
    "Física 1 y 2",
    "Química General",
    "ANYCA",
    "Sistema de Representación",
    "Cálculo Avanzado",
    "Otras materias afines",
  ]

  const materiasSecundarias = ["Matemáticas", "Física", "Química"]

  return (
    <section id="clases" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script">Mis Clases</h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {clasesInfo.map((clase, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#2e5e35] hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                {clase.icono}
                <h3 className="text-2xl font-bold text-[#2e5e35] ml-4">Clases {clase.tipo}</h3>
              </div>

              <p className="text-gray-700 mb-4">{clase.descripcion}</p>

              <ul className="space-y-2">
                {clase.ventajas.map((ventaja, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#ca8149] mr-2 mt-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{ventaja}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-[#2e5e35] mb-8">Materias Disponibles</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Materias Universitarias */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#2e5e35]">
              <h4 className="text-xl font-bold text-[#2e5e35] mb-4">Nivel Universitario</h4>
              <div className="grid grid-cols-1 gap-2">
                {materiasUniversitarias.map((materia, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-[#2e5e35]/10 transition-colors"
                  >
                    {materia}
                  </div>
                ))}
              </div>
            </div>

            {/* Materias Secundarias */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#ca8149]">
              <h4 className="text-xl font-bold text-[#ca8149] mb-4">Nivel Secundario</h4>
              <div className="grid grid-cols-1 gap-2">
                {materiasSecundarias.map((materia, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 hover:bg-[#ca8149]/10 transition-colors"
                  >
                    {materia}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sección del canal de YouTube */}
        <div className="max-w-4xl mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#FF0000]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-[#FF0000]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Canal de YouTube: Eze Profe</h3>
              <p className="text-gray-700 mb-4">
                Complementa tus clases particulares con mi contenido gratuito en YouTube. Encontrarás explicaciones
                detalladas de temas clave, resolución de ejercicios típicos de exámenes y consejos para mejorar tu
                rendimiento académico.
              </p>
              <a
                href="https://www.youtube.com/@ezeprofe3545"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FF0000] hover:bg-[#CC0000] text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Visitar Canal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clases
