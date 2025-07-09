
export const calculateScore = (level: number, streak: number, timeBonus: boolean, isSpeedRound: boolean) => {
  let baseScore = 10 * level;
  let streakBonus = streak * 5;
  let speedBonus = timeBonus ? 15 : 0;
  let speedRoundMultiplier = isSpeedRound ? 2 : 1;
  
  return (baseScore + streakBonus + speedBonus) * speedRoundMultiplier;
};

export const getTimeLimit = (level: number, isSpeedRound: boolean) => {
  if (isSpeedRound) {
    return 15; // Fast-paced speed rounds
  }
  return Math.max(20, 45 - level * 2); // Decreasing time as level increases
};

export const checkForBadges = (gameStats: any) => {
  const newBadges = [];
  
  if (gameStats.streak >= 5 && !gameStats.badges?.streak5) {
    newBadges.push({ id: 'streak5', name: 'Streak Master', description: '5 in a row!' });
  }
  
  if (gameStats.streak >= 10 && !gameStats.badges?.streak10) {
    newBadges.push({ id: 'streak10', name: 'Unstoppable', description: '10 in a row!' });
  }
  
  if (gameStats.level >= 10 && !gameStats.badges?.level10) {
    newBadges.push({ id: 'level10', name: 'Champion', description: 'Reached level 10!' });
  }
  
  if (gameStats.totalCorrect >= 50 && !gameStats.badges?.correct50) {
    newBadges.push({ id: 'correct50', name: 'Math Wizard', description: '50 correct answers!' });
  }
  
  if (gameStats.score > gameStats.highScore && !gameStats.badges?.highScore) {
    newBadges.push({ id: 'highScore', name: 'Record Breaker', description: 'New high score!' });
  }
  
  return newBadges;
};

export const saveGameState = (gameStats: any) => {
  try {
    localStorage.setItem('mathBubbleGameState', JSON.stringify({
      ...gameStats,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.warn('Could not save game state:', error);
  }
};

export const loadGameState = () => {
  try {
    const saved = localStorage.getItem('mathBubbleGameState');
    if (saved) {
      const state = JSON.parse(saved);
      // Only restore if saved within last 24 hours
      if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
        return state;
      }
    }
  } catch (error) {
    console.warn('Could not load game state:', error);
  }
  return null;
};


