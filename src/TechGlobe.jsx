import React from 'react';
import { fullTechStack } from './portfolioData';

const TechGlobe = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center border-t border-b border-gray-900/50">
      
      {/* Dynamic Star Background effect can be simulated with small dots if needed, keeping it clean for now */}
      
      <div className="text-center mb-16 relative z-10 w-full">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-2">
          <span className="text-white">TECH</span> <span className="text-[#0ea5e9]">STACK</span>
        </h2>
        <div className="w-full max-w-[300px] h-px bg-gradient-to-r from-transparent via-[#0ea5e9]/50 to-transparent mx-auto"></div>
      </div>

      <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center my-12">
        
        {/* Background Wireframe Globe */}
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800 shadow-[0_0_50px_rgba(14,165,233,0.02)]"></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateX(75deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateX(75deg) rotateY(45deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateX(75deg) rotateY(90deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateX(75deg) rotateY(135deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateY(45deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateY(90deg)' }}></div>
        <div className="absolute inset-0 max-w-[80%] max-h-[80%] m-auto rounded-full border border-gray-800" style={{ transform: 'rotateY(135deg)' }}></div>

        {/* Inner Orbit Ring (Slow) */}
        <div className="absolute inset-0 max-w-[55%] max-h-[55%] m-auto rounded-full border border-[#0ea5e9]/20 animate-spin-slow">
          {fullTechStack.slice(0, 5).map((tech, i, arr) => {
            const angle = (i * 360) / arr.length;
            const left = 50 + 50 * Math.cos((angle - 90) * Math.PI / 180);
            const top = 50 + 50 * Math.sin((angle - 90) * Math.PI / 180);
            return (
              <div 
                key={tech.name} 
                className="absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="animate-spin-reverse-slow flex flex-col items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0a0a0a] border border-[#0ea5e9]/40 rounded-full p-2.5 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-md">
                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-300 font-medium mt-2 tracking-wide">{tech.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer Orbit Ring (Slower) */}
        <div className="absolute inset-0 max-w-[90%] max-h-[90%] m-auto rounded-full border border-[#0ea5e9]/10 animate-spin-slower">
          {fullTechStack.slice(5).map((tech, i, arr) => {
            const angle = (i * 360) / arr.length;
            const left = 50 + 50 * Math.cos((angle - 90) * Math.PI / 180);
            const top = 50 + 50 * Math.sin((angle - 90) * Math.PI / 180);
            return (
              <div 
                key={tech.name} 
                className="absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className="animate-spin-reverse-slower flex flex-col items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0a0a0a] border border-gray-700/80 rounded-full p-2.5 flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.8)] backdrop-blur-md hover:border-[#0ea5e9]/50 transition-colors">
                    <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 font-medium mt-2 tracking-wide">{tech.name}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center Logo Hub */}
        <div className="absolute z-20 flex flex-col items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#0a0a0a] to-gray-900 border border-[#0ea5e9]/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.3)]">
             <span className="text-xl md:text-2xl font-black text-white tracking-tighter">EF<span className="text-[#0ea5e9]">.</span></span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechGlobe;
