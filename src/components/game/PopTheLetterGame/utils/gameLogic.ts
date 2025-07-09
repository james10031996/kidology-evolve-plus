
export const calculateScore = (level: number, streak: number, timeBonus: boolean, isSpeedRound: boolean) => {
  let baseScore = 15 * level;
  let streakBonus = streak * 8;
  let speedBonus = timeBonus ? 20 : 0;
  
  let totalScore = baseScore + streakBonus + speedBonus;
  
  if (isSpeedRound) {
    totalScore *= 2;
  }
  
  return totalScore;
};

export const getTimeLimit = (level: number, isSpeedRound: boolean) => {
  if (isSpeedRound) {
    return 25;
  }
  return Math.max(30, 60 - level * 2);
};

export const checkForBadges = (gameStats: any) => {
  const newBadges = [];
  
  if (gameStats.streak >= 5 && !gameStats.badges?.streak5) {
    newBadges.push({ id: 'streak5', name: 'Letter Streak', description: '5 in a row!' });
  }
  
  if (gameStats.streak >= 10 && !gameStats.badges?.streak10) {
    newBadges.push({ id: 'streak10', name: 'Alphabet Ace', description: '10 in a row!' });
  }
  
  if (gameStats.level >= 26 && !gameStats.badges?.alphabetMaster) {
    newBadges.push({ id: 'alphabetMaster', name: 'Alphabet Master', description: 'Complete A-Z!' });
  }
  
  if (gameStats.totalCorrect >= 50 && !gameStats.badges?.correct50) {
    newBadges.push({ id: 'correct50', name: 'Word Wizard', description: '50 correct bubbles!' });
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
      version: '1.0'
    };
    localStorage.setItem('popLetterGameState', JSON.stringify(gameStateToSave));
    console.log('Pop Letter game state saved successfully:', gameStateToSave);
  } catch (error) {
    console.warn('Could not save Pop Letter game state:', error);
  }
};

export const loadGameState = () => {
  try {
    const saved = localStorage.getItem('popLetterGameState');
    if (saved) {
      const state = JSON.parse(saved);
      if (state.timestamp && 
          Date.now() - state.timestamp < 24 * 60 * 60 * 1000 &&
          typeof state.level === 'number' &&
          typeof state.score === 'number') {
        console.log('Pop Letter game state loaded successfully:', state);
        return state;
      } else {
        console.log('Pop Letter game state expired or invalid, starting fresh');
        localStorage.removeItem('popLetterGameState');
      }
    }
  } catch (error) {
    console.warn('Could not load Pop Letter game state:', error);
    localStorage.removeItem('popLetterGameState');
  }
  return null;
};

export const clearGameState = () => {
  try {
    localStorage.removeItem('popLetterGameState');
    console.log('Pop Letter game state cleared');
  } catch (error) {
    console.warn('Could not clear Pop Letter game state:', error);
  }
};
