import React from 'react';
import { Achievement } from '../types';
import { Trophy, Calendar, Sparkles, Award, Star, ShieldCheck, Heart, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  // Mock Team Memories Gallery Data
  const memories = [
    {
      title: "First Official Booyah",
      category: "Scrims",
      desc: "Wiped 3 pro lineups in the final circle of Kalahari map.",
      badge: "LOBBY HIGHLIGHT"
    },
    {
      title: "10K YouTube Subscribers",
      category: "Milestone",
      desc: "Our community continues to fuel the fire. Legacy is growing.",
      badge: "COMMUNITY"
    },
    {
      title: "Viper Clutch 1v3",
      category: "Clip",
      desc: "Epic final map revival during Guild Bash championship map.",
      badge: "CLUTCH MEMORY"
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-dark-bg text-white relative border-t border-dark-border select-none">
      <div className="absolute top-1/2 right-10 w-[200px] h-[200px] bg-brand-red/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-red uppercase">
            // OUR HALL OF FAME
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mt-1">
            TROPHIES & <span className="text-brand-red">MEMORIES</span>
          </h2>
          <p className="font-sans text-sm text-gray-500 mt-2 max-w-md mx-auto">
            The blood, sweat, and clutch final zones that have carved our name into the competitive history boards.
          </p>
          <div className="h-1 w-24 bg-brand-red mt-4 mx-auto rounded-full" />
        </div>

        {/* Grid: Trophies Hall (Left) & Memories Gallery (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Trophies Column (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-brand-red" />
              <span>CHAMPIONSHIPS & CERTIFICATIONS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => (
                <div
                  key={achievement.id}
                  className="bg-[#0e0e11] border border-dark-border hover:border-brand-red/20 p-5 rounded-lg flex flex-col gap-4 relative overflow-hidden group"
                >
                  <div className="flex gap-4">
                    {/* Hex-shaped visual helper */}
                    <div className="w-12 h-12 rounded bg-brand-red/10 border border-brand-red/20 flex-shrink-0 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                      <Award className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <span className="font-mono text-[9px] text-brand-red font-bold uppercase">
                        {achievement.position}
                      </span>
                      <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide mt-0.5 group-hover:text-brand-red transition-colors">
                        {achievement.title}
                      </h4>
                      <span className="font-mono text-[9px] text-gray-500 block mb-2">
                        {achievement.date}
                      </span>
                      <p className="font-sans text-xs text-gray-400 leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Media Showcase of Achievement */}
                  {((achievement.photos && achievement.photos.length > 0) || (achievement.videos && achievement.videos.length > 0)) && (
                    <div className="border-t border-dark-border/60 pt-4 mt-2 space-y-3">
                      <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
                        <span>EVENT MEDIA SHOWCASE ({ (achievement.photos?.length || 0) + (achievement.videos?.length || 0) })</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {achievement.photos?.map((photo, pIdx) => (
                          <div key={pIdx} className="relative aspect-video bg-[#0c0c0f] border border-dark-border rounded-md overflow-hidden group/ach-photo">
                            <img
                              src={photo}
                              alt={`${achievement.title} memory ${pIdx + 1}`}
                              className="w-full h-full object-cover group-hover/ach-photo:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-1 left-1 bg-black/75 border border-white/5 text-[7px] font-mono font-bold px-1 rounded uppercase pointer-events-none text-gray-300">
                              PHOTO
                            </span>
                          </div>
                        ))}

                        {achievement.videos?.map((video, vIdx) => {
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
                            <div key={vIdx} className="relative aspect-video bg-[#0c0c0f] border border-dark-border rounded-md overflow-hidden group/ach-video col-span-2">
                              {isYouTube ? (
                                <iframe
                                  src={embedUrl}
                                  title={`${achievement.title} video memory ${vIdx + 1}`}
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
                              <span className="absolute top-1 left-1 bg-brand-red text-white border border-brand-red/10 text-[7px] font-mono font-bold px-1 rounded uppercase pointer-events-none">
                                VIDEO
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Memories Gallery Column (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display text-lg font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-brand-red" />
              <span>TEAM MEMORIES CABINET</span>
            </h3>

            <div className="space-y-4">
              {memories.map((mem, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e0e11] border border-dark-border p-4 rounded-lg flex items-start gap-4 relative group"
                >
                  <div className="p-3 bg-dark-bg border border-dark-border rounded text-gray-400 group-hover:border-brand-red group-hover:text-brand-red transition-all">
                    <Star className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[9px] text-brand-red font-bold uppercase bg-brand-red/10 border border-brand-red/20 px-2 rounded">
                        {mem.badge}
                      </span>
                      <span className="font-mono text-[9px] text-gray-600">{mem.category}</span>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide truncate">
                      {mem.title}
                    </h4>
                    <p className="font-sans text-xs text-gray-400 mt-1 leading-relaxed">
                      {mem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Motivational Banner */}
            <div className="bg-gradient-to-r from-brand-red/10 to-brand-red/0 border-l-2 border-brand-red p-4 rounded-r-lg">
              <p className="font-display text-xs font-bold text-white uppercase tracking-wider">
                👑 NEXT TARGET: APEX INVITATIONAL BOOYAH!
              </p>
              <p className="font-sans text-[11px] text-gray-400 mt-1">
                Scrim practices run daily from 6:00 PM to 10:00 PM IST.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
