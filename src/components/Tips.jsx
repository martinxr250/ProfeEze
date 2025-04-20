import ChalkboardBackground from "./ChalkboardBackground"

const Tips = () => {
  const tips = [
    {
      id: 1,
      icon: "🧠",
      title: "Entendé, no memorices",
      description:
        "La UTN evalúa comprensión. Asegurate de entender los conceptos fundamentales en lugar de memorizar fórmulas.",
    },
    {
      id: 2,
      icon: "🗓️",
      title: "Organizá tus semanas",
      description: "Planeá parciales y TP con tiempo. Usa un calendario para organizar tus estudios y entregas.",
    },
    {
      id: 3,
      icon: "🤝",
      title: "No estudies solo",
      description: "Los grupos salvan parciales. Formá un grupo de estudio con compañeros comprometidos.",
    },
    {
      id: 4,
      icon: "📚",
      title: "Preguntá siempre",
      description: "No hay preguntas tontas. Aprovechá las consultas y no te quedes con dudas.",
    },
    {
      id: 5,
      icon: "⏰",
      title: "Constancia sobre intensidad",
      description: "Es mejor estudiar 2 horas diarias que 14 horas el día antes del examen.",
    },
    {
      id: 6,
      icon: "📝",
      title: "Resolvé ejercicios",
      description:
        "La práctica hace al maestro. Resolvé todos los ejercicios que puedas, especialmente los de parciales anteriores.",
    },
  ]

  return (
    <section id="tips" className="py-20 bg-[#2e5e35]/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2e5e35] mb-12 font-script">
          Tips para rendir mejor en la UTN
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2e5e35] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start">
                <span className="text-3xl mr-4" role="img" aria-label={tip.title}>
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
          <ChalkboardBackground className="max-w-3xl mx-auto">
            <p className="text-white text-center text-xl chalk-effect">
              "El éxito en la UTN no es solo cuestión de inteligencia, sino de constancia, organización y buenas
              estrategias de estudio."
            </p>
          </ChalkboardBackground>
        </div>
      </div>
    </section>
  )
}

export default Tips
