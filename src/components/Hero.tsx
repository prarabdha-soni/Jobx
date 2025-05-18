import { ArrowRight } from 'lucide-react';
import WhatsAppRedirect from './WhatsAppRedirect';
import CompanyPortalPreview from './CompanyPortalPreview';

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[90vh] w-full">
      <div className="w-full md:w-1/2 py-10 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
          Let AI find <span className="text-teal-600">jobs</span> and <span className="text-teal-600">talents</span> for you
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-600">
          Meet your AI HR agent—end-to-end talent matching, automated over WhatsApp & AI calls.
        </p>
        
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
          <WhatsAppRedirect 
            type="job" 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-md text-base sm:text-lg font-semibold hover:bg-teal-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Looking for a job <ArrowRight size={18} />
          </WhatsAppRedirect>
          
          <WhatsAppRedirect 
            type="talent" 
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-teal-600 text-teal-600 rounded-md text-base sm:text-lg font-semibold hover:bg-teal-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Looking for talent <ArrowRight size={18} />
          </WhatsAppRedirect>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-100 via-teal-50 to-blue-100 relative overflow-hidden min-h-[400px] md:min-h-0">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-[700px] transform scale-[0.85] sm:scale-100">
            <CompanyPortalPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;