import React from 'react';
import { ManagementMember, ContactConfig } from '../types';
import { Shield, Mail, Phone, Users, FileText, Heart, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface ManagementProps {
  members: ManagementMember[];
  config: ContactConfig;
}

export const Management: React.FC<ManagementProps> = ({ members, config }) => {
  return (
    <section id="management" className="py-24 bg-[#0a0a0c] text-white relative border-t border-dark-border select-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // ORG COMMANDERS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            TEAM MANAGEMENT & <span className="text-brand-red">FOUNDERS</span>
          </h2>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        {/* Top Split: Owner Details & Org Summary */}
        <div className="bg-[#0e0e11] border border-dark-border p-8 rounded-lg mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-2 h-full bg-brand-red" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Legal / Founder Specs */}
            <div className="space-y-4 lg:border-r border-dark-border lg:pr-8">
              <span className="font-mono text-[10px] text-brand-red font-bold tracking-widest uppercase block">
                // SQUAD FOUNDATION
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-red" />
                <span>RAZE ELITE COMMAND</span>
              </h3>
              <div className="space-y-2 text-xs font-sans text-gray-400">
                <p>
                  <strong className="text-white">Founder:</strong> {config.founderName}
                </p>
                <p>
                  <strong className="text-white">Owner details:</strong> {config.ownerDetails}
                </p>
              </div>
            </div>

            {/* Organization story recap */}
            <div className="lg:col-span-2 space-y-3">
              <span className="font-mono text-[10px] text-gray-500 font-bold tracking-widest uppercase block">
                // EXECUTIVE STORY
              </span>
              <p className="font-sans text-sm text-gray-300 leading-relaxed italic">
                "{config.orgStory}"
              </p>
            </div>

          </div>
        </div>

        {/* Management Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-[#0e0e11] border border-dark-border hover:border-brand-red/30 rounded-lg overflow-hidden flex flex-col justify-between group transition-all"
            >
              {/* Profile Background Graphics */}
              <div className="h-28 bg-gradient-to-r from-brand-red/20 to-black/80 flex items-center justify-center relative p-4">
                <div className="absolute inset-0 gaming-grid opacity-10" />
                <span className="font-display text-4xl font-black text-white/5 uppercase select-none tracking-tight">
                  {member.role}
                </span>
              </div>

              {/* Avatar Monogram Frame overlapping */}
              <div className="px-6 -mt-10 relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#121216] border-2 border-brand-red/30 flex items-center justify-center font-display text-2xl font-bold text-white shadow-xl">
                  {member.name.replace('RAZE・', '').substring(0, 2).toUpperCase()}
                </div>
                
                <div className="mt-3">
                  <h4 className="font-display text-base font-extrabold text-white uppercase tracking-wide">
                    {member.name}
                  </h4>
                  <span className="font-mono text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded border border-brand-red/20 mt-1 inline-block uppercase">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio & Contacts */}
              <div className="p-6 text-center space-y-4">
                <p className="font-sans text-xs text-gray-400 leading-relaxed min-h-[72px]">
                  {member.bio}
                </p>

                {/* Contact Badge */}
                <div className="pt-4 border-t border-dark-border flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
                  <Mail className="w-3.5 h-3.5 text-brand-red" />
                  <span className="truncate max-w-[150px]">{member.contact}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
