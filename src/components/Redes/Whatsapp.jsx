import React from 'react';

const WhatsAppButton = () => {
  const predefinido = "Hola, StoneMarket estoy interesado en sus productos.";
  const url = `https://wa.me/+5493518153322?text=${encodeURIComponent(predefinido)}`;

  return (
    <a 
      href={url} 
      className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg flex items-center justify-center"
      target="_blank" 
      rel="noopener noreferrer"
    >
      <img 
        src="/icon-whatsapp.png" 
        alt="WhatsApp" 
        style={{ width: '45px', height: '45px' }}
      />
    </a>
  );
};

export default WhatsAppButton;