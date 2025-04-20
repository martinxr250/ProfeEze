import ChalkboardBackground from "./ChalkboardBackground"

const SobreMi = () => {
  return (
    <section id="sobremi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script">Sobre Mí</h2>

        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/3">
            <div className="rounded-full overflow-hidden border-4 border-[#2e5e35] h-64 w-64 mx-auto bg-[#2e5e35]/20 flex items-center justify-center">
              {/* Reemplazamos la imagen con fallback por una solución más robusta */}
              <div className="text-[#2e5e35] text-6xl font-script">EP</div>
              {/* Si quieres usar una imagen, descomenta esto y comenta el div anterior
              <img
                src="/profesor-avatar.jpg"
                alt="Eze Profe"
                className="h-full w-full object-cover"
              /> 
              */}
            </div>
          </div>

          <div className="md:w-2/3 mt-6 md:mt-0">
            <ChalkboardBackground>
              <h3 className="text-2xl font-bold text-white mb-4 chalk-effect">¡Hola! Soy Ezequiel</h3>

              <p className="text-white mb-4 chalk-effect">
                Soy Ezequiel, profesor de la UTN Córdoba con más de 10 años de experiencia en materias como Álgebra,
                Análisis Matemático y Sistemas Operativos. Me apasiona la enseñanza clara y práctica. Doy clases
                personalizadas para ayudarte a aprobar, entender y disfrutar lo que estudiás.
              </p>

              <p className="text-white mb-4 chalk-effect">
                Mi enfoque se basa en explicar los conceptos complejos de manera simple y aplicada, para que puedas no
                solo aprobar tus exámenes, sino realmente comprender la materia.
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Álgebra</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Análisis Matemático
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sistemas Operativos
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Física</span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Programación</span>
              </div>
            </ChalkboardBackground>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreMi
