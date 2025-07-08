
import { Brush, Scissors, Sparkles, Palette, Music, Beaker, Microscope, Globe, Headphones, Heart, Calculator, Star, Lightbulb } from 'lucide-react';

export const activityData = {
  stories: [
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy on an exciting journey through the enchanted forest!',
      duration: '5 min',
      difficulty: 'Easy',
      rating: 4.9,
      pages: [
        {
          text: "Welcome to the magical forest where Luna the fairy lives! She's about to discover something amazing.",
          animation: "fly-around",
          backgroundColor: "from-green-100 to-emerald-100"
        },
        {
          text: "As Luna flutters through the sparkling trees, she notices numbers dancing in the air like fireflies!",
          animation: "shimmer",
          backgroundColor: "from-blue-100 to-purple-100"
        }
      ]
    },
    {
      id: '2',
      title: 'Space Explorer Mission',
      description: 'Captain Cosmo explores the galaxy and discovers amazing planets!',
      duration: '7 min',
      difficulty: 'Medium',
      rating: 4.8,
      pages: [
        {
          text: "Captain Cosmo puts on his shiny space suit, ready for the greatest adventure in the galaxy!",
          animation: "scale-in",
          backgroundColor: "from-blue-100 to-indigo-100"
        }
      ]
    }
  ],

  poems: [
    {
      id: '1',
      title: 'Rainbow Colors',
      description: 'A fun poem about all the beautiful colors in a rainbow',
      duration: '3 min',
      difficulty: 'Easy',
      rating: 4.7,
      pages: [
        {
          text: "Red like roses, orange like sun, Yellow like butter, green like fun!",
          animation: "twinkle",
          backgroundColor: "from-red-100 to-orange-100"
        }
      ]
    }
  ],

  creativeActivities: [
    {
      title: 'Magic Paint Studio',
      description: 'Create beautiful digital artwork with magic brushes!',
      icon: 'Brush',
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => window.location.href = '/activities/magic-paint-studio'
    },
    {
      title: 'Paper Crafts Workshop',
      description: 'Make amazing crafts with colorful paper!',
      icon: 'Scissors',
      difficulty: 'Medium',
      gradient: 'gradient-orange',
      action: () => window.location.href = '/activities/paper-crafts'
    }
  ],

  mathActivities: [
    {
      title: 'Number Adventure',
      description: 'Embark on exciting adventures while learning numbers!',
      icon: 'Calculator',
      difficulty: 'Easy',
      gradient: 'gradient-blue',
      action: () => window.location.href = '/courses/math-adventure'
    }
  ],

  artActivities: [
    {
      title: 'Digital Art Studio',
      description: 'Create masterpieces with digital brushes!',
      icon: 'Brush',
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => window.location.href = '/activities/magic-paint-studio'
    }
  ],

  scienceActivities: [
    {
      title: 'Kitchen Science Lab',
      description: 'Discover amazing science with safe experiments!',
      icon: 'Beaker',
      difficulty: 'Medium',
      gradient: 'gradient-green',
      action: () => window.location.href = '/courses/science-explorers'
    }
  ],

  musicActivities: [
    {
      title: 'Dance Party',
      description: 'Move and groove to fun music while learning!',
      icon: 'Music',
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => window.location.href = '/activities/music-movement'
    }
  ]
};
