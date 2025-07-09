
export const calculateScore = (level: number, streak: number, timeBonus: boolean, isSpeedRound: boolean) => {
  let baseScore = 10 * level;
  let streakBonus = streak * 5;
  let speedBonus = timeBonus ? 15 : 0;
  
  // Calculate total before speed round multiplier
  let totalScore = baseScore + streakBonus + speedBonus;
  
  // Apply speed round multiplier (double points)
  if (isSpeedRound) {
    totalScore *= 2;
  }
  
  return totalScore;
};

export const getTimeLimit = (level: number, isSpeedRound: boolean) => {
  if (isSpeedRound) {
    return 20; // Slightly more time for speed rounds since they're harder
  }
  return Math.max(25, 50 - level * 2); // Decreasing time as level increases, minimum 25 seconds
};

export const checkForBadges = (gameStats: any) => {
  const newBadges = [];
  
  // Only award badges if they haven't been earned yet
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
    const gameStateToSave = {
      ...gameStats,
      timestamp: Date.now(),
      version: '1.0' // Version for future compatibility
    };
    localStorage.setItem('mathBubbleGameState', JSON.stringify(gameStateToSave));
    console.log('Game state saved successfully:', gameStateToSave);
  } catch (error) {
    console.warn('Could not save game state:', error);
  }
};

export const loadGameState = () => {
  try {
    const saved = localStorage.getItem('mathBubbleGameState');
    if (saved) {
      const state = JSON.parse(saved);
      // Only restore if saved within last 24 hours and has valid structure
      if (state.timestamp && 
          Date.now() - state.timestamp < 24 * 60 * 60 * 1000 &&
          typeof state.level === 'number' &&
          typeof state.score === 'number') {
        console.log('Game state loaded successfully:', state);
        return state;
      } else {
        console.log('Game state expired or invalid, starting fresh');
        localStorage.removeItem('mathBubbleGameState');
      }
    }
  } catch (error) {
    console.warn('Could not load game state:', error);
    localStorage.removeItem('mathBubbleGameState');
  }
  return null;
};

// Clear saved game state (useful for debugging)
export const clearGameState = () => {
  try {
    localStorage.removeItem('mathBubbleGameState');
    console.log('Game state cleared');
  } catch (error) {
    console.warn('Could not clear game state:', error);
  }
};
