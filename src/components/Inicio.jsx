import { Link } from "react-scroll"
import logo from "/logo-ezeprofe.png"
import { motion } from "framer-motion"
import { UserPlus, BadgePercent } from "lucide-react"

const Inicio = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
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

        <p className="text-xl md:text-2xl text-white mb-4 max-w-2xl mx-auto chalk-effect">
          Clases particulares para estudiantes de nivel secundario y universitario
        </p>

        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto chalk-effect">
          <span className="font-bold">"Hago fácil lo difícil"</span>
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
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

        {/* Group Discount Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-[#ca8149]/90 to-[#e09c5f]/90 backdrop-blur-sm p-4 sm:p-5 rounded-xl mb-8 md:mb-12 max-w-3xl mx-auto border border-[#ca8149]/30 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white">
            <div className="bg-white/20 p-3 rounded-full">
              <UserPlus className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-1">¡PROMOCIÓN GRUPAL!</h3>
              <p className="text-sm sm:text-base">
                Obtené hasta un <span className="font-bold">25% de descuento</span> en clases grupales de 2 a 4
                estudiantes
              </p>
            </div>
            <div className="hidden sm:block ml-auto">
              <BadgePercent className="h-10 w-10 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Información del canal de YouTube */}
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg max-w-md mx-auto">
          <a
            href="https://www.youtube.com/@ezeprofe3545"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-white hover:text-[#ca8149] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            <div className="text-left">
              <p className="font-bold">¡Visita mi canal de YouTube!</p>
              <p className="text-sm">Clases gratuitas y explicaciones paso a paso</p>
            </div>
          </a>
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