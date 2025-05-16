import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">JobX</h3>
          <p className="text-slate-300 text-sm">
            Revolutionizing recruitment through AI and WhatsApp integration.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">For Job Seekers</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-teal-400 transition-colors">How it Works</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Find Jobs</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Career Resources</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">For Companies</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-teal-400 transition-colors">Post Jobs</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Find Talent</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-700 text-sm text-slate-400 text-center">
        &copy; {new Date().getFullYear()} JobX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;