
export const calculateScore = (level: number, streak: number, isCorrect: boolean, isSpeedRound: boolean) => {
  if (!isCorrect) return 0;
  
  let baseScore = 20 * level;
  let streakBonus = streak * 10;
  
  let totalScore = baseScore + streakBonus;
  
  if (isSpeedRound) {
    totalScore *= 2;
  }
  
  return totalScore;
};

export const getTimeLimit = (level: number, isSpeedRound: boolean) => {
  if (isSpeedRound) {
    return Math.max(45, 150 - level * 8); // Reduced time for speed rounds
  }
  
  // Base 2.5 minutes, reduce by 8 seconds per level, minimum 90 seconds
  return Math.max(90, 150 - level * 8);
};

export const checkForBadges = (gameStats: any) => {
  const newBadges = [];
  
  if (gameStats.streak >= 5 && !gameStats.badges?.streak5) {
    newBadges.push({ id: 'streak5', name: 'Typing Streak', description: '5 in a row!' });
  }
  
  if (gameStats.streak >= 10 && !gameStats.badges?.streak10) {
    newBadges.push({ id: 'streak10', name: 'Word Master', description: '10 in a row!' });
  }
  
  if (gameStats.level >= 26 && !gameStats.badges?.alphabetMaster) {
    newBadges.push({ id: 'alphabetMaster', name: 'Alphabet Explorer', description: 'Complete A-Z!' });
  }
  
  if (gameStats.totalCorrect >= 50 && !gameStats.badges?.correct50) {
    newBadges.push({ id: 'correct50', name: 'Typing Wizard', description: '50 correct words!' });
  }
  
  if (gameStats.streak >= 5 && gameStats.timeLeft > 120 && !gameStats.badges?.speedTyper) {
    newBadges.push({ id: 'speedTyper', name: 'Speed Demon', description: 'Lightning fast!' });
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
    localStorage.setItem('typingChallengeGameState', JSON.stringify(gameStateToSave));
    console.log('Typing Challenge game state saved successfully:', gameStateToSave);
  } catch (error) {
    console.warn('Could not save Typing Challenge game state:', error);
  }
};

export const loadGameState = () => {
  try {
    const saved = localStorage.getItem('typingChallengeGameState');
    if (saved) {
      const state = JSON.parse(saved);
      if (state.timestamp && 
          Date.now() - state.timestamp < 24 * 60 * 60 * 1000 &&
          typeof state.level === 'number' &&
          typeof state.score === 'number') {
        console.log('Typing Challenge game state loaded successfully:', state);
        return state;
      } else {
        console.log('Typing Challenge game state expired or invalid, starting fresh');
        localStorage.removeItem('typingChallengeGameState');
      }
    }
  } catch (error) {
    console.warn('Could not load Typing Challenge game state:', error);
    localStorage.removeItem('typingChallengeGameState');
  }
  return null;
};
