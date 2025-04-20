import logo from "/logo-ezeprofe.png"

const SobreMi = () => {
  return (
    <section id="sobremi" className="py-20 bg-gradient-to-b from-[#e6f0e6] to-[#edf5ed]">
      <div className="container mx-auto px-4">
        {/* Logo en la parte superior del componente */}
        <div className="flex justify-center mb-6">
          <img src={logo || "/placeholder.svg"} alt="Eze Profe Logo" className="h-16" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script">Sobre Mí</h2>

        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/3">
            <div className="rounded-full overflow-hidden border-4 border-[#2e5e35] h-64 w-64 mx-auto shadow-lg relative">
              <img src="/perfil-ezeprofe.png" alt="Eze Profe" className="h-full w-full object-cover" />
              {/* Elementos matemáticos decorativos */}
              <div className="absolute -top-4 -right-4 bg-[#f0f7f0] rounded-full h-10 w-10 flex items-center justify-center shadow-md text-[#2e5e35] font-bold">
                π
              </div>
              <div className="absolute -bottom-2 -left-2 bg-[#f0f7f0] rounded-full h-8 w-8 flex items-center justify-center shadow-md text-[#ca8149] font-bold">
                ∑
              </div>
            </div>
          </div>

          <div className="md:w-2/3 mt-6 md:mt-0">
            <div className="bg-[#f0f7f0] p-6 rounded-lg shadow-lg border-l-4 border-[#2e5e35] relative">
              {/* Elementos matemáticos decorativos */}
              <div className="absolute top-2 right-2 text-[#2e5e35]/10 text-4xl font-bold">∫</div>
              <div className="absolute bottom-2 right-2 text-[#ca8149]/10 text-4xl font-bold">√</div>

              <h3 className="text-2xl font-bold text-[#2e5e35] mb-4">¡Hola! Soy Ezequiel</h3>

              <p className="text-gray-700 mb-4">
                Soy profesor particular a nivel secundario y universitario, con amplia experiencia en materias de
                ciencias exactas. Brindo clases de forma presencial en Córdoba (Argentina) y virtual en todo el país.
              </p>

              <p className="text-gray-700 mb-4">
                Mi filosofía de enseñanza se resume en una simple frase:{" "}
                <span className="font-bold text-[#2e5e35]">"Hago fácil lo difícil"</span>. Me especializo en explicar
                conceptos complejos de manera clara y accesible, adaptándome a las necesidades de cada estudiante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreMi
