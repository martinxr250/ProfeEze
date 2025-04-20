"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

import { Code, BarChart2, Globe, Zap, Shield, Users, CheckCircle, ArrowRight, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ArrowDown, MessageSquare, Menu, X } from 'lucide-react'

// Componente para el efecto de código binario
const BinaryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
      <div className="absolute inset-0 font-mono text-[8px] text-white/20 grid grid-cols-[repeat(30,1fr)] gap-1">
        {Array.from({ length: 1000 }).map((_, i) => (
          <div key={i} className="overflow-hidden">
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  )
}

// Componente para la animación de texto tecleado
const TypedText = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span className={className}>{displayedText}</span>
}

// Estilos personalizados para elementos específicos
const techStyles = {
  heading: "font-tech tracking-wider uppercase",
  subheading: "font-tech tracking-wide",
  button: "font-tech tracking-wider uppercase",
  badge: "font-tech tracking-wider uppercase",
  logo: "font-tech tracking-widest uppercase",
  text: "font-sans",
}

const Inicio = () => {
  // Estado para el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Estado para el formulario de WhatsApp
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    const message = `*Consulta desde Web Skar Technology*
*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Asunto:* ${formData.subject}
*Mensaje:* ${formData.message}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/1138257017?text=${encodedMessage}`, "_blank")
  }

  // Referencias para las secciones
  const heroRef = useRef(null)
  const serviciosRef = useRef(null)
  const ventajasRef = useRef(null)
  const proyectosRef = useRef(null)
  const contactoRef = useRef(null)

  // Detectar cuando las secciones están en el viewport
  const isServiciosInView = useInView(serviciosRef, { once: false, amount: 0.2 })
  const isVentajasInView = useInView(ventajasRef, { once: false, amount: 0.2 })
  const isProyectosInView = useInView(proyectosRef, { once: false, amount: 0.2 })
  const isContactoInView = useInView(contactoRef, { once: false, amount: 0.2 })

  // Efectos de parallax para el hero
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 50])

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const handleNavLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Estilos de fuente incrustados directamente en el componente */}
      <style jsx global>{`
        /* Importar fuentes de Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        /* Definir clases de fuente */
        .font-tech {
          font-family: 'Audiowide', cursive;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        /* Mejorar los efectos hover */
        .hover-link {
          position: relative;
          display: inline-block;
        }
        
        .hover-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: white;
          transition: width 0.3s ease;
        }
        
        .hover-link:hover::after {
          width: 100%;
        }
        
        /* Mejorar el hover de las tarjetas */
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
        }

        /* Mejorar los botones */
        .button-hover {
          position: relative;
          overflow: hidden;
        }

        .button-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.7s ease;
        }

        .button-hover:hover::before {
          left: 100%;
        }

        /* Mejorar la navegación */
        .nav-item {
          position: relative;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-item:hover::after {
          width: 80%;
        }
      `}</style>

      {/* Navegación móvil */}
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/skarLogo.png" alt="Skar Technology Logo" className="h-10 w-auto" />
              <span className={`text-xl font-bold ${techStyles.logo}`}>
                SKAR<span className="text-gray-400">TECH</span>
              </span>
            </div>

            {/* Menú de navegación para escritorio */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="nav-item text-white hover:text-white/80">
                Inicio
              </a>
              <a href="#servicios" className="nav-item text-white hover:text-white/80">
                Servicios
              </a>
              <a href="#sobre-nosotros" className="nav-item text-white hover:text-white/80">
                Nosotros
              </a>
              <a href="#proyectos" className="nav-item text-white hover:text-white/80">
                Proyectos
              </a>
              <a href="#contacto" className="nav-item text-white hover:text-white/80">
                Contacto
              </a>
            </nav>

            {/* Botón de menú móvil */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 pt-20 md:hidden">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-6 py-8">
              <a
                href="#"
                className="text-2xl font-tech text-white hover:text-white/80 border-b border-gray-800 pb-4"
                onClick={handleNavLinkClick}
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-2xl font-tech text-white hover:text-white/80 border-b border-gray-800 pb-4"
                onClick={handleNavLinkClick}
              >
                Servicios
              </a>
              <a
                href="#sobre-nosotros"
                className="text-2xl font-tech text-white hover:text-white/80 border-b border-gray-800 pb-4"
                onClick={handleNavLinkClick}
              >
                Nosotros
              </a>
              <a
                href="#proyectos"
                className="text-2xl font-tech text-white hover:text-white/80 border-b border-gray-800 pb-4"
                onClick={handleNavLinkClick}
              >
                Proyectos
              </a>
              <a
                href="#contacto"
                className="text-2xl font-tech text-white hover:text-white/80 border-b border-gray-800 pb-4"
                onClick={handleNavLinkClick}
              >
                Contacto
              </a>
            </nav>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
      >
        {/* Fondo de imagen oscura */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <img
            src="https://www.techgrapple.com/wp-content/uploads/2016/09/Black-Wallpaper-zipped.jpg?height=1080&width=1920&text=Background"
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <BinaryBackground />

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/60 to-black z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div style={{ opacity: heroOpacity, y: heroY }} className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl"></div>
                <img
                  src="/skarLogo.png"
                  alt="Skar Technology Logo"
                  className="relative z-10 w-full h-full object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-6 text-center"
            >
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white ${techStyles.heading}`}
              >
                <TypedText text="IMPULSAMOS NEGOCIOS CON" className="block mb-2" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  TECNOLOGÍA + ESTRATEGIA
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto font-light text-center px-4"
            >
              Desarrollo de software y gestión de redes sociales para potenciar tu presencia digital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Enlace al componente Productos */}
              <Link to="/productos">
                <Button className={`bg-white hover:bg-gray-200 text-black px-6 py-2 text-lg ${techStyles.button} button-hover`}>
                  Arma tu Plan
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Servicios Section */}
      <section
        id="servicios"
        ref={serviciosRef}
        className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950 relative"
      >
        <BinaryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-gray-950/90 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isServiciosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <Badge
              className={`mb-3 bg-white/10 text-white border-0 px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base ${techStyles.badge}`}
            >
              Nuestros Servicios
            </Badge>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${techStyles.heading}`}>
              SOLUCIONES DIGITALES COMPLETAS
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light px-2">
              Ofrecemos servicios especializados en desarrollo de software y gestión de redes sociales para impulsar tu
              presencia digital.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isServiciosInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-gray-800 border-2 overflow-hidden shadow-xl shadow-black/50 group card-hover">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>

                <CardHeader className="pb-4 md:pb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-white/10 flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300 group-hover:bg-white/20">
                    <Code className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-2xl sm:text-3xl text-white ${techStyles.heading}`}>
                    DESARROLLO DE SOFTWARE
                  </CardTitle>
                  <CardDescription className="text-lg sm:text-xl text-gray-400 font-light">
                    Creamos soluciones tecnológicas a medida
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                    {[
                      "Desarrollo de aplicaciones web",
                      "Aplicaciones móviles nativas e híbridas",
                      "Sistemas de gestión empresarial",
                      "E-commerce y plataformas de venta online",
                      "Integración de APIs y servicios",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isServiciosInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-base sm:text-lg text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/productos">
                    <Button
                      variant="ghost"
                      className={`text-white p-0 text-base sm:text-lg transition-all duration-300 hover:translate-x-2 ${techStyles.button}`}
                    >
                      CONOCER MÁS <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isServiciosInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card className="h-full bg-gradient-to-br from-gray-900 to-black border-gray-800 border-2 overflow-hidden shadow-xl shadow-black/50 group card-hover">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/50 to-white/0"></div>

                <CardHeader className="pb-4 md:pb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-white/10 flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300 group-hover:bg-white/20">
                    <BarChart2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className={`text-2xl sm:text-3xl text-white ${techStyles.heading}`}>
                    SOCIAL MEDIA MANAGEMENT
                  </CardTitle>
                  <CardDescription className="text-lg sm:text-xl text-gray-400 font-light">
                    Potenciamos tu presencia en redes sociales
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="space-y-2 md:space-y-3">
                    {[
                      "Estrategia de contenido personalizada",
                      "Gestión de redes sociales",
                      "Diseño gráfico para publicaciones",
                      "Campañas publicitarias en redes",
                      "Análisis y reportes de rendimiento",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isServiciosInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-base sm:text-lg text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/productos">
                    <Button
                      variant="ghost"
                      className={`text-white p-0 text-base sm:text-lg transition-all duration-300 hover:translate-x-2 ${techStyles.button}`}
                    >
                      CONOCER MÁS <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos Section */}
      <section id="sobre-nosotros" ref={ventajasRef} className="py-16 md:py-24 bg-black relative">
        <BinaryBackground />
        <div className="absolute inset-0 bg-black/90 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVentajasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <Badge
              className={`mb-3 bg-white/10 text-white border-0 px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base ${techStyles.badge}`}
            >
              ¿POR QUÉ ELEGIRNOS?
            </Badge>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${techStyles.heading}`}>
              VENTAJAS DE TRABAJAR CON NOSOTROS
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light px-2">
              En Skar Technology nos destacamos por ofrecer soluciones integrales con un enfoque centrado en resultados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "SOLUCIONES RÁPIDAS",
                description: "Implementamos soluciones ágiles y eficientes para tu negocio.",
              },
              {
                icon: Shield,
                title: "TECNOLOGÍA SEGURA",
                description: "Priorizamos la seguridad en todos nuestros desarrollos.",
              },
              {
                icon: Users,
                title: "EQUIPO EXPERTO",
                description: "Contamos con profesionales especializados en cada área.",
              },
              {
                icon: Globe,
                title: "ALCANCE GLOBAL",
                description: "Estrategias digitales con impacto internacional.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isVentajasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * index }}
                className="text-center p-6 sm:p-8 rounded-xl border-2 border-gray-800 bg-gradient-to-b from-gray-900/50 to-black transition-all duration-300 shadow-lg relative overflow-hidden group card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-colors duration-300 group-hover:bg-white/20">
                    <item.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white ${techStyles.heading}`}>
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-400 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section
        id="proyectos"
        ref={proyectosRef}
        className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-950 relative"
      >
        <BinaryBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-gray-950/90 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isProyectosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <Badge
              className={`mb-3 bg-white/10 text-white border-0 px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base ${techStyles.badge}`}
            >
              NUESTROS PROYECTOS
            </Badge>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${techStyles.heading}`}>
              CASOS DE ÉXITO
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light px-2">
              Conoce algunos de los proyectos en los que hemos trabajado y los resultados obtenidos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
            {[
              {
                title: "PLATAFORMA DE GESTIÓN",
                category: "Desarrollo Web",
                image:
                  "https://sklc-tinymce-2021.s3.amazonaws.com/comp/2023/02/179_1675948994.png?height=400&width=500&text=Plataforma",
                description:
                  "Sistema integral para gestión empresarial con módulos personalizados según necesidades del cliente.",
                technologies: ["React", "Node.js", "MongoDB"],
              },
              {
                title: "APP DE SERVICIOS",
                category: "Desarrollo Móvil",
                image:
                  "https://cdn.dribbble.com/userupload/14727879/file/original-1c455e9e155ab88896938262e7420247.png?format=webp&resize=400x300&vertical=center?height=400&width=600&text=App+Servicios",
                description: "Aplicación móvil para conectar profesionales con clientes potenciales en tiempo real.",
                technologies: ["React Native", "Firebase", "Google Maps API"],
              },
              {
                title: "ESTRATEGIA DIGITAL",
                category: "Social Media",
                image:
                  "https://www.santafe.gob.ar/ms/impulsa/wp-content/uploads/sites/67/2025/03/plandemarketingdigital0.jpg?height=400&width=600&text=Estrategia+Digital",
                description:
                  "Campaña integral en redes sociales que aumentó la visibilidad de marca en un 150% en 3 meses.",
                technologies: ["Instagram", "Facebook Ads", "Content Marketing"],
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isProyectosInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 * index }}
                className="group overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 transition-all duration-300 shadow-xl relative card-hover"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>

                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`bg-white/10 text-white border-0 px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-base ${techStyles.badge}`}
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white transition-colors ${techStyles.heading}`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-5 font-light">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs sm:text-sm bg-white/5 text-gray-300 px-2 py-1 sm:px-3 sm:py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className={`text-white p-0 text-base sm:text-lg transition-all duration-300 hover:translate-x-2 ${techStyles.button}`}
                  >
                    VER DETALLES <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section con WhatsApp Form */}
      <section id="contacto" ref={contactoRef} className="py-16 md:py-24 bg-black text-white relative">
        <BinaryBackground />
        <div className="absolute inset-0 bg-black/90 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-20"
          >
            <Badge
              className={`mb-3 bg-white/10 text-white border-0 px-3 py-1 text-sm sm:px-4 sm:py-1.5 sm:text-base ${techStyles.badge}`}
            >
              CONTACTO
            </Badge>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 ${techStyles.heading}`}>
              ¿LISTO PARA IMPULSAR TU NEGOCIO?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto font-light px-2">
              Contáctanos hoy mismo y comencemos a trabajar en tu próximo proyecto digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isContactoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-4 md:space-y-5">
                <h3 className={`text-2xl sm:text-3xl font-bold text-white ${techStyles.heading}`}>
                  INFORMACIÓN DE CONTACTO
                </h3>
                <p className="text-lg sm:text-xl text-gray-400 font-light">
                  Estamos listos para responder a tus consultas y comenzar a trabajar en tu proyecto.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-white/20 transition-colors duration-300">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-lg sm:text-xl font-medium text-white ${techStyles.heading}`}>UBICACIÓN</h4>
                    <p className="text-base sm:text-lg text-gray-400 font-light">Córdoba, Argentina 🇦🇷</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-lg sm:text-xl font-medium text-white ${techStyles.heading}`}>EMAIL</h4>
                    <p className="text-base sm:text-lg text-gray-400 font-light">contacto@skartechnology.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 sm:mr-4 group-hover:bg-white/20 transition-colors duration-300">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`text-lg sm:text-xl font-medium text-white ${techStyles.heading}`}>TELÉFONO</h4>
                    <p className="text-base sm:text-lg text-gray-400 font-light">+54 11 3825 7017</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:pt-6">
                <h4 className={`text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white ${techStyles.heading}`}>
                  SÍGUENOS EN REDES SOCIALES
                </h4>
                <div className="flex space-x-4 sm:space-x-5">
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20"
                  >
                    <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20"
                  >
                    <Twitter className="h-6 w-6 sm:h-7 sm:w-7" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20"
                  >
                    <Linkedin className="h-6 w-6 sm:h-7 sm:w-7" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isContactoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden card-hover"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/30 to-white/0"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/0 via-white/30 to-white/0"></div>

              <h3 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-white ${techStyles.heading}`}>
                ENVÍANOS UN MENSAJE
              </h3>
              <form className="space-y-4 sm:space-y-6" onSubmit={handleWhatsAppSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-300 ${techStyles.subheading}`}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white text-base sm:text-lg"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-300 ${techStyles.subheading}`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white text-base sm:text-lg"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className={`block text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-300 ${techStyles.subheading}`}
                  >
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white text-base sm:text-lg"
                    placeholder="Asunto de tu mensaje"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className={`block text-base sm:text-lg font-medium mb-1 sm:mb-2 text-gray-300 ${techStyles.subheading}`}
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white text-base sm:text-lg"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    required
                  ></textarea>
                </div>
                <div>
                  <Button
                    type="submit"
                    className={`w-full bg-white hover:bg-gray-200 text-black border-0 flex items-center justify-center py-4 sm:py-6 text-lg sm:text-xl shadow-lg transition-all duration-300 ${techStyles.button}`}
                  >
                    <MessageSquare className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                    ENVIAR POR WHATSAPP
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 md:py-16 border-t border-gray-800 relative">
        <BinaryBackground />
        <div className="absolute inset-0 bg-black/95 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <img src="/skarLogo.png" alt="Skar Technology Logo" className="h-10 sm:h-14 w-auto" />
                <span className={`text-xl sm:text-2xl font-bold ${techStyles.logo}`}>
                  SKAR<span className="text-gray-400">TECHNOLOGY</span>
                </span>
              </div>
              <p className="text-base sm:text-lg text-gray-400 mb-4 md:mb-6 max-w-md font-light">
                Impulsamos negocios con tecnología + estrategia digitales. Somos expertos en desarrollo de software y
                gestión de redes sociales.
              </p>
              <p className="text-gray-500 flex items-center text-base sm:text-lg font-light">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Córdoba, Argentina 🇦🇷
              </p>
            </div>

            <div>
              <h4 className={`text-lg sm:text-xl font-bold mb-4 md:mb-6 text-white ${techStyles.heading}`}>
                SERVICIOS
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Desarrollo Web
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Aplicaciones Móviles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Social Media
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Diseño UX/UI
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Consultoría IT
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={`text-lg sm:text-xl font-bold mb-4 md:mb-6 text-white ${techStyles.heading}`}>ENLACES</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#servicios"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Servicios
                  </a>
                </li>
                <li>
                  <a
                    href="#sobre-nosotros"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#proyectos"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Proyectos
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-base sm:text-lg text-gray-400 hover:text-white transition-colors flex items-center group hover-link"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-2">→</span>
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-base sm:text-lg font-light">
              © {new Date().getFullYear()} Skar Technology. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 sm:space-x-5 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Inicio
