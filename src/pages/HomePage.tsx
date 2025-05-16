import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import WhatsAppRedirect from '../components/WhatsAppRedirect';
import { CheckCircle, MessageSquare, Users, BarChart3 } from 'lucide-react';

const WhatsAppChatPreview: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[400px] h-[80%] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform rotate-1">
      <div className="bg-teal-600 text-white p-3 flex items-center gap-3">
        <div className="rounded-full w-10 h-10 bg-white/20 flex items-center justify-center">
          <span className="font-semibold">JX</span>
        </div>
        <div>
          <h3 className="font-medium">JobX AI Assistant</h3>
        </div>
      </div>
      
      <div className="bg-[#e5ded8] p-4 h-[calc(100%-64px)] overflow-auto">
        <div className="bg-white p-3 rounded-lg rounded-tl-none w-4/5 mb-3 shadow-sm">
          <p className="text-gray-700">Hello! Welcome to JobX. I'm your AI assistant. How can I help you today?</p>
          <p className="text-xs text-gray-500 text-right">11:45</p>
        </div>
        
        <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tr-none w-4/5 ml-auto mb-3 shadow-sm">
          <p className="text-gray-700">Hi! I'm looking for a software developer role. Can you help?</p>
          <p className="text-xs text-gray-500 text-right">11:46</p>
        </div>
        
        <div className="bg-white p-3 rounded-lg rounded-tl-none w-4/5 mb-3 shadow-sm">
          <p className="text-gray-700">I've found several matching positions! Let me share the best ones with you...</p>
          <p className="text-xs text-gray-500 text-right">11:48</p>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 px-6 md:px-12 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How JobX Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <MessageSquare className="text-teal-600" size={28} />,
                  title: "Connect via WhatsApp",
                  description: "Simply click the button and start chatting with our AI-powered job assistant on WhatsApp."
                },
                {
                  icon: <CheckCircle className="text-teal-600" size={28} />,
                  title: "Share Your Requirements",
                  description: "Tell us what you're looking for in a job or candidate, and our AI will handle the matching."
                },
                {
                  icon: <Users className="text-teal-600" size={28} />,
                  title: "Get Matched",
                  description: "Receive personalized job suggestions or candidate recommendations based on your criteria."
                },
                {
                  icon: <BarChart3 className="text-teal-600" size={28} />,
                  title: "Track Progress",
                  description: "Monitor applications, interviews, and hiring process all through a familiar chat interface."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience AI-Powered Job Matching</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Our WhatsApp integration makes job searching and recruitment as simple as sending a message.
              </p>
              <div className="md:hidden">
                <WhatsAppChatPreview />
              </div>
            </div>
            <div className="hidden md:block w-full md:w-1/2">
              <WhatsAppChatPreview />
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your hiring process?</h2>
            <p className="text-slate-300 mb-10 max-w-3xl mx-auto text-lg">
              Join thousands of companies and job seekers who are already using JobX to simplify their recruitment journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppRedirect
                type="job"
                className="px-8 py-4 bg-teal-600 text-white rounded-md text-lg font-semibold hover:bg-teal-500 transition-all"
              >
                I'm looking for a job
              </WhatsAppRedirect>
              <WhatsAppRedirect
                type="talent"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md text-lg font-semibold hover:bg-white/10 transition-all"
              >
                I'm looking for talent
              </WhatsAppRedirect>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;