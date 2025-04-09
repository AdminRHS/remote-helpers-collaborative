
import React, { useEffect, useRef, useState } from "react";

interface FishProps {
  color: string;
  size: number;
  top: number;
  speed: number;
  direction: "left" | "right";
}

const Fish: React.FC<FishProps> = ({ color, size, top, speed, direction }) => {
  const [position, setPosition] = useState(direction === "right" ? -size : window.innerWidth);
  const animationRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      setPosition(prevPosition => {
        const containerWidth = containerRef.current?.parentElement?.clientWidth || window.innerWidth;
        let newPosition;
        
        if (direction === "right") {
          newPosition = prevPosition + speed;
          if (newPosition > containerWidth + size) {
            newPosition = -size;
          }
        } else {
          newPosition = prevPosition - speed;
          if (newPosition < -size) {
            newPosition = containerWidth + size;
          }
        }
        
        return newPosition;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [direction, size, speed]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute transition-transform"
      style={{ 
        left: `${position}px`, 
        top: `${top}px`,
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)"
      }}
    >
      <svg 
        width={size} 
        height={size * 0.6} 
        viewBox="0 0 100 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M80 30C80 41.0457 71.0457 50 60 50H30C13.4315 50 0 41.0457 0 30C0 18.9543 13.4315 10 30 10H60C71.0457 10 80 18.9543 80 30Z" 
          fill={color} 
        />
        <path 
          d="M80 30H100L90 10V50L100 30Z" 
          fill={color} 
        />
        <circle cx="20" cy="25" r="5" fill="white" />
        <circle cx="20" cy="25" r="2" fill="#000" />
      </svg>
    </div>
  );
};

export default Fish;
