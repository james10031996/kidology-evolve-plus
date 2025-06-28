
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Trophy, Volume2, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';

type AlphabetItem = {
  letter: string;
  word: string;
  emoji: string;
  sound: string;
  fact: string;
};

type GeneralItem = {
  name: string;
  emoji: string;
  sound: string;
  fact: string;
};

type CategoryItem = AlphabetItem | GeneralItem;

type Category = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  items: CategoryItem[];
};

const GeneralKnowledge = () => {
  const [currentCategory, setCurrentCategory] = useState('alphabets');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedItems, setCompletedItems] = useState(new Set<string>());
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [viewMode, setViewMode] = useState<'categories' | 'learning'>('categories');

  const categories: Category[] = [
    {
      id: 'alphabets',
      name: 'Alphabets',
      emoji: '🔤',
      description: 'Learn letters with fun examples!',
      color: 'bg-blue-50',
      items: [
        { letter: 'A', word: 'Apple', emoji: '🍎', sound: 'A is for Apple!', fact: 'Apples come in many colors!' },
        { letter: 'B', word: 'Butterfly', emoji: '🦋', sound: 'B is for Butterfly!', fact: 'Butterflies taste with their feet!' },
        { letter: 'C', word: 'Cat', emoji: '🐱', sound: 'C is for Cat!', fact: 'Cats sleep 12-16 hours a day!' },
        { letter: 'D', word: 'Dog', emoji: '🐶', sound: 'D is for Dog!', fact: 'Dogs have amazing sense of smell!' },
        { letter: 'E', word: 'Elephant', emoji: '🐘', sound: 'E is for Elephant!', fact: 'Elephants never forget!' },
        { letter: 'F', word: 'Fish', emoji: '🐠', sound: 'F is for Fish!', fact: 'Fish can live in water and breathe through gills!' },
        { letter: 'G', word: 'Giraffe', emoji: '🦒', sound: 'G is for Giraffe!', fact: 'Giraffes are the tallest animals!' },
        { letter: 'H', word: 'Horse', emoji: '🐴', sound: 'H is for Horse!', fact: 'Horses can sleep standing up!' },
        { letter: 'I', word: 'Ice Cream', emoji: '🍦', sound: 'I is for Ice Cream!', fact: 'Ice cream was invented in China!' },
        { letter: 'J', word: 'Jellyfish', emoji: '🎐', sound: 'J is for Jellyfish!', fact: 'Jellyfish are 95% water!' }
      ] as AlphabetItem[]
    },
    {
      id: 'numbers',
      name: 'Numbers',
      emoji: '🔢',
      description: 'Count and learn with numbers!',
      color: 'bg-purple-50',
      items: [
        { name: 'One', emoji: '1️⃣', sound: 'This is number one!', fact: 'One is the first counting number!' },
        { name: 'Two', emoji: '2️⃣', sound: 'This is number two!', fact: 'Two hands, two eyes, we use pairs!' },
        { name: 'Three', emoji: '3️⃣', sound: 'This is number three!', fact: 'Three wheels make a tricycle!' },
        { name: 'Four', emoji: '4️⃣', sound: 'This is number four!', fact: 'Four legs on a chair or table!' },
        { name: 'Five', emoji: '5️⃣', sound: 'This is number five!', fact: 'Five fingers on each hand!' },
        { name: 'Six', emoji: '6️⃣', sound: 'This is number six!', fact: 'Insects have six legs!' },
        { name: 'Seven', emoji: '7️⃣', sound: 'This is number seven!', fact: 'There are seven days in a week!' },
        { name: 'Eight', emoji: '8️⃣', sound: 'This is number eight!', fact: 'Spiders have eight legs!' },
        { name: 'Nine', emoji: '9️⃣', sound: 'This is number nine!', fact: 'Nine planets in our solar system!' },
        { name: 'Ten', emoji: '🔟', sound: 'This is number ten!', fact: 'Ten toes on your feet!' }
      ] as GeneralItem[]
    },
    {
      id: 'colors',
      name: 'Colors',
      emoji: '🎨',
      description: 'Discover the rainbow of colors!',
      color: 'bg-red-50',
      items: [
        { name: 'Red', emoji: '🔴', sound: 'This is the color red!', fact: 'Red is the color of fire trucks and strawberries!' },
        { name: 'Blue', emoji: '🔵', sound: 'This is the color blue!', fact: 'Blue is the color of the sky and ocean!' },
        { name: 'Yellow', emoji: '🟡', sound: 'This is the color yellow!', fact: 'Yellow is the color of the sun and bananas!' },
        { name: 'Green', emoji: '🟢', sound: 'This is the color green!', fact: 'Green is the color of grass and leaves!' },
        { name: 'Orange', emoji: '🟠', sound: 'This is the color orange!', fact: 'Orange is the color of pumpkins and oranges!' },
        { name: 'Purple', emoji: '🟣', sound: 'This is the color purple!', fact: 'Purple is made by mixing red and blue!' },
        { name: 'Pink', emoji: '🩷', sound: 'This is the color pink!', fact: 'Pink is a lighter shade of red!' },
        { name: 'Black', emoji: '⚫', sound: 'This is the color black!', fact: 'Black absorbs all colors of light!' }
      ] as GeneralItem[]
    },
    {
      id: 'shapes',
      name: 'Shapes',
      emoji: '📐',
      description: 'Learn about different shapes!',
      color: 'bg-indigo-50',
      items: [
        { name: 'Circle', emoji: '⭕', sound: 'This is a circle!', fact: 'Circles have no corners and are perfectly round!' },
        { name: 'Square', emoji: '🟨', sound: 'This is a square!', fact: 'Squares have four equal sides!' },
        { name: 'Triangle', emoji: '🔺', sound: 'This is a triangle!', fact: 'Triangles have three sides and three corners!' },
        { name: 'Rectangle', emoji: '📏', sound: 'This is a rectangle!', fact: 'Rectangles have four sides with opposite sides equal!' },
        { name: 'Diamond', emoji: '💎', sound: 'This is a diamond!', fact: 'Diamonds sparkle and are very valuable!' },
        { name: 'Star', emoji: '⭐', sound: 'This is a star!', fact: 'Stars light up the night sky!' },
        { name: 'Heart', emoji: '❤️', sound: 'This is a heart!', fact: 'Hearts represent love and kindness!' },
        { name: 'Oval', emoji: '🥚', sound: 'This is an oval!', fact: 'Ovals are like stretched circles!' }
      ] as GeneralItem[]
    },
    {
      id: 'body',
      name: 'Body Parts',
      emoji: '👤',
      description: 'Discover your amazing body!',
      color: 'bg-pink-50',
      items: [
        { name: 'Eyes', emoji: '👀', sound: 'These are your eyes!', fact: 'You blink about 20 times per minute!' },
        { name: 'Heart', emoji: '❤️', sound: 'This is your heart!', fact: 'Your heart beats 100,000 times a day!' },
        { name: 'Brain', emoji: '🧠', sound: 'This is your brain!', fact: 'Your brain uses 20% of your energy!' },
        { name: 'Hands', emoji: '✋', sound: 'These are your hands!', fact: 'You have 27 bones in each hand!' },
        { name: 'Feet', emoji: '🦶', sound: 'These are your feet!', fact: 'Your feet have 26 bones each!' },
        { name: 'Ears', emoji: '👂', sound: 'These are your ears!', fact: 'Your ears help you balance too!' },
        { name: 'Nose', emoji: '👃', sound: 'This is your nose!', fact: 'You can smell over 1 trillion different scents!' },
        { name: 'Mouth', emoji: '👄', sound: 'This is your mouth!', fact: 'You have 32 teeth when you grow up!' }
      ] as GeneralItem[]
    },
    {
      id: 'animals',
      name: 'Animals',
      emoji: '🐾',
      description: 'Meet amazing animals!',
      color: 'bg-green-50',
      items: [
        { name: 'Lion', emoji: '🦁', sound: 'Lions are the king of jungle!', fact: 'Lions can sleep 20 hours a day!' },
        { name: 'Giraffe', emoji: '🦒', sound: 'Giraffes are very tall!', fact: 'Giraffes have the same number of neck bones as humans!' },
        { name: 'Penguin', emoji: '🐧', sound: 'Penguins love to swim!', fact: 'Penguins can hold their breath for 20 minutes!' },
        { name: 'Monkey', emoji: '🐵', sound: 'Monkeys are very playful!', fact: 'Some monkeys can use tools!' },
        { name: 'Zebra', emoji: '🦓', sound: 'Zebras have beautiful stripes!', fact: 'Each zebra has a unique stripe pattern!' },
        { name: 'Tiger', emoji: '🐅', sound: 'Tigers are strong hunters!', fact: 'Tigers are excellent swimmers!' },
        { name: 'Bear', emoji: '🐻', sound: 'Bears are big and strong!', fact: 'Bears can run up to 35 mph!' },
        { name: 'Rabbit', emoji: '🐰', sound: 'Rabbits hop around quickly!', fact: 'Rabbits can jump 3 feet high!' }
      ] as GeneralItem[]
    },
    {
      id: 'ocean',
      name: 'Ocean Creatures',
      emoji: '🌊',
      description: 'Explore the deep blue sea!',
      color: 'bg-cyan-50',
      items: [
        { name: 'Whale', emoji: '🐋', sound: 'Whales are gentle giants!', fact: 'Blue whales are the largest animals ever!' },
        { name: 'Dolphin', emoji: '🐬', sound: 'Dolphins are very smart!', fact: 'Dolphins recognize themselves in mirrors!' },
        { name: 'Octopus', emoji: '🐙', sound: 'Octopuses have eight arms!', fact: 'Octopuses have three hearts!' },
        { name: 'Starfish', emoji: '⭐', sound: 'Starfish live on ocean floor!', fact: 'Starfish can regrow their arms!' },
        { name: 'Seahorse', emoji: '🐴', sound: 'Seahorses are unique fish!', fact: 'Male seahorses carry the babies!' },
        { name: 'Shark', emoji: '🦈', sound: 'Sharks are amazing swimmers!', fact: 'Sharks have been around for 400 million years!' },
        { name: 'Jellyfish', emoji: '🎐', sound: 'Jellyfish float in the water!', fact: 'Jellyfish are 95% water!' },
        { name: 'Crab', emoji: '🦀', sound: 'Crabs walk sideways!', fact: 'Crabs can regrow lost claws!' }
      ] as GeneralItem[]
    },
    {
      id: 'nature',
      name: 'Nature',
      emoji: '🌳',
      description: 'Learn about our beautiful nature!',
      color: 'bg-emerald-50',
      items: [
        { name: 'Tree', emoji: '🌳', sound: 'Trees give us oxygen!', fact: 'Trees can live for thousands of years!' },
        { name: 'Flower', emoji: '🌸', sound: 'Flowers are beautiful!', fact: 'Flowers attract bees with their colors!' },
        { name: 'Rainbow', emoji: '🌈', sound: 'Rainbows have seven colors!', fact: 'Rainbows are circles, but we see arcs!' },
        { name: 'Sun', emoji: '☀️', sound: 'The sun gives us light!', fact: 'The sun is a giant star!' },
        { name: 'Moon', emoji: '🌙', sound: 'The moon shines at night!', fact: 'The moon controls ocean tides!' },
        { name: 'Cloud', emoji: '☁️', sound: 'Clouds float in the sky!', fact: 'Clouds are made of tiny water droplets!' },
        { name: 'Mountain', emoji: '⛰️', sound: 'Mountains are very tall!', fact: 'Mountains grow taller over time!' },
        { name: 'Ocean', emoji: '🌊', sound: 'Oceans are huge bodies of water!', fact: 'Oceans cover 71% of Earth!' }
      ] as GeneralItem[]
    },
    {
      id: 'food',
      name: 'Healthy Foods',
      emoji: '🍎',
      description: 'Learn about nutritious foods!',
      color: 'bg-yellow-50',
      items: [
        { name: 'Apple', emoji: '🍎', sound: 'Apples are crunchy and sweet!', fact: 'An apple a day keeps the doctor away!' },
        { name: 'Banana', emoji: '🍌', sound: 'Bananas are yellow and yummy!', fact: 'Bananas give you energy!' },
        { name: 'Carrot', emoji: '🥕', sound: 'Carrots are orange and healthy!', fact: 'Carrots help your eyes see better!' },
        { name: 'Broccoli', emoji: '🥦', sound: 'Broccoli looks like tiny trees!', fact: 'Broccoli has lots of vitamins!' },
        { name: 'Strawberry', emoji: '🍓', sound: 'Strawberries are red and sweet!', fact: 'Strawberries have seeds on the outside!' },
        { name: 'Orange', emoji: '🍊', sound: 'Oranges are full of vitamin C!', fact: 'Oranges help you stay healthy!' },
        { name: 'Grapes', emoji: '🍇', sound: 'Grapes grow in bunches!', fact: 'Grapes can be purple, green, or red!' },
        { name: 'Milk', emoji: '🥛', sound: 'Milk makes your bones strong!', fact: 'Milk comes from cows!' }
      ] as GeneralItem[]
    },
    {
      id: 'weather',
      name: 'Weather',
      emoji: '🌤️',
      description: 'Discover different weather patterns!',
      color: 'bg-sky-50',
      items: [
        { name: 'Sunny', emoji: '☀️', sound: 'It\'s a sunny day!', fact: 'Sunny days make plants grow!' },
        { name: 'Rainy', emoji: '🌧️', sound: 'Rain falls from clouds!', fact: 'Rain helps flowers and trees grow!' },
        { name: 'Snowy', emoji: '❄️', sound: 'Snow is white and cold!', fact: 'Every snowflake is unique!' },
        { name: 'Windy', emoji: '💨', sound: 'Wind makes things move!', fact: 'Wind can power windmills!' },
        { name: 'Cloudy', emoji: '☁️', sound: 'Clouds cover the sky!', fact: 'Clouds are made of water droplets!' },
        { name: 'Thunder', emoji: '⛈️', sound: 'Thunder makes loud sounds!', fact: 'Lightning comes before thunder!' },
        { name: 'Foggy', emoji: '🌫️', sound: 'Fog makes it hard to see far!', fact: 'Fog is like a cloud on the ground!' },
        { name: 'Hot', emoji: '🔥', sound: 'Hot weather makes us warm!', fact: 'Desert animals love hot weather!' }
      ] as GeneralItem[]
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      emoji: '🚗',
      description: 'Learn about different ways to travel!',
      color: 'bg-gray-50',
      items: [
        { name: 'Car', emoji: '🚗', sound: 'Cars drive on roads!', fact: 'The first car was invented in 1885!' },
        { name: 'Airplane', emoji: '✈️', sound: 'Airplanes fly in the sky!', fact: 'Airplanes can fly higher than clouds!' },
        { name: 'Train', emoji: '🚂', sound: 'Trains run on tracks!', fact: 'Some trains can go 200 mph!' },
        { name: 'Boat', emoji: '🚢', sound: 'Boats sail on water!', fact: 'Big boats are called ships!' },
        { name: 'Bicycle', emoji: '🚲', sound: 'Bicycles have two wheels!', fact: 'Bicycles don\'t pollute the air!' },
        { name: 'Bus', emoji: '🚌', sound: 'Buses carry many people!', fact: 'School buses are usually yellow!' },
        { name: 'Truck', emoji: '🚛', sound: 'Trucks carry heavy things!', fact: 'Some trucks have 18 wheels!' },
        { name: 'Helicopter', emoji: '🚁', sound: 'Helicopters have spinning blades!', fact: 'Helicopters can hover in one place!' }
      ] as GeneralItem[]
    },
    {
      id: 'space',
      name: 'Space',
      emoji: '🚀',
      description: 'Explore the amazing universe!',
      color: 'bg-violet-50',
      items: [
        { name: 'Earth', emoji: '🌍', sound: 'Earth is our home planet!', fact: 'Earth is the only planet with life!' },
        { name: 'Moon', emoji: '🌙', sound: 'The moon orbits Earth!', fact: 'The moon controls ocean tides!' },
        { name: 'Sun', emoji: '☀️', sound: 'The sun is a giant star!', fact: 'The sun is 93 million miles away!' },
        { name: 'Stars', emoji: '⭐', sound: 'Stars twinkle in the night sky!', fact: 'Stars are like distant suns!' },
        { name: 'Rocket', emoji: '🚀', sound: 'Rockets fly to space!', fact: 'Rockets need to go 25,000 mph to escape Earth!' },
        { name: 'Planet', emoji: '🪐', sound: 'Planets orbit around stars!', fact: 'There are 8 planets in our solar system!' },
        { name: 'Astronaut', emoji: '👨‍🚀', sound: 'Astronauts explore space!', fact: 'Astronauts float in zero gravity!' },
        { name: 'Galaxy', emoji: '🌌', sound: 'Galaxies have billions of stars!', fact: 'Our galaxy is called the Milky Way!' }
      ] as GeneralItem[]
    }
  ];

  const currentCategoryData = categories.find(c => c.id === currentCategory);
  const currentItem = currentCategoryData?.items[currentLevel];

  const playSound = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (!currentCategoryData) return;
    
    if (currentLevel < currentCategoryData.items.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setCurrentLevel(0);
    }
    setShowAnswer(false);
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setCompletedItems(prev => new Set([...prev, `${currentCategory}-${currentLevel}`]));
    setScore(prev => prev + 10);
    if (currentItem) {
      playSound(currentItem.sound);
    }
  };

  const startLearning = (categoryId: string) => {
    setCurrentCategory(categoryId);
    setCurrentLevel(0);
    setShowAnswer(false);
    setViewMode('learning');
  };

  const backToCategories = () => {
    setViewMode('categories');
    setShowAnswer(false);
  };

  const isAlphabetItem = (item: CategoryItem): item is AlphabetItem => {
    return 'letter' in item;
  };

  if (viewMode === 'categories') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-0 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
              🧠 General Knowledge Adventure
            </h2>
            <p className="font-comic text-gray-600">
              Choose a topic and start learning amazing facts!
            </p>
            <div className="mt-3 flex items-center justify-center space-x-4">
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
                <Star className="w-4 h-4 inline mr-1" />
                Score: {score}
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-comic font-bold">
                <Trophy className="w-4 h-4 inline mr-1" />
                Items Learned: {completedItems.size}
              </div>
            </div>
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => {
            const categoryProgress = category.items.filter((_, index) => 
              completedItems.has(`${category.id}-${index}`)
            ).length;
            
            return (
              <Card
                key={category.id}
                className="p-4 cursor-pointer transition-all transform hover:scale-105 border-2 hover:border-purple-300 hover:shadow-lg"
                onClick={() => startLearning(category.id)}
              >
                <div className={`${category.color} rounded-xl p-4 mb-3`}>
                  <div className="text-4xl text-center mb-2">{category.emoji}</div>
                  <h3 className="font-fredoka font-bold text-lg text-gray-800 text-center">
                    {category.name}
                  </h3>
                </div>
                
                <p className="font-comic text-sm text-gray-600 text-center mb-3">
                  {category.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-comic text-gray-600">Progress</span>
                    <span className="font-comic text-gray-600">
                      {categoryProgress}/{category.items.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(categoryProgress / category.items.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <Button className="w-full mt-3 rounded-full gradient-purple text-white font-comic">
                  Start Learning! <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Learning View
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Button 
            onClick={backToCategories}
            variant="outline" 
            className="rounded-full font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Topics
          </Button>
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
              <Star className="w-4 h-4 inline mr-1" />
              Score: {score}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-comic font-bold">
              <Trophy className="w-4 h-4 inline mr-1" />
              Items: {completedItems.size}
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            {currentCategoryData?.emoji} {currentCategoryData?.name}
          </h2>
          <p className="font-comic text-gray-600">
            {currentCategoryData?.description}
          </p>
        </div>
      </Card>

      {currentItem && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Learning Card */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className={`${currentCategoryData?.color} rounded-2xl p-8 text-center`}>
                <div className="text-8xl mb-4">{currentItem.emoji}</div>
                
                {isAlphabetItem(currentItem) ? (
                  <div className="space-y-2">
                    <h2 className="font-fredoka font-bold text-4xl text-gray-800">
                      {currentItem.letter}
                    </h2>
                    {showAnswer && (
                      <div className="animate-fade-in">
                        <h3 className="font-comic font-bold text-2xl text-gray-700">
                          {currentItem.word}
                        </h3>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="font-fredoka font-bold text-3xl text-gray-800">
                      {showAnswer ? currentItem.name : '???'}
                    </h2>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center space-x-3">
                  {!showAnswer ? (
                    <Button onClick={handleReveal} className="rounded-full gradient-purple text-white">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Reveal & Learn!
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => playSound(currentItem.sound)} 
                        variant="outline" 
                        className="rounded-full"
                      >
                        <Volume2 className="w-4 h-4 mr-1" />
                        Play Sound
                      </Button>
                      <Button onClick={handleNext} className="rounded-full gradient-blue text-white">
                        Next
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Fun Fact */}
                {showAnswer && (
                  <div className="mt-6 bg-white bg-opacity-70 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-comic font-bold text-yellow-800">Fun Fact!</span>
                    </div>
                    <p className="font-comic text-gray-700">{currentItem.fact}</p>
                  </div>
                )}
              </div>

              {/* Progress */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-comic font-bold text-gray-800">Progress</span>
                  <span className="font-comic text-sm text-gray-600">
                    {currentLevel + 1}/{currentCategoryData?.items.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentLevel + 1) / (currentCategoryData?.items.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
              🎯 Learning Progress
            </h3>

            {/* Recently Learned */}
            <div className="bg-green-50 rounded-xl p-4 mb-4">
              <h4 className="font-comic font-bold text-green-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Recently Learned
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {Array.from(completedItems).slice(-5).reverse().map((itemKey) => {
                  const [catId, levelStr] = itemKey.split('-');
                  const level = parseInt(levelStr);
                  const category = categories.find(c => c.id === catId);
                  const item = category?.items[level];
                  
                  return item ? (
                    <div key={itemKey} className="flex items-center space-x-2 bg-white rounded-lg p-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-comic text-sm font-bold text-gray-700">
                        {isAlphabetItem(item) ? `${item.letter} - ${item.word}` : item.name}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-yellow-800 mb-3 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </h4>
              <div className="space-y-2">
                {completedItems.size >= 5 && (
                  <Badge className="bg-yellow-100 text-yellow-800 font-comic text-xs">
                    🌟 Curious Learner - Learned 5 items!
                  </Badge>
                )}
                {completedItems.size >= 15 && (
                  <Badge className="bg-orange-100 text-orange-800 font-comic text-xs">
                    🧠 Smart Student - Learned 15 items!
                  </Badge>
                )}
                {completedItems.size >= 30 && (
                  <Badge className="bg-purple-100 text-purple-800 font-comic text-xs">
                    👑 Knowledge Master - Learned 30 items!
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GeneralKnowledge;
