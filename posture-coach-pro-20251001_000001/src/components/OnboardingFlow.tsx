import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Target, 
  Bell, 
  Activity,
  Check,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx } from 'clsx';

const OnboardingFlow: React.FC = () => {
  const { completeOnboarding, updateUserSettings, updateCalibration } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    targetScore: 80,
    alertsEnabled: true,
    breakReminders: true,
    isCalibrated: false,
  });

  const steps = [
    {
      title: 'Welcome to Posture Coach Pro',
      description: 'Let\'s get you set up for better posture',
      icon: <Sparkles className="w-12 h-12 text-primary-600" />,
      content: <WelcomeStep formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Set Your Goals',
      description: 'What are your posture improvement targets?',
      icon: <Target className="w-12 h-12 text-primary-600" />,
      content: <GoalsStep formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Configure Alerts',
      description: 'How would you like to be notified?',
      icon: <Bell className="w-12 h-12 text-primary-600" />,
      content: <AlertsStep formData={formData} setFormData={setFormData} />,
    },
    {
      title: 'Calibrate Your Posture',
      description: 'Let\'s establish your baseline posture',
      icon: <Activity className="w-12 h-12 text-primary-600" />,
      content: <CalibrationStep formData={formData} setFormData={setFormData} />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      updateUserSettings({
        targetScore: formData.targetScore,
        alertsEnabled: formData.alertsEnabled,
        breakReminders: formData.breakReminders,
      });
      
      if (formData.isCalibrated) {
        updateCalibration({
          baseline: {
            neckAngle: 0,
            shoulderLevel: 0,
            backCurvature: 0,
            headPosition: 0,
          },
          isCalibrated: true,
          calibratedAt: new Date(),
        });
      }
      
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Skip for now
            </button>
          </div>
          <div className="w-full bg-white/50 rounded-full h-2">
            <motion.div
              className="h-2 bg-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mb-4">
                  {steps[currentStep].icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>

              {/* Step Content */}
              <div className="mb-8">
                {steps[currentStep].content}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={clsx(
                'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors',
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              {currentStep === steps.length - 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Step Components
interface StepProps {
  formData: any;
  setFormData: (data: any) => void;
}

const WelcomeStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <FeatureCard
            icon="📊"
            title="Track Progress"
            description="Monitor your posture improvement over time"
          />
          <FeatureCard
            icon="⏰"
            title="Smart Alerts"
            description="Get reminded to correct your posture"
          />
          <FeatureCard
            icon="🎯"
            title="Set Goals"
            description="Work towards better posture habits"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What should we call you? (optional)
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
};

const GoalsStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Posture Score
        </label>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {formData.targetScore}
          </div>
          <div className="text-sm text-gray-600">points</div>
        </div>
        <input
          type="range"
          min="60"
          max="100"
          step="5"
          value={formData.targetScore}
          onChange={(e) => setFormData({ ...formData, targetScore: Number(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((formData.targetScore - 60) / 40) * 100}%, #e5e7eb ${((formData.targetScore - 60) / 40) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>60 (Good)</span>
          <span>100 (Perfect)</span>
        </div>
      </div>

      <div className="bg-primary-50 rounded-lg p-4">
        <p className="text-sm text-primary-900">
          <strong>Tip:</strong> Start with a realistic goal. You can always adjust it later as you improve!
        </p>
      </div>
    </div>
  );
};

const AlertsStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-primary-600" />
            <div>
              <div className="font-medium text-gray-900">Posture Alerts</div>
              <div className="text-sm text-gray-600">Get notified when your posture needs correction</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.alertsEnabled}
            onChange={(e) => setFormData({ ...formData, alertsEnabled: e.target.checked })}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-3">
            <Activity className="w-6 h-6 text-primary-600" />
            <div>
              <div className="font-medium text-gray-900">Break Reminders</div>
              <div className="text-sm text-gray-600">Remind you to take regular breaks</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.breakReminders}
            onChange={(e) => setFormData({ ...formData, breakReminders: e.target.checked })}
            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
          />
        </label>
      </div>

      <div className="bg-success-50 rounded-lg p-4">
        <p className="text-sm text-success-900">
          You can customize alert frequency and types in the Settings later.
        </p>
      </div>
    </div>
  );
};

const CalibrationStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationComplete, setCalibrationComplete] = useState(false);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    
    // Simulate calibration
    setTimeout(() => {
      setIsCalibrating(false);
      setCalibrationComplete(true);
      setFormData({ ...formData, isCalibrated: true });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        {!isCalibrating && !calibrationComplete && (
          <>
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Calibration helps us:</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left max-w-sm mx-auto">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Understand your natural sitting position
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Provide more accurate posture scores
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Customize alerts to your needs
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={handleCalibrate}
              className="btn-primary"
            >
              Start Calibration
            </button>
            <p className="text-sm text-gray-600 mt-4">
              You can also do this later in Settings
            </p>
          </>
        )}

        {isCalibrating && (
          <div>
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Activity className="w-12 h-12 text-primary-600" />
            </motion.div>
            <h3 className="text-lg font-semibold mb-2">Calibrating...</h3>
            <p className="text-sm text-gray-600">
              Please sit in your normal working position
            </p>
          </div>
        )}

        {calibrationComplete && (
          <div>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-success-100 rounded-full mb-4">
              <Check className="w-12 h-12 text-success-600" />
            </div>
            <h3 className="text-lg font-semibold text-success-700 mb-2">
              Calibration Complete!
            </h3>
            <p className="text-sm text-gray-600">
              Your baseline posture has been recorded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-sm text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

export default OnboardingFlow;