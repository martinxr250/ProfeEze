"use client"

import { useState } from "react"
import { Clock, Mail, MapPin, Send } from "lucide-react"

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {
      nombre: "",
      email: "",
      mensaje: "",
    }

    if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres"
      isValid = false
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido"
      isValid = false
    }

    if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Crear mensaje para WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Hola Eze Profe, soy ${formData.nombre}.\n\n` +
        `${formData.mensaje}\n\n` +
        `Mi información de contacto:\n` +
        `Email: ${formData.email}` +
        (formData.telefono ? `\nTeléfono: ${formData.telefono}` : ""),
    )

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/5493517394001?text=${whatsappMessage}`, "_blank")
  }

  return (
    <section
      id="contacto"
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/math-physics-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Elementos decorativos matemáticos */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 text-6xl font-bold text-green-800">∫</div>
        <div className="absolute top-40 right-20 text-7xl font-bold text-green-800">∑</div>
        <div className="absolute bottom-20 left-1/4 text-8xl font-bold text-green-800">π</div>
        <div className="absolute bottom-40 right-1/4 text-6xl font-bold text-green-800">√</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold text-green-800">
          E=mc²
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Contacto</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ¿Tienes dudas sobre las clases o necesitas ayuda con algún tema específico? Completa el formulario y te
            responderé por WhatsApp.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Formulario - 3 columnas en desktop */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <Send className="mr-2 h-6 w-6" />
              Envíame un mensaje por WhatsApp
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: María González"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.nombre ? "border-red-500 bg-red-50" : "border-gray-300"} focus:border-green-600 focus:ring focus:ring-green-200 transition-colors`}
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu.email@ejemplo.com"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"} focus:border-green-600 focus:ring focus:ring-green-200 transition-colors`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: +54 9 351 1234567"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring focus:ring-green-200 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Escribe aquí tu consulta o mensaje..."
                  className={`w-full px-4 py-3 rounded-lg border ${errors.mensaje ? "border-red-500 bg-red-50" : "border-gray-300"} focus:border-green-600 focus:ring focus:ring-green-200 transition-colors`}
                ></textarea>
                {errors.mensaje && <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Enviar mensaje por WhatsApp
              </button>
            </form>
          </div>

          {/* Información de contacto - 2 columnas en desktop */}
          <div className="md:col-span-2 bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-8 border-b border-green-500 pb-4">Información de contacto</h3>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-xl">Ubicación</h4>
                  <p className="mt-2 text-green-100">Córdoba Capital, Argentina</p>
                  <p className="text-green-100">(Clases presenciales solo en Córdoba)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-xl">Email</h4>
                  <a
                    href="mailto:contacto@ezeprofe.com"
                    className="mt-2 block text-green-100 hover:text-white hover:underline transition-colors"
                  >
                    contacto@ezeprofe.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-600 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-xl">Horarios de atención</h4>
                  <p className="mt-2 text-green-100">Lunes a Viernes: 9:00 - 20:00</p>
                  <p className="text-green-100">Sábados: 9:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
