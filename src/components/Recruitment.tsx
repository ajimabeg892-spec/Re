import React from 'react';
import { PlayerRole, RecruitmentApplication } from '../types';
import { ClipboardList, Users, ShieldAlert, CheckCircle2, ChevronRight, Send, Medal, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecruitmentProps {
  onAddApplication: (app: Omit<RecruitmentApplication, 'id' | 'status' | 'submittedAt'>) => void;
}

export const Recruitment: React.FC<RecruitmentProps> = ({ onAddApplication }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    ign: '',
    uid: '',
    age: 18,
    role: 'Rusher' as PlayerRole,
    previousTeam: '',
    contact: '',
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Submit Form',
      desc: 'Fill out your core gamer credentials and social info.',
      color: 'border-amber-500/30 text-amber-500 bg-amber-500/10'
    },
    {
      num: '02',
      title: 'Trial Match',
      desc: 'Participate in high-tier custom scrims monitored by our Analyst/Coach.',
      color: 'border-sky-500/30 text-sky-500 bg-sky-500/10'
    },
    {
      num: '03',
      title: 'Performance Review',
      desc: 'Our staff reviews your combat metrics, team communications, and safety play.',
      color: 'border-purple-500/30 text-purple-500 bg-purple-500/10'
    },
    {
      num: '04',
      title: 'Join The Guild',
      desc: 'Welcome to the legacy. Sign official terms and get customized banners & jerseys.',
      color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validations
    if (!formData.name.trim() || !formData.ign.trim() || !formData.uid.trim() || !formData.contact.trim()) {
      setError('Please fill in all required fields (Real Name, IGN, UID, and Contact details).');
      return;
    }

    if (formData.uid.replace(/\D/g, '').length < 6) {
      setError('Please provide a valid Free Fire Game UID (numbers only, at least 6 digits).');
      return;
    }

    if (formData.age < 12 || formData.age > 45) {
      setError('Recruits must be between 12 and 45 years of age.');
      return;
    }

    // Submit to parent state
    onAddApplication({
      name: formData.name.trim(),
      ign: formData.ign.trim(),
      uid: formData.uid.trim(),
      age: Number(formData.age),
      role: formData.role,
      previousTeam: formData.previousTeam.trim() || 'None',
      contact: formData.contact.trim(),
    });

    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      ign: '',
      uid: '',
      age: 18,
      role: 'Rusher',
      previousTeam: '',
      contact: '',
    });

    // Reset success banner after 8 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 8000);
  };

  return (
    <section id="recruitment" className="py-24 bg-dark-bg text-white relative border-t border-dark-border select-none">
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // JOIN RAZE ELITE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            GUILD RECRUITMENT <span className="text-brand-red">PORTAL</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Think you have what it takes to wear our logo and conquer South Asiacustom rooms? Fill the slot application.
          </p>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Recruitment pipeline (Left Column - 5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-brand-red" />
              <span>THE RECRUITMENT PATHWAY</span>
            </h3>

            {/* Steps Vertical Timeline */}
            <div className="space-y-6 relative before:absolute before:top-4 before:bottom-4 before:left-7 before:w-0.5 before:bg-dark-border">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  {/* Step Hex Circle */}
                  <div className={`w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center font-display text-lg font-extrabold border ${step.color} relative z-10 shadow-lg`}>
                    {step.num}
                  </div>
                  
                  {/* Step Description */}
                  <div className="flex-1 bg-[#0e0e11] border border-dark-border p-4 rounded-lg hover:border-brand-red/10 transition-colors">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed mt-1">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note about rules */}
            <div className="p-4 bg-brand-red/5 border border-brand-red/15 rounded-lg text-xs font-sans text-gray-400 leading-relaxed">
              <span className="font-bold text-brand-red block mb-1">📢 SQUAD REQUIREMENT NOTICE:</span>
              Candidates must provide correct, trackable Game ID (UID) codes. Trial matches are scheduled via WhatsApp/Discord contact details provided.
            </div>
          </div>

          {/* Interactive Recruitment Form (Right Column - 7/12) */}
          <div className="lg:col-span-7 bg-[#0e0e11] border border-dark-border p-8 rounded-lg relative overflow-hidden shadow-2xl">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-2xl pointer-events-none" />

            <h3 className="font-display text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-dark-border pb-4">
              <Gamepad2 className="w-5 h-5 text-brand-red" />
              <span>SQUAD CADET APPLICATION</span>
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
                    Application Logged Successfully!
                  </h4>
                  <p className="font-sans text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                    Your details have been registered into the RAZE ELITE secure database. Our Manager or Owner will review your profile and contact you for upcoming trial custom matches!
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2 bg-dark-bg hover:bg-brand-red/15 border border-dark-border hover:border-brand-red/40 rounded font-display text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    Submit Another Profile
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 bg-brand-red/10 border border-brand-red/20 rounded text-xs font-sans text-brand-red">
                      {error}
                    </div>
                  )}

                  {/* Row 1: Real Name & In-Game Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Real Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aman Sharma"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        In-Game Name (IGN) <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.ign}
                        onChange={(e) => setFormData({ ...formData, ign: e.target.value })}
                        placeholder="e.g. RAZE・OP_VIPER"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: UID & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Free Fire Game UID <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.uid}
                        onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                        placeholder="e.g. 524910384"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Age <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={60}
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                        placeholder="18"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Role Preference & Previous Guild */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Combat Specialization <span className="text-brand-red">*</span>
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as PlayerRole })}
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                      >
                        <option value="IGL">IGL (In-Game Leader)</option>
                        <option value="Rusher">Rusher (Frontline Fragger)</option>
                        <option value="Sniper">Sniper (Long-Range Sentinel)</option>
                        <option value="Support">Support / Healer / Flanker</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                        Previous Guild / Team name
                      </label>
                      <input
                        type="text"
                        value={formData.previousTeam}
                        onChange={(e) => setFormData({ ...formData, previousTeam: e.target.value })}
                        placeholder="Leave blank if None"
                        className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: WhatsApp Number / Discord Tag */}
                  <div>
                    <label className="block text-xs text-gray-400 font-mono uppercase mb-1.5 font-bold">
                      WhatsApp Number / Discord Tag <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="e.g. +91 99887 76655 or blaze#1234"
                      className="w-full bg-dark-bg border border-dark-border focus:border-brand-red/50 focus:ring-1 focus:ring-brand-red/30 rounded px-3 py-2.5 text-sm font-sans text-white focus:outline-none"
                      required
                    />
                  </div>

                  {/* Submission Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-brand-red text-white hover:bg-brand-red-hover py-3 px-6 rounded font-display font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,0,60,0.3)] hover:shadow-[0_0_20px_rgba(255,0,60,0.5)] cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Log Join Request</span>
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
