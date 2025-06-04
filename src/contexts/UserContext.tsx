
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  id: string;
  name: string;
  avatar: string;
  stars: number;
  level: number;
  streak: number;
  totalTime: number;
  lessonsCompleted: number;
  achievements: Achievement[];
  progress: SubjectProgress[];
  petData: PetData;
  rewards: Reward[];
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
  unlockedDate?: string;
}

interface SubjectProgress {
  name: string;
  progress: number;
  level: number;
  nextMilestone: string;
  color: string;
}

interface PetData {
  name: string;
  type: string;
  mood: string;
  happiness: number;
  energy: number;
  lastFed: string;
}

interface Reward {
  id: string;
  name: string;
  icon: string;
  cost: number;
  owned: number;
  description: string;
}

interface UserContextType {
  userData: UserData;
  updateStars: (amount: number) => void;
  updateProgress: (subject: string, progress: number) => void;
  unlockAchievement: (achievementId: string) => void;
  feedPet: () => void;
  purchaseReward: (rewardId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    id: '1',
    name: 'Alex',
    avatar: '😊',
    stars: 1250,
    level: 5,
    streak: 12,
    totalTime: 372, // minutes
    lessonsCompleted: 47,
    achievements: [
      { id: '1', name: 'First Steps', icon: '👶', unlocked: true, description: 'Complete your first lesson', unlockedDate: '2024-01-15' },
      { id: '2', name: 'Math Wizard', icon: '🧙‍♂️', unlocked: true, description: 'Solve 50 math problems', unlockedDate: '2024-01-20' },
      { id: '3', name: 'Reading Star', icon: '⭐', unlocked: true, description: 'Read 10 stories', unlockedDate: '2024-01-25' },
      { id: '4', name: 'Science Explorer', icon: '🔬', unlocked: false, description: 'Complete 5 experiments' },
      { id: '5', name: 'Art Master', icon: '🎨', unlocked: false, description: 'Create 20 artworks' },
      { id: '6', name: 'Music Lover', icon: '🎵', unlocked: false, description: 'Learn 15 songs' }
    ],
    progress: [
      { name: 'Mathematics', progress: 85, level: 8, color: 'gradient-blue', nextMilestone: '100 problems solved' },
      { name: 'English', progress: 72, level: 6, color: 'gradient-green', nextMilestone: '5 more stories to read' },
      { name: 'Science', progress: 45, level: 4, color: 'gradient-purple', nextMilestone: '3 experiments left' },
      { name: 'Art', progress: 60, level: 5, color: 'gradient-pink', nextMilestone: '10 more artworks' }
    ],
    petData: {
      name: 'Sparky',
      type: 'dragon',
      mood: 'happy',
      happiness: 85,
      energy: 70,
      lastFed: new Date().toISOString()
    },
    rewards: [
      { id: '1', name: 'Golden Star', icon: '⭐', cost: 50, owned: 3, description: 'Show off your achievements!' },
      { id: '2', name: 'Rainbow Badge', icon: '🌈', cost: 100, owned: 1, description: 'Colorful completion reward' },
      { id: '3', name: 'Super Crown', icon: '👑', cost: 200, owned: 0, description: 'Ultimate learning champion' },
      { id: '4', name: 'Magic Wand', icon: '🪄', cost: 150, owned: 0, description: 'Cast spells of knowledge' }
    ]
  });

  const updateStars = (amount: number) => {
    setUserData(prev => ({
      ...prev,
      stars: prev.stars + amount
    }));
  };

  const updateProgress = (subject: string, progressAmount: number) => {
    setUserData(prev => ({
      ...prev,
      progress: prev.progress.map(p => 
        p.name === subject 
          ? { ...p, progress: Math.min(100, p.progress + progressAmount) }
          : p
      )
    }));
  };

  const unlockAchievement = (achievementId: string) => {
    setUserData(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => 
        a.id === achievementId 
          ? { ...a, unlocked: true, unlockedDate: new Date().toISOString() }
          : a
      )
    }));
  };

  const feedPet = () => {
    setUserData(prev => ({
      ...prev,
      petData: {
        ...prev.petData,
        happiness: Math.min(100, prev.petData.happiness + 15),
        energy: Math.min(100, prev.petData.energy + 10),
        lastFed: new Date().toISOString(),
        mood: 'excited'
      }
    }));
  };

  const purchaseReward = (rewardId: string) => {
    const reward = userData.rewards.find(r => r.id === rewardId);
    if (reward && userData.stars >= reward.cost) {
      setUserData(prev => ({
        ...prev,
        stars: prev.stars - reward.cost,
        rewards: prev.rewards.map(r => 
          r.id === rewardId 
            ? { ...r, owned: r.owned + 1 }
            : r
        )
      }));
    }
  };

  return (
    <UserContext.Provider value={{
      userData,
      updateStars,
      updateProgress,
      unlockAchievement,
      feedPet,
      purchaseReward
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
