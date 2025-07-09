
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SocialScenario {
  id: number;
  title: string;
  description: string;
  options: {
    text: string;
    points: number;
    correct: boolean;
  }[];
}

interface SocialScenariosProps {
  scenarios: SocialScenario[];
  currentScenario: number;
  empathyPoints: number;
  onAnswerSelect: (points: number) => void;
}

const SocialScenarios = ({ scenarios, currentScenario, empathyPoints, onAnswerSelect }: SocialScenariosProps) => {
  const scenario = scenarios[currentScenario];

  return (
    <Card className="p-6 mb-6 bg-white rounded-2xl border-0 shadow-lg">
      <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
        🤝 Social Scenarios
      </h3>

      {scenario && (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
              {scenario.title}
            </h4>
            <p className="font-comic text-gray-700">
              {scenario.description}
            </p>
          </div>

          <div className="space-y-2">
            {scenario.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start text-left font-comic p-4 h-auto"
                onClick={() => onAnswerSelect(option.points)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SocialScenarios;
