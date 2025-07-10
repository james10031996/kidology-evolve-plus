
import { GameData } from '../data/gamesData';

export interface TransformedGame {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  duration: string;
  bestScore?: number;
  playCount: number;
  gradient: string;
  stars: number;
  route: string;
  icon: string;
}

export const transformGameData = (game: GameData): TransformedGame => {
  // Convert difficulty string to number
  const difficultyMap: { [key: string]: number } = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
  };

  // Calculate stars based on difficulty
  const stars = difficultyMap[game.difficulty] || 1;

  return {
    id: game.id.toString(),
    title: game.title,
    description: game.description,
    difficulty: difficultyMap[game.difficulty] || 1,
    duration: game.playTime,
    playCount: 0, // Default value
    gradient: game.color,
    stars: stars,
    route: game.path,
    icon: game.image
  };
};
