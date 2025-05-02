import React from 'react';

interface HeroProps {
  /**
   * Height of the hero container (e.g., '500px', '60vh').
   * You can adjust this value when using the component.
   */
  height?: string;
}

const Hero: React.FC<HeroProps> = ({ height = '500px' }) => (
  <div className="w-full overflow-hidden" style={{ height }}>
    <video
      className="w-full h-full object-cover"
      src="/videos/hero.mp4"
      autoPlay
      muted
      loop
    />
  </div>
);

export default Hero;
