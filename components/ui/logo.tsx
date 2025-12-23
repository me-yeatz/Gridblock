'use client';

import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-2xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Logo Image */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-[#7A4854] rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />

        {/* Image container */}
        <div className="relative">
          <Image
            src="/Grid_icon.png"
            alt="GridBlock Logo"
            width={icon}
            height={icon}
            className="relative rounded-xl glow-rose"
            priority
          />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-bold tracking-tight accent-text`}>
            GridBlock
          </span>
          <span className="text-[9px] text-gray-500 tracking-widest uppercase -mt-0.5">
            Design with Soul
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
