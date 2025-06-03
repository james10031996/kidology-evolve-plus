
import VirtualPet from './VirtualPet';
import RewardsCenter from './RewardsCenter';

const ActivityExtras = () => {
  return (
    <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div>
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
          🐾 Your Learning Buddy
        </h3>
        <VirtualPet />
      </div>
      <div>
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
          🎁 Rewards Center
        </h3>
        <RewardsCenter />
      </div>
    </div>
  );
};

export default ActivityExtras;
