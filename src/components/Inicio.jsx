"use client"

import { useEffect, useState } from "react"
import { Link } from "react-scroll"
import { ChevronDown, Youtube } from "lucide-react"
import { motion } from "framer-motion"

const Inicio = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat h-[110%] w-[110%] -top-[5%] -left-[5%] transform scale-105"
          style={{
            backgroundImage:
              "url('https://static.vecteezy.com/system/resources/previews/038/261/698/non_2x/ai-generated-chalk-black-board-blackboard-chalkboard-background-free-photo.jpg')",
            filter: "brightness(0.9) contrast(1.1)",
            transform: isLoaded ? "translate3d(0, 0, 0) scale(1.05)" : "translate3d(0, 0, 0) scale(1)",
            transition: "transform 10s ease-out",
          }}
        />

        {/* Professional gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e5e35]/70 via-[#2e5e35]/50 to-[#2e5e35]/80"></div>

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 bg-black opacity-20"
          style={{
            backgroundImage:
              "url('data:image/png;base64,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')",
            opacity: "0.05",
          }}
        />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <img
              src="/logo-ezeprofe.png"
              alt="Eze Profe Logo"
              className="mx-auto h-28 md:h-36 mb-8"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=144&width=144"
              }}
            />

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Aprendé con <span className="text-[#ca8149]">Eze Profe</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-6 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Clases particulares personalizadas para estudiantes de nivel secundario y universitario
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-10"
            >
              <p className="text-xl md:text-2xl text-white italic mb-2">
                <span className="font-medium">"Hago fácil lo difícil"</span>
              </p>
              <div className="h-1 w-24 bg-[#ca8149] mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row justify-center gap-5 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              to="presupuesto"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="bg-[#ca8149] hover:bg-[#ca8149]/90 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg flex items-center justify-center"
            >
              Solicitar Presupuesto
            </Link>

            <Link
              to="clases"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg flex items-center justify-center"
            >
              Conocer Clases
            </Link>
          </motion.div>

          {/* YouTube section redesigned */}
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <a
              href="https://www.youtube.com/@ezeprofe3545"
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-gradient-to-r from-[#2e5e35]/40 to-[#2e5e35]/60 backdrop-blur-md p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center">
                <div className="bg-red-600 text-white p-3 rounded-full mr-5">
                  <Youtube className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#ca8149] transition-colors">
                    Canal de YouTube
                  </h3>
                  <p className="text-white/80 text-sm">Accede a clases gratuitas y explicaciones paso a paso</p>
                </div>
                <div className="bg-white/10 rounded-full p-2 group-hover:bg-white/20 transition-colors">
                  <ChevronDown className="h-5 w-5 text-white transform rotate-270 group-hover:rotate-[-90deg] transition-transform duration-300" />
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <Link
          to="sobremi"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-white/80 hover:text-white cursor-pointer flex flex-col items-center transition-colors"
        >
          <span className="text-sm font-light mb-2">Descubre más</span>
          <ChevronDown className="h-6 w-6" />
        </Link>
      </motion.div>
    </section>
  )
}

export default Inicio
