import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-slate-800">JobX</h1>
      </div>
      <nav className="hidden md:flex gap-8">
        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">How it works</a>
        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">For Companies</a>
        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">For Job Seekers</a>
        <a href="#" className="text-slate-700 hover:text-teal-600 transition-colors">About</a>
      </nav>
      <button className="md:hidden">
        <Menu size={24} className="text-slate-800" />
      </button>
    </header>
  );
};

export default Header;