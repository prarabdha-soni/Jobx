import React from 'react';

interface WhatsAppRedirectProps {
  type: 'job' | 'talent';
  children: React.ReactNode;
  className?: string;
}

const WhatsAppRedirect: React.FC<WhatsAppRedirectProps> = ({ type, children, className }) => {
  const handleClick = async () => {
    if (type === 'job') {
      // Generate a unique ID for the job seeker
      const seekerId = Math.random().toString(36).substring(7);
      
      try {
        // Create a record in MongoDB through our API
        const response = await fetch('/api/job-seekers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ seekerId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create job seeker record');
        }

        // Redirect to WhatsApp with the seeker ID
        const message = `Hi, I'm looking for job opportunities! (ID: ${seekerId})`;
        const phoneNumber = '918118898113'; // Format: country code + number without any special characters
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      } catch (error: any) {
        console.error('Error creating job seeker:', error);
        alert(`Error: ${error.message}\n\nPlease make sure the backend server is running and try again.`);
      }
    } else {
      // Redirect to the company portal
      window.location.href = '/portal';
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default WhatsAppRedirect;