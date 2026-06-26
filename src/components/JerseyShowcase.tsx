import React from 'react';
import { Jersey } from '../types';
import { Shirt, ArrowLeftRight, Sparkles, Award, ShoppingBag, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JerseyShowcaseProps {
  jerseys: Jersey[];
}

export const JerseyShowcase: React.FC<JerseyShowcaseProps> = ({ jerseys }) => {
  const [selectedJersey, setSelectedJersey] = React.useState<Jersey>(jerseys[0] || null);
  const [viewMode, setViewMode] = React.useState<'front' | 'back'>('front');
  const [customName, setCustomName] = React.useState<string>('RECRUIT');
  const [customNumber, setCustomNumber] = React.useState<string>('07');
  const [renderMode, setRenderMode] = React.useState<'vector' | 'photo'>('photo');

  React.useEffect(() => {
    if (jerseys.length > 0 && !selectedJersey) {
      setSelectedJersey(jerseys[0]);
    }
  }, [jerseys, selectedJersey]);

  // If selectedJersey id changes, we keep it synchronized
  const activeJersey = jerseys.find(j => j.id === selectedJersey?.id) || selectedJersey;

  React.useEffect(() => {
    if (activeJersey) {
      setRenderMode(activeJersey.photos && activeJersey.photos.length > 0 ? 'photo' : 'vector');
    }
  }, [activeJersey]);

  return (
    <section id="jersey" className="py-24 bg-[#0a0a0c] text-white relative border-t border-dark-border select-none">
      <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // OFFICIAL MERCHANDISE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            OUR BRANDED <span className="text-brand-red">ARMOR</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Engineered for high performance, styled to represent our community pride. Choose a product and test your name.
          </p>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        {activeJersey && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Interactive Vector Jersey Renderer (Left Column - 6/12) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              
              {/* Jersey Container with Glowing Border */}
              <div className="relative w-full max-w-sm h-[400px] sm:h-[450px] bg-dark-bg border border-dark-border rounded-xl p-8 flex flex-col items-center justify-center overflow-hidden glow-box-red group">
                {/* Tech Grids */}
                <div className="absolute inset-0 gaming-grid opacity-10 pointer-events-none" />
                
                {/* Product Limited Badge */}
                {activeJersey.isLimited && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-brand-red/20 border border-brand-red/40 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-brand-red uppercase shadow-[0_0_8px_rgba(255,0,60,0.2)]">
                    <Sparkles className="w-3 h-3 animate-spin" />
                    <span>LTD Design</span>
                  </div>
                )}

                {/* Perspective View Selector Toggle */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setViewMode(viewMode === 'front' ? 'back' : 'front')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-card border border-dark-border hover:border-brand-red/40 rounded text-xs font-display font-bold tracking-wider text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-brand-red" />
                    <span>{viewMode === 'front' ? 'FRONT VIEW' : 'BACK VIEW'}</span>
                  </button>
                </div>

                {/* RENDER CONTENT CONTAINER */}
                <div className="w-full h-full flex items-center justify-center max-w-[280px]">
                  <AnimatePresence mode="wait">
                    {renderMode === 'photo' && activeJersey.photos && activeJersey.photos.length > 0 ? (
                      <motion.div
                        key={`photo-${viewMode}-${activeJersey.id}`}
                        initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={viewMode === 'front' ? activeJersey.photos[0] : (activeJersey.photos[1] || activeJersey.photos[0])}
                          alt={`${activeJersey.name} ${viewMode} view`}
                          className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(255,0,60,0.25)] rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`vector-${viewMode}-${activeJersey.id}`}
                        initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <svg
                          viewBox="0 0 300 350"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                        >
                          {/* Main Jersey Shirt Silhouette Polygon */}
                          <path
                            d="M 60 50 
                               L 100 20 
                               L 200 20 
                               L 240 50 
                               L 280 80 
                               L 250 140 
                               L 220 120 
                               L 220 330 
                               L 80 330 
                               L 80 120 
                               L 50 140 
                               L 20 80 Z"
                            fill="#0e0e11"
                            stroke={activeJersey.isLimited ? '#ff003c' : '#2a2a30'}
                            strokeWidth="4"
                            strokeLinejoin="round"
                          />

                          {/* Left/Right Collar Ribbing Accent */}
                          <path
                            d="M 100 20 Q 150 45 200 20 L 190 25 Q 150 48 110 25 Z"
                            fill={activeJersey.isLimited ? '#ff003c' : '#2a2a30'}
                          />

                          {/* Shoulder & Side Stripes Slash design */}
                          <path
                            d="M 20 80 L 50 140 L 70 125 L 40 80 Z"
                            fill="rgba(255,0,60,0.2)"
                          />
                          <path
                            d="M 280 80 L 250 140 L 230 125 L 260 80 Z"
                            fill="rgba(255,0,60,0.2)"
                          />

                          {/* Neon red side lines styling */}
                          <path
                            d="M 80 150 L 95 330"
                            stroke="#ff003c"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M 220 150 L 205 330"
                            stroke="#ff003c"
                            strokeWidth="2.5"
                          />

                          {/* Chevron Center Slashes for Esports look */}
                          <path
                            d="M 100 130 L 150 170 L 200 130"
                            stroke="rgba(255,0,60,0.15)"
                            strokeWidth="10"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 90 190 L 150 230 L 210 190"
                            stroke="rgba(255,0,60,0.1)"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />

                          {/* Dynamic Graphic elements depending on Active View Front/Back */}
                          {viewMode === 'front' ? (
                            <>
                              {/* Chest Logo representation - Mini Raze emblem */}
                              <g transform="translate(115, 60) scale(0.24)">
                                {/* Mini styled R */}
                                <path
                                  d="M 40 40 L 120 40 L 90 80 L 60 80 L 120 150 L 80 150 Q 50 100 40 90 L 40 40 Z"
                                  fill="#ffffff"
                                />
                                {/* Mini styled E */}
                                <path
                                  d="M 110 40 L 190 40 L 180 65 L 140 65 L 135 80 L 175 80 L 170 105 L 130 105 L 125 125 L 195 125 L 185 150 L 110 150 Z"
                                  fill="#ff003c"
                                />
                              </g>

                              {/* Sponsor text placeholder on stomach */}
                              <text
                                x="150"
                                y="260"
                                fill="rgba(255,255,255,0.4)"
                                fontFamily="monospace"
                                fontSize="13"
                                fontWeight="bold"
                                letterSpacing="4"
                                textAnchor="middle"
                              >
                                RAZE ELITE
                              </text>
                              <text
                                x="150"
                                y="280"
                                fill="#ff003c"
                                fontFamily="monospace"
                                fontSize="9"
                                fontWeight="bold"
                                letterSpacing="2"
                                textAnchor="middle"
                              >
                                // SPECIAL FORCES
                              </text>
                            </>
                          ) : (
                            <>
                              {/* BACK VIEW: Render custom member name and number input */}
                              <text
                                x="150"
                                y="100"
                                fill="#ffffff"
                                fontFamily="Space Grotesk, sans-serif"
                                fontSize="22"
                                fontWeight="900"
                                letterSpacing="3"
                                textAnchor="middle"
                              >
                                {customName.trim().toUpperCase() || 'MEMBER'}
                              </text>

                              {/* Large custom squad number */}
                              <text
                                x="150"
                                y="210"
                                fill="#ff003c"
                                fontFamily="Space Grotesk, sans-serif"
                                fontSize="86"
                                fontWeight="900"
                                letterSpacing="1"
                                textAnchor="middle"
                                className="glow-text-red"
                              >
                                {customNumber.trim().substring(0, 2) || '00'}
                              </text>

                              {/* Guild Tag Footer */}
                              <text
                                x="150"
                                y="290"
                                fill="rgba(255,255,255,0.25)"
                                fontFamily="monospace"
                                fontSize="11"
                                fontWeight="bold"
                                letterSpacing="1"
                                textAnchor="middle"
                              >
                                BOOYAH GUILD MEMBER
                              </text>
                            </>
                          )}
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Render Mode Selectors (Floating Pill at bottom-left) */}
                {activeJersey.photos && activeJersey.photos.length > 0 && (
                  <div className="absolute bottom-3 left-4 z-10 flex bg-dark-card border border-dark-border p-1 rounded-lg">
                    <button
                      onClick={() => setRenderMode('photo')}
                      className={`px-3 py-1 rounded text-[9px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        renderMode === 'photo'
                          ? 'bg-brand-red text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      REAL
                    </button>
                    <button
                      onClick={() => setRenderMode('vector')}
                      className={`px-3 py-1 rounded text-[9px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        renderMode === 'vector'
                          ? 'bg-brand-red text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      VECTOR
                    </button>
                  </div>
                )}

                {/* Visual Label Indicator */}
                <div className="absolute bottom-3.5 right-4 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                  Showing {viewMode === 'front' ? 'Front' : 'Back'} ({renderMode.toUpperCase()})
                </div>
              </div>

              {/* Real-time customizer playground inputs */}
              <div className="mt-6 bg-[#0e0e11] border border-dark-border p-4 rounded-lg w-full max-w-sm">
                <span className="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3 text-center">
                  🛠️ LIVE JERSEY CUSTOMIZER PLAYGROUND
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] text-gray-400 font-mono uppercase mb-1">Squad Name</label>
                    <input
                      type="text"
                      maxLength={12}
                      value={customName}
                      onChange={(e) => {
                        setCustomName(e.target.value);
                        setViewMode('back'); // Force flip to back to see change!
                      }}
                      placeholder="e.g. BLAZE"
                      className="w-full bg-dark-bg border border-dark-border focus:border-brand-red rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-mono uppercase mb-1">No.</label>
                    <input
                      type="text"
                      maxLength={2}
                      value={customNumber}
                      onChange={(e) => {
                        setCustomNumber(e.target.value.replace(/\D/g, ''));
                        setViewMode('back'); // Force flip to back to see change!
                      }}
                      placeholder="07"
                      className="w-full bg-dark-bg border border-dark-border focus:border-brand-red rounded px-2.5 py-1 text-xs font-mono text-white focus:outline-none text-center"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Jersey Information & Catalogue Selector (Right Column - 6/12) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Product Selector Carousel Buttons */}
              <div className="flex gap-4 mb-8">
                {jerseys.map((jersey) => (
                  <button
                    key={jersey.id}
                    onClick={() => {
                      setSelectedJersey(jersey);
                      setViewMode('front');
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md border text-xs font-display font-bold tracking-widest uppercase transition-all cursor-pointer ${
                      activeJersey.id === jersey.id
                        ? 'bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(255,0,60,0.3)]'
                        : 'bg-[#0e0e11] border-dark-border text-gray-400 hover:border-brand-red/30 hover:text-white'
                    }`}
                  >
                    <Shirt className="w-4 h-4" />
                    <span>{jersey.name.includes('Jersey') ? 'PRO JERSEY' : 'HOODIE'}</span>
                  </button>
                ))}
              </div>

              {/* Catalogue Info Sheet */}
              <div className="bg-[#0e0e11] border border-dark-border p-8 rounded-lg relative overflow-hidden shadow-2xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white">
                    {activeJersey.name}
                  </h3>
                  <span className="font-mono text-xs font-bold text-brand-red bg-brand-red/10 border border-brand-red/30 px-3 py-1 rounded tracking-wider uppercase">
                    OFFICIAL GEAR
                  </span>
                </div>

                <p className="font-sans text-gray-400 text-sm leading-relaxed mb-6">
                  {activeJersey.description}
                </p>

                {/* Jersey History Block */}
                <div className="border-t border-dark-border pt-6 mt-6 space-y-4">
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest text-brand-red flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>JERSEY BATTLE HISTORY</span>
                  </h4>
                  <div className="bg-dark-bg/60 p-4 rounded border border-dark-border text-xs font-sans text-gray-300 leading-relaxed italic">
                    "{activeJersey.history}"
                  </div>
                </div>

                {/* Media Showcase (Photos and Videos) */}
                {((activeJersey.photos && activeJersey.photos.length > 0) || (activeJersey.videos && activeJersey.videos.length > 0)) && (
                  <div className="border-t border-dark-border pt-6 mt-6 space-y-4">
                    <h4 className="font-display text-xs font-bold uppercase tracking-widest text-brand-red flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>MEDIA GALLERY ({ (activeJersey.photos?.length || 0) + (activeJersey.videos?.length || 0) })</span>
                    </h4>
                    
                    {/* Media grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {activeJersey.photos?.map((photo, index) => (
                        <div key={index} className="relative aspect-video bg-[#0c0c0f] border border-dark-border rounded-lg overflow-hidden group/media">
                          <img
                            src={photo}
                            alt={`${activeJersey.name} custom photo ${index + 1}`}
                            className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1.5 left-1.5 bg-black/70 border border-white/10 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide uppercase pointer-events-none">
                            PHOTO
                          </span>
                        </div>
                      ))}

                      {activeJersey.videos?.map((video, index) => {
                        // Extract youtube id if it is a youtube link
                        const isYouTube = video.includes('youtube.com') || video.includes('youtu.be');
                        let embedUrl = video;
                        if (isYouTube) {
                          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                          const match = video.match(regExp);
                          if (match && match[2].length === 11) {
                            embedUrl = `https://www.youtube.com/embed/${match[2]}`;
                          }
                        }

                        return (
                          <div key={index} className="relative aspect-video bg-[#0c0c0f] border border-dark-border rounded-lg overflow-hidden group/media col-span-2 sm:col-span-1">
                            {isYouTube ? (
                              <iframe
                                src={embedUrl}
                                title={`${activeJersey.name} custom video ${index + 1}`}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={video}
                                controls
                                className="w-full h-full object-cover"
                              />
                            )}
                            <span className="absolute top-1.5 left-1.5 bg-brand-red/90 text-white border border-brand-red/10 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide uppercase pointer-events-none">
                              VIDEO
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Merch Availability CTA */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 text-center sm:text-left text-xs font-mono text-gray-500">
                    * This tactical armor is custom-designed and strictly reserved for RAZE ELITE active roster players, crew members, and registered recruits. It is not available for public purchase.
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
