import React from 'react';
import { ContactConfig } from '../types';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, HelpCircle, Instagram, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromotionContactProps {
  config: ContactConfig;
  onAddProposal?: (proposal: any) => void;
}

export const PromotionContact: React.FC<PromotionContactProps> = ({ config, onAddProposal }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    whatsapp: '',
    discordId: '',
    email: '',
    message: '',
    type: 'Tournament Invite',
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, WhatsApp number, Email, and message proposal).');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Trigger parent if passed
    if (onAddProposal) {
      onAddProposal({
        id: Math.random().toString(),
        submittedAt: new Date().toLocaleDateString(),
        ...formData
      });
    }

    setSubmitted(true);
    setFormData({
      name: '',
      whatsapp: '',
      discordId: '',
      email: '',
      message: '',
      type: 'Tournament Invite',
    });

    // Reset success banner after 8s
    setTimeout(() => {
      setSubmitted(false);
    }, 8000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0c] text-white relative border-t border-dark-border select-none">
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-brand-red/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // COLLABORATIONS & INVITES
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            PROMOTION & <span className="text-brand-red">INVITATIONS</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Organizing a tournament, booking custom match rooms, or seeking a brand sponsorship? Connect with our Managers.
          </p>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Details & Contact Specs (Left Column - 5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0e0e11] border border-dark-border p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-3 border-b border-dark-border pb-4">
                <ShieldCheck className="w-5 h-5 text-brand-red" />
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                  HQ COMMAND CONTACT
                </h3>
              </div>

              {/* Direct channels */}
              <div className="space-y-4 font-sans text-sm text-gray-300">
                <p className="leading-relaxed text-xs text-gray-400">
                  You can reach out directly to our Managers and Owners via any of the official handles below for immediate slot booking or scrim inquiries.
                </p>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-dark-bg border border-dark-border rounded hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded group-hover:bg-emerald-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">WhatsApp Hot-Line</span>
                    <span className="font-mono text-white text-sm font-semibold group-hover:text-emerald-400 transition-colors">{config.whatsapp}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Discord */}
                <a
                  href={config.discordId.startsWith('http') ? config.discordId : 'https://discord.gg/GTNeDDJc2'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 bg-dark-bg border border-dark-border rounded hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded group-hover:bg-indigo-500/20 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">Official Discord Link</span>
                    <span className="font-mono text-white text-sm font-semibold group-hover:text-indigo-400 transition-colors">RAZE ELITE Server</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                </a>

                {/* Instagram */}
                {config.instagramLink && (
                  <a
                    href={config.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 bg-dark-bg border border-dark-border rounded hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group cursor-pointer"
                  >
                    <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded group-hover:bg-pink-500/20 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">Official Instagram</span>
                      <span className="font-mono text-white text-sm font-semibold group-hover:text-pink-400 transition-colors">@official.razeelite</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-pink-400 transition-colors" />
                  </a>
                )}

                {/* Email */}
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-4 p-3 bg-dark-bg border border-dark-border rounded hover:border-brand-red/50 hover:bg-brand-red/5 transition-all group cursor-pointer"
                >
                  <div className="p-2 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded group-hover:bg-brand-red/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-mono text-gray-500 uppercase">Executive Email</span>
                    <span className="font-mono text-white text-sm font-semibold group-hover:text-brand-red transition-colors">{config.email}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-brand-red transition-colors" />
                </a>
              </div>

              {/* Note about responses */}
              <div className="pt-4 border-t border-dark-border text-center text-xs text-gray-500">
                ⚡ Typical response window is under 12 hours.
              </div>

            </div>
          </div>

          {/* proposal form (Right Column - 7/12) */}
          <div className="lg:col-span-7 bg-[#0e0e11] border border-dark-border p-8 rounded-lg relative overflow-hidden shadow-2xl">
            {/* Design Deco */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-2xl pointer-events-none" />

            <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-dark-border pb-4">
              <Mail className="w-5 h-5 text-brand-red" />
              <span>SUBMIT COLLABORATION PROPOSAL</span>
            </h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                    Proposal Logged Successfully!
                  </h4>
                  <p className="font-sans text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Your invitation details have been saved. Our media coordinator will contact you via WhatsApp, Discord, or Email to complete the details! Thank you for choosing RAZE ELITE.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2 bg-dark-bg hover:bg-brand-red/15 border border-dark-border hover:border-brand-red/40 rounded font-display text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Send Another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded text-xs font-sans text-brand-red">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Proposal Category type */}
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Proposal Category <span className="text-brand-red">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                      >
                        <option value="Tournament Invite">Tournament Invite</option>
                        <option value="Sponsorship Offer">Sponsorship Offer</option>
                        <option value="Match Scrim Slot">Match Scrim Slot Invite</option>
                        <option value="Apparel Collab">Apparel & Merch Collab</option>
                        <option value="Other Cooperation">General Cooperation</option>
                      </select>
                    </div>

                    {/* Sender Name */}
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Organization / Your Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Esports South Asia"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* WhatsApp */}
                    <div className="sm:col-span-1">
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        WhatsApp Number <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+91 99887 76655"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>

                    {/* Discord ID */}
                    <div className="sm:col-span-1">
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Discord ID
                      </label>
                      <input
                        type="text"
                        value={formData.discordId}
                        onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                        placeholder="organizer#5512"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-1">
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="admin@scrims.org"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Message proposal details */}
                  <div>
                    <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                      Proposal Details <span className="text-brand-red">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please details dates, custom prizes, requirements, rules, etc."
                      className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red-hover py-3 px-6 rounded font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,0,60,0.3)] hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch Proposal</span>
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
