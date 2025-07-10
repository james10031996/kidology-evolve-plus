
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-5xl md:text-6xl text-gray-800 mb-6">
            Welcome to Learning Games! 🎮
          </h1>
          <p className="font-comic text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover amazing educational games that make learning fun and interactive!
          </p>
          
          <Button 
            onClick={() => navigate('/games')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-comic text-lg px-8 py-4 rounded-full shadow-lg"
          >
            🚀 Start Playing Games
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-fredoka font-bold text-xl mb-2">Educational Games</h3>
            <p className="font-comic text-gray-600">Learn while playing with our collection of fun educational games!</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="font-fredoka font-bold text-xl mb-2">Track Progress</h3>
            <p className="font-comic text-gray-600">Monitor your learning journey and celebrate achievements!</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-fredoka font-bold text-xl mb-2">Fun Learning</h3>
            <p className="font-comic text-gray-600">Experience education through interactive and engaging gameplay!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
