export const geographyTopics = {
    interactiveMap: {
      title: '🗺️ Interactive Map'
    },
    compassLesson: {
      title: '🧭 Compass'
    },
    continents: {
      title: '🌍 Continents & Oceans',
      lessons: [
        {
          name: 'Seven Continents',
          emoji: '🌎',
          description: 'Learn about all seven continents',
          details: {
            continents: [
              { name: 'North America', emoji: '🦅', countries: ['USA', 'Canada', 'Mexico'], fact: 'Home to the Grand Canyon' },
              { name: 'South America', emoji: '🦙', countries: ['Brazil', 'Argentina', 'Peru'], fact: 'Has the Amazon rainforest' },
              { name: 'Europe', emoji: '🏰', countries: ['France', 'Germany', 'Italy'], fact: 'Smallest continent by area' },
              { name: 'Africa', emoji: '🦁', countries: ['Egypt', 'Kenya', 'South Africa'], fact: 'Birthplace of humanity' },
              { name: 'Asia', emoji: '🐼', countries: ['China', 'India', 'Japan'], fact: 'Largest and most populous' },
              { name: 'Australia', emoji: '🦘', countries: ['Australia'], fact: 'Only continent that is one country' },
              { name: 'Antarctica', emoji: '🐧', countries: [], fact: 'Coldest and windiest continent' }
            ]
          }
        },
        {
          name: 'Five Oceans',
          emoji: '🌊',
          description: 'Discover the world\'s oceans',
          details: {
            oceans: [
              { name: 'Pacific Ocean', emoji: '🐋', fact: 'Largest and deepest ocean', animals: ['Whales', 'Dolphins', 'Sharks'] },
              { name: 'Atlantic Ocean', emoji: '🐢', fact: 'Second largest ocean', animals: ['Sea Turtles', 'Fish', 'Seals'] },
              { name: 'Indian Ocean', emoji: '🐙', fact: 'Warmest ocean', animals: ['Octopus', 'Tropical Fish', 'Coral'] },
              { name: 'Arctic Ocean', emoji: '🐻‍❄️', fact: 'Smallest and coldest ocean', animals: ['Polar Bears', 'Seals', 'Walrus'] },
              { name: 'Southern Ocean', emoji: '🐧', fact: 'Surrounds Antarctica', animals: ['Penguins', 'Krill', 'Whales'] }
            ]
          }
        }
      ]
    },
    countries: {
      title: '🗺️ Countries & Capitals',
      lessons: [
        {
          name: 'Famous Countries',
          emoji: '🏛️',
          description: 'Learn about interesting countries',
          details: {
            countries: [
              { name: 'USA', capital: 'Washington D.C.', emoji: '🗽', landmark: 'Statue of Liberty', food: 'Hamburger 🍔' },
              { name: 'France', capital: 'Paris', emoji: '🗼', landmark: 'Eiffel Tower', food: 'Croissant 🥐' },
              { name: 'Egypt', capital: 'Cairo', emoji: '🏜️', landmark: 'Pyramids', food: 'Falafel 🧆' },
              { name: 'Japan', capital: 'Tokyo', emoji: '🏯', landmark: 'Mount Fuji', food: 'Sushi 🍣' },
              { name: 'Australia', capital: 'Canberra', emoji: '🏛️', landmark: 'Sydney Opera House', food: 'Meat Pie 🥧' },
              { name: 'Brazil', capital: 'Brasília', emoji: '🏟️', landmark: 'Christ the Redeemer', food: 'Açaí 🍇' }
            ]
          }
        },
        {
          name: 'World Landmarks',
          emoji: '🏗️',
          description: 'Famous places around the world',
          details: {
            landmarks: [
              { name: 'Great Wall of China', country: 'China', emoji: '🏯', fact: 'Can be seen from space' },
              { name: 'Taj Mahal', country: 'India', emoji: '🕌', fact: 'Made of white marble' },
              { name: 'Machu Picchu', country: 'Peru', emoji: '⛰️', fact: 'Ancient Inca city in clouds' },
              { name: 'Colosseum', country: 'Italy', emoji: '🏛️', fact: 'Where gladiators fought' },
              { name: 'Stonehenge', country: 'England', emoji: '🗿', fact: 'Mysterious ancient stones' },
              { name: 'Christ the Redeemer', country: 'Brazil', emoji: '⛪', fact: 'Giant statue on mountain' }
            ]
          }
        }
      ]
    },
    weather: {
      title: '⛅ Weather & Climate',
      lessons: [
        {
          name: 'Weather Patterns',
          emoji: '🌦️',
          description: 'Understanding different weather',
          details: {
            weather: [
              { type: 'Sunny', emoji: '☀️', description: 'Clear sky, bright sun', activities: ['Beach', 'Picnic', 'Swimming'] },
              { type: 'Rainy', emoji: '🌧️', description: 'Water falling from clouds', activities: ['Indoor games', 'Reading', 'Crafts'] },
              { type: 'Snowy', emoji: '❄️', description: 'Frozen water crystals', activities: ['Skiing', 'Snowman', 'Hot cocoa'] },
              { type: 'Windy', emoji: '💨', description: 'Moving air', activities: ['Flying kites', 'Sailing', 'Wind chimes'] },
              { type: 'Cloudy', emoji: '☁️', description: 'Sky covered with clouds', activities: ['Walking', 'Photography', 'Cloud watching'] },
              { type: 'Stormy', emoji: '⛈️', description: 'Thunder and lightning', activities: ['Stay inside', 'Watch rain', 'Listen to thunder'] }
            ]
          }
        },
        {
          name: 'Seasons Around World',
          emoji: '🌸🌞🍂❄️',
          description: 'How seasons change everywhere',
          details: {
            seasons: [
              { name: 'Spring', emoji: '🌸', description: 'Flowers bloom, animals wake up', months: ['March', 'April', 'May'] },
              { name: 'Summer', emoji: '🌞', description: 'Hot weather, long days', months: ['June', 'July', 'August'] },
              { name: 'Fall/Autumn', emoji: '🍂', description: 'Leaves change color', months: ['September', 'October', 'November'] },
              { name: 'Winter', emoji: '❄️', description: 'Cold weather, short days', months: ['December', 'January', 'February'] }
            ]
          }
        }
      ]
    },
    habitats: {
      title: '🏞️ Natural Habitats',
      lessons: [
        {
          name: 'Forest Homes',
          emoji: '🌲',
          description: 'Animals living in forests',
          details: {
            forests: [
              {
                type: 'Rainforest',
                emoji: '🌴',
                location: 'Amazon, Congo',
                animals: ['🐒 Monkeys', '🦜 Parrots', '🐆 Jaguars', '🦎 Lizards'],
                plants: ['🌺 Tropical flowers', '🌿 Ferns', '🌳 Tall trees']
              },
              {
                type: 'Deciduous Forest',
                emoji: '🌳',
                location: 'North America, Europe',
                animals: ['🐻 Bears', '🦌 Deer', '🐿️ Squirrels', '🦉 Owls'],
                plants: ['🍂 Oak trees', '🌰 Chestnut trees', '🍄 Mushrooms']
              }
            ]
          }
        },
        {
          name: 'Ocean Life',
          emoji: '🐠',
          description: 'Creatures living in seas',
          details: {
            zones: [
              {
                name: 'Shallow Waters',
                emoji: '🏖️',
                animals: ['🐟 Tropical fish', '🐢 Sea turtles', '🦀 Crabs', '⭐ Starfish'],
                features: ['🪸 Coral reefs', '🌊 Warm water', '☀️ Lots of sunlight']
              },
              {
                name: 'Deep Ocean',
                emoji: '🌊',
                animals: ['🐋 Whales', '🦈 Sharks', '🐙 Giant squid', '🐡 Deep-sea fish'],
                features: ['🌑 Very dark', '❄️ Cold water', '🗻 Underwater mountains']
              }
            ]
          }
        },
        {
          name: 'Desert Life',
          emoji: '🏜️',
          description: 'Life in hot, dry places',
          details: {
            deserts: [
              {
                name: 'Hot Desert',
                emoji: '🌵',
                location: 'Sahara, Arizona',
                animals: ['🐪 Camels', '🦎 Lizards', '🐍 Snakes', '🦂 Scorpions'],
                plants: ['🌵 Cacti', '🌿 Desert grass', '🌸 Desert flowers']
              },
              {
                name: 'Cold Desert',
                emoji: '🏔️',
                location: 'Mongolia, Antarctica',
                animals: ['🐻‍❄️ Polar bears', '🐧 Penguins', '🦌 Reindeer', '🐺 Arctic wolves'],
                adaptations: ['❄️ Thick fur', '🏃‍♂️ Fast runners', '😴 Hibernation']
              }
            ]
          }
        }
      ]
    },
    maps: {
      title: '🗺️ Reading Maps',
      lessons: [
        {
          name: 'Map Basics',
          emoji: '🧭',
          description: 'How to read and use maps',
          details: {
            basics: [
              { concept: 'Compass Directions', emoji: '🧭', directions: ['North ⬆️', 'South ⬇️', 'East ➡️', 'West ⬅️'] },
              { concept: 'Map Scale', emoji: '📏', explanation: 'Shows how big real places are on map' },
              { concept: 'Map Legend', emoji: '🔑', explanation: 'Explains what symbols mean' },
              { concept: 'Grid Lines', emoji: '#️⃣', explanation: 'Help find exact locations' }
            ]
          }
        },
        {
          name: 'Types of Maps',
          emoji: '📋',
          description: 'Different kinds of maps',
          details: {
            types: [
              { name: 'Physical Maps', emoji: '⛰️', shows: 'Mountains, rivers, lakes', colors: 'Green for low, brown for high' },
              { name: 'Political Maps', emoji: '🏛️', shows: 'Countries, states, cities', colors: 'Different colors for countries' },
              { name: 'Weather Maps', emoji: '🌦️', shows: 'Rain, sun, temperature', symbols: 'Clouds, sun, snowflakes' },
              { name: 'Treasure Maps', emoji: '🏴‍☠️', shows: 'Where treasure is hidden', fun: 'X marks the spot!' }
            ]
          }
        }
      ]
    },
    culture: {
      title: '🎭 World Cultures',
      lessons: [
        {
          name: 'Festivals Around World',
          emoji: '🎉',
          description: 'How people celebrate',
          details: {
            festivals: [
              { name: 'Chinese New Year', country: 'China', emoji: '🐉', traditions: ['Dragon dances', 'Red decorations', 'Fireworks'] },
              { name: 'Diwali', country: 'India', emoji: '🪔', traditions: ['Festival of lights', 'Oil lamps', 'Sweets'] },
              { name: 'Carnival', country: 'Brazil', emoji: '🎭', traditions: ['Colorful costumes', 'Dancing', 'Parades'] },
              { name: 'Halloween', country: 'USA', emoji: '🎃', traditions: ['Trick or treat', 'Costumes', 'Jack-o-lanterns'] },
              { name: 'Christmas', country: 'Worldwide', emoji: '🎄', traditions: ['Gift giving', 'Christmas tree', 'Santa Claus'] }
            ]
          }
        },
        {
          name: 'Traditional Foods',
          emoji: '🍽️',
          description: 'Yummy foods from everywhere',
          details: {
            foods: [
              { country: 'Italy', food: 'Pizza 🍕', ingredients: 'Cheese, tomato, bread', fact: 'Invented in Naples' },
              { country: 'Mexico', food: 'Tacos 🌮', ingredients: 'Meat, beans, peppers', fact: 'Eaten with hands' },
              { country: 'Japan', food: 'Sushi 🍣', ingredients: 'Rice, fish, seaweed', fact: 'Very fresh fish' },
              { country: 'India', food: 'Curry 🍛', ingredients: 'Spices, vegetables, rice', fact: 'Many different colors' },
              { country: 'France', food: 'Croissant 🥐', ingredients: 'Butter, flour, yeast', fact: 'Crescent moon shape' }
            ]
          }
        }
      ]
    }
  };



  export const lessons = [
    { id: 'interactiveMap', title: '🗺️ Interactive Map', description: 'Explore maps and discover places around the world!', color: 'bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500', difficulty: 'Easy' },
    { id: 'compassLesson', title: '🧭 Compass', description: 'Learn how a compass helps us find direction (N, S, E, W)!', color: 'bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500', difficulty: 'Easy' },
    { id: 'continents', title: '🌍 Continents & Oceans', description: 'Explore the seven continents and five oceans', color: 'gradient-blue', difficulty: 'Easy' },
    { id: 'countries', title: '🗺️ Countries & Capitals', description: 'Learn about different countries and their capitals', color: 'gradient-green', difficulty: 'Medium' },
    { id: 'weather', title: '⛅ Weather & Climate', description: 'Understand weather patterns and seasons', color: 'gradient-purple', difficulty: 'Easy' },
    { id: 'habitats', title: '🏞️ Natural Habitats', description: 'Discover where animals live around the world', color: 'gradient-orange', difficulty: 'Medium' },
    { id: 'maps', title: '🗺️ Reading Maps', description: 'Learn how to read and use different maps', color: 'gradient-pink', difficulty: 'Hard' },
    { id: 'culture', title: '🎭 World Cultures', description: 'Explore festivals and traditions worldwide', color: 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300', difficulty: 'Medium' }
  ];