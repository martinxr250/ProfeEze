// Este es un componente actualizado para crear un fondo de pizarra
const ChalkboardBackground = ({ children, className = "" }) => {
    return (
      <div
        className={`bg-[#2e5e35] text-white p-6 rounded-lg shadow-lg ${className}`}
        style={{
          position: "relative",
        }}
      >
        {/* Contenido con z-index para estar por encima del overlay */}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
  
  export default ChalkboardBackground
  