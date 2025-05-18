import React from 'react';

interface WhatsAppRedirectProps {
  type: 'job' | 'talent';
  children: React.ReactNode;
  className?: string;
}

const WhatsAppRedirect = ({ type, children, className }: WhatsAppRedirectProps): JSX.Element => {
  const handleClick = async () => {
    if (type === 'job') {
      // Generate a unique ID for the job seeker
      const seekerId = Math.random().toString(36).substring(7);
      
      try {
        // Create a record through our API
        const response = await fetch('/api/job-seekers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seekerId }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage;
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || 'Failed to create job seeker record';
          } catch {
            errorMessage = `Server error: ${errorText}`;
          }
          throw new Error(errorMessage);
        }

        // Redirect to WhatsApp with the seeker ID
        const message = `Hi, I'm looking for job opportunities! (ID: ${seekerId})`;
        const phoneNumber = '918118898113'; // Format: country code + number without any special characters
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      } catch (error: any) {
        console.error('Error creating job seeker:', error);
        alert(`Error: ${error.message}\n\nPlease try again later or contact support if the issue persists.`);
      }
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