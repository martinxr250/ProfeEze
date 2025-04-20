import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotLoggedInView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerStyle = {
    backgroundImage: `url('/hotel-mediterraneo-perfil.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '95vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '40px',
    padding: '4px',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#c53030',
    textAlign: 'center',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#c53030',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '425px',
    width: '90%',
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={cardStyle}
      >
        <h2 style={titleStyle}>¡Acceso Restringido!</h2>
        <p style={descriptionStyle}>Debe iniciar sesión para ver esta página</p>
        <p style={{ ...descriptionStyle, fontWeight: 'bold' }}>
          Para acceder a las funciones de reserva y administración, por favor inicie sesión en su cuenta.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/login">
            <button style={buttonStyle}>Iniciar Sesión</button>
          </Link>
          <button style={buttonStyle} onClick={() => setIsModalOpen(true)}>¿Por qué?</button>
        </div>
      </motion.div>

      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Acceso Restringido</h3>
            <p style={{ marginBottom: '20px' }}>Debe iniciar sesión para acceder a esta página.</p>
            <p style={{ marginBottom: '20px' }}>
              El inicio de sesión es necesario para proteger la información sensible y garantizar que sólo los usuarios autorizados puedan acceder a ciertas funciones del sitio. Esto incluye:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
              <li>Acceso a información personal de reservas</li>
              <li>Gestión de preferencias de usuario</li>
              <li>Funciones de administración del hotel</li>
            </ul>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                style={buttonStyle} 
                onClick={() => setIsModalOpen(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotLoggedInView;