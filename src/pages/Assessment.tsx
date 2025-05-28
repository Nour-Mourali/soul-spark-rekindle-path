
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Heart, Target, Calendar, Pill } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CrisisSupport from '@/components/assessment/CrisisSupport';
import GoalSetting from '@/components/assessment/GoalSetting';
import MedicationReminders from '@/components/assessment/MedicationReminders';
import AssessmentAnalytics from '@/components/assessment/AssessmentAnalytics';

const Assessment: React.FC = () => {
  const { updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  
  // Form data
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [mentalState, setMentalState] = useState('');
  const [hasSeenDoctor, setHasSeenDoctor] = useState<boolean | null>(null);
  const [phq9Score, setPHQ9Score] = useState(0);
  const [gad7Score, setGAD7Score] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [supportSystem, setSupportSystem] = useState('');
  const [triggerFactors, setTriggerFactors] = useState<string[]>([]);
  const [copingStrategies, setCopingStrategies] = useState<string[]>([]);

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const phq9Questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling/staying asleep or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself or that you're a failure",
    "Trouble concentrating on things",
    "Moving/speaking slowly or being fidgety/restless",
    "Thoughts of self-harm or suicide"
  ];

  const gad7Questions = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it's hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid as if something awful might happen"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const assessmentData = {
      nickname,
      age: parseInt(age),
      mentalState,
      hasSeenDoctor: hasSeenDoctor || false,
      phq9Score,
      gad7Score,
      goals,
      medications,
      supportSystem,
      triggerFactors,
      copingStrategies,
      assessmentDate: new Date(),
      riskLevel: phq9Score > 15 || gad7Score > 15 ? 'high' : phq9Score > 10 || gad7Score > 10 ? 'moderate' : 'low'
    };
    
    updateUserProfile(assessmentData);
    navigate('/home');
  };

  const checkCrisisRisk = (answers: number[]) => {
    const lastQuestionScore = answers[8]; // Suicide ideation question
    if (lastQuestionScore >= 2) {
      setShowCrisisSupport(true);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-mental-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Welcome to Your Mental Health Journey</h2>
              <p className="text-gray-600">Let's start by getting to know you better</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What should we call you?
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                placeholder="Enter your nickname"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                placeholder="Enter your age"
                min="13"
                max="120"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you describe your current mental state?
              </label>
              <select
                value={mentalState}
                onChange={(e) => setMentalState(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                required
              >
                <option value="">Select your state</option>
                <option value="great">Great - I'm feeling really good</option>
                <option value="good">Good - Things are going well</option>
                <option value="okay">Okay - Just getting by</option>
                <option value="struggling">Struggling - Having a tough time</option>
                <option value="difficult">Very Difficult - Need support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you seen a mental health professional recently?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasSeenDoctor"
                    value="yes"
                    onChange={() => setHasSeenDoctor(true)}
                    className="mr-2 text-mental-purple"
                  />
                  Yes, I have
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasSeenDoctor"
                    value="no"
                    onChange={() => setHasSeenDoctor(false)}
                    className="mr-2 text-mental-purple"
                  />
                  No, I haven't
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Depression Screening (PHQ-9)</h2>
              <p className="text-gray-600">Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
            </div>
            
            <PHQAssessment 
              questions={phq9Questions}
              onScoreChange={(score, answers) => {
                setPHQ9Score(score);
                checkCrisisRisk(answers);
              }}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Anxiety Screening (GAD-7)</h2>
              <p className="text-gray-600">Over the last 2 weeks, how often have you been bothered by the following problems?</p>
            </div>
            
            <GADAssessment 
              questions={gad7Questions}
              onScoreChange={setGAD7Score}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Target className="h-12 w-12 text-mental-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Set Your Goals</h2>
              <p className="text-gray-600">What would you like to achieve with your mental health journey?</p>
            </div>
            
            <GoalSetting goals={goals} setGoals={setGoals} />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Pill className="h-12 w-12 text-mental-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Medication & Support</h2>
              <p className="text-gray-600">Help us understand your current support system</p>
            </div>
            
            <MedicationReminders 
              medications={medications} 
              setMedications={setMedications}
              supportSystem={supportSystem}
              setSupportSystem={setSupportSystem}
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="h-12 w-12 text-mental-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-mental-purple mb-2">Assessment Complete</h2>
              <p className="text-gray-600">Review your results and personalized recommendations</p>
            </div>
            
            <AssessmentAnalytics 
              phq9Score={phq9Score}
              gad7Score={gad7Score}
              goals={goals}
              riskLevel={phq9Score > 15 || gad7Score > 15 ? 'high' : phq9Score > 10 || gad7Score > 10 ? 'moderate' : 'low'}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (showCrisisSupport) {
    return <CrisisSupport onContinue={() => setShowCrisisSupport(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-mental-lightGray to-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardContent className="p-8">
            <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-mental-purple hover:bg-mental-darkPurple text-white"
                    disabled={
                      (currentStep === 1 && (!nickname || !age || !mentalState || hasSeenDoctor === null)) ||
                      (currentStep === 2 && phq9Score === 0) ||
                      (currentStep === 3 && gad7Score === 0)
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="bg-mental-purple hover:bg-mental-darkPurple text-white"
                  >
                    Complete Assessment
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// PHQ-9 Assessment Component
const PHQAssessment: React.FC<{ 
  questions: string[], 
  onScoreChange: (score: number, answers: number[]) => void 
}> = ({ questions, onScoreChange }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0));

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
    
    const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
    onScoreChange(totalScore, newAnswers);
  };

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <p className="font-medium mb-3">{question}</p>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`phq9-${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={() => handleAnswerChange(index, option.value)}
                  className="mr-2 text-mental-purple"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// GAD-7 Assessment Component
const GADAssessment: React.FC<{ 
  questions: string[], 
  onScoreChange: (score: number) => void 
}> = ({ questions, onScoreChange }) => {
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(0));

  const handleAnswerChange = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
    
    const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0);
    onScoreChange(totalScore);
  };

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <p className="font-medium mb-3">{question}</p>
          <div className="grid grid-cols-2 gap-2">
            {options.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={`gad7-${index}`}
                  value={option.value}
                  checked={answers[index] === option.value}
                  onChange={() => handleAnswerChange(index, option.value)}
                  className="mr-2 text-mental-purple"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Assessment;
