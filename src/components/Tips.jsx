import { FaBrain, FaCalendarAlt, FaUsers, FaQuestion, FaClock, FaPencilAlt } from "react-icons/fa"
import { PiMathOperations } from "react-icons/pi"

const Tips = () => {
  const tips = [
    {
      id: 1,
      icon: <FaBrain className="text-3xl text-[#2e5e35]" />,
      title: "Entendé, no memorices",
      description:
        "La universidad evalúa comprensión. Asegurate de entender los conceptos fundamentales en lugar de memorizar fórmulas.",
    },
    {
      id: 2,
      icon: <FaCalendarAlt className="text-3xl text-[#2e5e35]" />,
      title: "Organizá tus semanas",
      description: "Planeá parciales y TP con tiempo. Usa un calendario para organizar tus estudios y entregas.",
    },
    {
      id: 3,
      icon: <FaUsers className="text-3xl text-[#2e5e35]" />,
      title: "No estudies solo",
      description: "Los grupos salvan parciales. Formá un grupo de estudio con compañeros comprometidos.",
    },
    {
      id: 4,
      icon: <FaQuestion className="text-3xl text-[#2e5e35]" />,
      title: "Preguntá siempre",
      description: "No hay preguntas tontas. Aprovechá las consultas y no te quedes con dudas.",
    },
    {
      id: 5,
      icon: <FaClock className="text-3xl text-[#2e5e35]" />,
      title: "Constancia sobre intensidad",
      description: "Es mejor estudiar 2 horas diarias que 14 horas el día antes del examen.",
    },
    {
      id: 6,
      icon: <FaPencilAlt className="text-3xl text-[#2e5e35]" />,
      title: "Resolvé ejercicios",
      description:
        "La práctica hace al maestro. Resolvé todos los ejercicios que puedas, especialmente los de parciales anteriores.",
    },
  ]

  return (
    <section id="tips" className="py-20 bg-gradient-to-b from-[#e6f0e6] to-[#edf5ed] relative">
      {/* Decorative math symbols background */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl text-[#2e5e35]">∫</div>
        <div className="absolute top-20 right-20 text-7xl text-[#ca8149]">π</div>
        <div className="absolute bottom-40 left-1/4 text-8xl text-[#2e5e35]">∑</div>
        <div className="absolute bottom-20 right-1/3 text-5xl text-[#ca8149]">√</div>
        <div className="absolute top-1/3 left-1/3 text-6xl text-[#2e5e35]">∞</div>
        <div className="absolute top-2/3 right-1/4 text-7xl text-[#ca8149]">θ</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script flex items-center justify-center">
          <PiMathOperations className="mr-2 text-4xl" /> Tips para rendir mejor en la Universidad
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-[#f0f7f0] rounded-lg shadow-lg p-6 border-l-4 border-[#2e5e35] hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start">
                <span className="mr-4" role="img" aria-label={tip.title}>
                  {tip.icon}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-[#2e5e35] mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="bg-[#2e5e35] max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
            <p className="text-white text-center text-xl chalk-effect">
              "El éxito en la universidad  no es solo cuestión de inteligencia, sino de constancia, organización y buenas
              estrategias de estudio."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tips
