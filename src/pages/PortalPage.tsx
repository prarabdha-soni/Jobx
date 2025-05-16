import React from 'react';
import { ArrowLeft, Search, Bell, User, MessageSquare, Users, Briefcase, Settings, HelpCircle, Filter, ChevronDown } from 'lucide-react';

const PortalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 fixed h-full">
        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center mb-10">
          <span className="text-white font-bold">JX</span>
        </div>
        
        <nav className="flex-1 flex flex-col gap-6 items-center">
          {[
            { icon: <MessageSquare size={20} />, active: true },
            { icon: <Users size={20} /> },
            { icon: <Briefcase size={20} /> },
            { icon: <User size={20} /> },
          ].map((item, index) => (
            <button 
              key={index} 
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                item.active 
                  ? 'bg-teal-50 text-teal-600' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto flex flex-col gap-6 items-center">
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50">
            <HelpCircle size={20} />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50">
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="ml-20 flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 bg-white h-screen">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl">Conversations</h2>
              <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                <Bell size={18} />
              </button>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search conversations" 
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-md text-sm focus:outline-none"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <button className="flex items-center gap-1 text-sm text-gray-600">
                <Filter size={14} />
                <span>Filter</span>
                <ChevronDown size={14} />
              </button>
              <select className="text-sm border rounded px-2 py-1 bg-white">
                <option>Recent</option>
                <option>Unread</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-auto h-[calc(100vh-145px)]">
            {[
              { name: 'Ganesh Kumar', role: 'Frontend Developer', unread: 2, time: '2h ago', active: true },
              { name: 'Priya Sharma', role: 'UX Designer', unread: 1, time: '5h ago' },
              { name: 'Raj Singh', role: 'React Developer', time: 'Yesterday' },
              { name: 'Neha Verma', role: 'Product Manager', time: 'Yesterday' },
              { name: 'Vikram Joshi', role: 'Backend Developer', time: '2 days ago' },
              { name: 'Ananya Das', role: 'Marketing Specialist', time: '3 days ago' },
              { name: 'Rahul Gupta', role: 'Sales Director', time: '4 days ago' },
              { name: 'Sneha Patel', role: 'HR Manager', time: '1 week ago' },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-4 border-b border-gray-100 cursor-pointer ${
                  item.active ? 'bg-teal-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{item.role}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                    Qualified
                  </span>
                  {item.unread && (
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs">
                      {item.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-screen">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button className="md:hidden w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="font-medium">Ganesh Kumar</h2>
                <p className="text-sm text-gray-500">Frontend Developer</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <User size={16} />
              </button>
              <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm">
                Schedule Interview
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-auto bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <div className="text-center text-sm text-gray-500 mb-6">Today</div>
              
              <div className="bg-white p-3 rounded-lg rounded-tl-none w-3/4 mb-4 shadow-sm">
                <p className="text-gray-800">Hello! I'm interested in the Frontend Developer position at your company.</p>
                <p className="text-xs text-gray-400 text-right mt-1">10:30 AM</p>
              </div>
              
              <div className="bg-teal-50 p-3 rounded-lg rounded-tr-none w-3/4 ml-auto mb-4 shadow-sm">
                <p className="text-gray-800">Hi Ganesh! Thanks for your interest. Your profile looks impressive. Could you tell me more about your experience with React?</p>
                <p className="text-xs text-gray-400 text-right mt-1">10:32 AM</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg rounded-tl-none w-3/4 mb-4 shadow-sm">
                <p className="text-gray-800">I've been working with React for 3 years now. I've built several complex applications using React, Redux, and TypeScript. I'm also familiar with Next.js and have experience with responsive design and accessibility.</p>
                <p className="text-xs text-gray-400 text-right mt-1">10:35 AM</p>
              </div>
              
              <div className="bg-teal-50 p-3 rounded-lg rounded-tr-none w-3/4 ml-auto mb-4 shadow-sm">
                <p className="text-gray-800">That sounds great! We're looking for someone with exactly those skills. Would you be available for a technical interview next week?</p>
                <p className="text-xs text-gray-400 text-right mt-1">10:38 AM</p>
              </div>
              
              <div className="bg-white p-3 rounded-lg rounded-tl-none w-3/4 mb-4 shadow-sm">
                <p className="text-gray-800">Yes, I'm available next week. Monday or Wednesday would work best for me.</p>
                <p className="text-xs text-gray-400 text-right mt-1">10:40 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="max-w-3xl mx-auto flex">
              <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-teal-500"
              />
              <button className="px-6 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalPage;