import React from 'react';
import { User, Calendar, Plus, Filter } from 'lucide-react';

const CompanyPortalPreview: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[700px] h-[80%] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform -rotate-1">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-6 gap-6">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">JX</span>
          </div>
          <div className="flex flex-col gap-6 items-center mt-6">
            <button className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
              <User size={20} />
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-teal-600">
              <Calendar size={20} />
            </button>
          </div>
        </div>
        
        {/* Candidates List */}
        <div className="w-[220px] border-r border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <select className="text-sm border rounded px-2 py-1">
                <option>All</option>
                <option>New</option>
                <option>In Progress</option>
              </select>
              <button className="text-gray-500">
                <Calendar size={16} />
              </button>
              <button className="w-6 h-6 bg-teal-600 rounded-full text-white flex items-center justify-center">
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-52px)]">
            {['Ganesh Kumar', '9881255713', 'Priya Sharma', 'Ravi Singh', 'Neha Verma', 'Vikram Joshi'].map((name, index) => (
              <div key={index} className={`p-3 border-b border-gray-100 ${index === 0 ? 'bg-teal-50' : ''}`}>
                <div className="flex justify-between mb-1">
                  <h3 className="text-sm font-medium">{name}</h3>
                  <span className="text-xs text-gray-400">21 Nov</span>
                </div>
                <p className="text-xs text-gray-500 truncate">Frontend Developer with 3 years experience</p>
                <div className="flex justify-between mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${index === 0 ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'}`}>
                    {index < 3 ? 'Open' : 'Expired'}
                  </span>
                  {index < 3 && (
                    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-xs">
                      2
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat View */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-medium">Ganesh Kumar</h2>
            <div className="flex items-center text-xs text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Active now
            </div>
          </div>
          
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            <div className="bg-gray-200 text-gray-700 p-3 rounded-lg rounded-tl-none w-3/5 mb-3">
              <p className="text-sm">Hello! I'm interested in the Frontend Developer position</p>
              <p className="text-xs text-gray-500 text-right">10:08 AM</p>
            </div>
            
            <div className="bg-teal-100 text-teal-700 p-3 rounded-lg rounded-tr-none w-3/5 ml-auto mb-3">
              <p className="text-sm">Hi Ganesh! Thanks for your interest. Your profile looks impressive.</p>
              <p className="text-xs text-gray-500 text-right">10:10 AM</p>
            </div>
            
            <div className="bg-teal-100 text-teal-700 p-3 rounded-lg rounded-tr-none w-3/5 ml-auto mb-3">
              <p className="text-sm">Do you have experience with React and TypeScript?</p>
              <p className="text-xs text-gray-500 text-right">10:10 AM</p>
            </div>
            
            <div className="bg-gray-200 text-gray-700 p-3 rounded-lg rounded-tl-none w-3/5 mb-3">
              <p className="text-sm">Yes, I've been working with React for 3 years and TypeScript for 2 years.</p>
              <p className="text-xs text-gray-500 text-right">10:12 AM</p>
            </div>
          </div>
          
          <div className="p-3 border-t border-gray-200">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-teal-500"
              />
              <button className="ml-2 px-4 py-2 bg-teal-600 text-white rounded-full text-sm">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPortalPreview;