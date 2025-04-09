import React, { ReactNode } from 'react';

interface StyledCardProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  hasImage?: boolean;
}

const StyledCard: React.FC<StyledCardProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  hasImage = false,
}) => {
  const baseStyles = "relative overflow-hidden transition-all duration-300 transform hover:scale-[1.02]";
  
  const variantStyles = {
    primary: "bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] text-white",
    secondary: "bg-gradient-to-br from-[#CE4420] to-[#FF6B48] text-white",
    accent: "bg-gradient-to-br from-[#102039] to-[#1E3A5F] text-white"
  };

  const sizeStyles = {
    small: "p-4 rounded-xl",
    medium: "p-6 rounded-2xl",
    large: "p-8 rounded-3xl"
  };

  const shadowStyles = "shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]";
  
  const borderStyles = "border border-[rgba(255,255,255,0.1)]";
  
  const glassEffect = "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-[rgba(255,255,255,0.1)] before:to-transparent before:opacity-50";

  return (
    <div className={`
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${shadowStyles}
      ${borderStyles}
      ${glassEffect}
      ${hasImage ? 'min-h-[300px]' : ''}
      ${className}
    `}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default StyledCard; 