import React from 'react';

interface WhatsAppRedirectProps {
  type: 'job' | 'talent';
  children: React.ReactNode;
  className?: string;
}

const WhatsAppRedirect = ({ type, children, className }: WhatsAppRedirectProps): JSX.Element => {
  const handleClick = () => {
    if (type === 'job') {
      // Directly open WhatsApp with a message
      const message = `Hi, I'm looking for job opportunities!`;
      const phoneNumber = '918118898113'; // Format: country code + number without any special characters
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      // Redirect to the company portal
      window.location.href = '/portal';
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`w-full sm:w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default WhatsAppRedirect;