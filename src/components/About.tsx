import React from 'react';
import { Target, Flag, Rocket, Swords, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  orgStory: string;
}

export const About: React.FC<AboutProps> = ({ orgStory }) => {
  return (
    <section id="about" className="py-24 bg-dark-bg text-white relative border-t border-dark-border select-none">
      <div className="absolute top-1/2 left-10 w-[200px] h-[200px] bg-brand-red/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // WHO WE ARE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            ABOUT RAZE <span className="text-brand-red">ELITE</span>
          </h2>
          <div className="h-1 w-24 bg-brand-red mt-4 rounded-full" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story (Left Column - 7/12 wide) */}
          <div className="lg:col-span-7 bg-[#0b0b0d] border border-dark-border p-8 rounded-lg relative overflow-hidden shadow-2xl group hover:border-brand-red/20 transition-all duration-300">
            {/* Corner Decorative Esports Slashes */}
            <div className="absolute top-0 right-0 w-16 h-1 bg-brand-red" />
            <div className="absolute top-0 right-0 w-1 h-16 bg-brand-red" />
            
            <Quote className="w-10 h-10 text-brand-red/20 absolute bottom-6 right-6" />

            <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5 text-brand-red" />
              <span>Our Journey & Roots</span>
            </h3>

            <p className="font-sans text-gray-300 text-base leading-relaxed mb-6 whitespace-pre-line">
              {orgStory}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dark-border">
              <div>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Est. Year</span>
                <p className="font-display text-lg font-bold text-white">Late 2025</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Base Arena</span>
                <p className="font-display text-lg font-bold text-white">South Asia / India</p>
              </div>
            </div>
          </div>

          {/* Goals & Future (Right Column - 5/12 wide) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Our Goals */}
            <div className="bg-[#0b0b0d] border border-dark-border p-6 rounded-lg relative group hover:border-brand-red/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-red/10 border border-brand-red/20 rounded text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">
                    Our Competitive Goals
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400 font-sans">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Qualify and break into official Tier-1 Free Fire pro circuits.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Build a community of 10K+ dedicated guild supporters.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Maintain a consistent top-tier rank in weekly elite scrims.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2: Future Plans */}
            <div className="bg-[#0b0b0d] border border-dark-border p-6 rounded-lg relative group hover:border-brand-red/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-red/10 border border-brand-red/20 rounded text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white mb-2">
                    Future Roadmap
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400 font-sans">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Launch official team merchandise and limited apparel collaborations.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Secure permanent sponsors to fund bootcamp housing.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                      Diversify content creation with live streamers and caster hosts.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quote of the Team */}
            <div className="p-6 border border-dashed border-brand-red/30 rounded-lg bg-brand-red/5 flex items-center gap-4 text-center justify-center">
              <p className="font-display text-sm font-bold tracking-widest text-brand-red uppercase">
                "WE DO NOT LURK IN THE SHADOWS. WE RAZE THEM."
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
