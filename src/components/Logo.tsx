import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-24 h-24", glow = true }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-brand-red opacity-20 blur-xl rounded-full scale-75 animate-pulse" />
      )}
      
      {/* Sharp esports RE Logo SVG */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_20px_rgba(255,0,60,0.6)]"
      >
        <defs>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff003c" />
            <stop offset="100%" stopColor="#800012" />
          </linearGradient>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
        </defs>

        {/* Ambient Dark Red Smoky Background Glow & Slashes (Matching original image) */}
        {glow && (
          <g opacity="0.6">
            <circle cx="250" cy="250" r="160" fill="#ff003c" opacity="0.08" filter="url(#redGlow)" />
            {/* Background Slanted Textures/Slashes */}
            <path
              d="M 50 120 L 450 420"
              stroke="url(#redGradient)"
              strokeWidth="8"
              opacity="0.12"
              strokeLinecap="round"
            />
            <path
              d="M 100 80 L 480 380"
              stroke="url(#redGradient)"
              strokeWidth="4"
              opacity="0.08"
              strokeLinecap="round"
            />
            <path
              d="M 20 220 L 400 500"
              stroke="url(#redGradient)"
              strokeWidth="12"
              opacity="0.05"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Stylized White "R" Left Wing - Exact geometric shape matching the attached image */}
        <g>
          <path
            d="M 160 180 
               L 370 155 
               L 265 210 
               L 165 210 
               L 285 360 
               L 200 270 
               L 95 320 
               L 155 235 
               L 120 240 
               L 160 180 Z"
            fill="url(#whiteGradient)"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="miter"
          />
          {/* Inner cutout hole to form the R's loop precisely */}
          <path
            d="M 185 200 
               L 270 190 
               L 220 225 Z"
            fill="#050507"
          />
        </g>

        {/* Stylized Red "E" Right Wing - Exact geometric shape matching the attached image */}
        <path
          d="M 285 180 
             L 415 180 
             L 395 220 
             L 310 220 
             L 300 250 
             L 375 250 
             L 360 290 
             L 285 290 
             L 275 320 
             L 420 320 
             L 405 360 
             L 230 360 
             L 285 180 Z"
          fill="url(#redGradient)"
          stroke="#ff003c"
          strokeWidth="1.5"
          strokeLinejoin="miter"
        />

        <filter id="redGlow">
          <feGaussianBlur stdDeviation="30" result="blur" />
        </filter>
      </svg>
    </div>
  );
};
