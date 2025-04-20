// Este es un componente actualizado para crear un fondo de pizarra
const ChalkboardBackground = ({ children, className = "" }) => {
    return (
      <div
        className={`bg-[#2e5e35] text-white p-6 rounded-lg shadow-lg ${className}`}
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/038/261/698/non_2x/ai-generated-chalk-black-board-blackboard-chalkboard-background-free-photo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          position: "relative",
        }}
      >
        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-[#2e5e35] opacity-50 rounded-lg"></div>
  
        {/* Contenido con z-index para estar por encima del overlay */}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
  
  export default ChalkboardBackground
  