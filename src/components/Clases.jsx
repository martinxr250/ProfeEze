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

  const materias = [
    "Álgebra Lineal",
    "Análisis Matemático I y II",
    "Física I y II",
    "Sistemas Operativos",
    "Programación",
    "Estadística",
    "Cálculo Numérico",
    "Ecuaciones Diferenciales",
    "Electromagnetismo",
    "Estructuras de Datos",
  ]

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

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-[#2e5e35] mb-6">Materias Disponibles</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {materias.map((materia, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-[#2e5e35] hover:text-white transition-colors"
              >
                {materia}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clases
