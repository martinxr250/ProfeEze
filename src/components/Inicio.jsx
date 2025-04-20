import { Link } from "react-scroll"
import logo from "/logo-ezeprofe.png"

const Inicio = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center bg-[#2e5e35] relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/038/261/698/non_2x/ai-generated-chalk-black-board-blackboard-chalkboard-background-free-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay para asegurar legibilidad del texto */}
      <div className="absolute inset-0 bg-[#2e5e35] opacity-40"></div>

      <div className="container mx-auto px-4 z-10 text-center">
        <img
          src={logo || "/placeholder.svg"}
          alt="Eze Profe Logo"
          className="mx-auto h-32 md:h-40 mb-6 animate-bounce"
        />

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-script chalk-effect">
          Aprendé con Eze Profe
        </h1>

        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto chalk-effect">
          Clases particulares para estudiantes de ingeniería en UTN Córdoba. Presenciales y virtuales.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="presupuesto"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="bg-[#ca8149] hover:bg-[#b06f3d] text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Solicitar Presupuesto
          </Link>

          <Link
            to="clases"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Conocer Clases
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link to="sobremi" spy={true} smooth={true} offset={-70} duration={500} className="text-white cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default Inicio
