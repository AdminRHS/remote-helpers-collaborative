
import React, { createContext, useState, useContext, useEffect } from 'react';

// Key used for localStorage
const EXPERIENCE_STORAGE_KEY = 'playerExperience';

interface ExperienceContextType {
  experience: number;
  addExperience: (amount: number) => void;
}

const ExperienceContext = createContext<ExperienceContextType>({
  experience: 0,
  addExperience: () => {},
});

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [experience, setExperience] = useState<number>(() => {
    // Try to get the saved experience from localStorage
    const savedExperience = localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    return savedExperience ? parseInt(savedExperience, 10) : 0;
  });

  // Save experience to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, experience.toString());
    console.log(`Experience updated: ${experience} XP`);
  }, [experience]);

  const addExperience = (amount: number) => {
    setExperience((prev) => {
      const newValue = prev + amount;
      console.log(`Adding ${amount} XP: ${prev} -> ${newValue}`);
      return newValue;
    });
  };

  return (
    <ExperienceContext.Provider value={{ experience, addExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);

export default ExperienceContext;
